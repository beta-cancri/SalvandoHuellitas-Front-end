import React, { useState, useEffect } from 'react';
import './adopt.styles.css';
import { createRequest, /*fetchPets*/ } from '../../redux/actions/index';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import validationForAdopt from './validationForAdopt';
const Adopt = () => {

    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const { id } = useParams(); 
    const [requestData, setRequestData] = useState({
        adress: '',
        occupation: '',
        idCard: '',
        totalHabitants: 1,
        hasKids: null,
        hasPets: null,
        space: '',
        timeAvailable: '',
        addedCondition: null,
        clauses: false
    })

    const [errors, setErrors] = useState({});

    // ? al montar el componente, se obtiene el usuario del localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // ? se guarda el user en el estado
        }
    }, []);

    /*useEffect(() => {
        if (!id_pet) {
            dispatch(fetchPets(requestData));
        }
    },[id_pet, requestData]) //! esto posiblemente se use luego, no descomentar aún*/
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
            setRequestData({
                ...requestData,
                [name]: checked
            });
        } else if (type === 'radio') {
            setRequestData({
                ...requestData,
                [name]: value === 'true'
            });
        } else {
            setRequestData({
                ...requestData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateErrors = validationForAdopt(requestData);
        if (Object.keys(validateErrors).length === 0) {
            try {
                if (user) {
                    let token = localStorage.getItem("jwt");
                    //? se configuran los headers con el token del usuario
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }

                    //? se preparan los datos para la petición POST
                    const requestDataWithUser = {
                        ...requestData,
                        id_pet: id
                    }

                    //?se envía la solicitud vía Redux
                    dispatch(createRequest(requestDataWithUser, headers));
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
                } else {
                    alert('Por favor, inicia sesión para poder adoptar una mascota');
                }
            } catch (error) {
                alert('No pudimos procesar tu solicitud debido a esto:' + error.message);
            };
        };
    };

    return (
        <div className='full-screen-container-adopt'>

            <div className='adopt-container'>
                <h2 className='adopt-h2'>A continuación, le pedimos por favor que complete el siguiente formulario para adoptar una mascota.</h2>
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

                    <div className="radio-group">
                        <p>¿Hay niños en la vivienda?</p> <br />
                        <div className='radio-group-container'>
                            <label>
                                <input
                                    type="radio"
                                    name="hasKids"
                                    value="true"
                                    checked={requestData.hasKids === true}
                                    onChange={handleChange}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="hasKids"
                                    value="false"
                                    checked={requestData.hasKids === false}
                                    onChange={handleChange}
                                />
                                No
                            </label>
                        </div>
                        {errors.hasKids && (
                            <div className="error-tooltip">
                                <p className="error-text">{errors.hasKids}</p>
                                <div className="error-arrow"></div>
                            </div>
                        )}
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
                    <div className="radio-group">
                        <p>¿Tienes otras mascotas a tu cuidado actualmente?</p> <br />
                        <div className='radio-group-container'>
                            <label>
                                <input
                                    type="radio"
                                    name="hasPets"
                                    value="true"
                                    checked={requestData.hasPets === true}
                                    onChange={handleChange}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="hasPets"
                                    value="false"
                                    checked={requestData.hasPets === false}
                                    onChange={handleChange}
                                />
                                No
                            </label>
                        </div>
                        {errors.hasPets && (
                            <div className="error-tooltip">
                                <p className="error-text">{errors.hasPets}</p>
                                <div className="error-arrow"></div>
                            </div>
                        )}
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

                    <div className="radio-group">
                        <p>¿Adoptarías a una mascota con condiciones especiales?</p>
                        <div className='radio-group-container'>
                            <label>
                                <input
                                    type="radio"
                                    name="addedCondition"
                                    value="true"
                                    checked={requestData.addedCondition === true}
                                    onChange={handleChange}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="addedCondition"
                                    value="false"
                                    checked={requestData.addedCondition === false}
                                    onChange={handleChange}
                                />
                                No
                            </label>
                        </div>
                        {errors.addedCondition && (
                            <div className="error-tooltip">
                                <p className="error-text">{errors.addedCondition}</p>
                                <div className="error-arrow"></div>
                            </div>
                        )}
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
                    <div className="checkbox">
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
                    <div className='button-container'>
                    <button type="submit" className='button-adopt'>Enviar</button>

                    <Link to="/home">
                        <button className='button-adopt'>Volver</button>
                    </Link>
                    </div>

                </form>
            </div >
        </div >
    )
}

export default Adopt