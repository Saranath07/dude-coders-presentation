import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Ellipse center at cx=44%, cy=50% of the diagram area
// rx=38%, ry=42% — large ellipse filling most of diagram
// x = 44 + 38*sin(θ),  y = 50 - 42*cos(θ)
const NODES = [
  { id: 'satellite', label: ['Satellite', 'Image Data'],          color: '#f59e0b', x: 44.0, y:  8.0, icon: '🛰️' },
  { id: 'sar',       label: ['SAR & Spectral', 'Band Detection'], color: '#a78bfa', x: 76.0, y: 22.5, icon: '📡' },
  { id: 'thermal',   label: ['Thermal IR', 'Data'],               color: '#f472b6', x: 82.0, y: 50.0, icon: '🌡️' },
  { id: 'weather',   label: ['Live Weather', 'Data'],             color: '#34d399', x: 67.0, y: 77.5, icon: '⛅' },
  { id: 'video',     label: ['Video', 'Inspection Data'],         color: '#fb923c', x: 21.0, y: 77.5, icon: '🎥' },
  { id: 'meter',     label: ['Power Meter', 'kWh In/Out'],        color: '#22C55E', x:  6.0, y: 50.0, icon: '⚡' },
  { id: 'docs',      label: ['Installation', 'Documents'],        color: '#60a5fa', x: 12.0, y: 22.5, icon: '📄' },
];

// Canvas cx/cy must match node ellipse center (44%, 50%)
const CX_PCT = 0.44;
const CY_PCT = 0.50;

const HubCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let t = 0, raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      if (!W || !H) { raf = requestAnimationFrame(draw); return; }
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, W, H);

      const cx = W * CX_PCT;
      const cy = H * CY_PCT;

      NODES.forEach((node, ni) => {
        const nx = W * node.x / 100;
        const ny = H * node.y / 100;

        // Dashed line
        ctx.beginPath();
        ctx.setLineDash([5, 8]);
        ctx.strokeStyle = node.color + '2e';
        ctx.lineWidth = 1.5;
        ctx.moveTo(nx, ny);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.setLineDash([]);

        // 3 traveling dots per line
        for (let d = 0; d < 3; d++) {
          const phase = (t * 0.004 + d / 3 + ni * 0.11) % 1;
          const dotX = nx + (cx - nx) * phase;
          const dotY = ny + (cy - ny) * phase;
          const alpha = Math.sin(phase * Math.PI);
          ctx.beginPath();
          ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = node.color + Math.floor(alpha * 230).toString(16).padStart(2, '0');
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 9;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Center amber glow
      const pulse = 0.22 + 0.16 * Math.sin(t * 0.03);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
      grd.addColorStop(0, `rgba(245,158,11,${pulse})`);
      grd.addColorStop(0.5, `rgba(245,158,11,${pulse * 0.28})`);
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, 100, 0, Math.PI * 2);
      ctx.fill();

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
};

const FutureSlide = () => (
  <div className="slide" style={{ alignItems: 'stretch', justifyContent: 'flex-start' }}>
    <div className="glow-amber-tr" style={{ opacity: 0.18 }} />
    <div className="glow-teal-bl" style={{ opacity: 0.12 }} />

    <div style={{
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: 1440,
      padding: '32px 80px 0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box',
    }}>

      {/* ── Header (fixed, compact) ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ flexShrink: 0, marginBottom: 8 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          {/* <div className="glow-rule" style={{ flexShrink: 0 }} /> */}
          <div className="label-mono" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>.   </div>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1.7rem, 2.4vw, 2.4rem)',
          lineHeight: 1.05,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 6,
        }}>
          What We Built Is{' '}
          <span style={{ color: 'var(--amber)' }}>Just the Beginning</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: '#CBD5E1', lineHeight: 1.3, margin: 0 }}>
          Solution:{' '}
          <span style={{ color: 'var(--amber)', fontWeight: 700 }}>Multi Modal Approach</span>
          {' '}—{' '}
          <span style={{ color: 'var(--teal-bright)', fontWeight: 600 }}>Generalised Pipeline</span>
        </p>
      </motion.div>

      {/* ── Hub diagram fills ALL remaining space ── */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0, overflow: 'visible' }}>
        <HubCanvas />

        {/* Node cards */}
        {NODES.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              textAlign: 'center',
            }}
          >
            <div style={{
              padding: '22px 30px',
              background: 'rgba(7,7,14,0.93)',
              border: `2.5px solid ${node.color}77`,
              borderRadius: 20,
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 11,
              minWidth: 200,
              backdropFilter: 'blur(8px)',
              boxShadow: `0 0 30px ${node.color}28`,
            }}>
              <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>{node.icon}</span>
              {node.label.map((line, li) => (
                <div key={li} style={{
                  fontFamily: li === 0 ? 'var(--font-display)' : 'var(--font-body)',
                  fontSize: li === 0 ? '1.35rem' : '1.1rem',
                  fontWeight: li === 0 ? 700 : 400,
                  color: li === 0 ? node.color : '#CBD5E1',
                  lineHeight: 1.25,
                  whiteSpace: 'nowrap',
                }}>
                  {line}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Center hub — positioned at CX_PCT / CY_PCT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            position: 'absolute',
            left: `${CX_PCT * 100}%`,
            top: `${CY_PCT * 100}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
            textAlign: 'center',
          }}
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 22px rgba(245,158,11,0.35), 0 0 44px rgba(245,158,11,0.12)',
                '0 0 44px rgba(245,158,11,0.65), 0 0 88px rgba(245,158,11,0.22)',
                '0 0 22px rgba(245,158,11,0.35), 0 0 44px rgba(245,158,11,0.12)',
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              padding: '28px 36px',
              background: 'linear-gradient(135deg, rgba(245,158,11,0.22), rgba(245,158,11,0.07))',
              border: '2.5px solid var(--amber)',
              borderRadius: 22,
              minWidth: 230,
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--amber)', letterSpacing: '0.14em', marginBottom: 12 }}>
              CORE SYSTEM
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.4rem',
              color: '#FCD34D',
              lineHeight: 1.55,
              letterSpacing: '-0.01em',
            }}>
              Renewable<br />Resources<br />Monitoring<br />System
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Punchline — fixed at bottom, above nav dots ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{
          flexShrink: 0,
          textAlign: 'center',
          padding: '12px 0 52px',   /* 52px bottom keeps it above the nav-dot bar */
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1.05rem, 1.35vw, 1.3rem)',
          color: '#F1F5F9',
          letterSpacing: '-0.01em',
          lineHeight: 1.4,
        }}>
          No single system answers all questions.{' '}
          <span style={{ color: 'var(--amber)' }}>The fusion does.</span>{' '}
          <span style={{ color: 'var(--teal-bright)' }}>This pipeline does.</span>
        </div>
      </motion.div>

    </div>
  </div>
);

export default FutureSlide;
