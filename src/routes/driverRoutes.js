const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/bookings' , authMiddleware , getDriverBooking);
router.get('/location' , authMiddleware , updateLocation);

module.exports = router;



