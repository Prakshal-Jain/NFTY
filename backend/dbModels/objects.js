const mongoose = require('mongoose')
require('mongoose-type-url');


// schema for user infos 
const userSchema = new mongoose.Schema({
    username: String, 

    password: String, 

    // storing a list of purchase items 
    purchase_item: [{
        item_name: String,
        item_image: mongoose.SchemaTypes.Url, 
        description: String, 
        // probably another schema for this 
        auction_detail: String, 
        marketplace_detail: String
    }],

    sold_item: [{
        item_name: String,
        item_image: mongoose.SchemaTypes.Url, 
        description: String, 
        // probably another schema for this, or we can just declare the object in here w all the variables 
        auction_detail: String, 
        // price 
        marketplace_detail: String
    }],

    balance: String, 

    shopping_cart: [{
        item_name: String,
        item_image: mongoose.SchemaTypes.Url, 
        description: String, 
        auction_detail: String,  
        marketplace_detail: String
    }],

})

// schema for item infos
const objectSchema = new mongoose.Schema({
    item_name: String,
        item_image: mongoose.SchemaTypes.Url, 
        description: String, 
        auction_detail: String, 
        marketplace_detail: String
})


// sidenote: creating objects: https://stackoverflow.com/questions/20606456/whats-the-recommended-way-of-creating-objects-in-nodejs


