import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Plus, ArrowRight, Sun, Moon, Play, Check } from 'lucide-react'
import ImageSlot from './ImageSlot'
import HeaderBar, { NotchLogo } from './Header'
import { products, sizes } from '../data/products'

export default function Hero({ cartCount, onAddToCart }) {
  const [pIndex, setPIndex] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)
  const [color, setColor] = useState(0)
  const [size, setSize] = useState(null)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)
  const [dark, setDark] = useState(false)

  const product = products[pIndex]

  // thumbnails: the one in the middle is always the active one
  const thumbsRef = useRef(null)
  const fromScroll = useRef(false)
  const lock = useRef(false)

  useEffect(() => {
    if (fromScroll.current) {
      fromScroll.current = false
      return
    }
    const el = thumbsRef.current
    const child = el?.children[imgIndex]
    if (!el || !child) return
    lock.current = true
    el.scrollTo({
      top: child.offsetTop - (el.clientHeight - child.offsetHeight) / 2,
      behavior: 'smooth',
    })
    setTimeout(() => (lock.current = false), 500)
  }, [imgIndex, pIndex])

  const onThumbScroll = () => {
    const el = thumbsRef.current
    if (!el || lock.current) return
    const mid = el.scrollTop + el.clientHeight / 2
    let best = 0
    let bestDist = Infinity
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs(c.offsetTop + c.offsetHeight / 2 - mid)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    if (best !== imgIndex) {
      fromScroll.current = true
      setImgIndex(best)
    }
  }

  const go = (dir) => {
    setPIndex((i) => (i + dir + products.length) % products.length)
    setImgIndex(0)
    setColor(0)
    setSize(null)
    setSizeError(false)
  }

  const handleAdd = () => {
    if (!size) {
      setSizeError(true)
      return
    }
    onAddToCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const arrowBase =
    'absolute z-30 grid h-10 w-10 place-items-center rounded-full bg-[var(--frame)] text-[var(--frame-fg)] transition hover:text-accent top-[17%] lg:top-1/2 lg:-translate-y-1/2 arrow-tab'

  return (
    <section id="home" className={`${dark ? 'hero-dark' : 'hero-light'} hero-frame`}>
      <NotchLogo />

      {/* arrows live on the wide side panels */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous sneaker"
        className={`${arrowBase} left-3 arrow-tab-left`}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next sneaker"
        className={`${arrowBase} right-3 arrow-tab-right`}
      >
        <ChevronRight size={20} />
      </button>

      {/* ADD TO CART sits in the bottom notch */}
      <button
        onClick={handleAdd}
        className="notch-btn flex w-[40%] items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--frame-fg)] transition hover:text-accent lg:w-[30%] lg:text-sm"
      >
        {added ? (
          <>
            <Check size={16} strokeWidth={3} /> Added
          </>
        ) : (
          'Add to cart'
        )}
      </button>

      {/* light / dark panel */}
      <div className="frame-clip panel-bg relative min-h-[calc(100svh-7rem)] overflow-hidden rounded-[22px] pb-16 lg:h-full lg:min-h-0 lg:pb-0">
        <HeaderBar cartCount={cartCount} />

        {/* ghost wordmark + shoe */}
        <div className="relative mx-auto mt-1 aspect-[4/3] w-full max-w-[520px] lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:max-w-none">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[26vw] font-black uppercase italic leading-none tracking-tighter text-[var(--ghost)] lg:top-[43%] lg:text-[24vw]"
          >
            SNEKZ
          </span>
          <div className="absolute left-0 top-0 h-full w-full lg:left-[15%] lg:top-[21%] lg:h-[58%] lg:w-[65%]">
            <ImageSlot
              key={product.images[imgIndex]}
              src={product.images[imgIndex]}
              alt={product.name}
              className="h-full w-full drop-shadow-[0_28px_28px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>

        {/* thumbnails */}
        <div
          ref={thumbsRef}
          onScroll={onThumbScroll}
          className="thumb-scroll relative z-10 mt-2 flex justify-center gap-3 lg:absolute lg:left-[calc(10%-14px)] lg:top-1/2 lg:mt-0 lg:h-[300px] lg:-translate-y-1/2 lg:flex-col lg:items-center lg:justify-start lg:gap-4 lg:snap-y lg:snap-mandatory lg:overflow-y-auto lg:px-[14px] lg:py-[110px]"
        >
          {product.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setImgIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`h-[72px] w-[72px] shrink-0 snap-center border-2 bg-[var(--thumb)] transition-all duration-300 lg:h-[80px] lg:w-[80px] ${
                imgIndex === i
                  ? 'border-[var(--fg)] lg:scale-125'
                  : 'border-transparent opacity-60 hover:opacity-100 lg:scale-90'
              }`}
            >
              <ImageSlot src={src} alt="" className="h-full w-full p-1" />
            </button>
          ))}
        </div>

        {/* spec card */}
        <div className="relative z-20 mx-4 mt-4 bg-[var(--card)] p-5 backdrop-blur-md lg:absolute lg:right-[17%] lg:top-[20%] lg:mx-0 lg:mt-0 lg:w-[22%] lg:min-w-[290px] lg:max-w-[340px]">
          <div className="relative px-4 py-2.5">
            <span className="absolute left-0 top-0 h-full w-2 border-y border-l border-[var(--fg)]" />
            <span className="absolute right-0 top-0 h-full w-2 border-y border-r border-[var(--fg)]" />
            <p className="text-sm font-extrabold uppercase tracking-wide">{product.line}</p>
            <h1 className="text-sm uppercase tracking-wide opacity-70">{product.name}</h1>
          </div>

          <ul className="mt-4 list-disc space-y-0.5 pl-5 text-[13px] leading-6 marker:text-[var(--fg)]">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setColor(i)}
                  aria-label={c.name}
                  title={c.name}
                  className="grid h-7 w-7 place-items-center border border-[var(--line)]"
                  style={{ backgroundColor: c.hex }}
                >
                  {color === i && (
                    <Plus size={15} strokeWidth={3} className="text-white mix-blend-difference" />
                  )}
                </button>
              ))}
            </div>
            <span className="text-xl font-bold tracking-tight">{product.price}</span>
          </div>
        </div>

        {/* sizes: vertical list on the right */}
        <div className="relative z-10 mt-4 px-4 lg:absolute lg:right-[10%] lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:px-0">
          {sizeError && (
            <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-wider text-red-500 lg:text-right">
              Select a size
            </p>
          )}
          <ul
            className={`flex flex-wrap justify-center gap-2 lg:flex-col lg:items-end lg:gap-1 ${
              sizeError ? 'nudge' : ''
            }`}
          >
            {sizes.map((s) => {
              const selected = size === s.value
              return (
                <li key={s.value}>
                  <button
                    disabled={!s.available}
                    onClick={() => {
                      setSize(s.value)
                      setSizeError(false)
                    }}
                    className={`flex items-center gap-2 border px-3 py-1 text-base font-semibold transition lg:border-transparent lg:px-2 lg:text-xl ${
                      !s.available
                        ? 'cursor-not-allowed border-[var(--line)] text-[var(--faint)] line-through'
                        : selected
                          ? 'border-[var(--fg)] text-[var(--fg)]'
                          : 'border-[var(--line)] text-[var(--faint)] hover:text-[var(--fg)]'
                    }`}
                  >
                    {selected && <ArrowRight size={18} className="hidden lg:block" />}
                    {s.value}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* bottom row: theme toggle, 360, watch more */}
        <div className="relative z-10 mt-6 flex items-center justify-between px-5 lg:static lg:mt-0 lg:px-0">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle light / dark"
            className="flex h-8 w-[64px] items-center justify-between rounded-full bg-[var(--frame)] p-1 ring-1 ring-[var(--line)] lg:absolute lg:bottom-[7%] lg:left-[10%]"
          >
            <span
              className={`grid h-6 w-6 place-items-center rounded-full transition ${
                !dark ? 'bg-[var(--frame-fg)] text-[var(--frame)]' : 'text-[var(--frame-fg)] opacity-60'
              }`}
            >
              <Sun size={14} />
            </span>
            <span
              className={`grid h-6 w-6 place-items-center rounded-full transition ${
                dark ? 'bg-[var(--frame-fg)] text-[var(--frame)]' : 'text-[var(--frame-fg)] opacity-60'
              }`}
            >
              <Moon size={14} />
            </span>
          </button>

          <button
            title="360° view"
            className="grid h-14 w-14 place-items-center rounded-full border-2 border-[var(--fg)] text-[13px] font-black transition hover:border-accent hover:text-accent lg:absolute lg:bottom-[9%] lg:left-1/2 lg:-translate-x-1/2"
          >
            360°
          </button>

          <button className="flex items-center gap-2 text-[13px] font-semibold transition hover:opacity-60 lg:absolute lg:bottom-[7%] lg:right-[10%]">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--fg)]">
              <Play size={12} fill="currentColor" />
            </span>
            Watch more
          </button>
        </div>
      </div>
    </section>
  )
}