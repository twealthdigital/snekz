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
      '/images/velocity-1.png',
      '/images/velocity-2.png',
      '/images/velocity-3.png',
    ],
    // extra angles per colour, in order: front, side, back
    views: [
      ['/images/velocity-1-2.png', '/images/velocity-1-3.png', '/images/velocity-1-4.png'],
      ['/images/velocity-2-2.png', '/images/velocity-2-3.png', '/images/velocity-2-4.png'],
      ['/images/velocity-3-2.png', '/images/velocity-3-3.png', '/images/velocity-3-4.png'],
    ],
  },
  {
    id: 'apex-runner',
    tag: 'Bestseller',
    name: 'Apex Runner',
    line: 'SNEKZ Performance',
    blurb: 'Light underfoot. Loud on the street.',
    features: ['Breathable knit', 'Responsive foam midsole', 'Grip outsole', 'All-day wear'],
    price: '$159',
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#0b0b0b' },
    ],
    images: ['/images/apex-1.png', '/images/apex-2.png', '/images/apex-3.png'],
  },
  {
    id: 'street-lo',
    tag: 'Limited',
    name: 'Street Lo',
    line: 'SNEKZ Classics',
    blurb: 'Clean lines. Zero effort.',
    features: ['Premium leather', 'Vulcanised sole', 'Padded collar', 'Timeless profile'],
    price: '$139',
    colors: [
      { name: 'Cream', hex: '#efe9dc' },
      { name: 'Black', hex: '#0b0b0b' },
    ],
    images: ['/images/street-1.png', '/images/street-2.png', '/images/street-3.png'],
  },
]