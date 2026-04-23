'use client'

import { useState, useEffect } from 'react'

const TARGET = new Date('2028-03-21T09:00:00Z')

export function Countdown() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = now ? Math.max(0, TARGET.getTime() - now.getTime()) : 0
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)

  const items: [string, number][] = [['Days', days], ['Hours', hours], ['Mins', mins], ['Secs', secs]]

  return (
    <div style={{ marginTop: 32, display: 'flex', gap: 24, alignItems: 'baseline' }}>
      {items.map(([l, v]) => (
        <div key={l}>
          <div style={{ fontWeight: 800, fontSize: 56, lineHeight: 0.9, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
            {String(v).padStart(2, '0')}
          </div>
          <div className="meta" style={{ marginTop: 6, opacity: 0.6 }}>{l}</div>
        </div>
      ))}
    </div>
  )
}
