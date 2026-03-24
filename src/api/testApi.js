import api from './axiosConfig';

export const getAllTests = (params) => api.get('/tests', { params });

export const getTestById = (id) => api.get(`/tests/${id}`);

export const getTestQuestions = (id) => api.get(`/tests/${id}/questions`);

export const submitTest = (id, answers) => api.post(`/tests/${id}/submit`, { answers });

export const getTestResult = (id) => api.get(`/tests/${id}/result`);

export const getTestsByCategory = (category) => api.get('/tests/category', { params: { category } });
