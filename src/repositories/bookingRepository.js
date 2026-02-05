const Booking = require("../models/booking");

const findBooking = async (criteria) => {
  return await Booking.findOne(criteria);
};

const createBooking = async (bookingData) => {
  const newBooking = new Booking(bookingData);
  return await newBooking.save();
}

module.exports = {
  findBooking,
};
