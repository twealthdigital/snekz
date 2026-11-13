import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wght.css'
import '@fontsource-variable/archivo/wght-italic.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// dark loading screen: leaves once the fonts and the hero shoe are ready (never later than 2.5s)
const boot = document.getElementById('boot')
if (boot) {
  const started = performance.now()
  const hero = new Image()
  hero.src = '/images/velocity.webp'
  const ready = Promise.all([
    document.fonts ? document.fonts.ready : null,
    hero.decode ? hero.decode().catch(() => {}) : null,
  ])
  const timeout = new Promise((r) => setTimeout(r, 2500))
  Promise.race([ready, timeout]).then(() => {
    const wait = Math.max(0, 450 - (performance.now() - started)) // no flash on a fast connection
    setTimeout(() => {
      boot.classList.add('hide')
      setTimeout(() => boot.remove(), 600)
    }, wait)
  })
}
