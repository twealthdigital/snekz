import { Search, ShoppingBag, User, LayoutGrid } from 'lucide-react'
import logo from '../assets/logo.png'

const links = ['Shop', 'All Products', 'New Collection']

const iconBtn = 'relative grid h-9 w-9 place-items-center rounded-full transition hover:opacity-60'

// Logo sits inside the black top notch (white version via invert)
export function NotchLogo() {
  return (
    <a href="#home" aria-label="SNEKZ home" className="notch-logo">
      {/* if your logo is already cropped tight, change scale-[2.2] to scale-100 */}
      <img src={logo} alt="SNEKZ" className="h-full w-full scale-[2.2] object-contain" />
    </a>
  )
}

// Nav links left, icons right (inside the light area)
export default function HeaderBar({ cartCount }) {
  return (
    <div className="relative z-20 flex h-14 items-center justify-between px-4 lg:absolute lg:inset-x-0 lg:top-0 lg:px-[3.5%]">
      <div className="flex items-center">
        <button className={`${iconBtn} lg:hidden`} aria-label="Search">
          <Search size={19} />
        </button>
        <nav className="hidden items-center gap-4 text-[11px] font-medium uppercase tracking-wide lg:flex xl:gap-7 xl:text-[13px]">
          {links.map((l) => (
            <a key={l} href="#shop" className="transition hover:opacity-60">
              {l}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-1">
        <button className={`${iconBtn} hidden lg:grid`} aria-label="Search">
          <Search size={19} />
        </button>
        <button className={iconBtn} aria-label="Cart">
          <ShoppingBag size={19} />
          {cartCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
        <button className={`${iconBtn} hidden lg:grid`} aria-label="Account">
          <User size={19} />
        </button>
        <button className={`${iconBtn} hidden lg:grid`} aria-label="Menu">
          <LayoutGrid size={19} />
        </button>
      </div>
    </div>
  )
}