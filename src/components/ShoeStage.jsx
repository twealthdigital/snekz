import { useEffect, useState } from 'react'
import ImageSlot from './ImageSlot'

// Shows the big shoe. When `src` changes (a new angle), the old view turns
// away and the new one turns in, so it feels like the shoe is rotating.
export default function ShoeStage({ src, alt, className = '' }) {
  const [state, setState] = useState({ cur: src, prev: null, n: 0 })

  if (state.cur !== src) {
    setState({ cur: src, prev: state.cur, n: state.n + 1 })
  }

  useEffect(() => {
    if (state.n === 0) return
    const t = setTimeout(() => setState((s) => ({ ...s, prev: null })), 650)
    return () => clearTimeout(t)
  }, [state.n])

  return (
    <div className="relative h-full w-full" style={{ perspective: '1100px' }}>
      {state.prev && (
        <ImageSlot
          key={`out-${state.prev}`}
          src={state.prev}
          alt=""
          className={`shoe-turn-out absolute inset-0 ${className}`}
        />
      )}
      <ImageSlot
        key={state.cur}
        src={state.cur}
        alt={alt}
        className={`${state.n > 0 ? 'shoe-turn-in' : ''} absolute inset-0 ${className}`}
      />
    </div>
  )
}