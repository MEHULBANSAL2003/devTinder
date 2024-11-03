const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequests");
const { validateSendConnectionRequestData } = require("../utils/validation");

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

module.exports = { requestRouter };
