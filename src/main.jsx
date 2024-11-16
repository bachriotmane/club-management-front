import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './shared/context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
   <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>
)
