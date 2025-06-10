const express = require('express');
const router = express.Router();
const {createBooking , getBookingsByUserId, cancelBooking , getAllBookings, getBookingById} = require('../controllers/booking.controller');

router.post('/newBooking', createBooking);
router.get('/user/:userId', getBookingsByUserId);
router.put('/:id/cancel', cancelBooking);
router.get('/booking/:id', getBookingById);
router.get('/', getAllBookings);



module.exports = router;
