import React from 'react';
import { Link } from 'react-router-dom';
import './card.styles.css';


const Card = ({ pet }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const mapEnergyLevel = {
    low: "Bajo",
    medium: "Medio",
    high: "Alto"
  }

  return (
    <Link to={`/detail/${pet.id}`} className="pet-card-link">
      <div className="pet-card">
        {/* Contenedor para asegurar que la imagen no se deforme */}
        <div className="pet-card-image-container">
          <img src={pet.photo} alt={pet.name} className="pet-card-image" />
        </div>
        <h3 className="pet-name">{capitalizeFirstLetter(pet.name)}</h3>
        <p>Raza: {pet.breed}</p>
        <p>Nivel de energía: {mapEnergyLevel[pet.energyLevel]}</p>
        <p>Condición especial: Saludable</p>
      </div>
    </Link>
  );
};

export default Card;
