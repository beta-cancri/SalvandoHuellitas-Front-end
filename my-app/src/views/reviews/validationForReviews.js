// const validationReviews = (formData) => {
//   let errors = {};

//   if (!formData.fullName.trim()) {
//     errors.fullName = "Por favor, ingrese su nombre completo";
//     return errors;
//   } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
//     errors.fullName =
//       "Su nombre no debe contener numeros o caracteres especiales";
//     return errors;
//   }

//   if (!formData.date) {
//     errors.date = "Por favor, ingrese la fecha de la reseña";
//     return errors;
//   }

//   if (!formData.occupation) {
//     errors.occupation = "Por favor, dinos a qué te de dedicas";
//     return errors;
//   }

//   return errors;
// };

// export default validationReviews;

const validate = (formData) => {
  let errors = {};

  if (!formData || !formData.fullName || !formData.fullName.trim()) {
    errors.fullName = "Por favor, ingrese su nombre completo";
    return errors;
  } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
    errors.fullName =
      "Su nombre no debe contener números o caracteres especiales";
    return errors;
  }

  if (!formData.date) {
    errors.date = "Por favor, ingrese la fecha de la reseña";
    return errors;
  }

  if (!formData.occupation) {
    errors.occupation = "Por favor, dinos a qué te dedicas";
    return errors;
  }

  return errors;
};

export default validate;
