const express = require("express");
var router = express.Router();
const userModel = require("../models/user_object");
const fs = require('fs');
const path = require('path');
const { objectModel, imageModel } = require("../models/item_object");
const multer = require('multer');
// const upload = multer({ dest: 'upload/' });
// const type = upload.single('item_image');

// // /selling
// router.get('/', (req, res) => {
//     res.status(200);
//     res.send("GET request for selling");
// });

// // uploading a new item 
// router.post('/', type, (req, res) => {
//     console.log(req.file)
//     userModel.find({ auth_token: req.cookies.auth_token }, async (err, token_list) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             if (token_list.length === 0) {
//                 res.status(403);
//                 res.json({ message: "User profile Not Found" });
//             } else {
//                 if (req.body.item_name !== null && req.body.item_image !== null && req.body.description !== null && req.body.price !== null) {
//                     const user = token_list[0];
//                     const item_data = {
//                         item_name: req.body.item_name,
//                         description: req.body.description,
//                         price: req.body.price,
//                         owner: user,
//                     }

//                     const newItem = new objectModel(item_data)

//                     newItem.save(function (err, item) {
//                         if (err) {
//                             console.log(err)
//                         }
//                         else {
//                             console.log(item)
//                             res.status(200);
//                             res.json({ message: "Item created successfully." });
//                         }
//                     });
//                 }
//                 else {
//                     res.status(403);
//                     res.json({ message: "Please fill all requred fields." });
//                 }
//             }
//         }
//     });
// });

// using multer to store images 
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });
router.post('/', upload.single('item_image'), (req, res, next) => {

    const p = path.join('/root/backend', 'uploads', req.file.originalname); 

    fs.writeFileSync(p, req.file.buffer);
    var obj = {
        name: req.body.name,
        img: {
            data: fs.readFileSync(p),
            contentType: req.file.mimetype 
        }
    }
    imageModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/');
        }
    });
});


// serve every item from database 
router.get('/', (req, res) => {
    imageModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            console.log("Display images here");
            console.log(items);
            res.status(200); 
            res.json({ items: items });
        }
    });
});
// /selling/selling-details
router.get('/selling-details', (req, res) => {
    res.status(200);
    res.send("GET request for selling details");
});


module.exports = router;