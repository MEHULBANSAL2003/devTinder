
const adminAuth=(req,res,next)=>{
    const token="xyz";

    if(token!=="xyz"){
        res.status(401).send("unauthorized request");
    }
    else{
        next();
    }

}

module.exports={
    adminAuth,
}


