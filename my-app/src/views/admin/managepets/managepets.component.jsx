import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets, changePetStatus } from '../../../redux/actions';
import './managepets.styles.css';

const ManagePets = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const handlechangePetStatus = (petId, status) => {
    if (window.confirm('cambiaste el estado de la mascota')) {
      dispatch(changePetStatus(petId, status));
    }
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
                <div className="pet-name">
                  {/* Status light */}
                  <div
                    className={`status-light ${
                      pet.status === 'available' ? 'status-available' : 'status-inactive'
                    }`}
                  ></div>
                  {pet.name}
                </div>
                <div className="pet-info">
                  Raza: {pet.breed}, Edad: {pet.age}, Tamaño: {pet.size}, Status: {pet.status}
                </div>
              </div>
              <button
                className="edit-buttons"
                onClick={() => handlechangePetStatus(pet.id, 'available')}
              >
                Activo
              </button>
              <button
                className="delete-button"
                onClick={() => handlechangePetStatus(pet.id, 'inactive')}
              >
                Inactivo
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
