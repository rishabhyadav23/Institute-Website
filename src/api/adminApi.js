import api from './axiosConfig';

// Dashboard
export const getDashboardStats = () => api.get('/dashboard/stats');

// Students
export const getStudents = () => api.get('/admin/students');

// Courses
export const getCourses = () => api.get('/courses');
export const createCourse = (data) => api.post('/courses', data);
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// Notes
export const getNotes = () => api.get('/notes');
export const createNote = (data) => api.post('/notes', data);
export const updateNote = (id, data) => api.put(`/notes/${id}`, data);
export const deleteNote = (id) => api.delete(`/notes/${id}`);

// Test Series
export const getTestSeries = () => api.get('/tests');
export const createTestSeries = (data) => api.post('/tests', data);
export const updateTestSeries = (id, data) => api.put(`/tests/${id}`, data);
export const deleteTestSeries = (id) => api.delete(`/tests/${id}`);
export const getTestQuestions = (testId) => api.get(`/tests/${testId}/questions`);
export const addTestQuestion = (testId, data) => api.post(`/tests/${testId}/questions`, data);
export const deleteTestQuestion = (testId, questionId) => api.delete(`/tests/${testId}/questions/${questionId}`);

// Live Classes
export const getLiveClasses = () => api.get('/live');
export const createLiveClass = (data) => api.post('/live', data);
export const updateLiveClass = (id, data) => api.put(`/live/${id}`, data);
export const updateLiveClassStatus = (id, status) => api.put(`/live/${id}/status?status=${status}`);
export const deleteLiveClass = (id) => api.delete(`/live/${id}`);

// Banners
export const getBanners = () => api.get('/banners');
export const createBanner = (data) => api.post('/banners', data);
export const updateBanner = (id, data) => api.put(`/banners/${id}`, data);
export const deleteBanner = (id) => api.delete(`/banners/${id}`);

// Contact Messages
export const getContactMessages = () => api.get('/contact');
export const getUnreadMessages = () => api.get('/contact/unread');
export const markMessageRead = (id) => api.put(`/contact/${id}/read`);
