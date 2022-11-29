const mongoose = require('mongoose');
const userModel = require('./user_object')

const auctionSchema = new mongoose.Schema({
    time: Number, 
    price: Number, 
    bidder: userModel
}); 


const auctionModel = mongoose.model("Auction", auctionSchema); 
module.exports = auctionModel