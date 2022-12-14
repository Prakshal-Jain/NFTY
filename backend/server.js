const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

var users = require('./routes/users');
var {server, auction, app} = require('./routes/auction');
var items = require('./routes/items');

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());

const PORT = 8000;

// setting up database 
// make sure you install dotenv on backend + start database on terminal
mongoose.connect((process.env.DATABASE).replace('localhost', 'mongo'), { useNewURLParser: true })
const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log("---Database Connected---"))

// setting up route 
app.use('/api/users', users);
app.use('/api/auction', auction);
app.use('/api/items', items);

// route for homepage 
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use(express.static(path.join(__dirname, "uploads")));


// ================ Note by Prakshal: Make all the API calls above this line. Any call below this will be ignored
app.get('/*', async (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

server.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});


// kill server -> sudo lsof -i :8000 // kill -9 ID 

