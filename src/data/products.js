// Replace images by dropping files into /public/images with these names,
// or change the paths below. Everything on the hero reads from here.
export const sizes = [
  { value: 39, available: true },
  { value: 40, available: true },
  { value: 41, available: true },
  { value: 42, available: true },
  { value: 43, available: false },
  { value: 44, available: true },
  { value: 45, available: true },
  { value: 46, available: true },
]

export const products = [
  {
    id: 'velocity-v1',
    tag: 'New drop',
    name: 'Velocity V1',
    line: 'SNEKZ Originals',
    blurb: 'Built for speed. Made to be seen.',
    features: ['Lightweight mesh upper', 'Cushioned rubber sole', 'Lace-lock fit', 'Everyday comfort'],
    price: '$189',
    colors: [
      { name: 'Black', hex: '#0b0b0b' },
      { name: 'Stone', hex: '#d4d4d0' },
      { name: 'Volt', hex: '#ff4d00' },
    ],
    images: [
      '/images/velocity-1.webp',
      '/images/velocity-2.webp',
      '/images/velocity-3.webp',
    ],
    // small versions for the thumbnails and the cart (fast to load)
    thumbs: [
      '/images/velocity-1-sm.webp',
      '/images/velocity-2-sm.webp',
      '/images/velocity-3-sm.webp',
    ],
    // extra angles per colour, in order: front, side, back
    views: [
      ['/images/velocity-1-2.webp', '/images/velocity-1-3.webp', '/images/velocity-1-4.webp'],
      ['/images/velocity-2-2.webp', '/images/velocity-2-3.webp', '/images/velocity-2-4.webp'],
      ['/images/velocity-3-2.webp', '/images/velocity-3-3.webp', '/images/velocity-3-4.webp'],
    ],
  }
]
