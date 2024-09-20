import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagePets from '../managepets/managepets.component';
import ManageRequests from '../managerequests/managerequests.component';
import ManageUser from '../manageuser/manageuser.component';
import CreatePet from '../../create/create.component'; // Import the CreatePet component
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { fetchPets, fetchUsers, fetchRequests } from '../../../redux/actions';
import './dashboard.styles.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('requests'); // Default to 'requests'
  const [status, setStatus] = useState('');
  const [initialFetchDone, setInitialFetchDone] = useState({
    pets: false,
    users: false,
    requests: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle section change and initial fetch
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setStatus(''); // Reset status filter when changing sections

    if (section === 'requests' && !initialFetchDone.requests) {
      setInitialFetchDone((prev) => ({ ...prev, requests: true }));
    }

    if (section === 'users' && !initialFetchDone.users) {
      setInitialFetchDone((prev) => ({ ...prev, users: true }));
    }

    if (section === 'pets' && !initialFetchDone.pets) {
      setInitialFetchDone((prev) => ({ ...prev, pets: true }));
    }
  };

  // Fetch pets when the pets section is active
  useEffect(() => {
    if (activeSection === 'pets' && !initialFetchDone.pets) {
      dispatch(fetchPets({ status }, 1, false));
      setInitialFetchDone((prev) => ({ ...prev, pets: true }));
    }
  }, [dispatch, status, activeSection, initialFetchDone.pets]);

  // Fetch users when the users section is active
  useEffect(() => {
    if (activeSection === 'users' && !initialFetchDone.users) {
      dispatch(fetchUsers(1, status));
      setInitialFetchDone((prev) => ({ ...prev, users: true }));
    }
  }, [dispatch, status, activeSection, initialFetchDone.users]);

  // Fetch requests immediately on mount because 'requests' is the default section
  useEffect(() => {
    if (activeSection === 'requests' && !initialFetchDone.requests) {
      dispatch(fetchRequests(1, 10, 'id', 'ASC', status));
      setInitialFetchDone((prev) => ({ ...prev, requests: true }));
    }
  }, [dispatch, status, activeSection, initialFetchDone.requests]);

  // Validate if the user is an admin
  useEffect(() => {
    let storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location = '/'; // Redirect to home if user is not found
      return;
    }
    storedUser = JSON.parse(storedUser);
    if (!storedUser.isAdmin) {
      window.location = '/'; // Redirect to home if the user is not an admin
    }
  }, []);

  // Filter options for pets, users, and requests
  const statusOptions = [
    { value: '', label: 'Todos' },
    { value: 'available', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
  ];

  const userStatusOptions = [
    { value: '', label: 'Todos' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
  ];

  const requestStatusOptions = [
    { value: '', label: 'Todos' },
    { value: 'approved', label: 'Aprobada' },
    { value: 'denied', label: 'Denegada' },
  ];

  // Custom styles for Select dropdown
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: '#fff',
      boxShadow: 'none',
      borderRadius: '4px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a8a3a3' : state.isFocused ? '#f0cd8a' : 'rgba(0, 0, 0, 0.5)',
      color: state.isSelected ? '#000' : '#fff',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a8a3a3',
    }),
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Administrador</h2>
        {/* Ver peticiones de adopción button moved to the top */}
        <button
          className={`sidebar-button ${activeSection === 'requests' ? 'selected' : ''}`}
          onClick={() => handleSectionChange('requests')}
        >
          Ver peticiones de adopción
        </button>
        <button
          className={`sidebar-button ${activeSection === 'users' ? 'selected' : ''}`}
          onClick={() => handleSectionChange('users')}
        >
          Manejo de usuarios
        </button>
        <button
          className={`sidebar-button ${activeSection === 'pets' ? 'selected' : ''}`}
          onClick={() => handleSectionChange('pets')}
        >
          Manejo de mascotas
        </button>
        <button
          className={`sidebar-button ${activeSection === 'create' ? 'selected' : ''}`} 
          onClick={() => handleSectionChange('create')} // Change section to 'create'
        >
          Crea una mascota
        </button>

        {/* Show filters for Pets section */}
        {activeSection === 'pets' && (
          <div className="filter-controls-admin">
            <label>
              Estado de las Mascotas:
              <Select
                className="custom-select-container-admin"
                classNamePrefix="custom-select-admin"
                value={statusOptions.find((option) => option.value === status)}
                onChange={(selectedOption) => {
                  const newStatus = selectedOption ? selectedOption.value : '';
                  setStatus(newStatus);
                  dispatch(fetchPets({ status: newStatus }, 1, false));
                }}
                options={statusOptions}
                styles={customStyles}
                isClearable
              />
            </label>
          </div>
        )}

        {/* Show filters for Users section */}
        {activeSection === 'users' && (
          <div className="filter-controls-admin">
            <label>
              Estado de los Usuarios:
              <Select
                className="custom-select-container-admin"
                classNamePrefix="custom-select-admin"
                value={userStatusOptions.find((option) => option.value === status)}
                onChange={(selectedOption) => {
                  const newStatus = selectedOption ? selectedOption.value : '';
                  setStatus(newStatus);
                  const isActiveStatus = newStatus === 'active' ? true : newStatus === 'inactive' ? false : '';
                  dispatch(fetchUsers(1, isActiveStatus));
                }}
                options={userStatusOptions}
                styles={customStyles}
                isClearable
              />
            </label>
          </div>
        )}

        {/* Show filters for Requests section */}
        {activeSection === 'requests' && (
          <div className="filter-controls-admin">
            <label>
              Estado de las Solicitudes:
              <Select
                className="custom-select-container-admin"
                classNamePrefix="custom-select-admin"
                value={requestStatusOptions.find((option) => option.value === status)}
                onChange={(selectedOption) => {
                  const newStatus = selectedOption ? selectedOption.value : '';
                  setStatus(newStatus);
                  dispatch(fetchRequests(1, 10, 'id', 'ASC', newStatus)); // Fetch requests with the selected status
                }}
                options={requestStatusOptions}
                styles={customStyles}
                isClearable
              />
            </label>
          </div>
        )}
      </div>

      <div className="dashboard-display">
        {!activeSection && (
          <div className="no-selection-message">
            <p>Elige alguna acción de la barra lateral</p>
          </div>
        )}
        {activeSection === 'pets' && initialFetchDone.pets && <ManagePets status={status} />}
        {activeSection === 'users' && initialFetchDone.users && <ManageUser status={status} />}
        {activeSection === 'requests' && initialFetchDone.requests && <ManageRequests status={status} />}
        {activeSection === 'create' && <CreatePet />} {/* Render the CreatePet component */}
      </div>
    </div>
  );
};

export default AdminDashboard;
