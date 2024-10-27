const express=require("express");
const app=express();
const port =7777;

const {adminAuth}=require("./middlewares/auth.js");

app.use("/admin",adminAuth);

app.get('/admin/getData',(req,res)=>{
    res.send("all data sent sucessfully");
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("user deleted sucessfully");
})




app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})