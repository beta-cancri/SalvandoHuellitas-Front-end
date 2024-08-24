import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../../redux/actions';
import Cards from '../../components/cards/cards.component';
import './home.styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  return (
    <div className="home-container">
      <h1>Available Pets for Adoption</h1>
      {pets.length > 0 ? <Cards pets={pets} /> : <p>No pets available</p>}
    </div>
  );
};

export default Home;
