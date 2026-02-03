const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  passengerBooking,
  FeedBack,
} = require("../controllers/passengerController");
const router = express.Router();

module.exports = (io) => {
  router.get("bookings", authMiddleware, passengerBooking);
  router.post("feedback", authMiddleware, FeedBack);

  return router;
};
