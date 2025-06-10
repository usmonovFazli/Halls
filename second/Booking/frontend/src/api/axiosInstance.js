import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к каждому запросу, если он есть
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Добавляем токен:', token); // ⬅️ вот это добавь
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
