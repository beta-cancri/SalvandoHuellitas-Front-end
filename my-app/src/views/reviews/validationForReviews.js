const validate = (formData) => {
  let errors = {};

  // Validación para el nombre (solo letras y espacios)
  if (!formData.userName || !formData.userName.trim()) {
    errors.userName = "Por favor, ingresa tu nombre.";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.userName)) {
    errors.userName = "El nombre solo debe contener letras.";
  }

  // Validación para el texto de la reseña
  if (!formData.reviewText || !formData.reviewText.trim()) {
    errors.reviewText = "Por favor, escribe un comentario.";
  }

  // Validación para la calificación
  if (!formData.rating || formData.rating === "") {
    errors.rating = "Por favor, selecciona una calificación.";
  }

  // Validación para la fecha
  if (!formData.date || formData.date === "") {
    errors.date = "Por favor, ingresa la fecha.";
  }

  return errors;
};

export default validate;
