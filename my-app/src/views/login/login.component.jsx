import React from 'react';
import { Link } from 'react-router-dom';
import './login.styles.css';

const Login = () => {
  const handleGoogleLogin = () => {
    // Add your Google login logic here
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    // Add your Facebook login logic here
    console.log('Facebook login clicked');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="social-login-buttons">
        <button onClick={handleGoogleLogin} className="google-login-button">
          Login with Google
        </button>
        <button onClick={handleFacebookLogin} className="facebook-login-button">
          Login with Facebook
        </button>
      </div>
      <div className="login-links">
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default Login;
