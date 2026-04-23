'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { SanityImageSource } from '@sanity/image-url'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Marquee } from '@/components/Marquee'
import { RemixingM } from '@/components/Logo'
import { PhotoTile } from '@/components/PhotoTile'
import { AccentBar } from '@/components/AccentBar'
import { Countdown } from '@/components/Countdown'

const MARQUEE_ITEMS = [
  'Opening Spring 2028',
  '65 Crutched Friars, City of London',
  'A permanent home for migration stories',
  'Reveal · Remix · Reframe',
  'Fundraising now',
  'Join the movement',
]

export type HomeStory = {
  _id?: string
  slug: { current: string }
  title: string
  format: string
  era?: string
  readingTime?: string
  tone?: string
  contributor: string
  objectLabel?: string
  contributorImage?: SanityImageSource | null
  objectImage?: SanityImageSource | null
}

function storyHref(s: HomeStory) {
  return `/stories/${s.slug.current}`
}

function tileImage(s: HomeStory) {
  return s.objectImage ?? s.contributorImage ?? null
}

function tileLabel(s: HomeStory) {
  return s.objectLabel?.trim() || s.contributor
}

export function HomePageClient({ stories }: { stories: HomeStory[] }) {
  const six = stories.slice(0, 6)
  const [a0, a1, a2, b0, b1, b2] = [six[0], six[1], six[2], six[3], six[4], six[5]]
  return (
    <div style={{ background: 'var(--mm-white)', color: 'var(--mm-black)' }}>
      <Nav active="" />

      <section style={{ position: 'relative', borderBottom: '1.5px solid #000', overflow: 'hidden' }}>
        <div className="wrap" style={{ padding: '48px 48px 72px', position: 'relative' }}>
          <div className="layout-hero">
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>
                <span className="dot" style={{ background: 'var(--mm-orange)', marginRight: 8, verticalAlign: 'middle' }}/>
                A new museum, opening Spring 2028
              </div>
              <h1 className="h-display" style={{ margin: 0 }}>
                We are <br/>
                <span style={{ background: 'var(--mm-yellow)', padding: '0 12px', display: 'inline-block', transform: 'rotate(-1.5deg)' }}>all</span> of us.
              </h1>
              <p className="lede" style={{ marginTop: 28, maxWidth: 520 }}>
                The Migration Museum reveals the human stories of movement to and from Britain —
                remixing them, and reframing who &ldquo;we&rdquo; are.
              </p>
              <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/stories" className="btn btn--big">Explore stories →</Link>
                <Link href="/support" className="btn btn--ghost btn--big">Back the 2028 home</Link>
              </div>
            </div>

            <div className="hero-collage">
              <PhotoTile label="Karen Arthur, portrait" tone="warm"
                style={{ position: 'absolute', top: 20, left: 40, width: 260, height: 340, transform: 'rotate(-4deg)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                className="angled" />
              <PhotoTile label="NHS nurses, 1948" tone="cool"
                style={{ position: 'absolute', top: 0, right: 0, width: 220, height: 260, transform: 'rotate(3deg)' }}
                className="cutout" />
              <div style={{
                position: 'absolute', bottom: 60, left: 0,
                width: 200, height: 200,
                background: 'var(--mm-violet)',
                clipPath: 'polygon(12% 8%, 88% 3%, 95% 62%, 92% 95%, 38% 98%, 5% 92%, 8% 38%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <RemixingM size={140} color="#fff" interval={1600} seed={4}/>
              </div>
              <PhotoTile label="Windrush Square, 2024" tone="green"
                style={{ position: 'absolute', bottom: 0, right: 40, width: 240, height: 200, transform: 'rotate(-2deg)' }}
                className="torn" />
              <div style={{
                position: 'absolute', top: 180, left: 220,
                width: 130, height: 130, borderRadius: '50%',
                background: 'var(--mm-orange)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 18, textTransform: 'uppercase',
                letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.1,
                transform: 'rotate(8deg)',
              }}>
                Reveal<br/>Remix<br/>Reframe
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={MARQUEE_ITEMS} mode="ticker" />

      <section className="wrap sp">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12, color: 'var(--mm-blue)' }}>Stories, told in full</div>
            <h2 className="h-section" style={{ margin: 0, maxWidth: 800 }}>Comings and goings, <em style={{ fontStyle: 'italic', fontWeight: 500 }}>across centuries.</em></h2>
          </div>
          <Link href="/stories" className="btn btn--ghost">All stories →</Link>
        </div>

        {six.length > 0 ? (
          <>
            <div className="layout-stories-a">
              {a0 && <StoryCardLarge story={a0} priority />}
              {a1 && <StoryCardSmall story={a1} priority />}
              {a2 && <StoryCardSmall story={a2} priority />}
            </div>
            <div className="layout-stories-b">
              {b0 && <StoryCardSmall story={b0} />}
              {b1 && <StoryCardSmall story={b1} />}
              {b2 && <StoryCardLarge story={b2} />}
            </div>
          </>
        ) : (
          <p style={{ color: 'var(--mm-grey)', fontSize: 18 }}>
            Stories will appear here once published. <Link href="/stories" style={{ color: 'var(--mm-blue)', textDecoration: 'underline' }}>View the stories section</Link>.
          </p>
        )}
      </section>

      <section className="sp-v" style={{ background: 'var(--mm-black)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, opacity: 0.3 }}>
          <RemixingM size={400} color="var(--mm-blue)" interval={2200} seed={1}/>
        </div>
        <div style={{ position: 'absolute', bottom: -80, left: -80, opacity: 0.2 }}>
          <RemixingM size={360} color="var(--mm-orange)" interval={2600} seed={6}/>
        </div>
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="layout-2col">
            <div>
              <div className="eyebrow" style={{ color: 'var(--mm-yellow)', marginBottom: 16 }}>The permanent home</div>
              <h2 className="h-hero" style={{ margin: 0 }}>Spring<br/>2028.</h2>
              <p className="lede" style={{ marginTop: 24, opacity: 0.9, maxWidth: 480 }}>
                A state-of-the-art permanent home at 65 Crutched Friars, City of London —
                opening with galleries, a restaurant, and a shop that showcase the impact of migration on British life.
              </p>
              <Countdown />
              <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/visit" className="btn btn--yellow">The new museum →</Link>
                <Link href="/support" className="btn btn--ghost" style={{ borderColor: '#fff', color: '#fff' }}>Help us get there</Link>
              </div>
            </div>
            <div className="block-2028-img">
              <Image src="/img/courtyard-entrance.jpg" alt="65 Crutched Friars — courtyard entrance render"
                fill sizes="(max-width: 768px) 0vw, 50vw"
                style={{ objectFit: 'cover', transform: 'rotate(1.5deg)', clipPath: 'polygon(2% 4%, 98% 0%, 100% 96%, 3% 100%)' }}/>
              <div style={{
                position: 'absolute', bottom: 20, left: 0,
                background: 'var(--mm-yellow)', color: '#000',
                padding: '14px 20px', fontWeight: 700, fontSize: 14,
                textTransform: 'uppercase', letterSpacing: '0.06em',
                transform: 'rotate(-3deg)',
              }}>Courtyard entrance · Render</div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sp">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12, color: 'var(--mm-orange)' }}>On now</div>
            <h2 className="h-section" style={{ margin: 0 }}>What&apos;s happening</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="chip">Exhibitions · 2</span>
            <span className="chip">Events · 7</span>
            <span className="chip">Online · 4</span>
          </div>
        </div>

        <div className="layout-3col">
          <EventCard date="7 MAR — 27 JUL" tag="Exhibition · Free" tone="red"
            title="All Our Stories"
            copy="Our flagship exhibition — objects, oral histories and commissioned art from contributors across Britain."
            href="/exhibition" />
          <EventCard date="SAT 4 MAY · 12 – 4 PM" tag="Event · Free" tone="violet"
            title="Who Runs the World? Festival"
            copy="Women's stories through books, food, fashion. Pop-up food, fabric memories workshop, mini-tours." />
          <EventCard date="ONGOING" tag="Education" tone="green"
            title="Schools programme"
            copy="Primary, secondary and university workshops — book a session or request resources." />
        </div>
      </section>

      <section className="sp-v" style={{ background: 'var(--mm-paper)', borderTop: '1.5px solid #000', borderBottom: '1.5px solid #000' }}>
        <div className="wrap layout-quote">
          <div>
            <AccentBar/>
            <div className="eyebrow" style={{ marginTop: 24, marginBottom: 12 }}>Co-production</div>
            <h3 className="h-card" style={{ margin: 0, fontSize: 24, lineHeight: 1.2 }}>
              Every story is told with the people who lived it.
            </h3>
            <p style={{ marginTop: 16, color: 'var(--mm-grey)' }}>
              We listen, commission and collaborate — with communities, artists, and contributors —
              to make sure the museum speaks with, not about.
            </p>
          </div>
          <div>
            <blockquote style={{
              margin: 0, fontWeight: 600,
              fontSize: 'clamp(24px, 3.2vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em',
            }}>
              &ldquo;It&apos;s like the older you get as a Black woman, the quieter you&apos;re supposed to become.
              <span style={{ background: 'var(--mm-yellow)', padding: '0 8px' }}> This dress</span> is about taking up space.&rdquo;
            </blockquote>
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
              <PhotoTile label="" tone="red" style={{ width: 56, height: 56, borderRadius: '50%', flexShrink: 0 }}/>
              <div>
                <div style={{ fontWeight: 700 }}>Karen Arthur</div>
                <div style={{ fontSize: 14, color: 'var(--mm-grey)' }}>Contributor, All Our Stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sp">
        <div className="layout-cta-inner" style={{
          background: 'var(--mm-blue)', color: '#fff',
          padding: '72px 64px', borderRadius: 4,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, opacity: 0.25 }}>
            <RemixingM size={280} color="#fff" interval={1800} seed={2}/>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="eyebrow" style={{ color: 'var(--mm-yellow)', marginBottom: 14 }}>Become a founder</div>
            <h2 className="h-section" style={{ margin: 0, color: '#fff' }}>
              Build a home for <br/>all of our stories.
            </h2>
            <p className="lede" style={{ marginTop: 20, maxWidth: 520 }}>
              We are fundraising now — from individuals, foundations and corporate partners — to open
              our permanent home in 2028.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
            <Link href="/support" className="btn btn--yellow btn--big" style={{ justifyContent: 'space-between' }}>
              Donate today <span>→</span>
            </Link>
            <Link href="/support#institutional" className="btn btn--big" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', justifyContent: 'space-between' }}>
              Institutional funders <span>→</span>
            </Link>
            <Link href="/support#corporate" className="btn btn--big" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', justifyContent: 'space-between' }}>
              Corporate partners <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function StoryCardLarge({ story, priority }: { story: HomeStory; priority?: boolean }) {
  const meta = [story.contributor, story.readingTime].filter(Boolean).join(' · ')
  return (
    <Link href={storyHref(story)} style={{ display: 'block' }}>
      <PhotoTile
        label={tileLabel(story)}
        tone={story.tone ?? 'warm'}
        image={tileImage(story)}
        imageAlt={tileLabel(story)}
        imageSizes="(max-width: 900px) 100vw, 50vw"
        imageWidth={1200}
        imageHeight={750}
        priority={priority}
        style={{ aspectRatio: '16/10', marginBottom: 16 }}
      />
      <div className="meta" style={{ color: 'var(--mm-grey)', marginBottom: 8 }}>{story.format} · {meta}</div>
      <h3 className="h-card" style={{ margin: 0, fontSize: 32 }}>{story.title}</h3>
    </Link>
  )
}

function StoryCardSmall({ story, priority }: { story: HomeStory; priority?: boolean }) {
  const meta = [story.era, story.readingTime].filter(Boolean).join(' · ')
  return (
    <Link href={storyHref(story)} style={{ display: 'block' }}>
      <PhotoTile
        label={tileLabel(story)}
        tone={story.tone ?? 'warm'}
        image={tileImage(story)}
        imageAlt={tileLabel(story)}
        imageSizes="(max-width: 900px) 100vw, 30vw"
        imageWidth={800}
        imageHeight={1000}
        priority={priority}
        style={{ aspectRatio: '4/5', marginBottom: 14 }}
        className="angled"
      />
      <div className="meta" style={{ color: 'var(--mm-grey)', marginBottom: 6 }}>{story.format} · {meta}</div>
      <h3 className="h-card" style={{ margin: 0, fontSize: 20 }}>{story.title}</h3>
    </Link>
  )
}

function EventCard({ date, tag, title, copy, tone, href = '#' }: { date: string; tag: string; title: string; copy: string; tone: string; href?: string }) {
  return (
    <Link href={href} style={{ display: 'block', border: '1.5px solid #000', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
      <PhotoTile label={title} tone={tone} style={{ aspectRatio: '5/4' }}/>
      <div style={{ padding: 24 }}>
        <div className="meta" style={{ color: 'var(--mm-grey)', marginBottom: 10 }}>{date}</div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>{tag}</div>
        <h3 className="h-card" style={{ margin: '0 0 10px', fontSize: 26 }}>{title}</h3>
        <p style={{ margin: 0, color: 'var(--mm-grey)', fontSize: 15 }}>{copy}</p>
      </div>
    </Link>
  )
}
