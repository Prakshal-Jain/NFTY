// under revision 

var express = require('express');
var app = express(); 


var products = require('./products'); 
var users = require('./users'); 
var auction = require('./auction'); 

app.use('/products', products); 
app.use('/users', users); 
app.use('/auction', auction); 


module.exports = app; 