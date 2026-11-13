import { useEffect, useRef, useState } from 'react'
import { Search, ShoppingBag, User, LayoutGrid, X } from 'lucide-react'
import logoDark from '../assets/logo-dark.png'
import logoWhite from '../assets/logo-white.png'

const links = [
  { label: 'Shop', href: '#shop' },
  { label: 'All Products', href: '#shop' },
  { label: 'New Collection', href: '#new-collection' },
  { label: 'For You', href: '#for-you' },
]

const iconBtn = 'relative grid h-9 w-9 place-items-center rounded-full transition hover:opacity-60'

// Logo sits inside the black top notch (white version via invert)
export function NotchLogo() {
  return (
    <a href="#home" aria-label="SNEKZ home" className="notch-logo">
      {/* if your logo is already cropped tight, change scale-[2.2] to scale-100 */}
      <img src={logoDark} alt="SNEKZ" className="logo-dark absolute inset-0 h-full w-full scale-[2.2] object-contain" />
      <img src={logoWhite} alt="" aria-hidden className="logo-white absolute inset-0 h-full w-full scale-[2.2] object-contain" />
    </a>
  )
}

// Search: a circle drops from the icon into the page, then widens into a search bar.
// It takes the opposite colour of the page (black on white, white on black).
function SearchDrop({ open, x, y, dark, onClose }) {
  const [phase, setPhase] = useState(-1) // -1 gone, 0 at the icon, 1 dropped circle, 2 search bar
  const inputRef = useRef(null)

  useEffect(() => {
    const timers = []
    const later = (fn, ms) => timers.push(setTimeout(fn, ms))
    if (open) {
      later(() => setPhase(1), 50)
      later(() => setPhase(2), 520)
    } else {
      later(() => setPhase((p) => (p === -1 ? -1 : 1)), 0)
      later(() => setPhase((p) => (p === -1 ? -1 : 0)), 380)
      later(() => setPhase((p) => (p === 0 ? -1 : p)), 900)
    }
    return () => timers.forEach(clearTimeout)
  }, [open])

  useEffect(() => {
    if (phase === 2 && open) inputRef.current?.focus()
  }, [phase, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open && phase === -1) return null

  return (
    <div
      className={`search-layer ${dark ? 'hero-dark' : 'hero-light'}`}
      data-phase={phase === -1 ? 0 : phase}
      style={{ '--cx': `${x}px`, '--cy': `${y}px` }}
    >
      <div className="search-dim" onClick={onClose} />
      <form
        role="search"
        className="search-pill"
        onSubmit={(e) => {
          e.preventDefault()
          onClose()
        }}
      >
        <Search size={20} className="search-in shrink-0" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search sneakers"
          aria-label="Search sneakers"
          className="search-in search-input"
        />
        <button type="button" onClick={onClose} aria-label="Close search" className="search-in search-close">
          <X size={18} />
        </button>
      </form>
    </div>
  )
}

// One header for the whole page: logo notch + nav, fixed at the top
export function FixedHeader({ cartCount, dark, scrolled, onCart, onAccount }) {
  const [search, setSearch] = useState({ open: false, x: 0, y: 28 })

  const openSearch = (el) => {
    const r = el.getBoundingClientRect()
    setSearch({ open: true, x: r.left + r.width / 2, y: r.top + r.height / 2 })
  }
  const closeSearch = () => setSearch((s) => ({ ...s, open: false }))

  return (
    <>
      <header
        className={`site-header ${scrolled ? 'site-header-in' : ''} ${dark ? 'hero-dark' : 'hero-light'}`}
      >
        <div className="site-notch" />
        <NotchLogo />
        <div className="relative mx-[7px] mt-[7px]">
          <HeaderBar cartCount={cartCount} onSearch={openSearch} onCart={onCart} onAccount={onAccount} />
        </div>
      </header>
      <SearchDrop open={search.open} x={search.x} y={search.y} dark={dark} onClose={closeSearch} />
    </>
  )
}

// Nav links left, icons right (inside the light area)
export default function HeaderBar({ cartCount, onSearch, onCart, onAccount }) {
  return (
    <div className="relative z-20 flex h-14 items-center justify-between px-4 lg:absolute lg:inset-x-0 lg:top-0 lg:px-[3.5%]">
      <div className="flex items-center">
        <button
          className={`${iconBtn} lg:hidden`}
          aria-label="Search"
          onClick={(e) => onSearch?.(e.currentTarget)}
        >
          <Search size={19} />
        </button>
        <nav className="hidden items-center gap-4 text-[11px] font-medium uppercase tracking-wide lg:flex xl:gap-7 xl:text-[13px]">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="transition hover:opacity-60">
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-1">
        <button
          className={`${iconBtn} hidden lg:grid`}
          aria-label="Search"
          onClick={(e) => onSearch?.(e.currentTarget)}
        >
          <Search size={19} />
        </button>
        <button className={iconBtn} aria-label="Cart" onClick={() => onCart?.()}>
          <ShoppingBag size={19} />
          {cartCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
        <button
          className={`${iconBtn} hidden md:grid`}
          aria-label="Account"
          aria-haspopup="dialog"
          onClick={(e) => onAccount?.(e.currentTarget)}
        >
          <User size={19} />
        </button>
        <button className={`${iconBtn} hidden lg:grid`} aria-label="Menu">
          <LayoutGrid size={19} />
        </button>
      </div>
    </div>
  )
}