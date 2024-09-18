import React, { useState, useEffect } from 'react';
import './suggestionForm.css';
import { createRequest } from '../../redux/actions/index';
import { useDispatch } from 'react-redux';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import Notification from '../create/Notification';
import validationForAdopt from './validationForSuggestions';
import axios from 'axios'; 



const SuggestionsForm = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Inicializa useNavigate para redirigir
    const { id } = useParams();
    const [suggestedPets, setSuggestedPets] = useState([]);  // Estado para guardar las mascotas sugeridas
    const [requestData, setRequestData] = useState({
        hasKids: null, 
        hasPets: null, 
        space: '',
        timeAvailable: '',
    });

    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {window.confirm("Primero necesitas iniciar sesión")
            localStorage.setItem('afterLogin', '/suggestPets')
           navigate('/login');
        }        
    }, [navigate]);
    
   

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        setRequestData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : (type === 'radio' ? value === 'true' : value) // Si es radio, convierte a booleano
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
                  
                        if (!id) {
                            // Enviar los datos del formulario al backend
                            const response = await axios.post("/pets/suggest", requestData, { headers });
                            console.log("Suggested Pets Response: ", response.data);
                            setSuggestedPets(response.data);
                                        
                            // Guardar los valores en localStorage
                            localStorage.setItem('suggestionFormData', JSON.stringify(requestData));

                        // Redirigir a Home con las mascotas sugeridas
                        navigate('/home', { state: { suggestedPets: response.data } });
                        } 
                                                
                        setRequestData({
                            hasKids: null,
                            hasPets: null,
                            space: '',
                            timeAvailable: '',
                        });


                    }
                } 
             catch (error) {
                alert('Debes iniciar sesion primero' + error.message);
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
                <h2 className='adopt-h2'>Encuentra mascotas para ti</h2>
                                
                <form onSubmit={handleSubmit} className='adopt-form'>
            

                    <div className="radio-group">
                        <p>¿Hay niños en la vivienda?</p>
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
                        <p>¿Tienes otras mascotas a tu cuidado actualmente?</p>
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
                                    checked={requestData.hasPets === false }
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
                        <option value="-1">Poco tiempo (menos de 1 hora al día)</option>
                        <option value="1">Algo de tiempo (1 hora al día)</option>
                        <option value="+1">Tengo mucho tiempo (más de 1 hora al día)</option>

                    </select> <br />

                    {errors.timeAvailable && (
                        <div className="error-tooltip">
                            <p className="error-text">{errors.timeAvailable}</p>
                            <div className="error-arrow"></div>
                        </div>
                    )}

                    

                    <div className='button-container'>
                        <button type="submit" className='button' disabled={uploading}>
                            {uploading ? 'Enviando...' : 'Enviar'}
                        </button>

                        <Link className='button' to="/home">Omitir
                        </Link>
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

export default SuggestionsForm;
