import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/LoginPage/Login'; // Import the LoginPage component
import UserAdminPage from './Components/UserAdminPage/UserAdmin';
import AssignmentsPage from './Components/ListAssignmentPage/ListAssignments';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} /> {/* Add this route for the login page */}
                <Route path="/admin" element={<UserAdminPage />} />
                <Route path="/list-assignments" element={<AssignmentsPage />} />


            </Routes>
        </Router>
    );
};

export default App;
