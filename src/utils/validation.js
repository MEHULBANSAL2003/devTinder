const validator = require("validator");
const ConnectionRequestModel = require("../models/connectionRequests");
const User = require("../models/user");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  }

  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First Name should contain 4-50 characters");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("enter the valid email address");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("enter the strong password");
  }
};

const validateLoginData = (req) => {
  if (!validator.isEmail(req.body.emailId)) {
    throw new Error("enter the valid email address");
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFeilds = [
    "firstName",
    "lastName",
    "photoUrl",
    "age",
    "about",
    "gender",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFeilds.includes(field)
  );

  return isEditAllowed;
};

const validateEditPassword = (req) => {
  if (!req.body.password) {
    throw new Error("please enter the password");
  }

  const { password } = req.body;

  if (!validator.isStrongPassword(password)) {
    throw new Error("enter the strong password");
  }
};

const validateSendConnectionRequestData = async (req) => {
  // only ignored and interested stauts should be allowed
  // toUserId should be in the db
  //user cannot send request to itself
  // duplicate requests are not allowed..
  // if there is connection request from A to B then B should not be able to send request to A

  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;

  const allowedStatus = ["ignored", "interested"];
  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid status type: " + status);
  }

  const toUser = await User.findById(toUserId);

  if (!toUser) {
    throw new Error("user doesn't exist");
  }

  // we can also do this with mongoose pre middleware
  if (fromUserId.equals(toUserId)) {
    throw new Error("cannot send request to youself");
  }

  const existingRequest = await ConnectionRequestModel.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });

  if (existingRequest) {
    throw new Error("request already exists");
  }
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateProfileEditData,
  validateEditPassword,
  validateSendConnectionRequestData,
};
