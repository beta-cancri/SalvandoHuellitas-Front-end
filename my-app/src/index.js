import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter
import axios from 'axios';

let backendBaseUrl = 'http://localhost:3001'
//'https://salvandohuellitas-back-end-production.up.railway.app'

if(!backendBaseUrl){
    backendBaseUrl = 'https://salvandohuellitas-back-end-production.up.railway.app'
}

axios.defaults.baseURL = backendBaseUrl;


const root = ReactDOM.createRoot(document.getElementById('root')); // Usa createRoot en lugar de render

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
