import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Shop from './components/Shop'
import NewCollection from './components/NewCollection'
import ForYou from './components/ForYou'
import MobileNav from './components/MobileNav'
import CartPanel from './components/CartPanel'
import AuthDrop from './components/AuthDrop'
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
  const [auth, setAuth] = useState({ open: false, x: 0, y: 28, ib: 44, mode: 'desktop' })
  // phones pop the box up from the tab bar, bigger screens drop it from the header
  const openAuth = (el) => {
    const r = el.getBoundingClientRect()
    const mode = window.innerWidth < 768 ? 'mobile' : 'desktop'
    setAuth({
      open: true,
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
      ib: document.documentElement.clientHeight - (r.top + r.height / 2),
      mode,
    })
  }
  const closeAuth = () => setAuth((a) => ({ ...a, open: false }))
  const [overCollection, setOverCollection] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [section, setSection] = useState('home') // the section currently on screen

  // the fixed header takes the collection's light/dark look once it is scrolled over it
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('new-collection')
      const fy = document.getElementById('for-you')
      if (el) {
        const h = window.innerHeight
        // the collection's side arrows hide once the For You section takes over the screen
        setOverCollection(el.getBoundingClientRect().top <= h * 0.55 && !(fy && fy.getBoundingClientRect().top <= h * 0.45))
      }
      // phones: the first header scrolls away on its own, the new one drops in once it has left
      setScrolled(window.scrollY > (window.innerWidth < 768 ? 64 : 10))

      // active section: the last one whose top has passed 40% of the screen (last one at the page bottom)
      const ids = ['home', 'shop', 'new-collection', 'for-you']
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let current = ids[0]
      for (const id of ids) {
        const sec = document.getElementById(id)
        if (sec && sec.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id
      }
      setSection(atBottom ? ids[ids.length - 1] : current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <FixedHeader section={section} cartCount={cartCount} dark={dark} scrolled={scrolled} onCart={() => setCartOpen(true)} onAccount={openAuth} />
      <div className={`frame-sides ${dark ? 'hero-dark' : 'hero-light'}`} aria-hidden>
        <i className="frame-side frame-side-l" />
        <i className="frame-side frame-side-r" />
      </div>
      <ThemeToggle dark={dark} scrolled={scrolled} onToggle={() => setDark((d) => !d)} />
      <main>
        <Hero dark={dark} />
        <Shop dark={dark} onAddToCart={addToCart} />
        <NewCollection
          onAddToCart={addToCart}
          dark={dark}
          arrowsOn={overCollection}
        />
        <ForYou dark={dark} />
      </main>
      <MobileNav section={section} dark={dark} authOpen={auth.open} onAccount={openAuth} />
      <AuthDrop {...auth} dark={dark} onClose={closeAuth} />
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