var express = require("express");
var router = express.Router();

var multer  = require('multer');
var upload = multer({ dest: 'upload/'});
var type = upload.single('item_image');

// /selling
router.get('/', (req, res) => {
    res.status(200);
    res.send("GET request for selling");
});

router.post('/', type, (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.sendStatus(200);
});

// /selling/selling-details
router.get('/selling-details', (req, res) => {
    res.status(200);
    res.send("GET request for selling details");
});


module.exports = router;