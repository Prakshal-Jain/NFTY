const express = require('express');
const router = express.Router()
module.exports = router;

const User_model = require('../dbModels/user_model');

console.log("homepage is working")
// route for homepage 
router.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

//Post Method
router.post('/post', (req, res) => {
    res.status(200)
    res.send('Post API')
})

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})