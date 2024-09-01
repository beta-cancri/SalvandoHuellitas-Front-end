import React, { useState } from 'react';
//import './adopt.styles.css';
import { createRequest, fetchPets } from '../../redux/actions/index';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import validationForAdopt from './validationForAdopt';
const Adopt = ({id_pet}) => {

    const dispatch = useDispatch();
    const [requestData, setRequestData] = useState({
        adress: '',
        occupation: '',
        idCard: '',
        numberPeople: 0,
        hasChildren: false,
        hasOtherPets: false,
        space: '',
        daliyTime: '',
        petType: '',
    })

    const [errors, setErrors] = useState({});

    if(!id_pet){
        dispatch(fetchPets(requestData));
    } else {
        dispatch(createRequest(requestData));
    }
    const handleChange = (e) => {
        setRequestData({
            ...requestData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validateErrors = validationForAdopt(requestData);
        setErrors(validateErrors);
        if (Object.keys(validateErrors).length === 0) {
            dispatch(createRequest(requestData));
            alert('Tu solicitud fue creada exitosamente');
            setRequestData({
                adress: '',
                occupation: '',
                idCard: '',
                numberPeople: 1,
                hasChildren: false,
                hasOtherPets: false,
                pets: [],
                space: '',
                daliyTime: '',
                petType: '',
            })
        }
        setErrors(validateErrors);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>A continuación, le pedimos por favor que complete el siguiente formulario para adoptar una mascota.</h1>
                <h3>PARTE 1: Datos Personales</h3>

                <h5>Información del contacto</h5>

                <label htmlFor="">Dirección</label>
                <input type="text" placeholder='¿Dónde vives?' />

                <label htmlFor="">Ocupación</label>
                <input type="text" placeholder='¿A qué te dedicas?' />

                <label htmlFor="">Please, show us your ID Card</label>
                <input type="text" />

                <h5>Condiciones de vivienda</h5>
                <label htmlFor="">¿Cuántas personas viven contigo?</label>
                <input type="number" min="1" />

                <label htmlFor="">¿Hay niños en la vivienda?</label> <br />
                <input type="checkbox" id="childrenYes" name="children" />
                <label htmlFor="childrenYes">Sí</label>
                <input type="checkbox" id="childrenNo" name="children" />
                <label htmlFor="childrenNo">No</label>

                <label htmlFor="">¿Cuánto espacio hay?</label>
                <select name="" id="">
                    <option value="">Selecciona una opción</option>
                    <option value="">Poco</option>
                    <option value="">Medio</option>
                    <option value="">Mucho</option>
                </select>

                <label htmlFor="">¿Tienes otras mascotas a tu cuidado actualmente?</label> <br />
                <input type="checkbox" id="petYes" name="pet" />
                <label htmlFor="petYes">Sí</label>
                <input type="checkbox" id="petNo" name="pet" />
                <label htmlFor="petNo">No</label>

                <label htmlFor="">¿Cuánto tiempo tienes al día para dedicar al cuidado de tu/s mascota/s?</label>
                <select name="" id="">
                    <option value="">Selecciona una opción</option>
                    <option value="">Casi no tengo tiempo</option>
                    <option value="">Menos de una hora</option>
                    <option value="">Una hora</option>
                    <option value="">Más de una hora</option>
                   
                </select>

                <label htmlFor="">¿Qué mascota deseas adoptar?</label> <br />
                <select name="" id="">
                    <option value="">Selecciona una mascota</option>
                    <option value="">Perro</option>
                    <option value="">Gato</option>
                </select>


                <h3>PARTE 2: Cláusulas</h3>
                <p>Por favor, antes de enviar tu solicitud, te pediremos que aceptes las siguientes cláusulas</p>
                <ul>
                    <li>Me comprometo a llevar a mi mascota al veterinario en caso de que se requiera.</li>
                    <li>Estoy al tanto de los gastos que se requieren para el cuidado de mi mascota, y estoy dispuesto/a a asumirlos.</li>
                    <li>Declaro que en el lugar donde vivo se permite tener mascotas</li>
                    <li>Declaro que todos los miembros de mi familia están de acuerdo con la adopción, y se comprometen a cuidar y darle buen trato a la mascota.</li>
                    <li>Declaro que la mascota no podrá salir de la vivienda a menos que sea en paseos supervisados.</li>
                </ul>
                <input type="checkbox"> Estoy de acuerdo con las cláusulas </input>

            </form>

            <button type="submit"> Submit </button>
        </div>
    )
}

export default Adopt