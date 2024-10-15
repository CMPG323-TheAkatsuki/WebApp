import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="landing-header">
                <div className="header-content">
                    <h1>Welcome to Our App</h1>
                    <p>Your one-stop solution for all your needs.</p>
                </div>
                <Link to="/login" className="btn-primary">
                    Login
                </Link>
            </div>
            <div className="features-section">
                <h2>Features</h2>
                <div className="features">
                    <div className="feature-card">
                        <h3>Feature 1</h3>
                        <p>Description of feature 1.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Feature 2</h3>
                        <p>Description of feature 2.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Feature 3</h3>
                        <p>Description of feature 3.</p>
                    </div>
                </div>
            </div>
            <footer className="landing-footer">
                <p>© 2024 Your Company</p>
            </footer>
        </div>
    );
};

export default LandingPage;
