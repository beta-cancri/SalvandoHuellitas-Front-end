import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './detail.styles.css';

const Detail = () => {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const mockAnimal = {
      name: 'Rex',
      species: 'Perro',
      condition: 'Saludable',
      gender: 'Macho',
      history: 'Rescatado de la calle, muy cariñoso y juguetón.',
      breed: 'Labrador',
      energyLevel: 'Alta',
      age: 3,
      size: 'Grande',
      goodWithKids: true,
      goodWithPets: true,
      image: 'https://content.nationalgeographic.com.es/medio/2023/11/29/golden-retriever-corriendo_7a50f15e_231129131211_800x800.jpg', // URL de imagen simulada
    };
  
    // Simulación de carga de datos
    setTimeout(() => {
      console.log('Simulated data:', mockAnimal);
      setAnimal(mockAnimal);
      setLoading(false);
    }, 1000); 
  }, []);
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="animal-detail">
    <img src={animal.image} alt={animal.name} className="animal-image" />
    <div className="animal-detail-content">
      <h2>{animal.name}</h2>
      <p><strong>Especie:</strong> {animal.species}</p>
      <p><strong>Condición:</strong> {animal.condition}</p>
      <p><strong>Género:</strong> {animal.gender}</p>
      <p><strong>Historia:</strong> {animal.history}</p>
      <p><strong>Raza:</strong> {animal.breed}</p>
      <p><strong>Nivel de energía:</strong> {animal.energyLevel}</p>
      <p><strong>Edad:</strong> {animal.age} años</p>
      <p><strong>Tamaño:</strong> {animal.size}</p>
      <p><strong>¿Es bueno con los niños?</strong> {animal.goodWithKids ? 'Sí' : 'No'}</p>
      <p><strong>¿Es bueno con otras mascotas?</strong> {animal.goodWithPets ? 'Sí' : 'No'}</p>
      <button className="back-button" onClick={() => navigate('/')}>Atrás</button>
    </div>
  </div>
);
};

export default Detail;
