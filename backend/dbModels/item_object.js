const mongoose = require('mongoose')

// schema for user infos 
const userSchema = new mongoose.Schema({
    username: String, 
    password: String, 
    balance: String, 
})