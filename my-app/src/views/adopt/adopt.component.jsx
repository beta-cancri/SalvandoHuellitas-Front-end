import React, { useState, /*useEffect*/ } from 'react';
//import './adopt.styles.css';
import { createRequest, /*fetchPets*/ } from '../../redux/actions/index';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import validationForAdopt from './validationForAdopt';
const Adopt = ({ id_pet }) => {

    const dispatch = useDispatch();
    const [requestData, setRequestData] = useState({
        adress: '',
        occupation: '',
        idCard: '',
        numberPeople: 1,
        hasChildren: false,
        hasOtherPets: false,
        space: '',
        daliyTime: '',
        addedCondition: false,
    })

    const [errors, setErrors] = useState({});

    /*useEffect(() => {
        if (!id_pet) {
            dispatch(fetchPets(requestData));
        }
    },[id_pet, requestData])*/
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setRequestData({
            ...requestData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateErrors = validationForAdopt(requestData);
        setErrors(validateErrors);
        if (Object.keys(validateErrors).length === 0) {

            try {
                dispatch(createRequest(requestData));
                alert('¡Gracias por enviarnos tu solicitud!');
                setRequestData({
                    adress: '',
                    occupation: '',
                    idCard: '',
                    numberPeople: 1,
                    hasChildren: false,
                    hasOtherPets: false,
                    space: '',
                    daliyTime: '',
                    addedCondition: false,
                    clauses: false
                })
                setErrors(validateErrors);
            } catch (error) {
                alert('No pudimos procesar tu solicitud debido a esto:' + error.message);
            };
        };
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>A continuación, le pedimos por favor que complete el siguiente formulario para adoptar una mascota.</h1>
                <h3>PARTE 1: Datos Personales</h3>

                <h5>Información del contacto</h5>

                <label>Dirección</label>
                <input type="text"
                    name='adress'
                    value={requestData.adress}
                    onChange={handleChange}
                    placeholder='¿Dónde vives?' />

                <label>Ocupación</label>
                <input type="text"
                    name='occupation'
                    value={requestData.occupation}
                    onChange={handleChange}
                    placeholder='¿A qué te dedicas?' />

                <label>Muéstranos tu identificación</label>
                <input type="text"
                    name='idCard'
                    value={requestData.idCard}
                    onChange={handleChange}
                    placeholder='Coloca aqui tu identificación'
                />

                <h5>Condiciones de vivienda</h5>
                <label>¿Cuántas personas viven contigo?</label>
                <input type="number"
                    name='numberPeople'
                    min="1"
                    value={requestData.numberPeople}
                    onChange={handleChange}
                />

                <label>¿Hay niños en la vivienda?</label> <br />
                <input type="checkbox"
                    name="hasChildren"
                    onChange={handleChange}
                    checked={requestData.hasChildren}
                />
                <label>Sí, hay niños en la vivienda.</label>

                <label>¿Cuánto espacio hay?</label>
                <select
                    name="space"
                    value={requestData.space}
                    onChange={handleChange}
                >
                    <option value="">Selecciona una opción</option>
                    <option value="small">Poco</option>
                    <option value="medium">Medio</option>
                    <option value="large">Mucho</option>
                </select>

                <label>¿Tienes otras mascotas a tu cuidado actualmente?</label> <br />
                <input type="checkbox"
                    name="hasOtherPets"
                    onChange={handleChange}
                    checked={requestData.hasOtherPets}
                />
                <label>Sí, tengo otras mascotas.</label>

                <label>¿Cuánto tiempo tienes al día para dedicar al cuidado de tu/s mascota/s?</label>
                <select >
                    <option value="">Selecciona una opción</option>
                    <option value="0">Casi no tengo tiempo.</option>
                    <option value="-1">Menos de una hora.</option>
                    <option value="1">Una hora.</option>
                    <option value="+1">Más de una hora.</option>
                </select>

                <label>¿Adoptarías a una mascota con condiciones especiales?</label>
                <input type="checkbox"
                    name="addedCondition"
                    onChange={handleChange}
                    checked={requestData.addedCondition}
                />
                <label>Sí, estoy dispuesto a adoptar.</label>

                <h3>PARTE 2: Cláusulas</h3>
                <p>Por favor, antes de enviar tu solicitud, te pediremos que aceptes las siguientes cláusulas</p>

                <ul>
                    <li>Me comprometo a llevar a mi mascota al veterinario en caso de que se requiera.</li>
                    <li>Estoy al tanto de los gastos que se requieren para el cuidado de mi mascota, y estoy dispuesto/a a asumirlos.</li>
                    <li>Declaro que en el lugar donde vivo se permite tener mascotas.</li>
                    <li>Declaro que todos los miembros de mi familia están de acuerdo con la adopción, y se comprometen a cuidar y darle buen trato a la mascota.</li>
                    <li>Declaro que la mascota no podrá salir de la vivienda a menos que sea en paseos supervisados.</li>
                </ul>
                <input type="checkbox" 
                    name="clauses" 
                    onChange={handleChange}
                    checked= {requestData.clauses}/> Estoy de acuerdo con las cláusulas.

                    
                <button type="submit">Enviar</button>

            </form>
        </div>
    )
}

export default Adopt