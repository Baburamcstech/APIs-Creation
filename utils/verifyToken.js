const jwt=require("jsonwebtoken");
const verifyToken=(req,res,next)=>{
    const token=req.cookies.mycookies;
    if(!token){
        return res.json("You are not authenticated!")
    }
    jwt.verify(token,"secret",(err,decodedData)=>{
        if(err) return res.json("token is not valid");
        req.decodedData=decodedData;
        next();
    });
};
module.exports.verifyToken=verifyToken;