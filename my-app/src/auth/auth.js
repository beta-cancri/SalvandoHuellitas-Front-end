import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
const clientId = '1092527296947-6aebqgtuhuujsgkpll0efhpolndl1vvk.apps.googleusercontent.com';
const redirectUri = 'https://salvandohuellitas-front-end-production-5e5d.up.railway.app/home'; // Change to your frontend URL and endpoint

export function iniciarAutenticacion() {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=email profile`;
  window.location.href = url;
}


export function manejarRedireccion() {
  
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');
    console.log('Access Token:', accessToken);

    // Store the token in local storage (optional)
    if (accessToken) {
      axios.post("/auth/google/", {
        token: accessToken,
      }).then(response => {
        localStorage.setItem("jwt", response.data.token)
        var decoded = jwtDecode(response.data.token);
        localStorage.setItem("user",JSON.stringify(decoded));
        window.location= "/home";
      }).catch(error => {
        console.log(error)
      })
    }
  }
