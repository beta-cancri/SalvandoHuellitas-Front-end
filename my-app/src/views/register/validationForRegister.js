const validationForRegister = (formData) => {
    let errors = {}

    if (!formData.fullName.trim()) {
        errors.fullName = "Por favor, ingrese su nombre completo"
        return errors
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
        errors.fullName = "Su nombre no debe contener numeros o caracteres especiales"
        return errors
    }

    if (!formData.email) {
        errors.email = "Necesitamos un email"
        return errors
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
        errors.email = "Por favor, ingrese un email válido"
        return errors
    }

    if (!formData.password) {
        errors.password = "Se requiere de contraseña"
        return errors
    } else if (formData.password.length < 6) {
        errors.password = "Tu contraseña necesita de al menos 6 caracteres"
        return errors
    } else if (formData.password.length > 10) {
        errors.password = "Tu contraseña no debe ser mayor a 10 caracteres"
        return errors
    } else if (!/^(?=.*[a-z])/.test(formData.password)) {
        errors.password = "Necesitas al menos una minúscula"
        return errors
    } else if (!/^(?=.*[A-Z])/.test(formData.password)) {
        errors.password = "Necesitas al menos una mayúscula"
        return errors
    } else if (!/^(?=.*\d)/.test(formData.password)) {
        errors.password = "Necesitas al menos un número"
        return errors
    } else if (!/^(?=.*\W)/.test(formData.password)) {
        errors.password = "Necesitas al menos un caracter especial"
        return errors
    }
    

    if (!formData.birthDate) {
        errors.birthDate = "Por favor, ingresa tu fecha de nacimiento"
        return errors
    }
    

    if (!formData.phone) {
        errors.phone = "Necesitamos un teléfono"
        return errors
    } else if(!/^\+?\d{9,15}$/.test(formData.phone)){
        errors.phone = "Por favor, ingresa un teléfono válido"
        return errors
    }

    if (!formData.idCard || !/^https?:\/\/.+.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(formData.idCard)) {
        errors.idCard = "Por favor, muéstranos tu identificación"
        return errors
    } 

    if (!formData.occupation) {
        errors.occupation = "Por favor, dinos a qué te de dedicas"
        return errors
    }

   
    return errors
}

export default validationForRegister
