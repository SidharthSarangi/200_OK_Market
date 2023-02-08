const router = require("express").Router() ;
const User = require("../models/User") ;
const {v4: uuidv4} = require('uuid') ;
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt') ;

// SIGNUP
router.post('/signup', async (req,res)=>{
    const {ownerName,email, password} = req.body ;
    const generatedUserId = uuidv4() ;

    const encryptedPassword = await bcrypt.hash(password, 10) ;

    try{    

        const existingUser = await User.findOne({email}) ;
        if(existingUser){
            return res.status(409).send("User already exists. Please Login") ;
        }

        const sanitizedEmail = email.toLowerCase() ;

        const data = {
            owner_name:ownerName,
            user_id : generatedUserId, 
            email: sanitizedEmail,
            hashed_password: encryptedPassword
        }

        const insertedUser = await User.create(data) ;
        console.log(insertedUser) ;

        const token = jwt.sign(
            { user_id: insertedUser.user_id, email,password:encryptedPassword },
            process.env.TOKEN_KEY,
            {
              expiresIn: "24h",
            }
          );        
          
          res.status(201).json({token,userId:generatedUserId}) ;

    }catch(err){
        console.log(err) ;
    }
})


// LOGIN
router.post('/login' , async (req,res)=>{
    const {ownerName,email, password} = req.body;
    try {
        
        const user = await User.findOne({email}) ;
        
        if(user && (await bcrypt.compare(password, user.hashed_password))){

            const token = jwt.sign(
                { user_id:user.user_id ,email, password:user.hashed_password },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "24h",
                }
              );
            res.status(201).json({token, userId: user.user_id}) ;
        }

        res.status(400).send('Invalid Credentials') ;        

    } catch (error) {
        console.log(error) ;
    }
})


module.exports = router ;