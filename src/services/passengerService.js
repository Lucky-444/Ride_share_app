const bookingRepository = require("../repositories/bookingRepository");
const findPassengerById = require("../repositories/passengerRepository");
const GetPassengerService = async (passengerId) => {
  try {
    const passengerDetails = findPassengerById(passengerId);

    if (!passengerDetails) {
      throw new Error("Passenger Not Found");
    }

    return passengerDetails;
  } catch (error) {
    throw new Error("Something Happened");
  }
};

const FeedBackService = async (passengerId, bookingId, rating, feedback) => {
  const Booking = await bookingRepository.findBooking({
    _id: bookingId,
    passenger: passengerId,
  });

  if (!Booking) {
    throw new Error("booking Not Found");
  }

  Booking.rating = rating;
  Booking.feedback = feedback;

  await Booking.save();
};

module.exports = {
  GetPassengerService,
  FeedBackService,
};
