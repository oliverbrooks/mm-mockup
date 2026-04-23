/* Homepage variant B — "Stories in motion"
   More editorial/curatorial, softer rhythm, asymmetric grid, paper-toned.
   Same content priorities, different IA: hero story as a narrative block,
   big rotating M system, vertical exhibition list. */

const { useState: useStateB, useEffect: useEffectB } = React;

function HomeB() {
  return (
    <div style={{ background: "var(--mm-paper)", color: "var(--mm-black)" }}>
      <Nav active="" />

      {/* ———— HERO: reading-room style, giant M monogram ———— */}
      <section style={{ borderBottom: "1.5px solid #000", background: "var(--mm-paper)" }}>
        <div className="wrap" style={{ padding: "64px 48px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "stretch" }}>
          {/* Left: giant headline + intro */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap" }}>
                <span className="chip" style={{ background: "var(--mm-black)", color: "#fff", borderColor: "#000" }}>
                  <span className="dot" style={{ background: "var(--mm-green)" }}/> Opening Spring 2028
                </span>
                <span className="chip">65 Crutched Friars, EC3</span>
              </div>
              <h1 className="h-display" style={{ margin: 0, fontSize: "clamp(56px, 8.4vw, 132px)" }}>
                Reveal.<br/>
                <span style={{ color: "var(--mm-orange)" }}>Remix.</span><br/>
                <span style={{ fontStyle: "italic", fontWeight: 500 }}>Reframe.</span>
              </h1>
              <p className="lede" style={{ marginTop: 28, maxWidth: 520 }}>
                Britain has thousands of museums. <strong>None</strong> is focused on the movement of people
                that has shaped who we are. We're building the one that is — and invite you to help.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 32, flexWrap: "wrap" }}>
              <a href="about.html" className="btn btn--big">Our mission →</a>
              <a href="#featured" className="btn btn--ghost btn--big">Read a story</a>
              <span style={{ fontSize: 13, color: "var(--mm-grey)", marginLeft: 6 }}>
                or scroll <span className="kbd">↓</span>
              </span>
            </div>
          </div>

          {/* Right: huge remixing M tile */}
          <div style={{ position: "relative", minHeight: 560, border: "1.5px solid #000", background: "#000", overflow: "hidden" }}>
            <video src="assets/video/homepage.mp4" autoPlay muted loop playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}/>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }}/>
            <div style={{
              position: "absolute", bottom: 16, left: 16, right: 16,
              fontSize: 12, fontFamily: "var(--ff)", color: "#fff",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 14px",
            }}>
              <span className="meta">Migration Museum · Intro film</span>
              <span className="meta" style={{ opacity: 0.7 }}>▶ Auto-playing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ———— MARQUEE ———— */}
      <Marquee bg="var(--mm-white)" color="var(--mm-black)" items={[
        "Co-produced with contributors across Britain",
        "A movement, not a moment",
        "Shortlisted · Art Fund Museum of the Year",
        "Fundraising for 2028",
      ]}/>

      {/* ———— FEATURED STORY (long-form teaser) ———— */}
      <section id="featured" className="wrap" style={{ padding: "96px 48px 72px" }}>
        <div className="eyebrow" style={{ marginBottom: 16, color: "var(--mm-blue)" }}>
          Featured story · 12 min read
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <h2 style={{
              fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 0.98,
              letterSpacing: "-0.025em", margin: 0, fontWeight: 700,
            }}>
              The day the <em style={{ fontStyle: "italic", fontWeight: 500 }}>Empire Windrush</em> docked,
              and the <span style={{ background: "var(--mm-green)", padding: "0 10px" }}>NHS</span> began.
            </h2>
            <p className="lede" style={{ marginTop: 24, maxWidth: 560 }}>
              Two arrivals, five days apart, in June 1948. Both shaped Britain more than almost
              anything that followed. A new feature, told with archive, oral histories, and music.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 14, alignItems: "center" }}>
              <a href="#" className="btn">Read the story →</a>
              <span style={{ fontSize: 14, color: "var(--mm-grey)" }}>By Ayo Adeyemi · 14 Apr 2026</span>
            </div>
          </div>
          <div style={{ position: "relative", height: 520 }}>
            <PhotoTile label="Archive: Empire Windrush, 1948" tone="cool" className="angled"
              style={{ position: "absolute", top: 0, left: 0, right: 60, height: 340, transform: "rotate(-2deg)" }}/>
            <PhotoTile label="NHS founding staff" tone="green" className="cutout"
              style={{ position: "absolute", bottom: 0, right: 0, width: 240, height: 260 }}/>
            <div style={{
              position: "absolute", top: 320, left: 30,
              background: "var(--mm-yellow)", color: "#000",
              padding: "10px 16px", fontWeight: 700, fontSize: 13,
              textTransform: "uppercase", letterSpacing: "0.06em",
              border: "1.5px solid #000",
              transform: "rotate(-3deg)",
            }}>Audio + archive · New</div>
          </div>
        </div>
      </section>

      {/* ———— THREE-STREAM GRID: Stories / Exhibitions / Learn ———— */}
      <section style={{ background: "#fff", borderTop: "1.5px solid #000", borderBottom: "1.5px solid #000" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            {[
              {
                eyebrow: "Stories",
                color: "var(--mm-blue)",
                title: "Voices",
                lede: "First-person oral histories from across Britain — food, faith, family, work.",
                tone: "cool",
                label: "Contributor portraits",
                link: "All 47 stories",
              },
              {
                eyebrow: "Exhibitions",
                color: "var(--mm-orange)",
                title: "On now",
                lede: "All Our Stories (free, 7 Mar — 27 Jul) + pop-up programme touring UK cities.",
                tone: "red",
                label: "All Our Stories install shot",
                link: "What's on →",
              },
              {
                eyebrow: "Learn",
                color: "var(--mm-green)",
                title: "Schools",
                lede: "Curriculum-linked workshops, KS2–KS5, plus resources for university educators.",
                tone: "green",
                label: "Workshop, Newham 2025",
                link: "Education programme",
              },
            ].map((col, i) => (
              <div key={col.title} style={{
                borderRight: i < 2 ? "1.5px solid #000" : "none",
                padding: "40px 32px", display: "flex", flexDirection: "column", gap: 18,
              }}>
                <div className="eyebrow" style={{ color: col.color }}>{col.eyebrow}</div>
                <PhotoTile label={col.label} tone={col.tone} style={{ aspectRatio: "4/3" }}/>
                <h3 className="h-card" style={{ margin: 0, fontSize: 36 }}>{col.title}</h3>
                <p style={{ margin: 0, color: "var(--mm-grey)" }}>{col.lede}</p>
                <a href="#" className="underline" style={{ fontWeight: 600, marginTop: "auto" }}>{col.link}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ———— 2028 NARRATIVE TIMELINE ———— */}
      <section style={{ padding: "96px 0", background: "var(--mm-paper)" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Road to 2028</div>
              <h2 className="h-section" style={{ margin: 0, maxWidth: 800 }}>
                The permanent home, one chapter at a time.
              </h2>
            </div>
            <a href="visit.html" className="btn">The new museum →</a>
          </div>

          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1.5px solid #000" }}>
            {[
              { year: "2020", title: "Lewisham pop-up", copy: "Our first long-run home welcomed 150,000 visitors.", dot: "var(--mm-yellow)" },
              { year: "2025", title: "65 Crutched Friars secured", copy: "A permanent home, confirmed in the City of London.", dot: "var(--mm-orange)" },
              { year: "2026", title: "Digital home launches", copy: "You're in the early version of it. Welcome.", dot: "var(--mm-blue)", active: true },
              { year: "2028", title: "Doors open", copy: "Galleries, learning space, restaurant, shop.", dot: "var(--mm-green)" },
            ].map((t, i) => (
              <li key={t.year} style={{
                padding: "32px 24px",
                borderRight: i < 3 ? "1.5px solid #000" : "none",
                borderBottom: "1.5px solid #000",
                background: t.active ? "var(--mm-black)" : "transparent",
                color: t.active ? "#fff" : "inherit",
                position: "relative",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span className="dot" style={{ background: t.dot, width: 14, height: 14 }}/>
                  <span className="meta" style={{ opacity: 0.7 }}>{t.year}</span>
                </div>
                <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>{t.title}</h3>
                <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>{t.copy}</p>
                {t.active && <div style={{ position: "absolute", top: 20, right: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mm-yellow)" }}>You are here</div>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ———— INSTITUTIONAL FUNDERS ———— */}
      <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1.5px solid #000" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "center" }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--mm-blue)", marginBottom: 14 }}>For foundations & institutional funders</div>
            <h2 className="h-section" style={{ margin: 0 }}>
              Partner with us on the 2028 opening.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              We're raising the remaining capital now. Multi-year partnerships unlock named spaces,
              sustained programme support and strategic impact across our audiences.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="support.html#institutional" className="btn btn--big">Institutional prospectus →</a>
              <a href="mailto:rob@migrationmuseum.org" className="btn btn--ghost btn--big">Talk to us</a>
            </div>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            border: "1.5px solid #000",
          }}>
            {[
              "Arts Council England", "The Linbury Trust", "City of London",
              "Paul Hamlyn Foundation", "Esmée Fairbairn", "Garfield Weston",
              "John Ellerman", "Heritage Fund", "+ 23 partners",
            ].map((n, i) => (
              <div key={n} style={{
                padding: "32px 20px", minHeight: 110,
                display: "flex", alignItems: "center", justifyContent: "center",
                textAlign: "center", fontWeight: 600, fontSize: 15,
                borderRight: (i % 3 !== 2) ? "1.5px solid #000" : "none",
                borderBottom: i < 6 ? "1.5px solid #000" : "none",
                background: i === 8 ? "var(--mm-yellow)" : "#fff",
              }}>{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ———— NEWSLETTER / MOVEMENT ———— */}
      <section style={{ padding: "96px 0", background: "var(--mm-orange)", color: "#fff", borderBottom: "1.5px solid #000", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: 40, left: "8%" }}><RemixingM size={200} color="#000" interval={2200} seed={1}/></div>
          <div style={{ position: "absolute", bottom: 40, right: "10%" }}><RemixingM size={240} color="#000" interval={2600} seed={6}/></div>
        </div>
        <div className="wrap" style={{ position: "relative", textAlign: "center", maxWidth: 720 }}>
          <h2 className="h-section" style={{ margin: 0, color: "#fff" }}>
            Join the movement.
          </h2>
          <p className="lede" style={{ marginTop: 16, opacity: 0.95 }}>
            One email a month. New stories, upcoming events, and how the 2028 opening is taking shape.
          </p>
          <NewsletterB/>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function NewsletterB() {
  const [email, setEmail] = useStateB("");
  const [sent, setSent] = useStateB(false);
  return (
    <form style={{ marginTop: 28, display: "flex", gap: 8, maxWidth: 520, margin: "28px auto 0" }}
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      {!sent ? (
        <>
          <input
            type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1, padding: "16px 20px",
              background: "#fff", border: "1.5px solid #000", borderRadius: 999,
              color: "#000", fontSize: 16, fontFamily: "inherit"
            }}
          />
          <button type="submit" className="btn btn--big" style={{ background: "#000", color: "#fff" }}>Subscribe</button>
        </>
      ) : (
        <div style={{ background: "#fff", color: "#000", padding: "18px 22px", borderRadius: 999, fontWeight: 600, margin: "0 auto", border: "1.5px solid #000" }}>
          ✓ You're in. See you next month.
        </div>
      )}
    </form>
  );
}

window.HomeB = HomeB;
