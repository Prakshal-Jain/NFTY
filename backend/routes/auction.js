var express = require("express");
var router = express.Router();
const utilities = require('../utilities');
const { objectModel, auctionModel } = require("../models/item_object");
const path = require('path');
const multer = require('multer');
const userModel = require("../models/user_object");
const http = require('http');


const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connect', (socket) => {
    socket.on("new-bid", async ({ bid_price, item_name }) => {
        const cookies = utilities.parseCookie(socket.handshake.headers.cookie);
        const user = await utilities.authenticateUser(cookies.auth_token);
        if (user === null) {
            return
        }

        if (isNaN(Number(bid_price))) {
            return
        }

        // Add to database and get auction list
        const auction = new auctionModel({
            time: new Date(),
            price: bid_price,
            bidder: user.email,
        })

        const auctionItem = await auction.save();

        const items = await objectModel.find({ item_name });
        if(items.length === 0){
            return
        }

        const item = items[0];
        if(item.auction_detail.length > 0 && bid_price <= (item.auction_detail[item.auction_detail.length-1]).price){
            // Current bid price must be greater than the last one
            return
        }
        const auction_list = [...item.auction_detail, auctionItem];

        await objectModel.updateOne({ item_name }, {
            auction_detail: auction_list
        })

        io.emit(`auction_list#${item_name}`, auction_list);
    })
});

io.on('disconnect', () => {
    console.log('user disconnected');
});



// using multer to store images 
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000000 // 100000000 Bytes = 100 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})


// "/auction"
router.get('/all-auction-items', async (req, res) => {
    const user = await utilities.authenticateUser(req.cookies.auth_token)
    if (user === null) {
        res.status(401);
        res.json({ message: "Unauthorized user." });
        return
    }

    objectModel.find({ item_type: 'auction' }, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            const item_list = utilities.filterItemList(items);
            // Filter out the expired items too
            const non_expired_items = item_list.filter((x) => new Date(x.expiration_time) > new Date())
            res.status(200);
            res.json(non_expired_items);
        }
    });
});

// "/auction/auction-details"
router.post('/', upload.single('item_image'), async (req, res, next) => {
    const user = await utilities.authenticateUser(req.cookies.auth_token)
    if (user === null) {
        res.status(401);
        res.json({ message: "Unauthorized user." });
        return
    }

    if (req.body.item_type !== 'marketplace' && req.body.item_type !== 'auction' && req.body.item_type !== 'none') {
        res.status(403);
        res.json({ message: "Invalid Item Type." });
        return
    }

    // If an NFT with the same name already exist, throw error
    const existingItem = await objectModel.find({ item_type: req.body.item_type, item_name: req.body.item_name });
    if (existingItem.length > 0) {
        res.status(403);
        res.json({ message: "An NFT with this name already exist, please use some other name." });
        return
    }

    userModel.find({ auth_token: req.cookies.auth_token }, async (err, token_list) => {
        if (err) {
            console.log(err);
        }
        else {
            if (token_list.length === 0) {
                res.status(403);
                res.json({ message: "User profile Not Found" });
            } else {
                if (req.body.item_name !== null && req.body.item_image !== null && req.body.description !== null && req.body.expiration_time !== null && (new Date(req.body.expiration_time)) > (new Date())) {
                    const user = token_list[0];
                    const item_data = {
                        item_name: req.body.item_name,
                        item_image: req.file.filename,
                        description: req.body.description,
                        owner: user,
                        expiration_time: req.body.expiration_time,
                        item_type: req.body.item_type
                    }

                    const newItem = new objectModel(item_data)

                    newItem.save(function (err, item) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            res.status(200);
                            res.json({ message: "Item created successfully." });
                        }
                    });
                }
                else {
                    res.status(403);
                    res.json({ message: "Please fill all requred fields correctly." });
                }
            }
        }
    });
});

// path = /api/auction/

router.get('/auction-data', async (req, res) => {
    const user = await utilities.authenticateUser(req.cookies.auth_token)
    if (user === null) {
        res.status(401);
        res.json({ message: "Unauthorized user." });
        return
    }

    const item_name = req.query.item_name;

    objectModel.find({ item_name }, (err, i) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            const items = utilities.filterItemList(i);
            if (items.length === 0) {
                res.status(403);
                res.json({ message: "Item does not exist." });
                return
            }
            else {
                const item = items[0];
                if ((new Date(item.expiration_time)) <= (new Date())) {
                    res.status(403);
                    res.json({ message: "Item Expired." });
                    return
                }
                res.status(200);
                res.json(item);
            }
        }
    })
})


module.exports = { auction: router, server, app };