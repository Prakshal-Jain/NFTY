// schema for item infos
const objectSchema = new mongoose.Schema({
    item_name: String,
        item_image: mongoose.SchemaTypes.Url, 
        description: String, 
        auction_detail: String, 
        marketplace_detail: String
})

// sidenote: creating objects: https://stackoverflow.com/questions/20606456/whats-the-recommended-way-of-creating-objects-in-nodejs

