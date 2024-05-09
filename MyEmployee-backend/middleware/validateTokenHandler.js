const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        //console.log("Token: ",token);
        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing")
        }

        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
               
            }
            //console.log(decoded);
            req.user=decoded.usser;
            next();
        })
        
    }else{
        res.status(401)
        throw new Error("UnAuthorized user")
    }
})
module.exports=validateToken;