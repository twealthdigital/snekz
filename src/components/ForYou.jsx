import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageSlot from './ImageSlot'
import { shopItems } from '../data/shop'

const n = shopItems.length

// signed distance from the active card, shortest way round (so the loop never jumps)
const offset = (i, active) => {
  let d = (((i - active) % n) + n) % n
  if (d > n / 2) d -= n
  return d
}

// how a card looks at distance d from the centre
const look = (d) => {
  const a = Math.abs(d)
  if (a === 0) return { s: 1, ry: 0, o: 1, z: 3 }
  if (a === 1) return { s: 0.82, ry: d > 0 ? 26 : -26, o: 0.6, z: 2 }
  if (a === 2) return { s: 0.7, ry: d > 0 ? 36 : -36, o: 0, z: 1 }
  return { s: 0.6, ry: d > 0 ? 42 : -42, o: 0, z: 0 }
}

export default function ForYou({ dark }) {
  const [active, setActive] = useState(0)
  const [hold, setHold] = useState(false) // hover / focus pauses the auto slide
  const [inView, setInView] = useState(false)
  const section = useRef(null)
  const drag = useRef({ x: 0, down: false, moved: false })

  const go = (i) => setActive(((i % n) + n) % n)
  const next = () => go(active + 1)
  const prev = () => go(active - 1)

  // only slide on its own while the section is on screen
  useEffect(() => {
    const el = section.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // auto move (the timer restarts after every manual change)
  useEffect(() => {
    if (hold || !inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setActive((i) => (i + 1) % n), 4500)
    return () => clearInterval(t)
  }, [hold, inView, active])

  const onDown = (e) => {
    drag.current = { x: e.clientX, down: true, moved: false }
  }
  const onMove = (e) => {
    if (drag.current.down && Math.abs(e.clientX - drag.current.x) > 10) drag.current.moved = true
  }
  const onUp = (e) => {
    if (!drag.current.down) return
    const dx = e.clientX - drag.current.x
    drag.current.down = false
    if (dx < -40) next()
    else if (dx > 40) prev()
  }

  return (
    <section
      id="for-you"
      ref={section}
      aria-label="Designs you may like"
      className={`${dark ? 'hero-dark' : 'hero-light'} hero-frame hero-join-top hero-join-bottom shop-section`}
    >
      <div className="shop-panel panel-bg relative overflow-hidden pb-10 pt-20 lg:pb-12 lg:pt-28">
        {/* ghost word */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-[3%] top-4 select-none whitespace-nowrap text-[30vw] font-black uppercase italic leading-none tracking-tighter text-[var(--ghost)] lg:text-[15vw]"
        >
          For you
        </span>

        {/* heading + counter */}
        <div className="relative z-10 flex items-end justify-between gap-6 px-5 lg:px-[8%]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] opacity-70">Picked for you</p>
            <h2 className="mt-3 text-[2.6rem] font-black uppercase italic leading-[0.88] tracking-tighter md:text-5xl lg:text-[4.4vw]">
              Designs
              <br />
              <span className="outline-text">you may like</span>
            </h2>
          </div>
          <div className="flex items-end gap-2">
            <span
              key={active}
              className="count-in outline-text text-[11vw] font-black italic leading-[0.9] md:text-[9vw] lg:text-[7vw]"
            >
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className="pb-2 text-sm font-black italic tracking-wide opacity-70 lg:pb-3">
              / {String(n).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* the carousel: every card sits in the same cell and slides by its distance from the centre */}
        <div
          className="fy-stage relative z-10 mt-10 grid lg:mt-14"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={() => setHold(false)}
        >
          {shopItems.map((it, i) => {
            const d = offset(i, active)
            const { s, ry, o, z } = look(d)
            return (
              <article
                key={it.id}
                aria-hidden={d !== 0}
                onClick={() => d !== 0 && !drag.current.moved && go(i)}
                style={{ '--d': d, '--s': s, '--ry': `${ry}deg`, opacity: o, zIndex: z }}
                className={`fy-card aspect-[3/4.4] w-[66vw] max-w-[290px] md:w-[300px] lg:w-[24vw] lg:max-w-[340px] ${
                  d === 0 ? '' : 'cursor-pointer'
                } ${Math.abs(d) > 1 ? 'pointer-events-none' : ''}`}
              >
                <div className="relative flex h-full w-full flex-col overflow-hidden border border-[var(--line)] bg-[var(--card)] backdrop-blur-sm">
                  <span
                    aria-hidden
                    className="outline-text absolute left-4 top-3 text-6xl font-black italic leading-none opacity-70"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative flex-1">
                    <div className="absolute inset-x-[3%] inset-y-[22%] -rotate-[12deg]">
                      <ImageSlot
                        src={it.image}
                        alt={`${it.name} in ${it.colour.name}`}
                        className="h-full w-full drop-shadow-[0_18px_16px_rgba(0,0,0,0.28)]"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[var(--line)] p-4 lg:p-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] opacity-60">{it.line}</p>
                    <h3 className="text-xl font-black uppercase italic leading-tight tracking-tight">{it.name}</h3>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider opacity-70">
                        <span
                          className="h-3 w-3 border border-[var(--line)]"
                          style={{ backgroundColor: it.colour.hex }}
                        />
                        {it.colour.name}
                      </span>
                      <span className="text-2xl font-black italic tracking-tighter">{it.price}</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* controls: arrows + dots */}
        <div className="relative z-10 mt-10 flex items-center justify-center gap-5 lg:mt-12">
          <button type="button" className="fy-arrow" onClick={prev} aria-label="Previous design">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2" role="group" aria-label="Choose a design">
            {shopItems.map((it, i) => (
              <button
                key={it.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show design ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
                className="fy-dot"
              />
            ))}
          </div>
          <button type="button" className="fy-arrow" onClick={next} aria-label="Next design">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
