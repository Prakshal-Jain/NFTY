const mongoose = require('mongoose');
const itemModel = require('./item_objects'); 


// ** anything that is a list = list of items 
const userSchema = new mongoose.Schema({
    email: String,
    password: String, 
    purchased_items: [itemModel], 
    sold_items: [itemModel],
    balance: Number, 
    shopping_cart: [itemModel],
    auth_token: String
}); 


const userModel = mongoose.model("User", userSchema); 
module.exports = userModel

// to store items ->> declare a new item -> add to a list -> add to user schema of a user 
// https://stackoverflow.com/questions/38399849/how-to-save-schemas-inside-schemas-using-mongoose