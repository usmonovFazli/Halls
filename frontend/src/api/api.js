import axios from 'axios'

const BASE_URL = 'http://localhost:2020'

const api = axios.create ({
    baseURL: BASE_URL,
    timeout: 7000,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 💾 Токен храним в localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 🔐 Добавляем в заголовки
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // ⛔ Ошибка при запросе
  }
);

// 📦 Экспортируем готовый экземпляр
export default api;

// const getAllUsers = axios.get(`${BASE_URL}`);