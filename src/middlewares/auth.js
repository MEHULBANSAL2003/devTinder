const jwt=require("jsonwebtoken");
const User = require("../models/user");

const userAuth=async(req,res,next)=>{

    try{

 const cookies=req.cookies;

 const {token}=cookies;

 if(!token){
    throw new Error("invalid token");
 }

 const validateToken=await jwt.verify(token,process.env.JWT_SECRET_KEY);

 const {_id}=validateToken;
 

 const user=await User.findById(_id);
y
 if(!user){
    throw new Error("user not found. Login to access");
 }
   
 req.user=user;
 next();

    }
    catch(err){
        res.send("ERROR : "+ err);
    }




}


module.exports={userAuth};

