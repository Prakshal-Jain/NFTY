var express = require("express");
var router = express.Router(); 

// "/products"
router.get('/', (req, res) => {
    res.send("Get Request For Products");
}); 

// "/products/product-details"
router.get('/products-details', (req, res) => {
    res.send("Get Request for Product Details");
}); 

module.exports = router; 