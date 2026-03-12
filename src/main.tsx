import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { useCheckInStore } from './store';
import './index.css';

const initializeApp = async () => {
  await useCheckInStore.getState().initialize();
};

initializeApp();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);