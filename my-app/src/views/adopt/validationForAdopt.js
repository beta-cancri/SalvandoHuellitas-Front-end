const validationForAdopt = (formData) => {
    let errors = {};

    if (!formData.adress) {
        errors.adress = "Por favor, ingresa una dirección.";
    }

    if (!formData.occupation) {
        errors.occupation = "Por favor, dinos a qué te dedicas.";
    }

    if (!formData.totalHabitants) {
        errors.totalHabitants = "No puedes dejar este campo vacío.";
    }

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

    
    if (!formData.clauses) {
        errors.clauses = "Debes aceptar las cláusulas para poder enviar la solicitud.";
    }

    return errors;
}

export default validationForAdopt;
