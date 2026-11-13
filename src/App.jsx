import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import NewCollection from './components/NewCollection'
import MobileNav from './components/MobileNav'
import CartPanel from './components/CartPanel'
import { FixedHeader } from './components/Header'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [cart, setCart] = useState([]) // [{ id, color, qty }]
  const [cartOpen, setCartOpen] = useState(false)
  const cartCount = cart.reduce((n, i) => n + i.qty, 0)

  const addToCart = ({ id, color }) =>
    setCart((c) => {
      const hit = c.find((i) => i.id === id && i.color === color)
      return hit
        ? c.map((i) => (i === hit ? { ...i, qty: Math.min(9, i.qty + 1) } : i))
        : [...c, { id, color, qty: 1 }]
    })
  const changeQty = (id, color, d) =>
    setCart((c) =>
      c.map((i) => (i.id === id && i.color === color ? { ...i, qty: Math.min(9, Math.max(1, i.qty + d)) } : i)),
    )
  const removeItem = (id, color) => setCart((c) => c.filter((i) => !(i.id === id && i.color === color)))
  const clearCart = () => setCart([])
  const [dark, setDark] = useState(false)
  const [overCollection, setOverCollection] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // the fixed header takes the collection's light/dark look once it is scrolled over it
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('new-collection')
      if (el) setOverCollection(el.getBoundingClientRect().top <= window.innerHeight * 0.55)
      // phones: the first header scrolls away on its own, the new one drops in once it has left
      setScrolled(window.scrollY > (window.innerWidth < 768 ? 64 : 10))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <FixedHeader cartCount={cartCount} dark={dark} scrolled={scrolled} onCart={() => setCartOpen(true)} />
      <div className={`frame-sides ${dark ? 'hero-dark' : 'hero-light'}`} aria-hidden>
        <i className="frame-side frame-side-l" />
        <i className="frame-side frame-side-r" />
      </div>
      <ThemeToggle dark={dark} scrolled={scrolled} onToggle={() => setDark((d) => !d)} />
      <main>
        <Hero dark={dark} />
        <NewCollection
          onAddToCart={addToCart}
          dark={dark}
          arrowsOn={overCollection}
        />
      </main>
      <MobileNav cartCount={cartCount} onCart={() => setCartOpen(true)} />
      <CartPanel
        open={cartOpen}
        dark={dark}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
        onRemove={removeItem}
        onClear={clearCart}
      />
    </>
  )
}