import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'
import LanguageProvider from './context/LanguageProvider.jsx'

const rootElement = document.getElementById('root')

// Build'da sahifa HTML i oldindan tayyorlanadi (scripts/prerender.js) — uni "jonlantiramiz".
// Dev rejimida #root bo'sh, shuning uchun noldan chizamiz
const isPrerendered = Boolean(rootElement.firstElementChild)

const app = (
  <StrictMode>
    <ThemeProvider>
      {/* Tayyor sahifaning tili <html lang> da — hydration server HTML i bilan aynan mos bo'lishi uchun */}
      <LanguageProvider initialLang={isPrerendered ? document.documentElement.lang : undefined}>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
)

if (isPrerendered) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
