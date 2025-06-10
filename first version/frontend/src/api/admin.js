import axios from 'axios';

const API_URL = 'http://localhost:2020/admin';

// 📍 Создание нового района
export const createDistrict = async (districtData) => {
  const response = await axios.post(`${API_URL}/createDistrict`, districtData);
  return response.data;
};

// 👤 Получение всех пользователей (для админа)
export const getAllUsersByAdmin = async () => {
  const response = await axios.get(`${API_URL}/allUsers`);
  return response.data;
};
