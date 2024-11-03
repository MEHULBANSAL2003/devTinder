const express = require("express");
const userRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequests");

const { userAuth } = require("../middlewares/auth");

// get all the pending connection requests for the logged in user
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const currUser = req.user;

    const requests = await ConnectionRequestModel.find({
      toUserId: currUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);

    console.log(requests);

    res.json({
      result: "success",
      message: requests,
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `ERROR : ${err.message}`,
    });
  }
});

module.exports = { userRouter };
