const { io } = require("../index");
const locationService = require("../services/locationService");

const createBooking = async (req, res) => {
  try {
    const { source, destination } = req.body;
    const passengerId = req.user._id;
    const booking = await createBookingService(
      source,
      destination,
      passengerId,
    );
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

module.exports = {
  createBooking,
};
