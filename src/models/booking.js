const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const bookingSchema = new mongoose.Schema({
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  source: {
    lattitude: { type: Number },
    longitude: { type: Number },
  },
  destination: {
    lattitude: { type: Number },
    longitude: { type: Number },
  },
  fare : Number,
  status : {
         type : String , 
         enum : ['pending' , 'confirmed' ,'completed' , 'cancelled'],
         default : 'pending'
  },
  rating : Number, 
  feedback : String
});

const Booking = mongoose.model('Booking' , bookingSchema);
module.exports = Booking;