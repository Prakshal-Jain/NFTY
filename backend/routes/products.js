var express = require("express");
var router = express.Router(); 

// "/products"
router.get('/', (req, res) => {
    res.status(200); 
    res.send("GET Request For Products");
}); 

// "/products/product-details"
router.get('/products-details', (req, res) => {
    res.status(200); 
    res.send("GET Request for Product Details");
}); 

module.exports = router; 