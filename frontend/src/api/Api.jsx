import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:2020',
});

// Пример: авторизация
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Пример: залы
export const createHall = (data, token) =>
  API.post('/hall/newHall', data, { headers: { Authorization: `Bearer ${token}` } });

export const getHalls = () => API.get('/hall/halls');
export const getHallById = (id) => API.get(`/hall/halls/${id}`);
export const deleteHall = (id, token) =>
  API.delete(`/hall/delet/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Пример: изображения
export const uploadImages = (id, files, token) => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  return API.post(`/${id}/images`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteImage = (imageId, token) =>
  API.delete(`/images/${imageId}`, { headers: { Authorization: `Bearer ${token}` } });

// Пример: бронирование
export const newBooking = (data, token) =>
  API.post('/booking/newBooking', data, { headers: { Authorization: `Bearer ${token}` } });

export const getUserBookings = (userId, token) =>
  API.get(`/booking/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } });

export const cancelBooking = (id, token) =>
  API.patch(`/booking/${id}/cancel`, {}, { headers: { Authorization: `Bearer ${token}` } });

export const getBookingById = (id, token) =>
  API.get(`/booking/booking/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const getAllBookings = (token) =>
  API.get('/booking/', { headers: { Authorization: `Bearer ${token}` } });

