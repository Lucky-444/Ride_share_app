const Booking = require("../models/booking");

const findBooking = async (criteria) => {
  return await Booking.findOne(criteria);
};

const createBooking = async (bookingData) => {
  const newBooking = new Booking(bookingData);
  return await newBooking.save();
};

const updatedBooking = async (bookingId, driverId, status) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, driverId: null }, // Only update if driverId is not already assigned
      { driverId, status },

      { new: true },
    );
    return booking;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findBooking,
  createBooking,
  updatedBooking,
  
};
