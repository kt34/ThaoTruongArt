import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Block right-click "Save image as…" and drag-to-desktop on photos
const isImage = (e: Event) => e.target instanceof HTMLImageElement
document.addEventListener('contextmenu', (e) => isImage(e) && e.preventDefault())
document.addEventListener('dragstart', (e) => isImage(e) && e.preventDefault())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
