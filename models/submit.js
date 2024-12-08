const mongoose = require('mongoose');

const SubmitionSchema = mongoose.Schema({
    submitedby:{
        required:true,
        type:String,
        trim:true
    },
    fileid:{
        required:true,
        type:String,
    }
});

const Submition = mongoose.model("Submition",SubmitionSchema);
module.exports = Submition;