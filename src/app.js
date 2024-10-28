const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const app = express();
const port = 7777;

app.use(express.json()); // middleware to parse the data to json from client;

app.post("/signup", async (req, res) => {
  const obj = req.body;
  console.log(obj);

  try {
    const user = new User(obj);
    await user.save();
    console.log(user);

    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("an error occured " + err);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const data = await User.find();
    if (data.length === 0) {
      res.status(404).send("no user found");
    } else {
      res.send(data);
    }
  } catch (err) {
    console.log("something went wrong" + err);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
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
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("an error occured while connecting to database", err);
  });
