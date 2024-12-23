// src/services/classService.js
import apiService from './api';

const classService = {
    // Get all classes for the logged-in teacher
    getClasses: async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token)
            const response = await apiService.get('/teacher/classes',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Create a new class
    createClass: async (classData) => {
        try {
            console.log('create class data0',classData)
            const response = await apiService.post('/teacher/classes/create', classData);
            return response;
        } catch (error) {
            console.log(error,'error from classService')
            throw error;
        }
    },

    // Get a specific class by ID
    getClassById: async (classId) => {
        try {
            const response = await apiService.get(`/teacher/classes/${classId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Update a class
    updateClass: async (classId, classData) => {
        try {
            const response = await apiService.put(`/teacher/classes/${classId}`, classData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Delete a class
    deleteClass: async (classId) => {
        try {
            const response = await apiService.delete(`/teacher/classes/${classId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Add students to a class
    addStudentsToClass: async (classId, studentIds) => {
        try {
            const response = await apiService.post(`/teacher/classes/${classId}/students`, {
                studentIds
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Update class progress
    updateProgress: async (classId, progress) => {
        try {
            const response = await apiService.put(`/teacher/classes/${classId}/progress`, {
                progress
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get class statistics
    getClassStats: async () => {
        try {
            const response = await apiService.get('/teacher/classes/stats');
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Update class schedule
    updateSchedule: async (classId, scheduleData) => {
        try {
            const response = await apiService.put(`/teacher/classes/${classId}/schedule`, scheduleData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Add learning materials to a class
    addLearningMaterial: async (classId, materialData) => {
        try {
            const response = await apiService.post(`/teacher/classes/${classId}/materials`, materialData);
            return response;
        } catch (error) {
            throw error;
        }
    },
    getStudents: async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('this is token',token)
            const response = await apiService.get('/teacher/students', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default classService;