const express=require('express');
const bcryptjs=require('bcryptjs');
const User=require('../models/user')
const jwt=require('jsonwebtoken');
const auth = require('../middleware/auth');
const authRoute=express.Router();


authRoute.post("/signup" , async (req, res)=>{
    
    try{
        console.log(req.body)
        const {name,email,password}=req.body;
            console.log(name,email,password);
            const existinguser=await User.findOne({email});
    
            if(existinguser){
                return res
                    .status(400)
                    .json({msg:'User with same email already exists!'});
            }
    
            const hashPassword=await bcryptjs.hash(password,8);
    
            let user=new User({
                email,
                name,
                password:hashPassword
            });
    
            user=await user.save();
            res.json(user);  
    }
    catch(e){
        res.status(500).json({error:'Some server side error',e})
    }
});

// Sign in

authRoute.post("/signin", async (req, res)=>{
    try{
        const {email,password} = req.body;

        const user=await User.findOne({email});
        if(!user){
            return res
                .status(404)
                .json({msg:"User not found"});
        }

        const isMatch=await bcryptjs.compare(password,user.password);

        if(!isMatch) return res.status(400).json({msg:"Incorrect password"});

        const token=jwt.sign({id:user._id},"passwordKey");

        res.json({token,...user._doc});
    }
    catch(e){
        console.log(e);
    }
});

authRoute.get('/tokenisvalid',async (req,res) => {
    try{
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);
        const verified = jwt.verify(token,"passwordKey");
        if(!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        res.json(true);

    } catch(err) {
        res.status(500).json({error:e.message});
    }
});
authRoute.get('/',auth,async (req,res) => {
    console.log('start');
    const user = await User.findById(req.user);
    res.json({...user._doc,token:req.token});
})

module.exports=authRoute;