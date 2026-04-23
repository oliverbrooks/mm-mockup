'use client'

import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { RemixingM } from '@/components/Logo'
import { PhotoTile } from '@/components/PhotoTile'

export default function ExhibitionPage() {
  return (
    <div style={{ background: '#fff', color: '#000' }}>
      <Nav active="Exhibitions" />

      {/* HERO */}
      <section style={{ padding: '40px 0 80px', borderBottom: '1.5px solid #000', background: 'var(--mm-orange)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: '5%', opacity: 0.25 }}>
          <RemixingM size={320} color="#000" interval={2200} seed={2}/>
        </div>
        <div className="wrap" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, fontSize: 14, flexWrap: 'wrap' }}>
            <Link href="/" style={{ opacity: 0.9 }}>Home</Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ opacity: 0.9 }}>Exhibitions</span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span>All Our Stories</span>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
            <span className="chip" style={{ background: '#000', color: '#fff', borderColor: '#000' }}>
              <span className="dot" style={{ background: 'var(--mm-green)' }}/> On now
            </span>
            <span className="chip" style={{ background: 'transparent', borderColor: '#fff', color: '#fff' }}>Free entry</span>
          </div>
          <h1 className="h-display" style={{ margin: 0, color: '#fff', fontSize: 'clamp(64px, 11vw, 160px)' }}>
            All Our<br/>Stories.
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 620, fontSize: 22 }}>
            Portraits, objects and oral histories from contributors across Britain — a flagship show
            of the museum&apos;s co-production approach.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div><div className="meta" style={{ opacity: 0.8 }}>Dates</div><div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>7 Mar — 27 Jul 2026</div></div>
            <div><div className="meta" style={{ opacity: 0.8 }}>Location</div><div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>Lewisham Shopping Centre</div></div>
            <div><div className="meta" style={{ opacity: 0.8 }}>Admission</div><div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>Free</div></div>
            <a href="#" className="btn btn--yellow btn--big">Book free entry →</a>
          </div>
        </div>
      </section>

      {/* IMAGE GRID */}
      <section className="wrap sp">
        <div className="layout-exhibition-img">
          <PhotoTile tone="red" label="Installation view, central gallery" style={{ gridRow: 'span 2' }} className="angled"/>
          <PhotoTile tone="warm" label="Karen Arthur's dress, detail" className="cutout"/>
          <PhotoTile tone="violet" label="Oral history listening booth"/>
          <PhotoTile tone="cool" label="Object: suitcase, 1972" className="torn"/>
          <PhotoTile tone="yellow" label="Entrance signage"/>
        </div>
      </section>

      {/* ABOUT + VISIT INFO */}
      <section className="wrap sp layout-exhibition-info">
        <div className="prose" style={{ fontSize: 19, lineHeight: 1.6 }}>
          <div className="eyebrow" style={{ color: 'var(--mm-blue)', marginBottom: 16 }}>About this exhibition</div>
          <h2 style={{ fontSize: 42, margin: '0 0 20px', lineHeight: 1.05, fontWeight: 700 }}>30 contributors. 30 ways in.</h2>
          <p>
            <em>All Our Stories</em> foregrounds the first-person accounts of thirty people whose families have
            arrived in Britain over the last seven decades — from the Windrush generation to more recent
            arrivals from Ukraine, Hong Kong, Syria and beyond.
          </p>
          <p>
            Each contributor has chosen an object that matters to them. The objects sit alongside
            portraits and audio interviews, forming a remixed archive that crosses decades, cultures and neighbourhoods.
          </p>
          <p>
            Schools can <a href="#">book free group visits</a> with curriculum-linked worksheets for KS3–KS5.
            Access tours run every Saturday at 2pm.
          </p>
        </div>

        <aside>
          <div style={{ background: 'var(--mm-paper)', padding: 32, borderRadius: 4, border: '1.5px solid #000' }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Plan your visit</div>
            <dl style={{ margin: 0 }}>
              {[
                ['Nearest station', 'Lewisham (DLR, National Rail)'],
                ['Step-free', 'Fully accessible, lift to gallery'],
                ['Toilets', 'Accessible, baby-changing'],
                ['BSL tours', '2nd Sat of each month'],
                ['Quiet hour', 'Wednesdays, 10–11am'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '12px 0', borderBottom: '1px solid var(--mm-mid)' }}>
                  <dt style={{ fontWeight: 600 }}>{k}</dt>
                  <dd style={{ margin: 0, color: 'var(--mm-grey)' }}>{v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/visit" className="btn btn--ghost" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>Full accessibility guide →</Link>
          </div>

          <div style={{ marginTop: 24, padding: 32, background: 'var(--mm-yellow)', border: '1.5px solid #000' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Upcoming event</div>
            <h3 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 700 }}>Karen Arthur in conversation</h3>
            <div style={{ fontSize: 14, marginBottom: 16 }}>Sat 18 Apr · 3pm · £5 / free for under-18s</div>
            <a href="#" className="btn" style={{ width: '100%', justifyContent: 'center' }}>Book via Eventbrite →</a>
          </div>
        </aside>
      </section>

      {/* CONTRIBUTORS */}
      <section className="sp-v" style={{ background: 'var(--mm-black)', color: '#fff' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--mm-yellow)', marginBottom: 16 }}>Contributors</div>
          <h2 className="h-section" style={{ margin: '0 0 40px', color: '#fff' }}>30 people. One show.</h2>
          <div className="layout-contributors">
            {[
              ['Karen Arthur', 'red'], ['Alok Mehta', 'violet'], ['Fatima Osman', 'green'],
              ['Viktor Lazarenko', 'cool'], ['Mei Tan', 'yellow'], ['Joseph Adebayo', 'warm'],
              ['Amira Haddad', 'violet'], ['Rosa López', 'red'], ['Ishaan Patel', 'cool'],
              ['Priya Singh', 'green'], ['+ 20 more', 'mono'], ['Meet all →', 'dusk'],
            ].map(([name, tone], i) => (
              <a key={name} href="#" style={{ display: 'block' }}>
                <PhotoTile label={name} tone={tone} style={{ aspectRatio: '1/1' }} className={i % 3 === 0 ? 'cutout' : ''}/>
                <div style={{ marginTop: 10, fontSize: 14, fontWeight: 600 }}>{name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
