const express = require('express');
const router = express.Router()
module.exports = router;

const User_model = require('../dbModels/user_model');

console.log("routes/routes is working")
// route for homepage 

router.get('/', (req, res) => {
    res.status(200);
    res.send("This is the testing root");
});

router.get('/reset', (req, res) => {
    res.status(200);
    User_model.remove({}, function(err) { 
        console.log('collection removed') 
     });
    res.send("Database has been reset");
});

router.post('/post', async (req, res) => {
    const data = new User_model({
        username: req.body.username,
        password: req.body.password
    })
    try {
        const dataToSave = await data.save();
        console.log(dataToSave)
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await User_model.find();
        var users = [];
        for (let i = 0; i  < data.length; i++) {
            users.push(data[i].username)
        }
        console.log(users)
        res.json(users)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
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