const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequests");
const {validateSendConnectionRequestData,validateRequestReviewData} = require("../utils/validation");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      await validateSendConnectionRequestData(req);

      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        result: "success",
        message: "Connection request sent succesfully",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        result: "error",
        message: `ERROR : ${err.message}`,
      });
    }
  }
);

requestRouter.post("/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      await validateRequestReviewData(req);

      const request = req.request;

      request.status = req.params.status;

      const data = await request.save();

      res.json({
        result: "success",
        message: `connection request ${req.params.status}`,
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        result: "error",
        message: `ERROR : ${err}`,
      });
    }
  }
);

requestRouter.post("/request/cancel/:userId", 
userAuth, async (req, res) => {
  const toUserId = req.params.userId;
  const currUser = req.user._id;

  const user = await User.findById(toUserId);

  if (!user) throw new Error("user doesn't exists!!");

  try {
    const data = await ConnectionRequestModel.findOneAndDelete({
      fromUserId: currUser,
      toUserId: toUserId,
    });

    res.status(200).json({
      result: "success",
      message: "request cancelled successfully",
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `ERROR : ${err.message}`,
    });
  }
});

requestRouter.post("/request/remove/:reqId",
 userAuth, async (req, res) => {
  const reqId = req.params.reqId;

  try {
    const request = await ConnectionRequestModel.findByIdAndDelete(reqId);

    if (!request) {
      throw new Error("Invalid request. No matching connection found.");
    }

    res.status(200).json({
      result: "success",
      message: "Connection removed successfully",
    });
  } catch (err) {
    res.status(400).json({
      result: "error",
      message: `ERROR: ${err.message}`,
    });
  }
});

module.exports = { requestRouter };
