import axios from 'axios';

const API_URL = 'http://localhost:2020/hall';

export const fetchHalls = async () => {
  const response = await axios.get(`${API_URL}/halls`);
  return response.data;
};

export const fetchHallById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createHall = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateHall = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteHall = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
