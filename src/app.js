const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const {
  validateSignUpData,
  validateLoginData,
} = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const app = express();
const port = 7777;

app.use(express.json()); // middleware to parse the data to json from client;

app.post("/signup", async (req, res) => {
  // validating the data
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const registeredUser = await User.find({ emailId: emailId });
    if (registeredUser.length > 0) {
      throw new Error("user already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const obj = req.body;

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    console.log(user);

    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    validateLoginData(req);
    const user = await User.find({ emailId: emailId });
    if (user.length === 0) {
      throw new Error("user not registered");
    }

    const storedPassword = user[0].password;

    const isPasswordValid = await bcrypt.compare(password, storedPassword);
    if (!isPasswordValid) {
      throw new Error("password is incorrect");
    }

    res.send("logged in successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err);
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
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("an error occured while connecting to database", err);
  });
