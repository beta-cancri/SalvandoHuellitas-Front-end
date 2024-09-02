const validationForCreate = (formData) => {
    let errors = {}

    if(!formData.status) {
        errors.status = "Necesitamos saber el estado de la mascota"
        return errors
    }

    if(!formData.photo || !/^https?:\/\/.+.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(formData.photo)) {
        errors.photo = "Debes subir una foto de la mascota"
        return errors
    }

    if (!formData.name) {
        errors.name = "Por favor, ponle un nombre"
        return errors
    } else if(!/^[a-zA-Z\s]+$/.test(formData.name)){
        errors.name = "El nombre no debe contener números ni caracteres especiales"
        return errors
    }

    if (!formData.species) {
        errors.species = "Debes especificar la especie de la mascota" 
        return errors
    }

    if(!formData.age) {
        errors.age = "Necesitamos saber la edad"
        return errors
    }

    if(!formData.size) {
        errors.size = "El tamaño de la mascota es necesario"
        return errors
    }

    if(!formData.energyLevel) {
        errors.energyLevel = "Necesitamos saber el nivel de energía de la mascota"
        return errors
    }
    
    if(!formData.okWithKids && !formData.okWithPets) {
        errors.okWithPetsAndKids = "Por favor selecciona al menos una de las dos opciones"
        return errors
        
    }

    if(!formData.gender) {
        errors.gender = "Necesitamos saber el género de la mascota"
        return errors
    }


    return errors
}

export default validationForCreate