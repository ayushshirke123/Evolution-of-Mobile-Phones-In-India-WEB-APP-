import axios from 'axios';
import { auth } from '../utils/firebase';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export const apiService = {
  // User APIs
  createUser: (userData) => apiClient.post('/users', userData),
  getUser: (firebaseUid) => apiClient.get(`/users/${firebaseUid}`),
  updateUser: (firebaseUid, updates) => apiClient.put(`/users/${firebaseUid}`, updates),
  getTopPlayers: () => apiClient.get('/users/leaderboard'),

  // Quiz APIs
  getQuizzes: () => apiClient.get('/quizzes'),
  getQuiz: (quizId) => apiClient.get(`/quizzes/${quizId}`),
  getQuizzesByCategory: (category) => apiClient.get(`/quizzes/category/${category}`),
  searchQuizzes: (query) => apiClient.get(`/quizzes/search?q=${query}`),

  // Quiz Session APIs
  createSession: (sessionData) => apiClient.post('/sessions', sessionData),
  getSession: (sessionCode) => apiClient.get(`/sessions/${sessionCode}`),
  joinSession: (sessionCode) => apiClient.post(`/sessions/${sessionCode}/join`),
  startSession: (sessionCode) => apiClient.post(`/sessions/${sessionCode}/start`),
  endSession: (sessionCode) => apiClient.post(`/sessions/${sessionCode}/end`),
  getSessionPlayers: (sessionCode) => apiClient.get(`/sessions/${sessionCode}/players`),
  leaveSession: (sessionCode) => apiClient.post(`/sessions/${sessionCode}/leave`),

  // Game APIs
  getCurrentQuestion: (sessionCode) => apiClient.get(`/sessions/${sessionCode}/current-question`),
  submitAnswer: (sessionCode, answerData) => apiClient.post(`/sessions/${sessionCode}/answer`, answerData),
  getNextQuestion: (sessionCode) => apiClient.post(`/sessions/${sessionCode}/next-question`),
  getResults: (sessionCode) => apiClient.get(`/sessions/${sessionCode}/results`),

  // Leaderboard APIs
  getLeaderboard: (sessionCode) => apiClient.get(`/sessions/${sessionCode}/leaderboard`),
  getLiveLeaderboard: (sessionCode) => apiClient.get(`/sessions/${sessionCode}/leaderboard/live`),

  // Player Session APIs
  getPlayerSession: (sessionCode) => apiClient.get(`/player-sessions/${sessionCode}`),
  getPlayerHistory: () => apiClient.get('/player-sessions/history'),
  getPlayerStats: () => apiClient.get('/player-sessions/stats'),
};