const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mehulbansal83606:m7sCHXMwQBnhwVxb@cluster0.ygjrueu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/devTinder"
  );
};

module.exports={connectDB};


