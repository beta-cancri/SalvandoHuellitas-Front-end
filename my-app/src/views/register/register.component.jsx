import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions';
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
    idCard: '',
    occupation: '',
    gender: '',
  });

  // State for handling errors
  const [error, setError] = useState('');

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
    setError('');

    // Validate form fields if necessary

    try {
      await dispatch(createUser(formData));
      alert('User created successfully');
      // Optionally, redirect to another page
    } catch (err) {
      setError('Failed to create user: ' + err.message);
    }
  };

  return (
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
          name="idCard"
          placeholder="ID Card (Optional)"
          value={formData.idCard}
          onChange={handleChange}
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation (Optional)"
          value={formData.occupation}
          onChange={handleChange}
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;
