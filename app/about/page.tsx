'use client'

import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { RemixingM } from '@/components/Logo'
import { PhotoTile } from '@/components/PhotoTile'

export default function AboutPage() {
  return (
    <div style={{ background: '#fff', color: '#000' }}>
      <Nav active="About" />

      {/* HERO */}
      <section className="sp-v" style={{ borderBottom: '1.5px solid #000', background: 'var(--mm-paper)' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 20 }}>About the Migration Museum</div>
          <h1 className="h-display" style={{ margin: 0, maxWidth: 1000 }}>
            Britain&apos;s story, told as <em style={{ fontStyle: 'italic', fontWeight: 500 }}>all of us.</em>
          </h1>
          <p className="lede" style={{ marginTop: 32, maxWidth: 720 }}>
            The Migration Museum explores how the movement of people to and from Britain across the ages
            has shaped who we are — as individuals, as communities, as a nation.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="wrap sp">
        <div className="eyebrow" style={{ color: 'var(--mm-blue)', marginBottom: 20 }}>Our purpose</div>
        <div className="layout-3col">
          {[
            { word: 'Reveal', color: 'var(--mm-orange)', copy: 'Revealing the human stories and lived experiences of migration.', seed: 6 },
            { word: 'Remix', color: 'var(--mm-blue)', copy: 'Remixing stories, making them hyper-relevant to today.', seed: 5 },
            { word: 'Reframe', color: 'var(--mm-violet)', copy: "Reframing people's perspective on migration — from 'us and them' to all of us.", seed: 7 },
          ].map((m) => (
            <div key={m.word} style={{
              background: m.color, color: '#fff',
              padding: 36, minHeight: 260,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.25 }}>
                <RemixingM size={180} color="#fff" interval={2200} seed={m.seed}/>
              </div>
              <h2 style={{ margin: 0, fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.9 }}>{m.word}.</h2>
              <p style={{ margin: 0, fontSize: 17, maxWidth: 260, position: 'relative' }}>{m.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="sp-v" style={{ background: 'var(--mm-black)', color: '#fff' }}>
        <div className="wrap">
          <div className="layout-how-we-work">
            <div>
              <div className="eyebrow" style={{ color: 'var(--mm-yellow)', marginBottom: 16 }}>How we work</div>
              <h2 className="h-section" style={{ margin: 0, color: '#fff' }}>Co-produced, always.</h2>
            </div>
            <div style={{ display: 'grid', gap: 28 }}>
              {[
                ['Story-led', 'Stories are often complex and make us feel a range of emotions. We cut across the grain to find surprising connections.'],
                ['Participatory', 'We actively encourage contributions, interactions and feedback. The more we listen, the more truthful we are.'],
                ['Multi-voiced', 'We present perspectives from many contributors — not a single institutional voice.'],
                ['Remixing', 'We combine stories to show the hybridity at the heart of British life and culture.'],
              ].map(([t, c], i) => (
                <div key={t} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'start', paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--mm-yellow)', minWidth: 40, fontVariantNumeric: 'tabular-nums' }}>0{i + 1}</div>
                  <div>
                    <h3 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700 }}>{t}</h3>
                    <p style={{ margin: 0, opacity: 0.75 }}>{c}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="wrap sp">
        <div className="layout-stats">
          {[
            ['400K+', 'Visitors, Lewisham pop-up'],
            ['60+', 'Exhibitions & pop-ups since 2013'],
            ['28', 'Migration Network partners'],
            ['2028', 'Permanent home opens'],
          ].map(([n, l], i) => (
            <div key={l} style={{
              padding: '36px 24px',
              borderRight: i < 3 ? '1.5px solid #000' : 'none',
              borderBottom: '1.5px solid #000',
            }}>
              <div style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
              <div className="meta" style={{ marginTop: 10, color: 'var(--mm-grey)' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="sp-v" style={{ background: 'var(--mm-paper)', borderTop: '1.5px solid #000', borderBottom: '1.5px solid #000' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 12 }}>The team</div>
          <h2 className="h-section" style={{ margin: 0, marginBottom: 40 }}>Who you&apos;ll meet</h2>
          <div className="layout-4col">
            {[
              ['Sophie Henderson', 'Co-founder & CEO', 'warm'],
              ['Robert Kelly', 'Digital Product Manager', 'cool'],
              ['Aditi Anand', 'Director of Content', 'violet'],
              ['Marcus Hughes', 'Head of Learning', 'green'],
            ].map(([name, role, tone]) => (
              <div key={name}>
                <PhotoTile label={`${name} — portrait`} tone={tone} style={{ aspectRatio: '4/5', marginBottom: 16 }} className="cutout"/>
                <h3 style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 700 }}>{name}</h3>
                <div style={{ fontSize: 14, color: 'var(--mm-grey)' }}>{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
