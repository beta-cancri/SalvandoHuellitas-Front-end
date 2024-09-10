import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MisDatos from './MisDatos';
import Notificaciones from './Notificaciones';
import './Dashboard.css';  // CSS para estilos personalizados

const userBoard = () => {
  return (
    <Router>
      <div className="userBoard">
        {/* Sidebar */}
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/mis-datos">Mis Datos</Link>
            </li>
           {/* <li>
              <Link to="/notificaciones">Notificaciones</Link>
            </li> */}
          </ul>
        </nav>

        {/* Contenido Principal */}
        <div className="content">
          <Routes>
            <Route path="/mis-datos" element={<MisDatos />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default userBoard;