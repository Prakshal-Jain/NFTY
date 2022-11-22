const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
// const mongoose = require('mongoose');

var products = require('./routes/products'); 
var users = require('./routes/users'); 
var auction = require('./routes/auction'); 
var purchase = require('./routes/purchase'); 
var selling = require('./routes/selling'); 


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 8000;

// trying to set up database 
// mongoose.connect('mongodb://localhost:27017/myapp');

// setting up route 
app.use('/api/products', products); 
app.use('/api/users', users); 
app.use('/api/auction', auction); 
app.use('/api/purchase', purchase); 
app.use('/api/selling', selling)

// route for homepage 
app.use(express.static(path.join(__dirname, "..", "frontend", "build")))


// ================ Note by Prakshal: Make all the API calls above this line. Any call below this will be ignored
app.get('/*', async (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"))
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});


// kill server -> sudo lsof -i :8000 // kill -9 ID 


