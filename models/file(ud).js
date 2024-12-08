const mongoose = require("mongoose");

const fileStorageSchema = mongoose.Schema({
    path:{
        required:true,
        type:String,
    }
});

const fileStorage = mongoose.model("fileStorage",fileStorageSchema);
module.exports = fileStorage;