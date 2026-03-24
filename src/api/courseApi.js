import api from './axiosConfig';

export const getAllCourses = (params) => api.get('/courses', { params });

export const getCourseById = (id) => api.get(`/courses/${id}`);

export const searchCourses = (query) => api.get('/courses/search', { params: { q: query } });

export const getPopularCourses = () => api.get('/courses/popular');

export const getCoursesByCategory = (category) => api.get('/courses/category', { params: { category } });

export const enrollInCourse = (courseId) => api.post(`/courses/${courseId}/enroll`);

export const getCourseReviews = (courseId) => api.get(`/courses/${courseId}/reviews`);

export const submitCourseReview = (courseId, data) => api.post(`/courses/${courseId}/reviews`, data);
