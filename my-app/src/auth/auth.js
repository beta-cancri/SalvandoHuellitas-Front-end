import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
const clientId = '1092527296947-6aebqgtuhuujsgkpll0efhpolndl1vvk.apps.googleusercontent.com';
const redirectUri = 'http://localhost:3000/home'; // Change to your frontend URL and endpoint

export function iniciarAutenticacion() {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=email profile`;
  window.location.href = url;
}


export function manejarRedireccion(setUser) {
  return () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');
    console.log('Access Token:', accessToken);

    // Store the token in local storage (optional)
    if (accessToken) {
      axios.post("http://localhost:3001/auth/google/", {
        token: accessToken,
      }).then(response => {
        localStorage.setItem("jwt", response.data.token)
        var decoded = jwtDecode(response.data.token);
        setUser(decoded)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}