// utils/hash.js
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// Хеширование пароля
exports.hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

// Проверка пароля
exports.comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
