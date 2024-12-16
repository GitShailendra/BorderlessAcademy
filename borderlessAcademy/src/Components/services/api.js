// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - useful for adding auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - for consistent error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || 'Something went wrong',
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };
    return Promise.reject(customError);
  }
);

// Generic API functions
const apiService = {
  // GET request
  async get(endpoint) {
    try {
      return await api.get(endpoint);
    } catch (error) {
      throw error;
    }
  },

  // POST request
  async post(endpoint, data) {
    try {
      return await api.post(endpoint, data);
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  async put(endpoint, data) {
    try {
      return await api.put(endpoint, data);
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  async delete(endpoint) {
    try {
      return await api.delete(endpoint);
    } catch (error) {
      throw error;
    }
  },

  // PATCH request
  async patch(endpoint, data) {
    try {
      return await api.patch(endpoint, data);
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;