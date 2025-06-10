import axiosInstance from './axiosInstance';

export const getPendingHalls = async () => {
  const res = await axiosInstance.get('/admin/pending-halls');
  return res.data;
};

export const approveHall = async (hallId) => {
  const res = await axiosInstance.put(`/admin/approve-hall/${hallId}`);
  return res.data;
};

export const deleteUser = async (userId) => {
  const res = await axiosInstance.delete(`/admin/users/${userId}`);
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axiosInstance.get('/admin/users');
  return res.data;
};
