import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ManagePets from '../managepets/managepets.component';
import ManageRequests from '../managerequests/managerequests.component';
import ManageUser from '../manageuser/manageuser.component';
import Select from 'react-select';
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




// import React, {useEffect, useState} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPets, fetchUsers, fetchRequests, changePetStatus } from '../../../redux/actions';
// import './dashboard.styles.css';

// const AdminDashboard = () => {
//   // validate user admin (could be better written)
//   useEffect(() => {
//     let storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       storedUser = JSON.parse(storedUser)
//     }else{
//       window.location = "/"
//     }
//     if(!storedUser.isAdmin){
//       window.location = "/"
//     }
//   }, []);
//   //////


//   const dispatch = useDispatch();
//   const pets = useSelector((state) => state.pets); // Access the pets array
//   const requests = useSelector((state) => state.requests); // Access the requests array
//   const [activeSection, setActiveSection] = useState(null);

//   const handleFetchPets = () => {
//     dispatch(fetchPets());
//     setActiveSection('pets');
//   };

//   const handleFetchUsers = () => {
//     dispatch(fetchUsers());
//     setActiveSection('users');
//   };

//   const handleFetchRequests = () => {
//     dispatch(fetchRequests());
//     setActiveSection('requests');
//   };

//   const handlechangePetStatus = (petId, status) => {
//     if (window.confirm('cambiaste el estado de la mascota')) {
//       dispatch(changePetStatus(petId, status));
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="sidebar">
//         <h2>Administrador</h2>
//         <button className="sidebar-button" onClick={handleFetchUsers}>
//           Manejo de usuarios
//         </button>
//         <button className="sidebar-button" onClick={handleFetchPets}>
//           Manejo de mascotas
//         </button>
//         <button className="sidebar-button" onClick={handleFetchRequests}>
//           Ver peticiones de adopción
//         </button>
//       </div>
//       <div className="dashboard-display">
//         {activeSection === 'pets' && (
//           <div className="manage-pets">
//             <h2>Editar Mascotas</h2>
//             {pets && pets.length > 0 ? (
//               <ul>
//                 {pets.map((pet) => (
//                   <li key={pet.id}>
//                     <img src={pet.photo} alt={pet.name} className="pet-photo" />
//                     <div className="pet-details">
//                       <div className="pet-name">{pet.name}</div>
//                       <div className="pet-info">
//                         Raza: {pet.breed}, Edad: {pet.age}, Tamaño: {pet.size}, Status: {pet.status}
//                       </div>
//                     </div>
//                     <button className="edit-buttons"
//                     onClick={() => handlechangePetStatus(pet.id, "available")}
//                     >Activo</button>
//                     <button
//                       className="delete-button"
//                       onClick={() => handlechangePetStatus(pet.id, "inactive")}
//                     >
//                       Inactivo
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No se encontraron mascotas.</p>
//             )}
//           </div>
//         )}
//         {activeSection === 'users' && (
//           <div className="manage-users">
//             <h2>Manejo de Usuarios</h2>
//             {/* Placeholder content for users management */}
//             <p>Aquí se mostrará la gestión de usuarios.</p>
//           </div>
//         )}
//         {activeSection === 'requests' && (
//           <div className="manage-requests">
//             <h2>Ver Peticiones de Adopción</h2>
//             {requests && requests.length > 0 ? (
//               <ul>
//                 {requests.map((request) => (
//                   <li key={request.id}>
//                     <div className="request-details">
//                       <div className="request-info">
//                         Usuario ID: {request.id_user} | Especie Seleccionada: {request.preferedSpecie} | Mascota ID: {request.id_pet}
//                       </div>
//                     </div>
//                     <button className="edit-button">Editar</button>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No se encontraron peticiones.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
