// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllres/adminController');
const auth = require('../middlewares/authMiddleware');
const permit = require('../middlewares/roleMiddleware');

// Только для админов
router.get('/stats', auth, permit('admin'), adminController.getStats);
router.put('/approve/:id', auth, permit('admin'), adminController.approveHall);

module.exports = router;
