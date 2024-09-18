const validationForAdopt = (formData) => {
    let errors = {};

    
    if (formData.hasKids === '') {
        errors.hasKids = "No puedes dejar este campo vacío.";
    }

    if (!formData.space) {
        errors.space = "Necesitamos saber si el tamaño de la vivienda se adecúa al cuidado de la mascota.";
    }

    if (formData.hasPets === '') {
        errors.hasPets = "No puedes dejar este campo vacío.";
    }

    if (!formData.timeAvailable) {
        errors.timeAvailable = "Necesitamos saber el tiempo disponible para el cuidado correcto de la mascota.";
    }

    
    return errors;
}

export default validationForAdopt;
