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
        <h1>Create a New Pet</h1>
        <form className="create-pet-form" onSubmit={handleSubmit}>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
            <option value="onHold">On Hold</option>
            <option value="inactive">Inactive</option>
          </select>
          {error.status && <p className="error-message">{error.status}</p>}
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            required
          />
          {error.photo && <p className="error-message">{error.photo}</p>}
          <input
            type="text"
            name="name"
            placeholder="Name"
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
            <option value="">Select Species</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
          {error.species && <p className="error-message">{error.species}</p>}
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          >
            <option value="">Select Age</option>
            <option value="puppy">Puppy</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="elder">Elder</option>
          </select>
          {error.age && <p className="error-message">{error.age}</p>}
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">Select Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          {error.size && <p className="error-message">{error.size}</p>}
          <input
            type="text"
            name="breed"
            placeholder="Breed"
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
            <option value="">Select Energy Level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {error.energyLevel && <p className="error-message">{error.energyLevel}</p>}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
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
              <h2 className='h2-create1'>OK with other pets</h2>
            </label>
            <label>
              <input
                type="checkbox"
                name="okWithKids"
                checked={formData.okWithKids}
                onChange={handleChange}
              />
              <h2 className='h2-create1'>OK with kids</h2>
            </label>
          </div>
          {error.okWithPets && <p className="error-message">{error.okWithPets}</p>}
          {error.okWithKids && <p className="error-message">{error.okWithKids}</p>}
          <textarea
            name="history"
            placeholder="History (Optional)"
            value={formData.history}
            onChange={handleChange}
          />
          {formData.photo && <img src={formData.photo} alt="Pet" className="pet-preview-image" />}
          <button type="submit" className="create-pet-button">
            Create Pet
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreatePet;
