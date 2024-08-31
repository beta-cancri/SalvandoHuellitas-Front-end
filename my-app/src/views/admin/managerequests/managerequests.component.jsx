import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequests } from '../../../redux/actions';
import './managerequests.styles.css';

const ManageRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  return (
    <div className="manage-requests">
      <h2>Ver Peticiones de Adopción</h2>
      {requests && requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              <div className="request-details">
                <div className="request-info">
                  Especie Preferida: {request.preferedSpecie}, Espacio: {request.space}
                </div>
              </div>
              <button className="edit-button">Editar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron peticiones.</p>
      )}
    </div>
  );
};

export default ManageRequests;
