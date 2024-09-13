import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchPets } from '../../redux/actions';
import './navbar.styles.css';
import DonationInput from '../../components/donation/DonationInput'; 

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [isMenuActive, setIsMenuActive] = useState(false); 
  const [showDonationInput, setShowDonationInput] = useState(false); 
  const dispatch = useDispatch();
  const location = useLocation();
  const donationButtonRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/home') { // Ensure we are only on /home
      if (searchQuery.trim() === '') {
        dispatch(fetchPets({ search: '' }));
      } else {
        dispatch(fetchPets({ search: searchQuery }));
      }
    }
  }, [searchQuery, dispatch, location.pathname]); // Ensure it only runs when necessary
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogoClick = (event) => {
    if (location.pathname === '/home') {
      event.preventDefault();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const showSearch = location.pathname === '/home';

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleMenuItemClick = () => {
    setIsMenuActive(false);
  };

  const handleDonateClick = () => {
    setShowDonationInput(!showDonationInput); // Alternar la visibilidad del input
  };

  const handleDonationInputClose = () => {
    setShowDonationInput(false);
  };

  return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <div>
              <Link to="/home" className="navbar-logo" onClick={handleLogoClick}>
                Salvando Huellitas
              </Link>
            </div>
            {showSearch && (
              <div className="navbar-search">
                <input
                  type="text"
                  className="navbar-search-input"
                  placeholder="Buscar raza ó nombre"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            )}
            <div className={`navbar-options ${isMenuActive ? 'active' : ''}`}>
              <button 
                onClick={() => { 
                  handleDonateClick(); 
                  handleMenuItemClick(); 
                }} 
                className="donate-button"
                ref={donationButtonRef}
              >
                Donar
              </button>
              <div className="navbar-links">
                <div>
                  <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={handleMenuItemClick}>
                    Nosotros
                  </Link>
                </div>
                <div>
                  <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={handleMenuItemClick}>
                    Contacto
                  </Link>
                </div>
              </div>
              {user ? (
                <div className="navbar-user-info">
                  <span>{user.name} {user.isAdmin ? (
                    <Link to="admin/dashboard">(Admin)</Link>
                  ) : null}</span>
                  <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
                </div>
              ) : (
                <Link to="/login" className={`navbar-button ${location.pathname === '/login' ? 'active' : ''}`} onClick={handleMenuItemClick}>Ingresar</Link>
              )}
            </div>
            <span className="menu-icon" onClick={toggleMenu}>☰</span>
          </div>
        </nav>
        
        {showDonationInput && (
          <div className="donation-input-container">
            <DonationInput onClose={handleDonationInputClose} />
          </div>
        )}
      </>
    );
  };
  
  export default Navbar;