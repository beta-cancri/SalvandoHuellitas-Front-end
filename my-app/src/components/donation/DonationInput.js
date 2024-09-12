import React, { useState } from 'react';
import './DonationInput.styles.css';  // Asegúrate de que la ruta sea correcta

const DonationInput = ({ onClose }) => {
  const [donationAmount, setDonationAmount] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]+(\.[0-9]{0,2})?$/.test(value)) {
      setDonationAmount(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Donación realizada:', donationAmount);
    // Aquí puedes agregar la lógica para procesar la donación
  };

  return (
    <div className="donation-form-container">
      <form onSubmit={handleSubmit} className="donation-form">
        <label htmlFor="donation">Ingrese el monto de donación:</label>
        <div className="input-group">
          <input
            type="text"
            id="donation"
            value={donationAmount}
            onChange={handleChange}
            placeholder="0.00"
          />
          <button type="submit" className="confirm-button">Confirmar Donación</button>
          <button type="button" onClick={onClose} className="close-button">
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonationInput;
