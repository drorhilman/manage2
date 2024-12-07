import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Updated import path
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);