import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPet } from '../../redux/actions';
import Notification from './Notification';
import './create.styles.css';
import validationForCreate from './validationForCreate';

const CreatePet = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    status: 'available',
    photo: '',
    name: '',
    species: '',
    age: '',
    size: '',
    breed: '',
    energyLevel: '',
    okWithPets: false,
    okWithKids: false,
    history: '',
    gender: '',
  });

  const [petImage, setPetImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState({});
  const [uploading, setUploading] = useState(false);
  const [showNotification, setShowNotification] = useState(false); //agregado

  useEffect(() => {
    // Limpia la URL anterior si existe
    if (petImage) {
      const newPreviewUrl = URL.createObjectURL(petImage);
      setPreviewUrl(newPreviewUrl);

      return () => {
        URL.revokeObjectURL(newPreviewUrl); // Libera la memoria utilizada por la URL anterior
      };
    }
  }, [petImage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files)
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData({
        ...formData,
        photo: "file" // Aquí, "file" es solo un marcador, no estás enviando el archivo real
      });
      setPetImage(file);
      setError(prevError => ({ ...prevError, photo: null }));
    } else {
      setError(prevError => ({ ...prevError, photo: 'Por favor, selecciona una imagen válida' }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validationForCreate(formData);
    setError(validateErrors);
  
    if (Object.keys(validateErrors).length === 0 && petImage) {
      setUploading(true);
      try {
        const formDataWithImage = new FormData();
        formDataWithImage.append('photo', petImage); // Aquí se agrega el archivo real
        formDataWithImage.append('status', formData.status);
        formDataWithImage.append('name', formData.name);
        formDataWithImage.append('species', formData.species);
        formDataWithImage.append('age', formData.age);
        formDataWithImage.append('size', formData.size);
        formDataWithImage.append('breed', formData.breed);
        formDataWithImage.append('energyLevel', formData.energyLevel);
        formDataWithImage.append('okWithPets', formData.okWithPets);
        formDataWithImage.append('okWithKids', formData.okWithKids);
        formDataWithImage.append('history', formData.history);
        formDataWithImage.append('gender', formData.gender);
  
        await dispatch(createPet(formDataWithImage));
        setShowNotification(true); //agregado
  
        setFormData({
          status: 'available',
          photo: '', // Esta propiedad ya no es necesaria aquí
          name: '',
          species: '',
          age: '',
          size: '',
          breed: '',
          energyLevel: '',
          okWithPets: false,
          okWithKids: false,
          history: '',
          gender: '',
        });
        setPetImage(null);
        setPreviewUrl(null); // Limpiar la vista previa de la imagen
        document.querySelector('input[name="photo"]').value = ''; // Limpiar el campo de archivo
      } catch (err) {
        setError(prevError => ({ ...prevError, global: 'Error al ingresar la mascota: ' + err.message }));
      } finally {
        setUploading(false);
      }
    }
  };
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className='section-full-screen-container-create'>
      <div className="full-screen-container-create">
        <div className="create-pet-container">
          <h1>Crea una nueva mascota</h1>
          {error.global && <p className="error-message">{error.global}</p>}
          <form className="create-pet-form" onSubmit={handleSubmit}>
            {/* Status */}
            <label>
              Estado
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={error.status ? 'error' : ''}
              >
                <option value="available">Disponible</option>
                <option value="adopted">Adoptado</option>
                <option value="onHold">En espera</option>
                <option value="inactive">Inactivo</option>
              </select>
            </label>
            {error.status && <div className="error-tooltip"><p className="error-text">{error.status}</p><div className="error-arrow"></div></div>}

            {/* Photo */}
            <label>
              Foto
              <div class="file-upload-container">
              <button class="custom-button">Seleccionar</button>
              <input
                type="file"
                name="photo"
                onChange={handleImageChange}
                className={error.photo ? 'error' : ''}
              />
              </div>
            {error.photo && (
              <div className="error-tooltip">
                <p className="error-text">{error.photo}</p>
                <div className="error-arrow"></div></div>
                )}
             {previewUrl && <img src={previewUrl} alt="Pet" className="pet-preview-image" />}
            </label>
            {/* Name */}
            <label>
              Nombre
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                className={error.name ? 'error' : ''}
              />
            </label>
            {error.name && (
              <div className="error-tooltip">
                <p className="error-text">{error.name}</p>
                <div className="error-arrow"></div>
              </div>
            )}

            {/* Species */}
            <label>
              Especie
              <select
                name="species"
                value={formData.species}
                onChange={handleChange}
                className={error.species ? 'error' : ''}
              >
                <option value="">Selecciona especie</option>
                <option value="cat">Gato</option>
                <option value="dog">Perro</option>
              </select>
            </label>
            {error.species && (
              <div className="error-tooltip">
                <p className="error-text">{error.species}</p>
                <div className="error-arrow"></div>
              </div>
            )}

            {/* Age */}
            <label>
              Edad
              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={error.age ? 'error' : ''}
              >
                <option value="">Selecciona etapa de vida</option>
                <option value="puppy">Cachorro</option>
                <option value="young">Joven</option>
                <option value="adult">Adulto</option>
                <option value="elder">Anciano</option>
              </select>
            </label>
            {error.age && (
              <div className="error-tooltip">
                <p className="error-text">{error.age}</p>
                <div className="error-arrow"></div>
              </div>
            )}

            {/* Size */}
            <label>
              Tamaño
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className={error.size ? 'error' : ''}
              >
                <option value="">Selecciona tamaño</option>
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
              </select>
            </label>
            {error.size && (
              <div className="error-tooltip">
                <p className="error-text">{error.size}</p>
                <div className="error-arrow"></div>
              </div>
            )}

            {/* Breed */}
            <label>
              Raza
              <input
                type="text"
                name="breed"
                placeholder="Raza"
                value={formData.breed}
                onChange={handleChange}
              />
            </label>

            {/* Energy Level */}
            <label>
              Nivel de energía
              <select
                name="energyLevel"
                value={formData.energyLevel}
                onChange={handleChange}
              >
                <option value="">Selecciona nivel de energía</option>
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </label>
            {error.energyLevel && (
              <div className="error-tooltip">
                <p className="error-text">{error.energyLevel}</p>
                <div className="error-arrow"></div>
              </div>
            )}

            {/* Gender */}
            <label>
              Género
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Selecciona género</option>
                <option value="female">Hembra</option>
                <option value="male">Macho</option>
              </select>
            </label>
            {error.gender && (
              <div className="error-tooltip">
                <p className="error-text">{error.gender}</p>
                <div className="error-arrow"></div>
              </div>
            )}

            {/* Checkboxes */}
            <div className="create-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="okWithPets"
                  checked={formData.okWithPets}
                  onChange={handleChange}
                />
                Bueno con mascotas
              </label>
              <label>
                <input
                  type="checkbox"
                  name="okWithKids"
                  checked={formData.okWithKids}
                  onChange={handleChange}
                />
                Bueno con niños
              </label>
            </div>

            {/* History */}
            <label>
              Historia (Opcional)
              <textarea
                name="history"
                placeholder="Historia"
                value={formData.history}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className='button' disabled={uploading}>
              {uploading ? 'Subiendo...' : 'Crear'}
            </button>
          </form>
        </div>
      </div>
      {showNotification && (
        <Notification message="¡Mascota creada exitosamente! 🐾" onClose={handleCloseNotification} />
      )}

    </div>
  );
};

export default CreatePet;
