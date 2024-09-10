const validationForAdopt = (formData) => {

    let errors = {}
    // Validate adress
    if (!formData.adress) {
        errors.adress = "Por favor, ingresa una dirección."
    }

    // Validate occupation
    if (!formData.occupation) {
        errors.occupation = "Por favor, dinos a qué te de dedicas."
    }

    // Validate idCard
    if (!formData.idCard) {
        errors.idCard = "Necesitas mostrar tu identificación para proceder."
    }

    // Validate totalHabitants
    if(!formData.totalHabitants) {
        errors.totalHabitants = "No puedes dejar este campo vacío."
    }

    // Validate hasKids
    if(!formData.hasKids === null) {
        errors.hasKids = "No puedes dejar este campo vacío."
    }
    // Validate space
    if(!formData.space) {
        errors.space = "Necesitamos saber si el tamaño de la vivienda se adecúa al cuidado de la mascota."
    }

    // Validate hasPets
    if(!formData.hasPets === null) {
        errors.hasPets = "No puedes dejar este campo vacío."
    }

    // Validate timeAvailable
    if(!formData.timeAvailable) {
        errors.timeAvailable = "Necesitamos saber el tiempo disponible para el cuidado correcto de la mascota."
    }

    // Validate addedCondition
    if(!formData.addedCondition === null) {
        errors.addedCondition = "No puedes dejar este campo vacío."
    }

    // Validate clauses
    if(!formData.clauses) {
        errors.clauses = "Debes aceptar las cláusulas para poder enviar la solicitud."
    }


    return errors

}

export default validationForAdopt
