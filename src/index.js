import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { ApiKeyContextProvider } from './contexts/apiKeyContext';

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <>
    <ApiKeyContextProvider>
      <App />
    </ApiKeyContextProvider>
  </>
);
