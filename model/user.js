const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5,
        max:200
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:200,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1000
    },
    date:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('User', userScheme)