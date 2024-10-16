import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LandingPage.css'; // Ensure this is correctly linked

const LandingPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1>HMS</h1>
                <p>Your one-stop for everything Human Movement Sciences</p>
                <button
                    className="btn-primary"
                    onClick={() => navigate('/login')} // Navigate to login page on button click
                >
                    Login
                </button>
            </header>

            <div className="content">
                <section className="features-section">
                    <h2>Features</h2>
                    <div className="features">
                        <div className="feature-card">
                            <h3>Video Submissions</h3>
                            <p>Submit your assignments via video format for easy review.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Feedback Mechanism</h3>
                            <p>Receive constructive feedback from your lecturers on your submissions.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Centralized Platform</h3>
                            <p>Access all your assignment resources in one convenient location.</p>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="landing-footer">
                <p>Welcome to the website made for HMS students</p>
            </footer>
        </div>
    );
};

export default LandingPage;
