import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../../redux/actions';
import Cards from '../../components/cards/cards.component';
import './home.styles.css';
import {manejarRedireccion} from "../../auth/auth"


const Home = ({setUser}) => {

  useEffect(manejarRedireccion(setUser), [])
  const dispatch = useDispatch();
  const { pets, currentPage, totalPages } = useSelector((state) => state);
  
  // States for filters
  const [species, setSpecies] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [size, setSize] = useState('');

  // Fetch pets based on filters
  const handleFilterChange = () => {
    const filters = {
      species: species || undefined,
      energyLevel: energyLevel || undefined,
      size: size || undefined,
    };
    dispatch(fetchPets(filters, currentPage));
  };

  useEffect(() => {
    handleFilterChange(); // Trigger filter change on component mount
  }, [dispatch, species, energyLevel, size, currentPage]);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchPets({ species, energyLevel, size }, currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchPets({ species, energyLevel, size }, currentPage - 1));
    }
  };

  // Reset filters to default values
  const handleResetFilters = () => {
    setSpecies('');
    setEnergyLevel('');
    setSize('');
    dispatch(fetchPets({}, 1)); // Fetch all pets with no filters
  };

  return (
    <div className="home-container">
      <h1>Available Pets for Adoption</h1>

      {/* Filter Controls */}
      <div className="filter-controls">
        <label>
          Species:
          <select value={species} onChange={(e) => setSpecies(e.target.value)}>
            <option value="">All</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </label>

        <label>
          Energy Level:
          <select value={energyLevel} onChange={(e) => setEnergyLevel(e.target.value)}>
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Size:
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">All</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

        {/* Reset Filters Button */}
        <button onClick={handleResetFilters} className="reset-button">
          Reset Filters
        </button>
      </div>

      {pets.length > 0 ? (
        <div>
          <Cards pets={pets} />
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No pets available</p>
      )}
    </div>
  );
};

export default Home;
