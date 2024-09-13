function ReviewCard({ review }) {
    return (
        <div className="review-card">
            <h4>{review.userName}</h4>
            <p>{review.comment}</p>
            <p>Calificación: {review.rating} Huellitas</p>
            <p>Fecha: {new Date(review.date).toLocaleDateString()}</p>
        </div>
    );
}

export default ReviewCard;