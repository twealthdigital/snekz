import { mobileLinks } from '../data/nav'

export default function MobileNav({ section, dark, authOpen, onAccount }) {
  // follows the section on screen: home, shop, collections, for you
  const active = { home: 'home', shop: 'shop', 'new-collection': 'collections', 'for-you': 'for-you', join: 'contact' }[section]

  return (
    <nav
      aria-label="Mobile"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden"
    >
      <ul
        className={`flex items-center gap-0.5 rounded-full p-1 backdrop-blur-xl transition-colors duration-500 ${
          dark
            ? 'bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ring-1 ring-black/10'
            : 'bg-ink/95 shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
        }`}
      >
        {mobileLinks.map(({ id, label, href, icon: Icon }) => {
          const isAccount = id === 'account'
          const Tag = isAccount ? 'button' : 'a'
          const isActive = authOpen ? isAccount : active === id
          return (
            <li key={id}>
              <Tag
                {...(isAccount
                  ? { type: 'button', 'aria-haspopup': 'dialog', 'aria-expanded': !!authOpen, onClick: (e) => onAccount?.(e.currentTarget) }
                  : { href })}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative flex h-12 items-center rounded-full px-1.5 transition-all duration-300 min-[340px]:px-2 min-[380px]:px-2.5 min-[400px]:px-3 ${
                  isActive
                    ? dark
                      ? 'bg-ink text-white'
                      : 'bg-white text-ink'
                    : dark
                      ? 'text-ink/60 hover:bg-black/10 hover:text-ink'
                      : 'text-white/70 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon size={20} strokeWidth={2.2} />

                {/* label slides out beside the icon on hover / when active */}
                <span
                  className={`overflow-hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'ml-2 max-w-[5.5rem] opacity-100'
                      : 'max-w-0 opacity-0 group-hover:ml-2 group-hover:max-w-[5.5rem] group-hover:opacity-100'
                  }`}
                >
                  {label}
                </span>

              </Tag>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}