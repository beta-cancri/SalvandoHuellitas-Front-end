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
    gender: '', // Field for gender
  });

  const [error, setError] = useState({});
  const [uploading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validationForRegister(formData);
    setError(validateErrors);

    try {
      await dispatch(createUser(formData));
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
        gender: '',
      });

    } catch (err) {
      setError('Error al crear el usuario: ' + err.message);
    }
  };

  return (
    <div className="full-screen-container-register">
      <div className="register-container">
        <h1>Crea una cuenta</h1>
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
          Tarjeta ID<input
            type="text"
            name="idCard"
            placeholder="Tarjeta ID"
            value={formData.idCard}
            onChange={handleChange}
            className={error.idCard ? 'error' : ''}
          />
          {error.idCard && (
            <div className="error-tooltip">
              <p className="error-text">{error.idCard}</p>
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
