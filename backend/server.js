const express = require('express');
const path = require('path')
// const mongoose = require('mongoose');

var products = require('./routes/products'); 
var users = require('./routes/users'); 
var auction = require('./routes/auction'); 
var purchase = require('./routes/purchase'); 
var selling = require('./routes/selling'); 


const app = express();
const PORT = 8000;

// setting up database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/database');

// adding user object to database 
const userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    }
}); 
// compile model 
const User = mongoose.model('User', userSchema);

// create document + testing 
const testing = new User({
    name: {first: "An", last: "Nguyen"}
}); 

testing_save = testing.save();



// setting up route 
app.use('/products', products); 
app.use('/users', users); 
app.use('/auction', auction); 
app.use('/purchase', purchase); 
app.use('/selling', selling)

// route for homepage 
app.use(express.static(path.join(__dirname, "..", "frontend", "build")))

app.get('/', async (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, "frontend", "..", "build", "index.html"))
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});


// kill server -> sudo lsof -i :8000 // kill -9 ID 


