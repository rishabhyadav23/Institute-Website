import api from './axiosConfig';

export const getDashboardStats = () => api.get('/dashboard/stats');

export const getEnrolledCourses = () => api.get('/dashboard/courses');

export const getRecentTestAttempts = () => api.get('/dashboard/tests');

export const getUpcomingLiveClasses = () => api.get('/dashboard/live');

export const getStudentProfile = () => api.get('/dashboard/profile');
