import axios from 'axios';

export const getAllPets = async () => {
    try {
        return(await axios('http://localhost:3001/get')).data.map((name) => {
            return name.name;
        });
    } catch (err) {
        console.log(err);
    }
}

export const postPet = async () => {
    try {
        return(await axios.post('http://localhost:3001/post', {name: name})).data;
    } catch (err) {
        console.log(err);
    }
}