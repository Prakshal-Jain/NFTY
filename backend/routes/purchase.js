var express = require("express");
var router = express.Router(); 

// "/purchase"
router.get('/', (req, res) => {
    res.status(200); 
    res.send("GET Request For purchase");
}); 

// "/purchase/purchase-details"
router.get('/purchase-details', (req, res) => {
    res.status(200); 
    res.send("GET Request for purchase detail");
}); 

module.exports = router; 