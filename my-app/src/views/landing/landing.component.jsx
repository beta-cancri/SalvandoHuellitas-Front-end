import React from 'react';
import { Link } from 'react-router-dom';
import './landing.styles.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="lading-title">Nuestros amigos de cuatro patas necesitan tu ayuda.</h1>
        <p className="subtext">Salvando Huellitas</p>
        <div className="landing-buttons">
          <Link to="/donate" className="btn btn-primary">Donar</Link>
          <Link to="/home" className="btn btn-secondary">Adoptar</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
