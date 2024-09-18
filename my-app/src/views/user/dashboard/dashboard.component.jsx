import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../profile/profile.component';
import FetchRequests from '../requests/requests.component';
import DonationInput from '../../../components/donation/DonationInput'; // Import DonationInput
import './dashboard.styles.css';

const UserDashboard = () => {
  const [showDonationInput, setShowDonationInput] = useState(false); // Manage donation input visibility
  const navigate = useNavigate();
  const donationButtonRef = useRef(null);
  const donationInputRef = useRef(null);

  // Validate if the user is a regular user (not an admin)
  useEffect(() => {
    let storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location = '/'; // Redirect to home if user is not found
      return;
    }
    storedUser = JSON.parse(storedUser);
    if (storedUser.isAdmin) {
      window.location = '/'; // Redirect to home if the user is an admin
    }
  }, []);

  // Toggle donation input visibility
  const handleDonateClick = () => {
    setShowDonationInput(!showDonationInput); // Toggle donation input visibility
  };

  const handleDonationInputClose = () => {
    setShowDonationInput(false); // Close donation input when needed
  };

  // Close donation input if clicked outside
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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [donationInputRef, donationButtonRef]);

  return (
    <div className="user-dashboard-container">
      <div className="user-sidebar">
        <h2>Usuario</h2>
        <button
          className="user-sidebar-button"
          onClick={handleDonateClick} // Call the donate toggle handler
          ref={donationButtonRef} // Reference the donation button
        >
          Donar
        </button>
        <button
          className="user-sidebar-button"
          onClick={() => navigate('/home')}
        >
          Adoptar
        </button>
      </div>

      <div className="user-dashboard-grid">
        <div className="user-profile-section">
          <UserProfile />
        </div>
        <div className="user-requests-section">
          <FetchRequests />
        </div>
      </div>

      {showDonationInput && (
        <div className="donation-input-container animate-fade" ref={donationInputRef}>
          <DonationInput onClose={handleDonationInputClose} />
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
