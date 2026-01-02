import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrandThemeProvider } from '@/theme';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrandThemeProvider>
      <App />
    </BrandThemeProvider>
  </React.StrictMode>
);
