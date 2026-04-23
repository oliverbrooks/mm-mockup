'use client'

import { useState } from 'react'
import { Wordmark } from './Logo'

const FOOTER_COLS = [
  { title: 'Visit', links: ["What's on", 'Plan your visit', 'Accessibility', 'The new museum'] },
  { title: 'Connect', links: ['Stories', 'Newsletter', 'Migration Network', 'Press'] },
  { title: 'Support', links: ['Donate', 'Institutional funders', 'Corporate partners', 'Legacy giving'] },
]

const SOCIALS = ['Instagram', 'BlueSky', 'LinkedIn', 'TikTok', 'YouTube']

export function Footer() {
  const [email, setEmail] = useState('')

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    alert(`Thanks — we'll be in touch at ${email}.`)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 60 }}>
          <div>
            <div style={{ marginBottom: 20 }}>
              <Wordmark size={16} color="#fff" />
            </div>
            <p className="lede" style={{ fontSize: 18, opacity: 0.8, maxWidth: 360 }}>
              A permanent home for migration stories. Opening Spring 2028 at 65 Crutched Friars, City of London.
            </p>
            <form style={{ marginTop: 28, display: 'flex', gap: 8, maxWidth: 360 }} onSubmit={handleSubscribe}>
              <input
                type="email" required placeholder="your@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1, padding: '14px 18px',
                  background: 'transparent', border: '1.5px solid #fff', borderRadius: 999,
                  color: '#fff', fontSize: 15, fontFamily: 'inherit',
                }}
              />
              <button type="submit" className="btn btn--yellow" style={{ padding: '12px 20px' }}>Subscribe</button>
            </form>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="eyebrow" style={{ opacity: 0.6, marginBottom: 16 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((l) => (
                  <li key={l}><a href="#" style={{ fontSize: 16 }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 30, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ fontSize: 13, opacity: 0.6 }}>© 2026 Migration Museum. Charity No. 1162925.</div>
          <div style={{ display: 'flex', gap: 18, fontSize: 13 }}>
            {SOCIALS.map((s) => (
              <a key={s} href="#" style={{ opacity: 0.7 }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
