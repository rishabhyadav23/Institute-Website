import api from './axiosConfig';

export const getActiveBanners = () => api.get('/banners');

export const getBannerById = (id) => api.get(`/banners/${id}`);
