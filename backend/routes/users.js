var express = require("express");
var router = express.Router(); 

// "/users"
router.get('/', (req, res) => {
    res.status(200); 
    res.send("GET request for users");
}); 

// "/users/user-details"
router.get('/user-details', (req, res) => {
    res.status(200); 
    res.send("GET request for user detail"); 
}); 

// implement CRUD 4 user 

module.exports = router; 