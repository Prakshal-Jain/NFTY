var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const userModel = require("../models/user_object");
const bodyParser = require('body-parser');
const utilities = require('../utilities')

// Base path: "/api/users"

router.get('/', (req, res) => {
    res.status(200);
    res.send("GET request for users");
});

router.post('/signup', (req, res) => {
    if (req.body !== null || Object.keys(req.body) > 0) {
        if (req.body.email !== undefined && req.body.email !== null && utilities.validateEmail(req.body.email) && req.body.password !== undefined && req.body.password !== null && req.body.password.length > 0 && req.body.confirmPassword !== undefined && req.body.confirmPassword !== null && req.body.confirmPassword.length > 0 && req.body.password === req.body.confirmPassword) {
            userModel.find({ email: req.body.email }, async (err, user_list) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user_list.length > 0) {
                        res.status(403);
                        res.json({ message: "User already exist. Please login instead." });
                    }
                    else {
                        // Generate an auth token
                        const uniqueValidToken = utilities.generateUniqueValidToken(27);
                        const hashedPassword = await utilities.hashPassword(req.body.password);

                        const newUser = new userModel({
                            // make sure no HTML attack + check for validity w regrex
                            email: req.body.email,
                            password: hashedPassword,
                            purchased_items: [],
                            sold_items: [],
                            balance: "0",
                            shopping_cart: [],
                            auth_token: uniqueValidToken
                        })
                        newUser.save(function (err, newUser) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                res.cookie('auth_token', newUser.auth_token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                                res.status(200);
                                res.redirect("/profile");                             
                            }
                        });
                    }
                }
            })
        }
        else {
            res.status(403)
            res.json({ message: "Please enter a valid Username and Password." });
        }
    }
    else {
        res.status(400)
        res.json({ message: "Didn't received valid credentials." });
    }
});

router.post('/login', (req, res) => {
    if (req.body !== null || Object.keys(req.body) > 0) {
        if (req.body.email !== undefined && req.body.email !== null && utilities.validateEmail(req.body.email) && req.body.password !== undefined && req.body.password !== null && req.body.password.length > 0) {
            userModel.find({ email: req.body.email }, async (err, user_list) => {
                if (err) {
                    console.log("Database error in login");
                }

                if (user_list.length === 0) {
                    res.status(403)
                    res.json({ message: "Incorrect email or password. Please try again." });
                }
                else {
                    const user = user_list[0];
                    // Check if passwords match
                    const isValidPassword = await utilities.validatePassword(req.body.password, user.password);
                    if (isValidPassword) {
                        const uniqueValidToken = utilities.generateUniqueValidToken(27);
                        userModel.updateOne({email: user.email}, {$set: {auth_token: uniqueValidToken}}, (err, data) => {
                            if(err){
                                res.status(500);
                                res.json({ message: "An error occured." });
                            }
                            else{
                                res.cookie('auth_token', uniqueValidToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                                res.status(200);
                                res.json({ message: "Logged in successfully." });
                            }
                        })
                    }
                    else {
                        res.status(403);
                        res.json({ message: "Please enter a valid Username and Password." });
                    }
                }
            })
        }
        else {
            res.status(403)
            res.json({ message: "Please enter a valid Username and Password." });
        }
    }
    else {
        res.status(400)
        res.json({ message: "Didn't received valid credentials." });
    }
});


router.get('/profile', (req, res) => {
    // Get the token cookie and check if it is exist and valid. If true, return data related to the corresponding user.
    userModel.find({ auth_token: req.cookies.auth_token }, async (err, token_list) => {
        if (err) {
            console.log(err);
        } else {
            if (token_list.length === 0) {
                res.status(403);
                res.json({ message: "Profile Not Found" });
            } else {
                const user = token_list[0]; 
                const dict = {
                    email: user.email,
                    purchased_items: user.purchased_items,
                    sold_items: user.sold_items, 
                    balance: user.balance,
                    shopping_cart: user.shopping_cart
                };
                res.status(200);
                res.json(dict);
            }
        }
    });
}); 

// implement CRUD 4 user

module.exports = router;