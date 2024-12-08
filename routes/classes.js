const express = require('express');
const classRoute = express.Router();
const {
    getClass,
    addClass,
    modifyClass
} = require('./functions/func');
const User = require('../models/user');

classRoute.route('/user/:id')
    .get( async (req,res) =>{
        try{
            const id=req.params.id;

            const user = await User.findById(id)
            console.log(user);
            
            res.status(200).json(user);
        } catch (e) {

        }
    })
classRoute.route('/:id?')
    .get(getClass)
    .post(addClass)
    .put(modifyClass)
module.exports = classRoute;