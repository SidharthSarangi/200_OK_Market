const router = require("express").Router() ;
const Post = require("../models/Post") ;
const { route } = require("./conversations");

// All posts
router.get('/', async (req,res)=>{
    try {
        const post = await Post.find() ; 
        res.send(post) ;

    } catch (error) {
        console.log(error) ;
    }
})

// Posts for a particular userId
router.get('/particular', async (req,res)=>{
    try {
        const query = {from_userId: req.query.ownerId} ;
        const particularPost = await Post.find(query) ;
        res.send(particularPost) ;
    } catch (error) {
        console.log(error) ;
    }
})

// Delete a Post of the Owner
router.delete('/deletePost', async (req,res)=>{

    try {
        const query = {_id: req.query.no} ;
        const delPost = await Post.deleteOne(query) ;
        res.send(delPost) ;
    } catch (error) {
        console.log(error) ;
    }
} )

// +sell post an item
router.post('/sell', async (req,res)=>{
    const {inputs,imageURLs,user_Id} = req.body;
    try {
        
        const data = {
            from_userId : user_Id,
            price: inputs.price,
            description: inputs.description,
            productName: inputs.itemName,
            // imgUrl: [{ 
            //     img_urls: String
            // }]
            imgUrls: imageURLs
        }

        const insertedPost = await Post.create(data) ;
        console.log(insertedPost) ;
        res.send(insertedPost) ;
    } catch (error) {
        console.log(error) ;
    }
})


module.exports = router ;