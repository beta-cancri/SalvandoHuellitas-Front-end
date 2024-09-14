import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../redux/actions';
import Notification from '../create/Notification';
import validationForRegister from './validationForRegister';
import './register.styles.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    birthDate: '',
    phone: '',
    idCard: '',
    occupation: '',
  });

  // State for image file
  const [idCardImage, setIdCardImage] = useState(null);
  const [error, setError] = useState({});
  const [uploading, setUploading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    console.log("maira")
    console.log(e.target.files)
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setIdCardImage(file);
      setError(prevError => ({ ...prevError, idCardImage: null }));
    } else {
      setError(prevError => ({ ...prevError, idCardImage: 'Por favor, selecciona una imagen válida' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validationForRegister(formData);
    setError(validateErrors);

    if (Object.keys(validateErrors).length === 0 && idCardImage) {
      setUploading(true);
      try {
        // Create FormData object to handle file upload
        const formDataWithImage = new FormData();
        formDataWithImage.append('idCard', idCardImage);
        formDataWithImage.append('fullName', formData.fullName)
        formDataWithImage.append('email', formData.email)
        formDataWithImage.append('password', formData.password)
        formDataWithImage.append('birthDate', formData.birthDate)

        await dispatch(createUser(formDataWithImage)); // Enviar el formulario con la imagen, antes era formdata
        setShowNotification(true);
       
         // redirigir a la página de inicio después de un registro exitoso
         setTimeout(() => {
          navigate('/home'); // Redirige al home
        }, 2000); // Espera 2 segundos para mostrar la notificación

        // Clear the form after successful submission
        setFormData({
          fullName: '',
          email: '',
          password: '',
          birthDate: '',
          phone: '',
          idCard: '',
          occupation: '',
        });
        setIdCardImage(null); // limpia image file
      } catch (err) {
        setError(prevError => ({ ...prevError, global: 'Error al crear el usuario: ' + err.message }));
      } finally {
        setUploading(false);
      }
    }
  };
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="full-screen-container-register">
      <div className="register-container">
        <h1>Crea una cuenta</h1>
        {error.global && <p aria-live="assertive" className="error-message">{error.global}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Nombre Completo
            <input
              type="text"
              name="fullName"
              placeholder="Nombre completo"
              value={formData.fullName}
              onChange={handleChange}
              className={error.fullName ? 'error' : ''}
              autoComplete="name"
            />
            {error.fullName && (
              <div className="error-tooltip" role="alert">
                <p className="error-text">{error.fullName}</p>
                <div className="error-arrow"></div>
              </div>
            )}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {error.email && (
              <div className="error-tooltip" role="alert">
                <p className="error-text">{error.email}</p>
                <div className="error-arrow"></div>
              </div>
            )}
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className={error.password ? 'error' : ''}
              autoComplete="new-password"
            />
            {error.password && (
              <div className="error-tooltip" role="alert">
                <p className="error-text">{error.password}</p>
                <div className="error-arrow"></div>
              </div>
            )}
          </label>

          <label>
            Fecha de nacimiento
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={error.birthDate ? 'error' : ''}
              autoComplete="bdate"
            />
            {error.birthDate && (
              <div className="error-tooltip" role="alert">
                <p className="error-text">{error.birthDate}</p>
                <div className="error-arrow"></div>
              </div>
            )}
          </label>

          <label>
            Nro de teléfono
            <input
              type="text"
              name="phone"
              placeholder="Nro de teléfono"
              value={formData.phone}
              onChange={handleChange}
              className={error.phone ? 'error' : ''}
              autoComplete="tel"
            />
            {error.phone && (
              <div className="error-tooltip" role="alert">
                <p className="error-text">{error.phone}</p>
                <div className="error-arrow"></div>
              </div>
            )}
          </label>

          <label>
            Tarjeta ID (subir imagen)
            <div class="file-upload-container">
            <button class="custom-button">Seleccionar archivo</button>
            <input
              type="file"
              name="idCard"
              accept="image/*"
              onChange={handleImageChange}
              className={error.idCard ? 'error' : ''}
            />
            </div>
            {error.idCardImage && (
              <div className="error-tooltip" role="alert">
                <p className="error-text">{error.idCard}</p>
                <div className="error-arrow"></div>
              </div>
            )}
          </label>

          <label>
            Ocupación
            <input
              type="text"
              name="occupation"
              placeholder="Ocupación"
              value={formData.occupation}
              onChange={handleChange}
              autoComplete="organization-title"
            />
            {error.occupation && (
              <div className="error-tooltip" role="alert">
                <p className="error-text">{error.occupation}</p>
                <div className="error-arrow"></div>
              </div>
            )}
          </label>

          <button type="submit" className="button" disabled={uploading}>
            Registrate
          </button>
        </form>
      </div>
      {showNotification && (
        <Notification message="¡Registro exitoso! 🐾" onClose={handleCloseNotification} />
      )}
    </div>
  );
};

export default Register;