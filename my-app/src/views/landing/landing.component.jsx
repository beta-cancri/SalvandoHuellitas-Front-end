import React from 'react';
import { Link } from 'react-router-dom';
import './landing.styles.css';
import '../../assets/css/button/Button.css'

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="lading-title">Nuestros amigos de cuatro patas necesitan tu ayuda.</h1>
        <p className="subtext">Salvando Huellitas</p>
        <div className="landing-buttons">
          <Link to="/donate" className="button-landing">Donar</Link>
          <Link to="/adopt" className="button-landing">Adoptar</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
