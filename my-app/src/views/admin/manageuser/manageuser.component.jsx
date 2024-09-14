import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, changeUserStatus } from '../../../redux/actions';
import './manageuser.styles.css';

const ManageUser = ({ status }) => {
  const dispatch = useDispatch();
  const { users, usersCurrentPage, usersTotalPages } = useSelector((state) => state);

  // Fetch users with status filter and default sorting (active first, then alphabetically)
  useEffect(() => {
    dispatch(fetchUsers({ status }, 1));  // Always fetch from the first page
  }, [dispatch, status]);

  // Handle status change
  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus ? false : true;
    const confirmationMessage = `¿Cambiar el estado del usuario a ${newStatus ? 'Activo' : 'Inactivo'}?`;

    if (window.confirm(confirmationMessage)) {
      dispatch(changeUserStatus(userId, newStatus))
        .then(() => {
          dispatch(fetchUsers({ status }, 1));  // Ensure status is passed and we go back to page 1
        })
        .catch((error) => {
          console.error('Error changing user status:', error);
        });
    }
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
                  {user.isActive ? 'Inactivo' : 'Activo'}
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
