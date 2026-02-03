const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createUser = async (data) => {
  return await userModel.create(data);
};

const loginUser = async (email, password) => {
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;

  return user;
};

const generateJWT = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  createUser,
  loginUser,
  generateJWT,
};
