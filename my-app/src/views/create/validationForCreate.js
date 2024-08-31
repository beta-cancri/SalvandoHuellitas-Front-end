const validationForCreate = (formData) => {
    let errors = {}

    if(!formData.status) {
        errors.status = "Necesitamos saber el estado de la mascota"
    }

    if(!formData.photo || !/^https?:\/\/.+.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(formData.photo)) {
        errors.photo = "Debes subir una foto de la mascota"
    }

    if (!formData.name) {
        errors.name = "Por favor, ponle un nombre"
    } else if(!/^[a-zA-Z\s]+$/.test(formData.name)){
        errors.name = "El nombre no debe contener números ni caracteres especiales"
    }

    if (!formData.species) {
        errors.species = "Debes especificar la especie de la mascota" 
    }

    if(!formData.age) {
        errors.age = "Necesitamos saber la edad"
    }

    if(!formData.size) {
        errors.size = "El tamaño de la mascota es necesario"
    }

    if(!formData.energyLevel) {
        errors.energyLevel = "Necesitamos saber el nivel de energía de la mascota"
    }
    
    if(!formData.okWithKids && !formData.okWithPets) {
        errors.okWithPetsAndKids = "Por favor selecciona al menos una de las dos opciones"
        
    }

    if(!formData.gender) {
        errors.gender = "Necesitamos saber el género de la mascota"
    }


    return errors
}


export default validationForCreate