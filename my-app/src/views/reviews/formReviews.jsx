import { useState, useEffect } from 'react';
import './form.styles.css';
import { useNavigate } from 'react-router-dom';
import validate from '../reviews/validationForReviews';
import Notification from '../create/Notification';
import axios from "axios";




function ReviewForm({ userName, userId }) {
    let userStore = JSON.parse(localStorage.getItem('user')) || {};
    userName = userName || userStore.name || '';
    userId = userId || userStore.userID || '';
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState({});
    const [name, setName] = useState(userName);
    const [reviews, setReviews] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [backendError, setBackendError] = useState('');
    const navigate = useNavigate();

    // useEffect para validar en tiempo real solo después de haber intentado enviar el formulario
    useEffect(() => {
        if (isSubmitted) {
            const formData = { userName: name, reviewText, rating };
            setErrors(validate(formData));
        }
    }, [name, reviewText, rating, isSubmitted]);

    // Carga reseñas guardadas en localStorage al montar el componente
    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        if (storedReviews.length > 0) {
            setReviews(storedReviews);
        }
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;

        switch (id) {
            case 'userName':
                setName(value);
                if (value.length > 0 && /[\d]/.test(value)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        userName: 'El nombre no puede contener números.',
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        userName: '',
                    }));
                }
                break;
            case 'reviewText':
                setReviewText(value);
                break;
            case 'rating':
                setRating(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Marca que el formulario ha sido enviado

        const formData = { userId, userName: name, reviewText, rating };
        const validationErrors = validate(formData);


        // Validación del nombre en caso de números
        if (name.length > 0 && /[\d]/.test(name)) {
            validationErrors.userName = 'El nombre no puede contener números.';
        }


        setErrors(validationErrors);


        // Solo procesar si no hay errores de validación
        if (Object.keys(validationErrors).length === 0) {
            try {
                let token = localStorage.getItem("jwt");
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };
                const requestData = {
                    id_user: userId,
                    status: "Pendiente",
                    comment: reviewText,
                    rating: rating
                };
                await axios.post("/reviews", requestData, { headers }).then(res => {
                    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
                    const updatedReviews = [...storedReviews, formData];
                    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
                    setReviews(updatedReviews); // Actualizar las reseñas en el estado
                    setShowNotification(true);//('¡Gracias por tu reseña!');
                    setBackendError(''); // Limpia cualquier mensaje de error anterior
                }).catch(err => {
                    setBackendError(err.response.data.message); 
                    console.log(err);
                });
            } catch (error) {
                console.error("Error creating request:", error.message);
            }
        }
    }

    const handleDelete = (indexToDelete) => {
        const updatedReviews = reviews.filter((_, index) => index !== indexToDelete);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
    };
    const handleCloseNotification = () => {
        setShowNotification(false);
        setBackendError('');
      };
    return (
        <div className="full-screen-container-review">
            <div className="review-container">
                <h3>Deja tu reseña sobre el proceso de adopción</h3>
                <form className="review-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="userName">Nombre:</label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            readOnly

                        />
                        {(isSubmitted || name.length > 0) && errors.userName && (
                            <p className="error-message">{errors.userName}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="reviewText">Escribe tu comentario <span style={{ color: 'red' }}>*</span></label>
                        <textarea
                        id="reviewText"
                        value={reviewText}
                        className="textarea"
                        onChange={handleChange}
                         maxLength={85} 
                       />
                        {(isSubmitted || reviewText.length > 0) && errors.reviewText && (
                            <p className="error-message">{errors.reviewText}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="rating">Selecciona tu calificación <span style={{ color: 'red' }}>*</span></label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona una calificación</option>
                            <option value="1">1 Huellita</option>
                            <option value="2">2 Huellitas</option>
                            <option value="3">3 Huellitas</option>
                            <option value="4">4 Huellitas</option>
                            <option value="5">5 Huellitas</option>
                        </select>
                        {(isSubmitted || rating.length > 0) && errors.rating && (
                            <p className="error-message">{errors.rating}</p>
                        )}
                    </div>

                    <button className="button" type="submit">Enviar Reseña</button>
                    <button className="button" type="button" onClick={() => navigate('/home')}>Volver al Inicio</button>
                    {backendError && (
    <Notification message={backendError} onClose={() => setBackendError('')} />
)}
                </form>

            </div>
            {showNotification && (
        <Notification message="¡Gracias por tu reseña!" onClose={handleCloseNotification} />
      )}
        </div>
    );
}

export default ReviewForm;