const express = require('express');
const material = express.Router();
const {
    uploadMiddleware, 
    downloadMiddlewaresubmit,
    downloadMiddleware} = require('../middleware/materialfile');
const {
    addMaterial,
    retriveMaterial,
    addSubmition,
    retrieveSubmission,
    retriveAssignment,
    retriveMaterialdata,
} = require('./functions/assignment_material');



material.route("/submit/:id?")
    .post(uploadMiddleware,addSubmition)
    .get(downloadMiddlewaresubmit,retriveMaterial)

material.route("/submitdetails/:id")
    .get(retrieveSubmission)
material.route("/detail/:id")
    .get(retriveMaterialdata)
material.route("/:id?")
    .post(uploadMiddleware,addMaterial)
    .get(downloadMiddleware,retriveMaterial);
module.exports = material;