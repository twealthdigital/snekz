import { useState } from 'react'
import { mobileLinks } from '../data/nav'

export default function MobileNav({ cartCount, onCart }) {
  const [active, setActive] = useState('home')

  return (
    <nav
      aria-label="Mobile"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden"
    >
      <ul className="flex items-center gap-1 rounded-full bg-ink/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {mobileLinks.map(({ id, label, href, icon: Icon }) => {
          const isActive = active === id
          return (
            <li key={id}>
              <a
                href={href}
                onClick={(e) => {
                  if (id === 'cart') {
                    e.preventDefault()
                    onCart?.()
                    return
                  }
                  setActive(id)
                }}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative flex h-12 items-center rounded-full px-3.5 transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-ink'
                    : 'text-white/70 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon size={20} strokeWidth={2.2} />

                {/* label slides out beside the icon on hover / when active */}
                <span
                  className={`overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'ml-2 max-w-24 opacity-100'
                      : 'max-w-0 opacity-0 group-hover:ml-2 group-hover:max-w-24 group-hover:opacity-100'
                  }`}
                >
                  {label}
                </span>

                {id === 'cart' && cartCount > 0 && (
                  <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}