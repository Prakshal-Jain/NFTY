const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String, 
    password: String, 
    balance: String, 
}); 


const userModel = mongoose.model("User", userSchema); 
module.exports = userModel