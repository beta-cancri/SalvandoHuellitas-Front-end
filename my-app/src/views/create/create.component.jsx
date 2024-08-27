import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPet } from '../../redux/actions';
import './create.styles.css';  // Import the CSS file

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
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
    </div>
  );
};

export default CreatePet;
