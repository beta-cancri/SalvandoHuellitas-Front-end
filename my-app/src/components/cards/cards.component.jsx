import React from 'react';
import Card from '../card/card.component';
import './cards.styles.css';


const Cards = ({ pets = [] }) => {
 // console.log('Cards component received pets:', pets); // Debugging log
  return (
    <div className="cards-container">
      {pets.length > 0 ? (
        pets.map((pet) => (
          <Card key={pet.id} pet={pet} />
        ))
      ) : (
        <p>No pets found</p>
      )}
    </div>
  );
};

export default Cards;
