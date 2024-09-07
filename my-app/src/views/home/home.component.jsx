import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../../redux/actions';
import Cards from '../../components/cards/cards.component';
import Select from 'react-select';
import './home.styles.css';
import { manejarRedireccion } from "../../auth/auth";


const Home = () => {
  const dispatch = useDispatch();
  const { pets, currentPage, totalPages } = useSelector((state) => state);

  // Estados para los filtros
  const [species, setSpecies] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [size, setSize] = useState('');

  // Cargar filtros desde el localStorage al montar el componente
  useEffect(() => {
    manejarRedireccion();

    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
      setSpecies(savedFilters.species || '');
      setEnergyLevel(savedFilters.energyLevel || '');
      setSize(savedFilters.size || '');
      // Aplicar los filtros guardados al montar el componente
      dispatch(fetchPets(savedFilters, savedFilters.currentPage || 1, true)); // Ensure isHome is true here
    } else {
      // Si no hay filtros guardados, cargar solo las mascotas disponibles
      dispatch(fetchPets({}, 1, true)); // Ensure isHome is true here
    }
  }, [dispatch]);

  // Opciones de filtros
  const speciesOptions = [
    { value: '', label: '' },
    { value: 'dog', label: 'Perro' },
    { value: 'cat', label: 'Gato' }
  ];

  const energyLevelOptions = [
    { value: '', label: '' },
    { value: 'low', label: 'Bajo' },
    { value: 'medium', label: 'Medio' },
    { value: 'high', label: 'Alto' }
  ];

  const sizeOptions = [
    { value: '', label: '' },
    { value: 'small', label: 'Chico' },
    { value: 'medium', label: 'Mediano' },
    { value: 'large', label: 'Grande' }
  ];

  // Estilos personalizados para React Select
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

  // Maneja los cambios en los filtros y guarda en el localStorage
  const handleFilterChange = (key, value) => {
    const filters = {
      species,
      energyLevel,
      size,
      [key]: value,
    };

    if (key === 'species') setSpecies(value);
    if (key === 'energyLevel') setEnergyLevel(value);
    if (key === 'size') setSize(value);

    // Guardar los filtros en localStorage
    localStorage.setItem('filters', JSON.stringify({
      ...filters,
      currentPage: currentPage || 1 // Guardar la página actual
    }));

    // Despachar la acción para obtener los datos filtrados
    dispatch(fetchPets(filters, 1, true)); // Reset to the first page and ensure isHome is true
  };

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    dispatch(fetchPets({ species, energyLevel, size }, pageNumber, true)); // Pass isHome as true
  };

  // Reiniciar filtros y limpiar localStorage
  const handleResetFilters = () => {
    setSpecies('');
    setEnergyLevel('');
    setSize('');

    // Eliminar filtros de localStorage
    localStorage.removeItem('filters');

    // Cargar solo las mascotas disponibles
    dispatch(fetchPets({}, 1, true)); // Ensure only available pets are fetched on reset
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
            onChange={(option) => handleFilterChange('species', option ? option.value : '')}
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
            onChange={(option) => handleFilterChange('energyLevel', option ? option.value : '')}
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
            onChange={(option) => handleFilterChange('size', option ? option.value : '')}
            options={sizeOptions}
            styles={customStyles}
            isClearable
          />
        </label>

        {/* Botón para reiniciar filtros */}
        <button onClick={handleResetFilters} className="reset-button">
          Limpiar Filtros
        </button>
      </div>

      {pets.length > 0 ? (
        <div className="pets-container">
          <Cards pets={pets} />
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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
