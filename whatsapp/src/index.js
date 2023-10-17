import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppContextProvider from './context/AppContext';
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="898074623172-28jj4tvp9o0fjrvbvth4fbugfoak0ril.apps.googleusercontent.com">
    <AppContextProvider>
      <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppContextProvider>
  </GoogleOAuthProvider>
  
      
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
