const express = require("express");
const { validateProfileEditData } = require("../utils/validation.js");

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth.js");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json({
      result: "success",
      message: user,
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `ERROR : ${err}`,
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
      message: `${currUser.firstName}, your profile has been updated successfully`,
      data: currUser,
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `ERROR : ${err}`,
    });
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `ERROR : ${err}`,
    });
  }
});

module.exports = { profileRouter };
