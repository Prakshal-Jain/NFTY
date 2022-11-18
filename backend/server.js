require('dotenv').config() 
const express = require('express');
const app = express();
const PORT = 8000;
const path = require('path');
const mongoose = require('mongoose');


// this is for parsing incoming JSON requests 
app.use(express.json())

// setting up routes 
const products = require('./routes/products'); 
const users = require('./routes/users'); 
const auction = require('./routes/auction'); 
const purchase = require('./routes/purchase'); 
const selling = require('./routes/selling'); 

app.use('/products', products); 
app.use('/users', users); 
app.use('/auction', auction); 
app.use('/purchase', purchase); 
app.use('/selling', selling)


// setting up database -> remember to start mongodb on machine :D
mongoose.connect(process.env.DATABASE, { useNewURLParser: true}) 
const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log("<---Database Connected--->"))


// route for homepage 
app.get('/', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname+'/testing.html'));
});



app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT + "\r\n")
    else
        console.log("Error occurred, server can't start", error);
});

// npm install dotenv for environmnet variable