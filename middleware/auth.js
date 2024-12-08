const jwt = require('jsonwebtoken');

const auth = async (req,res) => {
    console.log('at token');
    try{
        const token = req.header("x-auth-token");

        if(!token){
            return res.status(401).json({msg:"no auth token Access denied!"});
        }
        const verified =jwt.verify(token, "passordKey");
        if(!verified)
            return res
                .status(401)
                .json({msg:"Token verification failed"});
        req.user=verified.id;
        req.token=token;
        next();
    } catch (err){
        res.status(500).json({error:err.message});
    }
}

module.exports = auth;