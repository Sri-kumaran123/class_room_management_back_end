const express = require('express');
const chatmsg = express.Router();
const {
    addChatMessage,
    retriveChatMessage,
} = require('./functions/func');

chatmsg.route('/:id?')
    .post(addChatMessage)
    .get(retriveChatMessage)

module.exports =chatmsg;