const mongoose = require('mongoose');

const AssignmentSchema = mongoose.Schema({
    title:{
        required:true,
        type:String,
        trim:true
    },
    description:{
        required:true,
        type:String,
    },
    submition:{
        type:Array,
        default:[]
    },
    lastdate:{
        required:true,
        type:Date
    }
});

const Assignments = mongoose.model("Assignments",AssignmentSchema);
module.exports = Assignments;