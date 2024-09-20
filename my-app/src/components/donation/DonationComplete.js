import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../../views/create/Notification.jsx';

const DonationComplete = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const donationComplete = localStorage.getItem('donationComplete');
    
    if (donationComplete) {
      // Mostrar la notificación solo si la bandera está presente
      setShowNotification(true);
      localStorage.removeItem('donationComplete'); // Eliminar la bandera
    }

    // Redirigir a /home
    setTimeout(() => {
      navigate('/home');
    }, 3000);
  }, [navigate]);

  return (
    <>
      {showNotification && (
        <Notification 
          message="🎉 ¡Gracias por tu donación!" 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </>
  );
};

export default DonationComplete;