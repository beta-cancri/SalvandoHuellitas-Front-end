import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './detail.styles.css';

const Detail = () => {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch(`http://localhost:3001/pets/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch animal data');
        }
        const data = await response.json();
        setAnimal(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching animal:', error);
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  const handleBack = () => {
    navigate(-1); 
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!animal) {
    return <p>Error: Animal not found.</p>;
  }

  return (
    <div className="full-screen-container-detail">
      <div className="animal-detail">
        <div className="animal-detail-content">
         
          <div>
            <h2>{animal.name}</h2>
          </div>
          <div className="animal-detail-body">
            <div>
              <img src={animal.photo} alt={animal.name} className="animal-image" />
            </div>
            <div className="animal-detail-text">
              <p><strong>Species:</strong> {animal.species}</p>
              <p><strong>Status:</strong> {animal.status}</p>
              <p><strong>Age:</strong> {animal.age}</p>
              <p><strong>Size:</strong> {animal.size}</p>
              <p><strong>Energy Level:</strong> {animal.energyLevel}</p>
              <p><strong>Good with Other Pets:</strong> {animal.okWithPets ? 'Yes' : 'No'}</p>
              <p><strong>Good with Kids:</strong> {animal.okWithKids ? 'Yes' : 'No'}</p>
              <p><strong>Breed:</strong> {animal.breed ? animal.breed : 'Not specified'}</p>
              <p><strong>History:</strong> {animal.history ? animal.history : 'Not available'}</p>
            </div>
          </div>
          <div>
          <button className="detail-back-button" onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
