import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './about.styles.css';

const About = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3001/reviews/');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="about-container">
      <div className="intro-aboutus">
        <h1>About Us</h1>
        <h2>Pets transform our lives. We seek to change yours.</h2>
        <p>
          Misión Salvando Huellitas is a non-profit organization dedicated to rescuing, sheltering, and relocating abandoned, sick, and injured animals throughout the city.
          With your help, we hope to make a difference in the lives of these wonderful animals.
        </p>
      </div>
      
      <div className="faq">
        <h2>FAQ</h2>
        <ul>
          <li>
            <strong>What should I consider before adopting a dog?</strong>
            <span>Consider your lifestyle, the space in your home, and whether you have time to dedicate to the dog's care and training. Also, assess your financial situation, as owning a dog involves expenses for food, healthcare, and other necessities.</span>
          </li>
          <li>
            <strong>What type of dog is best suited for my family?</strong>
            <span>It depends on your environment and lifestyle. Smaller, low-energy breeds may be suitable for apartments, while larger, more active dogs may need a home with outdoor space and an owner who enjoys outdoor activities.</span>
          </li>
          <li>
            <strong>What should I expect during the adoption process?</strong>
            <span>The adoption process may include filling out forms, interviews, and in some cases, a home visit to ensure it is a suitable environment for the dog. You may also need to pay an adoption fee.</span>
          </li>
          <li>
            <strong>What does the adoption fee include?</strong>
            <span>The fee typically covers spaying/neutering, vaccinations, microchipping, and sometimes an initial veterinary checkup. This fee helps cover the shelter's operational costs.</span>
          </li>
          <li>
            <strong>How can I prepare my home for the arrival of a dog?</strong>
            <span>Make sure you have basic supplies: a bed, food and water bowls, a leash, a collar, and toys. Designate a safe and comfortable space for the dog to feel secure upon arrival.</span>
          </li>
          <li>
            <strong>What should I do during the first few days with my new dog?</strong>
            <span>Allow your dog to adjust to its new environment at its own pace. Establish a routine for feeding, walks, and rest. Be patient as it starts to acclimate and get to know its new home.</span>
          </li>
          <li>
            <strong>How do I introduce an adopted dog to other pets in the home?</strong>
            <span>Introduce them gradually in a controlled environment. Keep both animals on a leash initially and observe their behavior. Supervise all interactions until you are confident they get along well.</span>
          </li>
        </ul>
      </div>

      <div className="reviews">
        <h2>Reviews</h2>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <ul>
            {reviews.map(review => (
              <li key={review.id_user}>
                <span><strong>User ID:</strong> {review.id_user}</span>
                <span><strong>Status:</strong> {review.status}</span>
                <span><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
      
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/home')}>Back to Home</button>        
      </div>
    </div>
  );
};

export default About;
