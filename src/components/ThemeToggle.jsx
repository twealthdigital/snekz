import { Sun, Moon } from 'lucide-react'

// Light / dark switch. Fixed to the screen, so it is there in every section.
export default function ThemeToggle({ dark, scrolled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle light / dark"
      aria-pressed={dark}
      className={`${dark ? 'hero-dark' : 'hero-light'} theme-toggle ${scrolled ? 'drop-in fixed' : 'absolute'} right-14 top-3 z-[42] flex h-8 w-[64px] items-center justify-between rounded-full bg-[var(--frame)] p-1 ring-1 ring-[var(--line)] md:fixed md:bottom-6 md:left-6 md:right-auto md:top-auto lg:bottom-[5%] lg:left-[10%]`}
    >
      <span
        aria-hidden
        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-[var(--frame-fg)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          dark ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
      <span
        className={`relative grid h-6 w-6 place-items-center transition duration-300 ${
          !dark ? 'text-[var(--frame)]' : 'text-[var(--frame-fg)] opacity-60'
        }`}
      >
        <Sun size={14} />
      </span>
      <span
        className={`relative grid h-6 w-6 place-items-center transition duration-300 ${
          dark ? 'text-[var(--frame)]' : 'text-[var(--frame-fg)] opacity-60'
        }`}
      >
        <Moon size={14} />
      </span>
    </button>
  )
}
