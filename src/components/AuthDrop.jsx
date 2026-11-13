import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Eye, EyeOff, X } from 'lucide-react'

// Sign in / sign up box.
// Desktop: a circle drops from the user icon in the header, then widens into the box.
// Phones: a circle pops up from the user icon in the tab bar, then widens into the box.
// Closing runs it backwards: the box shrinks to a circle, which drops back into the icon.
// It takes the opposite colour of the page (black on white, white on black), like the search bar.
export default function AuthDrop({ open, x, y, ib, mode, dark, onClose }) {
  const [phase, setPhase] = useState(-1) // -1 gone, 0 at the icon, 1 circle out, 2 full box
  const [tab, setTab] = useState('signin')
  const [showPw, setShowPw] = useState(false)
  const [bh, setBh] = useState(420) // natural height of the form, so the box fits it
  const innerRef = useRef(null)
  const boxRef = useRef(null)

  useEffect(() => {
    const timers = []
    const later = (fn, ms) => timers.push(setTimeout(fn, ms))
    if (open) {
      later(() => setPhase(1), 50)
      later(() => setPhase(2), 520)
    } else {
      later(() => setPhase((p) => (p === -1 ? -1 : 1)), 0)
      later(() => setPhase((p) => (p === -1 ? -1 : 0)), 380)
      later(() => setPhase((p) => (p === 0 ? -1 : p)), 900)
    }
    return () => timers.forEach(clearTimeout)
  }, [open])

  // desktop: put the cursor in the first field once the box is open
  useEffect(() => {
    if (phase === 2 && open && mode === 'desktop') boxRef.current?.querySelector('input')?.focus()
  }, [phase, open, mode])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // keep the box height in step with the form (tabs differ in length)
  const mounted = open || phase !== -1
  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setBh(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [mounted])

  if (!open && phase === -1) return null

  const signup = tab === 'signup'

  return (
    <div
      className={`auth-layer ${dark ? 'hero-dark' : 'hero-light'}`}
      data-phase={phase === -1 ? 0 : phase}
      data-mode={mode}
      style={{ '--cx': `${x}px`, '--cy': `${y}px`, '--ib': `${ib}px`, '--bh': `${bh}px` }}
    >
      <div className="auth-dim" onClick={onClose} />

      <div
        ref={boxRef}
        className="auth-box"
        role="dialog"
        aria-modal="true"
        aria-label={signup ? 'Create account' : 'Sign in'}
      >
        <div className="auth-in auth-scroll">
          <div ref={innerRef} className="auth-inner">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[30px] font-black uppercase italic leading-[0.88] tracking-tighter">
                {signup ? 'Join' : 'Welcome'}
                <br />
                <span className="outline-text">{signup ? 'the pack' : 'back'}</span>
              </h2>
              <button type="button" onClick={onClose} aria-label="Close" className="auth-close">
                <X size={18} />
              </button>
            </div>

            <div className="auth-tabs" role="tablist">
              {[
                ['signin', 'Sign in'],
                ['signup', 'Sign up'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  data-on={tab === id}
                  onClick={() => setTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <form
              className="mt-5 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                onClose()
              }}
            >
              {signup && (
                <label className="auth-label">
                  Full name
                  <input className="auth-field" type="text" name="name" autoComplete="name" required placeholder="Your name" />
                </label>
              )}
              <label className="auth-label">
                Email
                <input
                  className="auth-field"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@email.com"
                />
              </label>
              <label className="auth-label">
                <span className="flex items-center justify-between">
                  Password
                  {!signup && (
                    <a href="#forgot" className="auth-link" onClick={(e) => e.preventDefault()}>
                      Forgot?
                    </a>
                  )}
                </span>
                <span className="relative block">
                  <input
                    className="auth-field pr-11"
                    type={showPw ? 'text' : 'password'}
                    name="password"
                    autoComplete={signup ? 'new-password' : 'current-password'}
                    required
                    minLength={signup ? 8 : undefined}
                    placeholder={signup ? 'At least 8 characters' : 'Your password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    className="auth-eye"
                  >
                    {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </span>
              </label>

              <button type="submit" className="btn-classic mt-2 flex w-full">
                <span className="w-full justify-center">
                  {signup ? 'Create account' : 'Sign in'}
                  <ArrowRight size={18} strokeWidth={2.6} />
                </span>
              </button>
            </form>

            <div className="auth-or">
              <span>or</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="auth-social">
                Google
              </button>
              <button type="button" className="auth-social">
                Apple
              </button>
            </div>

            <p className="mt-5 text-center text-[11px] font-semibold opacity-60">
              {signup ? (
                <>
                  Have an account?{' '}
                  <button type="button" className="auth-link" onClick={() => setTab('signin')}>
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  New to SNEKZ?{' '}
                  <button type="button" className="auth-link" onClick={() => setTab('signup')}>
                    Create an account
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
