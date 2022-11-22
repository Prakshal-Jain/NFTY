var express = require("express");
var router = express.Router(); 

// Base path: "/api/users"

router.get('/', (req, res) => {
    res.status(200);
    res.send("GET request for users");
});

router.post('/signup', (req, res) => {
    console.log(req.body)
    res.status(200); 
    res.send("POST request for signup");
});

// "/users/user-details"
router.get('/user-details', (req, res) => {
    res.status(200); 
    res.send("GET request for user detail"); 
}); 

// implement CRUD 4 user 

module.exports = router; 