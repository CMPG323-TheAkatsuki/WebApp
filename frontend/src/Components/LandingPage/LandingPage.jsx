import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to Our Application</h1>
        <p>Your gateway to managing tasks efficiently.</p>
        <Link to="/login" className="btn-primary">Login</Link>
      </header>
      <section className="features-section">
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
      </section>
      <footer className="landing-footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
