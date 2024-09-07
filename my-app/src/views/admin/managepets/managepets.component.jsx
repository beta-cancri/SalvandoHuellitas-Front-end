import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets, changePetStatus } from '../../../redux/actions';
import './managepets.styles.css';

const ManagePets = ({ status }) => {
  const dispatch = useDispatch();
  const { pets, currentPage, totalPages } = useSelector((state) => state);

  // Fetch pets with status filter
  useEffect(() => {
    dispatch(fetchPets({ status }, 1, false));
  }, [dispatch, status]);

  // Handle status change
  const handleToggleStatus = (petId, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'inactive' : 'available';
    const confirmationMessage = `¿Cambiar el estado de la mascota a ${newStatus === 'available' ? 'Activo' : 'Inactivo'}?`;

    if (window.confirm(confirmationMessage)) {
      dispatch(changePetStatus(petId, newStatus))
        .then(() => {
          // Refetch pets after status change
          dispatch(fetchPets({ status }, currentPage, false));
        })
        .catch((error) => {
          console.error('Error changing status:', error);
        });
    }
  };

  // Pagination handling
  const handlePageChange = (pageNumber) => {
    dispatch(fetchPets({ status }, pageNumber, false));
  };

  return (
    <div className="manage-pets">
      <div className="manage-pets-header">
        <h2>Administrar Mascotas</h2>
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
