var express = require("express");
var app = express(); 


var products = require('./routes/products'); 
var users = require('./routes/users'); 
var auction = require('./routes/auction'); 


app.use('/products', products); 
app.use('/users', users); 
app.use('/auction', auction); 


module.exports = app; 