// src/services/authService.js
import apiService from './api';

const authService = {
  // Registration functions
  registerGuardian: async (guardianData) => {
    try {
      const response = await apiService.post('/guardian/register', guardianData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', 'guardian');
        localStorage.setItem('userId', response.data.id);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  registerStudent: async (studentData) => {
    try {
      console.log("Sending student data to backend:", studentData);
      const response = await apiService.post('/student/register',studentData);
      console.log(response)
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', 'student');
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('guardianId', response.data.guardian);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  registerTeacher: async (teacherData) => {
    try {
      const response = await apiService.post('/teacher/register', teacherData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', 'teacher');
        localStorage.setItem('userId', response.data.id);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Login functions
  login: async (credentials) => {
    try {
      let endpoint;
      console.log(credentials)
    // Determine the correct endpoint based on user type
    switch (credentials.userType) {
      case 'teacher':
        endpoint = '/teacher/login';
        break;
      case 'student':
        endpoint = '/student/login';
        break;
      case 'guardian':
        endpoint = '/guardian/login';
        break;
      case 'admin':
        endpoint = '/admin/login';
        break;
      default:
        throw new Error('Invalid user type');
    }
    console.log('--------',endpoint,'---------')

      const response = await apiService.post(endpoint, {
        email: credentials.email,
        password: credentials.password,
        userType: credentials.userType // Add user type
      });
      console.log('Auth service response:', response);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userName', response.data.firstName);
        localStorage.setItem('info',response.user)
      }
      return response;
    } catch (error) {
      console.error('Auth service error:', error);
      throw error;
    }
  },

  // Get current user profile based on role
  getCurrentUser: async () => {
    try {
      const role = localStorage.getItem('role');
      let endpoint;

      switch (role) {
        case 'teacher':
          endpoint = '/teacher/dashboard';
          break;
        case 'student':
          endpoint = '/student/dashboard';
          break;
        case 'guardian':
          endpoint = '/guardian/dashboard';
          break;
        default:
          throw new Error('Invalid user role');
      }

      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('info')
    window.location.href = '/login';
  },

  // Authentication check
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  // Get user role
  getUserRole: () => {
    return localStorage.getItem('role');
  },

  // Check if user has specific role
  hasRole: (role) => {
    return localStorage.getItem('role') === role;
  },

  // Get user info
  getUserInfo: () => {
    return {
      id: localStorage.getItem('userId'),
      role: localStorage.getItem('role'),
      name: localStorage.getItem('userName'),
    };
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const role = localStorage.getItem('role');
      const endpoint = `/${role}/profile`;
      return await apiService.put(endpoint, userData);
    } catch (error) {
      throw error;
    }
  }
};

export default authService;