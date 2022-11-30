var express = require("express");
var router = express.Router(); 

// /selling
router.get('/', (req, res) => {
    res.status(200); 
    res.send("GET request for selling");
}); 

// /selling/selling-details
router.get('/selling-details', (req, res) => {
    res.status(200); 
    res.send("GET request for selling details"); 
}); 


module.exports = router;