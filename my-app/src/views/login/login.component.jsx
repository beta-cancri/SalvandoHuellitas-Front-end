import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './login.styles.css';
import { iniciarAutenticacion } from '../../auth/auth'; // Import the auth function
import axios from "axios"
import {jwtDecode} from "jwt-decode";


const Login = () => {
  const [form, setForm] = useState({email: "", password: ""})

  const handleGoogleLogin = () => {
    iniciarAutenticacion(); // Call the authentication function
  };

 // const handleFacebookLogin = () => {
   // console.log('Facebook login clicked');
  //};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const login = () => {
    axios.post("/auth", form).then(response => {
      localStorage.setItem("jwt", response.data.token);
      var decoded = jwtDecode(response.data.token);
      console.log(decoded); // Agrega esta línea para ver el contenido del decoded
      localStorage.setItem("user", JSON.stringify(decoded));
      window.location = "/home";
    }).catch(error => {
      alert(error.response.data.error);
    });
  }

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
          // required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-input"
          value={form.password}
          onChange={handleChange}
          // required
        />
        <button type="button" className="button" onClick={login}>Ingresar</button>
      </div>
      <div className="social-login-buttons">
        <button onClick={handleGoogleLogin} className="google-login-button">
          Iniciar con Google
        </button>
        {/*<button onClick={handleFacebookLogin} className="facebook-login-button">*/}
         {/*Iniciar con Facebook*/}
        {/*</button>*/}
      </div>
      <div className="login-links">
        <Link to="/register">¿No tienes una cuenta? ¡Registrate!</Link>
      </div>
    </div>
  );
};

export default Login;
