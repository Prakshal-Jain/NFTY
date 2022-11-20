require('dotenv').config() 
const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// setting up database -> remember to start mongodb on machine :D
mongoose.connect(process.env.DATABASE, { useNewURLParser: true}) 
const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log("<---Database Connected--->"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const router = express.Router()
module.exports = router;


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT + "\r\n")
    else
        console.log("Error occurred, server can't start", error);
});

const routes = require('./routes/routes');
const home = require('./routes/home');
app.use('/testing', routes)
app.use('/', home)





