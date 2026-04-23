'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { PhotoTile } from '@/components/PhotoTile'
import { FORMATS, type Story } from '@/lib/stories'

export function StoriesClient({ stories }: { stories: Story[] }) {
  const [activeFormat, setActiveFormat] = useState<string>('All')

  const filtered = activeFormat === 'All'
    ? stories
    : stories.filter((s) => s.format === activeFormat)

  const featured = activeFormat === 'All' ? stories[0] : null
  const grid = activeFormat === 'All' ? stories.slice(1) : filtered
  console.log({featured})
  return (
    <div style={{ background: '#fff', color: '#000' }}>
      <Nav active="Stories" />

      {/* HERO */}
      <section className="sp-v" style={{ background: 'var(--mm-paper)', borderBottom: '1.5px solid #000' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--mm-blue)', marginBottom: 16 }}>Stories</div>
          <h1 className="h-display" style={{ margin: 0 }}>
            Comings<br/>&amp; goings.
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 620 }}>
            First-person oral histories, features, and object stories from contributors across Britain —
            told in their own words, across centuries of movement.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="chip" style={{ background: 'var(--mm-black)', color: '#fff', borderColor: '#000' }}>
              60+ contributors
            </span>
            <span className="chip">6 formats</span>
            <span className="chip">Centuries of arrivals &amp; departures</span>
          </div>
        </div>
      </section>

      {/* FEATURED STORY */}
      {featured && (
        <section className="sp-v" style={{ borderBottom: '1.5px solid #000' }}>
          <div className="wrap">
            <div className="eyebrow" style={{ marginBottom: 24 }}>Featured story</div>
            <Link href={`/stories/${featured.slug.current}`} style={{ display: 'block' }}>
              <div className="layout-2col" style={{ gap: 48 }}>
                <PhotoTile
                  tone={featured.tone}
                  label={featured.contributor}
                  style={{ aspectRatio: '4/3' }}
                  className="angled"
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
                  <div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                      <span className="chip">{featured.format}</span>
                      <span className="chip" style={{ borderColor: 'var(--mm-mid)' }}>{featured.era}</span>
                      <span className="chip" style={{ borderColor: 'var(--mm-mid)' }}>{featured.readingTime}</span>
                    </div>
                    <h2 style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                      {featured.title}
                    </h2>
                    <p className="lede" style={{ marginTop: 16, maxWidth: 520 }}>
                      {featured.lede}
                    </p>
                  </div>
                  <blockquote style={{
                    margin: 0, fontWeight: 600,
                    fontSize: 'clamp(18px, 2.2vw, 26px)',
                    lineHeight: 1.3, letterSpacing: '-0.01em',
                    borderLeft: '4px solid var(--mm-yellow)',
                    paddingLeft: 20,
                    color: 'var(--mm-grey)',
                  }}>
                    &ldquo;{featured.pullQuote}&rdquo;
                  </blockquote>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    {featured.contributor} <span style={{ color: 'var(--mm-grey)', fontWeight: 400 }}>— {featured.role}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* FILTER + GRID */}
      <section className="wrap sp">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48, paddingBottom: 32, borderBottom: '1.5px solid #000' }}>
          <span className="eyebrow" style={{ alignSelf: 'center', marginRight: 8, color: 'var(--mm-grey)' }}>Filter:</span>
          {['All', ...FORMATS].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFormat(f)}
              className="chip"
              style={{
                background: activeFormat === f ? 'var(--mm-black)' : '#fff',
                color: activeFormat === f ? '#fff' : 'var(--mm-black)',
                borderColor: activeFormat === f ? 'var(--mm-black)' : 'var(--mm-mid)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontSize: 13,
                fontWeight: activeFormat === f ? 700 : 500,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {grid.length > 0 ? (
          <div className="layout-3col">
            {grid.map((story) => (
              <StoryCard key={story.slug.current} story={story} />
            ))}
          </div>
        ) : (
          <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--mm-grey)' }}>
            <p style={{ fontSize: 18 }}>No stories in this format yet.</p>
          </div>
        )}

        <div style={{
          marginTop: 80,
          padding: '48px 56px',
          background: 'var(--mm-black)',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap',
        }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--mm-yellow)', marginBottom: 12 }}>Has migration shaped your story?</div>
            <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}>
              Contribute to the archive.
            </h2>
            <p style={{ marginTop: 12, maxWidth: 480, opacity: 0.75, margin: '12px 0 0' }}>
              Every story in this archive began with someone saying yes. If migration has shaped
              your life or your family&apos;s story, we&apos;d love to hear from you.
            </p>
          </div>
          <a href="mailto:stories@migrationmuseum.org" className="btn btn--yellow btn--big" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Get in touch →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.slug}`} style={{ display: 'block' }}>
      <PhotoTile
        tone={story.tone}
        label={story.contributor}
        style={{ aspectRatio: '5/4', marginBottom: 16 }}
        className="angled"
      />
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        <span className="chip" style={{ fontSize: 12, padding: '4px 10px' }}>{story.format}</span>
        <span className="chip" style={{ fontSize: 12, padding: '4px 10px', borderColor: 'var(--mm-mid)' }}>{story.era}</span>
      </div>
      <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
        {story.title}
      </h2>
      <div className="meta" style={{ color: 'var(--mm-grey)', marginBottom: 10 }}>
        {story.contributor} · {story.readingTime}
      </div>
      <p style={{ margin: 0, fontSize: 15, color: 'var(--mm-grey)', lineHeight: 1.5 }}>
        {story.lede}
      </p>
    </Link>
  )
}
