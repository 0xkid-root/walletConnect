import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppKitProviders } from './context/appkit.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppKitProviders>
      <App />
    </AppKitProviders>
  </StrictMode>,
)