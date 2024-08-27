const validationForCreate = (formData) => {
    let errors = {}

    if(!formData.status) {
        errors.status = "We have to know about the status of the pet"
    }

    if(!formData.photo || !/^https?:\/\/.+.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(formData.photo)) {
        errors.photo = "You must upload a photo of the pet"
    }

    if (!formData.name) {
        errors.name = "Please, enter a name for the pet"
    } else if(!/^[a-zA-Z\s]+$/.test(formData.name)){
        errors.name = "The name for the pet cannot contain numbers or special characters"
    }

    if (!formData.species) {
        errors.species = "You have to choose a species" 
    }

    if(!formData.age) {
        errors.age = "We have to know about the age of the pet"
    }

    if(!formData.size) {
        errors.size = "the size of the pet is necesary"
    }

    if(!formData.energyLevel) {
        errors.energyLevel = "Energy level is necesary"
    }
    
    if(!formData.okWithKids && !formData.okWithPets) {
        errors.okWithKids = "Please, select at least one option"
        errors.okWithPets = "Please, select at least one option"
    }

    if(!formData.gender) {
        errors.gender = "We have to know about the gender of the pet"
    }


    return errors
}


export default validationForCreate