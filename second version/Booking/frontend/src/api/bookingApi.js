import axiosInstance from './axiosInstance';

export const createBooking = async (bookingData) => {
  const res = await axiosInstance.post('/bookings', bookingData);
  return res.data;
};

export const getMyBookings = async () => {
  const res = await axiosInstance.get('/bookings/mine');
  return res.data;
};

export const cancelBooking = async (bookingId) => {
  const res = await axiosInstance.delete(`/bookings/${bookingId}`);
  return res.data;
};
