import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const inputs = [
  { label: 'RGB Image', sub: 'Sentinel-2 / Google', color: '#F59E0B', encoder: 'YOLOv12 Encoder', x: 0 },
  { label: 'Multispectral', sub: '13 bands NIR/SWIR', color: '#14B8A6', encoder: 'Spectral Encoder', x: 1 },
  { label: 'SAR Bands', sub: 'Sentinel-1 radar', color: '#a78bfa', encoder: 'Radar Encoder', x: 2 },
  { label: 'Thermal IR', sub: 'Landsat / ECOSTRESS', color: '#f472b6', encoder: 'Thermal Encoder', x: 3 },
  { label: 'Smart Meter', sub: 'AMI / SCADA', color: '#22C55E', encoder: 'Time-Series Enc.', x: 4 },
];

const outputs = [
  { label: 'Detection (Y/N)', color: '#F59E0B' },
  { label: 'Panel Area (m²)', color: '#14B8A6' },
  { label: 'Health Score', color: '#f472b6' },
  { label: 'Generation Gap', color: '#22C55E' },
  { label: 'Fraud Flag', color: '#EF4444' },
  { label: 'QC Status', color: '#a78bfa' },
];

// Animated flowing "signal" canvas
const FusionFlow = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let t = 0, raf: number;

    const colors = ['#F59E0B', '#14B8A6', '#a78bfa', '#f472b6', '#22C55E'];
    const particles: { x: number; y: number; vy: number; color: string; life: number; maxLife: number }[] = [];

    for (let i = 0; i < 30; i++) {
      const lane = Math.floor(Math.random() * 5);
      particles.push({
        x: (lane + 0.5) * (W / 5),
        y: Math.random() * H,
        vy: 0.6 + Math.random() * 0.8,
        color: colors[lane],
        life: Math.random() * 80,
        maxLife: 80 + Math.random() * 40,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Lane dividers
      for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(i * W / 5, 0); ctx.lineTo(i * W / 5, H);
        ctx.strokeStyle = 'rgba(241,245,249,0.03)';
        ctx.lineWidth = 1; ctx.stroke();
      }

      // Particles
      particles.forEach(p => {
        p.life += p.vy;
        if (p.life > p.maxLife) {
          p.life = 0;
          p.y = 0;
        }
        p.y = (p.life / p.maxLife) * H;
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Converging lines at center
      const cy = H * 0.55;
      const cx = W / 2;
      colors.forEach((color, i) => {
        const px = (i + 0.5) * (W / 5);
        const pulse = 0.3 + 0.3 * Math.sin(t * 0.04 + i);
        ctx.beginPath();
        ctx.moveTo(px, cy - 20);
        ctx.bezierCurveTo(px, cy + 20, cx, cy - 10, cx, cy + 10);
        ctx.strokeStyle = color + Math.floor(pulse * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Center fusion node
      const fusePulse = 0.5 + 0.5 * Math.sin(t * 0.06);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14 + fusePulse * 6);
      grad.addColorStop(0, `rgba(245,158,11,${0.6 + fusePulse * 0.3})`);
      grad.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(cx, cy, 14 + fusePulse * 6, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FCD34D'; ctx.fill();

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} width={280} height={160} style={{ width: '100%', height: 160, borderRadius: 8 }} />;
};

const MultiModalSlide = () => {
  const [hoveredInput, setHoveredInput] = useState<number | null>(null);

  return (
    <div className="slide">
      <div className="glow-amber-tr" style={{ opacity: 0.35 }} />
      <div className="glow-teal-bl" style={{ opacity: 0.25 }} />

      <div className="slide-inner">
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 26 }}>
          <div className="label-mono" style={{ marginBottom: 8 }}>Signal 5 — Multi-Modal Architecture</div>
          <div className="glow-rule" style={{ marginBottom: 12 }} />
          <h2 className="h-section" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', lineHeight: 1.1 }}>
            Each Modality Sees What the{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Others Cannot</span>
          </h2>
          <p className="body" style={{ fontSize: '0.85rem', marginTop: 8, maxWidth: 640 }}>
            RGB fails in clouds; SAR doesn't. Multispectral confuses pools and panels; thermal distinguishes them by heat.
            Smart meters confirm generation but can't localize; vision localizes but can't confirm. Together, they are <strong style={{ color: 'var(--text-primary)' }}>mutually verifying</strong>.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'center' }}>
          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="label-mono" style={{ marginBottom: 4, fontSize: '0.56rem' }}>Input Modalities</div>
            {inputs.map((inp, i) => (
              <motion.div
                key={inp.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onHoverStart={() => setHoveredInput(i)}
                onHoverEnd={() => setHoveredInput(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  background: hoveredInput === i ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1px solid ${hoveredInput === i ? inp.color + '66' : 'var(--border)'}`,
                  borderRadius: 10,
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: inp.color, boxShadow: `0 0 8px ${inp.color}`, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{inp.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)' }}>{inp.sub}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: inp.color, marginTop: 2 }}>→ {inp.encoder}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center fusion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 300 }}
          >
            <div className="label-mono" style={{ fontSize: '0.56rem', textAlign: 'center' }}>Cross-Modal Attention Fusion</div>
            <div className="card" style={{ padding: '10px', width: '100%', borderColor: 'var(--amber-border)' }}>
              <FusionFlow />
            </div>
            <div style={{
              padding: '8px 16px',
              background: 'var(--amber-dim)',
              border: '1px solid var(--amber-border)',
              borderRadius: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--amber-bright)',
              textAlign: 'center',
            }}>
              Unified Representation
            </div>
          </motion.div>

          {/* Outputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="label-mono" style={{ marginBottom: 4, fontSize: '0.56rem' }}>Unified Outputs</div>
            {outputs.map((out, i) => (
              <motion.div
                key={out.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  background: 'var(--bg-card)',
                  border: `1px solid var(--border)`,
                  borderRight: `3px solid ${out.color}`,
                  borderRadius: '10px 0 0 10px',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: out.color, flexShrink: 0 }}>→</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{out.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiModalSlide;
