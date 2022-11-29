var express = require("express");
var router = express.Router(); 

// need to implement auction 

// "/auction"
router.get('/', (req, res) => {
    res.status(200); 
    res.send("GET Request For Auction");
}); 

// "/auction/auction-details"
router.get('/auction-details', (req, res) => {
    res.status(200); 
    res.send("GET Request for Auction Details");
}); 

module.exports = router; 