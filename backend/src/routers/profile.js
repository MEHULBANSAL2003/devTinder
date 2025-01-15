const express = require("express");
const bcrypt = require("bcrypt");
const {
  validateProfileEditData,
  validateEditPassword,
} = require("../utils/validation.js");

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth.js");
const User = require("../models/user.js");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json({
      result: "success",
      message: "user fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: ` ${err}`,
    });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid edit Request");
    }

    const currUser = req.user;

    Object.keys(req.body).forEach((key) => (currUser[key] = req.body[key]));

    await currUser.save();

    res.json({
      result: "success",
      message: `${currUser.firstName}, your profile has been updated successfully`,
      data: currUser,
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `${err}`,
    });
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validateEditPassword(req);

    const currUser = req.user;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    currUser.password = hashedPassword;

    await currUser.save();

    res.json({
      result: "success",
      message: "password changed successfully",
      data: currUser,
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `${err}`,
    });
  }
});

profileRouter.get("/profile/view/:userId", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "-password -emailId"
    );

    if (!user) throw new Error("invalid request..!!");

    res.status(200).json({
      result: "success",
      message: "profile fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      result: "error",
      message: ` ${err.message}`,
    });
  }
});

module.exports = { profileRouter };
