import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { fetchRequests } from '../../../redux/actions';
import './managerequests.styles.css';

const ManageRequests = ({ status }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate to change routes
  const { requests, requestsCurrentPage, requestsTotalPages } = useSelector((state) => state);

  // Fetch requests with pagination and filtering by status
  useEffect(() => {
    dispatch(fetchRequests(1, 10, 'id', 'ASC', status)); // Fetch requests filtered by status
  }, [dispatch, status]);

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => {
    dispatch(fetchRequests(pageNumber, 10, 'id', 'ASC', status)); // Change page number when paginating
  };

  // Navigate to request details
  const handleViewRequest = (requestId) => {
    navigate(`/requests/${requestId}`); // Navigate to the RequestDetail component by request ID
  };

  return (
    <div className="manage-requests">
      <div className="manage-requests-header">
        <h2>Ver Peticiones de Adopción</h2>
      </div>
      {requests && requests.length > 0 ? (
        <div className="requests-container">
          <ul className="requests-grid">
            {requests.map((request) => (
              <li key={request.id} className="request-item">
                <img src={request.Pet?.photo} alt={request.Pet?.name || 'Mascota'} className="pet-photo" />
                <div className="request-details">
                  <div className="request-name">
                    {request.Pet?.name || 'Mascota Desconocida'}
                  </div>
                  <div className="request-info">
                    Solicitante: {request.User?.fullName || 'Desconocido'}
                    <br />
                    Especie: {request.Pet?.species || 'Desconocida'}
                  </div>
                  <div className="request-status">
                    Estado: 
                    <span
                      style={{
                        color: request.status === 'approved' ? 'green' : request.status === 'denied' ? 'red' : 'black',
                        fontWeight: 'bold',
                      }}
                    >
                      {request.status || 'Desconocido'}
                    </span>
                  </div>
                </div>

                {/* New 'Ver Petición' Button */}
                <div className="button-group">
                  <button
                    className="button"
                    onClick={() => handleViewRequest(request.id)}
                  >
                    Ver Petición
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="pagination-requests">
            <button onClick={() => handlePageChange(requestsCurrentPage - 1)} disabled={requestsCurrentPage === 1}>
              Anterior
            </button>
            <span>Página {requestsCurrentPage} de {requestsTotalPages}</span>
            <button onClick={() => handlePageChange(requestsCurrentPage + 1)} disabled={requestsCurrentPage === requestsTotalPages}>
              Siguiente
            </button>
          </div>
        </div>
      ) : (
        <p>No se encontraron peticiones.</p>
      )}
    </div>
  );
};

export default ManageRequests;
