import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const sendDataToBackend = async (data) => {
  try {
    const response = await axios.post('https://commentbox-server-2.onrender.com/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error sending data to the backend:', error);
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <App sendDataToBackend={sendDataToBackend}></App>
  </React.StrictMode>
);


