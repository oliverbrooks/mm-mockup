/* Homepage variant A — "Editorial Collage"
   Maximal, dense, story-forward, bold.
   Renders inside both the home.html artboard and /home-a.html standalone. */

const { useState: useStateA, useEffect: useEffectA } = React;

function HomeA() {
  return (
    <div style={{ background: "var(--mm-white)", color: "var(--mm-black)" }}>
      <Nav active="" />

      {/* ———— HERO: collage + big headline ———— */}
      <section style={{ position: "relative", borderBottom: "1.5px solid #000", overflow: "hidden" }}>
        <div className="wrap" style={{ position: "relative", padding: "48px 48px 72px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>
                <span className="dot" style={{ background: "var(--mm-orange)", marginRight: 8, verticalAlign: "middle" }}/> 
                A new museum, opening Spring 2028
              </div>
              <h1 className="h-display" style={{ margin: 0 }}>
                We are <br/>
                <span style={{ background: "var(--mm-yellow)", padding: "0 12px", display: "inline-block", transform: "rotate(-1.5deg)" }}>all</span> of us.
              </h1>
              <p className="lede" style={{ marginTop: 28, maxWidth: 520 }}>
                The Migration Museum reveals the human stories of movement to and from Britain —
                remixing them, and reframing who "we" are.
              </p>
              <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="stories.html" className="btn btn--big">Explore stories →</a>
                <a href="support.html" className="btn btn--ghost btn--big">Back the 2028 home</a>
              </div>
            </div>

            {/* Collage */}
            <div style={{ position: "relative", height: 560 }}>
              <PhotoTile label="Karen Arthur, portrait" tone="warm"
                style={{ position: "absolute", top: 20, left: 40, width: 260, height: 340, transform: "rotate(-4deg)", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                className="angled" />
              <PhotoTile label="NHS nurses, 1948" tone="cool"
                style={{ position: "absolute", top: 0, right: 0, width: 220, height: 260, transform: "rotate(3deg)" }}
                className="cutout" />
              <div style={{
                position: "absolute", bottom: 60, left: 0,
                width: 200, height: 200,
                background: "var(--mm-violet)",
                clipPath: "polygon(12% 8%, 88% 3%, 95% 62%, 92% 95%, 38% 98%, 5% 92%, 8% 38%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <RemixingM size={140} color="#fff" interval={1600} seed={4}/>
              </div>
              <PhotoTile label="Windrush Square, 2024" tone="green"
                style={{ position: "absolute", bottom: 0, right: 40, width: 240, height: 200, transform: "rotate(-2deg)" }}
                className="torn" />
              <div style={{
                position: "absolute", top: 180, left: 220,
                width: 130, height: 130, borderRadius: "50%",
                background: "var(--mm-orange)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 800, fontSize: 18, textTransform: "uppercase",
                letterSpacing: "0.04em", textAlign: "center", lineHeight: 1.1,
                transform: "rotate(8deg)",
              }}>
                Reveal<br/>Remix<br/>Reframe
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ———— MARQUEE ———— */}
      <Marquee bg="var(--mm-black)" color="var(--mm-yellow)" items={[
        "Opening Spring 2028", "65 Crutched Friars, City of London",
        "A permanent home for migration stories", "Reveal · Remix · Reframe",
        "Fundraising now", "Join the movement",
      ]}/>

      {/* ———— STORIES STRIP ———— */}
      <section className="wrap" style={{ padding: "96px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12, color: "var(--mm-blue)" }}>Stories, told in full</div>
            <h2 className="h-section" style={{ margin: 0, maxWidth: 800 }}>Comings and goings, <em style={{ fontStyle: "italic", fontWeight: 500 }}>across centuries.</em></h2>
          </div>
          <a href="stories.html" className="btn btn--ghost">All stories →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 24 }}>
          <StoryCardLarge
            tag="Oral history" tone="red"
            label="Karen Arthur in her studio"
            title="&ldquo;This dress is about taking up space.&rdquo;"
            meta="Karen Arthur · 9 min read"
          />
          <StoryCardSmall tag="Feature" tone="violet" title="The NHS origins" meta="7 min" label="NHS nurses 1948" />
          <StoryCardSmall tag="Exhibition" tone="yellow" title="Who Runs the World?" meta="Event recap" label="Leeds pop-up, 2023" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 24, marginTop: 24 }}>
          <StoryCardSmall tag="Oral history" tone="green" title="Routes: the Ugandan Asians" meta="12 min" label="Family archive photo"/>
          <StoryCardSmall tag="Food" tone="cool" title="How curry became British" meta="6 min" label="Bradford street scene"/>
          <StoryCardLarge tag="Youth voices" tone="dusk" label="Workshop with Hackney students"
            title="Young people, rewriting the map" meta="Community project · 2024"/>
        </div>
      </section>

      {/* ———— 2028 BLOCK ———— */}
      <section style={{ background: "var(--mm-black)", color: "#fff", padding: "96px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, opacity: 0.3 }}>
          <RemixingM size={400} color="var(--mm-blue)" interval={2200} seed={1}/>
        </div>
        <div style={{ position: "absolute", bottom: -80, left: -80, opacity: 0.2 }}>
          <RemixingM size={360} color="var(--mm-orange)" interval={2600} seed={6}/>
        </div>
        <div className="wrap" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--mm-yellow)", marginBottom: 16 }}>The permanent home</div>
              <h2 className="h-hero" style={{ margin: 0 }}>
                Spring<br/>2028.
              </h2>
              <p className="lede" style={{ marginTop: 24, opacity: 0.9, maxWidth: 480 }}>
                A state-of-the-art permanent home at 65 Crutched Friars, City of London —
                opening with galleries, a restaurant, and a shop that showcase the impact of migration on British life.
              </p>
              <Countdown />
              <div style={{ marginTop: 36, display: "flex", gap: 12 }}>
                <a href="visit.html" className="btn btn--yellow">The new museum →</a>
                <a href="support.html" className="btn btn--ghost" style={{ borderColor: "#fff", color: "#fff" }}>Help us get there</a>
              </div>
            </div>
            <div style={{ position: "relative", height: 500 }}>
              <img src="assets/img/courtyard-entrance.jpg" alt="65 Crutched Friars — courtyard entrance render"
                style={{ position: "absolute", inset: "0 40px", width: "calc(100% - 80px)", height: "100%", objectFit: "cover", transform: "rotate(1.5deg)", clipPath: "polygon(2% 4%, 98% 0%, 100% 96%, 3% 100%)" }}/>
              <div style={{
                position: "absolute", bottom: 20, left: 0,
                background: "var(--mm-yellow)", color: "#000",
                padding: "14px 20px", fontWeight: 700, fontSize: 14,
                textTransform: "uppercase", letterSpacing: "0.06em",
                transform: "rotate(-3deg)",
              }}>Courtyard entrance · Render</div>
            </div>
          </div>
        </div>
      </section>

      {/* ———— EXHIBITION STRIP ———— */}
      <section className="wrap" style={{ padding: "96px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12, color: "var(--mm-orange)" }}>On now</div>
            <h2 className="h-section" style={{ margin: 0 }}>What's happening</h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="chip">Exhibitions · 2</span>
            <span className="chip">Events · 7</span>
            <span className="chip">Online · 4</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <EventCard
            date="7 MAR — 27 JUL"
            tag="Exhibition · Free"
            tone="red"
            title="All Our Stories"
            copy="Our flagship exhibition — objects, oral histories and commissioned art from contributors across Britain."
            href="exhibition.html"
          />
          <EventCard
            date="SAT 4 MAY · 12 – 4 PM"
            tag="Event · Free"
            tone="violet"
            title="Who Runs the World? Festival"
            copy="Women's stories through books, food, fashion. Pop-up food, fabric memories workshop, mini-tours."
          />
          <EventCard
            date="ONGOING"
            tag="Education"
            tone="green"
            title="Schools programme"
            copy="Primary, secondary and university workshops — book a session or request resources."
          />
        </div>
      </section>

      {/* ———— QUOTE / CO-PRODUCTION ———— */}
      <section style={{ background: "var(--mm-paper)", padding: "96px 0", borderTop: "1.5px solid #000", borderBottom: "1.5px solid #000" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64, alignItems: "start" }}>
          <div>
            <AccentBar/>
            <div className="eyebrow" style={{ marginTop: 24, marginBottom: 12 }}>Co-production</div>
            <h3 className="h-card" style={{ margin: 0, fontSize: 24, lineHeight: 1.2 }}>
              Every story is told with the people who lived it.
            </h3>
            <p style={{ marginTop: 16, color: "var(--mm-grey)" }}>
              We listen, commission and collaborate — with communities, artists, and contributors —
              to make sure the museum speaks with, not about.
            </p>
          </div>
          <div>
            <blockquote style={{
              margin: 0, fontFamily: "var(--ff)", fontWeight: 600,
              fontSize: "clamp(28px, 3.2vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.02em",
            }}>
              &ldquo;It's like the older you get as a Black woman, the quieter you're supposed to become.
              <span style={{ background: "var(--mm-yellow)", padding: "0 8px" }}> This dress</span> is about taking up space.&rdquo;
            </blockquote>
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 14 }}>
              <PhotoTile label="" tone="red" style={{ width: 56, height: 56, borderRadius: "50%" }}/>
              <div>
                <div style={{ fontWeight: 700 }}>Karen Arthur</div>
                <div style={{ fontSize: 14, color: "var(--mm-grey)" }}>Contributor, All Our Stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ———— SUPPORT CTA ———— */}
      <section className="wrap" style={{ padding: "96px 48px" }}>
        <div style={{
          background: "var(--mm-blue)", color: "#fff",
          padding: "72px 64px", borderRadius: 4,
          display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, opacity: 0.25 }}>
            <RemixingM size={280} color="#fff" interval={1800} seed={2}/>
          </div>
          <div style={{ position: "relative" }}>
            <div className="eyebrow" style={{ color: "var(--mm-yellow)", marginBottom: 14 }}>Become a founder</div>
            <h2 className="h-section" style={{ margin: 0, color: "#fff" }}>
              Build a home for <br/>all of our stories.
            </h2>
            <p className="lede" style={{ marginTop: 20, maxWidth: 520 }}>
              We are fundraising now — from individuals, foundations and corporate partners — to open
              our permanent home in 2028.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
            <a href="support.html" className="btn btn--yellow btn--big" style={{ justifyContent: "space-between" }}>
              Donate today <span>→</span>
            </a>
            <a href="support.html#institutional" className="btn btn--big" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", justifyContent: "space-between" }}>
              Institutional funders <span>→</span>
            </a>
            <a href="support.html#corporate" className="btn btn--big" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", justifyContent: "space-between" }}>
              Corporate partners <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ———— cards ———— */

function StoryCardLarge({ tag, tone, label, title, meta }) {
  return (
    <a href="#" style={{ display: "block", gridRow: "span 1" }}>
      <PhotoTile label={label} tone={tone} style={{ aspectRatio: "16/10", marginBottom: 16 }}/>
      <div className="meta" style={{ color: "var(--mm-grey)", marginBottom: 8 }}>{tag} · {meta}</div>
      <h3 className="h-card" style={{ margin: 0, fontSize: 32 }} dangerouslySetInnerHTML={{ __html: title }}/>
    </a>
  );
}

function StoryCardSmall({ tag, tone, title, meta, label }) {
  return (
    <a href="#" style={{ display: "block" }}>
      <PhotoTile label={label} tone={tone} style={{ aspectRatio: "4/5", marginBottom: 14 }} className="angled"/>
      <div className="meta" style={{ color: "var(--mm-grey)", marginBottom: 6 }}>{tag} · {meta}</div>
      <h3 className="h-card" style={{ margin: 0, fontSize: 20 }}>{title}</h3>
    </a>
  );
}

function EventCard({ date, tag, title, copy, tone, href = "#" }) {
  return (
    <a href={href} style={{ display: "block", border: "1.5px solid #000", borderRadius: 4, overflow: "hidden", background: "#fff" }}>
      <PhotoTile label={title} tone={tone} style={{ aspectRatio: "5/4" }}/>
      <div style={{ padding: 24 }}>
        <div className="meta" style={{ color: "var(--mm-grey)", marginBottom: 10 }}>{date}</div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>{tag}</div>
        <h3 className="h-card" style={{ margin: "0 0 10px", fontSize: 26 }}>{title}</h3>
        <p style={{ margin: 0, color: "var(--mm-grey)", fontSize: 15 }}>{copy}</p>
      </div>
    </a>
  );
}

function Countdown() {
  const [now, setNow] = useStateA(() => new Date());
  useEffectA(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const target = new Date("2028-03-21T09:00:00Z");
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const items = [["Days", days], ["Hours", hours], ["Mins", mins], ["Secs", secs]];
  return (
    <div style={{ marginTop: 32, display: "flex", gap: 24, alignItems: "baseline" }}>
      {items.map(([l, v]) => (
        <div key={l}>
          <div style={{ fontWeight: 800, fontSize: 56, lineHeight: 0.9, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
            {String(v).padStart(2, "0")}
          </div>
          <div className="meta" style={{ marginTop: 6, opacity: 0.6 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

window.HomeA = HomeA;
