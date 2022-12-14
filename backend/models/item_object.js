const mongoose = require('mongoose');
const userModel = require('./user_object')

const auctionSchema = new mongoose.Schema({
  time: String,
  price: Number,
  bidder: userModel
});

const auctionModel = mongoose.model("Auction", auctionSchema);

const transactionSchema = new mongoose.Schema({
  time: String,
  price: Number,
  buyer: userModel,
  seller: userModel
});

const transactionModel = mongoose.model("Transaction", transactionSchema);

const chatSchema = new mongoose.Schema({
  email: String,
  message: String,
})

const chatModel = mongoose.model("Chat", chatSchema);

// schema for item infos, each item saved on our website will go onto this schema 
const objectSchema = new mongoose.Schema({
  item_name: String,
  item_image: String,
  description: String,
  auction_detail: [auctionSchema],
  price: Number,
  expiration_time: String,
  owner: userModel,
  transaction: [transactionSchema],
  item_type: {
    type: String,
    enum: ['marketplace', 'auction', 'none'],
    required: true
  },
  chat: [chatSchema],
});

const objectModel = mongoose.model("Object", objectSchema);
module.exports = { objectModel, objectSchema, transactionModel, auctionModel, chatModel };