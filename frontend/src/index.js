import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApplicationsContextProvider } from './context/ApplicationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApplicationsContextProvider>
      <App />
    </ApplicationsContextProvider>
  </React.StrictMode>
);


