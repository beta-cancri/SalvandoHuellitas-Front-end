const validationForRegister = (formData) => {
    let errors = {}

    if (!formData.fullName) {
        errors.fullName = "Please, enter your full name"
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
        errors.fullName = "Your name cannot contain numbers or special characters"
    }

    if (!formData.email) {
        errors.email = "An email is required"
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
        errors.email = "Please, enter a valid email"
    }

    if (!formData.password) {
        errors.password = "A password is required"
    } else if (formData.password.length < 6) {
        errors.password = "Your password needs at least 6 characters"
    } else if (formData.password.length > 10) {
        errors.password = "Your password cannot be longer than 10 characters"
    } else if (!/^(?=.*[a-z])/.test(formData.password)) {
        errors.password = "You need at least a lowercase letter"
    } else if (!/^(?=.*[A-Z])/.test(formData.password)) {
        errors.password = "You need at least an uppercase letter"
    } else if (!/^(?=.*\d)/.test(formData.password)) {
        errors.password = "You need at least a number"
    } else if (!/^(?=.*\W)/.test(formData.password)) {
        errors.password = "You need at least a special character"
    }
    

    if (!formData.age) {
        errors.age = "Please, enter your age"
    } else if (formData.age < 18) {
        errors.age = "You cannot enter if you are under 18"
    }

    if (!formData.phone) {
        errors.phone = "A phone number is required"
    } else if(!/^\+?\d{9,15}$/.test(formData.phone)){
        errors.phone = "Please, enter a valid phone number"
    }

    if (!formData.idCard || !/^https?:\/\/.+.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(formData.idCard)) {
        errors.idCard = "Please, enter your ID card"
    } 

    if (!formData.gender) {
        errors.gender = "Please, select your gender"
    }
    return errors
}

export default validationForRegister