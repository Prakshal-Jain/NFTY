const mongoose = require('mongoose'); 
const userModel = require('./user_object')
const auctionModel = require('./auction_object')

// schema for item infos, each item saved on our website will go onto this schema 
const objectSchema = new mongoose.Schema({
    item_name: String,
    item_image: String,
    description: String, 
    auction_detail: [auctionModel], 
    price: String,
    owner: userModel
});

const objectModel = mongoose.model("Object", objectSchema); 
module.exports = objectModel