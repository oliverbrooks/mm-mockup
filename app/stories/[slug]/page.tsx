import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { PhotoTile } from '@/components/PhotoTile'
import { AccentBar } from '@/components/AccentBar'
import { STORIES } from '@/lib/stories'
import { client } from '@/sanity/lib/client'
import { storyBySlugQuery, allStorySlugQuery } from '@/sanity/lib/queries'

export const revalidate = 3600

export async function generateStaticParams() {
  if (client) {
    try {
      const slugs: { slug: string | { current?: string } }[] = await client.fetch(allStorySlugQuery)
      return slugs
        .map((s) => (typeof s.slug === 'string' ? s.slug : s.slug?.current))
        .filter((slug): slug is string => Boolean(slug))
        .map((slug) => ({ slug }))
    } catch {}
  }
  return STORIES.map((s) => ({ slug: s.slug.current }))
}

async function getStory(slug: string) {
  if (client) {
    try {
      const story = await client.fetch(storyBySlugQuery, { slug }, { next: { tags: ['stories'] } })
      if (story) return story
    } catch {}
  }
  return STORIES.find((s) => s.slug.current === slug) ?? null
}

async function getRelated(slug: string) {
  if (client) {
    try {
      const all = await client.fetch(
        `*[_type == "story" && slug.current != $slug] | order(publishedAt desc)[0..2] { slug, title, contributor, role, format, era, readingTime, tone, lede }`,
        { slug },
        { next: { tags: ['stories'] } }
      )
      return all
    } catch {}
  }
  return STORIES.filter((s) => s.slug.current !== slug).slice(0, 3)
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [story, related] = await Promise.all([getStory(slug), getRelated(slug)])

  if (!story) notFound()

  // body may be Portable Text blocks (Sanity) or plain string array (static)
  const bodyParagraphs: string[] = Array.isArray(story.body)
    ? story.body.every((b: unknown) => typeof b === 'string')
      ? story.body
      : story.body.map((block: { children?: { text: string }[] }) =>
          block.children?.map((c) => c.text).join('') ?? ''
        )
    : []

  return (
    <div style={{ background: '#fff', color: '#000' }}>
      <Nav active="Stories" />

      {/* HERO */}
      <section className="layout-story-hero" style={{ borderBottom: '1.5px solid #000' }}>
        <PhotoTile
          tone={story.tone}
          label={story.contributor}
          image={story.contributorImage}
          imageAlt={`${story.contributor} portrait`}
          imageSizes="(max-width: 900px) 100vw, 50vw"
          imageWidth={1400}
          imageHeight={980}
          priority
          style={{ minHeight: 480 }}
        />
        <div style={{
          background: 'var(--mm-paper)',
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, flexWrap: 'wrap' }}>
            <Link href="/" style={{ opacity: 0.6 }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/stories" style={{ opacity: 0.6 }}>Stories</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{story.contributor}</span>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="chip" style={{ background: 'var(--mm-black)', color: '#fff', borderColor: '#000' }}>
              {story.format}
            </span>
            <span className="chip">{story.era}</span>
            <span className="chip" style={{ borderColor: 'var(--mm-mid)' }}>{story.readingTime}</span>
          </div>

          <h1 style={{
            margin: 0,
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
          }}>
            {story.title}
          </h1>

          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
              {story.contributor}{' '}
              <span style={{ fontWeight: 400, color: 'var(--mm-grey)' }}>— {story.role}</span>
            </div>
            <p className="lede" style={{ margin: 0, fontSize: 'clamp(18px, 2vw, 22px)' }}>
              {story.lede}
            </p>
          </div>
        </div>
      </section>

      {/* BODY + SIDEBAR */}
      <section className="wrap sp">
        <div className="layout-story">
          <article>
            <AccentBar />
            <div style={{ marginTop: 32 }} className="prose">
              {bodyParagraphs.map((para, i) => (
                <div key={i}>
                  <p style={{ fontSize: 19, lineHeight: 1.7, margin: '0 0 24px', color: i === 0 ? '#000' : 'var(--mm-grey)' }}>
                    {para}
                  </p>
                  {i === 1 && (
                    <blockquote style={{
                      margin: '40px 0',
                      padding: '32px 36px',
                      background: 'var(--mm-yellow)',
                      border: '1.5px solid #000',
                      fontWeight: 700,
                      fontSize: 'clamp(20px, 2.5vw, 28px)',
                      lineHeight: 1.25,
                      letterSpacing: '-0.02em',
                    }}>
                      &ldquo;{story.pullQuote}&rdquo;
                    </blockquote>
                  )}
                </div>
              ))}
            </div>

            {(story.format === 'Oral history' || story.format === 'Feature') && (
              <div style={{
                marginTop: 48,
                padding: '24px 28px',
                border: '1.5px solid #000',
                background: 'var(--mm-paper)',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--mm-black)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>▶</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Listen to the full interview</div>
                  <div className="meta" style={{ color: 'var(--mm-grey)' }}>{story.readingTime} · Audio available</div>
                </div>
              </div>
            )}
          </article>

          <aside>
            <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ border: '1.5px solid #000', padding: 28, background: 'var(--mm-paper)' }}>
                <div className="eyebrow" style={{ marginBottom: 16 }}>Contributor</div>
                <PhotoTile
                  tone={story.tone}
                  label={story.contributor}
                  image={story.contributorImage}
                  imageAlt={`${story.contributor} portrait`}
                  imageSizes="(max-width: 1100px) 45vw, 280px"
                  imageWidth={600}
                  imageHeight={600}
                  style={{ aspectRatio: '1/1', borderRadius: '50%', marginBottom: 16 }}
                  className="cutout"
                />
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{story.contributor}</div>
                <div style={{ fontSize: 13, color: 'var(--mm-grey)', marginBottom: 16 }}>{story.role}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--mm-grey)' }}>{story.bio}</p>
              </div>

              <div style={{ border: '1.5px solid #000', padding: 28 }}>
                <div className="eyebrow" style={{ marginBottom: 16 }}>Their object</div>
                <PhotoTile
                  tone={story.tone}
                  label={story.objectLabel ?? story.object?.label}
                  image={story.objectImage}
                  imageAlt={story.objectLabel ?? story.object?.label ?? `${story.contributor}'s object`}
                  imageSizes="(max-width: 1100px) 90vw, 360px"
                  imageWidth={960}
                  imageHeight={720}
                  style={{ aspectRatio: '4/3', marginBottom: 16 }}
                  className="torn"
                />
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{story.objectLabel ?? story.object?.label}</div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--mm-grey)', lineHeight: 1.6 }}>
                  {story.objectCaption ?? story.object?.caption}
                </p>
              </div>

              <div style={{ padding: '20px 28px', border: '1.5px solid var(--mm-mid)' }}>
                <div className="eyebrow" style={{ marginBottom: 12, color: 'var(--mm-grey)' }}>Share this story</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {['BlueSky', 'Instagram', 'LinkedIn'].map((s) => (
                    <a key={s} href="#" className="btn btn--ghost" style={{ padding: '8px 14px', fontSize: 13 }}>{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED STORIES */}
      <section className="sp-v" style={{ background: 'var(--mm-paper)', borderTop: '1.5px solid #000' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>More stories</div>
              <h2 className="h-section" style={{ margin: 0 }}>Keep reading.</h2>
            </div>
            <Link href="/stories" className="btn btn--ghost">All stories →</Link>
          </div>
          <div className="layout-3col">
            {related.map((s: { slug: string | { current: string }; tone: string; contributor: string; format: string; title: string; readingTime: string }) => {
              const relSlug = typeof s.slug === 'string' ? s.slug : s.slug?.current
              return (
                <Link key={relSlug} href={`/stories/${relSlug}`} style={{ display: 'block' }}>
                  <PhotoTile
                    tone={s.tone}
                    label={s.contributor}
                    style={{ aspectRatio: '4/3', marginBottom: 14 }}
                    className="angled"
                  />
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span className="chip" style={{ fontSize: 12, padding: '4px 10px' }}>{s.format}</span>
                  </div>
                  <h3 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                    {s.title}
                  </h3>
                  <div className="meta" style={{ color: 'var(--mm-grey)' }}>{s.contributor} · {s.readingTime}</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CONTRIBUTE CTA */}
      <section className="sp-v" style={{ background: 'var(--mm-black)', color: '#fff' }}>
        <div className="wrap" style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'var(--mm-yellow)', marginBottom: 16 }}>Share your story</div>
          <h2 className="h-section" style={{ margin: '0 0 20px', color: '#fff' }}>Has migration<br/>shaped your life?</h2>
          <p className="lede" style={{ opacity: 0.8, marginBottom: 32 }}>
            Every story in this archive began with someone saying yes. We co-produce
            all our stories with contributors — your words, your terms.
          </p>
          <a href="mailto:stories@migrationmuseum.org" className="btn btn--yellow btn--big">
            Get in touch →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
