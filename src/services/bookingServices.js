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

const findNearbyDrivers = async (location, radius = 5) => {
  try {
    const longitude  = parseFloat(location.longitude);
    const latitude  = parseFloat(location.latitude);

    const radiusInKm = parseFloat(radius); // Radius in kilometers

    if(isNaN(longitude) || isNaN(latitude) || isNaN(radiusInKm)) {
      throw new Error("Invalid location or radius parameters");
    }

    const nearbyDrivers = await locationService.findDriversWithinRadius(latitude, longitude, radiusInKm);

    return nearbyDrivers;
  } catch (error) {
    throw error;
  }
};

const assignDriver = async (bookingId, driverId) => {
  try {
    const updatedBooking = await bookingRepository.updatedBooking(bookingId, driverId , "confirmed");
    if(!updatedBooking) {
      throw new Error("Booking not found or already confirmed");
    }
    return updatedBooking;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBookingService,
  findNearbyDrivers,
  assignDriver,
};