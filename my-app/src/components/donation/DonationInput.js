import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDonation } from '../../redux/actions/index';
import './DonationInput.styles.css';  

const DonationInput = ({ onClose }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const dispatch = useDispatch();
  const donationError = useSelector(state => state.donationError);
  const paymentLink = useSelector(state => state.paymentLink);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]+(\.[0-9]{0,2})?$/.test(value)) {
      setDonationAmount(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (donationAmount > 0) {
      dispatch(createDonation(donationAmount));
    } else {
      alert('Ingrese un monto válido');
    }
  };

  React.useEffect(() => {
    if (paymentLink) {
      window.location.href = paymentLink; // Redirige al link de pago
      setDonationAmount(''); // Limpia el campo de entrada
    }
  }, [paymentLink]);

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
        {donationError && <div className="error-message">{donationError}</div>}
      </form>
    </div>
  );
};



export default DonationInput;
