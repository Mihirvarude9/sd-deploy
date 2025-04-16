import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Get root element
const container = document.getElementById('root');

// ✅ Ensure it's not null (TypeScript-safe)
if (!container) {
  throw new Error("Root element not found. Make sure there is a div with id='root' in your index.html.");
}

// ✅ Now safely pass to createRoot
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
