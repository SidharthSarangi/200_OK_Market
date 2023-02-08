const mongoose = require('mongoose') ;
const {Schema} = mongoose  ;

const PostSchema = new mongoose.Schema({
    from_userId : String,
    price: Number,
    description: String,
    productName: String,
    // imgUrl: [{ 
    //     img_urls: String
    // }],
    imgUrls: [String]

})

const Post = mongoose.model('Post', PostSchema) ;

module.exports = Post ;