// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllres/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
