import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions';
import validationForRegister from './validationForRegister';
import './register.styles.css';

const Register = () => {
  const dispatch = useDispatch();

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
  const [uploading,setUploading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };
 // Handle image change
 const handleImageChange = (e) => {
  setIdCardImage(e.target.files[0]);
};
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validationForRegister(formData);
    setError(validateErrors);

    if (Object.keys(validateErrors).length === 0  && idCardImage) { //no se envia el formulario hasta que todos los campos estén completos
      setUploading(true);
      try {
        // Create FormData object to handle file upload
        const formDataWithImage = new FormData();
        formDataWithImage.append('file', idCardImage);
        formDataWithImage.append('upload_preset', 'ID_Card_images'); // Cloudinary preset

        // Send image to Cloudinary
        const res = await fetch('https://api.cloudinary.com/v1_1/dlki6tbbk/image/upload', {
          method: 'POST',
          body: formDataWithImage,
        });

        const data = await res.json();

        // Add Cloudinary URL to form data
        const updatedFormData = {
          ...formData,
          idCardImage: data.secure_url, // Add image URL from Cloudinary
        };
        await dispatch(createUser(updatedFormData));// Enviar el formulario con la imagen, antes era formdata
        alert('El usuario fue creado exitosamente');

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
        setIdCardImage(null);// Clear image file
      } catch (err) {
        setError('Error al crear el usuario: ' + err.message);

      } finally {
        setUploading(false);
      }
    }
  };
  return (
    <div className="full-screen-container-register">
      <div className="register-container">
        <h1>Crea una cuenta</h1>
        {error.global && <p className="error-message">{error.global}</p>} {/* Mostrar error global img*/}

        <form className="register-form" onSubmit={handleSubmit}>
          Nombre Completo
          <input
            type="text"
            name="fullName"
            placeholder="Nombre completo"
            value={formData.fullName}
            onChange={handleChange}
            className={error.fullName ? 'error' : ''}
          />
          {error.fullName && (
            <div className="error-tooltip">
              <p className="error-text">{error.fullName}</p>
              <div className="error-arrow"></div>
            </div>
          )}

          Email<input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}

          />
          {error.email && (
            <div className="error-tooltip">
              <p className="error-text">{error.email}</p>
              <div className="error-arrow"></div>
            </div>
          )}
          Contraseña<input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className={error.password ? 'error' : ''}
          />
          {error.password && (
            <div className="error-tooltip">
              <p className="error-text">{error.password}</p>
              <div className="error-arrow"></div>
            </div>
          )}
          Fecha de nacimiento<input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={error.birthDate ? 'error' : ''}
          />
          {error.birthDate && (
            <div className="error-tooltip">
              <p className="error-text">{error.birthDate}</p>
              <div className="error-arrow"></div>
            </div>
          )}

          Nro de teléfono<input
            type="text"
            name="phone"
            placeholder="Nro de teléfono"
            value={formData.phone}
            onChange={handleChange}
            className={error.phone ? 'error' : ''}
          />
          {error.phone && (
            <div className="error-tooltip">
              <p className="error-text">{error.phone}</p>
              <div className="error-arrow"></div>
            </div>
          )}
          
           Tarjeta ID (subir imagen)
          <input
            type="file"
            name="idCardImage"
            accept="image/*"
            onChange={handleImageChange}
            className={error.idCardImage ? 'error' : ''}
          />
          {error.idCardImage && (
            <div className="error-tooltip">
              <p className="error-text">{error.idCardImage}</p>
              <div className="error-arrow"></div>
            </div>
          )}
          Ocupación<input
            type="text"
            name="occupation"
            placeholder="Ocupación"
            value={formData.occupation}
            onChange={handleChange}
          />
          {error.occupation && (
            <div className="error-tooltip">
              <p className="error-text">{error.occupation}</p>
              <div className="error-arrow"></div>
            </div>
          )}

          <button type="submit" className="button" disabled={uploading}>
            Registrate
          </button>
        </form>
        {/*error && <p className="error-message">{error}</p>*/}
      </div>
    </div>
  );
};

export default Register;
//funciona pero