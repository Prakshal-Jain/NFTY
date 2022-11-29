const mongoose = require('mongoose'); 
const userModel = require('./user_object')

const auctionSchema = new mongoose.Schema({
    time: Number, 
    price: Number, 
    bidder: userModel
}); 

// schema for item infos, each item saved on our website will go onto this schema 
const objectSchema = new mongoose.Schema({
    item_name: String,
    item_image: String,
    description: String, 
    auction_detail: [auctionSchema], 
    price: Number,
    owner: userModel
});

const objectModel = mongoose.model("Object", objectSchema); 
module.exports = {objectModel, objectSchema}