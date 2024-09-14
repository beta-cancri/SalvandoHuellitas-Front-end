const validationForRegister = (formData) => {
    let errors = {};
  
    // Validate fullName
    if (!formData.fullName.trim()) {
      errors.fullName = "Por favor, ingrese su nombre completo";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      errors.fullName = "Su nombre no debe contener números o caracteres especiales";
    }
  
    // Validate email
    if (!formData.email) {
      errors.email = "Necesitamos un email";
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
      errors.email = "Por favor, ingrese un email válido";
    }
  
    // Validate password
    if (!formData.password) {
      errors.password = "Se requiere de contraseña";
    } else if (formData.password.length < 6) {
      errors.password = "Tu contraseña necesita de al menos 6 caracteres";
    } else if (formData.password.length > 10) {
      errors.password = "Tu contraseña no debe ser mayor a 10 caracteres";
    } else if (!/^(?=.*[a-z])/.test(formData.password)) {
      errors.password = "Necesitas al menos una minúscula";
    } else if (!/^(?=.*[A-Z])/.test(formData.password)) {
      errors.password = "Necesitas al menos una mayúscula";
    } else if (!/^(?=.*\d)/.test(formData.password)) {
      errors.password = "Necesitas al menos un número";
    }
  
    // Validate birthDate
    if (!formData.birthDate) {
      errors.birthDate = "Por favor, ingresa tu fecha de nacimiento";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.birthDate);
      if (birthDate >= today) {
        errors.birthDate = "La fecha de nacimiento debe ser una fecha pasada";
      }
    }
  
    // Validate phone
    if (!formData.phone) {
      errors.phone = "Por favor, ingresa un teléfono";
    } else if (!/^\+?\d{9,15}$/.test(formData.phone)) {
      errors.phone = "Por favor, ingresa un teléfono válido";
    }
  
    // Validate occupation
    if (!formData.occupation) {
      errors.occupation = "Por favor, dinos a qué te dedicas";
    }
  
    return errors;
  };
  
  export default validationForRegister;
  