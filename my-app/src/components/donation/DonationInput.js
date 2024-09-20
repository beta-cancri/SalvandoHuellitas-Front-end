import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDonation } from '../../redux/actions/index';
import Notification from '../../views/create/Notification.jsx';
import './DonationInput.styles.css';  
import { useNavigate } from 'react-router-dom';

const DonationInput = ({ onClose }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
 
  const dispatch = useDispatch();
  const donationError = useSelector(state => state.donationError);
  const paymentLink = useSelector(state => state.paymentLink);
  const navigate = useNavigate();

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
      setNotificationMessage('⚠ Ingrese un monto de donación válido');
      setShowNotification(true);
    }
  };

  useEffect(() => {
    if (paymentLink) {
      // Guardar la bandera de donación exitosa
      localStorage.setItem('donationComplete', 'true');

      // Redirigir al link de pago
      window.location.href = paymentLink;
      setDonationAmount('');
    }
  }, [paymentLink, navigate]);

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
      {showNotification && (
        <Notification 
          message={notificationMessage} 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </div>
  );
};

export default DonationInput;