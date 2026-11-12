import { ArrowRight, Feather, Layers, Zap } from 'lucide-react'
import ImageSlot from './ImageSlot'
 
import { products } from '../data/products'

const perks = [
  { icon: Feather, label: 'Ultra lightweight' },
  { icon: Layers, label: 'Premium cushioning' },
  { icon: Zap, label: 'All-day performance' },
]

export default function Hero({ dark }) {
  const { price } = products[0]

  return (
    <section id="home" aria-label="Velocity" className={`${dark ? 'hero-dark' : 'hero-light'} hero-frame hero-join-bottom`}>
 

      <div className="frame-clip-top panel-bg relative min-h-[calc(100svh-7px)] overflow-hidden rounded-t-[22px] pb-16 pt-14 lg:h-full lg:min-h-0 lg:pb-0 lg:pt-0">
 

        {/* stage: ghost word, slash, speed lines, shoe */}
        <div className="relative mx-auto mt-1 aspect-[4/3] w-full max-w-[520px] lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:max-w-none">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[24vw] font-black uppercase italic leading-none tracking-tighter text-[var(--ghost)] lg:top-[48%] lg:text-[17vw]"
          >
            Velocity
          </span>

          {/* one soft slash behind the shoe */}
          <div
            aria-hidden
            className="absolute -top-[10%] right-[10%] hidden h-[125%] w-[20%] -skew-x-[18deg] bg-[var(--ghost)] lg:block"
          />

          {/* speed lines trailing the heel */}
          {[
            ['top-[46%]', 'left-[2%] w-[20%] lg:left-[27%] lg:w-[11%]', '0s'],
            ['top-[54%]', 'left-[0%] w-[26%] lg:left-[24%] lg:w-[14%]', '0.3s'],
            ['top-[62%]', 'left-[6%] w-[14%] lg:left-[30%] lg:w-[8%]', '0.6s'],
          ].map(([top, pos, delay]) => (
            <span
              key={top}
              aria-hidden
              style={{ animationDelay: delay }}
              className={`hero-streak absolute h-[3px] rounded-full bg-[var(--fg)] ${top} ${pos}`}
            />
          ))}

          {/* price badge, same round style as the 360 button below */}
          <div className="absolute right-3 top-3 z-10 grid h-20 w-20 -rotate-6 place-items-center rounded-full border-2 border-[var(--fg)] text-center lg:right-auto lg:left-[38%] lg:top-[12%] lg:h-28 lg:w-28">
            <div className="leading-none">
              <span className="block text-[9px] font-black uppercase tracking-[0.2em] opacity-70">From</span>
              <span className="block text-2xl font-black italic tracking-tighter lg:text-3xl">{price}</span>
            </div>
          </div>

          {/* shoe: floats a little, shadow breathes under it */}
          <div className="absolute inset-0 lg:left-[38%] lg:top-[16%] lg:h-[62%] lg:w-[58%] lg:inset-auto">
            <div className="shoe-in h-full w-full">
              <span
                aria-hidden
                className="hero-shadow absolute bottom-[2%] left-[14%] h-[7%] w-[72%] rounded-[50%] bg-black blur-xl"
              />
              <div className="hero-float h-full w-full">
                <ImageSlot
                  src="/images/velocity.png"
                  alt="Velocity V1 sneaker"
                  className="h-full w-full drop-shadow-[0_18px_18px_rgba(0,0,0,0.18)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* copy + button + perks */}
        <div className="relative z-20 mx-5 mt-4 flex flex-col gap-8 lg:absolute lg:bottom-[11%] lg:left-[8%] lg:top-[14%] lg:mx-0 lg:mt-0 lg:justify-between lg:gap-0">
          <div className="count-in">
            <span className="inline-block -skew-x-12 bg-accent px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">
              New arrival
            </span>
            <h1 className="mt-3 text-5xl font-black uppercase italic leading-[0.88] tracking-tighter lg:text-[5vw]">
              Step
              <br />
              Into
              <br />
              <span className="outline-text">Motion</span>
            </h1>
            <p className="mt-4 max-w-[260px] text-[12px] font-bold uppercase tracking-[0.16em] opacity-70">
              Engineered for comfort. Designed for speed.
            </p>

            {/* the classic: skewed black block, orange offset, orange sweeps in on hover */}
            <a
              href="#new-collection"
              className="group relative mt-7 inline-flex -skew-x-12 items-center overflow-hidden bg-ink text-white shadow-[5px_5px_0_0_var(--color-accent)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[9px_9px_0_0_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-accent)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 ease-out group-hover:translate-x-0"
              />
              <span className="relative flex skew-x-12 items-center gap-3 px-7 py-3.5 text-xs font-black uppercase tracking-[0.2em]">
                Shop now
                <ArrowRight
                  size={18}
                  strokeWidth={2.6}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </span>
            </a>
          </div>

          <ul className="flex divide-x divide-[var(--line)]">
            {perks.map(({ icon: Icon, label }) => (
              <li key={label} className="flex max-w-[110px] flex-col gap-2 px-3 first:pl-0 lg:px-5">
                <Icon size={20} strokeWidth={1.6} />
                <span className="text-[10px] font-bold uppercase leading-tight tracking-[0.12em] opacity-70">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}