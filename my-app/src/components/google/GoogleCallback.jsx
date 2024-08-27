import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleGoogleRedirect = () => {
            // Extract the access token from the URL fragment (hash)
            const params = new URLSearchParams(window.location.hash.substring(1)); // Removes the '#' at the start of the hash
            const accessToken = params.get('access_token');

            if (accessToken) {
                console.log('Access Token:', accessToken);
                // Store the access token in localStorage or sessionStorage
                localStorage.setItem('accessToken', accessToken);

                // Optionally, redirect to a protected page
                navigate('/home');
            } else {
                // If no token is found, redirect to login
                navigate('/login');
            }
        };

        handleGoogleRedirect();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
