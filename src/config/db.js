const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    if (!DB_URL) {
      throw new Error("DB_URL is not defined in environment variables");
    }

    await mongoose.connect(DB_URL);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

module.exports = connectDB;
