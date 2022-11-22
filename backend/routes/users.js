var express = require("express");
var router = express.Router(); 
const mongoose = require('mongoose');
const userModel = require("../models/user_object"); 
const bodyParser = require('body-parser');

// Base path: "/api/users"

router.get('/', (req, res) => {
    res.status(200);
    res.send("GET request for users");
});

router.post('/signup', (req, res) => {
    // Set a token as cookie on signup
    res.cookie('auth_token', "BLABLABLA", { maxAge: 900000, httpOnly: true });
    res.send("POST request for signup");

    // confirm password check 
    var password = req.body.password
    var confirmPassword = req.body.confirmPassword
    if (password != confirmPassword) {
        res.status(404);
        res.redirect('/login?error=' + encodeURIComponent('Incorrect_Credential'));
    } else {
        let newUser = new userModel ({
            // make sure no HTML attack + check for validity w regrex
            username: req.body.email,
            password: password,
            purchased_items: [], 
            sold_items: [],
            balance: "0", 
            shopping_cart: []
        })
        newUser.save(function(err,newUser){
            if(err) 
            res.send(err)
            else 
            res.status(200);
            res.json({message: "Successfully signed in"}); 
        });
    }
});

router.post('/login', (req, res) => {
    // Set a token as cookie on login
    console.log(req.body)
    res.status(200);
    res.send("POST request for login");
});


router.get('/profile', (req, res) => {
    // Get the token cookie and check if it is exist and valid. Is true, return data related to the corresponding user.
    console.log(req.cookies)
    res.status(200);
    res.send("GET request for user detail");
});

// implement CRUD 4 user

module.exports = router; 