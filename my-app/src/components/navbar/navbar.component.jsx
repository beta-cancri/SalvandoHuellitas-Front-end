import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchPets } from '../../redux/actions';
import './navbar.styles.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(fetchPets({ search: searchQuery }));
    setSearchQuery(''); // Clear the search query after searching
  };

  const handleLogoClick = (event) => {
    if (location.pathname === '/home') {
      event.preventDefault();
      window.location.reload(); // Refresh the page if already on home
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo" onClick={handleLogoClick}>
          <img src="https://i.imgur.com/o4WPNxa.png" alt="Salvando Huellitas Logo" className="navbar-logo-image" />
        </Link>
        <form onSubmit={handleSearch} className="navbar-search">
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search by breed or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="navbar-search-button">
            <img src="https://i.imgur.com/YMQuWYz.png" alt="Search Icon" className="navbar-icon" />
          </button>
        </form>
        <div className="navbar-links">
          <Link to="/about">
            <img src="https://i.imgur.com/RdCaKES.png" alt="About Icon" className="navbar-icon" />
          </Link>
          <Link to="/create">
            <img src="https://i.imgur.com/MJ7CHPU.png" alt="Create Icon" className="navbar-icon" />
          </Link>
          <Link to="/register">
            <img src="https://i.imgur.com/yK0Jf5X.png" alt="Register Icon" className="navbar-icon" />
          </Link>
          <Link to="/contact">
            <img src="https://i.imgur.com/v27WHRN.png" alt="Contact Icon" className="navbar-icon" />
          </Link>
        </div>
        <Link to="/login" className="navbar-button">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
