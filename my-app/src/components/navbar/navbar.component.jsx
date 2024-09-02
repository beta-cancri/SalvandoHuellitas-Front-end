import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchPets } from '../../redux/actions';
import './navbar.styles.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(fetchPets({ search: searchQuery }));
    setSearchQuery('');
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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo" onClick={handleLogoClick}>
          Salvando Huellitas
        </Link>
        {showSearch && (
          <form onSubmit={handleSearch} className="navbar-search">
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Buscar por raza ó nombre"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="navbar-search-button">
              Buscar
            </button>
          </form>
        )}
        <div className="navbar-links">
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            Sobre Nosotros
          </Link>
          {/*<Link to="/create" className={location.pathname === '/create' ? 'active' : ''}>
            Crear 
          </Link>*/}
          <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>
            Registrate
          </Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contacto
          </Link>
        </div>
        {user ? (
          <div className="navbar-user-info">
            <span>{user.name}</span>
            <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
          </div>
        ) : (
          <Link to="/login" className={`navbar-button ${location.pathname === '/login' ? 'active' : ''}`}>Ingresar</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
