import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, changeUserStatus } from '../../../redux/actions';
import './manageuser.styles.css';

const ManageUser = () => {
  const dispatch = useDispatch();
  const { users, currentPage, totalPages } = useSelector((state) => state);

  // Fetch users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle status change
  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === true ? false : true;
    const confirmationMessage = `¿Cambiar el estado del usuario a ${newStatus ? 'Activo' : 'Inactivo'}?`;

    if (window.confirm(confirmationMessage)) {
      dispatch(changeUserStatus(userId, newStatus))
        .then(() => {
          // Refetch users after status change
          dispatch(fetchUsers(currentPage));
        })
        .catch((error) => {
          console.error('Error changing user status:', error);
        });
    }
  };

  // Pagination handling
  const handlePageChange = (pageNumber) => {
    dispatch(fetchUsers(pageNumber));
  };

  return (
    <div className="manage-user">
      <div className="manage-user-header">
        <h2>Manejo de Usuarios</h2>
      </div>

      {users && users.length > 0 ? (
        <div className="users-container-admin">
          <ul className="users-grid-admin">
            {users.map((user) => (
              <li key={user.id} className="user-item-admin">
                <div className="user-details-admin">
                  <div className="user-name-admin">
                    <div
                      className={`status-light-admin ${
                        user.isActive ? 'status-available-admin' : 'status-inactive-admin'
                      }`}
                    ></div>
                    {user.fullName}
                  </div>
                  <div className="user-info-admin">
                    Email: {user.email} | Teléfono: {user.phone}
                  </div>
                </div>
                <button
                  className="status-button-admin"
                  onClick={() => handleToggleStatus(user.id, user.isActive)}
                >
                  {user.isActive ? 'Inactivo' : 'Activo'}
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
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default ManageUser;
