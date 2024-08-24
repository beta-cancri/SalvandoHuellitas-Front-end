import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar.component';
import Home from './views/home/home.component';
import Detail from './views/detail/detail.component';
import About from './views/about/about.component';
import Landing from './views/landing/landing.component';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        {/* Additional routes can be added here */}
      </Routes>
    </div>
  );
};

export default App;
