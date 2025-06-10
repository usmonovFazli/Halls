const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth.controller');

// Регистрация
router.post('/register', register);

// Логин
router.post('/login', login);

module.exports = router;
