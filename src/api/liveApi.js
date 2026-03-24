import api from './axiosConfig';

export const getAllLiveClasses = (params) => api.get('/live', { params });

export const getLiveClassById = (id) => api.get(`/live/${id}`);

export const getUpcomingClasses = () => api.get('/live/upcoming');

export const joinLiveClass = (id) => api.post(`/live/${id}/join`);

export const getLiveClassChat = (id) => api.get(`/live/${id}/chat`);

export const sendChatMessage = (id, message) => api.post(`/live/${id}/chat`, { message });
