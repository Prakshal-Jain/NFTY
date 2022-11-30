const express = require("express");
var router = express.Router();
const userModel = require("../models/user_object");
const { objectModel } = require("../models/item_object");
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const type = upload.single('item_image');

// /selling
router.get('/', (req, res) => {
    res.status(200);
    res.send("GET request for selling");
});

router.post('/', type, (req, res) => {
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
                        description: req.body.description,
                        price: req.body.price,
                        owner: user,
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

// /selling/selling-details
router.get('/selling-details', (req, res) => {
    res.status(200);
    res.send("GET request for selling details");
});


module.exports = router;