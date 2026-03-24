import api from './axiosConfig';

export const submitContactForm = (data) => api.post('/contact', data);

export const subscribeNewsletter = (email) => api.post('/newsletter/subscribe', { email });
