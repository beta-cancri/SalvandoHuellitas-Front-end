import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../profile/profile.component'; // Import the profile component
import './dashboard.styles.css';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate(); 

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="user-dashboard">
      <div className="sidebar">
        <h2>Usuario</h2>
        <button
          className={`sidebar-button ${activeSection === 'user-data' ? 'selected' : ''}`}
          onClick={() => handleSectionChange('user-data')}
        >
          Ver datos del usuario
        </button>
        <button
          className={`sidebar-button ${activeSection === 'user-requests' ? 'selected' : ''}`}
          onClick={() => handleSectionChange('user-requests')}
        >
          Ver peticiones del usuario
        </button>
        <button
          className={`sidebar-button ${activeSection === 'donate' ? 'selected' : ''}`}
          onClick={() => navigate('/donate')}
        >
          Donar
        </button>
        <button
          className={`sidebar-button ${activeSection === 'adopt' ? 'selected' : ''}`}
          onClick={() => navigate('/home')}
        >
          Adoptar (Ir a Inicio)
        </button>
      </div>

      <div className="dashboard-display">
        {activeSection === 'user-data' && <UserProfile />} {/* Render profile when user-data is active */}
        {activeSection === 'user-requests' && <div>Placeholder: Peticiones del usuario</div>}
        {activeSection === 'donate' && <div>Placeholder: Donar</div>}
      </div>
    </div>
  );
};

export default UserDashboard;
