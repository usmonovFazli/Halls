import axios from "axios";

const API_URL = "http://localhost:2020/booking";

// Получить все бронирования
export const getAllBookings = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Получить бронирование по ID
export const getBookingById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Отменить бронирование
export const cancelBooking = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/cancel`);
  return response.data;
};

// Получить бронирования по ID пользователя
export const getBookingsByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

// Создать новое бронирование
export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}`, bookingData);
  return response.data;
};
