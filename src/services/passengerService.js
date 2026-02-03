const bookingRepository = require("../repositories/bookingRepository");

const GetPassengerService = async (passengerId) => {};

const FeedBackService = async (passengerId, bookingId, rating, feedback) => {
  const Booking = await bookingRepository.findBooking({
    _id: bookingId,
    passenger: passengerId,
  });

  if(!Booking){
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
