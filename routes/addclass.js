const express = require('express');
const define = require('../middleware/userandclass');
const {
    addMembersInClass,
} = require('./functions/func');
const classWithuser = express.Router();

classWithuser.use(define);

classWithuser.route('/')
    .post(addMembersInClass)

module.exports = classWithuser;
