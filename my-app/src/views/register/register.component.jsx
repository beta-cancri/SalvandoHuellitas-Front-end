import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions';
import axios from 'axios'; // Import axios for handling the upload
import './register.styles.css';

const Register = () => {
  const dispatch = useDispatch();

  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    age: '',
    phone: '',
    idCard: '', // This will store the Cloudinary URL
    occupation: '',
  });

  // State for handling errors
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false); // To manage uploading state

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your-upload-preset'); // Replace with your upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`,
        formData
      );
      setFormData({
        ...formData,
        idCard: response.data.secure_url,
      });
      setUploading(false);
    } catch (err) {
      setError('Failed to upload image');
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await dispatch(createUser(formData));
      alert('User created successfully');
      // Optionally, redirect to another page
    } catch (err) {
      setError('Failed to create user: ' + err.message);
    }
  };

  return (
    <div className="full-screen-container-register">
      <div className="register-container">
        <h1>Create an Account</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone (Optional)"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="occupation"
            placeholder="Occupation (Optional)"
            value={formData.occupation}
            onChange={handleChange}
          />

          {/* Image upload for ID Card */}
          <input type="file" name="idCard" onChange={handleImageUpload} />
          {uploading && <p>Uploading image...</p>}
          {formData.idCard && <img src={formData.idCard} alt="ID Card Preview" style={{ width: '100px' }} />}

          <button type="submit" className="register-button" disabled={uploading}>
            Register
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
