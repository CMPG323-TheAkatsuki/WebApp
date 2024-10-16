// src/components/LoginPage/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { loginUser } from '../../services/api'; // Corrected import path

const Login = () => {
    const [user_number, setUserNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ user_number, password });
            console.log('Login successful:', response);
            // Navigate to the ListAssignments page upon successful login
            navigate('/list-assignments');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>User Number:</label>
                <input
                    type="text"
                    value={user_number}
                    onChange={(e) => setUserNumber(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;