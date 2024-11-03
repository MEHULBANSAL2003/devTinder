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


// get all the connections of loggedin user
userRouter.get("/user/connection",userAuth,async (req,res)=>{
try{

const currUser=req.user;

const connections=await ConnectionRequestModel.find({
    $or:[
        {toUserId:currUser._id,status:"accepted"},
        {fromUserId:currUser._id,status:"accepted"}
    ]
}).populate("toUserId", "firstName lastName")
.populate("fromUserId", "firstName lastName");

console.log(connections);

const data=connections.map((row)=>{
    if(row.fromUserId._id.equals(currUser._id)){
        return row.toUserId;
    }

    return row.fromUserId;
});

res.json({
    result:"success",
    message:"succefully fetched the connections",
    data:data
})


}
catch (err) {
    res.status(400).json({
      result: "error",
      message: `ERROR : ${err.message}`,
    });
  }

})

module.exports = { userRouter };
