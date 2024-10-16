// src/services/api.js
import axiosInstance from './axiosInstance';

const API_URL = ''; // No need to include '/api' here

// Login API
export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};