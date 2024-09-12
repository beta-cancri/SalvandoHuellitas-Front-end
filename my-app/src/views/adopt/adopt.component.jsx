import React, { useState, useEffect } from 'react';
import './adopt.styles.css';
import { createRequest } from '../../redux/actions/index';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Notification from '../create/Notification';
import validationForAdopt from './validationForAdopt';

const Adopt = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [requestData, setRequestData] = useState({
        adress: '',
        occupation: '',
        totalHabitants: 1,
        hasKids: '', // Inicializado como cadena vacía
        hasPets: '', // Inicializado como cadena vacía
        space: '',
        timeAvailable: '',
        addedCondition: '', // Inicializado como cadena vacía
        clauses: false
    });

    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRequestData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = validationForAdopt(requestData);
        setErrors(validateErrors);

        if (Object.keys(validateErrors).length === 0) {
            setUploading(true);
            try {
                if (user) {
                    let token = localStorage.getItem("jwt");
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    };

                    const requestDataWithUser = {
                        ...requestData,
                        id_pet: id
                    };

                    await dispatch(createRequest(requestDataWithUser, headers));
                    setShowNotification(true);

                    setRequestData({
                        adress: '',
                        occupation: '',
                        totalHabitants: 1,
                        hasKids: '',
                        hasPets: '',
                        space: '',
                        timeAvailable: '',
                        addedCondition: '',
                        clauses: false
                    });

                } else {
                    setShowNotification(true);
                }
            } catch (error) {
                alert('No pudimos procesar tu solicitud debido a esto: ' + error.message);
            } finally {
                setUploading(false);
            }
        }
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    return (
        <div className='full-screen-container-adopt'>
            <div className='adopt-container'>
                <h2 className='adopt-h2'>Formulario de Adopción</h2>
                <form onSubmit={handleSubmit} className='adopt-form'>
                    <h5>🐾 Información de contacto</h5>
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

                    <h5>🐾 Condiciones de vivienda</h5>
                    ¿Cuántas personas viven en la vivienda?
                    <input type="number"
                        name='totalHabitants'
                        min="1"
                        max="20"
                        value={requestData.totalHabitants}
                        onChange={handleChange} />
                    {errors.totalHabitants && (
                        <div className="error-tooltip">
                            <p className="error-text">{errors.totalHabitants}</p>
                            <div className="error-arrow"></div>
                        </div>
                    )}

                    <div className="radio-group">
                        <p>¿Hay niños en la vivienda?</p>
                        <div className='radio-group-container'>
                            <label>
                                <input
                                    type="radio"
                                    name="hasKids"
                                    value="true"
                                    checked={requestData.hasKids === 'true'}
                                    onChange={handleChange}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="hasKids"
                                    value="false"
                                    checked={requestData.hasKids === 'false'}
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
                        <p>¿Tienes otras mascotas a tu cuidado actualmente?</p>
                        <div className='radio-group-container'>
                            <label>
                                <input
                                    type="radio"
                                    name="hasPets"
                                    value="true"
                                    checked={requestData.hasPets === 'true'}
                                    onChange={handleChange}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="hasPets"
                                    value="false"
                                    checked={requestData.hasPets === 'false'}
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
                        <option value="1">Medio tiempo (4-8 horas al día)</option>
                        <option value="0">Casi no tengo tiempo (hasta 1 hora al día)</option>
                        <option value="-1">Algo de tiempo (1-4 horas al día)</option>
                        <option value="+1">Tengo mucho tiempo (más de 8 horas al día)</option>
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
                                    checked={requestData.addedCondition === 'true'}
                                    onChange={handleChange}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="addedCondition"
                                    value="false"
                                    checked={requestData.addedCondition === 'false'}
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

                    <h3>Cláusulas</h3>
                    <ul>
                        <li>Me comprometo a llevar a mi mascota al veterinario en caso de que se requiera.</li>
                        <li>Estoy al tanto de los gastos que se requieren para el cuidado de mi mascota, y estoy dispuesto/a a asumirlos.</li>
                        <li>Declaro que en el lugar donde vivo se permite tener mascotas.</li>
                        <li>Declaro que todos los miembros de mi familia están de acuerdo con la adopción, y se comprometen a cuidar y darle buen trato a la mascota.</li>
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
                    <button type="submit" className='button' disabled={uploading}>
                        {uploading ? 'Enviando...' : 'Enviar'}
                    </button>
                    <Link className='button' to="/home">Volver</Link>
                    </div>
                </form>
            </div>
            {showNotification && (
                <Notification
                    onClose={handleCloseNotification}
                    title="Solicitud Enviada"
                    message="¡Gracias por enviar tu solicitud! Nos pondremos en contacto contigo pronto 🐾."
                />
            )}
        </div>
    );
}

export default Adopt;

//original de NADIA