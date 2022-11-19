var express = require("express");
var router = express.Router(); 

// "/items"
router.get('/', (req, res) => {
    res.status(200); 
    res.send("GET Request For Items");
}); 

// "/item/item-details"
router.get('/item-details', (req, res) => {
    res.status(200); 
    res.send("GET Request for Items Details");
}); 

module.exports = router; 