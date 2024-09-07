import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchPets } from '../../redux/actions';
import './navbar.styles.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [isMenuActive, setIsMenuActive] = useState(false); // Estado para el menú
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      // Aquí puedes despachar una acción para obtener todos los resultados
      dispatch(fetchPets({ search: '' }));
    } else {
      // Despachar la acción de búsqueda solo si searchQuery no está vacío
      dispatch(fetchPets({ search: searchQuery }));
    }
  }, [searchQuery, dispatch]);

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
    window.location.href = '/login';  // Redirigir al login después de cerrar sesión
  };

  const showSearch = location.pathname === '/home';

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleMenuItemClick = () => {
    setIsMenuActive(false); // Cerrar el menú cuando se hace clic en un enlace
  };

  return (
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
            {/* Aquí puedes agregar un botón de búsqueda si lo deseas, pero no es necesario para la búsqueda en tiempo real */}
          </div>
        )}
        <div className={`navbar-options ${isMenuActive ? 'active' : ''}`}>
          <div className="navbar-links">
            <div>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={handleMenuItemClick}>
                Nosotros
              </Link>
            </div>

            {/* SE COMENTARON EL CREATE Y REGISTER */}
            {/*<Link to="/create" className={location.pathname === '/create' ? 'active' : ''} onClick={handleMenuItemClick}>
              Crear 
            </Link>*/}
            {/* <div>
            <Link to="/register" className={location.pathname === '/register' ? 'active' : ''} onClick={handleMenuItemClick}>
              Registrate
            </Link>
            </div> */}
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
  );
};

export default Navbar;