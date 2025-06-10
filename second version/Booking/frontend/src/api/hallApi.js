import axiosInstance from './axiosInstance';

export const getAllHalls = async () => {
  const res = await axiosInstance.get('/halls');
  return res.data;
};

export const getHallById = async (id) => {
  const res = await axiosInstance.get(`/halls/${id}`);
  return res.data;
};

export const createHall = async (hallData) => {
  const res = await axiosInstance.post('/halls', hallData);
  return res.data;
};

export const getMyHalls = async () => {
  const res = await axiosInstance.get('/halls/mine');
  return res.data;
};

export const uploadHallImage = async (hallId, imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await axiosInstance.post(`/halls/${hallId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
