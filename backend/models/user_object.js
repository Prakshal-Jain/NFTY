const mongoose = require('mongoose');
const {objectSchema} = require('./item_object'); 

// ** anything that is a list = list of items 
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String, 
    purchased_items: [objectSchema], 
    sold_items: [objectSchema],
    balance: Number, 
    shopping_cart:  [objectSchema],
    auth_token: String
});

const userModel = mongoose.model("User", userSchema); 
module.exports = userModel

// to store items ->> declare a new item -> add to a list -> add to user schema of a user 
// https://stackoverflow.com/questions/38399849/how-to-save-schemas-inside-schemas-using-mongoose