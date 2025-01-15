const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation.js");
const { putObjectInS3 } = require("../utils/s3.js");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const {
      firstName,
      lastName,
      userName,
      imageUrl,
      gender,
      age,
      emailId,
      password,
    } = req.body;

    const registeredUser = await User.find({ emailId: emailId });
    if (registeredUser.length > 0) {
      throw new Error("user already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const obj = req.body;

    const user = new User({
      firstName,
      lastName,
      userName,
      gender,
      age,
      emailId,
      password: hashedPassword,
      photoUrl: imageUrl,
    });
    await user.save();

    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 1 * 3600000),
    });

    res.json({
      result: "success",
      message: "user added successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `${err}`,
    });
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
        expires: new Date(Date.now() + 24 * 3600000),
      });
      res.json({
        result: "success",
        message: "logged in successfully",
        data: user,
      });
    } else {
      throw new Error("password is incorrect");
    }
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `${err}`,
    });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });

    res.json({
      result: "success",
      message: "logged out sucessfully",
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `${err}`,
    });
  }
});

authRouter.post("/generate-upload-url", async (req, res) => {
  const { filename, contentType } = req.body;

  if (!filename || !contentType) {
    return res
      .status(400)
      .json({ result: "error", message: "Missing filename or content-type." });
  }

  const response = await putObjectInS3(filename, contentType);
  if (response.result === "success") {
    res.status(200).json(response);
  } else {
    res.status(500).json(response);
  }
});

module.exports = { authRouter };
