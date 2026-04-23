import React from 'react'

const GRADS: Record<string, string> = {
  warm: 'linear-gradient(135deg, #F4A261 0%, #E76F51 40%, #9A3B28 100%)',
  cool: 'linear-gradient(135deg, #C9D6FF 0%, #5A5FEF 50%, #1a1a4a 100%)',
  green: 'linear-gradient(135deg, #B7EFC5 0%, #59F5B1 40%, #1a5a3a 100%)',
  mono: 'linear-gradient(135deg, #E5E5E5 0%, #7A7A7A 50%, #000 100%)',
  violet: 'linear-gradient(135deg, #E8D5FF 0%, #A880FF 40%, #3d2a66 100%)',
  yellow: 'linear-gradient(135deg, #FFF1A8 0%, #FFD700 40%, #7a5900 100%)',
  red: 'linear-gradient(135deg, #FFB4A5 0%, #FF5C45 40%, #7a1a0a 100%)',
  dusk: 'linear-gradient(135deg, #FFC7A8 0%, #A880FF 60%, #1a1a4a 100%)',
}

interface PhotoTileProps {
  label?: string
  tone?: string
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

export function PhotoTile({ label = 'Photo', tone = 'warm', style = {}, className = '', children }: PhotoTileProps) {
  return (
    <div
      className={`ph ${className}`}
      style={{ background: GRADS[tone] ?? GRADS.warm, position: 'relative', overflow: 'hidden', ...style }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)',
        mixBlendMode: 'overlay', pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 4px, rgba(0,0,0,0.04) 4px 5px)',
        pointerEvents: 'none',
      }}/>
      {children}
      <div className="ph__label" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{label}</div>
    </div>
  )
}

export const BRAND_COLORS = ['#5A5FEF', '#A880FF', '#FF5C45', '#FFD700', '#59F5B1']
