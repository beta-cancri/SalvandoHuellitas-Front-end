import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchPets, fetchUsers, fetchRequests } from '../../../redux/actions'; // Import actions
import './dashboard.styles.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const handleFetchPets = () => {
    dispatch(fetchPets());
  };

  const handleFetchUsers = () => {
    dispatch(fetchUsers());
  };

  const handleFetchRequests = () => {
    dispatch(fetchRequests());
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <button className="sidebar-button" onClick={handleFetchUsers}>
          Manejo de usuarios
        </button>
        <button className="sidebar-button" onClick={handleFetchPets}>
          Manejo de mascotas
        </button>
        <button className="sidebar-button" onClick={handleFetchRequests}>
          Ver peticiones de adopción
        </button>
      </div>
      <div className="dashboard-display">
        {/* The content for each section will be rendered here based on the data */}
      </div>
    </div>
  );
};

export default AdminDashboard;
