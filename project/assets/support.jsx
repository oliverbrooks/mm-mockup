/* Support / Donate page — with working fake-submit donation flow */

const { useState: useStateS } = React;

function SupportPage() {
  const [tab, setTab] = useStateS("individual");
  return (
    <div style={{ background: "#fff", color: "#000" }}>
      <Nav active="Support" />

      {/* HERO */}
      <section style={{ padding: "72px 0 56px", borderBottom: "1.5px solid #000", background: "var(--mm-violet)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: "3%", opacity: 0.25 }}>
          <RemixingM size={360} color="#fff" interval={2200} seed={1}/>
        </div>
        <div className="wrap" style={{ position: "relative" }}>
          <div className="eyebrow" style={{ color: "var(--mm-yellow)", marginBottom: 16 }}>Support us</div>
          <h1 className="h-display" style={{ margin: 0, color: "#fff" }}>
            Build a <em style={{ fontStyle: "italic", fontWeight: 500 }}>home</em><br/>
            for all of us.
          </h1>
          <p className="lede" style={{ marginTop: 28, maxWidth: 640, fontSize: 22 }}>
            Every pound brings us closer to Spring 2028. We're fundraising from individuals,
            foundations and corporate partners to open our permanent home at 65 Crutched Friars.
          </p>

          {/* Progress bar */}
          <FundraisingBar/>
        </div>
      </section>

      {/* TABS */}
      <div style={{ borderTop: "1.5px solid #000", borderBottom: "1.5px solid #000", background: "var(--mm-paper)", position: "sticky", top: 67, zIndex: 40 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {[
            { id: "individual", label: "Individuals", sub: "£5 — £5,000", color: "var(--mm-yellow)", num: "01" },
            { id: "institutional", label: "Institutional funders", sub: "Foundations & trusts", color: "var(--mm-blue)", num: "02" },
            { id: "corporate", label: "Corporate partners", sub: "Companies & brands", color: "var(--mm-orange)", num: "03" },
          ].map((t, i) => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                position: "relative",
                padding: "24px 28px 22px",
                textAlign: "left",
                background: active ? t.color : "transparent",
                color: "#000",
                borderLeft: i === 0 ? "none" : "1.5px solid #000",
                borderRight: "none",
                borderTop: "none",
                borderBottom: active ? "4px solid #000" : "4px solid transparent",
                marginBottom: -2,
                cursor: "pointer",
                transition: "background 0.15s",
                fontFamily: "var(--ff)",
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#fff"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div className="meta" style={{ fontSize: 11, color: active ? "#000" : "var(--mm-grey)", marginBottom: 6, letterSpacing: "0.08em" }}>
                      {t.num} · {active ? "Viewing" : "Jump to"}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.1 }}>{t.label}</div>
                    <div style={{ fontSize: 13, color: active ? "#000" : "var(--mm-grey)", marginTop: 4, fontWeight: 500 }}>{t.sub}</div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, opacity: active ? 1 : 0.35 }}>{active ? "●" : "→"}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {tab === "individual" && <IndividualTab/>}
      {tab === "institutional" && <InstitutionalTab/>}
      {tab === "corporate" && <CorporateTab/>}

      <Footer/>
    </div>
  );
}

function FundraisingBar() {
  const pct = 68;
  return (
    <div style={{ marginTop: 40, maxWidth: 720 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14 }}>
        <span>£8.2m raised of £12m campaign target</span>
        <span style={{ fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 14, background: "rgba(255,255,255,0.25)", borderRadius: 999, overflow: "hidden", border: "1.5px solid #fff" }}>
        <div style={{ height: "100%", width: pct + "%", background: "var(--mm-yellow)", transition: "width 0.8s ease" }}/>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, opacity: 0.85 }}>
        <span>Phase 1 · Site (done)</span>
        <span>Phase 2 · Fit-out (now)</span>
        <span>Phase 3 · Programme endowment</span>
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————————————————
   INDIVIDUAL DONATION FLOW (multi-step)
———————————————————————————————————————————————————————————— */

function IndividualTab() {
  const [step, setStep] = useStateS(1);
  const [amount, setAmount] = useStateS(50);
  const [custom, setCustom] = useStateS(false);
  const [freq, setFreq] = useStateS("once");
  const [name, setName] = useStateS("");
  const [email, setEmail] = useStateS("");
  const [giftAid, setGiftAid] = useStateS(true);

  const PRESETS = [10, 25, 50, 100, 250];

  const impact = (a) => {
    if (a < 25) return "Funds one student's schools-programme workshop.";
    if (a < 100) return "Supports a contributor's oral-history session.";
    if (a < 500) return "Helps commission new artwork for the 2028 opening.";
    return "Funds a named object case in the permanent galleries.";
  };

  return (
    <section className="wrap" style={{ padding: "64px 48px 96px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64 }}>
        <div>
          {/* Progress ticks */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{
                flex: 1, height: 6, borderRadius: 999,
                background: step >= n ? "var(--mm-black)" : "var(--mm-mid)",
              }}/>
            ))}
          </div>

          {step === 1 && (
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Step 1 of 3 · Your gift</div>
              <h2 className="h-section" style={{ margin: "0 0 28px" }}>Choose an amount</h2>

              <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                {["once", "monthly", "annual"].map(f => (
                  <button key={f} onClick={() => setFreq(f)} style={{
                    padding: "10px 18px", borderRadius: 999,
                    border: "1.5px solid #000",
                    background: freq === f ? "#000" : "#fff",
                    color: freq === f ? "#fff" : "#000",
                    fontWeight: 600, textTransform: "capitalize",
                  }}>{f === "once" ? "One-off" : f === "monthly" ? "Monthly" : "Annual"}</button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {PRESETS.map(v => (
                  <button key={v} onClick={() => { setAmount(v); setCustom(false); }} style={{
                    padding: "22px 0", border: "1.5px solid #000",
                    background: !custom && amount === v ? "var(--mm-yellow)" : "#fff",
                    fontSize: 22, fontWeight: 700,
                  }}>£{v}</button>
                ))}
                <button onClick={() => setCustom(true)} style={{
                  padding: "22px 0", border: "1.5px solid #000",
                  background: custom ? "var(--mm-yellow)" : "#fff",
                  fontSize: 22, fontWeight: 700,
                }}>Other</button>
              </div>

              {custom && (
                <div style={{ marginTop: 12 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", border: "1.5px solid #000", borderRadius: 4 }}>
                    <span style={{ fontSize: 22, fontWeight: 700 }}>£</span>
                    <input type="number" value={amount} onChange={e => setAmount(+e.target.value || 0)}
                      style={{ flex: 1, border: "none", background: "transparent", fontSize: 22, fontWeight: 700, fontFamily: "inherit", outline: "none" }} />
                  </label>
                </div>
              )}

              <div style={{ marginTop: 24, padding: 20, background: "var(--mm-paper)", borderLeft: "4px solid var(--mm-orange)" }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Your impact</div>
                <div style={{ fontSize: 17, fontWeight: 500 }}>{impact(amount)}</div>
              </div>

              <button className="btn btn--big" style={{ marginTop: 32 }} onClick={() => setStep(2)} disabled={!amount}>
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Step 2 of 3 · Your details</div>
              <h2 className="h-section" style={{ margin: "0 0 28px" }}>About you</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
                <Field label="Full name" required value={name} onChange={setName} />
                <Field label="Email" type="email" required value={email} onChange={setEmail} />
                <label style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 16, background: "var(--mm-paper)", cursor: "pointer" }}>
                  <input type="checkbox" checked={giftAid} onChange={e => setGiftAid(e.target.checked)} style={{ marginTop: 4 }}/>
                  <span style={{ fontSize: 15 }}>
                    <strong>Gift Aid +25%</strong> — I'm a UK taxpayer. Increase my £{amount} gift to <strong>£{Math.round(amount * 1.25)}</strong> at no cost to me.
                  </span>
                </label>
              </div>
              <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
                <button className="btn btn--ghost" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn--big" onClick={() => setStep(3)} disabled={!name || !email}>Continue →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--mm-green)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 800, marginBottom: 24 }}>
                ✓
              </div>
              <h2 className="h-section" style={{ margin: "0 0 16px" }}>Thank you, {name.split(" ")[0] || "friend"}.</h2>
              <p className="lede" style={{ maxWidth: 480, margin: "0 auto" }}>
                Your {freq === "once" ? "" : freq + " "}gift of <strong>£{giftAid ? Math.round(amount * 1.25) : amount}</strong> is confirmed.
                A receipt is on its way to {email}.
              </p>
              <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
                <a href="index.html" className="btn btn--big">Explore stories →</a>
                <button className="btn btn--ghost" onClick={() => setStep(1)}>Give again</button>
              </div>
            </div>
          )}
        </div>

        {/* Summary panel */}
        <aside>
          <div style={{ position: "sticky", top: 120, background: "var(--mm-paper)", padding: 32, border: "1.5px solid #000" }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Your gift</div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--mm-mid)" }}>
              <span>Amount</span><strong>£{amount}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--mm-mid)" }}>
              <span>Frequency</span><strong style={{ textTransform: "capitalize" }}>{freq}</strong>
            </div>
            {giftAid && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--mm-mid)", color: "var(--mm-blue)" }}>
                <span>Gift Aid +25%</span><strong>+ £{Math.round(amount * 0.25)}</strong>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0 0", fontSize: 22, fontWeight: 700 }}>
              <span>Total</span><span>£{giftAid ? Math.round(amount * 1.25) : amount}</span>
            </div>
            <div style={{ marginTop: 20, padding: 14, background: "#fff", borderRadius: 4, fontSize: 12, color: "var(--mm-grey)" }}>
              Secure donations via Donorfy. The Migration Museum is a registered charity (No. 1162925).
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({ label, type = "text", required, value, onChange }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: "block" }}>
        {label}{required && <span style={{ color: "var(--mm-orange)" }}> *</span>}
      </span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required}
        style={{
          width: "100%", padding: "14px 18px", fontSize: 16,
          border: "1.5px solid #000", borderRadius: 4,
          background: "#fff", fontFamily: "inherit", outline: "none",
        }}/>
    </label>
  );
}

/* ————————————————————————————————————————————————————————————
   INSTITUTIONAL FUNDERS TAB
———————————————————————————————————————————————————————————— */

function InstitutionalTab() {
  return (
    <section className="wrap" style={{ padding: "64px 48px 96px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64 }}>
        <div>
          <div className="eyebrow" style={{ color: "var(--mm-blue)", marginBottom: 12 }}>For foundations & trusts</div>
          <h2 className="h-section" style={{ margin: "0 0 24px" }}>Partner on something permanent.</h2>
          <p className="lede" style={{ marginTop: 0, marginBottom: 32 }}>
            We're raising the remaining £3.8m to complete fit-out and endow our founding programme.
            Institutional partners unlock named spaces, multi-year programme support, and a direct
            role in shaping the UK's first museum focused on migration.
          </p>

          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 16px" }}>Partnership tiers</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { tier: "Founding Partner", range: "£500,000 +", perks: "Named permanent gallery · Annual programme advisory · 10-year naming rights", color: "var(--mm-orange)" },
              { tier: "Major Partner", range: "£100,000 – 500,000", perks: "Named space or exhibition · Co-produced commission · 5-year recognition", color: "var(--mm-blue)" },
              { tier: "Programme Partner", range: "£25,000 – 100,000", perks: "Supports a season of exhibitions · Learning programme sponsorship", color: "var(--mm-violet)" },
              { tier: "Supporter", range: "£5,000 – 25,000", perks: "Recognised across digital & print · Supporter events", color: "var(--mm-green)" },
            ].map((t) => (
              <details key={t.tier} style={{ border: "1.5px solid #000", padding: 20, background: "#fff" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", listStyle: "none" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span className="dot" style={{ background: t.color, width: 14, height: 14 }}/>
                    <span style={{ fontWeight: 700, fontSize: 18 }}>{t.tier}</span>
                  </span>
                  <span style={{ fontWeight: 600, color: "var(--mm-grey)" }}>{t.range}</span>
                </summary>
                <p style={{ margin: "14px 0 0", color: "var(--mm-grey)" }}>{t.perks}</p>
              </details>
            ))}
          </div>
        </div>

        <aside>
          <div style={{ background: "var(--mm-black)", color: "#fff", padding: 32 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: 700 }}>Talk to our Development team</h3>
            <p style={{ margin: "0 0 24px", opacity: 0.8 }}>
              We'd love to discuss how your foundation's priorities align with our 2028 campaign.
            </p>
            <a href="mailto:development@migrationmuseum.org" className="btn btn--yellow" style={{ width: "100%", justifyContent: "center" }}>
              development@migrationmuseum.org
            </a>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.2)", fontSize: 14 }}>
              <div style={{ opacity: 0.6, marginBottom: 4 }}>Contact</div>
              <strong>Rob Kelly</strong>, Director of Development<br/>
              <span style={{ opacity: 0.8 }}>020 7403 xxxx</span>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <a href="#" className="btn btn--ghost" style={{ width: "100%", justifyContent: "center" }}>
              Download prospectus (PDF, 4.2mb)
            </a>
          </div>

          <div style={{ marginTop: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Current institutional partners</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Arts Council England", "Linbury Trust", "City of London", "Paul Hamlyn", "Esmée Fairbairn", "Garfield Weston"].map(n => (
                <div key={n} style={{ padding: "14px 10px", border: "1.5px solid #000", textAlign: "center", fontSize: 12, fontWeight: 600 }}>{n}</div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————————————
   CORPORATE TAB
———————————————————————————————————————————————————————————— */

function CorporateTab() {
  return (
    <section className="wrap" style={{ padding: "64px 48px 96px" }}>
      <div className="eyebrow" style={{ color: "var(--mm-orange)", marginBottom: 12 }}>For corporate partners</div>
      <h2 className="h-section" style={{ margin: "0 0 24px", maxWidth: 800 }}>
        Bring your people to the story of all of us.
      </h2>
      <p className="lede" style={{ maxWidth: 720 }}>
        Corporate partnerships combine philanthropy, employee engagement and brand alignment with
        one of the UK's most relevant cultural stories. Host a private view, book a bespoke workshop,
        or sponsor a season.
      </p>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { title: "Sponsor a season", price: "from £25,000", copy: "Your name across an exhibition and its programme of events.", tone: "cool" },
          { title: "Employee away-day", price: "from £3,500", copy: "Private tour + co-production workshop for up to 40.", tone: "yellow" },
          { title: "Venue hire (2028)", price: "from £8,000", copy: "Galleries, courtyard and restaurant available evenings.", tone: "violet" },
        ].map(p => (
          <div key={p.title} style={{ border: "1.5px solid #000" }}>
            <PhotoTile tone={p.tone} label={p.title} style={{ aspectRatio: "4/3" }}/>
            <div style={{ padding: 24 }}>
              <div className="meta" style={{ color: "var(--mm-grey)", marginBottom: 8 }}>{p.price}</div>
              <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 700 }}>{p.title}</h3>
              <p style={{ margin: 0, color: "var(--mm-grey)" }}>{p.copy}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, padding: 32, background: "var(--mm-yellow)", border: "1.5px solid #000", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div>
          <h3 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700 }}>Start a conversation</h3>
          <div style={{ color: "var(--mm-grey)" }}>We respond within two working days.</div>
        </div>
        <a href="mailto:partnerships@migrationmuseum.org" className="btn btn--big">Email partnerships team →</a>
      </div>
    </section>
  );
}

window.SupportPage = SupportPage;
