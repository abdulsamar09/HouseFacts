import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 3D Coin CSS
const COIN_STYLES = `
@keyframes coin-spin {
  0% { transform: rotateY(0deg) rotateX(0deg); }
  100% { transform: rotateY(360deg) rotateX(0deg); }
}

@keyframes shine-sweep {
  0% { transform: translateX(-100%) translateY(-100%) rotate(35deg); }
  40% { transform: translateX(100%) translateY(100%) rotate(35deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(35deg); }
}

.coin-3d-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shine-sweep 6s ease-in-out infinite;
  pointer-events: none;
  z-index: 5;
}

.coin-3d-shadow {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%) rotateX(75deg);
  width: 80%;
  height: 40px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%);
  filter: blur(10px);
  border-radius: 50%;
  z-index: 0;
}

@keyframes dna-spin {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
}
.dna-central-group {
  transform-origin: center;
  animation: dna-spin 12s linear infinite;
}

@keyframes link-pulse {
  0% { stroke-dashoffset: 24; opacity: 0.4; }
  50% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0.4; }
}
.active-link-path {
  animation: link-pulse 3s linear infinite;
}
`;

/* ─────────────────────────────────────────────────────────── */
/*  CONSTANTS                                                   */
/* ─────────────────────────────────────────────────────────── */
const TOTAL = 8;
const MODULES = [
  { id: "identity", num: "01", label: "Property Identity", sub: "NFT + Metadata Layer", icon: "⬡" },
  { id: "verification", num: "02", label: "Data Verification", sub: "Upload & Validation Engine", icon: "✦" },
  { id: "wallet", num: "03", label: "Token & Wallet", sub: "HF Points Engine", icon: "◈" },
  { id: "escrow", num: "04", label: "Smart Escrow", sub: "Transaction Workflow", icon: "⬟" },
  { id: "audit", num: "05", label: "Document Audit", sub: "Hash & Timestamp System", icon: "⎊" },
  { id: "marketplace", num: "06", label: "Service Marketplace", sub: "Agents & Vendors", icon: "⬢" },
  { id: "maintenance", num: "07", label: "Predictive Maintenance", sub: "AI Maintenance Engine", icon: "⎈" },
  { id: "vr", num: "08", label: "3D / VR Walkthroughs", sub: "Immersive Visualization", icon: "◉" },
];

/* ─────────────────────────────────────────────────────────── */
/*  UTILITIES                                                   */
/* ─────────────────────────────────────────────────────────── */
function pieClip(i: number): string {
  const step = (2 * Math.PI) / TOTAL;
  const gap = 0.005;
  const start = i * step - Math.PI / 2 + gap;
  const end = start + step - 2 * gap;
  const R = 50;
  const cx = 50, cy = 50;
  const arcSteps = 16;
  const pts: string[] = [`${cx}% ${cy}%`];
  for (let s = 0; s <= arcSteps; s++) {
    const a = start + (end - start) * (s / arcSteps);
    const px = cx + Math.cos(a) * R;
    const py = cy + Math.sin(a) * R;
    pts.push(`${px.toFixed(3)}% ${py.toFixed(3)}%`);
  }
  return `polygon(${pts.join(", ")})`;
}

function midAngle(i: number): number {
  return (i / TOTAL) * 2 * Math.PI - Math.PI / 2 + Math.PI / TOTAL;
}

/* ─────────────────────────────────────────────────────────── */
/*  MAIN COMPONENT                                             */
/* ─────────────────────────────────────────────────────────── */
export default function CoinAnimation() {
  const [winWidth, setWinWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const coinAreaRef = useRef<HTMLDivElement>(null);
  const coinWrapRef = useRef<HTMLDivElement>(null);
  const baseCoinRef = useRef<HTMLImageElement>(null);
  const crackRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pulseRingRef = useRef<HTMLDivElement>(null);
  const sliceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const helixLineRef = useRef<HTMLDivElement>(null);
  const labelsWrapRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const isMobile = winWidth < 1024;
  const isSmallMobile = winWidth < 520;

  const desktopCoin = 360;
  const mobileCoin = isSmallMobile ? 180 : 240;
  const coinSize = isMobile ? mobileCoin : desktopCoin;

  // Helix Parameters - Optimized for majestic structure & mobile safety
  const xOffset = isSmallMobile ? 45 : (isMobile ? 70 : winWidth * 0.24);
  const ySpan = isMobile ? 450 : 540;

  function helixPos(i: number) {
    const side = i % 2 === 0 ? -1 : 1;
    // Strictly paired rows for PC and Mobile
    const row = Math.floor(i / 2);
    const rowProgress = row / 3;
    const y = -ySpan / 2 + rowProgress * ySpan;
    const x = side * xOffset;
    return { x, y };
  }

  // Central DNA Parameters - Optimized for mobile breathing room
  const centralHelixRadius = isSmallMobile ? 18 : (isMobile ? 26 : 60);
  const generateStrandD = (offset: number) => {
    const steps = 60;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2.8 + offset; // Winding factor
      const x = Math.sin(angle) * centralHelixRadius;
      const y = -ySpan / 2 + t * ySpan;
      d += (i === 0 ? "M " : " L ") + `${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  }
  const strandAD = generateStrandD(0);
  const strandBD = generateStrandD(Math.PI);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  /* ── GSAP Animation ── */
  useEffect(() => {
    if (!outerRef.current || !stickyRef.current) return;
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "+=600%", // Reduced for a "softer" faster transition
          scrub: 0.8, // Snappier scrub for less lag
          pin: stickyRef.current,
          anticipatePin: 1,
          fastScrollEnd: true, // Prevents jitter on section exit
        },
      });

      // PHASE 0: Initial state & Scroll Hint
      tl.to(scrollHintRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.4,
      }, 0);

      // PHASE 1: Move to absolute center, Hero Text exit
      tl.to(coinAreaRef.current, {
        x: isMobile ? 0 : "-25vw", // Centers the coin relative to viewport when text fades
        y: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
      }, 0);

      tl.to(heroTextRef.current, {
        opacity: 0,
        y: -60,
        duration: 0.6,
        ease: "power2.in",
      }, 0.1);

      // PHASE 2: Activation (Glow & Cracks)
      tl.to(glowRef.current, {
        scale: 2.2,
        opacity: 0.8,
        duration: 0.8,
        ease: "power2.out"
      }, 0.8);
      tl.to(crackRef.current, { opacity: 1, duration: 0.4 }, 1.2);

      // PHASE 3: 3D Coin Dissolve & Slices Appear
      tl.to(baseCoinRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        ease: "power2.in"
      }, 1.6);

      tl.to(crackRef.current, { opacity: 0, duration: 0.3 }, 1.8);

      // PHASE 4: Burst Migration
      sliceRefs.current.forEach((sl, i) => {
        if (!sl) return;
        const a = midAngle(i);
        tl.to(sl, {
          opacity: 1, // Ensure visibility
          x: Math.cos(a) * (isMobile ? 80 : 140),
          y: Math.sin(a) * (isMobile ? 80 : 130),
          rotate: (i % 2 === 0 ? 15 : -15),
          duration: 0.8,
          ease: "back.out(1.4)",
          force3D: true,
        }, 1.7 + i * 0.05);
      });

      // PHASE 5: Helix Formatting (HORIZONTAL Wedges)
      sliceRefs.current.forEach((sl, i) => {
        if (!sl) return;
        const { x, y } = helixPos(i);
        const isL = i % 2 === 0;
        const originalMidDeg = (midAngle(i) * 180) / Math.PI;
        const targetAxis = isL ? 0 : 180;
        const targetRot = targetAxis - originalMidDeg;

        tl.to(sl, {
          x,
          y,
          rotate: targetRot,
          scale: isMobile ? 0.38 : 0.55,
          duration: 1.8,
          ease: "power3.inOut",
          force3D: true,
        }, 3.0 + i * 0.1);
      });

      // PHASE 6: UI Reveal
      tl.to(helixLineRef.current, { opacity: 1, duration: 0.8 }, 4.0);
      tl.to(labelsWrapRef.current, { opacity: 1, duration: 0.6 }, 4.2);

      labelRefs.current.forEach((lb, i) => {
        if (!lb) return;
        tl.fromTo(lb,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
          4.5 + i * 0.12
        );
      });

      // PHASE 7: Soft exit to next section
      tl.to([labelsWrapRef.current, helixLineRef.current, ...sliceRefs.current], {
        opacity: 0,
        y: -100,
        duration: 1.2,
        ease: "power2.inOut",
        force3D: true,
      }, 5.5);

      tl.to(stickyRef.current, {
        backgroundColor: "#06091a", // Match next section background
        duration: 1.2,
      }, 5.5);

    }, outerRef);
    return () => ctx.revert();
  }, [winWidth, isMobile]);

  const scrollTo = (id: string) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const leftPts = [0, 2, 4, 6].map(i => helixPos(i));
  const rightPts = [1, 3, 5, 7].map(i => helixPos(i));

  const getStrandPath = (points: { x: number, y: number }[], side: number) => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const cpX = p1.x + (side * 60);
      const cpY = (p1.y + p2.y) / 2;
      d += ` Q ${cpX} ${cpY}, ${p2.x} ${p2.y}`;
    }
    return d;
  };


  const cracks = [
    [0.5, 0.5, 0.8, 0.2], [0.5, 0.5, 1, 0.5], [0.5, 0.5, 0.8, 0.8], [0.5, 0.5, 0.5, 1],
    [0.5, 0.5, 0.2, 0.8], [0.5, 0.5, 0, 0.5], [0.5, 0.5, 0.2, 0.2], [0.5, 0.5, 0.5, 0]
  ].map(([x1, y1, x2, y2]) => `M ${x1 * coinSize} ${y1 * coinSize} L ${x2 * coinSize} ${y2 * coinSize}`);

  return (
    <div ref={outerRef} style={{ height: "650vh", position: "relative" }}>
      <style>{COIN_STYLES}</style>

      <div
        ref={stickyRef}
        style={{
          position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden",
          background: "radial-gradient(ellipse 110% 90% at 50% 50%, #03040b 0%, #010106 80%)",
        }}
      >

        {/* 1. INITIAL HERO & SPLIT CONTENT */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10, display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center", justifyContent: "center",
          padding: isMobile ? "2rem" : 0
        }}>

          <div ref={heroTextRef} style={{
            flex: isMobile ? "none" : "0 0 50%",
            textAlign: isMobile ? "center" : "left",
            paddingLeft: isMobile ? 0 : "clamp(2rem, 8vw, 15rem)",
            width: isMobile ? "100%" : "auto",
            zIndex: 11
          }}>
            <p style={{
              fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase",
              color: "#c8962e", fontWeight: 800, marginBottom: "1.25rem", fontFamily: "'Space Grotesk', sans-serif"
            }}>Institutional Infrastructure</p>
            <h1 style={{
              fontSize: "clamp(2rem, 8vw, 5.5rem)", fontWeight: 900, lineHeight: 1,
              fontFamily: "'Space Grotesk', sans-serif", margin: 0, color: "#fff",
              textShadow: "0 10px 40px rgba(0,0,0,0.5)"
            }}>HouseFacts<br /><span style={{ color: "#c8962e", textShadow: "0 0 30px rgba(200,160,40,0.3)" }}>Token</span></h1>
            <p style={{
              marginTop: "1.5rem", fontSize: "1rem", color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6, maxWidth: 440, margin: isMobile ? "1.5rem auto 0" : "1.5rem 0 0"
            }}>One unified asset. Eight modular systems. An engineered digital ecosystem for property intelligence.</p>
          </div>

          <div ref={coinAreaRef} style={{
            flex: isMobile ? "none" : "0 0 50%",
            display: "flex", justifyContent: "center", alignItems: "center",
            position: "relative", width: isMobile ? "100%" : "auto", height: isMobile ? "45vh" : "100%",
          }}>
            {/* Glows */}
            <div ref={glowRef} style={{
              position: "absolute", width: coinSize * 2, height: coinSize * 2,
              background: "radial-gradient(circle, rgba(200,160,40,0.3) 0%, transparent 70%)",
              opacity: 0, zIndex: 1, filter: "blur(60px)"
            }} />

            <div ref={pulseRingRef} style={{
              position: "absolute", width: coinSize + 110, height: coinSize + 110,
              borderRadius: "50%", border: "1px solid rgba(200,160,40,0.25)",
              boxShadow: "inset 0 0 80px rgba(200,160,40,0.08)", zIndex: 1
            }} />

            <div ref={coinWrapRef} style={{
              position: "relative",
              width: coinSize,
              height: coinSize,
              zIndex: 2,
              perspective: "800px" // Stronger perspective for depth
            }}>
              {/* 3D COIN ASSEMBLY */}
              <div
                ref={baseCoinRef as any}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  transformStyle: "preserve-3d",
                  animation: "coin-spin 12s linear infinite",
                  // REMOVED FILTER HERE TO PREVENT FLATTENING
                }}
              >
                {/* Side/Depth Layers (Optimized for 60FPS) */}
                {[...Array(12)].map((_, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    // Focused metallic rim with less complex gradient
                    background: i % 2 === 0
                      ? "linear-gradient(to right, #4a341a, #c8962e, #4a341a)"
                      : "#3d2b12",
                    transform: `translateZ(${i - 6}px)`,
                    opacity: 1,
                    willChange: "transform"
                  }} />
                ))}

                {/* Front Face */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  transform: "translateZ(6px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, #f5e4a0, #c8962e)",
                  boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
                  willChange: "transform"
                }}>
                  <img src="/hf-token.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  <div className="coin-3d-shine" />
                </div>

                {/* Back Face */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  transform: "translateZ(-6px) rotateY(180deg)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, #c8962e, #f5e4a0)",
                  filter: "brightness(0.75)",
                  boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
                  willChange: "transform"
                }}>
                  <img src="/hf-token.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.9 }} />
                  <div className="coin-3d-shine" />
                </div>
              </div>

              {/* Shadow underneath */}
              <div className="coin-3d-shadow" style={{ bottom: "-40px", transform: "translateX(-50%) rotateX(75deg)", opacity: 0.7 }} />

              <svg ref={crackRef} style={{ position: "absolute", inset: 0, opacity: 0, zIndex: 11, pointerEvents: "none" }}>
                {cracks.map((d, i) => <path key={i} d={d} stroke="#c8962e" strokeWidth="2.5" fill="none" />)}
              </svg>

              {MODULES.map((_, i) => (
                <div key={i} ref={el => sliceRefs.current[i] = el} style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 10,
                  opacity: 0,
                  transformStyle: "preserve-3d", // Enable 3D for slices
                  willChange: "transform, opacity"
                }}>
                  {/* Slice 3D Side (Thickness) - Optimized layer count for helix */}
                  {[...Array(4)].map((_, layerIdx) => (
                    <div key={layerIdx} style={{
                      position: "absolute",
                      inset: 0,
                      clipPath: pieClip(i),
                      background: layerIdx % 2 === 0 ? "#c8962e" : "#4a341a",
                      transform: `translateZ(${layerIdx * 2 - 4}px)`,
                      opacity: 0.9,
                      willChange: "transform"
                    }} />
                  ))}

                  {/* Slice Front Image */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    clipPath: pieClip(i),
                    transform: "translateZ(5px)", // Sit clearly on top
                    willChange: "transform"
                  }}>
                    <img src="/hf-token.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. INFRASTRUCTURE BACKBONE (CENTRAL DIGITAL DNA) */}
        <div ref={helixLineRef} style={{ position: "absolute", inset: 0, opacity: 0, zIndex: 5, pointerEvents: "none" }}>
          <svg viewBox="-500 -400 1000 800" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="glow-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(245,228,160,0.1)" />
                <stop offset="50%" stopColor="rgba(200,160,40,0.7)" />
                <stop offset="100%" stopColor="rgba(245,228,160,0.1)" />
              </linearGradient>
              <filter id="neon-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Central DNA Strands (Rotating Group) */}
            <g className="dna-central-group" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <path d={strandAD} fill="none" stroke="url(#glow-gold)" strokeWidth="2" filter="url(#neon-glow)" />
              <path d={strandBD} fill="none" stroke="url(#glow-gold)" strokeWidth="2" filter="url(#neon-glow)" />

              {/* Central Connecting Rungs (DNA Base Pairs) */}
              {[...Array(20)].map((_, idx) => {
                const t = idx / 19;
                const angle = t * Math.PI * 2.8;
                const x1 = Math.sin(angle) * centralHelixRadius;
                const x2 = Math.sin(angle + Math.PI) * centralHelixRadius;
                const y = -ySpan / 2 + t * ySpan;
                const z = Math.cos(angle);

                return (
                  <g key={idx} style={{ opacity: 0.2 + z * 0.5 }}>
                    <line x1={x1} y1={y} x2={x2} y2={y}
                      stroke="rgba(200,160,40,0.3)" strokeWidth="0.8" strokeDasharray="2 4" />
                    <circle cx={x1} cy={y} r="1.2" fill="#f5e4a0" filter="url(#neon-glow)" />
                    <circle cx={x2} cy={y} r="1.2" fill="#f5e4a0" filter="url(#neon-glow)" />
                  </g>
                );
              })}
            </g>

            {/* Neural Data Streams (Connecting sides to central core) */}
            {MODULES.map((_, i) => {
              const pos = helixPos(i);
              const row = Math.floor(i / 2);
              const t = row / 3;
              const isOdd = i % 2 !== 0;
              const angle = t * Math.PI * 2.8 + (isOdd ? Math.PI : 0);
              const cx = Math.sin(angle) * centralHelixRadius;
              const cy = -ySpan / 2 + t * ySpan;

              const cpX = (pos.x + cx) / 2;

              return (
                <g key={`link-group-${i}`}>
                  {/* Main Connection Path */}
                  <path
                    d={`M ${pos.x} ${pos.y} C ${cpX} ${pos.y}, ${cpX} ${cy}, ${cx} ${cy}`}
                    fill="none"
                    stroke="rgba(200,160,40,0.4)"
                    strokeWidth="1"
                    className="active-link-path"
                    strokeDasharray="4 8"
                  />
                  {/* Glowing Terminals */}
                  <circle cx={pos.x} cy={pos.y} r="1.5" fill="#f5e4a0" filter="url(#neon-glow)" />
                  <circle cx={cx} cy={cy} r="1.5" fill="#f5e4a0" filter="url(#neon-glow)" />
                </g>
              );
            })}

            {/* Stable Infrastructure Lines (Outer connection) */}
            <path d={getStrandPath(leftPts, -1)} fill="none" stroke="rgba(200,160,40,0.15)" strokeWidth="1" strokeDasharray="8 8" />
            <path d={getStrandPath(rightPts, 1)} fill="none" stroke="rgba(200,160,40,0.15)" strokeWidth="1" strokeDasharray="8 8" />
            {[0, 1, 2, 3].map(row => (
              <line key={row} x1={leftPts[row].x} y1={leftPts[row].y} x2={rightPts[row].x} y2={rightPts[row].y}
                stroke="rgba(200,160,40,0.05)" strokeWidth="0.8" strokeDasharray="10 10" />
            ))}
          </svg>
        </div>

        <div ref={labelsWrapRef} style={{ position: "absolute", inset: 0, opacity: 0, zIndex: 30, pointerEvents: "none" }}>
          {MODULES.map((m, i) => {
            const pos = helixPos(i);
            const isL = i % 2 === 0;

            return (
              <div key={m.id} ref={el => labelRefs.current[i] = el} style={{
                position: "absolute",
                top: `calc(50% + ${pos.y}px)`,
                left: `calc(50% + ${pos.x}px)`,
                transform: isL ? "translate(-100%, -50%)" : "translate(0, -50%)",

                display: "flex",
                flexDirection: "row", // Force Icon to be on left, Text on right for BOTH sides
                alignItems: "center",
                justifyContent: "flex-start",
                gap: isSmallMobile ? "5px" : "12px",
                pointerEvents: "auto",
                cursor: "pointer",
                maxWidth: isMobile ? `calc(50vw - ${Math.abs(pos.x) + 5}px)` : "320px",
                zIndex: 35
              }} onClick={() => scrollTo(m.id)}>

                {/* ICON NODE */}
                <div style={{
                  width: isSmallMobile ? 28 : (isMobile ? 40 : 54),
                  height: isSmallMobile ? 28 : (isMobile ? 40 : 54),
                  borderRadius: "50%", background: "rgba(10,8,4,0.98)", border: "1.2px solid rgba(200,160,40,0.6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#f5e4a0", fontSize: isSmallMobile ? "0.7rem" : (isMobile ? "1rem" : "1.3rem"),
                  boxShadow: "0 0 15px rgba(200,160,40,0.25)", backdropFilter: "blur(20px)",
                  zIndex: 2, flexShrink: 0
                }}>{m.icon}</div>

                {/* TEXT CONTENT */}
                <div style={{
                  textAlign: "left", // Force Left align for both sides
                  padding: isSmallMobile ? "0 0 0 4px" : "0 0 0 15px"
                }}>
                  <div style={{
                    fontSize: isSmallMobile ? "0.65rem" : (isMobile ? "0.9rem" : "1.2rem"),
                    fontWeight: 900,
                    color: "#fff",
                    marginBottom: isMobile ? 1 : 4,
                    lineHeight: 1.15,
                    textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                    wordWrap: "break-word"
                  }}>{m.label}</div>
                  {!isSmallMobile && (
                    <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{m.sub}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. SCROLL HINT */}
        <div ref={scrollHintRef} style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          zIndex: 40,
          color: "rgba(255,255,255,0.3)",
          fontFamily: "'Space Grotesk', sans-serif"
        }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll to Explore</span>
          <div style={{
            width: "2px",
            height: "50px",
            background: "linear-gradient(to bottom, #c8962e, transparent)",
            borderRadius: "2px"
          }} />
        </div>

      </div>
    </div >
  );
}
