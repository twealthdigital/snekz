import { useRef, useState, useSyncExternalStore } from 'react'
import { Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import ImageSlot from './ImageSlot'
import { shopItems } from '../data/shop'

const phone = '(max-width: 767.98px)'

// 3 cards a page on phones, 6 everywhere else
function usePerPage() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(phone)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => (window.matchMedia(phone).matches ? 3 : 6),
    () => 6,
  )
}

export default function Shop({ dark, onAddToCart }) {
  const perPage = usePerPage()
  const [page, setPage] = useState(0)
  const [turned, setTurned] = useState(false) // cards only animate in after the page is changed
  const [added, setAdded] = useState(null)
  const section = useRef(null)

  const pages = Math.ceil(shopItems.length / perPage)
  const cur = Math.min(page, pages - 1)
  const start = cur * perPage
  const items = shopItems.slice(start, start + perPage)

  const go = (p) => {
    setPage(p)
    setTurned(true)
    const el = section.current
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const add = (id) => {
    onAddToCart({ id, color: 0 })
    setAdded(id)
    setTimeout(() => setAdded((a) => (a === id ? null : a)), 1500)
  }

  return (
    <section
      id="shop"
      ref={section}
      aria-label="Shop"
      className={`${dark ? 'hero-dark' : 'hero-light'} hero-frame hero-join-top hero-join-bottom shop-section`}
    >
      <div className="shop-panel panel-bg relative overflow-hidden px-5 pb-20 pt-20 lg:px-[8%] lg:pb-28 lg:pt-28">
        {/* ghost word */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-[3%] top-4 select-none text-[34vw] font-black uppercase italic leading-none tracking-tighter text-[var(--ghost)] lg:text-[16vw]"
        >
          Shop
        </span>

        {/* heading + page counter */}
        <div className="relative z-10 flex items-end justify-between gap-6">
          <div>
            <span className="inline-block -skew-x-12 bg-accent px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">
              The lineup
            </span>
            <h2 className="mt-3 text-5xl font-black uppercase italic leading-[0.88] tracking-tighter lg:text-[4.4vw]">
              Pick your
              <br />
              <span className="outline-text">Pair</span>
            </h2>
            <p className="mt-4 max-w-[260px] text-[12px] font-bold uppercase tracking-[0.16em] opacity-70">
              Built for speed. Made to be seen.
            </p>
          </div>

          {pages > 1 && (
            <div className="flex items-end gap-2">
              <span
                key={cur}
                className="count-in outline-text text-[15vw] font-black italic leading-[0.9] md:text-[9vw] lg:text-[7vw]"
              >
                {String(cur + 1).padStart(2, '0')}
              </span>
              <span className="pb-2 text-sm font-black italic tracking-wide opacity-70 lg:pb-3">
                / {String(pages).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* cards */}
        <div
          key={cur}
          className="relative z-10 mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6"
        >
          {items.map((it, i) => (
            <article
              key={it.id}
              style={{ animationDelay: `${i * 70}ms` }}
              className={`${turned ? 'count-in' : ''} group relative flex border border-[var(--line)] bg-[var(--card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--fg)] md:flex-col`}
            >
              {/* picture */}
              <div className="relative aspect-[5/4] w-[44%] shrink-0 overflow-hidden border-r border-[var(--line)] md:aspect-[4/3] md:w-full md:border-b md:border-r-0">
                {it.tag && (
                  <span className="absolute left-2 top-2 z-10 -skew-x-12 bg-accent px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.16em] text-white md:left-3 md:top-3 md:px-2.5 md:py-1 md:text-[10px]">
                    {it.tag}
                  </span>
                )}
                <span
                  aria-hidden
                  className="outline-text absolute right-3 top-2 hidden text-5xl font-black italic leading-none opacity-70 md:block"
                >
                  {String(start + i + 1).padStart(2, '0')}
                </span>

                <div className="absolute inset-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-3 group-hover:scale-105 md:inset-6">
                  <ImageSlot
                    src={it.image}
                    alt={`${it.name} in ${it.colour.name}`}
                    className={`absolute inset-0 h-full w-full drop-shadow-[0_14px_12px_rgba(0,0,0,0.25)] transition-opacity duration-500 ${
                      it.hover ? 'md:group-hover:opacity-0' : ''
                    }`}
                  />
                  {it.hover && (
                    <ImageSlot
                      src={it.hover}
                      alt=""
                      className="absolute inset-0 hidden h-full w-full opacity-0 drop-shadow-[0_14px_12px_rgba(0,0,0,0.25)] transition-opacity duration-500 md:block md:group-hover:opacity-100"
                    />
                  )}
                </div>
              </div>

              {/* details */}
              <div className="flex min-w-0 flex-1 flex-col justify-between p-3 md:p-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] opacity-60">{it.line}</p>
                  <h3 className="text-lg font-black uppercase italic leading-tight tracking-tight md:text-xl">
                    {it.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider opacity-70">
                    <span className="h-3 w-3 border border-[var(--line)]" style={{ backgroundColor: it.colour.hex }} />
                    {it.colour.name}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 md:mt-5">
                  <span className="text-xl font-black italic tracking-tighter md:text-2xl">{it.price}</span>
                  <button
                    type="button"
                    onClick={() => add(it.id)}
                    aria-label={`Add ${it.name} ${it.colour.name} to cart`}
                    className="btn-classic btn-classic-sm inline-flex"
                  >
                    <span>
                      {added === it.id ? <Check size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={3} />}
                      {added === it.id ? 'Added' : 'Add'}
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* pagination */}
        {pages > 1 && (
          <nav aria-label="Shop pages" className="relative z-10 mt-10 lg:mt-14">
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                className="pg-btn"
                onClick={() => go(cur - 1)}
                disabled={cur === 0}
                aria-label="Previous page"
              >
                <span>
                  <ChevronLeft size={18} strokeWidth={3} />
                </span>
              </button>

              {Array.from({ length: pages }, (_, p) => (
                <button
                  key={p}
                  type="button"
                  className="pg-btn"
                  onClick={() => go(p)}
                  aria-label={`Page ${p + 1}`}
                  aria-current={p === cur ? 'page' : undefined}
                >
                  <span>{p + 1}</span>
                </button>
              ))}

              <button
                type="button"
                className="pg-btn"
                onClick={() => go(cur + 1)}
                disabled={cur === pages - 1}
                aria-label="Next page"
              >
                <span>
                  <ChevronRight size={18} strokeWidth={3} />
                </span>
              </button>
            </div>
            <p className="mt-4 text-center text-[11px] font-extrabold uppercase tracking-[0.2em] opacity-60">
              Showing {start + 1} to {start + items.length} of {shopItems.length}
            </p>
          </nav>
        )}
      </div>
    </section>
  )
}
