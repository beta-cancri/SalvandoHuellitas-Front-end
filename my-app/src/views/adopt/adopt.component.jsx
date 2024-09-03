import React, { useState, useEffect } from 'react';
import './adopt.styles.css';
import { createRequest, /*fetchPets*/ } from '../../redux/actions/index';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import validationForAdopt from './validationForAdopt';
const Adopt = () => {

    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [requestData, setRequestData] = useState({
        adress: '',
        occupation: '',
        idCard: '',
        totalHabitants: 1,
        hasKids: false,
        hasPets: false,
        space: '',
        timeAvailable: '',
        addedCondition: false,
        clauses: false
    })

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

    /*useEffect(() => {
        if (!id_pet) {
            dispatch(fetchPets(requestData));
        }
    },[id_pet, requestData]) //* esto posiblemente se use luego*/
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
                    totalHabitants: 1,
                    hasKids: false,
                    hasPets: false,
                    space: '',
                    timeAvailable: '',
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
        <div className='full-screen-container-adopt'>
            <h2 className='adopt-h2'>A continuación, le pedimos por favor que complete el siguiente formulario para adoptar una mascota.</h2>
            <div className='adopt-container'>
                <form onSubmit={handleSubmit} className='adopt-form'>
                    <h3>PARTE 1: Datos Personales</h3>

                    <h5>Información del contacto</h5>

                    Dirección
                    <input type="text"
                        name='adress'
                        value={requestData.adress}
                        onChange={handleChange}
                        placeholder='¿Dónde vives?' />
                    {errors.adress && (
                        <div className="error-tooltip">
                            <p className="error-text">{errors.adress}</p>
                            <div className="error-arrow"></div>
                        </div>
                    )}

                    Ocupación
                    <input type="text"
                        name='occupation'
                        value={requestData.occupation}
                        onChange={handleChange}
                        placeholder='¿A qué te dedicas?' />
                    {errors.occupation && (
                        <div className="error-tooltip">
                            <p className="error-text">{errors.occupation}</p>
                            <div className="error-arrow"></div>
                        </div>
                    )}
                    Muéstranos tu identificación
                    <input type="text"
                        name='idCard'
                        value={requestData.idCard}
                        onChange={handleChange}
                        placeholder='Coloca aqui tu identificación'
                    />
                    {errors.idCard && (
                        <div className="error-tooltip">
                            <p className="error-text">{errors.idCard}</p>
                            <div className="error-arrow"></div>
                        </div>
                    )}
                    <h5>Condiciones de vivienda</h5>
                    ¿Cuántas personas viven contigo?
                    <input type="number"
                        name='totalHabitants'
                        min="1"
                        value={requestData.totalHabitants}
                        onChange={handleChange}
                    />
                    {errors.totalHabitants && (
                        <div className="error-tooltip">
                            <p className="error-text">{errors.totalHabitants}</p>
                            <div className="error-arrow"></div>
                        </div>
                    )}
                    ¿Hay niños en la vivienda? <br />
                    <div className="checkbox-group">
                        <input type="checkbox"
                            id="hasKids"
                            name="hasKids"
                            onChange={handleChange}
                            checked={requestData.hasKids}
                        />
                        <label htmlFor="hasKids">Sí, hay niños en la vivienda.</label>
                    </div>

                    ¿Cuánto espacio hay?
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
                    {errors.space && (
                        <div className="error-tooltip">
                            <p className="error-text">{errors.space}</p>
                            <div className="error-arrow"></div>
                        </div>
                    )}
                    ¿Tienes otras mascotas a tu cuidado actualmente? <br />
                    <div className="checkbox-group">
                        <input type="checkbox"
                            id="hasPets"
                            name="hasPets"
                            onChange={handleChange}
                            checked={requestData.hasPets}
                        />
                        <label htmlFor="hasPets">Sí, tengo otras mascotas.</label>
                    </div>


                    ¿Cuánto tiempo tienes al día para dedicar al cuidado de tu/s mascota/s?
                    <select
                        name="timeAvailable"
                        value={requestData.timeAvailable}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="0">Casi no tengo tiempo.</option>
                        <option value="-1">Menos de una hora.</option>
                        <option value="1">Una hora.</option>
                        <option value="+1">Más de una hora.</option>
                    </select>
                    {errors.timeAvailable && (
                        <div className="error-tooltip">
                            <p className="error-text">{errors.timeAvailable}</p>
                            <div className="error-arrow"></div>
                        </div>
                    )}
                    ¿Adoptarías a una mascota con condiciones especiales?
                    <div className="checkbox-group">
                        <input type="checkbox"
                            id="addedCondition"
                            name="addedCondition"
                            onChange={handleChange}
                            checked={requestData.addedCondition}
                        />
                        <label htmlFor="addedCondition">Sí, estoy dispuesto a adoptar.</label>
                    </div>


                    <h3>PARTE 2: Cláusulas</h3>
                    <p>Por favor, antes de enviar tu solicitud, te pediremos que aceptes las siguientes cláusulas</p>

                    <ul>
                        <li>Me comprometo a llevar a mi mascota al veterinario en caso de que se requiera.</li>
                        <li>Estoy al tanto de los gastos que se requieren para el cuidado de mi mascota, y estoy dispuesto/a a asumirlos.</li>
                        <li>Declaro que en el lugar donde vivo se permite tener mascotas.</li>
                        <li>Declaro que todos los miembros de mi familia están de acuerdo con la adopción, y se comprometen a cuidar y darle buen trato a la mascota.</li>
                        <li>Declaro que la mascota no podrá salir de la vivienda a menos que sea en paseos supervisados.</li>
                    </ul>
                    <div className="checkbox-group">
                        <input type="checkbox"
                            id="clauses"
                            name="clauses"
                            onChange={handleChange}
                            checked={requestData.clauses}
                        />
                        <label htmlFor="clauses">Estoy de acuerdo con las cláusulas.</label>
                    </div>
                    {errors.clauses && (
                        <div className="error-tooltip">
                            <p className="error-text">{errors.clauses}</p>
                            <div className="error-arrow"></div>
                        </div>
                    )}

                    <button type="submit" className='button-adopt'>Enviar</button>

                    <Link to="/home">
                        <button className='button-adopt'>Volver</button>
                    </Link>

                </form>
            </div>
        </div>
    )
}

export default Adopt