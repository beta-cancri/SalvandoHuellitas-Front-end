import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import { fetchRequestById, updateRequest } from '../../redux/actions'; // Import the fetchRequestById and updateRequest actions
import './requestsbyid.styles.css'; // Assuming there's a corresponding styles file
import Notification from '../../views/create/Notification';
import ConfirmationDialog from '../../views/admin/managepets/ConfirmationDialog.component'; 

const RequestDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to handle navigation
  const { id } = useParams();  // Get the request ID from the route parameters
  const requestDetail = useSelector((state) => state.requestDetail); // Get request detail from the Redux store
  const [comment, setComment] = useState(''); // State to handle comment input
  const [notification, setNotification] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  // Fetch the request details when the component mounts
  useEffect(() => {
    dispatch(fetchRequestById(id));
  }, [dispatch, id]);
// Show notification
const showNotification = (message, type) => {
  setNotification({ message, type });
  setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
};

// Show confirmation
const showConfirmation = (message, onConfirm, onCancel) => {
  setConfirmation({ message, onConfirm, onCancel });
};

  // Handle request status update (accept or deny)
  const handleUpdateRequest = (status) => {
    const confirmationMessage = `¿Estás seguro de cambiar el estado de la solicitud a ${status}?`;
    showConfirmation(
      confirmationMessage,
      () => {
        dispatch(updateRequest(id, status, comment))
          .then(() => {
            dispatch(fetchRequestById(id)); // Refetch the request details after updating
            showNotification(`Solicitud ${status === 'approved' ? 'aceptada' : 'denegada'}`, 'success');
            setConfirmation(null); // Cierra la notificación de confirmación
          })
          .catch((error) => {
            console.error('Error al actualizar la solicitud:', error);
            showNotification('Error al actualizar la solicitud', 'error');
            setConfirmation(null); // Cierra la notificación de confirmación
          });
      },
      () => {
        setConfirmation(null); // Cancel action
      }
    );
  };
  // Handle navigation back to the previous page
  const handleGoBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  return (
    <div className="request-detail-container-id">
      <h2 className="request-detail-title-id">Información Personal</h2>
      {notification && <Notification message={notification.message} type={notification.type} />}
      {confirmation && (
        <ConfirmationDialog
          message={confirmation.message}
          onConfirm={confirmation.onConfirm}
          onCancel={confirmation.onCancel}
        />
      )}
      {requestDetail ? (
        <div className="request-detail-id">
          {/* Display the pet photo */}
          <div className="request-detail-image-container">
            {requestDetail.Pet?.photo && (
              <img src={requestDetail.Pet.photo} alt="Pet" className="request-detail-pet-photo-id" />
            )}
          </div>

          {/* Fields displayed in two columns */}
          <div className="request-detail-columns-id">
            <div className="form-group-id">
              <label className="request-detail-label-id">Usuario:</label>
              <input className="request-detail-input-id" readOnly value={requestDetail.User?.fullName || 'N/A'} />
            </div>

            <div className="form-group-id">
              <label className="request-detail-label-id">Mascota:</label>
              <input className="request-detail-input-id" readOnly value={requestDetail.Pet?.name || 'N/A'} />
            </div>

            <div className="form-group-id">
              <label className="request-detail-label-id">Estado:</label>
              <input className="request-detail-input-id" readOnly value={requestDetail.status || 'N/A'} />
            </div>

            <div className="form-group-id">
              <label className="request-detail-label-id">Tiene niños:</label>
              <input className="request-detail-input-id" readOnly value={requestDetail.hasKids ? 'Sí' : 'No'} />
            </div>

            <div className="form-group-id">
              <label className="request-detail-label-id">Tiene mascotas:</label>
              <input className="request-detail-input-id" readOnly value={requestDetail.hasPets ? 'Sí' : 'No'} />
            </div>

            <div className="form-group-id">
              <label className="request-detail-label-id">Habitantes Totales:</label>
              <input className="request-detail-input-id" readOnly value={requestDetail.totalHabitants || 'N/A'} />
            </div>

            <div className="form-group-id">
              <label className="request-detail-label-id">Espacio disponible:</label>
              <input className="request-detail-input-id" readOnly value={requestDetail.space || 'N/A'} />
            </div>
          </div>

          {/* Textbox for comment (centered) */}
          <div className="form-group-id request-detail-comment-id">
            <label className="request-detail-label-id">Comentario:</label>
            <textarea
              className="request-detail-textarea-id"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Agrega un comentario"
            ></textarea>
          </div>

          {/* Action buttons: Accept and Deny */}
          {requestDetail.status === 'pending' && (
            <div className="button-group-id">
              <button
                className="button-rechazar"
                onClick={() => handleUpdateRequest('denied')}
              >
                Denegar
              </button>
              <button
                className="button-aceptar"
                onClick={() => handleUpdateRequest('approved')}
              >
                Aceptar
              </button>
            </div>
          )}

          {/* Back button */}
          <div className="back-button-container-id">
            <button onClick={handleGoBack} className="button">
              Volver
            </button>
          </div>
        </div>
      ) : (
        <p className="request-detail-loading-id">Cargando detalles de la solicitud...</p>
      )}
    </div>
  );
};

export default RequestDetail;
