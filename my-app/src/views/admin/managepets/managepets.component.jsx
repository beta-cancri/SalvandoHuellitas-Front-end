import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets, changePetStatus } from '../../../redux/actions';
import Select from 'react-select';
import './managepets.styles.css';

const ManagePets = () => {
  const dispatch = useDispatch();
  const { pets, currentPage, totalPages } = useSelector((state) => state);

  // Filter state for status
  const [status, setStatus] = useState('');

  // Fetch pets with status filter
  useEffect(() => {
    dispatch(fetchPets({ status }, 1, false)); // Fetch all pets for admin dashboard with filtering
  }, [dispatch, status]);

  // Handle status change
  const handleToggleStatus = (petId, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'inactive' : 'available';
    const confirmationMessage = `¿Cambiar el estado de la mascota a ${newStatus === 'available' ? 'Activo' : 'Inactivo'}?`;

    if (window.confirm(confirmationMessage)) {
      dispatch(changePetStatus(petId, newStatus))
        .then(() => {
          // Refetch pets after status change
          dispatch(fetchPets({ status }, currentPage, false)); // Ensure pets are refetched after status change
        })
        .catch((error) => {
          console.error('Error changing status:', error);
        });
    }
  };

  // Handle status filter change
  const handleFilterChange = (selectedOption) => {
    setStatus(selectedOption ? selectedOption.value : '');
  };

  // Pagination handling
  const handlePageChange = (pageNumber) => {
    dispatch(fetchPets({ status }, pageNumber, false));
  };

  // Filter options for status
  const statusOptions = [
    { value: '', label: 'Todos' },
    { value: 'available', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' }
  ];

  // Custom styles for Select dropdown
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: '#fff',
      boxShadow: 'none',
      borderRadius: '4px'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '4px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a8a3a3' : state.isFocused ? '#f0cd8a' : 'rgba(0, 0, 0, 0.5)',
      color: state.isSelected ? '#000' : '#fff',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a8a3a3'
    })
  };

  return (
    <div className="manage-pets">
      <div className="manage-pets-header">
        <h2>Administrar Mascotas</h2>
  
        {/* Filter by status */}
        <div className="filter-controls-admin">
          <label>
            Estado:
            <Select
              className="custom-select-container-admin"
              classNamePrefix="custom-select-admin"
              value={statusOptions.find(option => option.value === status)}
              onChange={handleFilterChange}
              options={statusOptions}
              styles={customStyles}
              isClearable
            />
          </label>
        </div>
      </div>
  
      {pets && pets.length > 0 ? (
        <div className="pets-container-admin">
          <ul className="pets-grid-admin">
            {pets.map((pet) => (
              <li key={pet.id} className="pet-item-admin">
                <img src={pet.photo} alt={pet.name} className="pet-photo-admin" />
                <div className="pet-details-admin">
                  <div className="pet-name-admin">
                    <div
                      className={`status-light-admin ${
                        pet.status === 'available' ? 'status-available-admin' : 'status-inactive-admin'
                      }`}
                    ></div>
                    {pet.name}
                  </div>
                  <div className="pet-info-admin">
                    Raza: {pet.breed}, Edad: {pet.age}, Tamaño: {pet.size}, Status: {pet.status}
                  </div>
                </div>
                <button
                  className="status-button-admin"
                  onClick={() => handleToggleStatus(pet.id, pet.status)}
                >
                  {pet.status === 'available' ? 'Inactivo' : 'Activo'}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Pagination */}
          <div className="pagination-admin">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div>
        </div>
      ) : (
        <p>No se encontraron mascotas.</p>
      )}
    </div>
  );
};

export default ManagePets;
