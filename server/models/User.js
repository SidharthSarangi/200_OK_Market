const mongoose = require('mongoose') ;
const {Schema} = mongoose  ;

const userSchema = new mongoose.Schema({
    user_id :  String,
    hashed_password: String,
    owner_name:String,
    email:{
        type: String,
        required: true,
        unique: true
    }
})

const User = mongoose.model('User', userSchema) ;

module.exports = User ;