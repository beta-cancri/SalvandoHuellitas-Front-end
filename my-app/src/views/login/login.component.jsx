import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.styles.css';
import { iniciarAutenticacion } from '../../auth/auth';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleGoogleLogin = () => {
    iniciarAutenticacion();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = () => {
    axios.post("/auth", form).then(response => {
      localStorage.setItem("jwt", response.data.token);
      var decoded = jwtDecode(response.data.token);
      console.log(decoded);
      localStorage.setItem("user", JSON.stringify(decoded));
      
      let redirectPath = localStorage.getItem('afterLogin')
      
      if (redirectPath) {
        localStorage.removeItem('afterLogin')
        window.location = redirectPath 
        } else { window.location = "/home";
        }
    }).catch(error => {
      alert(error.response.data.error);
    });
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <div className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="login-input"
          value={form.email}
          onChange={handleChange}
        />
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            className="login-input"
            value={form.password}
            onChange={handleChange}
          />
          <span
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="password-toggle"
          >
            {passwordVisible ? (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eye-icon">
                <path d="M1 12s4.5-9 11-9 11 9 11 9-4.5 9-11 9S1 12 1 12z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eye-icon">
                <path d="M1 12s4.5-9 11-9 11 9 11 9-4.5 9-11 9S1 12 1 12z"></path>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M1 1l22 22"></path>
              </svg>
            )}
          </span>
        </div>
        <button type="button" className="button" onClick={login}>Ingresar</button>
      </div>
      <div className="social-login-buttons">
        <button onClick={handleGoogleLogin} className="google-login-button">
          Iniciar con Google
        </button>
      </div>
      <div className="login-links">
        <Link to="/register">¿No tienes una cuenta? ¡Regístrate!</Link>
      </div>
    </div>
  );
};

export default Login;
