'use client'

type MarqueeMode = 'bold' | 'subtle' | 'ticker' | 'static' | 'off'

interface MarqueeProps {
  items: string[]
  bg?: string
  color?: string
  mode?: MarqueeMode
}

export function Marquee({ items, bg = 'var(--mm-yellow)', color = '#000', mode = 'bold' }: MarqueeProps) {
  if (mode === 'off') return null

  if (mode === 'static') {
    return (
      <div style={{
        background: 'var(--mm-paper)',
        borderTop: '1px solid var(--mm-mid)',
        borderBottom: '1px solid var(--mm-mid)',
        padding: '14px 0',
      }}>
        <div className="wrap" style={{
          display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center',
          fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase',
          fontWeight: 500, color: 'var(--mm-grey)',
        }}>
          {items.map((it, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              {it}
              {i < items.length - 1 && <span style={{ color: 'var(--mm-mid)' }}>·</span>}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (mode === 'ticker') {
    const dup = [...items, ...items, ...items]
    return (
      <div style={{
        background: '#fff', color: 'var(--mm-grey)',
        borderTop: '1px solid var(--mm-mid)', borderBottom: '1px solid var(--mm-mid)',
        overflow: 'hidden', whiteSpace: 'nowrap', padding: '8px 0',
      }}>
        <div style={{
          display: 'inline-flex', gap: 36,
          animation: 'mm-marquee 90s linear infinite',
          paddingLeft: 36,
          fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
        }}>
          {dup.map((it, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 36 }}>
              {it}<span style={{ color: 'var(--mm-mid)' }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (mode === 'subtle') {
    const dup = [...items, ...items, ...items]
    return (
      <div style={{
        background: 'var(--mm-paper)', color: 'var(--mm-black)',
        borderTop: '1px solid var(--mm-mid)', borderBottom: '1px solid var(--mm-mid)',
        overflow: 'hidden', whiteSpace: 'nowrap', padding: '14px 0',
      }}>
        <div style={{
          display: 'inline-flex', gap: 40,
          animation: 'mm-marquee 70s linear infinite',
          paddingLeft: 40,
          fontSize: 14, fontWeight: 500, letterSpacing: '0.04em',
        }}>
          {dup.map((it, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 40, opacity: 0.85 }}>
              {it}<span style={{ color: 'var(--mm-grey)', fontSize: 10 }}>●</span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  // bold (default)
  const dup = [...items, ...items, ...items]
  return (
    <div className="marquee" style={{ background: bg, color }}>
      <div className="marquee__track">
        {dup.map((it, i) => (
          <span key={i} className="marquee__item">{it}</span>
        ))}
      </div>
    </div>
  )
}
