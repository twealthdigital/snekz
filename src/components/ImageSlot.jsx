import { useEffect, useState } from 'react'
import { ImagePlus } from 'lucide-react'

// Shows your image when the file exists, otherwise a labelled placeholder
// that tells you exactly which file to drop in.
export default function ImageSlot({ src, alt, className = '', fit = 'object-contain', priority = false }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => setFailed(false), [src])

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[var(--line,rgba(0,0,0,0.2))] bg-[var(--card,rgba(0,0,0,0.03))] p-3 text-center text-[var(--faint,rgba(0,0,0,0.4))] ${className}`}
      >
        <ImagePlus size={22} />
        <span className="break-all text-[10px] font-semibold uppercase tracking-wider">
          {src}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${fit} ${className}`}
      draggable={false}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}