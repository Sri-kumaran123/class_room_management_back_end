const mongoose = require('mongoose');

const MaterialsSchema= mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true
    },
    fileid:{
        required:true,
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const Material = mongoose.model("Material",MaterialsSchema);
module.exports=Material;