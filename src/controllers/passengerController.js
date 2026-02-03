const {
  GetPassengerService,
  FeedBackService,
} = require("../services/passengerService");

const passengerBooking = async (req, res) => {
  try {
    const bookings = await GetPassengerService(req.user._id);
    res.status(201).send({
      data: bookings,
      sucess: true,
      error: null,
      message: "Retrieved Passenger Details",
    });
  } catch (error) {
    console.log("PassengerBooking Controller Error", error);
    res.status(400).send(error.message);
  }
};

const FeedBack = async (req, res) => {
  try {
    const { bookingId, rating, feedback } = req.body;

    await FeedBackService(req.user._id, bookingId, rating, feedback);
    res.status(201).send({
      data: {},
      sucess: true,
      error: null,
      message: "Feedback Submitted Sucessfully",
    });
  } catch (error) {
    console.log("feedback Controller Error", error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  passengerBooking,
  FeedBack,
};
