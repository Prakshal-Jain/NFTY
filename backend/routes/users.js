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
        if (req.body.username !== undefined && req.body.username !== null && req.body.email !== undefined && req.body.email !== null && utilities.validateEmail(req.body.email) && req.body.password !== undefined && req.body.password !== null && req.body.password.length > 0 && req.body.confirmPassword !== undefined && req.body.confirmPassword !== null && req.body.confirmPassword.length > 0 && req.body.password === req.body.confirmPassword) {
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
                            email: req.body.email,
                            username: req.body.username,
                            password: hashedPassword,
                            purchased_items: [],
                            sold_items: [],
                            balance: 5000,
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
                                res.json({ message: "User signed up successfully." });
                            }
                        });
                    }
                }
            })
        }
        else {
            res.status(403)
            res.json({ message: "Please enter a valid Email and Password." });
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
                        userModel.updateOne({ email: user.email }, { $set: { auth_token: uniqueValidToken } }, (err, data) => {
                            if (err) {
                                res.status(500);
                                res.json({ message: "An error occured." });
                            }
                            else {
                                res.cookie('auth_token', uniqueValidToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                                res.status(200);
                                res.json({ message: "Logged in successfully." });
                            }
                        })
                    }
                    else {
                        res.status(403);
                        res.json({ message: "Please enter a valid Email and Password." });
                    }
                }
            })
        }
        else {
            res.status(403)
            res.json({ message: "Please enter a valid Email and Password." });
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
        }
        else {
            if (token_list.length === 0) {
                res.status(403);
                res.json({ message: "Profile Not Found" });
            } else {
                const user = token_list[0];
                const dict = {
                    email: user.email,
                    username: user.username,
                    purchased_items: utilities.filterItemList(user.purchased_items),
                    sold_items: utilities.filterItemList(user.sold_items),
                    balance: user.balance,
                    shopping_cart: utilities.filterItemList(user.shopping_cart)
                };
                res.status(200);
                res.json(dict);
            }
        }
    });
});


router.get('/logout', (req, res) => {
    const auth_token = req.cookies.auth_token;
    // go into user detail -> get auth_token -> clear
    userModel.find({ auth_token: auth_token }, async (err, token_list) => {
        if (err) {
            console.log(err);
        }
        else {
            if (token_list.length === 0) {
                res.clearCookie('auth_token');
                res.status(403);
                res.json({ message: "User Not Found" });
            } else {
                res.clearCookie('auth_token');
                userModel.updateOne({ auth_token: token_list[0].auth_token }, { $set: { auth_token: null } }, (err, data) => {
                    if (err) {
                        res.status(500);
                        res.json({ message: "An error occured." });
                    }
                    else {
                        res.status(200);
                        res.json({ message: "Logged out successfully." });
                    }
                });
            }
        }
    });
});

router.put('/update-username', async (req, res) => {
    const user = await utilities.authenticateUser(req.cookies.auth_token)
    if (user === null) {
        res.status(401);
        res.json({ message: "Unauthorized user." });
        return
    }

    user.username = req.body.username;
    const u = await user.save();

    res.status(200);
    res.send({ message: "Username updated successfully!" });
})

module.exports = router;