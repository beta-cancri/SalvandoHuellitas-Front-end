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
    return <p>Cargando...</p>;
  }

  if (!animal) {
    return <p>Error: Animal no carga.</p>;
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
              <p><strong>Especie:</strong> {animal.species}</p>
              <p><strong>Estado:</strong> {animal.status}</p>
              <p><strong>Etapa de vida:</strong> {animal.age}</p>
              <p><strong>Tamaño:</strong> {animal.size}</p>
              <p><strong>Nivel de energía:</strong> {animal.energyLevel}</p>
              <p><strong>Bueno con otras mascotas:</strong> {animal.okWithPets ? 'Yes' : 'No'}</p>
              <p><strong>Bueno con los niños:</strong> {animal.okWithKids ? 'Yes' : 'No'}</p>
              <p><strong>Raza:</strong> {animal.breed ? animal.breed : 'Not specified'}</p>
              <p><strong>Historia:</strong> {animal.history ? animal.history : 'Not available'}</p>
            </div>
          </div>
          <div>
          <button className="detail-back-button" onClick={handleBack}>Atrás</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
