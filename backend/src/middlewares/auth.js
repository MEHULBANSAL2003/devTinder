const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;

    if (!token) {
       return res.status(401).send("please login!!");
    }

    const validateToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { _id } = validateToken;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found. Login to access");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      result:"error",
      message: `ERROR : ${err}`
    })
  }
};

module.exports = { userAuth };
