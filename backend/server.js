require('dotenv').config() 

const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');

var products = require('./routes/products'); 
var users = require('./routes/users'); 
var auction = require('./routes/auction'); 
var purchase = require('./routes/purchase'); 
var selling = require('./routes/selling'); 



// setting up database -> remember to start mongodb on machine!
mongoose.connect(process.env.DATABASE, { useNewURLParser: true}) 

// check status with connections
const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log("---Database Connected---"))


// // adding user object to database 
// const userSchema = new mongoose.Schema({
//     name: {
//         first: String,
//         last: String
//     }
// }); 
// // compile model 
// const user = mongoose.model('User', userSchema);

// // create document + testing 
// const testing = new user({
//     name: {first: "An"}
// }); 



// // setting up route 
// app.use('/products', products); 
// app.use('/users', users); 
// app.use('/auction', auction); 
// app.use('/purchase', purchase); 
// app.use('/selling', selling)

// route for homepage 
app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT + "\r\n")
    else
        console.log("Error occurred, server can't start", error);
});






// kill server -> sudo lsof -i :8000 // kill -9 ID 
// git branch stuff: git add -A, git commit -m "", git push -u origin [branchname] 
// run with nodemon --> nodemon server.js
// need to start mongodb on terminal before using mongoose 
// -> mongosh -> mongoose -> mongodb 




