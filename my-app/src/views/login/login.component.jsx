import React from 'react';
import { Link } from 'react-router-dom';
import './login.styles.css';
import { iniciarAutenticacion } from '../../auth/auth'; // Import the auth function

const Login = () => {

  const handleGoogleLogin = () => {
    iniciarAutenticacion(); // Call the authentication function
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form className="login-form">
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Entrar</button>
      </form>
      <div className="social-login-buttons">
        <button onClick={handleGoogleLogin} className="google-login-button">
          Iniciar con Google
        </button>
        <button onClick={handleFacebookLogin} className="facebook-login-button">
          Iniciar con Facebook
        </button>
      </div>
      <div className="login-links">
        <Link to="/register">¿No tienes una cuenta? ¡Registrate!</Link>
      </div>
    </div>
  );
};

export default Login;
