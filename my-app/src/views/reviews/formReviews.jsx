// import { useState } from 'react';
// import './form.styles.css';
// import { useNavigate } from 'react-router-dom';
// import validationReviews from '../reviews/validationForReviews';

// function ReviewForm({ onSubmitReview, userName, userId, adoptionApproved }) {
//     const [reviewText, setReviewText] = useState('');
//     const [rating, setRating] = useState(0);
//     const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Fecha actual
//     const navigate = useNavigate();


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (adoptionApproved) {
//             onSubmitReview({ userId, reviewText, rating, date });
//         } else {
//             alert("Solo puedes dejar una reseña si has completado una adopción.");
//         }
//     };

//     return (
//         <div className="full-screen-container-review">
//             <div className="review-container">
//                 <h3>Deja tu reseña sobre el proceso de adopción</h3>
//                 <form className="review-form" onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="userName">Nombre:</label>
//                         <input
//                             type="text"
//                             id="userName"
//                             value={userName}
//                         // disabled // Se supone que el nombre viene del usuario que inició sesión
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="reviewText">Escribe tu comentario</label>
//                         <textarea
//                             id="reviewText"
//                             value={reviewText}
//                             className="textarea"
//                             onChange={(e) => setReviewText(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="rating">Selecciona tu calificación</label>
//                         <select
//                             id="rating"
//                             value={rating}
//                             onChange={(e) => setRating(parseInt(e.target.value))}
//                             required
//                         >
//                             <option value="">Selecciona una calificación</option>
//                             <option value="1">1 Huellita</option>
//                             <option value="2">2 Huellitas</option>
//                             <option value="3">3 Huellitas</option>
//                             <option value="4">4 Huellitas</option>
//                             <option value="5">5 Huellitas</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label htmlFor="date">Fecha:</label>
//                         <input
//                             type="date"
//                             id="date"
//                             value={date}
//                             onChange={(e) => setDate(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button className="submit-button" type="submit">Enviar Reseña</button>
//                     <button className="submit-button" onClick={() => navigate('/home')}>Volver al Inicio </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ReviewForm;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useState } from 'react';
// import './form.styles.css';
// import { useNavigate } from 'react-router-dom';
// import validate from '../reviews/validationForReviews';

// function ReviewForm({ onSubmitReview, userName, userId, adoptionApproved }) {
//     const [reviewText, setReviewText] = useState('');
//     const [rating, setRating] = useState('');
//     const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     // Maneja el cambio en los campos del formulario
//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         let formData = { reviewText, rating, date, [id]: value };
//         if (id === 'reviewText') setReviewText(value);
//         if (id === 'rating') setRating(value);
//         if (id === 'date') setDate(value);

//         // Validar en tiempo real
//         setErrors(validate(formData));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = { reviewText, rating, date };

//         const validationErrors = validate(formData);
//         setErrors(validationErrors);

//         if (Object.keys(validationErrors).length === 0) {
//             if (adoptionApproved) {
//                 onSubmitReview({ userId, reviewText, rating, date });
//             } else {
//                 alert("Solo puedes dejar una reseña si has completado una adopción.");
//             }
//         }
//     };

//     return (
//         <div className="full-screen-container-review">
//             <div className="review-container">
//                 <h3>Deja tu reseña sobre el proceso de adopción</h3>
//                 <form className="review-form" onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="userName">Nombre:</label>
//                         <input
//                             type="text"
//                             id="userName"
//                             value={userName}
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="reviewText">Escribe tu comentario <span style={{ color: 'red' }}>*</span></label>
//                         <textarea
//                             id="reviewText"
//                             value={reviewText}
//                             className="textarea"
//                             onChange={handleChange}
//                         />
//                         {errors.reviewText && <p className="error-message">{errors.reviewText}</p>}
//                     </div>

//                     <div>
//                         <label htmlFor="rating">Selecciona tu calificación <span style={{ color: 'red' }}>*</span></label>
//                         <select
//                             id="rating"
//                             value={rating}
//                             onChange={handleChange}
//                         >
//                             <option value="">Selecciona una calificación</option>
//                             <option value="1">1 Huellita</option>
//                             <option value="2">2 Huellitas</option>
//                             <option value="3">3 Huellitas</option>
//                             <option value="4">4 Huellitas</option>
//                             <option value="5">5 Huellitas</option>
//                         </select>
//                         {errors.rating && <p className="error-message">{errors.rating}</p>}
//                     </div>

//                     <div>
//                         <label htmlFor="date">Fecha <span style={{ color: 'red' }}>*</span></label>
//                         <input
//                             type="date"
//                             id="date"
//                             value={date}
//                             onChange={handleChange}

//                         />
//                         {errors.date && <p className="error-message">{errors.date}</p>}
//                     </div>

//                     <button className="submit-button" type="submit">Enviar Reseña</button>
//                     <button className="submit-button" type="button" onClick={() => navigate('/home')}>Volver al Inicio</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ReviewForm;


// import { useState } from 'react';
// import './form.styles.css';
// import { useNavigate } from 'react-router-dom';
// import validate from '../reviews/validationForReviews';

// function ReviewForm({ onSubmitReview, userName, userId, adoptionApproved }) {
//     const [reviewText, setReviewText] = useState('');
//     const [rating, setRating] = useState('');
//     const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     // Maneja el cambio en los campos del formulario
//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         let formData = { reviewText, rating, date, [id]: value };
//         if (id === 'reviewText') setReviewText(value);
//         if (id === 'rating') setRating(value);
//         if (id === 'date') setDate(value);

//         // Validar en tiempo real
//         setErrors(validate({ reviewText, rating, date }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = { reviewText, rating, date };

//         const validationErrors = validate(formData);
//         setErrors(validationErrors);

//         if (Object.keys(validationErrors).length === 0) {
//             if (adoptionApproved) {
//                 onSubmitReview({ userId, reviewText, rating, date });
//             } else {
//                 alert("Solo puedes dejar una reseña si has completado una adopción.");
//             }
//         }
//     };

//     return (
//         <div className="full-screen-container-review">
//             <div className="review-container">
//                 <h3>Deja tu reseña sobre el proceso de adopción</h3>
//                 <form className="review-form" onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="userName">Nombre:</label>
//                         <input
//                             type="text"
//                             id="userName"
//                             value={userName}

//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="reviewText">Escribe tu comentario <span style={{ color: 'red' }}>*</span></label>
//                         <textarea
//                             id="reviewText"
//                             value={reviewText}
//                             className="textarea"
//                             onChange={handleChange}
//                         />
//                         {errors.reviewText && <p className="error-message">{errors.reviewText}</p>}
//                     </div>

//                     <div>
//                         <label htmlFor="rating">Selecciona tu calificación <span style={{ color: 'red' }}>*</span></label>
//                         <select
//                             id="rating"
//                             value={rating}
//                             onChange={handleChange}
//                         >
//                             <option value="">Selecciona una calificación</option>
//                             <option value="1">1 Huellita</option>
//                             <option value="2">2 Huellitas</option>
//                             <option value="3">3 Huellitas</option>
//                             <option value="4">4 Huellitas</option>
//                             <option value="5">5 Huellitas</option>
//                         </select>
//                         {errors.rating && <p className="error-message">{errors.rating}</p>}
//                     </div>

//                     <div>
//                         <label htmlFor="date">Fecha <span style={{ color: 'red' }}>*</span></label>
//                         <input
//                             type="date"
//                             id="date"
//                             value={date}
//                             onChange={handleChange}
//                         />
//                         {errors.date && <p className="error-message">{errors.date}</p>}
//                     </div>

//                     <button className="submit-button" type="submit">Enviar Reseña</button>
//                     <button className="submit-button" type="button" onClick={() => navigate('/home')}>Volver al Inicio</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ReviewForm;

// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from 'react';
import './form.styles.css';
import { useNavigate } from 'react-router-dom';
import validate from '../reviews/validationForReviews';

function ReviewForm({ onSubmitReview, userName, userId, adoptionApproved }) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [errors, setErrors] = useState({});
    const [name, setName] = useState(userName || '');
    const [reviews, setReviews] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    // useEffect para validar en tiempo real solo después de haber intentado enviar el formulario
    useEffect(() => {
        if (isSubmitted) {
            const formData = { userName: name, reviewText, rating, date };
            setErrors(validate(formData));
        }
    }, [name, reviewText, rating, date, isSubmitted]);

    // Cargar reseñas guardadas en localStorage al montar el componente
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
                // Validación inmediata del nombre si tiene números
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
            case 'date':
                setDate(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Marca que el formulario ha sido enviado

        const formData = { userId, userName: name, reviewText, rating, date };
        const validationErrors = validate(formData);

        // Validación del nombre en caso de números
        if (name.length > 0 && /[\d]/.test(name)) {
            validationErrors.userName = 'El nombre no puede contener números.';
        }

        setErrors(validationErrors);

        // Solo procesar si no hay errores de validación
        if (Object.keys(validationErrors).length === 0) {
            if (adoptionApproved) {
                // Guardar la reseña en localStorage
                const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
                const updatedReviews = [...storedReviews, formData];
                localStorage.setItem('reviews', JSON.stringify(updatedReviews));

                setReviews(updatedReviews); // Actualizar las reseñas en el estado
                alert('Reseña enviada con éxito.');
            } else {
                alert('Solo puedes dejar una reseña si has completado una adopción.');
            }
        }
    };

    const handleDelete = (indexToDelete) => {
        const updatedReviews = reviews.filter((_, index) => index !== indexToDelete);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
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

                    <div>
                        <label htmlFor="date">Fecha <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={handleChange}
                        />
                        {(isSubmitted || date.length > 0) && errors.date && (
                            <p className="error-message">{errors.date}</p>
                        )}
                    </div>

                    <button className="submit-button" type="submit">Enviar Reseña</button>
                    <button className="submit-button" type="button" onClick={() => navigate('/home')}>Volver al Inicio</button>
                </form>

                {reviews.length > 0 && (
                    <div className="review-list">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <p><strong>Nombre:</strong> {review.userName}</p>
                                <p><strong>Comentario:</strong> {review.reviewText}</p>
                                <p><strong>Calificación:</strong> {review.rating} Huellitas</p>
                                <p><strong>Fecha:</strong> {review.date}</p>
                                <button onClick={() => handleDelete(index)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReviewForm;