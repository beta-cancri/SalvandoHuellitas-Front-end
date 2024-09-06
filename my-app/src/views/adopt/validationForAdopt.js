const validationForAdopt = (formData) => {

    let errors = {}

    if (!formData.adress) {
        errors.adress = "Por favor, ingresa una dirección."
        return errors
    }

    if (!formData.occupation) {
        errors.occupation = "Por favor, dinos a qué te de dedicas."
        return errors
    }

    if (!formData.idCard) {
        errors.idCard = "Necesitas mostrar tu identificación para proceder."
        return errors
    }

    if(!formData.totalHabitants) {
        errors.totalHabitants = "No puedes dejar este campo vacío."
        return errors
    }

    if(!formData.space) {
        errors.space = "Necesitamos saber si el tamaño de la vivienda se adecúa al cuidado de la mascota."
        return errors
    }

    if(!formData.timeAvailable) {
        errors.timeAvailable = "Necesitamos saber el tiempo disponible para el cuidado correcto de la mascota."
        return errors
    }

    if(!formData.clauses) {
        errors.clauses = "Debes aceptar las cláusulas para poder enviar la solicitud."
        return errors
    }


    return errors

}

export default validationForAdopt
