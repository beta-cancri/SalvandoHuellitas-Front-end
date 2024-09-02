import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../../redux/actions';
import Cards from '../../components/cards/cards.component';
import Select from 'react-select';
import './home.styles.css';
import { manejarRedireccion } from "../../auth/auth";
//import api from '../../api/axiosConfig'; 

const Home = () => {
 
  useEffect(() => {
    manejarRedireccion();
    }
  , []);

  const dispatch = useDispatch();
  const { pets, currentPage, totalPages } = useSelector((state) => state);
  
  // Estados 
  const [species, setSpecies] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [size, setSize] = useState('');

  //  filtros
  const speciesOptions = [
    { value: '', label: 'Todos' },
    { value: 'dog', label: 'Perro' },
    { value: 'cat', label: 'Gato' }
  ];

  const energyLevelOptions = [
    { value: '', label: 'Todos' },
    { value: 'low', label: 'Bajo' },
    { value: 'medium', label: 'Medio' },
    { value: 'high', label: 'Alto' }
  ];

  const sizeOptions = [
    { value: '', label: 'Todos' },
    { value: 'small', label: 'Chico' },
    { value: 'medium', label: 'Mediano' },
    { value: 'large', label: 'Grande' }
  ];

  // Estilos React Select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: '#fff',
      boxShadow: 'none',
      borderRadius: '4px'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '4px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a8a3a3' : state.isFocused ? '#f0cd8a' : 'rgba(0, 0, 0, 0.5)',
      color: state.isSelected ? '#000' : '#fff',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a8a3a3'
    })
  };

  // Aplica los filtros
  const handleFilterChange = useCallback(() => {
    const filters = {
      species: species || undefined,
      energyLevel: energyLevel || undefined,
      size: size || undefined,
    };
    
    dispatch(fetchPets(filters, currentPage));
  }, [dispatch, species, energyLevel, size, currentPage]);

  useEffect(() => {
    handleFilterChange(); 
  }, [handleFilterChange]);

  //  paginación
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

  // Reinicia filtros
  const handleResetFilters = () => {
    setSpecies('');
    setEnergyLevel('');
    setSize('');
    dispatch(fetchPets({}, 1)); 
  };

  return (
    <div className="home-container">
      <h1>Mascotas disponibles para adopción</h1>

      {/* Controles de filtro */}
      <div className="filter-controls">
        <label>
          Especie:
          <Select
            className="custom-select-container"
            classNamePrefix="custom-select"
            value={speciesOptions.find(option => option.value === species)}
            onChange={(option) => setSpecies(option ? option.value : '')}
            options={speciesOptions}
            styles={customStyles}
            isClearable
          />
        </label>

        <label>
          Nivel de Energía:
          <Select
            className="custom-select-container"
            classNamePrefix="custom-select"
            value={energyLevelOptions.find(option => option.value === energyLevel)}
            onChange={(option) => setEnergyLevel(option ? option.value : '')}
            options={energyLevelOptions}
            styles={customStyles}
            isClearable
          />
        </label>

        <label>
          Tamaño:
          <Select
            className="custom-select-container"
            classNamePrefix="custom-select"
            value={sizeOptions.find(option => option.value === size)}
            onChange={(option) => setSize(option ? option.value : '')}
            options={sizeOptions}
            styles={customStyles}
            isClearable
          />
        </label>

        {/*  reiniciar filtros */}
        <button onClick={handleResetFilters} className="reset-button">
          <i className="fas fa-trash"></i>
        </button>
      </div>

      {pets.length > 0 ? (
        <div>
          <Cards pets={pets} />
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages} </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Siguiente
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
