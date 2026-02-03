const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

module.exports = (io) => {
         // router.get("bookings", authMiddleware, getPassengerBooking);
         // router.post('feedback' , authMiddleware , ProvideFeedback);

         return router;
}
