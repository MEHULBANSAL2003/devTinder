const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mehulbansal83606:0MBMej9TeegrLJaI@cluster1.ckxzw.mongodb.net/devTinder"
  );
};

module.exports={connectDB};


