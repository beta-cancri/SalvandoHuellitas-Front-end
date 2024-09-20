import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../../redux/actions';
import Cards from '../../components/cards/cards.component';
import Select from 'react-select';
import './home.styles.css';
import { manejarRedireccion } from "../../auth/auth";
import { useNavigate, useLocation } from 'react-router-dom';
import LittleFootprintRating from '../reviews/littleFootprintRating';

import axios from "axios";
import DonationComplete from "../../components/donation/DonationComplete";

const Home = () => {
  const dispatch = useDispatch();
  const { pets, petsCurrentPage, petsTotalPages } = useSelector((state) => state);
  const navigate = useNavigate();
  const location = useLocation(); 
  const [suggestedPets, setSuggestedPets] = useState(null);
  const [species, setSpecies] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [size, setSize] = useState('');
  const [okWithPets, setOkWithPets] = useState('');
  const [okWithKids, setOkWithKids] = useState('');
  const [formData, setFormData] = useState({ name: '', photoUrl: '', text: '', rating: 0 });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
 

  // Cargar reseñas desde el servidor
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/reviews');
        setReviews(reviews.concat(response.data));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);




  // Cargar las mascotas sugeridas desde el state de la redirección
  useEffect(() => {
    if (location.state && location.state.suggestedPets) {
      setSuggestedPets(location.state.suggestedPets);
    } else {
      setSuggestedPets([]);
    }
  }, [location.state]);

   
  

  // Cargar filtros desde localStorage
  useEffect(() => {
    manejarRedireccion();

    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
      setSpecies(savedFilters.species || '');
      setEnergyLevel(savedFilters.energyLevel || '');
      setSize(savedFilters.size || '');
      setOkWithKids(savedFilters.okWithKids || '');
      setOkWithPets(savedFilters.okWithPets || '');
      dispatch(fetchPets(savedFilters, savedFilters.petsCurrentPage  || 1, true));

    } else {
      dispatch(fetchPets({}, 1, true));
    }
  }, [dispatch]);

  

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

  const okWithPetsOptions = [
    { value: '', label: '' },
    { value: 'false', label: 'No' },
    { value: 'true', label: 'Si' },
    
  ];

  const okWithKidsOptions = [
    { value: '', label: '' },
    { value: 'false', label: 'No' },
    { value: 'true', label: 'Si' },
    
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
      okWithKids,
      okWithPets,
      [key]: value,
    };

    if (key === 'species') setSpecies(value);
    if (key === 'energyLevel') setEnergyLevel(value);
    if (key === 'size') setSize(value);
    if (key === 'okWithPets') setOkWithPets(value);
    if (key === 'okWithKids') setOkWithKids(value);

    // Guardar los filtros en localStorage
    localStorage.setItem('filters', JSON.stringify({
      ...filters,
      petsCurrentPage: petsCurrentPage || 1 // Guardar la página actual
    }));

    // Despachar la acción para obtener los datos filtrados
    dispatch(fetchPets(filters, 1, true)); // Reset to the first page and ensure isHome is true
  };

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    dispatch(fetchPets({ species, energyLevel, size, okWithPets, okWithKids }, pageNumber, true)); // Pass isHome as true
  };

  // Reiniciar filtros y limpiar localStorage
  const handleResetFilters = () => {
    setSpecies('');
    setEnergyLevel('');
    setSize('');
    setOkWithPets('');
    setOkWithKids('');
    setSuggestedPets(null);
    // Eliminar filtros de localStorage
    localStorage.removeItem('filters');

    // Cargar solo las mascotas disponibles
    dispatch(fetchPets({}, 1, true)); 
  };

  return (
    <div className="home-container">
      <DonationComplete />
      <h1>Mascotas disponibles para adopción</h1>

      { 
      <div className="filter-controls">
        <label>
          Especie:
          <Select
            className="custom-select-container"
            classNamePrefix="custom-select"
            value={speciesOptions.find(option => option.value === species)}
            onChange={(option) => handleFilterChange('species', option ? option.value : '---')}
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
            onChange={(option) => handleFilterChange('energyLevel', option ? option.value : '---')}
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
            onChange={(option) => handleFilterChange('size', option ? option.value : '---')}
            options={sizeOptions}
            styles={customStyles}
            isClearable
          />
        </label>

        <label>
          Convive con animales:
          <Select
            className="custom-select-container"
            classNamePrefix="custom-select"
            value={okWithPetsOptions.find(option => option.value === okWithPets)}
            onChange={(option) => handleFilterChange('okWithPets', option ? option.value : '---')}
            options={okWithPetsOptions}
            styles={customStyles}
            isClearable
          />
        </label>

        <label>
          Convive con niños:
          <Select
            className="custom-select-container"
            classNamePrefix="custom-select"
            value={okWithKidsOptions.find(option => option.value === okWithKids)}
            onChange={(option) => handleFilterChange('okWithKids', option ? option.value : '---')}
            options={okWithKidsOptions}
            styles={customStyles}
            isClearable
          />
        </label>


        <button onClick={handleResetFilters} className="reset-button">
          Limpiar Filtros
        </button>
      </div>
      }

      {/* Mostrar mensaje si no hay coincidencias */}
      { suggestedPets !== null && suggestedPets.length === 0 ? (
        <p>No hay mascotas sugeridas, pero puedes buscar entre las que tenemos disponibles:</p>
      ): null}

      {/* Mostrar mascotas sugeridas si existen */}
      {suggestedPets?.length > 0 ? (
        <>
          <h2>Mascotas sugeridas</h2>
          <Cards pets={suggestedPets} /> {/* Mostrar mascotas sugeridas */}
        </>
      ) : (

      pets.length > 0 && (
        
        <div className="pets-container">
          <Cards pets={pets} />
          <div className="pagination">
            <button onClick={() => handlePageChange(petsCurrentPage - 1)} disabled={petsCurrentPage === 1}>
              Anterior
            </button>
            <span>Página {petsCurrentPage} de {petsTotalPages}</span>
            <button onClick={() => handlePageChange(petsCurrentPage + 1)} disabled={petsCurrentPage === petsTotalPages}>
              Siguiente
            </button>
          </div>
        </div>
      ) 
      
      )}
      <div className="reviews">
        <h2> MIRA LO QUE DICEN SOBRE NOSOTROS </h2>
        {loading ? (
          <p>Cargando reseñas...</p>
        ) : reviews.length > 0 ? (
          <div className="review-cards">
  {reviews.map((review) => (
    <div key={review.id_user} className="review-card">
      <div className="review-item">
        <div className="review-name">
          <strong>Nombre</strong>
          <div className='name-text'>
            <span>{review.user_name}</span>
          </div>
        </div>
        <div className="review-text">
          <strong>Reseña</strong>
          <div className="text-content">
            <span>{review.comment}</span>
          </div>
        </div>
      </div>
        <div className="review-rating">
          <strong>Calificación</strong>
          <span className="rating-display">
            <LittleFootprintRating rating={review.rating} setRating={() => { }} />
          </span>
        </div>
    </div>
  ))}
</div>
        ) : null}

        <div className="back-button-container">
       
         <button className="button" onClick={() => navigate('/formReviews')}>Ingresa tu calificación</button>
        </div>
      </div>
    </div>
  );
};

export default Home;