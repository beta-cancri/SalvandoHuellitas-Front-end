import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './landing.styles.css';
import '../../assets/css/button/Button.css';
import DonationInput from '../../components/donation/DonationInput'; // Importamos el componente de donación

const Landing = () => {
  const [showDonationInput, setShowDonationInput] = useState(false);

  const handleDonateClick = () => {
    setShowDonationInput(true);
  };

  const handleCloseDonationInput = () => {
    setShowDonationInput(false);
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="lading-title">Nuestros amigos de cuatro patas necesitan tu ayuda.</h1>
        <p className="subtext">Salvando Huellitas</p>
        <div className="landing-buttons">
          {/* Mostrar botones de donar y adoptar solo si el input de donación no está visible */}
          {!showDonationInput && (
            <>
              <button className="button-landing" onClick={handleDonateClick}>
                Donar
              </button>
              <Link to="/home" className="button-landing">Adoptar</Link>
            </>
          )}

          {/* Mostrar el input de donación solo si el usuario hace clic en Donar */}
          {showDonationInput && (
            <DonationInput onClose={handleCloseDonationInput} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;