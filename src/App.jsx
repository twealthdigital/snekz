import { useState } from 'react'
import Hero from './components/Hero'
import NewCollection from './components/NewCollection'
import MobileNav from './components/MobileNav'

export default function App() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <>
      <main>
        <Hero cartCount={cartCount} />
        <NewCollection cartCount={cartCount} onAddToCart={() => setCartCount((c) => c + 1)} />
      </main>
      <MobileNav cartCount={cartCount} />
    </>
  )
}