const express = require("express");
const router = express.Router();
const userModel = require("../models/user_object");
const path = require('path');
const { objectModel, transactionModel } = require("../models/item_object");
const multer = require('multer');
const utilities = require('../utilities');


router.get('/all-marketplace-items', async (req, res) => {
    const user = await utilities.authenticateUser(req.cookies.auth_token)
    if (user === null) {
        res.status(401);
        res.json({ message: "Unauthorized user." });
        return
    }

    objectModel.find({ item_type: 'marketplace' }, (err, items) => {
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

// uploading a new item 
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
                        price: req.body.price,
                        owner: user,
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

router.post('/add-shoppingcart-item', async (req, res) => {
    const user = await utilities.authenticateUser(req.cookies.auth_token)
    if (user === null) {
        res.status(401);
        res.json({ message: "Unauthorized user." });
        return
    }

    // Check if the item exist
    const items = await objectModel.find({ item_type: req.body.item_type, item_name: req.body.item_name });
    if (items.length === 0) {
        res.status(403);
        res.json({ message: "Item does not exist." });
        return
    }

    const item = items[0];
    // Check if user is not the same as the owner of the object
    if (item.owner.auth_token === user.auth_token) {
        res.status(403);
        res.json({ message: "You are the owner of the item. Buying your own item is not allowed." });
        return
    }

    if (user.balance < item.price) {
        res.status(403);
        res.json({ message: "You do not have the sufficient funds to purchase this item." });
        return
    }

    // if user shopping cart don't already have the item, add this item to buyer (user) shopping cart.
    const existing = user.shopping_cart.filter(x => (x.item_name === item.item_name && x.item_type === item.item_type));
    if (existing.length > 0) {
        res.status(403);
        res.json({ message: "Item already in your shopping cart." });
        return
    }

    user.shopping_cart.push(item);
    user.save()

    res.status(200);
    res.send({ message: "Item added to shopping cart successfully!" });
});

router.post('/delete-from-shopping-cart', async (req, res) => {
    const user = await utilities.authenticateUser(req.cookies.auth_token);
    if (user === null) {
        res.status(401);
        res.json({ message: "Unauthorized user." });
        return
    }

    // Check if the item exist
    const items = await objectModel.find({ item_type: req.body.item_type, item_name: req.body.item_name });
    if (items.length === 0) {
        res.status(403);
        res.json({ message: "Item does not exist." });
        return
    }

    const item = items[0];
    if (item.owner.auth_token === user.auth_token) {
        res.status(403);
        res.json({ message: "You are the owner of the item. Deleting your own item from shopping cart is not allowed." });
        return
    }

    const existingIdx = user.shopping_cart.findIndex(x => (x.item_name === item.item_name && x.item_type === item.item_type));
    if (existingIdx === -1) {
        res.status(403);
        res.json({ message: "Item not in your shopping cart." });
        return
    }

    user.shopping_cart.splice(existingIdx, 1);
    user.save()

    res.status(200);
    res.send({ message: "Item deleted from shopping cart successfully!" });
})

router.post('/buy-marketplace-item', async (req, res) => {
    // TO BE IMPLEMENTED WHEN PERSON BUY ITEMS FROM SHOPPING CART
    // Add price to seller
    // Subtract price from buyer
    // Change owner
    // Add to transaction model (database)
    // Add to sold_items

    // NOTE: if item is in shopping cart, and other user already bought it, delete from all other users.

    const user = await utilities.authenticateUser(req.cookies.auth_token);
    if (user === null) {
        res.status(401);
        res.json({ message: "Unauthorized user." });
        return
    }

    // Check if the item exist
    const items = await objectModel.find({ item_type: req.body.item_type, item_name: req.body.item_name });
    if (items.length === 0) {
        res.status(403);
        res.json({ message: "Item does not exist." });
        return
    }

    const item = items[0];
    // Check if user is not the same as the owner of the object
    if (item.owner.auth_token === user.auth_token) {
        res.status(403);
        res.json({ message: "You are the owner of the item. You cannot buy your own item." });
        return
    }

    if (user.balance < item.price) {
        res.status(403);
        res.json({ message: "You do not have the sufficient funds to purchase this item." });
        return
    }

    const existingIdx = user.shopping_cart.findIndex(x => (x.item_name === item.item_name && x.item_type === item.item_type));
    if (existingIdx === -1) {
        res.status(403);
        res.json({ message: "Item not in your shopping cart." });
        return
    }

    const prevItemOwners = await userModel.find({ email: item.owner.email });
    if (prevItemOwners.length === 0) {
        res.status(403);
        res.json({ message: "Previous owner not found." });
        return
    }

    const prevItemOwner = prevItemOwners[0];

    // Set item type to none
    const transaction = new transactionModel({
        time: Date.now(),
        price: item.price,
        buyer: user,
        seller: prevItemOwner
    })

    const t = await transaction.save();

    // Update the item (DO NOT SAVE UNTIL THE END TO AVOID CYCLIC DEP. ERROR)
    await objectModel.updateOne({ item_name: item.item_name, item_type: item.item_type }, {
        owner: user,
        transaction: [...item.transaction, t],
        item_type: 'none'
    })

    const i = await objectModel.findOne({ item_name: item.item_name, item_type: 'none' });

    // Update the buyer
    user.shopping_cart.splice(existingIdx, 1);
    user.balance -= i.price;
    user.purchased_items.push(i);
    const u = await user.save();

    // Update the seller
    prevItemOwner.sold_items = (prevItemOwner.sold_items) ? prevItemOwner.sold_items : [];
    prevItemOwner.balance += i.price;
    prevItemOwner.sold_items.push(i);
    const p = await prevItemOwner.save();

    res.status(200);
    res.send({ message: "Item bought successfully!" });
});


router.put('/resell-marketplace-item', async (req, res) => {
    const user = await utilities.authenticateUser(req.cookies.auth_token);

    if (user === null) {
        res.status(401);
        res.json({ message: "Unauthorized user." });
        return
    }

    const items = await objectModel.find({ item_type: req.body.item_type, item_name: req.body.item_name });
    if (items.length === 0) {
        res.status(403);
        res.json({ message: "Item does not exist." });
        return
    }

    const item = items[0];
    if (item.owner.email !== user.email) {
        res.status(403);
        res.json({ message: "You are not the owner of the item." });
        return
    }

    if (req.body.price === undefined || req.body.price === null || isNaN(Number(req.body.price))) {
        res.status(403);
        res.json({ message: "Please set a valid number as price." });
        return
    }

    await objectModel.updateOne({ item_type: req.body.item_type, item_name: req.body.item_name }, {
        price: Number(req.body.price),
        item_type: 'marketplace'
    })

    res.status(200);
    res.send({ message: "Item reposted to marketplace successfully!" });
});


module.exports = router;