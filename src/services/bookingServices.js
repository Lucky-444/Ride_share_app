const booking = require("../repositories/bookingRepository");
const harvesineDistance = require("../utils/harvesineDistance");

const BASIC_FARE = 50; // Base fare for the first 5 km
const PER_KM_RATE = 10; // Rate per km after the first 5 km

const createBookingService = async (source, destination, passengerId) => {
  try {
    const distance = harvesineDistance(
      source.latitude,
      source.longitude,
      destination.latitude,
      destination.longitude,
    );
    const newBooking = await booking.createBooking({
      source,
      destination,
      fare: BASIC_FARE + distance * PER_KM_RATE, // Initial fare, can be updated later based on distance
      passengerId,
    });
    return newBooking;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBookingService,
};
