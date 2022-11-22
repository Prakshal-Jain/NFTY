const mongoose = require('mongoose');

// ** anything that is a list = list of items 
const userSchema = new mongoose.Schema({
    email: String,
    password: String, 
    purchased_items: [], 
    sold_items: [],
    balance: String, 
    shopping_cart: [],
    auth_token: String
}); 


const userModel = mongoose.model("User", userSchema); 
module.exports = userModel

// to store items ->> declare a new item -> add to a list -> add to user schema of a user 
// https://stackoverflow.com/questions/38399849/how-to-save-schemas-inside-schemas-using-mongoose