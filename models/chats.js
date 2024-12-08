const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    room: { type: String, required: true }, // Chat room identifier
    name: { type: String, required: true },
    id:{type:String,required:true},
    message: { type: String, required: true },
    time: { type: Date, default: Date.now },
  });
  
  const Chat = mongoose.model('Chat', chatSchema);
  module.exports=Chat;
  