import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../../redux/actions';
import Cards from '../../components/cards/cards.component';
import Select from 'react-select';
import { useLocation } from 'react-router-dom'; // Importar useLocation para acceder a state de navigate
import './home.styles.css';
import { manejarRedireccion } from "../../auth/auth";
import { useNavigate } from 'react-router-dom';
import LittleFootprintRating from '../reviews/littleFootprintRating';



const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Para obtener las mascotas sugeridas desde el state
  const { pets, petsCurrentPage, petsTotalPages } = useSelector((state) => state);


  // Estado para manejar mascotas sugeridas (si vienen en la redirección)
  const [suggestedPets, setSuggestedPets] = useState(location.state?.suggestedPets || []);


  const [species, setSpecies] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [size, setSize] = useState('');
  const [formData, setFormData] = useState({ name: '', photoUrl: '', text: '', rating: 0 });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

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

  // Cargar filtros desde localStorage
  useEffect(() => {
    manejarRedireccion();

    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
      setSpecies(savedFilters.species || '');
      setEnergyLevel(savedFilters.energyLevel || '');
      setSize(savedFilters.size || '');

      // Aplicar los filtros guardados al montar el componente solo si no hay mascotas sugeridas
      if (!suggestedPets.length) {
        dispatch(fetchPets(savedFilters, savedFilters.petsCurrentPage || 1, true)); // Ensure isHome is true here
      }
    } else if (!suggestedPets.length) {
      // Si no hay filtros guardados ni mascotas sugeridas, cargar solo las mascotas disponibles
      dispatch(fetchPets({}, 1, true)); // Ensure isHome is true here

    }
  }, [dispatch, suggestedPets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar datos del formulario
    if (!formData.name || !formData.photoUrl || !formData.text || formData.rating === 0) {
      setError({ general: 'Todos los campos son requeridos.' });
      return;
    }

    // Agregar nueva reseña al estado
    const newReview = {
      id_user: reviews.length + 1, // Generar ID
      ...formData,
      date: new Date(),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    // Guardar reseñas en localStorage
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));

    setFormData({ name: '', photoUrl: '', text: '', rating: 0 });
    setError({});
    alert('Testimonio agregado exitosamente');
  };

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
      petsCurrentPage: petsCurrentPage || 1 // Guardar la página actual
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

      {/* Filtros */}
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

        <button onClick={handleResetFilters} className="reset-button">
          Limpiar Filtros
        </button>
      </div>

      {pets.length > 0 ? (
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
      ) : (
        <p>No hay mascotas disponibles</p>
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