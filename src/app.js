const express=require("express");
const { connectDB } = require("./config/database.js");
const app=express();
const port =7777;


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

