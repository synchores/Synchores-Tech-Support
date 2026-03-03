import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import client from './services/apolloClient';
import { ApolloProvider } from '@apollo/client/react';
import { Toaster } from 'sileo';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Toaster position="top-right" offset={{ top: 96, right: 20 }} />
      <App />
    </ApolloProvider>
  </StrictMode>,
)
