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

// add register new user details -- POST Request
router.post('/add-user', (req, res) => {
    // need to parse req -> get username, password and everything -> create new user -> save to database
    console.log(req.body);
    let newUser = new userModel({
        username: req.body.username,
        password: req.body.password,
        balance: req.body.balance
    })
    newUser.save(function(err,newUser){
        if(err) 
        res.send(err)
        else 
        res.send({status: 200, message: "User Created, Welcome to NFTY :D", new_user_details: newUser}); 
    });
}); 


module.exports = router; 