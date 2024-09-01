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

    const validation = validationForCreate({ ...formData, [e.target.name]: e.target.value });
    setError(validation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErrors = validationForCreate(formData);
    setError(validateErrors);

    try {
      await dispatch(createPet(formData));
      alert('Pet created successfully');
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
      setError('Failed to create pet: ' + err.message);
    }
  };

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
            required
          >
            <option value="available">Disponible</option>
            <option value="adopted">Adoptado</option>
            <option value="onHold">En espera</option>
            <option value="inactive">Inactivo</option>
          </select>
          {error.status && <p className="error-message">{error.status}</p>}
          Url de foto<input
            type="text"
            name="photo"
            placeholder="URL de foto"
            value={formData.photo}
            onChange={handleChange}
            required
          />
          {error.photo && <p className="error-message">{error.photo}</p>}
          Nombre<input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {error.name && <p className="error-message">{error.name}</p>}
          <select
            name="species"
            value={formData.species}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona especie</option>
            <option value="cat">Gato</option>
            <option value="dog">Perro</option>
          </select>
          {error.species && <p className="error-message">{error.species}</p>}
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona etapa de vida</option>
            <option value="puppy">Cachorro</option>
            <option value="young">Joven</option>
            <option value="adult">Adulto</option>
            <option value="elder">Anciano</option>
          </select>
          {error.age && <p className="error-message">{error.age}</p>}
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tamaño</option>
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Largo</option>
          </select>
          {error.size && <p className="error-message">{error.size}</p>}
          Raza<input
            type="text"
            name="breed"
            placeholder="Raza"
            value={formData.breed}
            onChange={handleChange}
            required
          />
          <select
            name="energyLevel"
            value={formData.energyLevel}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona nivel de energía</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          {error.energyLevel && <p className="error-message">{error.energyLevel}</p>}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona género</option>
            <option value="female">Hembra</option>
            <option value="male">Macho</option>
          </select>
          {error.gender && <p className="error-message">{error.gender}</p>}
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
          {error.okWithPets && <p className="error-message">{error.okWithPets}</p>}
          {error.okWithKids && <p className="error-message">{error.okWithKids}</p>}
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
