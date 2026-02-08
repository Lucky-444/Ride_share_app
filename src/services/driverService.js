// const driverRepository = require("../repositories/driverRepository");
const locationService = require("./locationService");

const getDriverBookingService = async (driverId) => {
  try {
    const bookings = await driverRepository.getDriverBookings(driverId);
    return bookings;
  } catch (error) {
    throw error;
  }
};

const updateDriverLocationService = async (driverId, latitude, longitude) => {
  try {
    const longitudeNum = parseFloat(longitude);
    const latitudeNum = parseFloat(latitude);

    if (isNaN(longitudeNum) || isNaN(latitudeNum)) {
      throw new Error("Invalid latitude or longitude values");
    }
    await locationService.addDriverLocation(
      driverId,
      latitudeNum,
      longitudeNum,
    );

    await driverRepository.updateDriverLocation(driverId, {
         type : "Point",
         coordinates : [longitudeNum, latitudeNum]
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDriverBookingService,
  updateDriverLocationService,
};
