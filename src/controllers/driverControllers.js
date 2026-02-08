const {
  getDriverBookingService,
  updateDriverLocationService,
} = require("../services/driverService");

const getDriverBooking = async (req, res) => {
  try {
    const driverId = req.user._id;
    const bookings = await getDriverBookingService(driverId);
    res.status(200).send({
      data: bookings,
      sucess: true,

      error: null,
      message: "Driver Bookings Retrieved Sucessfully",
    });
  } catch (error) {
    console.log("Get Driver Booking Controller Error", error);
    res.status(400).send(error.message);
  }
};

const updateDriverLocation = async (req, res) => {
  try {
    const driverId = req.user._id;
    const { latitude, longitude } = req.body;
    await updateDriverLocationService(driverId, latitude, longitude);
    res.status(200).send({
      data: {},
      sucess: true,
      error: null,
      message: "Driver Location Updated Sucessfully",
    });
  } catch (error) {
    console.log("Update Driver Location Controller Error", error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  getDriverBooking,
  updateDriverLocation,
};
