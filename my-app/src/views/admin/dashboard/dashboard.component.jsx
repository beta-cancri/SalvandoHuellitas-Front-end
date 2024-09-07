import React, { useState, useEffect } from 'react';
import ManagePets from '../managepets/managepets.component';
import ManageRequests from '../managerequests/managerequests.component';
import ManageUser from '../manageuser/manageuser.component';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPets } from '../../../redux/actions';
import './dashboard.styles.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state);

  // Filter state for status
  const [status, setStatus] = useState('');

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Handle filter change
  const handleFilterChange = (selectedOption) => {
    setStatus(selectedOption ? selectedOption.value : '');
  };

  // Fetch pets whenever the status changes
  useEffect(() => {
    if (activeSection === 'pets') {
      dispatch(fetchPets({ status }, 1, false));
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

        {activeSection === 'pets' && (
          <div className="filter-controls-admin">
            <label>
              Estado:
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
      </div>

      <div className="dashboard-display">
        {activeSection === 'pets' && <ManagePets status={status} />}
        {activeSection === 'users' && <ManageUser />}
        {activeSection === 'requests' && <ManageRequests />}
      </div>
    </div>
  );
};

export default AdminDashboard;
