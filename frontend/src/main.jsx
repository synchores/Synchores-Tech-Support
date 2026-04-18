import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import './styles/index.css'
import App from './App.jsx'
import client from './services/apolloClient';
import { ApolloProvider } from '@apollo/client/react';
import { Toaster } from 'sileo';
import { AuthProvider } from './context/authContext.jsx';
import { OrderProvider } from './context/OrderContext.jsx';

const storedTheme = localStorage.getItem('synchores-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const resolvedTheme = storedTheme || (prefersDark ? 'dark' : 'light');

document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <OrderProvider>
          <Toaster position="top-right" offset={{ top: 96, right: 20 }} />
          <App />
        </OrderProvider>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
)
