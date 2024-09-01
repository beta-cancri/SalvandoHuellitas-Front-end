const validationForRegister = (formData) => {
    let errors = {}

    if (!formData.fullName) {
        errors.fullName = "Por favor, ingrese su nombre completo"
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
        errors.fullName = "Su nombre no debe contener numeros o caracteres especiales"
    }

    if (!formData.email) {
        errors.email = "Necesitamos un email"
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
        errors.email = "Por favor, ingrese un email válido"
    }

    if (!formData.password) {
        errors.password = "Se requiere de contraseña"
    } else if (formData.password.length < 6) {
        errors.password = "Tu contraseña necesita de al menos 6 caracteres"
    } else if (formData.password.length > 10) {
        errors.password = "Tu contraseña no debe ser mayor a 10 caracteres"
    } else if (!/^(?=.*[a-z])/.test(formData.password)) {
        errors.password = "Necesitas al menos una minúscula"
    } else if (!/^(?=.*[A-Z])/.test(formData.password)) {
        errors.password = "Necesitas al menos una mayúscula"
    } else if (!/^(?=.*\d)/.test(formData.password)) {
        errors.password = "Necesitas al menos un número"
    } else if (!/^(?=.*\W)/.test(formData.password)) {
        errors.password = "Necesitas al menos un caracter especial"
    }
    

    if (!formData.age) {
        errors.age = "Por favor, ingresa tu edad"
    } else if (formData.age < 18) {
        errors.age = "No puedes registrarte si tienes menos de 18 años"
    }

    if (!formData.phone) {
        errors.phone = "Necesitamos un teléfono"
    } else if(!/^\+?\d{9,15}$/.test(formData.phone)){
        errors.phone = "Por favor, ingresa un teléfono válido"
    }

    if (!formData.idCard || !/^https?:\/\/.+.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(formData.idCard)) {
        errors.idCard = "Por favor, muéstranos tu identificación"
    } 

    if (!formData.gender) {
        errors.gender = "Por favor, selecciona tu genero"
    }
    return errors
}

export default validationForRegister
