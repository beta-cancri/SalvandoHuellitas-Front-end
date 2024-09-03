import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets, updatePetStatus } from '../../../redux/actions';
import './managepets.styles.css';

const ManagePets = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const handleStatusToggle = (petId, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'inactive' : 'available';
    dispatch(updatePetStatus(petId, newStatus));
  };

  return (
    <div className="manage-pets">
      <h2>Editar Mascotas</h2>
      {pets && pets.length > 0 ? (
        <ul>
          {pets.map((pet) => (
            <li key={pet.id}>
              <img src={pet.photo} alt={pet.name} className="pet-photo" />
              <div className="pet-details">
                <div className="pet-name">{pet.name}</div>
                <div className="pet-info">
                  Raza: {pet.breed}, Edad: {pet.age}, Tamaño: {pet.size}
                </div>
              </div>
              <button className="edit-button">Editar</button>
              <button
                className="status-button"
                onClick={() => handleStatusToggle(pet.id, pet.status)}
              >
                {pet.status === 'available' ? 'Desactivar' : 'Activar'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron mascotas.</p>
      )}
    </div>
  );
};

export default ManagePets;
