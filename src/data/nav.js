import { Home, Footprints, LayoutGrid, Heart, User } from 'lucide-react'

// Mobile bottom nav (icon first, label reveals on hover/click)
export const mobileLinks = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'shop', label: 'Shop', href: '#shop', icon: Footprints },
  { id: 'collections', label: 'Collections', href: '#new-collection', icon: LayoutGrid },
  { id: 'for-you', label: 'For You', href: '#for-you', icon: Heart },
  { id: 'account', label: 'Account', href: '#account', icon: User },
]

// Desktop header links
export const desktopLinks = [
  { label: 'Shop', href: '#shop' },
  { label: 'New Drops', href: '#drops' },
  { label: 'Collections', href: '#collections' },
  { label: 'Our Story', href: '#story' },
]