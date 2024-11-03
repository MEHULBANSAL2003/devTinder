const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequests");
const {
  validateSendConnectionRequestData,
  validateRequestReviewData,
} = require("../utils/validation");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
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

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      await validateRequestReviewData(req);

      //const request=await ConnectionRequestModel.findByIdAndUpdate(req.params.requestId,{status:req.params.status});
      const request = req.request;

      request.status = req.params.status;

      const data = await request.save();

      res.json({
        result: "sucess",
        message: `connection request ${req.params.status}`,
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
module.exports = { requestRouter };
