import axios from "axios";

const API_URL = "http://localhost:2020/hall";

// Регистрация пользователя
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Вход пользователя
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};
