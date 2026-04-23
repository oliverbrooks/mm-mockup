'use client'

import { useState, useEffect } from 'react'

type MFn = (color: string) => React.ReactElement

const M_VARIANTS: MFn[] = [
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 90 L10 10 L30 10 L50 55 L70 10 L90 10 L90 90 L75 90 L75 35 L55 80 L45 80 L25 35 L25 90 Z" fill={color} />
    </svg>
  ),
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 90 L8 12 L28 12 L50 50 L72 12 L92 12 L92 90" stroke={color} strokeWidth="10" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  ),
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="85" r="8" fill={color}/>
      <circle cx="15" cy="60" r="8" fill={color}/>
      <circle cx="15" cy="35" r="8" fill={color}/>
      <circle cx="15" cy="15" r="8" fill={color}/>
      <circle cx="35" cy="35" r="8" fill={color}/>
      <circle cx="50" cy="55" r="8" fill={color}/>
      <circle cx="65" cy="35" r="8" fill={color}/>
      <circle cx="85" cy="15" r="8" fill={color}/>
      <circle cx="85" cy="35" r="8" fill={color}/>
      <circle cx="85" cy="60" r="8" fill={color}/>
      <circle cx="85" cy="85" r="8" fill={color}/>
    </svg>
  ),
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 88 L12 14 L50 62 L88 14 L88 88" stroke={color} strokeWidth="14" strokeLinejoin="miter" strokeLinecap="square" fill="none"/>
    </svg>
  ),
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 90 L6 10 L26 10 L50 60 L74 10 L94 10 L94 90 L78 90 L78 28 L56 78 L44 78 L22 28 L22 90 Z" fill={color}/>
      <rect x="2" y="6" width="28" height="6" fill={color}/>
      <rect x="70" y="6" width="28" height="6" fill={color}/>
      <rect x="2" y="88" width="28" height="6" fill={color}/>
      <rect x="70" y="88" width="28" height="6" fill={color}/>
    </svg>
  ),
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 90 C 10 70, 10 40, 14 14 C 20 20, 32 50, 40 62 C 44 68, 48 68, 52 62 C 60 50, 72 20, 78 14 C 82 40, 82 70, 78 90"
        stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M14 90 C 20 94, 78 94, 82 90" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mm-stripe" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <rect width="4" height="8" fill={color}/>
        </pattern>
      </defs>
      <path d="M10 90 L10 10 L30 10 L50 55 L70 10 L90 10 L90 90 L75 90 L75 35 L55 80 L45 80 L25 35 L25 90 Z" fill="url(#mm-stripe)"/>
    </svg>
  ),
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 90 L10 10 L30 10 L50 55 L50 90 Z" fill={color}/>
      <path d="M50 55 L70 10 L90 10 L90 90 L50 90 Z" fill={color} opacity="0.55"/>
    </svg>
  ),
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 90 L10 10 L50 50 L90 10 L90 90" stroke={color} strokeWidth="12" strokeLinejoin="bevel" strokeLinecap="butt" fill="none"/>
      <path d="M50 50 L50 90" stroke={color} strokeWidth="12" strokeLinecap="butt"/>
    </svg>
  ),
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="14" height="76" fill={color}/>
      <rect x="78" y="14" width="14" height="76" fill={color}/>
      <rect x="30" y="14" width="14" height="40" fill={color}/>
      <rect x="56" y="14" width="14" height="40" fill={color}/>
      <rect x="42" y="44" width="16" height="16" fill={color}/>
    </svg>
  ),
]

function pickM(seed: number): MFn {
  return M_VARIANTS[((seed % M_VARIANTS.length) + M_VARIANTS.length) % M_VARIANTS.length]
}

interface RemixingMProps {
  size?: number
  color?: string
  seed?: number
  interval?: number
  className?: string
}

export function RemixingM({ size = 48, color = '#000', seed = 0, interval = 0, className = '' }: RemixingMProps) {
  const [i, setI] = useState(seed)
  useEffect(() => {
    if (!interval) return
    const t = setInterval(() => setI((v) => v + 1 + Math.floor(Math.random() * 3)), interval)
    return () => clearInterval(t)
  }, [interval])
  const Variant = pickM(i)
  return (
    <span
      className={`mm-glyph ${className}`}
      style={{ display: 'inline-block', width: size, height: size, lineHeight: 0, transition: 'transform 0.25s ease' }}
      aria-hidden="true"
    >
      {Variant(color)}
    </span>
  )
}

interface MMLockupProps {
  size?: number
  color?: string
  interval?: number
  stagger?: number
}

export function MMLockup({ size = 36, color = '#000', interval = 2600, stagger = 900 }: MMLockupProps) {
  const [i, setI] = useState(3)
  const [j, setJ] = useState(7)
  useEffect(() => {
    const t1 = setInterval(() => setI((v) => v + 1 + Math.floor(Math.random() * 4)), interval)
    const t2 = setInterval(() => setJ((v) => v + 1 + Math.floor(Math.random() * 4)), interval + stagger)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [interval, stagger])
  return (
    <span style={{ display: 'inline-flex', gap: size * 0.12, alignItems: 'center' }}>
      <span style={{ width: size, height: size, display: 'block' }}>{pickM(i)(color)}</span>
      <span style={{ width: size, height: size, display: 'block' }}>{pickM(j)(color)}</span>
    </span>
  )
}

interface WordmarkProps {
  size?: number
  color?: string
}

export function Wordmark({ size = 14, color = '#000' }: WordmarkProps) {
  return (
    <span className="mm-wordmark" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color }}>
      <MMLockup size={size * 1.8} color={color} />
      <span style={{ fontWeight: 800, fontSize: size, letterSpacing: '0.02em', textTransform: 'uppercase', lineHeight: 1 }}>
        Migration<br/>Museum
      </span>
    </span>
  )
}
