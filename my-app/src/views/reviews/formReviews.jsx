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


import { useState } from 'react';
import './form.styles.css';
import { useNavigate } from 'react-router-dom';
import validate from '../reviews/validationForReviews';

function ReviewForm({ onSubmitReview, userName, userId, adoptionApproved }) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Maneja el cambio en los campos del formulario
    const handleChange = (e) => {
        const { id, value } = e.target;
        let formData = { reviewText, rating, date, [id]: value };
        if (id === 'reviewText') setReviewText(value);
        if (id === 'rating') setRating(value);
        if (id === 'date') setDate(value);

        // Validar en tiempo real
        setErrors(validate(formData));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { reviewText, rating, date };
        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (adoptionApproved) {
                onSubmitReview({ userId, reviewText, rating, date });
            } else {
                alert("Solo puedes dejar una reseña si has completado una adopción.");
            }
        }
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
                        />
                    </div>

                    <div>
                        <label htmlFor="reviewText">Escribe tu comentario <span style={{ color: 'red' }}>*</span></label>
                        <textarea
                            id="reviewText"
                            value={reviewText}
                            className="textarea"
                            onChange={handleChange}
                        />
                        {errors.reviewText && <p className="error-message">{errors.reviewText}</p>}
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
                        {errors.rating && <p className="error-message">{errors.rating}</p>}
                    </div>

                    <div>
                        <label htmlFor="date">Fecha <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={handleChange}

                        />
                        {errors.date && <p className="error-message">{errors.date}</p>}
                    </div>

                    <button className="submit-button" type="submit">Enviar Reseña</button>
                    <button className="submit-button" type="button" onClick={() => navigate('/home')}>Volver al Inicio</button>
                </form>
            </div>
        </div>
    );
}

export default ReviewForm;
