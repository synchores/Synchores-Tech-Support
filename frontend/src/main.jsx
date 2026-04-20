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
          <Toaster
            position="top-right"
            offset={{ top: 96, right: 20 }}
            options={{
              fill: "#0f172a",
              roundness: 14,
              styles: {
                description: "!text-white",
                badge: "!bg-white/15",
                button: "!bg-white/12 !text-white hover:!bg-white/20",
              },
            }}
          />
          <App />
        </OrderProvider>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
)
