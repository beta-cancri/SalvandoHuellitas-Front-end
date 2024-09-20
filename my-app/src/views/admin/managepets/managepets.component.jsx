import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets, changePetStatus } from '../../../redux/actions';
import './managepets.styles.css';

const ManagePets = ({ status }) => {
  const dispatch = useDispatch();
  const { pets, petsCurrentPage, petsTotalPages } = useSelector((state) => state);
  const sortCriteria = 'status';  // Sort by status

  // Fetch pets with sorting and dynamic status filter
  useEffect(() => {
    const statusFilter = status || ['available', 'inactive'];  // If no status is selected, default to 'available' and 'inactive'
    dispatch(fetchPets({ status: statusFilter, sort: sortCriteria }, 1, false));
  }, [dispatch, status, sortCriteria]);

  // Handle status change
  const handleToggleStatus = (petId, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'inactive' : 'available';
    const confirmationMessage = `¿Cambiar el estado de la mascota a ${newStatus === 'available' ? 'Activo' : 'Inactivo'}?`;

    if (window.confirm(confirmationMessage)) {
      dispatch(changePetStatus(petId, newStatus))
        .then(() => {
          dispatch(fetchPets({ status: status || ['available', 'inactive'], sort: sortCriteria }, 1, false));  // Refetch pets after status change
        })
        .catch((error) => {
          console.error('Error changing status:', error);
        });
    }
  };

  // Pagination handling
  const handlePageChange = (pageNumber) => {
    dispatch(fetchPets({ status: status || ['available', 'inactive'], sort: sortCriteria }, pageNumber, false));  // Pass the correct status when paginating
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
                    Raza: {pet.breed}, Edad: {pet.age}, Tamaño: {pet.size}, Estado: {pet.status}
                  </div>
                </div>
                <button
                  className="status-button-admin"
                  onClick={() => handleToggleStatus(pet.id, pet.status)}
                >
                  {pet.status === 'available' ? 'Inactivar' : 'Activar'}
                </button>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="pagination-admin">
            <button onClick={() => handlePageChange(petsCurrentPage - 1)} disabled={petsCurrentPage === 1}>
              Anterior
            </button>
            <span>Página {petsCurrentPage} de {petsTotalPages}</span>
            <button onClick={() => handlePageChange(petsCurrentPage + 1)} disabled={petsCurrentPage === petsTotalPages}>
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
