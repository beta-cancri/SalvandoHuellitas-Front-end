import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../../redux/actions';
import Cards from '../../components/cards/cards.component';
import Select from 'react-select';
import './home.styles.css';
import { manejarRedireccion } from "../../auth/auth";
import { useNavigate, useLocation } from 'react-router-dom';
import LittleFootprintRating from '../reviews/littleFootprintRating';


const Home = () => {
  const dispatch = useDispatch();
  const { pets, currentPage, totalPages } = useSelector((state) => state);
  const navigate = useNavigate();
  const location = useLocation(); 
  const [suggestedPets, setSuggestedPets] = useState([]);
  const [species, setSpecies] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
 

  // Reseñas estáticas
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setTimeout(() => {
        setReviews([
          { name: 'Juan Pérez', text: 'Excelente experiencia, altamente recomendado.', rating: 5, date: new Date() },
          { name: 'Ana Gómez', text: 'Muy buen servicio y atención.', rating: 4, date: new Date() },
          { name: 'Carlos López', text: 'La atención podría mejorar.', rating: 3, date: new Date() },
          { name: 'Lucía Fernández', text: 'Un lugar maravilloso para adoptar mascotas.', rating: 5, date: new Date() }
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchReviews();
  }, []);




  // Cargar las mascotas sugeridas desde el state de la redirección
  useEffect(() => {
    if (location.state && location.state.suggestedPets) {
      setSuggestedPets(location.state.suggestedPets);
    }
  }, [location.state]);

   // Limpiar mascotas sugeridas y filtros si se navega al home desde el logo
   useEffect(() => {
    if (location.pathname === '/home') {
      localStorage.removeItem('filters');  // Limpiar los filtros guardados
      setSuggestedPets([]);                // Limpiar las mascotas sugeridas
      dispatch(fetchPets({}, 1));           // Volver a cargar todas las mascotas
    }
  }, [location.pathname, dispatch]);

  // Cargar filtros desde localStorage
  useEffect(() => {
    manejarRedireccion();

    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
      if (savedFilters) {
      setSpecies(savedFilters.species || '');
      setEnergyLevel(savedFilters.energyLevel || '');
      setSize(savedFilters.size || '');
      dispatch(fetchPets(savedFilters, savedFilters.currentPage || 1));
    } else {
      dispatch(fetchPets({}, 1));
    }
  }

  }, [dispatch,  suggestedPets]);

  const handleFilterChange = (key, value) => {
    const filters = { species, energyLevel, size, [key]: value };
    if (key === 'species') setSpecies(value);
    if (key === 'energyLevel') setEnergyLevel(value);
    if (key === 'size') setSize(value);

    localStorage.setItem('filters', JSON.stringify({ ...filters, currentPage: currentPage || 1 }));
    dispatch(fetchPets(filters, 1));
  };

  const handleResetFilters = () => {
    setSpecies('');
    setEnergyLevel('');
    setSize('');
    localStorage.removeItem('filters');
    dispatch(fetchPets({}, 1));
  };

  const handlePageChange = (pageNumber) => {
    dispatch(fetchPets({ species, energyLevel, size, status: "available" }, pageNumber));
  };

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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: '#fff',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a8a3a3' : state.isFocused ? '#f0cd8a' : 'rgba(0, 0, 0, 0.5)',
      color: state.isSelected ? '#000' : '#fff',
    }),
    singleValue: (provided) => ({ ...provided, color: '#fff' }),
    placeholder: (provided) => ({ ...provided, color: '#a8a3a3' })
  };

  return (
    <div className="home-container">
      <h1>Mascotas disponibles para adopción</h1>

      {/* Filtros */}
      {!suggestedPets.length && ( // Solo mostrar los filtros si no hay mascotas sugeridas
      <div className="filter-controls">
        <label>
          Especie:
          <Select
            className="custom-select-container"
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
            value={sizeOptions.find(option => option.value === size)}
            onChange={(option) => handleFilterChange('size', option ? option.value : '')}
            options={sizeOptions}
            styles={customStyles}
            isClearable
          />
        </label>

        <button onClick={handleResetFilters} className="reset-button">
          <i className="fas fa-trash"></i>
        </button>
      </div>
)}

{/* Mostrar mensaje si no hay coincidencias */}
{!suggestedPets.length && (
        <p>No hubo coincidencias, pero aquí están todas las mascotas disponibles para que puedas verlas:</p>
      )}

      {/* Mostrar mascotas sugeridas si existen, de lo contrario mostrar las mascotas filtradas */}
      {suggestedPets.length > 0 ? (
        <>
          <h2>Mascotas sugeridas</h2>
          <Cards pets={suggestedPets} /> {/* Mostrar mascotas sugeridas */}
        </>
      ) : (

      pets.length > 0 ? (
        <>
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
        </>
      ) : (
        <p>No hay mascotas disponibles</p>
      )
      )}
      <div className="reviews">
        <h2> MIRA LO QUE DICEN SOBRE NOSOTROS </h2>
        {loading ? (
          <p>Cargando reseñas...</p>
        ) : reviews.length > 0 ? (
          <div className="review-cards">
            {reviews.map((review) => (
              <div key={review.name} className="review-card">
                <div className="review-item">
                  <div className="review-name">
                    <strong>Nombre</strong>
                    <span className="name-text">{review.name}</span>
                  </div>

                  <div className="review-text">
                    <strong>Reseña</strong>
                    <span className="text-content">{review.text}</span>
                  </div>

                  <div className="review-rating">
                    <strong>Calificación</strong>
                    <span className="rating-display">
                      <LittleFootprintRating rating={review.rating} setRating={() => { }} />
                    </span>
                  </div>


                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="back-button-container">
          <button className="button-review" onClick={() => navigate('/home')}>Inicio</button>
          <button className="button-review" onClick={() => navigate('/formReviews')}>Ingresa tu calificación aquí 👇</button>
        </div>
      </div>
    </div>
  );
};

export default Home;