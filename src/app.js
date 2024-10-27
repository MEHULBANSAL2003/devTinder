const express=require("express");

const app=express();

const port =7777;

// app.use("/",(req,res)=>{
//     res.send("home");
// })


app.use("/hello",(req,res)=>{
    res.send("hello");
})

app.use("/test",(req,res)=>{
    res.send("test");
})


app.use("/hello/ancd",(req,res)=>{
    res.send("fgjklrd");
})

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})