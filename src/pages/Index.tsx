import React from "react";
import CoinAnimation from "@/components/CoinAnimation";
import GooglePayButton from "@/components/GooglePayButton";

/* ------------------------------------------------------------------ */
/* MODULE SECTION DATA                                                  */
/* ------------------------------------------------------------------ */
const MODULES = [
  {
    id: "identity",
    num: "01",
    icon: "⬡",
    title: "Property Identity Layer",
    subtitle: "NFT + Metadata Structure",
    desc: "Every property on HouseFacts is issued a unique, tamper-proof digital identity — a centralized Property Object (CPO) that aggregates ownership records, legal status, geographic coordinates, structural data, and media assets. This identity layer forms the foundation for all downstream modules.",
    tags: ["NFT Token Standard", "Metadata Schema", "Property Object", "Chain-of-Title", "Ownership Registry"],
  },
  {
    id: "verification",
    num: "02",
    icon: "✦",
    title: "Data Upload & Verification Engine",
    subtitle: "Multi-Source Validation Pipeline",
    desc: "Institutional-grade document upload and automated cross-validation against government registries, utility providers, and title companies. Every data point is scored for credibility, flagged for anomalies, and stored with an immutable timestamp. Supports batch ingestion for portfolio-scale operations.",
    tags: ["Document OCR", "Cross-Registry API", "Credibility Scoring", "Anomaly Detection", "Batch Upload"],
  },
  {
    id: "wallet",
    num: "03",
    icon: "◈",
    title: "Token & Wallet Engine",
    subtitle: "HF Points & Digital Asset Management",
    desc: "A fully simulated token economy built around HF Points — the platform's native digital credit unit. Users earn, transfer, and redeem HF Points for platform services. The wallet engine maintains an auditable ledger of all token movements tied to verified property activities.",
    tags: ["HF Points", "Simulated Ledger", "Token Transfer", "Activity Rewards", "Wallet Dashboard"],
  },
  {
    id: "escrow",
    num: "04",
    icon: "⬟",
    title: "Smart Escrow & Transaction Engine",
    subtitle: "Workflow Simulation — Non-Binding",
    desc: "A legally-neutral escrow workflow simulator that guides users through staged transaction milestones: offer submission, due diligence, contingency management, and closing. Entirely workflow-based — no actual funds are held. Designed for institutional transaction training and deal structuring.",
    tags: ["Workflow Stages", "Milestone Tracking", "Offer Engine", "Due Diligence", "Closing Simulation"],
  },
  {
    id: "audit",
    num: "05",
    icon: "⎊",
    title: "Document Hash & Audit System",
    subtitle: "Cryptographic Timestamp + Admin Verification",
    desc: "Every document uploaded to the platform is SHA-256 hashed and stored alongside an immutable timestamp and admin verification signature. This creates a court-admissible audit trail for disclosures, inspections, appraisals, and all property-related filings. Full audit logs are exportable in PDF and JSON.",
    tags: ["SHA-256 Hashing", "Timestamp Log", "Admin Signature", "Audit Export", "Disclosure Tracking"],
  },
  {
    id: "marketplace",
    num: "06",
    icon: "⬢",
    title: "Service Marketplace",
    subtitle: "Vetted Agents, Vendors & Professionals",
    desc: "An institutional-grade directory of verified real estate professionals — licensed agents, inspectors, escrow companies, law firms, and property management vendors. Every service provider is credentialed, reviewed, and connected directly to property transactions through a structured RFP workflow.",
    tags: ["Agent Directory", "Vendor Credentials", "RFP Workflow", "Service Reviews", "Direct Connect"],
  },
  {
    id: "maintenance",
    num: "07",
    icon: "⎈",
    title: "Predictive Maintenance Engine",
    subtitle: "AI-Driven Asset Health Intelligence",
    desc: "Leveraging historical maintenance data, IoT sensor inputs, and regional climate analytics, the Predictive Maintenance Engine models failure probability across all major building systems. Landlords and asset managers receive ranked intervention recommendations with estimated cost ranges and ROI projections.",
    tags: ["Failure Probability", "IoT Integration", "System Modeling", "Cost Estimation", "ROI Projection"],
  },
  {
    id: "vr",
    num: "08",
    icon: "◉",
    title: "3D / VR Walkthroughs",
    subtitle: "Immersive Property Visualization",
    desc: "Browser-native 3D property tours powered by WebGL with optional VR headset support. Spatial metadata overlays display room dimensions, material specs, system locations, and utility entry points in real-time. Enables remote due diligence, institutional portfolio reviews, and tenant pre-qualification at scale.",
    tags: ["WebGL Rendering", "VR Support", "Spatial Metadata", "Room Analytics", "Remote Due Diligence"],
  },
];

const Index = () => {
  const [winWidth, setWinWidth] = React.useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = winWidth < 1024; // Tablet and below

  return (
    <main style={{ background: "#03050e", minHeight: "100vh" }}>

      {/* ─── NAV BAR ─── */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 1.5rem" : "0 4rem",
        height: isMobile ? "64px" : "80px",
        background: "rgba(2,4,10,0.85)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(200,160,40,0.15)",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.6rem" : "1rem" }}>
          <div style={{
            width: isMobile ? 34 : 42,
            height: isMobile ? 34 : 42,
            padding: "4px",
            background: "linear-gradient(135deg, rgba(200,160,40,0.2), transparent)",
            borderRadius: "10px",
            border: "1px solid rgba(200,160,40,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(200,160,40,0.15)"
          }}>
            <img
              src="/hf-token.png"
              alt="HouseFacts"
              style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 0 4px rgba(200,160,40,0.5))" }}
            />
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: isMobile ? "1.1rem" : "1.25rem",
            background: "linear-gradient(135deg, #ffffff, #f5e4a0, #c8962e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.01em",
          }}>
            HouseFacts
          </span>
        </div>

        <nav style={{ display: "flex", gap: isMobile ? "1rem" : "2.5rem", alignItems: "center" }}>
          {!isMobile && ["Platform", "Modules", "Token"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.8rem",
                textDecoration: "none",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                transition: "color 0.3s ease",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f5e4a0")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              {l}
            </a>
          ))}
          {!isMobile && <div style={{ width: "1px", height: "24px", background: "rgba(200,160,40,0.2)", margin: "0 0.5rem" }} />}
          <a
            href="#"
            style={{
              padding: isMobile ? "8px 16px" : "12px 28px",
              borderRadius: isMobile ? "10px" : "14px",
              background: "linear-gradient(135deg, #f5e4a0, #c8962e)",
              color: "#02040a",
              fontSize: isMobile ? "0.7rem" : "0.8rem",
              fontWeight: 800,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "0 4px 15px rgba(200,160,40,0.25)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            {isMobile ? "Access" : "Access Terminal"}
          </a>
        </nav>
      </header>

      {/* ─── HERO / COIN ANIMATION ─── */}
      <div style={{ paddingTop: "62px" }}>
        <CoinAnimation />
      </div>

      {/* ─── TRANSITION BANNER ─── */}
      <div style={{
        background: "radial-gradient(circle at 50% 0%, rgba(200,160,40,0.12) 0%, #03050e 100%)",
        padding: "8rem 1.5rem 6rem",
        textAlign: "center",
        borderBottom: "1px solid rgba(200,160,40,0.15)",
        position: "relative",
        zIndex: 10
      }}>
        <p style={{
          fontSize: "0.68rem",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "rgba(200,160,40,0.7)",
          fontWeight: 700,
          marginBottom: "1.25rem",
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          Platform Architecture
        </p>
        <h2 style={{
          fontSize: "clamp(1.9rem, 4vw, 3rem)",
          fontWeight: 800,
          color: "#e2e8f0",
          lineHeight: 1.12,
          letterSpacing: "-0.025em",
          fontFamily: "'Space Grotesk', sans-serif",
          margin: 0,
        }}>
          Eight Modules.{" "}
          <span style={{
            background: "linear-gradient(135deg, #f5e4a0, #c8962e, #8e6d24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            One Connected Platform.
          </span>
        </h2>
        <p style={{
          color: "rgba(100,116,139,0.8)",
          maxWidth: "520px",
          margin: "1.25rem auto 0",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          fontFamily: "'Inter', sans-serif",
        }}>
          Each system module operates with institutional-grade reliability,
          interoperating through a shared property identity backbone.
        </p>
      </div>

      {/* ─── MODULE SECTIONS ─── */}
      <div style={{ background: "#06091a" }}>
        {MODULES.map((m, idx) => (
          <section
            id={`section-${m.id}`}
            key={m.id}
            style={{
              padding: isMobile ? "4rem 1.5rem" : "7rem 2rem",
              maxWidth: "1200px",
              margin: "0 auto",
              borderBottom: idx < MODULES.length - 1 ? "1px solid rgba(200,160,40,0.1)" : "none",
              position: "relative",
            }}
          >
            {/* Subtle left accent bar */}
            {!isMobile && <div style={{
              position: "absolute",
              left: 0,
              top: "7rem",
              width: 3,
              height: 60,
              borderRadius: 2,
              background: "linear-gradient(180deg, #c8962e 0%, transparent 100%)",
              opacity: 0.7,
            }} />}

            {/* Module header */}
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "center" : "flex-start",
              textAlign: isMobile ? "center" : "left",
              gap: isMobile ? "1.25rem" : "2rem",
              marginBottom: isMobile ? "2rem" : "3rem",
            }}>
              {/* Icon */}
              <div style={{
                width: isMobile ? 64 : 80,
                height: isMobile ? 64 : 80,
                borderRadius: "20px",
                background: "rgba(200,160,40,0.08)",
                border: "1px solid rgba(200,160,40,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "1.5rem" : "2rem",
                flexShrink: 0,
                color: "#f5e4a0",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                backdropFilter: "blur(12px)",
              }}>
                {m.icon}
              </div>

              <div>
                <div style={{
                  fontSize: isMobile ? "0.6rem" : "0.7rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "rgba(200,160,40,0.8)",
                  fontWeight: 800,
                  marginBottom: "0.5rem",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  Module {m.num} · {m.subtitle}
                </div>
                <h3 style={{
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  fontWeight: 800,
                  color: "#e2e8f0",
                  lineHeight: 1.2,
                  letterSpacing: "-0.015em",
                  margin: 0,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {m.title}
                </h3>
              </div>
            </div>

            <p style={{
              fontSize: isMobile ? "0.95rem" : "1.05rem",
              color: "rgba(148,163,184,0.75)",
              lineHeight: 1.8,
              maxWidth: isMobile ? "100%" : "800px",
              fontFamily: "'Inter', sans-serif",
              marginBottom: "2.5rem",
            }}>
              {m.desc}
            </p>

            {m.id === "wallet" && (
              <div style={{ marginBottom: "2.5rem", display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
                <GooglePayButton
                  upiId="yourname@okicici"
                  name="HouseFacts"
                  amount="100.00"
                  note="Top up HF Points"
                />
              </div>
            )}

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start", gap: "0.75rem" }}>
              {m.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: isMobile ? "0.68rem" : "0.75rem",
                    padding: isMobile ? "6px 14px" : "8px 18px",
                    borderRadius: "10px",
                    background: "rgba(200,160,40,0.06)",
                    color: "rgba(245,228,160,0.85)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    border: "1px solid rgba(200,160,40,0.2)",
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: "nowrap"
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ─── FOOTER CTA ─── */}
      <footer style={{
        background: "#010206",
        padding: isMobile ? "6rem 1.5rem" : "10rem 4rem 4rem",
        borderTop: "1px solid rgba(200,160,40,0.15)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Ambient Gradient */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: isMobile ? "200px" : "400px",
          background: "radial-gradient(circle at 50% 0%, rgba(200,160,40,0.08) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr 1fr 1fr",
            gap: isMobile ? "3rem" : "4rem",
            marginBottom: isMobile ? "5rem" : "8rem",
            textAlign: isMobile ? "center" : "left"
          }}>
            {/* Branding Column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img src="/hf-token.png" alt="HF" style={{ width: 32, height: 32 }} />
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: isMobile ? "1.25rem" : "1.5rem",
                  background: "linear-gradient(135deg, #ffffff, #f5e4a0, #c8962e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>HouseFacts</span>
              </div>
              <p style={{
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.8,
                fontSize: "0.9rem",
                maxWidth: isMobile ? "300px" : "320px"
              }}>
                The unified digital infrastructure for institutional real estate assets.
                Transforming property metadata into actionable intelligence.
              </p>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }} />
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {[
              { title: "Platform", links: ["Infrastructure", "Modular Engine", "Intelligence"] },
              { title: "Network", links: ["Marketplace", "Audit Trail", "Governance"] },
              { title: "Company", links: ["About", "Partners", "Institutional"] },
            ].map((col, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: isMobile ? "1rem" : "1.5rem" }}>
                <h4 style={{
                  color: "#f5e4a0",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase"
                }}>{col.title}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {col.links.map(link => (
                    <a key={link} href="#" style={{
                      color: "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                    }}>{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            paddingTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.8rem",
            textAlign: "center"
          }}>
            <p>© 2025 HouseFacts Inc. Institutional Blockchain Systems.</p>
            <div style={{ display: "flex", gap: isMobile ? "1rem" : "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Security</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
