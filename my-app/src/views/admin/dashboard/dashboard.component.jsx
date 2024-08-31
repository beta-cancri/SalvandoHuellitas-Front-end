import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.styles.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Tablero de control del administrador</h1>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Manejo de usuarios</h2>
          {/* Button to navigate to manage users */}
          <button className="dashboard-button" onClick={() => navigate('/admin/manageusers')}>
            Ver Usuarios
          </button>
        </div>
        <div className="dashboard-section">
          <h2>Editar mascotas</h2>
          {/* Button to navigate to manage pets */}
          <button className="dashboard-button" onClick={() => navigate('/admin/managepets')}>
            Ver Mascotas
          </button>
          {/* Button to create a new pet */}
          <button className="create-pet-button" onClick={() => navigate('/create')}>
            Crear una Mascota
          </button>
        </div>
        <div className="dashboard-section">
          <h2>Ver peticiones de adopción</h2>
          {/* Button to navigate to manage requests */}
          <button className="dashboard-button" onClick={() => navigate('/admin/managerequests')}>
            Ver Peticiones
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;