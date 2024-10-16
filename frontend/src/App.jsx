import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/LoginPage/Login'; // Import the LoginPage component
import UserAdminPage from './Components/UserAdminPage/UserAdmin';
import ListAssignments from './Components/ListAssignmentPage/ListAssignments';
import ListVideoAssignments from './Components/ListVideoAssignmentPage/ListVideoAssignment'; // Import the new component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} /> {/* Add this route for the login page */}
                <Route path="/admin" element={<UserAdminPage />} />
                <Route path="/list-assignments" element={<ListAssignments />} />
                <Route path="/list-video-assignments" element={<ListVideoAssignments />} /> {/* New route */}
            </Routes>
        </Router>
    );
};

export default App;