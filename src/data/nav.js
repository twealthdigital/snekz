import { Home, Footprints, Flame, ShoppingBag, User } from 'lucide-react'

// Mobile bottom nav (icon first, label reveals on hover/click)
export const mobileLinks = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'shop', label: 'Shop', href: '#shop', icon: Footprints },
  { id: 'drops', label: 'Drops', href: '#drops', icon: Flame },
  { id: 'cart', label: 'Cart', href: '#cart', icon: ShoppingBag },
  { id: 'account', label: 'Account', href: '#account', icon: User },
]

// Desktop header links
export const desktopLinks = [
  { label: 'Shop', href: '#shop' },
  { label: 'New Drops', href: '#drops' },
  { label: 'Collections', href: '#collections' },
  { label: 'Our Story', href: '#story' },
]