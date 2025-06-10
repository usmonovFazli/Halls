// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.register = async (req, res) => {
  const { first_name, last_name, username, password, phone, role } = req.body;

  try {
    const existingUser = await userModel.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким username уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.createUser({
      first_name,
      last_name,
      username,
      password_hash: hashedPassword,
      phone,
      role: role || 'user',
    });

    res.status(201).json({ message: 'Регистрация успешна', user: newUser });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Неверный username или пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный username или пароль' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ message: 'Успешный вход', token });
  } catch (err) {
    console.error('Ошибка входа:', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};


exports.getMe = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: 'Не авторизован' });

    const user = await userModel.getById(userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
