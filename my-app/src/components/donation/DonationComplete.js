import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../../views/create/Notification.jsx';

const DonationComplete = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const previousPage = localStorage.getItem('previousPage'); // Recuperar la URL anterior
    if (previousPage) {
      localStorage.removeItem('previousPage'); // Eliminar el dato del storage

      // Mostrar la notificación
      setShowNotification(true);

      // Después de unos segundos, redirigir a la página anterior
      setTimeout(() => {
        navigate(previousPage); // Redirige a la página anterior
      }, 3000); // Puedes ajustar el tiempo de espera según prefieras
    }
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
