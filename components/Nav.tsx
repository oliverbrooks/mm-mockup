'use client'

import Link from 'next/link'
import { Wordmark } from './Logo'

const NAV_LINKS = [
  { label: 'Stories', href: '#' },
  { label: 'Exhibitions', href: '/exhibition' },
  { label: 'Learn', href: '#' },
  { label: 'About', href: '/about' },
  { label: 'Visit', href: '/visit' },
  { label: 'Support', href: '/support' },
]

export function Nav({ active = '' }: { active?: string }) {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Link href="/" aria-label="Migration Museum — home" style={{ display: 'flex', alignItems: 'center' }}>
          <Wordmark size={13} />
        </Link>
        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`nav__link ${active === l.label ? 'active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/support" className="btn" style={{ marginLeft: 10, padding: '10px 18px' }}>
            Donate
          </Link>
        </nav>
      </div>
    </header>
  )
}
