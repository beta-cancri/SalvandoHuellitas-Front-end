import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SlimSelect from 'slim-select';
import '../../../node_modules/slim-select/dist/slimselect.css';
import '../../assets/css/custom-slimselect.css';
import { fetchPets } from '../../redux/actions';
import Cards from '../../components/cards/cards.component';
import './home.styles.css';
import { manejarRedireccion } from "../../auth/auth";

const Home = ({ setUser }) => {
  useEffect(() => {
    manejarRedireccion(setUser);

    // Initialize SlimSelect for each select
    new SlimSelect({ select: '#species-select' });
    new SlimSelect({ select: '#energy-level-select' });
    new SlimSelect({ select: '#size-select' });
  }, [setUser]);

  const dispatch = useDispatch();
  const { pets, currentPage, totalPages } = useSelector((state) => state);
  
  const [species, setSpecies] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [size, setSize] = useState('');

  const handleFilterChange = () => {
    const filters = {
      species: species || undefined,
      energyLevel: energyLevel || undefined,
      size: size || undefined,
    };
    dispatch(fetchPets(filters, 1));
  };

  useEffect(() => {
    handleFilterChange();
  }, [dispatch, species, energyLevel, size]);

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

  const handleResetFilters = () => {
    setSpecies('');
    setEnergyLevel('');
    setSize('');
    dispatch(fetchPets({}, 1));
  };

  return (
    <div className="home-container">
      <h1>Mascotas disponibles para adopción</h1>

      <div className="filter-controls">
        <label>
          Especie:
          <select id="species-select" value={species} onChange={(e) => setSpecies(e.target.value)}>
            <option value="">Ambas</option>
            <option value="dog">Perro</option>
            <option value="cat">Gato</option>
          </select>
        </label>

        <label>
          Nivel de energía:
          <select id="energy-level-select" value={energyLevel} onChange={(e) => setEnergyLevel(e.target.value)}>
            <option value="">Todas</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </label>

        <label>
          Tamaño:
          <select id="size-select" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">Todos</option>
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Largo</option>
          </select>
        </label>

        <button onClick={handleResetFilters} className="reset-button">
          <i className="fas fa-trash"></i> {/* Ícono de tacho de basura */}
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
        <p>No hay mascotas disponibles</p>
      )}
    </div>
  );
};

export default Home;
