const express=require("express");
const { connectDB } = require("./config/database.js");
const User=require("./models/user.js")
const app=express();    
const port =7777;

app.use(express.json()); // middleware to parse the data to json from client;

app.post("/signup",async (req,res)=>{


     //console.log(req.body);
     const obj=req.body;
     console.log(obj);
    const user=new User(obj);

    // await user.save();
    // const userObj={
    //     firstName:"Mehul",
    //     lastName:"Bansal",
    //     emailId:"mehul@bansal.com",
    //     password:"Mehul@123"
    // }

    // const user=new User(userObj);

    try{
    await user.save();

    res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("an error occured ", err);
    }

})


app.get("/feed",async (req,res)=>{
  
  try{
  const data=await User.find();
  if(data.length===0){
    res.status(404).send("no user found");
  }else{
  res.send(data);
  }  
}
  catch(err){
    console.log("something went wrong", err);
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

