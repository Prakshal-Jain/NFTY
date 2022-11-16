const express = require("express");
const router = express.Router(); 

// "/users" ->> implementing CRUD  
router.get('/', (req, res) => {
    res.status(200); 
    res.send("GET request for users");
}); 

// handle get 
router.get('/:username', (req, res) => {
    
    // save username for database 
    var username = req.params.username
    // send response
    res.status(200);
    res.send("Current ID: " + username)
})

// handle post
router.post('/', (req,res) => {
    res.status(200);
})

//handle update 
router.patch('/', (req,res) => {
    res.status(200);
})

// handle delete 
router.delete('/:id', (req,res) => {
    res.status(200)
})


module.exports = router; 