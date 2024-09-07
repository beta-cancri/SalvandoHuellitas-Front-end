import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, changeUserStatus } from '../../../redux/actions';
import './manageuser.styles.css';

const ManageUser = () => {
  const dispatch = useDispatch();
  const { users, usersCurrentPage, usersTotalPages } = useSelector((state) => state);

  // Fetch users
  useEffect(() => {
    console.log("Fetching users for page:", usersCurrentPage);
    dispatch(fetchUsers(usersCurrentPage));
  }, [dispatch, usersCurrentPage]);

  // Log the current total pages for debugging
  console.log("Total Pages for Users:", usersTotalPages);

  // Handle status change
  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === true ? false : true;
    const confirmationMessage = `¿Cambiar el estado del usuario a ${newStatus ? 'Activo' : 'Inactivo'}?`;

    if (window.confirm(confirmationMessage)) {
      dispatch(changeUserStatus(userId, newStatus))
        .then(() => {
          // Refetch users after status change
          dispatch(fetchUsers(usersCurrentPage));
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
    <div className="manage-users">
      <div className="manage-users-header">
        <h2>Manejo de Usuarios</h2>
      </div>

      {users && users.length > 0 ? (
        <div className="users-container">
          <ul className="users-grid">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <div className="user-details">
                  <div className="user-name">
                    <div
                      className={`status-light ${
                        user.isActive ? 'status-available' : 'status-inactive'
                      }`}
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
