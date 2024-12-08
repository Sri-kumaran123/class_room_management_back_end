const User = require('../models/user');
const Classes = require('../models/class');
const define = async (req,res,next) =>{
    const {userId,code}= req.body;
    console.log(code);
    const classes = await Classes.find({});
    console.log(classes);
    const classavb = await Classes.findOne({
        $or: [{ membercode: code }, { admincode: code }],
    });
    
    console.log(classavb);
    if(!classavb){
        return res
            .status(404).json({msg:"Code is invalid"})
    }
    req.body.classin = classavb;
    req.body.user=await User.findById(userId);
    next();
}

module.exports = define;