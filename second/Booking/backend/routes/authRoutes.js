// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllres/authController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id); // или аналогичная логика
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
  }
});


module.exports = router;
