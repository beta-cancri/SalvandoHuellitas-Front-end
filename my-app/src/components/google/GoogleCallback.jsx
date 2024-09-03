import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Asegúrate de importar axios

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleRedirect = () => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = params.get('access_token');

        if (accessToken) {
            console.log('Access Token:', accessToken);
            localStorage.setItem('accessToken', accessToken);

            // Aquí podrías hacer una petición al backend para obtener información del usuario
            axios.get('/user/profile', {
                headers: { Authorization: `Bearer ${accessToken}` }  // Corregido aquí
            }).then(response => {
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/home');
            }).catch(error => {
                console.error('Error fetching user profile:', error);
                navigate('/login');
            });

        } else {
            navigate('/login');
        }
    };

    handleGoogleRedirect();
  }, [navigate]);

  return (
    <div>
      <p>Autenticando...</p>
    </div>
  );
};

export default GoogleCallback;
