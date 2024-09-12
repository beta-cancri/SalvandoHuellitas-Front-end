import React, { useState, useEffect } from 'react';
import './Notification.css'; // Asegúrate de crear este archivo de estilos

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    // Ocultar la notificación después de 3 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 10000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={onClose}>Aceptar</button>
    </div>
  );
};

export default Notification;
