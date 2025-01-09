require("dotenv").config();
const express = require("express");
const app = express();
const { connectDB } = require("./src/config/database.js");
const User = require("./src/models/user.js");
const cookieParser = require("cookie-parser");
app.use(express.json()); // middleware to parse the data to json from client;
app.use(cookieParser());
const cors=require("cors");
const {authRouter}=require("./src/routers/auth.js");
const {profileRouter}=require("./src/routers/profile.js");
const {requestRouter}=require("./src/routers/requests.js");
const {userRouter}=require("./src/routers/user.js");


app.use(cors());


app.use("/",authRouter);

app.use("/",profileRouter);

app.use("/",requestRouter);

app.use("/",userRouter);



//   try {
//     const data = await User.find();
//     if (data.length === 0) {
//       res.status(404).send("no user found");
//     } else {
//       res.send(data);
//     }
//   } catch (err) {
//     console.log("something went wrong" + err);
//   }
// });

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const isAllowedUpdates = [
      "gender",
      "age",
      "photoUrl",
      "about",
      "gender",
      "skills",
    ];

    const updates = Object.keys(data).every((k) => {
      return isAllowedUpdates.includes(k);
    });
    console.log(updates);

    if (!updates) {
      throw new Error("cannot update the field");
    }

    if (data?.skills?.length > 10) {
      throw new Error("max 10 skills can be added");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    }); //runvalidators is to apply schema validations on updating thje existing document
    console.log(user);
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("an error occured " + err);
  }
});



connectDB()
  .then(() => {
    console.log("connected to db succesfuly");
    app.listen(process.env.PORT, () => {
      console.log(`server listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("an error occured while connecting to database", err);
  });
