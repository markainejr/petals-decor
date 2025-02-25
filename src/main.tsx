import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import './index.css';

// Initialize Google Analytics
ReactGA.initialize('G-50XR2C2KY4'); // Replace with your Google Analytics measurement ID

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);
