// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize auth state from localStorage
  const [auth, setAuth] = useState(() => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        const user = JSON.parse(userStr);
        return { token, user };
      }
      return null;
    } catch (error) {
      // If there's any error parsing, clear the localStorage and return null
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  });

  // Login handler
  const login = (token, userData) => {
    try {
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Update state
      setAuth({
        token,
        user: userData
      });
    } catch (error) {
      console.error('Error storing auth data:', error);
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(null);
  };

  // Role check functions
  const isTeacher = () => auth?.user?.role === 'teacher';
  const isGuardian = () => auth?.user?.role === 'guardian';
  const isStudent = () => auth?.user?.role === 'student';
  const isAdmin = () => auth?.user?.role === 'admin';

  // Get dashboard route based on user role
  const getDashboardRoute = () => {
    switch (auth?.user?.role) {
      case 'teacher':
        return '/teacher';
      case 'guardian':
        return '/guardian';
      case 'student':
        return '/student';
      case 'admin':
        return '/admin';
      default:
        return '/login';
    }
  };

  // Get current user details
  const getCurrentUser = () => auth?.user || null;

  // Check if user is authenticated
  const isAuthenticated = () => !!auth?.token;

  // Check if user has specific role
  const hasRole = (role) => auth?.user?.role === role;

  return (
    <AuthContext.Provider value={{
      auth,
      user: auth?.user,
      login,
      logout,
      isTeacher,
      isGuardian,
      isStudent,
      isAdmin,
      getDashboardRoute,
      getCurrentUser,
      isAuthenticated,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;