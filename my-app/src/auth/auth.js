const clientId = '1092527296947-6aebqgtuhuujsgkpll0efhpolndl1vvk.apps.googleusercontent.com'; 
const redirectUri = 'http://localhost:3001/auth/google'; // Change to your frontend URL and endpoint

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
    localStorage.setItem('accessToken', accessToken);
    // Optionally, redirect to a protected page
    window.location.href = '/home'; // Redirect to a protected route after login
  }
}
