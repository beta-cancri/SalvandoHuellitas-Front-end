import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Link, useLocation } from 'react-router-dom';
import { fetchPets, fetchUserDetail } from '../../redux/actions';
import './navbar.styles.css';
import DonationInput from '../../components/donation/DonationInput';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [showDonationInput, setShowDonationInput] = useState(false);
  const [isUserMenuActive, setIsUserMenuActive] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const donationButtonRef = useRef(null);
  const donationInputRef = useRef(null); // Ref for the donation menu
  const userMenuRef = useRef(null);

  // Get userDetail data from Redux store
  const userDetail = useSelector((state) => state.userDetail);

  // Fetch user details on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); 
    const token = localStorage.getItem('jwt'); 

    if (storedUser && storedUser.userID && token) {
      dispatch(fetchUserDetail(storedUser.userID));
    } else {
      console.error("Token or userID not found in local storage.");
    }
  }, [dispatch]);

  // Fetch pets when on the /home page and searchQuery changes
  useEffect(() => {
    if (location.pathname === '/home') { 
      if (searchQuery.trim() === '') {
        dispatch(fetchPets({ search: '' }));
      } else {
        dispatch(fetchPets({ search: searchQuery }));
      }
    }
  }, [searchQuery, dispatch, location.pathname]);

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
    window.location.href = '/login';
  };

  const showSearch = location.pathname === '/home';

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const toggleUserMenu = () => {
    setIsUserMenuActive(!isUserMenuActive);
  };

  const handleDonateClick = () => {
    setShowDonationInput(!showDonationInput);
    setIsMenuActive(false);
  };

  const handleDonationInputClose = () => {
    setShowDonationInput(false);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuRef]);

  // Close donation menu when clicking outside or selecting an option
  useEffect(() => {
    const handleClickOutsideDonation = (event) => {
      if (
        donationInputRef.current && 
        !donationInputRef.current.contains(event.target) &&
        donationButtonRef.current && 
        !donationButtonRef.current.contains(event.target)
      ) {
        setShowDonationInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideDonation);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDonation);
    };
  }, [donationInputRef, donationButtonRef]);

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
              onClick={handleDonateClick}
              className="donate-button"
              ref={donationButtonRef}
            >
              Donar
            </button>
            <div className="navbar-links">
              <div>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={toggleMenu}>
                  Nosotros
                </Link>
              </div>
              <div>
                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={toggleMenu}>
                  Contacto
                </Link>
              </div>
            </div>
            {userDetail ? (
              <div className="user-menu" ref={userMenuRef}>
                <button className="user-button" onClick={toggleUserMenu}>
                  <img 
                    src={userDetail.idCard || 'default-profile-image.png'}
                    alt="User Profile" 
                    className="user-profile-image" 
                  />
                </button>
                {isUserMenuActive && (
                  <div className="user-dropdown animate-slide">
                    <button onClick={() => (window.location.href = userDetail.isAdmin ? '/admin/dashboard' : '/user/dashboard')}>
                      {userDetail.isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
                    </button>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`navbar-button ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Ingresar
              </Link>
            )}
          </div>
          <span className="menu-icon" onClick={toggleMenu}>☰</span>
        </div>
      </nav>

      {showDonationInput && (
        <div className="donation-input-container animate-fade" ref={donationInputRef}>
          <DonationInput onClose={handleDonationInputClose} />
        </div>
      )}
    </>
  );
};

export default Navbar;
