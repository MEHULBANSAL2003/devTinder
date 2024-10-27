const express=require("express");
const { connectDB } = require("./config/database.js");
const User=require("./models/user.js")
const app=express();    
const port =7777;



app.post("/signup",async (req,res)=>{

    const userObj={
        firstName:"Mehul",
        lastName:"Bansal",
        emailId:"mehul@bansal.com",
        password:"Mehul@123"
    }

    const user=new User(userObj);

    try{
    await user.save();

    res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("an error occured ", err);
    }

})









connectDB()
  .then(() => {
    console.log("connected to db succesfuly");
    app.listen(port,()=>{
        console.log(`server listening on port ${port}`);
    })
  })
  .catch((err) => {
    console.log("an error occured while connecting to database", err);
  });

