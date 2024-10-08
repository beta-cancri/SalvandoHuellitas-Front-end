
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
import GoogleCallback from './components/google/GoogleCallback';
import Adopt from './views/adopt/adopt.component';
import ReviewCard from "./views/reviews/reviewCard";
import ReviewForm from "./views/reviews/formReviews";
import ReviewsPage from "./views/reviews/reviewsPage";
import AdminDashboard from './views/admin/dashboard/dashboard.component'; // Import the AdminDashboard component
import UserDashboard from './views/user/dashboard/dashboard.component'; // Import the UserDashboard component
import WhatsAppButton from './components/whatsapp/whatsAppButton.component';
import ScrollToTopButton from './components/scroll/ScrollToTopButton.component';
import SuggestionsForm from './views/suggestionsForm/suggestionsForm';
import RequestDetail from './components/requestsbyid/requestsbyid.component';
import './App.css';


const App = () => {
  const location = useLocation();

  // Hide Navbar on the landing page and login page
  const showNavbar =
    location.pathname !== "/" && location.pathname !== "/login";

  const [user, setUser] = useState(null);

  return (
    <div className="App" >
      {showNavbar && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home setUser={setUser} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePet />} />
        <Route path="/formReviews" element={<ReviewForm />} />
        <Route path="/reviewsPage" element={<ReviewsPage />} />
        <Route path="/reviewCard" element={<ReviewCard />} />
        <Route path="/adopt" element={<Adopt />} />  
        <Route path="/adopt/:id" element={<Adopt />} />  
        <Route path="/auth/google/callback" element={<GoogleCallback />} /> {/* Google Callback Route */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
        <Route path="/user/dashboard" element={<UserDashboard />} /> {/* User Dashboard Route */}
        <Route path="/suggestPets" element={<SuggestionsForm />} />
        <Route path="/requests/:id" element={<RequestDetail />} />
      </Routes>
      <WhatsAppButton/>
      <ScrollToTopButton/>
    </div>
  );
};

export default App;
