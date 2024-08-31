import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets, fetchUsers, fetchRequests } from '../../../redux/actions';
import './dashboard.styles.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets); // Correctly access the pets array
  const [activeSection, setActiveSection] = useState(null);

  console.log('Pets from Redux store:', pets); // Debugging log to confirm correct access

  const handleFetchPets = () => {
    dispatch(fetchPets());
    setActiveSection('pets');
  };

  const handleFetchUsers = () => {
    dispatch(fetchUsers());
    setActiveSection('users');
  };

  const handleFetchRequests = () => {
    dispatch(fetchRequests());
    setActiveSection('requests');
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <button className="sidebar-button" onClick={handleFetchUsers}>
          Manejo de usuarios
        </button>
        <button className="sidebar-button" onClick={handleFetchPets}>
          Manejo de mascotas
        </button>
        <button className="sidebar-button" onClick={handleFetchRequests}>
          Ver peticiones de adopción
        </button>
      </div>
      <div className="dashboard-display">
        {activeSection === 'pets' && (
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
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se encontraron mascotas.</p>
            )}
          </div>
        )}
        {activeSection === 'users' && (
          <div>
            {/* Display users management content here */}
          </div>
        )}
        {activeSection === 'requests' && (
          <div>
            {/* Display requests management content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
