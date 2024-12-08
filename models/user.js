const mongoose = require('mongoose');
const Classes = require('./class');

const UserSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true
    },
    email:{
        required:true,
        type:String,
        trim:true
    },
    password:{
        required:true,
        type:String,
    },
    classes:{
        type:Array,
        default:[]
    }
});

const User=mongoose.model("User",UserSchema);
module.exports=User;