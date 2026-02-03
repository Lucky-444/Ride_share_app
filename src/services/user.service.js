const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createUser = async (firstname, lastname, email, password, phone) => {
  const user = await userModel.create({
    fullname: { firstname, lastname },
    email,
    password,
    phone,
  });
  
  return user;
};

const generateToken = (user, purpose = "auth") => {
  return jwt.sign({ id: user._id, purpose }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const loginUserService = async (email, password) => {
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;

  return user;
};

const verifyUserEmail = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.purpose !== "email-verification") {
    throw new Error("Invalid token purpose");
  }

  const user = await userModel.findById(decoded.id);
  if (!user) return null;

  if (user.emailVerified) return "ALREADY_VERIFIED";

  user.emailVerified = true;
  await user.save();

  return user;
};

const resetUserPassword = async (token, password) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findById(payload.id);
  if (!user) return null;

  user.password = await userModel.hashPassword(password);
  await user.save();

  return true;
};

module.exports = {
  createUser,
  generateToken,
  loginUserService,
  verifyUserEmail,
  resetUserPassword,
};
