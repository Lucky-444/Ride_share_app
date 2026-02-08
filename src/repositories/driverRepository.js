const User = require("../models/user");

const updateDriverLocation = async (driverId, location) => {
  try {
    await User.findByIdAndUpdate(
      driverId,
      {
        location: location,
      },
      { new: true },
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateDriverLocation,
};
