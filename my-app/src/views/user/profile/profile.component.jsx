import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetail, updateUserProfile } from '../../../redux/actions'; // Import the actions
import './profile.styles.css'; // Assuming there's a corresponding styles file
import defaultProfilePic from '../../../assets/perfil.png'; // Importa la imagen predeterminada
import Notification from '../../create/Notification';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.userDetail); // Get the userDetail from the Redux store
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [userData, setUserData] = useState({}); // State to store form data
  const [originalData, setOriginalData] = useState({}); // State to store the original data for cancel functionality
  const [imageError, setImageError] = useState(false); // Handle image errors
  const [profilePicture, setProfilePicture] = useState(null); // Handle profile picture uploads
  const [showNotification, setShowNotification] = useState(false);
  // Fetch user data on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the user object from localStorage
    if (user && user.userID) {
      dispatch(fetchUserDetail(user.userID)); // Fetch user data with the user ID
    }
  }, [dispatch]);

  // Set user data when fetched
  useEffect(() => {
    if (userDetail) {
      setUserData(userDetail); // Set user data
      setOriginalData(userDetail); // Store original data for cancel functionality
      console.log("User data set:", userDetail); // Log the user data
    }
  }, [userDetail]);

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Handle file input change for profile picture
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Set the selected file for profile picture
  };

  // Toggle between edit and save mode
  const toggleEdit = () => {
    if (isEditing) {
      // When saving, dispatch the updateUserProfile action
      const formData = new FormData();
      formData.append('fullName', userData.fullName);
      formData.append('email', userData.email);
      formData.append('birthDate', userData.birthDate ? userData.birthDate : null); // Ensure null if not provided
      formData.append('phone', userData.phone);
      formData.append('occupation', userData.occupation);
      
      if (profilePicture) {
        formData.append('idCard', profilePicture); // Append profile picture if it exists
      }
  
      dispatch(updateUserProfile(formData))
        .then(() => {
          // After the update is successful, refetch the user details
          const user = JSON.parse(localStorage.getItem('user')); // Get the user from localStorage
          if (user && user.userID) {
            dispatch(fetchUserDetail(user.userID)); // Refetch user details to update the component state
            setShowNotification(true);
          }
          setIsEditing(false); // Exit edit mode after saving
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });
    } else {
      setIsEditing(true); // Enable edit mode
    }
  };

  // Cancel editing and reset the form to the original data
  const handleCancel = () => {
    setUserData(originalData); // Reset form data to original values
    setProfilePicture(null); // Clear profile picture selection
    setIsEditing(false); // Exit edit mode
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="user-profile">
      {userDetail ? (
        <>
          {/* Add title */}
          <h2 className="profile-title">Información Personal</h2>
  
          <form className="user-profile-form" onSubmit={(e) => e.preventDefault()}>
            {/* Profile picture at the top */}
            <div className="profile-photo-container">
              {!imageError && userDetail.idCard ? (
                <img
                  src={userDetail.idCard} // Use idCard as the profile picture
                  alt="Foto de perfil"
                  className="profile-photo"
                  onError={handleImageError} // If image fails to load, mark error
                />
              ) : (
                <img
                src={defaultProfilePic}  // Usa la imagen predeterminada si no hay foto disponible
                alt="Foto de perfil predeterminada"
                className="profile-photo"
              />
            )}
            </div>
  
            {/* File input for changing profile picture */}
            {isEditing && (
              <div className="form-group">
                <label>Cambiar Foto de Perfil:</label>
                <input type="file" onChange={handleFileChange} />
              </div>
            )}
  
            {/* User Information */}
            <div className="form-horizontal">
              <div className="form-group">
                <label>Nombre Completo:</label>
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName || ''}
                  onChange={handleChange}
                  disabled={!isEditing} // Enable or disable input based on isEditing state
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email || ''}
                  disabled // Email is not editable
                />
              </div>
              <div className="form-group">
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone || ''}
                  onChange={handleChange}
                  disabled={!isEditing} // Enable or disable input based on isEditing state
                />
              </div>
              <div className="form-group">
                <label>Ocupación:</label>
                <input
                  type="text"
                  name="occupation"
                  value={userData.occupation || ''}
                  onChange={handleChange}
                  disabled={!isEditing} // Enable or disable input based on isEditing state
                />
              </div>
              <div className="form-group">
                <label>Fecha de Nacimiento:</label>
                <input
                  type="date"
                  name="birthDate"
                  value={userData.birthDate ? userData.birthDate.split('T')[0] : ''}
                  onChange={handleChange}
                  disabled={!isEditing} // Enable or disable input based on isEditing state
                />
              </div>
            </div>
  
            {/* Edit/Save and Cancel Buttons */}
            <div className="button-container">
              <button
                type="button"
                className="edit-button"
                onClick={toggleEdit}
              >
                {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
       {showNotification && (
        <Notification message="¡Perfil modificado exitosamente! 🐾" onClose={handleCloseNotification} />
      )}
    </div>
  );
  
};

export default UserProfile;
