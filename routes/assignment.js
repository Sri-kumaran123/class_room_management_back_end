const express = require('express');
const Assign = express.Router();
const {
    retriveAssignment,
    addAssignment
} = require('./functions/assignment_material');

Assign.route("/:id?")
        .post(addAssignment)
        .get(retriveAssignment)
module.exports = Assign;