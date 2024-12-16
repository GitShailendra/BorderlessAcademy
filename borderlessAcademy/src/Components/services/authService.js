// src/services/authService.js
import apiService from './api';

const authService = {
  // Guardian registration
  registerGuardian: async (guardianData) => {
    try {
      const response = await apiService.post('/guardian/register', guardianData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Student registration
  registerStudent: async (studentData) => {
    try {
      const response = await apiService.post('/student/register', studentData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await apiService.post('/login', credentials);
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
  },
};

export default authService;