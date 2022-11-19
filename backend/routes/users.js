var express = require("express");
var router = express.Router(); 
const mongoose = require('mongoose');
const userModel = require("../dbModels/users_object"); 
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

// this is /users, what should we have here? 
router.get('/', (req, res) => {
    res.status(200).send("GET request for users");
}); 

// create new user rm -- POST Request
router.post('/add-user', (req, res) => {

    let newUser = new userModel({
        username: req.body.username,
        password: req.body.password,
    })
    newUser.save(function(err,newUser){
        if(err) 
        res.send(err)
        else 
        res.status(200).send("Welcome to NFTY, " + req.body.username + " :D")
    });
}); 


module.exports = router; 