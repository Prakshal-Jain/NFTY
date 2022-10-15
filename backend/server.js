const express = require('express');

var products = require('./routes/products'); 
var users = require('./routes/users'); 
var auction = require('./routes/auction'); 
var purchase = require('./routes/purchase'); 
var selling = require('./routes/selling'); 

const app = express();
const PORT = 8000;


app.use('/products', products); 
app.use('/users', users); 
app.use('/auction', auction); 
app.use('/purchase', purchase); 
app.use('/selling', selling)

// route for homepage 
app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});


// kill server -> sudo lsof -i :8000 // kill -9 ID 


