import React from 'react';
import './WhatsAppButton.styles.css'; 

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/5491133166984?text=Hola%2C%20necesito%20m%C3%A1s%20informaci%C3%B3n%21
" 
      target="_blank" 
      rel="noopener noreferrer"
      className="whatsApp-button"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" 
        alt="WhatsApp" 
        className="whatsApp-icon"
      />
    </a>
  );
};

export default WhatsAppButton;
