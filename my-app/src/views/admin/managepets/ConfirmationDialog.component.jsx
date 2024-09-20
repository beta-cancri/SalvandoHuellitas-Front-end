import React from 'react';
import './confirmationdialog.styles.css';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <div className="confirmation-actions">
        <button className="confirm-button" onClick={onConfirm}>Aceptar</button>
        <button className="cancel-button" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
