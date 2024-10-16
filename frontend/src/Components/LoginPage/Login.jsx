import React from 'react';
import './Login.css'; // Ensure this is correctly linked

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="user-number">User Number</label>
                        <input type="text" id="user-number" placeholder="Enter your user number" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
