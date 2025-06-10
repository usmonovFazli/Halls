// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3223/api', // ⚠️ проверь правильный адрес
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // если ты работаешь с куками, иначе можно убрать
});

// Интерцептор — опционально: для авторизации через токен
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
