'use client'

import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { PhotoTile } from '@/components/PhotoTile'

export default function VisitPage() {
  return (
    <div style={{ background: '#fff', color: '#000' }}>
      <Nav active="Visit" />

      {/* HERO */}
      <section style={{ paddingTop: 64, borderBottom: '1.5px solid #000' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--mm-orange)', marginBottom: 16 }}>
            <span className="dot" style={{ background: 'var(--mm-orange)', marginRight: 8, verticalAlign: 'middle' }}/>
            Opening Spring 2028
          </div>
          <h1 className="h-display" style={{ margin: 0 }}>
            65 Crutched<br/>Friars, EC3.
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 620 }}>
            Our state-of-the-art permanent home in the City of London — galleries, learning
            space, an outdoor courtyard, a restaurant and a shop showcasing the impact of migration on food and business.
          </p>
        </div>

        <div style={{ marginTop: 48, position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/south-entrance.jpg" alt="Architect's render — Crutched Friars south entrance"
            className="visit-hero-img" />
          <div style={{ position: 'absolute', bottom: 24, left: 48, background: '#000', color: '#fff', padding: '12px 20px', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            65 Crutched Friars · Render by the architects
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="wrap sp">
        <div className="eyebrow" style={{ marginBottom: 16 }}>What&apos;s inside</div>
        <h2 className="h-section" style={{ margin: '0 0 40px', maxWidth: 800 }}>Four floors. One migrating story.</h2>

        <div className="layout-inside-grid">
          {[
            { tag: 'Lower ground', title: 'Auditorium & galleries', copy: 'A flexible 200-seat auditorium at the heart of a 1,200 sq m journey through centuries of arrivals and departures.', img: '/img/auditorium.jpg', colour: 'var(--mm-blue)' },
            { tag: 'Ground floor', title: 'Double-height lobby', copy: 'A dramatic arrival space where rotating exhibitions, co-produced with contributors, meet you on the way in.', img: '/img/double-height.jpg', colour: 'var(--mm-orange)' },
            { tag: 'Street level', title: 'South external entrance', copy: 'Stepping out onto Crutched Friars — an accessible new threshold into the City.', img: '/img/south-entrance.jpg', colour: 'var(--mm-green)' },
            { tag: 'Courtyard + cafe', title: 'Courtyard entrance', copy: "A courtyard entrance opening into a restaurant and shop featuring migration's impact on UK food & business.", img: '/img/courtyard-entrance.jpg', colour: 'var(--mm-yellow)' },
          ].map((f, i) => (
            <div key={f.title} className="layout-floor-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 12, color: f.colour }}>{f.tag}</div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 700, lineHeight: 1.1 }}>{f.title}</h3>
                  <p style={{ margin: 0, color: 'var(--mm-grey)' }}>{f.copy}</p>
                </div>
                <div className="meta" style={{ color: 'var(--mm-grey)', marginTop: 16 }}>0{i + 1} / 04</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHILE YOU WAIT */}
      <section className="sp-v" style={{ background: 'var(--mm-paper)', borderTop: '1.5px solid #000', borderBottom: '1.5px solid #000' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--mm-blue)', marginBottom: 12 }}>While you wait for 2028</div>
          <h2 className="h-section" style={{ margin: '0 0 40px' }}>Where to find us now</h2>
          <div className="layout-3col">
            {[
              { place: 'Lewisham', tone: 'warm', meta: 'Through 27 Jul 2026', title: 'All Our Stories', copy: 'Our main current exhibition, in the Lewisham Shopping Centre.' },
              { place: 'Online', tone: 'cool', meta: 'Anytime', title: 'Digital stories', copy: 'Oral histories, archive features and downloadable schools resources.' },
              { place: 'Touring UK', tone: 'violet', meta: 'Leeds · Bristol · Manchester', title: 'Pop-up programme', copy: 'Short-run exhibitions and community events across the UK.' },
            ].map((c) => (
              <div key={c.place}>
                <PhotoTile tone={c.tone} label={c.title} style={{ aspectRatio: '4/3' }}/>
                <div style={{ marginTop: 14 }}>
                  <div className="meta" style={{ color: 'var(--mm-grey)' }}>{c.place} · {c.meta}</div>
                  <h3 style={{ margin: '8px 0', fontSize: 24, fontWeight: 700 }}>{c.title}</h3>
                  <p style={{ margin: 0, color: 'var(--mm-grey)' }}>{c.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESSIBILITY */}
      <section className="wrap sp">
        <div className="layout-access">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Access for all</div>
            <h2 className="h-section" style={{ margin: 0 }}>Welcome means welcome.</h2>
            <p className="lede" style={{ marginTop: 16, color: 'var(--mm-grey)' }}>
              The new museum is being designed to be fully accessible from day one.
            </p>
          </div>
          <div className="layout-access-features">
            {[
              ['Step-free', 'Full lift and ramp access throughout.'],
              ['BSL tours', 'Monthly, free. Book online.'],
              ['Quiet hours', 'Low-sensory sessions every Wednesday.'],
              ['Audio described', 'Every exhibition, every tour.'],
              ['Baby friendly', 'Changing, feeding and buggy-safe.'],
              ['Assistance dogs', 'Always welcome.'],
            ].map(([t, c]) => (
              <div key={t} style={{ padding: 20, border: '1.5px solid #000' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700 }}>{t}</h3>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--mm-grey)' }}>{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
