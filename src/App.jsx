import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import NewCollection from './components/NewCollection'
import MobileNav from './components/MobileNav'
import { FixedHeader } from './components/Header'

export default function App() {
  const [cartCount, setCartCount] = useState(0)
  const [dark, setDark] = useState(false)
  const [overCollection, setOverCollection] = useState(false)

  // the fixed header takes the collection's light/dark look once it is scrolled over it
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('new-collection')
      if (el) setOverCollection(el.getBoundingClientRect().top <= 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <FixedHeader cartCount={cartCount} dark={dark && overCollection} />
      <main>
        <Hero />
        <NewCollection
          onAddToCart={() => setCartCount((c) => c + 1)}
          dark={dark}
          setDark={setDark}
        />
      </main>
      <MobileNav cartCount={cartCount} />
    </>
  )
}