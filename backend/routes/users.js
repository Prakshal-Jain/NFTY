var express = require("express");
var router = express.Router(); 
const mongoose = require('mongoose');
const parser = require("body-parser");
const userModel = require("../dbModels/users_object"); 

// this is /users, what should we have here? 
router.get('/', (req, res) => {
    res.status(200); 
    res.send("GET request for users");
}); 

router.get('/add-user', (req, res) => {
    // need to parse req -> get username, password and everything -> create new user -> save to database
    let newUser = new userModel({
        username: "stirfrysushi", 
        password: "123456789", 
        balance: "50000", 
    })
    newUser.save(function(err,newUser){
        if(err) {
            res.send(err)
        } else {
            res.send({status: 200, message: "User Created, Welcome to NFTY :D", new_user_details: newUser}); 
        }
    });
}); 




module.exports = router; 