const mongoose = require('mongoose');
const Material = require('./material');

const ClassRoomSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true
    },
    description:{
        required:true,
        type:String,
    },
    admincode:{
        required:true,
        type:String,
        trim:true
    },
    membercode:{
        required:true,
        type:String,
        trim:true
    },
    admin:{
        type:Array,
        default:[]
    },
    members:{
        type:Array,
        default:[]
    },
    assignments:{
        type:Array,
        default:[]
    },
    material:{
        type:Array,
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});

const Classes = mongoose.model("Classes",ClassRoomSchema);
module.exports=Classes;