const express = require("express");
const userRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequests");
const User = require("../models/user");

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

// get all the connections of loggedin user
userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const currUser = req.user;

    const connections = await ConnectionRequestModel.find({
      $or: [
        { toUserId: currUser._id, status: "accepted" },
        { fromUserId: currUser._id, status: "accepted" },
      ],
    })
      .populate("toUserId", "firstName lastName")
      .populate("fromUserId", "firstName lastName");

    console.log(connections);

    const data = connections.map((row) => {
      if (row.fromUserId._id.equals(currUser._id)) {
        return row.toUserId;
      }

      return row.fromUserId;
    });

    res.json({
      result: "success",
      message: "succefully fetched the connections",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `ERROR : ${err.message}`,
    });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    //user should see every card except his own... the one who are already friend and one whom he rejected or ignored already

    const currUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    limit=limit>50?50:limit;

    const skip = (page - 1) * limit;

    const connections = await ConnectionRequestModel.find({
      $or: [{ toUserId: currUser._id }, { fromUserId: currUser._id }],
    });

    // console.log(connections);
    let notRequiredIds = [];
    notRequiredIds.push(currUser._id);

    connections.map((row) => {
      if (row.fromUserId.toString() === currUser._id.toString()) {
        notRequiredIds.push(row.toUserId);
      } else {
        notRequiredIds.push(row.fromUserId);
      }
    });

    const data = await User.find({
      _id: { $nin: notRequiredIds },
    })
      .select("-password -email -createdAt -updatedAt -__v -_id")
      .skip(skip)
      .limit(limit);

    res.json({
      result: "success",
      message: "all the users are fetched successfully",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `ERROR : ${err.message}`,
    });
  }
});

module.exports = { userRouter };
