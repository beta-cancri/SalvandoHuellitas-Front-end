import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './views/about/about.component.jsx'; 
import Contact from './views/contact/contact.component.jsx';
import Detail from './views/detail/detail.component.jsx';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detail/:id" element={<Detail />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
