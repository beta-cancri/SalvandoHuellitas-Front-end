import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
const clientId = '1092527296947-6aebqgtuhuujsgkpll0efhpolndl1vvk.apps.googleusercontent.com';
let baseUrl = process.env.REACT_APP_FRONT_END_BASE_URL;
if (!baseUrl){
    baseUrl = 'https://salvandohuellitas-front-end-production-5e5d.up.railway.app'
}

const redirectUri = `${baseUrl}/home`; // Change to your frontend URL and endpoint

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
        
        let redirectPath = localStorage.getItem('afterLogin')
      
        if (redirectPath) {
          localStorage.removeItem('afterLogin')
          window.location = redirectPath 
          } else { window.location = "/home";
          }
      }).catch(error => {
        console.log(error)
      })
    }
  }
