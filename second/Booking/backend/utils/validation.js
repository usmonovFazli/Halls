// utils/validation.js

// Проверка телефона (Узбекистан, +998)
exports.isValidPhone = (phone) => {
  const uzbekPhoneRegex = /^\+998\d{9}$/;
  return uzbekPhoneRegex.test(phone);
};

// Проверка логина (буквы, цифры, подчёркивание, длина 3-50)
exports.isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
  return usernameRegex.test(username);
};

// Проверка имени (латиница/кириллица, без цифр, 1–50 символов)
exports.isValidName = (name) => {
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s'-]{1,50}$/u;
  return nameRegex.test(name);
};

// Проверка количества гостей (1–1000)
exports.isValidGuestCount = (count) => {
  return Number.isInteger(count) && count > 0 && count <= 1000;
};
