var express = require("express");
var router = express.Router();
const utilities = require('../utilities');
const { objectModel } = require("../models/item_object");
const path = require('path');
const multer = require('multer');
const userModel = require("../models/user_object");

// declaring for socket io 
const http = require('http');
const server = http.createServer(router);
const { Server } = require("socket.io");
const io = new Server(server);


// connection and disconnection 
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  }); 
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
            res.status(200);
            res.json(item_list);
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
                if (req.body.item_name !== null && req.body.item_image !== null && req.body.description !== null && req.body.price !== null) {
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
                    res.json({ message: "Please fill all requred fields." });
                }
            }
        }
    });
});

// path = /api/auction/



module.exports = router;