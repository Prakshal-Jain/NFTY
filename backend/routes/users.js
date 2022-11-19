var express = require("express");
var router = express.Router(); 
const mongoose = require('mongoose');
const userModel = require("../dbModels/users_object"); 
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.status(200).send("GET request for users");
}); 

// create new user -- POST Request
router.post('/create-user', (req, res) => {
    // check for confirm password 
    var password = req.body.password
    var confirm = req.body.confirm 
    if (password != confirm) {
        // should have a pop up that said it didn't match
        res.redirect("/");
    } else {
        let newUser = new userModel({
            username: req.body.username,
            password: req.body.password,
            purchased_items: [], 
            sold_items: [],
            balance: "0", 
            shopping_cart: []
        })
        newUser.save(function(err,newUser){
            if(err) 
            res.send(err)
            else 
            // probably should redirect them to homepage instead of this 
            res.status(200).send("Welcome to NFTY, " + req.body.username + " :D")
        });
    }
    
}); 


module.exports = router; 