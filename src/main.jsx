import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Polices auto-hébergées (@fontsource, pas de CDN externe) : Inter pour le
// corps de texte, Poppins pour les titres — voir --font-sans/--font-heading
// dans index.css.
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
