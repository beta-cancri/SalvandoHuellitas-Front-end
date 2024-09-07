const validateTestimonial = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = "El nombre es obligatorio.";
  }

  if (!formData.text) {
    errors.text = "El testimonio es obligatorio.";
  }

  return errors;
};

export default validateTestimonial;
