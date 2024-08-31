import React from 'react';
import './dashboard.styles.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Tablero de control del administrador</h1>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Manejo de usuarios</h2>
          {/* User management functionality here */}
        </div>
        <div className="dashboard-section">
          <h2>Editar mascotas</h2>
          {/* Pet management functionality here */}
        </div>
        <div className="dashboard-section">
          <h2>Ver peticiones de adopcion</h2>
          {/* Reports functionality here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
