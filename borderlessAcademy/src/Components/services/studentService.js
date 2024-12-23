// services/studentService.js
import apiService from './api';

const studentService = {
    getClasses: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await apiService.get('/student/classes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default studentService;