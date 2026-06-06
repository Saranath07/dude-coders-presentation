import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Animated sun with energy rays
const SunBurst = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    let t = 0, raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.04);

      // Outer glow
      const og = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110);
      og.addColorStop(0, `rgba(245,158,11,${0.08 + pulse * 0.04})`);
      og.addColorStop(1, 'transparent');
      ctx.fillStyle = og; ctx.fillRect(0, 0, W, H);

      // Rotating rays
      const numRays = 12;
      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2 + t * 0.008;
        const len = 60 + 20 * Math.sin(t * 0.05 + i * 0.5);
        const startR = 28;
        ctx.beginPath();
        ctx.moveTo(cx + startR * Math.cos(angle), cy + startR * Math.sin(angle));
        ctx.lineTo(cx + len * Math.cos(angle), cy + len * Math.sin(angle));
        ctx.strokeStyle = `rgba(245,158,11,${0.15 + 0.1 * Math.sin(t * 0.06 + i)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Core sun
      const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
      sg.addColorStop(0, '#FDE68A');
      sg.addColorStop(0.5, '#F59E0B');
      sg.addColorStop(1, 'rgba(245,158,11,0.3)');
      ctx.beginPath(); ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fillStyle = sg;
      ctx.shadowColor = '#F59E0B'; ctx.shadowBlur = 30;
      ctx.fill(); ctx.shadowBlur = 0;

      t++; raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} width={240} height={240} style={{ width: 240, height: 240 }} />;
};

const keyPoints = [
  { label: 'F1: 0.54 → 0.95', note: 'From traditional methods to our cascade', color: 'var(--amber)' },
  { label: 'Zero-cost at scale', note: 'Sentinel-2 imagery — completely free', color: 'var(--teal)' },
  { label: '~$0.0002/property', note: 'vs $100–300 for field inspection', color: 'var(--green)' },
  { label: 'Multi-modal ready', note: 'SAR + Thermal + Smart meter fusion roadmap', color: '#a78bfa' },
];

const ConclusionSlide = () => (
  <div className="slide">
    <div className="glow-amber-center" style={{ opacity: 0.8 }} />

    <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 56, alignItems: 'center' }}>
      {/* Left */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 28 }}
        >
          <div className="label-mono" style={{ marginBottom: 12 }}>Conclusion</div>
          <div className="glow-rule" style={{ marginBottom: 20 }} />
          <h2
            className="h-section"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.05, marginBottom: 20 }}
          >
            The Intelligence Layer{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>the Energy Transition Needs</span>
          </h2>
          <blockquote style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            borderLeft: '3px solid var(--amber)',
            paddingLeft: 20,
            marginBottom: 28,
            lineHeight: 1.7,
          }}>
            "The sun is already doing its job. We're building the system to make sure we don't waste it."
          </blockquote>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {keyPoints.map((kp, i) => (
            <motion.div
              key={kp.label}
              className="card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{ padding: '16px 18px', borderLeft: `3px solid ${kp.color}` }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: kp.color, marginBottom: 4 }}>{kp.label}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{kp.note}</div>
            </motion.div>
          ))}
        </div>

        {/* Final tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ padding: '18px 22px', background: 'var(--amber-dim)', border: '1px solid var(--amber-border)', borderRadius: 12 }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--amber-bright)', lineHeight: 1.8 }}>
            Not just detection — <strong>verification</strong>.<br />
            Not just counting panels — <strong>measuring their health</strong>.<br />
            Not just a snapshot — a <strong>continuous, multi-modal audit system</strong> for the global solar fleet.
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}
        >
          <span className="label-mono" style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>
            Team Dude Coders · IIT Madras · EcoInnovators 2026
          </span>
        </motion.div>
      </div>

      {/* Right: animated sun */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <SunBurst />
      </motion.div>
    </div>
  </div>
);

export default ConclusionSlide;
