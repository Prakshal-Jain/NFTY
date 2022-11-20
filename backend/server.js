require('dotenv').config() 
const express = require('express');
const app = express();
//We want the api to run on a different port than our server to seperate the frontend and backend
const PORT = 1234;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// setting up database -> remember to start mongodb on machine :D
mongoose.connect(process.env.DATABASE, { useNewURLParser: true}) 
const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log("<---Database Connected--->"))
const router = express.Router()
module.exports = router;

app.get('/api', (req, res) => {
    res.send("hello world from express!");
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT + "\r\n")
    else
        console.log("Error occurred, server can't start", error);
});

const testing = require('./routes/testing');
const home = require('./routes/home');
//we use /api to make demonstrate it is for the backend and not client side
app.use('/api/testing', testing)
app.use('/', home)





