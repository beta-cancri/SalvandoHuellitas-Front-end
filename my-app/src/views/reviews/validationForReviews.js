const validate = (formData) => {
  let errors = {};
  // Validación para el texto de la reseña
  if (!formData.reviewText || !formData.reviewText.trim()) {
    errors.reviewText = "Por favor, escribe un comentario.";
  }

  // Validación para la calificación
  if (!formData.rating || formData.rating === "") {
    errors.rating = "Por favor, selecciona una calificación.";
  }

  return errors;
};

export default validate;
