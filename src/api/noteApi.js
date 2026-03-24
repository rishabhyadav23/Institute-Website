import api from './axiosConfig';

export const getAllNotes = (params) => api.get('/notes', { params });

export const getNoteById = (id) => api.get(`/notes/${id}`);

export const getNotesBySubject = (subject) => api.get('/notes/subject', { params: { subject } });

export const downloadNote = (id) => api.get(`/notes/${id}/download`, { responseType: 'blob' });

export const searchNotes = (query) => api.get('/notes/search', { params: { q: query } });
