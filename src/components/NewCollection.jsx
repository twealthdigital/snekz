import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Sun, Moon, Check } from 'lucide-react'
import ImageSlot from './ImageSlot'
import ShoeStage from './ShoeStage'
 
import { products } from '../data/products'

export default function NewCollection({ onAddToCart, dark, setDark, arrowsOn }) {
  const [pIndex, setPIndex] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)
  const [added, setAdded] = useState(false)
  const [spin, setSpin] = useState({ key: '', n: 0 })
 

  const product = products[pIndex]
  const [first, ...rest] = product.name.split(' ')
 

  // extra angles for the colour on screen: front, side, back
  const views = product.views?.[imgIndex]
  const viewKey = `${pIndex}-${imgIndex}`
  const view = spin.key === viewKey ? spin.n : 0
  const bigSrc = view === 0 || !views ? product.images[imgIndex] : views[view - 1]
  const rotate = () => {
    if (!views) return
    setSpin({ key: viewKey, n: (view + 1) % (views.length + 1) })
  }

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
 
  }

  const handleAdd = () => {
 
    onAddToCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const arrowBase =
    `absolute lg:fixed z-[36] grid h-10 w-10 place-items-center rounded-full bg-[var(--frame)] text-[var(--frame-fg)] transition hover:text-accent top-[17%] lg:top-1/2 lg:-translate-y-1/2 arrow-tab ${arrowsOn ? '' : 'lg:pointer-events-none lg:opacity-0'}`

  return (
    <section id="new-collection" aria-label="New collection" className={`${dark ? 'hero-dark' : 'hero-light'} hero-frame hero-join-top`}>
 

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
      <div className="frame-clip-bottom panel-bg relative min-h-[calc(100svh-7rem)] overflow-hidden rounded-b-[22px] pb-16 pt-14 lg:h-full lg:min-h-0 lg:pb-0 lg:pt-0">
 

        {/* ghost wordmark + shoe */}
        <div className="relative mx-auto mt-1 aspect-[4/3] w-full max-w-[520px] lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:max-w-none">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[26vw] font-black uppercase italic leading-none tracking-tighter text-[var(--ghost)] lg:top-[35%] lg:text-[24vw]"
          >
            SNEKZ
          </span>
          <div className="absolute left-0 top-0 h-full w-full lg:left-[20%] lg:top-[12%] lg:h-[70%] lg:w-[75%]">
            <div key={viewKey} className="shoe-in h-full w-full">
              <ShoeStage
                src={bigSrc}
                alt={product.name}
                className="h-full w-full drop-shadow-[0_28px_28px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* thumbnails */}
        <div
          ref={thumbsRef}
          onScroll={onThumbScroll}
          className="thumb-scroll relative z-10 mt-2 flex justify-center gap-3 lg:absolute lg:left-[calc(10%-14px)] lg:top-[62%] lg:mt-0 lg:h-[340px] lg:-translate-y-1/2 lg:flex-col lg:items-center lg:justify-start lg:gap-4 lg:snap-y lg:snap-mandatory lg:overflow-y-auto lg:pl-[14px] lg:pr-[100px] lg:py-[122px]"
        >
          {product.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setImgIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`h-[72px] w-[72px] shrink-0 snap-center border-2 bg-[var(--thumb)] transition-all duration-300 lg:h-[96px] lg:w-[96px] ${
                imgIndex === i
                  ? 'relative z-10 border-[var(--fg)] shadow-[0_14px_34px_rgba(0,0,0,0.3)] lg:scale-125 lg:translate-x-12'
                  : 'border-transparent opacity-60 hover:opacity-100 lg:scale-90 lg:-translate-x-2'
              }`}
            >
              <ImageSlot src={src} alt="" className="h-full w-full p-1" />
            </button>
          ))}
        </div>


 

        {/* headline */}
        <div
          key={product.id}
          className="count-in pointer-events-none relative z-20 mx-5 mt-5 lg:absolute lg:left-[8%] lg:top-[13%] lg:mx-0 lg:mt-0"
        >
          <span className="inline-block -skew-x-12 bg-accent px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">
            {product.tag}
          </span>
          <h2 className="mt-3 text-5xl font-black uppercase italic leading-[0.88] tracking-tighter lg:text-[4vw]">
            {first}
            {rest.length > 0 && (
              <>
                <br />
                <span className="outline-text">{rest.join(' ')}</span>
              </>
            )}
          </h2>
          <p className="mt-3 max-w-[260px] text-[12px] font-bold uppercase tracking-[0.16em] opacity-70">
            {product.blurb}
          </p>
        </div>

        {/* counter */}
        <div className="pointer-events-none absolute right-[9%] top-[12%] z-20 hidden items-end gap-2 lg:flex">
          <span
            key={pIndex}
            className="count-in outline-text text-[7vw] font-black italic leading-[0.9]"
          >
            {String(pIndex + 1).padStart(2, '0')}
          </span>
          <span className="pb-3 text-sm font-black italic tracking-wide opacity-70">
            / {String(products.length).padStart(2, '0')}
          </span>
        </div>

        {/* bottom row: theme toggle, 360, price */}
        <div className="relative z-10 mt-6 flex items-center justify-between px-5 lg:static lg:mt-0 lg:px-0">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle light / dark"
            className="relative flex h-8 w-[64px] items-center justify-between rounded-full bg-[var(--frame)] p-1 ring-1 ring-[var(--line)] lg:absolute lg:bottom-[7%] lg:left-[10%]"
          >
            <span
              aria-hidden
              className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-[var(--frame-fg)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                dark ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
            <span
              className={`relative grid h-6 w-6 place-items-center transition duration-500 ${
                !dark ? 'text-[var(--frame)]' : 'text-[var(--frame-fg)] opacity-60'
              }`}
            >
              <Sun size={14} />
            </span>
            <span
              className={`relative grid h-6 w-6 place-items-center transition duration-500 ${
                dark ? 'text-[var(--frame)]' : 'text-[var(--frame-fg)] opacity-60'
              }`}
            >
              <Moon size={14} />
            </span>
          </button>

          <button
            onClick={rotate}
            title="Rotate view"
            className="grid h-14 w-14 place-items-center rounded-full border-2 border-[var(--fg)] text-[13px] font-black transition hover:border-accent hover:text-accent lg:absolute lg:bottom-[9%] lg:left-1/2 lg:-translate-x-1/2"
          >
            {(view + 1) * 90}°
          </button>

          <div className="flex flex-col items-end lg:absolute lg:bottom-[7%] lg:right-[9%]">
            <span
              key={product.id}
              className="count-in text-3xl font-black italic leading-none tracking-tighter lg:text-[3.2vw]"
            >
              {product.price}
            </span>
            <button
              onClick={handleAdd}
              className="mt-3 hidden -skew-x-12 bg-accent px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:brightness-110 active:scale-95 lg:block"
            >
              <span className="block skew-x-12">{added ? 'Added' : 'Add to cart'}</span>
            </button>
          </div>

 
        </div>
      </div>
    </section>
  )
}