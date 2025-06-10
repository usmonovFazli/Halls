// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllres/bookingController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, bookingController.createBooking);
router.get('/my', auth, bookingController.getUserBookings);

module.exports = router;
