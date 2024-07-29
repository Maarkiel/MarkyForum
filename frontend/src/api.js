import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const resetPasswordRequest = (data) => api.post('/auth/reset-password-request', data);
export const resetPassword = (data) => api.post('/auth/reset-password', data);
export const getProfile = (token) => api.get('/users/profile', { headers: { Authorization: `Bearer ${token}` } });
export const updateProfile = (data, token) => api.put('/users/profile', data, { headers: { Authorization: `Bearer ${token}` } });
export const uploadAvatar = (data, token) => api.post('/users/profile/avatar', data, { headers: { Authorization: `Bearer ${token}` } });
export const createThread = (data, token) => api.post('/threads', data, { headers: { Authorization: `Bearer ${token}` } });
export const addComment = (threadId, data, token) => api.post(`/threads/${threadId}/comments`, data, { headers: { Authorization: `Bearer ${token}` } });
export const getThreads = () => api.get('/threads');
export const likeThread = (threadId, token) => api.post(`/threads/${threadId}/like`, null, { headers: { Authorization: `Bearer ${token}` } });
export const dislikeThread = (threadId, token) => api.post(`/threads/${threadId}/dislike`, null, { headers: { Authorization: `Bearer ${token}` } });
export const likeComment = (threadId, commentId, token) => api.post(`/threads/${threadId}/comments/${commentId}/like`, null, { headers: { Authorization: `Bearer ${token}` } });
export const dislikeComment = (threadId, commentId, token) => api.post(`/threads/${threadId}/comments/${commentId}/dislike`, null, { headers: { Authorization: `Bearer ${token}` } });
export const updateThread = (threadId, data, token) => api.put(`/threads/${threadId}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteThread = (threadId, token) => api.delete(`/threads/${threadId}`, { headers: { Authorization: `Bearer ${token}` } });
export const updateComment = (threadId, commentId, data, token) => api.put(`/threads/${threadId}/comments/${commentId}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteComment = (threadId, commentId, token) => api.delete(`/threads/${threadId}/comments/${commentId}`, { headers: { Authorization: `Bearer ${token}` } });
export const getCategories = () => api.get('/categories');
export const getTags = () => api.get('/tags');
export const getNotifications = (token) => api.get('/notifications', { headers: { Authorization: `Bearer ${token}` } });
export const markAsRead = (id, token) => api.post(`/notifications/${id}/read`, null, { headers: { Authorization: `Bearer ${token}` } });
export const getMessages = (token) => api.get('/messages', { headers: { Authorization: `Bearer ${token}` } });
export const sendMessage = (data, token) => api.post('/messages', data, { headers: { Authorization: `Bearer ${token}` } });
export const getStats = (token) => api.get('/admin/stats', { headers: { Authorization: `Bearer ${token}` } });
export const rateUser = (userId, data, token) => api.post(`/users/${userId}/rate`, data, { headers: { Authorization: `Bearer ${token}` } });
