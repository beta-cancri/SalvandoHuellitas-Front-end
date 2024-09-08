import React, { useState, useEffect } from 'react';
import ManagePets from '../managepets/managepets.component';
import ManageRequests from '../managerequests/managerequests.component';
import ManageUser from '../manageuser/manageuser.component';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { fetchPets, fetchUsers } from '../../../redux/actions';
import './dashboard.styles.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [status, setStatus] = useState(''); // This will handle both pets and users status
  const dispatch = useDispatch();
  

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setStatus(''); // Reset status filter when changing sections
  };

  // Handle filter change and reset to page 1
  const handleFilterChange = (selectedOption) => {
    const newStatus = selectedOption ? selectedOption.value : '';
    setStatus(newStatus);

    // Reset page to 1 when status filter changes
    if (activeSection === 'pets') {
      dispatch(fetchPets({ status: newStatus }, 1, false)); // Always fetch from page 1
    } else if (activeSection === 'users') {
      const isActiveStatus = newStatus === 'active' ? true : newStatus === 'inactive' ? false : '';
      dispatch(fetchUsers(1, isActiveStatus)); // Always fetch from page 1 with isActive
    }
  };


  // Fetch pets whenever the status changes and the pets section is active
  useEffect(() => {
    if (activeSection === 'pets') {
      dispatch(fetchPets({ status }, 1, false)); // Ensure reset to page 1
    }
  }, [dispatch, status, activeSection]);

  // Fetch users whenever the status changes and the users section is active
  useEffect(() => {
    if (activeSection === 'users') {
      dispatch(fetchUsers(1, status)); // Ensure reset to page 1
    }
  }, [dispatch, status, activeSection]);

  // Validate if the user is an admin
  useEffect(() => {
    let storedUser = localStorage.getItem('user');
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
    } else {
      window.location = "/"; // Redirect to home if user is not found
    }
    if (!storedUser || !storedUser.isAdmin) {
      window.location = "/"; // Redirect to home if the user is not an admin
    }
  }, []);

  // Filter options for status
  const statusOptions = [
    { value: '', label: 'Todos' },
    { value: 'available', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' }
  ];

  // User status filter options (active/inactive)
  const userStatusOptions = [
    { value: '', label: 'Todos' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' }
  ];


  // Custom styles for Select dropdown
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: '#fff',
      boxShadow: 'none',
      borderRadius: '4px'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '4px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a8a3a3' : state.isFocused ? '#f0cd8a' : 'rgba(0, 0, 0, 0.5)',
      color: state.isSelected ? '#000' : '#fff',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a8a3a3'
    })
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Administrador</h2>
        <button className="sidebar-button" onClick={() => handleSectionChange('users')}>
          Manejo de usuarios
        </button>
        <button className="sidebar-button" onClick={() => handleSectionChange('pets')}>
          Manejo de mascotas
        </button>
        <button className="sidebar-button" onClick={() => handleSectionChange('requests')}>
          Ver peticiones de adopción
        </button>

        {/* Show filters for Pets section */}
        {activeSection === 'pets' && (
          <div className="filter-controls-admin">
            <label>
              Estado de las Mascotas:
              <Select
                className="custom-select-container-admin"
                classNamePrefix="custom-select-admin"
                value={statusOptions.find(option => option.value === status)}
                onChange={handleFilterChange}
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
                value={userStatusOptions.find(option => option.value === status)}
                onChange={handleFilterChange}
                options={userStatusOptions}
                styles={customStyles}
                isClearable
              />
            </label>
          </div>
        )}
      </div>

      <div className="dashboard-display">
        {activeSection === 'pets' && <ManagePets status={status} />}
        {activeSection === 'users' && <ManageUser status={status} />}
        {activeSection === 'requests' && <ManageRequests />}
      </div>
    </div>
  );
};

export default AdminDashboard;
