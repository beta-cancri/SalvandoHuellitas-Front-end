import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequests } from '../../../redux/actions'; // Import the existing fetch action
import './requests.styles.css'; // Assuming you have styles in the same directory

const FetchRequests = ({ status }) => {
  const dispatch = useDispatch();
  const { requests, requestsCurrentPage, requestsTotalPages } = useSelector((state) => state);

  // Fetch user-specific requests with pagination and filtering by status
  useEffect(() => {
    dispatch(fetchRequests(1, 10, 'id', 'ASC', status)); // Fetch requests filtered by status for the user
  }, [dispatch, status]);

  // Function to determine the color of the status text
  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return { color: 'green' };
      case 'pending':
        return { color: 'yellow' };
      case 'denied':
        return { color: 'red' };
      default:
        return {};
    }
  };

  // Pagination handling
  const handlePageChange = (pageNumber) => {
    dispatch(fetchRequests(pageNumber, 10, 'id', 'ASC', status)); // Change page number when paginating
  };

  return (
    <div className="user-requests">
      <div className="requests-header">
        <h2>Mis Peticiones de Adopción</h2>
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
                    Estado: <span style={getStatusStyle(request.status)}>{request.status}</span>
                    <br />
                    Especie: {request.Pet?.species || 'Desconocida'}
                  </div>
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

export default FetchRequests;
