const express=require("express");
const authRouter=express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const {validateSignUpData,validateLoginData,} = require("../utils/validation.js");




authRouter.post("/signup", async (req, res) => {
    // validating the data
    try {
      validateSignUpData(req);
      const { firstName, lastName, emailId, password } = req.body;
  
      const registeredUser = await User.find({ emailId: emailId });
      if (registeredUser.length > 0) {
        throw new Error("user already registered");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const obj = req.body;
  
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: hashedPassword,
      });
      await user.save();
      res.send("user added successfully");
    } catch (err) {
      res.status(400).send("ERROR : " + err);
    }
  });
  

  authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      validateLoginData(req);
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("user not registered.Sign up first");
      }
  
      const isPasswordValid = await user.validatePassword(password);
      if (isPasswordValid) {
        // create a jwt token
  
        const token = await user.getJWT();
  
        // add token to cookie and send it back to the user
        res.cookie("token", token, {
          expires: new Date(Date.now() + 1 * 3600000),
        });
        res.send("logged in successfully");
      } else {
        throw new Error("password is incorrect");
      }
    } catch (err) {
      res.status(400).send("ERROR : " + err);
    }
  });


  authRouter.post("/logout",async(req,res)=>{
    

    res.cookie("token",null,{expires:new Date(Date.now())});

    res.send("logged out sucessfully");

  })






module.exports={authRouter};