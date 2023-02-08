const express = require("express") ;
const app = express() ;
const dotenv = require("dotenv") ;
const cors = require('cors') ;
const PORT = 8000 ;
app.use(express.json()) ;
app.use(cors()) ;
dotenv.config({path:'./config.env'}) ;
require('./db/conn') ;


const conversationRoute = require("./routes/conversations"); 
const messageRoute = require("./routes/messages") ;
// const postRoute = require("./routes/posts") ;
const authRoute = require("./routes/auth") ;
const sellerRoute = require("./routes/sellerdetail") ;
const sellRoute = require("./routes/posts") ;


// app.use('/showposts', postRoute) ;
app.use('/auth', authRoute) ;
app.use('/conversations', conversationRoute) ;
app.use('/messages', messageRoute) ;
app.use('/sellerdetails', sellerRoute) ;
app.use('/item',sellRoute) ;


app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`) ;
}) ;