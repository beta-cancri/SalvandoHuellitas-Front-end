import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, changeUserStatus } from '../../../redux/actions';
import Notification from '../../create/Notification';
import ConfirmationDialog from '../managepets/ConfirmationDialog.component'; 
import './manageuser.styles.css';

const ManageUser = ({ status }) => {
  const dispatch = useDispatch();
  const { users, usersCurrentPage, usersTotalPages } = useSelector((state) => state);
  const [notification, setNotification] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  // Fetch users with status filter and default sorting (active first, then alphabetically)
  useEffect(() => {
    dispatch(fetchUsers({ status }, 1));  // Always fetch from the first page
  }, [dispatch, status]);
// Mostrar notificación
const showNotification = (message, type) => {
  setNotification({ message, type });
  setTimeout(() => setNotification(null), 3000); // Ocultar notificación después de 3 segundos
};

// Mostrar confirmación personalizada
const showConfirmation = (message, onConfirm, onCancel) => {
  setConfirmation({ message, onConfirm, onCancel });
};
// Confirmar y cambiar el estado del usuario
const handleConfirmToggleStatus = (userId, newStatus) => {
  setConfirmation(null); // Ocultar la confirmación
  dispatch(changeUserStatus(userId, newStatus))
    .then(() => {
      dispatch(fetchUsers({ status }, 1));  // Ensure status is passed and we go back to page 1
      showNotification(`Estado del usuario cambiado a ${newStatus ? 'Activo' : 'Inactivo'}`, 'success');
    })
    .catch((error) => {
      console.error('Error changing user status:', error);
      showNotification('Error al cambiar el estado del usuario', 'error');
    });
};
  // Handle status change
  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus ? false : true;
    const confirmationMessage = `¿Cambiar el estado del usuario a ${newStatus ? 'Activo' : 'Inactivo'}?`;

     // Mostrar confirmación personalizada
     showConfirmation(
      confirmationMessage,
      () => handleConfirmToggleStatus(userId, newStatus), // Acción de confirmar
      () => setConfirmation(null) // Acción de cancelar
    );
  };


  // Pagination handling
  const handlePageChange = (pageNumber) => {
    dispatch(fetchUsers({ status }, pageNumber));  // Ensure status is passed when changing pages
  };

  return (
    <div className="manage-users">
      <div className="manage-users-header">
        <h2>Manejo de Usuarios</h2>
      </div>
      {notification && <Notification message={notification.message} type={notification.type} />}
      {confirmation && (
        <ConfirmationDialog
          message={confirmation.message}
          onConfirm={confirmation.onConfirm}
          onCancel={confirmation.onCancel}
        />
      )}
      {users && users.length > 0 ? (
        <div className="users-container">
          <ul className="users-grid">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <img src={user.idCard} alt={user.fullName} className="user-idcard-image" />
                <div className="user-details">
                  <div className="user-name">
                    <div
                      className={`status-light ${user.isActive ? 'status-available' : 'status-inactive'}`}
                    ></div>
                    {user.fullName}
                  </div>
                  <div className="user-info">
                    Email: {user.email} | Teléfono: {user.phone}
                  </div>
                </div>
                <button
                  className="status-button"
                  onClick={() => handleToggleStatus(user.id, user.isActive)}
                >
                  {user.isActive ? 'Inactivar' : 'Activar'}
                </button>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="pagination-users">
            <button onClick={() => handlePageChange(usersCurrentPage - 1)} disabled={usersCurrentPage === 1}>
              Anterior
            </button>
            <span>Página {usersCurrentPage} de {usersTotalPages}</span>
            <button onClick={() => handlePageChange(usersCurrentPage + 1)} disabled={usersCurrentPage === usersTotalPages}>
              Siguiente
            </button>
          </div>
        </div>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default ManageUser;
