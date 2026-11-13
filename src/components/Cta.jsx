import { ArrowRight, Bell, Heart, Zap } from 'lucide-react'

const perks = [
  { icon: Heart, label: 'Save your favourites' },
  { icon: Zap, label: 'Faster checkout' },
  { icon: Bell, label: 'First look at drops' },
]

// Last section: invite people to make an account. Both buttons open the auth box.
export default function Cta({ dark, onJoin, onSignIn }) {
  return (
    <section
      id="join"
      aria-label="Join SNEKZ"
      className={`${dark ? 'hero-dark' : 'hero-light'} hero-frame hero-join-top shop-section`}
    >
      <div className="shop-panel panel-bg relative overflow-hidden px-5 pb-28 pt-20 text-center lg:rounded-b-[22px] lg:px-[8%] lg:pb-24 lg:pt-28">
        {/* ghost word */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[46vw] font-black uppercase italic leading-none tracking-tighter text-[var(--ghost)] lg:text-[24vw]"
        >
          Join
        </span>

        <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center">
          <span className="inline-block -skew-x-12 bg-accent px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">
            Members
          </span>
          <h2 className="mt-4 text-[3.4rem] font-black uppercase italic leading-[0.88] tracking-tighter md:text-7xl lg:text-[6vw]">
            Join
            <br />
            <span className="outline-text">the pack</span>
          </h2>
          <p className="mt-5 max-w-[360px] text-[12px] font-bold uppercase leading-relaxed tracking-[0.16em] opacity-70">
            Make an account and keep your pairs close.
          </p>

          <div className="mt-9 flex flex-col items-center gap-6">
            <button type="button" onClick={onJoin} className="btn-classic inline-flex">
              <span>
                Create account
                <ArrowRight size={18} strokeWidth={2.6} />
              </span>
            </button>
            <button
              type="button"
              onClick={onSignIn}
              className="text-[11px] font-black uppercase tracking-[0.2em] underline underline-offset-4 transition hover:text-accent"
            >
              Already a member? Sign in
            </button>
          </div>

          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-[var(--line)] pt-8">
            {perks.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] opacity-70"
              >
                <Icon size={16} strokeWidth={2.2} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
