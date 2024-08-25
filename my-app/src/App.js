import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Asegúrate de importar correctamente
import Navbar from './components/navbar/navbar.component';
import Home from './views/home/home.component';
import Detail from './views/detail/detail.component';
import About from './views/about/about.component';
import Landing from './views/landing/landing.component';
import Contact from './views/contact/contact.component';
import './App.css';

const App = () => {
  const location = useLocation();
  
  // Verifica si la ruta actual es la página de inicio
  const showNavbar = location.pathname !== '/';

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;

