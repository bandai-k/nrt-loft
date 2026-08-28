import { useState, useEffect, useRef } from "react";

// ── Logo SVG (Concept A) ──────────────────────
function Logo({ scale = 1 }) {
  return (
    <svg width={180 * scale} height={56 * scale} viewBox="0 0 230 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="4,28 18,10 32,28" stroke="#d97706" strokeWidth="1.8" fill="none" strokeLinejoin="miter" />
      <rect x="4" y="28" width="28" height="30" stroke="#d97706" strokeWidth="1.4" fill="none" opacity="0.85" />
      <line x1="18" y1="28" x2="18" y2="58" stroke="#d97706" strokeWidth="0.7" opacity="0.5" />
      <line x1="4"  y1="40" x2="32" y2="40" stroke="#d97706" strokeWidth="0.7" opacity="0.5" />
      <line x1="4"  y1="49" x2="32" y2="49" stroke="#d97706" strokeWidth="0.7" opacity="0.5" />
      <rect x="24" y="14" width="4" height="8" stroke="#d97706" strokeWidth="1" fill="none" opacity="0.6" />
      <line x1="0" y1="58" x2="36" y2="58" stroke="#d97706" strokeWidth="1.4" opacity="0.4" />
      <text x="48" y="35" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="28" fill="#e8e2d4" letterSpacing="5">NRT-LOFT</text>
      <line x1="48" y1="42" x2="218" y2="42" stroke="rgba(217,119,6,0.45)" strokeWidth="0.8" />
      <text x="48" y="54" fontFamily="'Share Tech Mono', monospace" fontSize="8" fill="#d97706" letterSpacing="3" opacity="0.7">OPEN FLOOR, OPEN MIND</text>
    </svg>
  );
}

// ── Texture overlay ──────────────────────────
function GrainOverlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
      opacity: 0.35,
    }} />
  );
}

// ── useInView ────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      ...style,
    }}>{children}</div>
  );
}

// ── Section label ────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, marginBottom: 40,
    }}>
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.4em", color: "#92400e" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(217,119,6,0.2)" }} />
    </div>
  );
}

// ── Phase badge ──────────────────────────────
function PhaseBadge({ phase, label, sub, active }) {
  return (
    <div style={{
      padding: "20px 24px",
      border: `1px solid ${active ? "rgba(217,119,6,0.7)" : "rgba(217,119,6,0.2)"}`,
      borderRadius: 2,
      background: active ? "rgba(217,119,6,0.08)" : "transparent",
      position: "relative",
    }}>
      {active && (
        <div style={{
          position: "absolute", top: -1, left: -1, right: -1,
          height: 2, background: "linear-gradient(90deg, #d97706, #f59e0b)",
        }} />
      )}
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, letterSpacing: "0.3em", color: "#92400e", marginBottom: 6 }}>{phase}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.1em", color: active ? "#f59e0b" : "#6b5a3a", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 11, color: "#6b5a3a", letterSpacing: "0.05em" }}>{sub}</div>
      {active && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          marginTop: 10, padding: "3px 10px",
          background: "rgba(217,119,6,0.15)", border: "1px solid rgba(217,119,6,0.4)",
          borderRadius: 1,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 6px #f59e0b", animation: "pulse 1.5s infinite" }} />
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: "#f59e0b", letterSpacing: "0.2em" }}>NOW</span>
        </div>
      )}
    </div>
  );
}

// ── SNS card ─────────────────────────────────
function SnsCard({ icon, name, handle, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "block", padding: "24px",
        border: `1px solid ${hov ? "rgba(217,119,6,0.6)" : "rgba(217,119,6,0.2)"}`,
        borderRadius: 2, background: hov ? "rgba(217,119,6,0.06)" : "transparent",
        textDecoration: "none", transition: "all 0.2s ease",
      }}>
      <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.1em", color: "#e8e2d4", marginBottom: 4 }}>{name}</div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#d97706", letterSpacing: "0.1em" }}>{handle}</div>
    </a>
  );
}

// ── Service card ─────────────────────────────
function ServiceCard({ icon, title, desc }) {
  return (
    <div style={{
      padding: "28px 24px",
      border: "1px solid rgba(217,119,6,0.18)",
      borderRadius: 2,
      background: "rgba(255,255,255,0.01)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 24, height: 24, borderTop: "1px solid rgba(217,119,6,0.5)", borderLeft: "1px solid rgba(217,119,6,0.5)" }} />
      <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.1em", color: "#e8e2d4", marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 12, lineHeight: 1.9, color: "#7a6a4a", letterSpacing: "0.04em" }}>{desc}</div>
    </div>
  );
}

// ── Main ─────────────────────────────────────
export default function NrtLoft() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const bg = "#0e0b06";
  const amber = "#d97706";

  return (
    <div style={{ background: bg, color: "#c8bfa8", minHeight: "100vh", fontFamily: "sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Noto+Sans+JP:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(217,119,6,0.3); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0e0b06; }
        ::-webkit-scrollbar-thumb { background: #92400e; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        a { color: inherit; text-decoration: none; }
        .nav-link {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.2em;
          color: #6b5a3a; transition: color 0.2s;
        }
        .nav-link:hover { color: #d97706; }
        .btn-primary {
          display: inline-block;
          padding: 12px 32px;
          border: 1px solid rgba(217,119,6,0.7);
          background: rgba(217,119,6,0.1);
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.25em;
          color: #f59e0b; border-radius: 1px;
          transition: all 0.2s ease; cursor: pointer;
        }
        .btn-primary:hover { background: rgba(217,119,6,0.2); border-color: #f59e0b; }
        .btn-ghost {
          display: inline-block;
          padding: 12px 32px;
          border: 1px solid rgba(217,119,6,0.25);
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.25em;
          color: #6b5a3a; border-radius: 1px;
          transition: all 0.2s ease; cursor: pointer;
        }
        .btn-ghost:hover { border-color: rgba(217,119,6,0.6); color: #d97706; }
      `}</style>

      <GrainOverlay />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 48px",
        background: `rgba(14,11,6,${Math.min(0.95, scrollY / 150)})`,
        borderBottom: scrollY > 40 ? "1px solid rgba(217,119,6,0.12)" : "none",
        backdropFilter: "blur(8px)",
        transition: "all 0.3s ease",
      }}>
        <a href="/"><Logo scale={0.65} /></a>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[["#about","NRT LOFTとは"],["#status","ステータス"],["#sns","SNS"],["#service","できること"],["#access","アクセス"]].map(([href, label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
          <a href="https://www.instagram.com/nebulab_koki/" target="_blank" className="btn-primary" style={{ padding: "8px 20px", fontSize: 9 }}>Instagram →</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 48px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* bg cross-hatch lines */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(217,119,6,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,119,6,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }} />
        {/* amber glow */}
        <div style={{
          position: "absolute", bottom: -100, right: -100,
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <FadeIn>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.5em", color: "#92400e", marginBottom: 24 }}>
              — NARITA, CHIBA · DIY RENOVATION PROJECT
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(56px, 10vw, 110px)",
              letterSpacing: "0.06em", lineHeight: 1,
              color: "#e8e2d4", marginBottom: 8,
            }}>NRT LOFT</h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(16px, 3vw, 28px)",
              letterSpacing: "0.15em", color: amber, marginBottom: 40, opacity: 0.7,
            }}>OPEN FLOOR, OPEN MIND</div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{
              fontSize: 15, lineHeight: 2.1, color: "#7a6a4a",
              fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300,
              maxWidth: 480, marginBottom: 48, letterSpacing: "0.06em",
            }}>
              成田の旧釣具屋2階を<br />
              DIYでリノベーション中。<br />
              フリーランスエンジニアKokiが、<br />
              地域に開かれた拠点を作るプロジェクト。
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="https://www.instagram.com/nebulab_koki/" target="_blank" className="btn-primary">Instagramで過程を見る →</a>
              <a href="https://www.nebulab.jp/" target="_blank" className="btn-ghost">NEBULABについて</a>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ marginTop: 48, fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.3em", color: "#4a3a22" }}>
              2025.02.15 START
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 48px", maxWidth: 960, margin: "0 auto" }}>
        <FadeIn><SectionLabel>01 · ABOUT</SectionLabel></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <FadeIn>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "0.08em",
              color: "#e8e2d4", lineHeight: 1.15, marginBottom: 32,
            }}>
              NRT LOFT<br />
              <span style={{ color: amber, fontSize: "0.55em", letterSpacing: "0.2em" }}>とは</span>
            </h2>
            <p style={{ fontSize: 13, lineHeight: 2.3, color: "#7a6a4a", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, letterSpacing: "0.06em" }}>
              NRT LOFTは、成田市の旧山中釣具店2階にある約10畳の小さなスペースです。
            </p>
            <p style={{ fontSize: 13, lineHeight: 2.3, color: "#7a6a4a", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, letterSpacing: "0.06em", marginTop: 16 }}>
              エンジニアの作業場として、成田エリアのお店の相談場所として、少人数のワークショップ会場として。小さく始めて、ゆくゆくは地域に開かれた拠点にしていきます。
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            {/* Blueprint-style space diagram */}
            <div style={{
              border: "1px solid rgba(217,119,6,0.25)", borderRadius: 2, padding: 32,
              background: "rgba(217,119,6,0.02)", position: "relative",
            }}>
              <div style={{ position: "absolute", top: 12, left: 16, fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: "#4a3a22", letterSpacing: "0.2em" }}>FLOOR PLAN · 2F</div>
              <svg width="100%" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Room outline */}
                <rect x="10" y="20" width="180" height="130" stroke="rgba(217,119,6,0.4)" strokeWidth="1.5" fill="rgba(217,119,6,0.02)" strokeDasharray="4,2" />
                {/* Staircase */}
                <rect x="10" y="100" width="30" height="50" stroke="rgba(217,119,6,0.3)" strokeWidth="0.8" fill="none" />
                <line x1="10" y1="110" x2="40" y2="110" stroke="rgba(217,119,6,0.2)" strokeWidth="0.6" />
                <line x1="10" y1="120" x2="40" y2="120" stroke="rgba(217,119,6,0.2)" strokeWidth="0.6" />
                <line x1="10" y1="130" x2="40" y2="130" stroke="rgba(217,119,6,0.2)" strokeWidth="0.6" />
                <line x1="10" y1="140" x2="40" y2="140" stroke="rgba(217,119,6,0.2)" strokeWidth="0.6" />
                <text x="25" y="158" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="5" fill="rgba(217,119,6,0.4)">STAIRS</text>
                {/* Work area */}
                <rect x="50" y="30" width="130" height="80" stroke="rgba(217,119,6,0.25)" strokeWidth="0.8" fill="rgba(217,119,6,0.03)" />
                <text x="115" y="74" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="7" fill="rgba(217,119,6,0.5)">WORK SPACE</text>
                <text x="115" y="85" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="6" fill="rgba(217,119,6,0.3)">約10畳</text>
                {/* Dimension arrows */}
                <line x1="10" y1="12" x2="190" y2="12" stroke="rgba(217,119,6,0.3)" strokeWidth="0.5" markerEnd="url(#arr)" />
                <text x="100" y="10" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="5" fill="rgba(217,119,6,0.4)">旧山中釣具店 2F</text>
              </svg>
              <div style={{ marginTop: 16, fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: "#4a3a22", letterSpacing: "0.2em", textAlign: "right" }}>
                〒286-0033 成田市花崎町
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STATUS ── */}
      <section id="status" style={{ padding: "100px 48px", borderTop: "1px solid rgba(217,119,6,0.1)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><SectionLabel>02 · STATUS</SectionLabel></FadeIn>
          <FadeIn>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: "0.08em", color: "#e8e2d4", marginBottom: 48 }}>
              現在のステータス
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { phase: "PHASE 1 · 2月", label: "DIYリノベ", sub: "現在進行中", active: true },
              { phase: "PHASE 2 · 3月", label: "拠点として稼働開始", sub: "Coming Soon", active: false },
              { phase: "PHASE 3 · 4月〜", label: "ワークショップ・時間貸し", sub: "予定", active: false },
            ].map((p, i) => (
              <FadeIn key={p.phase} delay={i * 0.1}>
                <PhaseBadge {...p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SNS ── */}
      <section id="sns" style={{ padding: "100px 48px", borderTop: "1px solid rgba(217,119,6,0.1)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><SectionLabel>03 · SNS</SectionLabel></FadeIn>
          <FadeIn>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: "0.08em", color: "#e8e2d4", marginBottom: 12 }}>
              DIYリノベを発信中
            </h2>
            <p style={{ fontSize: 12, color: "#6b5a3a", letterSpacing: "0.06em", marginBottom: 48, fontFamily: "'Noto Sans JP', sans-serif" }}>
              リノベーションの過程をリアルタイムで発信しています。
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { icon: "📸", name: "Instagram", handle: "@nebulab_koki", href: "https://www.instagram.com/nebulab_koki/" },
              { icon: "🎵", name: "TikTok", handle: "@nebulab_nrt", href: "https://www.tiktok.com/@nebulab_nrt" },
              { icon: "▶️", name: "YouTube", handle: "@nebulab_koki", href: "https://www.youtube.com/@nebulab_koki" },
            ].map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.1}>
                <SnsCard {...s} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE ── */}
      <section id="service" style={{ padding: "100px 48px", borderTop: "1px solid rgba(217,119,6,0.1)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><SectionLabel>04 · SERVICE</SectionLabel></FadeIn>
          <FadeIn>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: "0.08em", color: "#e8e2d4", marginBottom: 8 }}>
              できること
            </h2>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.3em", color: "#92400e", marginBottom: 48 }}>
              2025年4月〜予定
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 40 }}>
            {[
              { icon: "🤝", title: "お店のIT相談", desc: "成田エリアの飲食店・小売店の方、気軽にお越しください。" },
              { icon: "📚", title: "少人数ワークショップ", desc: "Googleマップの使い方、SNS写真の撮り方など（4〜6名）。" },
              { icon: "💻", title: "時間貸しスペース", desc: "作業場として使いたい方に開放予定。" },
            ].map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <ServiceCard {...s} />
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p style={{ fontSize: 12, color: "#4a3a22", fontFamily: "'Noto Sans JP', sans-serif", letterSpacing: "0.05em" }}>
              詳しくは <a href="https://www.nebulab.jp/" target="_blank" style={{ color: amber, borderBottom: "1px solid rgba(217,119,6,0.4)" }}>NEBULABのサイト</a> をご覧ください。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── ACCESS ── */}
      <section id="access" style={{ padding: "100px 48px", borderTop: "1px solid rgba(217,119,6,0.1)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn><SectionLabel>05 · ACCESS</SectionLabel></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            <FadeIn>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: "0.08em", color: "#e8e2d4", marginBottom: 40 }}>
                アクセス
              </h2>
              {[
                ["ADDRESS", "〒286-0033\n千葉県成田市花崎町"],
                ["BUILDING", "旧山中釣具店 2階"],
                ["CONTACT", "hello@nebulab.jp"],
              ].map(([label, value]) => (
                <div key={label} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid rgba(217,119,6,0.1)" }}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, letterSpacing: "0.35em", color: "#92400e", marginBottom: 8 }}>{label}</div>
                  <div style={{ fontSize: 13, color: "#c8bfa8", letterSpacing: "0.06em", lineHeight: 1.8, whiteSpace: "pre-line" }}>{value}</div>
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.15}>
              {/* Map placeholder */}
              <div style={{
                border: "1px solid rgba(217,119,6,0.2)", borderRadius: 2,
                background: "rgba(217,119,6,0.02)",
                height: 300, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 12,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `
                    linear-gradient(rgba(217,119,6,0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(217,119,6,0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px",
                }} />
                <div style={{ fontSize: 32, zIndex: 1 }}>📍</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: amber, letterSpacing: "0.2em", zIndex: 1 }}>NARITA, CHIBA</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: "#4a3a22", letterSpacing: "0.15em", zIndex: 1 }}>35.9806° N, 140.3069° E</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "48px 48px 32px",
        borderTop: "1px solid rgba(217,119,6,0.15)",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap", gap: 32 }}>
            <Logo scale={0.7} />
            <div style={{ display: "flex", gap: 48 }}>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, letterSpacing: "0.3em", color: "#4a3a22", marginBottom: 12 }}>LINKS</div>
                {[["NEBULAB","https://www.nebulab.jp/"],["Instagram","https://www.instagram.com/nebulab_koki/"]].map(([l,h]) => (
                  <a key={l} href={h} target="_blank" style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: "#6b5a3a", letterSpacing: "0.15em", marginBottom: 8, transition: "color 0.2s" }}
                    onMouseEnter={e=>e.target.style.color="#d97706"} onMouseLeave={e=>e.target.style.color="#6b5a3a"}>{l}</a>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, letterSpacing: "0.3em", color: "#4a3a22", marginBottom: 12 }}>LEGAL</div>
                {[["プライバシーポリシー","/privacy"],["利用規約","/terms"]].map(([l,h]) => (
                  <a key={l} href={h} style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: "#6b5a3a", letterSpacing: "0.1em", marginBottom: 8, transition: "color 0.2s" }}
                    onMouseEnter={e=>e.target.style.color="#d97706"} onMouseLeave={e=>e.target.style.color="#6b5a3a"}>{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: "1px solid rgba(217,119,6,0.08)" }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: "#2a1e0e", letterSpacing: "0.2em" }}>© 2026 NEBULAB. ALL RIGHTS RESERVED.</span>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: "#2a1e0e", letterSpacing: "0.15em" }}>運営: NEBULAB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
