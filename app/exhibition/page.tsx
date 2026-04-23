import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { RemixingM } from '@/components/Logo'
import { PhotoTile } from '@/components/PhotoTile'
import { client } from '@/sanity/lib/client'
import { currentExhibitionQuery } from '@/sanity/lib/queries'

export const revalidate = 3600

// Hardcoded fallback — used when Sanity is not configured
const FALLBACK_EXHIBITION = {
  slug: { current: 'all-our-stories' },
  title: 'All Our Stories',
  lede: "Portraits, objects and oral histories from contributors across Britain — a flagship show of the museum's co-production approach.",
  status: 'Current',
  isFree: true,
  ticketUrl: null,
  openingDate: '2026-03-07',
  closingDate: '2026-07-27',
  location: 'Lewisham Shopping Centre',
  accentColour: 'var(--mm-orange)',
  body: [
    "All Our Stories foregrounds the first-person accounts of thirty people whose families have arrived in Britain over the last seven decades — from the Windrush generation to more recent arrivals from Ukraine, Hong Kong, Syria and beyond.",
    "Each contributor has chosen an object that matters to them. The objects sit alongside portraits and audio interviews, forming a remixed archive that crosses decades, cultures and neighbourhoods.",
    "Schools can book free group visits with curriculum-linked worksheets for KS3–KS5. Access tours run every Saturday at 2pm.",
  ],
  images: [] as { caption?: string }[],
  accessInfo: [
    { label: 'Nearest station', value: 'Lewisham (DLR, National Rail)' },
    { label: 'Step-free',       value: 'Fully accessible, lift to gallery' },
    { label: 'Toilets',         value: 'Accessible, baby-changing' },
    { label: 'BSL tours',       value: '2nd Sat of each month' },
    { label: 'Quiet hour',      value: 'Wednesdays, 10–11am' },
  ],
  contributors: [
    { name: 'Karen Arthur',     tone: 'red'    },
    { name: 'Alok Mehta',       tone: 'violet' },
    { name: 'Fatima Osman',     tone: 'green'  },
    { name: 'Viktor Lazarenko', tone: 'cool'   },
    { name: 'Mei Tan',          tone: 'yellow' },
    { name: 'Joseph Adebayo',   tone: 'warm'   },
    { name: 'Amira Haddad',     tone: 'violet' },
    { name: 'Rosa López',       tone: 'red'    },
    { name: 'Ishaan Patel',     tone: 'cool'   },
    { name: 'Priya Singh',      tone: 'green'  },
  ],
  featuredEvent: {
    title: 'Karen Arthur in conversation',
    date: '2026-04-18T15:00:00Z',
    price: '£5 / free for under-18s',
    isFree: false,
    bookingUrl: null as string | null,
  },
}

type Exhibition = typeof FALLBACK_EXHIBITION

function formatDateRange(opening: string | null, closing: string | null) {
  if (!opening && !closing) return null
  const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  if (opening && closing) return `${fmt(opening)} — ${fmt(closing)}`
  if (opening) return `From ${fmt(opening)}`
  return `Until ${fmt(closing!)}`
}

function formatEventDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) +
    ' · ' + d.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' })
}

// Portable Text blocks → plain string paragraphs
function blocksToStrings(body: unknown[]): string[] {
  return body.map((block) => {
    if (typeof block === 'string') return block
    const b = block as { children?: { text: string }[] }
    return b.children?.map((c) => c.text).join('') ?? ''
  }).filter(Boolean)
}

async function getExhibition(): Promise<Exhibition> {
  if (client) {
    try {
      const data = await client.fetch(currentExhibitionQuery, {}, { next: { tags: ['exhibitions'] } })
      if (data) return data
    } catch {}
  }
  return FALLBACK_EXHIBITION
}

export default async function ExhibitionPage() {
  const ex = await getExhibition()

  const bodyParagraphs = Array.isArray(ex.body) ? blocksToStrings(ex.body) : []
  const dateRange = formatDateRange(ex.openingDate ?? null, ex.closingDate ?? null)

  return (
    <div style={{ background: '#fff', color: '#000' }}>
      <Nav active="Exhibitions" />

      {/* HERO */}
      <section style={{ padding: '40px 0 80px', borderBottom: '1.5px solid #000', background: ex.accentColour ?? 'var(--mm-orange)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: '5%', opacity: 0.25 }}>
          <RemixingM size={320} color="#000" interval={2200} seed={2}/>
        </div>
        <div className="wrap" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, fontSize: 14, flexWrap: 'wrap' }}>
            <Link href="/" style={{ opacity: 0.9 }}>Home</Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ opacity: 0.9 }}>Exhibitions</span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span>{ex.title}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
            {ex.status === 'Current' && (
              <span className="chip" style={{ background: '#000', color: '#fff', borderColor: '#000' }}>
                <span className="dot" style={{ background: 'var(--mm-green)' }}/> On now
              </span>
            )}
            {ex.status === 'Upcoming' && (
              <span className="chip" style={{ background: '#000', color: '#fff', borderColor: '#000' }}>Coming soon</span>
            )}
            {ex.isFree && (
              <span className="chip" style={{ background: 'transparent', borderColor: '#fff', color: '#fff' }}>Free entry</span>
            )}
          </div>
          <h1 className="h-display" style={{ margin: 0, color: '#fff', fontSize: 'clamp(64px, 11vw, 160px)' }}>
            {ex.title}.
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 620, fontSize: 22 }}>
            {ex.lede}
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            {dateRange && (
              <div>
                <div className="meta" style={{ opacity: 0.8 }}>Dates</div>
                <div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>{dateRange}</div>
              </div>
            )}
            {ex.location && (
              <div>
                <div className="meta" style={{ opacity: 0.8 }}>Location</div>
                <div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>{ex.location}</div>
              </div>
            )}
            <div>
              <div className="meta" style={{ opacity: 0.8 }}>Admission</div>
              <div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>{ex.isFree ? 'Free' : 'Ticketed'}</div>
            </div>
            {ex.ticketUrl && (
              <a href={ex.ticketUrl} className="btn btn--yellow btn--big">Book free entry →</a>
            )}
          </div>
        </div>
      </section>

      {/* IMAGE GRID */}
      <section className="wrap sp">
        <div className="layout-exhibition-img">
          <PhotoTile tone="red"    label="Installation view, central gallery" style={{ gridRow: 'span 2' }} className="angled"/>
          <PhotoTile tone="warm"   label="Karen Arthur's dress, detail" className="cutout"/>
          <PhotoTile tone="violet" label="Oral history listening booth"/>
          <PhotoTile tone="cool"   label="Object: suitcase, 1972" className="torn"/>
          <PhotoTile tone="yellow" label="Entrance signage"/>
        </div>
      </section>

      {/* ABOUT + VISIT INFO */}
      <section className="wrap sp layout-exhibition-info">
        <div className="prose" style={{ fontSize: 19, lineHeight: 1.6 }}>
          <div className="eyebrow" style={{ color: 'var(--mm-blue)', marginBottom: 16 }}>About this exhibition</div>
          <h2 style={{ fontSize: 42, margin: '0 0 20px', lineHeight: 1.05, fontWeight: 700 }}>
            {ex.contributors.length} contributors. {ex.contributors.length} ways in.
          </h2>
          {bodyParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <aside>
          {ex.accessInfo.length > 0 && (
            <div style={{ background: 'var(--mm-paper)', padding: 32, borderRadius: 4, border: '1.5px solid #000' }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Plan your visit</div>
              <dl style={{ margin: 0 }}>
                {ex.accessInfo.map((row) => (
                  <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '12px 0', borderBottom: '1px solid var(--mm-mid)' }}>
                    <dt style={{ fontWeight: 600 }}>{row.label}</dt>
                    <dd style={{ margin: 0, color: 'var(--mm-grey)' }}>{row.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/visit" className="btn btn--ghost" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
                Full accessibility guide →
              </Link>
            </div>
          )}

          {ex.featuredEvent && (
            <div style={{ marginTop: 24, padding: 32, background: 'var(--mm-yellow)', border: '1.5px solid #000' }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Upcoming event</div>
              <h3 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 700 }}>{ex.featuredEvent.title}</h3>
              <div style={{ fontSize: 14, marginBottom: 16 }}>
                {formatEventDate(ex.featuredEvent.date)}
                {ex.featuredEvent.price ? ` · ${ex.featuredEvent.price}` : ''}
                {ex.featuredEvent.isFree ? ' · Free' : ''}
              </div>
              {ex.featuredEvent.bookingUrl ? (
                <a href={ex.featuredEvent.bookingUrl} className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                  Book →
                </a>
              ) : (
                <a href="#" className="btn" style={{ width: '100%', justifyContent: 'center' }}>Book via Eventbrite →</a>
              )}
            </div>
          )}
        </aside>
      </section>

      {/* CONTRIBUTORS */}
      <section className="sp-v" style={{ background: 'var(--mm-black)', color: '#fff' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--mm-yellow)', marginBottom: 16 }}>Contributors</div>
          <h2 className="h-section" style={{ margin: '0 0 40px', color: '#fff' }}>
            {ex.contributors.length} people. One show.
          </h2>
          <div className="layout-contributors">
            {ex.contributors.map((c, i) => (
              <a key={c.name} href="#" style={{ display: 'block' }}>
                <PhotoTile label={c.name} tone={c.tone} style={{ aspectRatio: '1/1' }} className={i % 3 === 0 ? 'cutout' : ''}/>
                <div style={{ marginTop: 10, fontSize: 14, fontWeight: 600 }}>{c.name}</div>
              </a>
            ))}
            <a href="#" style={{ display: 'block' }}>
              <PhotoTile label="+ more" tone="mono" style={{ aspectRatio: '1/1' }}/>
              <div style={{ marginTop: 10, fontSize: 14, fontWeight: 600 }}>+ more</div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
