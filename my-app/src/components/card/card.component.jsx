import React from 'react';
import { Link } from 'react-router-dom';
import './card.styles.css';

const Card = ({ pet }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Link to={`/detail/${pet.id}`} className="pet-card-link">
      <div className="pet-card">
        <img src={pet.photo} alt={pet.name} className="pet-card-image" />
        <h3 className="pet-name">{capitalizeFirstLetter(pet.name)}</h3>
        <p>Breed: {pet.breed}</p>
        <p>Energy Level: {capitalizeFirstLetter(pet.energyLevel)}</p>
        <p>Condición especial: Saludable</p>
      </div>
    </Link>
  );
};

export default Card;


