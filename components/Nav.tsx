'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Wordmark } from './Logo'

const NAV_LINKS = [
  { label: 'Stories', href: '/stories' },
  { label: 'Exhibitions', href: '/exhibition' },
  { label: 'Learn', href: '/about' },
  { label: 'About', href: '/about' },
  { label: 'Visit', href: '/visit' },
  { label: 'Support', href: '/support' },
]

export function Nav({ active = '' }: { active?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Link
          href="/"
          aria-label="Migration Museum — home"
          className="nav__logo"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Wordmark size={13} />
        </Link>

        {/* Desktop nav */}
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

        {/* Mobile hamburger */}
        <button
          className="nav__hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? '×' : '≡'}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {open && (
        <div className="nav__mobile-menu">
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`nav__link ${active === l.label ? 'active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/support"
              className="btn"
              style={{ marginTop: 12, justifyContent: 'center' }}
              onClick={() => setOpen(false)}
            >
              Donate
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
