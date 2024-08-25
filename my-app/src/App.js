import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/navbar.component';
import Home from './views/home/home.component';
import Detail from './views/detail/detail.component';
import About from './views/about/about.component';
import Landing from './views/landing/landing.component';
import Contact from './views/contact/contact.component';
import Login from './views/login/login.component'; // Import Login component
import './App.css';

const App = () => {
  const location = useLocation();
  
  // Hide Navbar on the landing page and login page
  const showNavbar = location.pathname !== '/' && location.pathname !== '/login';

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} /> {/* Add Login Route */}
      </Routes>
    </div>
  );
};

export default App;
