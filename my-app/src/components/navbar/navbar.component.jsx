import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPets } from '../../redux/actions';
import './navbar.styles.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(fetchPets(searchQuery)); // Dispatch the fetchPets action with the search query
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Salvando Huellitas</Link>
        <div className="navbar-links">
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/register" className="navbar-link">Register</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
        </div>
        <form onSubmit={handleSearch} className="navbar-search">
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search by breed or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="navbar-search-button">Search</button>
        </form>
        <Link to="/login" className="navbar-button">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
