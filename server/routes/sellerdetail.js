const router = require("express").Router() ;
const User = require("../models/User") ;

// Detail of a particular seller
router.get('/', async (req,res)=>{
    const {userId} = req.query;

    try {
        const user = await User.findOne({user_id:userId}) ;
        // const user = await User.find() ;
        res.send(user) ;
    } catch (error) {
        res.status(500).json(error);
    }
})


 
module.exports = router ;