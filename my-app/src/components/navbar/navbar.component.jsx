import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchPets, fetchUserDetail } from '../../redux/actions';
import './navbar.styles.css';
import DonationInput from '../../components/donation/DonationInput';
import defaultProfilePic from '../../assets/perfil.png'; 

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [showDonationInput, setShowDonationInput] = useState(false);
  const [isUserMenuActive, setIsUserMenuActive] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const donationButtonRef = useRef(null);
  const donationInputRef = useRef(null);
  const userMenuRef = useRef(null);
  const profileButtonRef = useRef(null);
  const menuRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get userDetail data from Redux store
  const userDetail = useSelector((state) => state.userDetail);

  // Fetch user details on mount if a user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('jwt');

    if (storedUser && storedUser.userID && token) {
      dispatch(fetchUserDetail(storedUser.userID));
      setIsLoggedIn(true); // Set the logged-in state to true
    } else {
      setIsLoggedIn(false); // No token, so the user is not logged in
    }
  }, [dispatch]);

  // Fetch pets when on the /home page and searchQuery changes
  useEffect(() => {
    if (location.pathname === '/home') {
      dispatch(fetchPets({ search: searchQuery }, 1, true));
    }
  }, [searchQuery, dispatch, location.pathname]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogoClick = (event) => {
    localStorage.removeItem('filters');
    localStorage.removeItem('suggestedPets');
    if (location.pathname === '/home') {
      event.preventDefault();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    window.location.href = '/home';
  };

  const showSearch = location.pathname === '/home';

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    setIsUserMenuActive(false); // Close user menu when opening the main menu
    setShowDonationInput(false); // Close donation menu when opening the main menu
  };

  const toggleUserMenu = () => {
    setIsUserMenuActive(!isUserMenuActive); // Toggle the user menu
    setIsMenuActive(false); // Close the main menu when opening the user menu
    setShowDonationInput(false); // Close the donation input if it is open
  };

  const handleDonateClick = () => {
    setShowDonationInput(!showDonationInput); // Toggle the donation menu
    setIsMenuActive(false); // Close the main menu when opening the donation menu
    setIsUserMenuActive(false); // Close the user menu if it is open
  };

  const handleDonationInputClose = () => {
    setShowDonationInput(false);
  };

  // Close menus (donation and profile) when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        donationInputRef.current &&
        !donationInputRef.current.contains(event.target) &&
        donationButtonRef.current &&
        !donationButtonRef.current.contains(event.target)
      ) {
        setShowDonationInput(false);
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsUserMenuActive(false);
      }

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.classList.contains('menu-icon')
      ) {
        setIsMenuActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [donationInputRef, donationButtonRef, userMenuRef, profileButtonRef, menuRef]);

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
          <div className={`navbar-options ${isMenuActive ? 'active' : ''}`} ref={menuRef}>
            {/* Hide "Donar" button if user is on /user/dashboard */}
            {location.pathname !== '/user/dashboard' && (
              <button
                onClick={handleDonateClick}
                className="donate-button"
                ref={donationButtonRef}
              >
                Donar
              </button>
            )}
            <div className="navbar-links">
              <div>
                <Link
                  to="/about"
                  className={location.pathname === '/about' ? 'active' : ''}
                  onClick={toggleMenu}
                >
                  Nosotros
                </Link>
              </div>
              <div>
                <Link
                  to="/contact"
                  className={location.pathname === '/contact' ? 'active' : ''}
                  onClick={toggleMenu}
                >
                  Contacto
                </Link>
              </div>
  
              {/* Responsive view additional buttons */}
              <div className="navbar-responsive-buttons">
                {isLoggedIn ? (
                  <>
                    {location.pathname !== '/user/dashboard' && (
                      <button
                        className="navbar-button"
                        onClick={() =>
                          window.location.href = userDetail.isAdmin
                            ? '/admin/dashboard'
                            : '/user/dashboard'
                        }
                      >
                        {userDetail.isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
                      </button>
                    )}
                    <button className="logout-button" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <button
                    className="navbar-button"
                    onClick={() => window.location.href = '/login'}
                  >
                    Ingresar
                  </button>
                )}
              </div>
            </div>
            {isLoggedIn ? (
              <div className="user-menu" ref={userMenuRef}>
                <button
                  className="user-button"
                  onClick={toggleUserMenu}
                  ref={profileButtonRef}
                >
                  {userDetail.idCard ? (
                    <img
                      src={userDetail.idCard}
                      alt="User Profile"
                      className="user-profile-image"
                    />
                  ) : (
                    <img
                    src={defaultProfilePic}
                    alt="Default Profile"
                    className="user-profile-image"
                  />
                  )}
                </button>
                {isUserMenuActive && (
                  <div className="user-dropdown animate-slide">
                    {location.pathname !== '/user/dashboard' && (
                      <button
                        onClick={() =>
                          window.location.href = userDetail.isAdmin
                            ? '/admin/dashboard'
                            : '/user/dashboard'
                        }
                      >
                        {userDetail.isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
                      </button>
                    )}
                    <button onClick={handleLogout}>Cerrar sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="navbar-button-no-responsive" /* Apply a different class */
                onClick={() => (window.location.href = '/login')}
              >
                Ingresar
              </button>
            )}
          </div>
          <span className="menu-icon" onClick={toggleMenu}>
            ☰
          </span>
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
