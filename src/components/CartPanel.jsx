import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import ImageSlot from './ImageSlot'
import { products } from '../data/products'

const money = (n) => `$${n.toLocaleString()}`
const priceOf = (p) => Number(p.price.replace(/[^0-9.]/g, ''))

// Side panel that slides in from the right. The left edge has a chamfered tab
// holding the close arrow. It uses the frame colours, so it follows the theme.
export default function CartPanel({ open, dark, items, onClose, onQty, onRemove, onClear }) {
  const [phase, setPhase] = useState(-1) // -1 gone, 0 off screen, 1 in view
  const closeRef = useRef(null)

  useEffect(() => {
    const timers = []
    const later = (fn, ms) => timers.push(setTimeout(fn, ms))
    if (open) {
      later(() => setPhase(1), 30)
    } else {
      later(() => setPhase((p) => (p === -1 ? -1 : 0)), 0)
      later(() => setPhase((p) => (p === 0 ? -1 : p)), 500)
    }
    return () => timers.forEach(clearTimeout)
  }, [open])

  useEffect(() => {
    if (phase === 1 && open) closeRef.current?.focus()
  }, [phase, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open && phase === -1) return null

  const lines = items
    .map((it) => {
      const product = products.find((p) => p.id === it.id)
      if (!product) return null
      const colour = product.colors[Math.min(it.color, product.colors.length - 1)]
      return { ...it, product, colour, image: product.images[it.color] ?? product.images[0] }
    })
    .filter(Boolean)
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const total = lines.reduce((n, l) => n + priceOf(l.product) * l.qty, 0)

  const shop = () => {
    onClose()
    setTimeout(() => document.getElementById('new-collection')?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  return (
    <div className={`cart-layer ${dark ? 'hero-dark' : 'hero-light'}`} data-phase={phase === -1 ? 0 : phase}>
      <div className="cart-dim" onClick={onClose} />

      <aside className="cart-wrap" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart-panel">
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close cart" className="cart-close">
            <ChevronRight size={20} strokeWidth={2.6} />
          </button>

          <div className="cart-inner">
            <header className="flex items-end justify-between border-b border-[var(--cl)] px-6 pb-5 pt-8">
              <h2 className="text-[34px] font-black uppercase italic leading-[0.88] tracking-tighter">
                Your
                <br />
                <span className="outline-text">Cart</span>
              </h2>
              {count > 0 && (
                <span className="-skew-x-12 bg-accent px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              )}
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 pb-10 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-[var(--cl)]">
                  <ShoppingBag size={30} strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 text-3xl font-black uppercase italic leading-[0.9] tracking-tighter">
                  Nothing
                  <br />
                  <span className="outline-text">here yet</span>
                </h3>
                <p className="mt-3 max-w-[240px] text-sm font-semibold opacity-60">
                  Your cart is empty. Fresh pairs are waiting for you.
                </p>
                <button type="button" onClick={shop} className="btn-classic mt-8 inline-flex">
                  <span>
                    Shop now
                    <ArrowRight size={18} strokeWidth={2.6} />
                  </span>
                </button>
              </div>
            ) : (
              <>
                <ul className="cart-list flex-1 overflow-y-auto px-6">
                  {lines.map((l) => (
                    <li
                      key={`${l.id}-${l.color}`}
                      className="count-in relative flex gap-4 border-b border-[var(--cl)] py-5"
                    >
                      <div className="h-24 w-24 shrink-0 border border-[var(--cl)] bg-[#f1f1ef]">
                        <ImageSlot src={l.image} alt={l.product.name} className="h-full w-full p-1" />
                      </div>

                      <div className="min-w-0 flex-1 pr-6">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] opacity-60">
                          {l.product.line}
                        </p>
                        <h3 className="text-base font-black uppercase italic leading-tight tracking-tight">
                          {l.product.name}
                        </h3>
                        <p className="mt-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider opacity-70">
                          <span
                            className="h-3 w-3 border border-[var(--cl)]"
                            style={{ backgroundColor: l.colour.hex }}
                          />
                          {l.colour.name}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[var(--cl)]">
                            <button
                              type="button"
                              onClick={() => onQty(l.id, l.color, -1)}
                              disabled={l.qty <= 1}
                              aria-label="Fewer"
                              className="grid h-8 w-8 place-items-center transition hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
                            >
                              <Minus size={14} strokeWidth={2.6} />
                            </button>
                            <span className="grid h-8 w-8 place-items-center text-sm font-black tabular-nums">
                              {l.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onQty(l.id, l.color, 1)}
                              disabled={l.qty >= 9}
                              aria-label="More"
                              className="grid h-8 w-8 place-items-center transition hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
                            >
                              <Plus size={14} strokeWidth={2.6} />
                            </button>
                          </div>
                          <span className="text-lg font-black italic tracking-tighter">
                            {money(priceOf(l.product) * l.qty)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(l.id, l.color)}
                        aria-label={`Remove ${l.product.name}`}
                        className="absolute right-0 top-4 grid h-7 w-7 place-items-center rounded-full transition hover:bg-accent hover:text-white"
                      >
                        <X size={16} strokeWidth={2.6} />
                      </button>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-[var(--cl)] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
                  <div className="flex items-end justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] opacity-70">Subtotal</span>
                    <span className="text-3xl font-black italic leading-none tracking-tighter">{money(total)}</span>
                  </div>
                  <p className="mt-2 text-[11px] font-semibold opacity-50">Shipping and taxes at checkout.</p>

                  <button type="button" className="btn-classic mt-5 flex w-full">
                    <span className="w-full justify-center">
                      Checkout
                      <ArrowRight size={18} strokeWidth={2.6} />
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={onClear}
                    className="mt-5 flex w-full items-center justify-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] opacity-60 transition hover:text-accent hover:opacity-100"
                  >
                    <Trash2 size={14} />
                    Clear cart
                  </button>
                </footer>
              </>
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}