require('dotenv').config() 
const express = require('express');
const app = express();
// running on a
const PORT = 8000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// setting up routes 
const itemsRouter     = require('./routes/items'); 
const usersRouter     = require('./routes/users'); 
const auctionRouter   = require('./routes/auction'); 
const purchaseRouter  = require('./routes/purchase'); 
const sellingRouter   = require('./routes/selling'); 

app.use('/items', itemsRouter); 
app.use('/users', usersRouter); 
app.use('/auction', auctionRouter); 
app.use('/purchase', purchaseRouter); 
app.use('/selling', sellingRouter);


// setting up database -> remember to start mongodb on machine :D
// mac: brew services start mongodb/brew/mongodb-community
mongoose.connect(process.env.DATABASE, { useNewURLParser: true}) 
const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log("---Database Connected---"))


// route for homepage 
app.get('/', (req, res) => {
    res.status(200); 
    res.sendFile(path.join(__dirname, "index.html"))
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT + "\r\n")
    else
        console.log("Error occurred, server can't start", error);
});

// kill server -> sudo lsof -i :8000 // kill -9 ID