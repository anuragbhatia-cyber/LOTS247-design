import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { UDrivePage } from './UDrivePage'
import { App } from './App'

// Toggle between landing variants via URL.
//   /          → original LOTS247 landing (App.tsx)
//   /?new      → new UDrive landing (UDrivePage.tsx)
const useNew = new URLSearchParams(window.location.search).has('new')
const Page = useNew ? UDrivePage : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
