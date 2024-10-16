// src/services/api.js
import axiosInstance from './axiosInstance';

const API_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

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

// Get all users API
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Edit user API
export const editUser = async (id, userData) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error editing user:', error);
        throw error;
    }
};

// Delete user API
export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};


// Submission APIs
export const getAllSubmissions = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/submission`);
        return response.data;
    } catch (error) {
        console.error('Error fetching submissions:', error);
        throw error;
    }
};

export const getStudentSubmissions = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/submission/Student/Me`);
        return response.data;
    } catch (error) {
        console.error('Error fetching student submissions:', error);
        throw error;
    }
};

export const getLecturerSubmissions = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/submission/Lecturer/Me`);
        return response.data;
    } catch (error) {
        console.error('Error fetching lecturer submissions:', error);
        throw error;
    }
};

export const getSubmissionById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/submission/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching submission:', error);
        throw error;
    }
};

export const addSubmission = async (submissionData) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/submission/add`, submissionData);
        return response.data;
    } catch (error) {
        console.error('Error adding submission:', error);
        throw error;
    }
};

export const updateSubmission = async (id, submissionData) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/submission/update/${id}`, submissionData);
        return response.data;
    } catch (error) {
        console.error('Error updating submission:', error);
        throw error;
    }
};

export const deleteSubmission = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_URL}/submission/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting submission:', error);
        throw error;
    }
};

// Feedback APIs
export const getAllFeedback = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/feedback/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feedback:', error);
        throw error;
    }
};

export const getFeedbackByModule = async (module) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/feedback/module/${module}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feedback by module:', error);
        throw error;
    }
};

export const getFeedbackByStudent = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/feedback/myfeedback`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feedback by student:', error);
        throw error;
    }
};

export const getFeedbackByYearLevel = async (yearLevel) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/feedback/year/${yearLevel}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feedback by year level:', error);
        throw error;
    }
};

export const getFeedbackById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/feedback/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feedback by ID:', error);
        throw error;
    }
};

export const addFeedback = async (feedbackData) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/feedback/add`, feedbackData);
        return response.data;
    } catch (error) {
        console.error('Error adding feedback:', error);
        throw error;
    }
};

export const updateFeedback = async (id, feedbackData) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/feedback/update/${id}`, feedbackData);
        return response.data;
    } catch (error) {
        console.error('Error updating feedback:', error);
        throw error;
    }
};

export const deleteFeedback = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_URL}/feedback/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting feedback:', error);
        throw error;
    }
};