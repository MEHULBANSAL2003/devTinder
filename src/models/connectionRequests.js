const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionRequestSchema = new Schema({

        fromUserId:{
             type:mongoose.Schema.Types.ObjectId,
             required:true

        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        status:{
            type:String,
            enum:{
               values: ["ignore","interested","accepted","rejected"],
               message:`{VALUE} is of invalid status type`
            },
            required:true
        }
},{timestamps:true}
);

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = { ConnectionRequestModel };

