var express = require("express");
var router = express.Router(); 

// "/auction"
router.get('/', (req, res) => {
    res.send("Get Request For Auction");
}); 

// "/auction/auction-details"
router.get('/auction-details', (req, res) => {
    res.send("Get Request for Auction Details");
}); 

module.exports = router; 