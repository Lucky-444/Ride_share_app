const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

const { getDriverBooking  , updateDriverLocation} = require('../controllers/driverControllers');

router.get('/bookings' , authMiddleware , getDriverBooking);
router.put('/location' , authMiddleware , updateDriverLocation);

module.exports = router;



