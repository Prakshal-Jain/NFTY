const mongoose = require('mongoose'); 
const userModel = require('./user_object')

const auctionSchema = new mongoose.Schema({
    time: Number, 
    price: Number, 
    bidder: userModel
}); 

const transactionSchema = new mongoose.Schema({
    time: Number, 
    price: Number, 
    buyer: userModel, 
    seller: userModel
}); 

const imageSchema = new mongoose.Schema({
    name: String, 
    file: {
      data: Buffer,
      contentType: String,
    },
  });

const imageModel = mongoose.model("Image", imageSchema); 

// schema for item infos, each item saved on our website will go onto this schema 
const objectSchema = new mongoose.Schema({
    item_name: String,
    item_image: imageSchema,
    description: String, 
    auction_detail: [auctionSchema], 
    price: Number,
    owner: userModel, 
    transaction: transactionSchema
});

const objectModel = mongoose.model("Object", objectSchema); 
module.exports = {objectModel, objectSchema, imageModel};