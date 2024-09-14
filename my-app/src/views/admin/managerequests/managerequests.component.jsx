import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequests } from '../../../redux/actions';
import './managerequests.styles.css';

const ManageRequests = () => {
  const dispatch = useDispatch();
  const { requests, requestsCurrentPage, requestsTotalPages } = useSelector((state) => state);

  // Fetch requests with pagination
  useEffect(() => {
    dispatch(fetchRequests(1)); // Always fetch from the first page initially
  }, [dispatch]);

  // Pagination handling
  const handlePageChange = (pageNumber) => {
    dispatch(fetchRequests(pageNumber)); // Change page number when paginating
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
                </div>
                <div className="button-group">
                  <button className="deny-button">Denegar</button>
                  <button className="approve-button">Aprobar</button>
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
