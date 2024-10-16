import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/LoginPage/Login'; // Import the LoginPage component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} /> {/* Add this route for the login page */}
            </Routes>
        </Router>
    );
};

export default App;
