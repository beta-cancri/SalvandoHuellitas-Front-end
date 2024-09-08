import { useState, useEffect } from 'react';
import ReviewForm from './formReviews';
import ReviewCard from './reviewCard'; // Componente para mostrar cada reseña

function ReviewsPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Función para cargar las reseñas desde el servidor
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/reviews');
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const handleSubmitReview = async (reviewData) => {
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });
            const newReview = await response.json();
            setReviews([...reviews, newReview]); // Actualiza la lista de reseñas
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div>
            <ReviewForm onSubmitReview={handleSubmitReview} userId="user-id" adoptionApproved={true} />
            <div className="review-cards">
                {reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}

export default ReviewsPage;
