const { io } = require("../index");
const { findNearbyDrivers } = require("../services/bookingServices");
const locationService = require("../services/locationService");

const createBooking = (io) =>  async (req, res) => {
  try {
    const { source, destination } = req.body;
    const passengerId = req.user._id;
    const booking = await createBookingService(
      source,
      destination,
      passengerId,
    );


    const nearbyDrivers = await findNearbyDrivers(source);
    const driverIds = [];

    for(const driver of nearbyDrivers) {
      const driverSocketId = await locationService.getDriverSocket(driver[0]);
      if(driverSocketId) {
        driverIds.push(driver[0]);
        io.to(driverSocketId).emit("newBooking", {
          bookingId: booking._id,
          source,
          destination,
          fare : booking.fare,
        });
      }
    }

    await locationService.notifyDrivers(booking._id, driverIds);

    res.status(201).send({
      data: booking,
      sucess: true,
      error: null,
      message: "Booking Created Sucessfully",
    });
  } catch (error) {
    console.log("Create Booking Controller Error", error);
    res.status(400).send(error.message);
  }
};

const confirmBooking = (io) => async (req, res) => {
  try {
    const { bookingId } = req.body;
    const driverId = req.user._id;
    const booking = await booking.assignDriver(bookingId, driverId);
    if (!booking) {
      return res.status(404).send({
        data: null,
        sucess: false,
        error: "Booking not found or already confirmed",
        message: "Booking Confirmation Failed",
      });
    }

    const notifiedDriversKey = await locationService.getNotifiedDrivers(bookingId);

    for(const notifiedDriverId of notifiedDriversKey) {
      const driverSocketId = await locationService.getDriverSocket(notifiedDriverId);
      if(driverSocketId) {
        if(notifiedDriverId.toString() === driverId.toString()) {
          io.to(driverSocketId).emit("rideConfirmed", {
            bookingId: booking._id,
            source: booking.source,
            destination: booking.destination,
            fare : booking.fare,
          });
        }else{
          io.to(driverSocketId).emit("removeBooking", {
            bookingId: booking._id,
            message: "Booking has been confirmed by another driver",
          });
        }
      }
    }

    res.status(200).send({
      data: booking,
      sucess: true,
      error: null,
      message: "Booking Confirmed Sucessfully",
    });

  } catch (error) {
    console.log("Confirm Booking Controller Error", error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  createBooking,
  confirmBooking,

};
