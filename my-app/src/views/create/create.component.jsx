import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPet } from '../../redux/actions';
import './create.styles.css';
import validationForCreate from './validationForCreate';


const CreatePet = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    status: 'available',
    photo: '',
    name: '',
    species: '',
    age: '',
    size: '',
    breed: '',
    energyLevel: '',
    okWithPets: false,
    okWithKids: false,
    history: '',
    gender: '', // Added gender field
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });


  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErrors = validationForCreate(formData);
    setError(validateErrors);

    if (Object.keys(validateErrors).length === 0) { //no se envia el formulario hasta que todos los campos estén completos
      try {
        await dispatch(createPet(formData));
        alert('La mascota se ingresó correctamente');
        // Reset the form after successful submission
        setFormData({
          status: 'available',
          photo: '',
          name: '',
          species: '',
          age: '',
          size: '',
          breed: '',
          energyLevel: '',
          okWithPets: false,
          okWithKids: false,
          history: '',
          gender: '', // Reset gender field
        });
      } catch (err) {
        setError('Error al ingresar la mascota: ' + err.message);
      }
    };
  }

  return (
    <div className='section-full-screen-container-create'>
      <div className="full-screen-container-create">
        <div className="create-pet-container">
          <h1>Crea una nueva mascota</h1>
          <form className="create-pet-form" onSubmit={handleSubmit}>
            Estado<select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={error.status ? 'error' : ''}
            >
              <option value="available">Disponible</option>
              <option value="adopted">Adoptado</option>
              <option value="onHold">En espera</option>
              <option value="inactive">Inactivo</option>
            </select>
            {error.status && (
              <div className="error-tooltip">
                <p className="error-text">{error.status}</p>
                <div className="error-arrow"></div>
              </div>
            )}
            Url de foto<input
              type="text"
              name="photo"
              placeholder="URL de foto"
              value={formData.photo}
              onChange={handleChange}
              className={error.photo ? 'error' : ''}
            />
            {error.photo && (
              <div className="error-tooltip">
                <p className="error-text">{error.photo}</p>
                <div className="error-arrow"></div>
              </div>
            )}
            Nombre<input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              className={error.name ? 'error' : ''}
            />
            {error.name && (
              <div className="error-tooltip">
                <p className="error-text">{error.name}</p>
                <div className="error-arrow"></div>
              </div>
            )}
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              className={error.species ? 'error' : ''}
            >
              <option value="">Selecciona especie</option>
              <option value="cat">Gato</option>
              <option value="dog">Perro</option>
            </select>
            {error.species && (
              <div className="error-tooltip">
                <p className="error-text">{error.species}</p>
                <div className="error-arrow"></div>
              </div>
            )}
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={error.age ? 'error' : ''}
            >
              <option value="">Selecciona etapa de vida</option>
              <option value="puppy">Cachorro</option>
              <option value="young">Joven</option>
              <option value="adult">Adulto</option>
              <option value="elder">Anciano</option>
            </select>
            {error.age && (
              <div className="error-tooltip">
                <p className="error-text">{error.age}</p>
                <div className="error-arrow"></div>
              </div>
            )}
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className={error.size ? 'error' : ''}
            >
              <option value="">Selecciona tamaño</option>
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Largo</option>
            </select>
            {error.size && (
              <div className="error-tooltip">
                <p className="error-text">{error.size}</p>
                <div className="error-arrow"></div>
              </div>
            )}
            Raza<input
              type="text"
              name="breed"
              placeholder="Raza"
              value={formData.breed}
              onChange={handleChange}

            />
            <select
              name="energyLevel"
              value={formData.energyLevel}
              onChange={handleChange}

            >
              <option value="">Selecciona nivel de energía</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            {error.energyLevel && (
              <div className="error-tooltip">
                <p className="error-text">{error.energyLevel}</p>
                <div className="error-arrow"></div>
              </div>
            )}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}

            >
              <option value="">Selecciona género</option>
              <option value="female">Hembra</option>
              <option value="male">Macho</option>
            </select>
            {error.gender && (
              <div className="error-tooltip">
                <p className="error-text">{error.gender}</p>
                <div className="error-arrow"></div>
              </div>
            )}
            <div className="create-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="okWithPets"
                  checked={formData.okWithPets}
                  onChange={handleChange}
                />
                <h2 className='h2-create1'>Bueno con otras mascotas</h2>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="okWithKids"
                  checked={formData.okWithKids}
                  onChange={handleChange}
                />
                <h2 className='h2-create1'>Bueno con los niños</h2>
              </label>
            </div>
            {error.okWithPetsAndKids && (
              <div className="error-tooltip">
                <p className="error-text">{error.okWithPetsAndKids}</p>
                <div className="error-arrow"></div>
              </div>
            )}
            Historia<textarea
              name="history"
              placeholder="Historia (Opcional)"
              value={formData.history}
              onChange={handleChange}
            />
            {formData.photo && <img src={formData.photo} alt="Pet" className="pet-preview-image" />}
            <button type="submit" className="button">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePet;
