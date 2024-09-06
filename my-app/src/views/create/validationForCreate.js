const validationForCreate = (formData) => {
    let errors = {};
  
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }
  
    if (!formData.species) {
      errors.species = 'La especie es obligatoria';
    }
  
    if (!formData.age) {
      errors.age = 'La edad es obligatoria';
    }
  
    if (!formData.size) {
      errors.size = 'El tamaño es obligatorio';
    }
  
    if (!formData.energyLevel) {
      errors.energyLevel = 'El nivel de energía es obligatorio';
    }
  
    if (!formData.gender) {
      errors.gender = 'El género es obligatorio';
    }
  
    // Optionally validate photo if needed
    if (!formData.photo) {
      errors.photo = 'La foto es obligatoria';
    }
  
    return errors;
  };
  
  export default validationForCreate;
  