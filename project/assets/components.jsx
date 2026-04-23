/* Migration Museum — shared React components (JSX, Babel-compiled)
   Exported to window at the bottom so other <script type="text/babel"> files can use them. */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ————————————————————————————————————————————————————————————
   REMIXING "M" LOGO SYSTEM
   A family of hand-drawn M glyphs that rotate/swap on a timer.
   Each M is an inline SVG — different construction, line weight, fill style.
———————————————————————————————————————————————————————————— */

const M_VARIANTS = [
  // 0. Solid block M — chunky sans
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 90 L10 10 L30 10 L50 55 L70 10 L90 10 L90 90 L75 90 L75 35 L55 80 L45 80 L25 35 L25 90 Z" fill={color} />
    </svg>
  ),
  // 1. Twin-peak outline M
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 90 L8 12 L28 12 L50 50 L72 12 L92 12 L92 90" stroke={color} strokeWidth="10" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  ),
  // 2. Stacked circles M (dotted)
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="85" r="8" fill={color}/>
      <circle cx="15" cy="60" r="8" fill={color}/>
      <circle cx="15" cy="35" r="8" fill={color}/>
      <circle cx="15" cy="15" r="8" fill={color}/>
      <circle cx="35" cy="35" r="8" fill={color}/>
      <circle cx="50" cy="55" r="8" fill={color}/>
      <circle cx="65" cy="35" r="8" fill={color}/>
      <circle cx="85" cy="15" r="8" fill={color}/>
      <circle cx="85" cy="35" r="8" fill={color}/>
      <circle cx="85" cy="60" r="8" fill={color}/>
      <circle cx="85" cy="85" r="8" fill={color}/>
    </svg>
  ),
  // 3. Zigzag single-stroke M
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 88 L12 14 L50 62 L88 14 L88 88" stroke={color} strokeWidth="14" strokeLinejoin="miter" strokeLinecap="square" fill="none"/>
    </svg>
  ),
  // 4. Serif-ish M with slab
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 90 L6 10 L26 10 L50 60 L74 10 L94 10 L94 90 L78 90 L78 28 L56 78 L44 78 L22 28 L22 90 Z" fill={color}/>
      <rect x="2" y="6" width="28" height="6" fill={color}/>
      <rect x="70" y="6" width="28" height="6" fill={color}/>
      <rect x="2" y="88" width="28" height="6" fill={color}/>
      <rect x="70" y="88" width="28" height="6" fill={color}/>
    </svg>
  ),
  // 5. Script-style M with flourish
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 90 C 10 70, 10 40, 14 14 C 20 20, 32 50, 40 62 C 44 68, 48 68, 52 62 C 60 50, 72 20, 78 14 C 82 40, 82 70, 78 90"
        stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M14 90 C 20 94, 78 94, 82 90" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  // 6. Striped M
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mm-stripe" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <rect width="4" height="8" fill={color}/>
        </pattern>
      </defs>
      <path d="M10 90 L10 10 L30 10 L50 55 L70 10 L90 10 L90 90 L75 90 L75 35 L55 80 L45 80 L25 35 L25 90 Z" fill="url(#mm-stripe)"/>
    </svg>
  ),
  // 7. Split-color M (uses color for both halves via darken)
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 90 L10 10 L30 10 L50 55 L50 90 Z" fill={color}/>
      <path d="M50 55 L70 10 L90 10 L90 90 L50 90 Z" fill={color} opacity="0.55"/>
    </svg>
  ),
  // 8. Geometric "arrow" M
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 90 L10 10 L50 50 L90 10 L90 90" stroke={color} strokeWidth="12" strokeLinejoin="bevel" strokeLinecap="butt" fill="none"/>
      <path d="M50 50 L50 90" stroke={color} strokeWidth="12" strokeLinecap="butt"/>
    </svg>
  ),
  // 9. Stacked bars M
  (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="14" height="76" fill={color}/>
      <rect x="78" y="14" width="14" height="76" fill={color}/>
      <rect x="30" y="14" width="14" height="40" fill={color}/>
      <rect x="56" y="14" width="14" height="40" fill={color}/>
      <rect x="42" y="44" width="16" height="16" fill={color}/>
    </svg>
  ),
];

// Deterministic pick from variant list
function pickM(seed) {
  return M_VARIANTS[((seed % M_VARIANTS.length) + M_VARIANTS.length) % M_VARIANTS.length];
}

function RemixingM({ size = 48, color = "#000", seed = 0, interval = 0, className = "" }) {
  const [i, setI] = useState(seed);
  useEffect(() => {
    if (!interval) return;
    const t = setInterval(() => setI((v) => v + 1 + Math.floor(Math.random() * 3)), interval);
    return () => clearInterval(t);
  }, [interval]);
  const Variant = pickM(i);
  return (
    <span
      className={`mm-glyph ${className}`}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        lineHeight: 0,
        transition: "transform 0.25s ease",
      }}
      aria-hidden="true"
    >
      <Variant color={color} />
    </span>
  );
}

/* Horizontal MM lock-up used in headers/footers */
function MMLockup({ size = 36, color = "#000", interval = 2600, stagger = 900 }) {
  const [i, setI] = useState(3);
  const [j, setJ] = useState(7);
  useEffect(() => {
    const t1 = setInterval(() => setI((v) => v + 1 + Math.floor(Math.random() * 4)), interval);
    const t2 = setInterval(() => setJ((v) => v + 1 + Math.floor(Math.random() * 4)), interval + stagger);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [interval, stagger]);
  const A = pickM(i);
  const B = pickM(j);
  return (
    <span style={{ display: "inline-flex", gap: size * 0.12, alignItems: "center" }}>
      <span style={{ width: size, height: size, display: "block" }}><A color={color}/></span>
      <span style={{ width: size, height: size, display: "block" }}><B color={color}/></span>
    </span>
  );
}

/* Full wordmark: MIGRATION / MUSEUM with the MM lockup */
function Wordmark({ size = 14, color = "#000" }) {
  return (
    <span className="mm-wordmark" style={{ display: "inline-flex", alignItems: "center", gap: 10, color }}>
      <MMLockup size={size * 1.8} color={color} />
      <span style={{
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        lineHeight: 1,
        fontVariationSettings: '"wght" 800',
      }}>
        Migration<br/>Museum
      </span>
    </span>
  );
}

/* ————————————————————————————————————————————————————————————
   NAV + FOOTER
———————————————————————————————————————————————————————————— */

const NAV_LINKS = [
  { label: "Stories", href: "stories.html" },
  { label: "Exhibitions", href: "exhibition.html" },
  { label: "Learn", href: "#" },
  { label: "About", href: "about.html" },
  { label: "Visit", href: "visit.html" },
  { label: "Support", href: "support.html" },
];

function Nav({ active = "" }) {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a href="index.html" aria-label="Migration Museum — home" style={{ display: "flex", alignItems: "center" }}>
          <Wordmark size={13} />
        </a>
        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              className={`nav__link ${active === l.label ? "active" : ""}`}
            >
              {l.label}
            </a>
          ))}
          <a href="support.html" className="btn" style={{ marginLeft: 10, padding: "10px 18px" }}>
            Donate
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }}>
          <div>
            <div style={{ marginBottom: 20 }}>
              <Wordmark size={16} color="#fff" />
            </div>
            <p className="lede" style={{ fontSize: 18, opacity: 0.8, maxWidth: 360 }}>
              A permanent home for migration stories. Opening Spring 2028 at 65 Crutched Friars, City of London.
            </p>
            <form style={{ marginTop: 28, display: "flex", gap: 8, maxWidth: 360 }} onSubmit={(e) => { e.preventDefault(); const i = e.currentTarget.querySelector('input'); alert(`Thanks — we'll be in touch at ${i.value}.`); i.value = ''; }}>
              <input
                type="email" required placeholder="your@email.com"
                style={{
                  flex: 1, padding: "14px 18px",
                  background: "transparent", border: "1.5px solid #fff", borderRadius: 999,
                  color: "#fff", fontSize: 15, fontFamily: "inherit"
                }}
              />
              <button type="submit" className="btn btn--yellow" style={{ padding: "12px 20px" }}>Subscribe</button>
            </form>
          </div>
          {[
            { title: "Visit", links: ["What's on", "Plan your visit", "Accessibility", "The new museum"] },
            { title: "Connect", links: ["Stories", "Newsletter", "Migration Network", "Press"] },
            { title: "Support", links: ["Donate", "Institutional funders", "Corporate partners", "Legacy giving"] },
          ].map(col => (
            <div key={col.title}>
              <div className="eyebrow" style={{ opacity: 0.6, marginBottom: 16 }}>{col.title}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <li key={l}><a href="#" style={{ fontSize: 16 }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 30, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
          <div style={{ fontSize: 13, opacity: 0.6 }}>© 2026 Migration Museum. Charity No. 1162925.</div>
          <div style={{ display: "flex", gap: 18, fontSize: 13 }}>
            {["Instagram", "BlueSky", "LinkedIn", "TikTok", "YouTube"].map(s => (
              <a key={s} href="#" style={{ opacity: 0.7 }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ————————————————————————————————————————————————————————————
   COLLAGE PRIMITIVES
   Placeholder tiles that mimic the three brand image styles:
   - Cutout (rough edges)
   - Angled (with background)
   - Torn (irregular edges)
———————————————————————————————————————————————————————————— */

const BRAND_COLORS = ["#5A5FEF", "#A880FF", "#FF5C45", "#FFD700", "#59F5B1"];

// Gradient placeholder that LOOKS like a photo tile — used when no stock photo
function PhotoTile({ label = "Photo", hue = 0, tone = "warm", children, style = {}, className = "" }) {
  const grads = {
    warm: "linear-gradient(135deg, #F4A261 0%, #E76F51 40%, #9A3B28 100%)",
    cool: "linear-gradient(135deg, #C9D6FF 0%, #5A5FEF 50%, #1a1a4a 100%)",
    green: "linear-gradient(135deg, #B7EFC5 0%, #59F5B1 40%, #1a5a3a 100%)",
    mono: "linear-gradient(135deg, #E5E5E5 0%, #7A7A7A 50%, #000 100%)",
    violet: "linear-gradient(135deg, #E8D5FF 0%, #A880FF 40%, #3d2a66 100%)",
    yellow: "linear-gradient(135deg, #FFF1A8 0%, #FFD700 40%, #7a5900 100%)",
    red: "linear-gradient(135deg, #FFB4A5 0%, #FF5C45 40%, #7a1a0a 100%)",
    dusk: "linear-gradient(135deg, #FFC7A8 0%, #A880FF 60%, #1a1a4a 100%)",
  };
  return (
    <div
      className={`ph ${className}`}
      style={{
        background: grads[tone] || grads.warm,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* grain */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)",
        mixBlendMode: "overlay", pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, transparent 0 4px, rgba(0,0,0,0.04) 4px 5px)",
        pointerEvents: "none",
      }}/>
      {children}
      <div className="ph__label" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
        {label}
      </div>
    </div>
  );
}

/* Section divider with 5 accent dots */
function AccentBar({ style = {} }) {
  return (
    <div style={{ display: "flex", gap: 12, ...style }}>
      {BRAND_COLORS.map(c => (
        <span key={c} className="dot" style={{ background: c, width: 14, height: 14 }} />
      ))}
    </div>
  );
}

/* Marquee band — supports several visual modes via window.__mmMarqueeMode
   Modes:
     'bold'     — original yellow/black scrolling band (default)
     'subtle'   — slower, smaller, hairline borders, paper tone
     'static'   — no scroll; evenly-spaced bullet list
     'ticker'   — very thin top strip, monospace-feel
     'off'      — hide entirely
*/
function Marquee({ items, bg = "var(--mm-yellow)", color = "#000" }) {
  const [mode, setMode] = useState(() => window.__mmMarqueeMode || "bold");
  useEffect(() => {
    const h = () => setMode(window.__mmMarqueeMode || "bold");
    window.addEventListener("mm-marquee-change", h);
    return () => window.removeEventListener("mm-marquee-change", h);
  }, []);

  if (mode === "off") return null;

  if (mode === "static") {
    return (
      <div style={{
        background: "var(--mm-paper)",
        borderTop: "1px solid var(--mm-mid)",
        borderBottom: "1px solid var(--mm-mid)",
        padding: "14px 0",
      }}>
        <div className="wrap" style={{
          display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center",
          fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase",
          fontWeight: 500, color: "var(--mm-grey)",
        }}>
          {items.map((it, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
              {it}
              {i < items.length - 1 && <span style={{ color: "var(--mm-mid)" }}>·</span>}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "ticker") {
    const dup = [...items, ...items, ...items];
    return (
      <div style={{
        background: "#fff",
        color: "var(--mm-grey)",
        borderTop: "1px solid var(--mm-mid)",
        borderBottom: "1px solid var(--mm-mid)",
        overflow: "hidden", whiteSpace: "nowrap",
        padding: "8px 0",
      }}>
        <div style={{
          display: "inline-flex", gap: 36,
          animation: "mm-marquee 90s linear infinite",
          paddingLeft: 36,
          fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500,
        }}>
          {dup.map((it, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 36 }}>
              {it}
              <span style={{ color: "var(--mm-mid)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "subtle") {
    const dup = [...items, ...items, ...items];
    return (
      <div style={{
        background: "var(--mm-paper)",
        color: "var(--mm-black)",
        borderTop: "1px solid var(--mm-mid)",
        borderBottom: "1px solid var(--mm-mid)",
        overflow: "hidden", whiteSpace: "nowrap",
        padding: "14px 0",
      }}>
        <div style={{
          display: "inline-flex", gap: 40,
          animation: "mm-marquee 70s linear infinite",
          paddingLeft: 40,
          fontSize: 14, fontWeight: 500, letterSpacing: "0.04em",
        }}>
          {dup.map((it, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 40, opacity: 0.85 }}>
              {it}
              <span style={{ color: "var(--mm-grey)", fontSize: 10 }}>●</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  // bold (default)
  const dup = [...items, ...items, ...items];
  return (
    <div className="marquee" style={{ background: bg, color }}>
      <div className="marquee__track">
        {dup.map((it, i) => (
          <span key={i} className="marquee__item">{it}</span>
        ))}
      </div>
    </div>
  );
}

/* Export to window so other files can use them */
Object.assign(window, {
  RemixingM, MMLockup, Wordmark, Nav, Footer,
  PhotoTile, AccentBar, Marquee,
  M_VARIANTS, pickM, BRAND_COLORS, NAV_LINKS,
});
