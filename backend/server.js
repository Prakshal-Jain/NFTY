const express = require('express');

const app = express();
const PORT = 8000;


// route for homepage 
app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});

// some routes we talked about during our meeting 
// route: buyNFT -> develop route: see other users' nfts + shopping cart 
app.get('/buyNFT', (req, res) => {
    res.status(200);
    res.send("Buy nft pls");
}); 

// route: sellNFT -> develop route: redirect to current inventory
// should put option to choose an available nft and sell 
app.get('/sellNFT', (req,res) => {
    res.status(200);
    res.send("sell nft");
})

//route auction 
app.get('/auction', (req,res) => {
    res.status(200);
    res.send("auction");
})



