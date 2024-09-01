import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/navbar.component';
import Home from './views/home/home.component';
import Detail from './views/detail/detail.component';
import About from './views/about/about.component';
import Landing from './views/landing/landing.component';
import Contact from './views/contact/contact.component';
import Login from './views/login/login.component';
import Register from './views/register/register.component';
import CreatePet from './views/create/create.component'; 
<<<<<<< HEAD
import GoogleCallback from './components/google/GoogleCallback';
import './App.css';
=======

import GoogleCallback from './components/google/GoogleCallback';
>>>>>>> e513803288c6f6de5c5e6008e98b11c8952b6b90
import Adopt from './views/adopt/adopt.component';

import AdminDashboard from './views/admin/dashboard/dashboard.component'; // Import the AdminDashboard component
import './App.css';


const App = () => {
  const location = useLocation();
  
  // Hide Navbar on the landing page and login page
  const showNavbar = location.pathname !== '/' && location.pathname !== '/login';

  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {showNavbar && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home setUser={setUser}/>} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/create" element={<CreatePet />} />
        <Route path="/adopt" element={<Adopt />} />  
        <Route path="/auth/google/callback" element={<GoogleCallback />} /> {/* Google Callback Route */}

        <Route path="/admin/dashboard" element={<AdminDashboard />} /> 

      </Routes>
    </div>
  );
};

export default App;