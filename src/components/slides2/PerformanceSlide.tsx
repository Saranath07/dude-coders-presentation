import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const models = [
  { name: 'Traditional\n(Hough+Color)', f1: 0.54, color: '#EF4444', note: '70% shadowed panels missed' },
  { name: 'Faster R-CNN', f1: 0.68, color: '#F59E0B', note: 'Standard baseline' },
  { name: 'YOLOv8-seg', f1: 0.82, color: '#F59E0B', note: 'Strong but single-pass' },
  { name: 'Base YOLOv12', f1: 0.85, color: '#14B8A6', note: 'Attention arch advantage' },
  { name: 'YOLOv12\n+ Cascade', f1: 0.95, color: '#22C55E', note: 'Our system', highlight: true },
];

const RadarCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const R = 80;

    const axes = ['F1 Score', 'Precision', 'Recall', 'Speed', 'Robustness', 'Scale'];
    const ours    = [0.95, 0.94, 0.96, 0.88, 0.92, 0.90];
    const baseline= [0.82, 0.80, 0.85, 0.72, 0.65, 0.70];
    let t = 0, raf: number;

    const pt = (i: number, r: number) => {
      const angle = (i / axes.length) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.03);

      // Grid rings
      [0.25, 0.5, 0.75, 1].forEach(frac => {
        ctx.beginPath();
        for (let i = 0; i < axes.length; i++) {
          const p = pt(i, R * frac);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(241,245,249,0.06)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Axis lines
      axes.forEach((_, i) => {
        const p = pt(i, R);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = 'rgba(241,245,249,0.08)'; ctx.lineWidth = 1; ctx.stroke();
      });

      // Baseline polygon
      ctx.beginPath();
      baseline.forEach((v, i) => { const p = pt(i, R * v); i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
      ctx.closePath();
      ctx.fillStyle = 'rgba(245,158,11,0.07)';
      ctx.strokeStyle = 'rgba(245,158,11,0.3)';
      ctx.lineWidth = 1.5;
      ctx.fill(); ctx.stroke();

      // Ours polygon
      ctx.beginPath();
      ours.forEach((v, i) => { const p = pt(i, R * v); i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
      ctx.closePath();
      ctx.fillStyle = `rgba(34,197,94,${0.12 + pulse * 0.06})`;
      ctx.strokeStyle = `rgba(34,197,94,${0.6 + pulse * 0.3})`;
      ctx.lineWidth = 2;
      ctx.fill(); ctx.stroke();

      // Axis labels
      ctx.font = '9px var(--font-mono,monospace)';
      ctx.fillStyle = 'rgba(148,163,184,0.8)';
      axes.forEach((label, i) => {
        const p = pt(i, R + 14);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, p.x, p.y);
      });

      // Legend
      ctx.font = '8px var(--font-mono,monospace)';
      ctx.fillStyle = 'rgba(34,197,94,0.8)'; ctx.textAlign = 'left';
      ctx.fillText('● Our system', cx - 60, cy + R + 22);
      ctx.fillStyle = 'rgba(245,158,11,0.6)';
      ctx.fillText('○ YOLOv8-seg', cx - 60, cy + R + 35);

      t++; raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} width={220} height={220} style={{ width: 220, height: 220 }} />;
};

const PerformanceSlide = () => (
  <div className="slide">
    <div className="glow-amber-tr" style={{ opacity: 0.5 }} />
    <div className="glow-teal-bl" style={{ opacity: 0.3 }} />

    <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 48, alignItems: 'center' }}>
      {/* Left */}
      <div>
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
          <div className="label-mono" style={{ marginBottom: 8 }}>Part IV — Performance</div>
          <div className="glow-rule" style={{ marginBottom: 16 }} />
          <h2 className="h-section" style={{ fontSize: 'clamp(2.4rem, 3.8vw, 3.6rem)', lineHeight: 1.1 }}>
            The Numbers{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Speak</span>
          </h2>
        </motion.div>

        {/* Bar chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {models.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: m.highlight ? 'var(--bg-elevated)' : 'var(--bg-card)',
                border: `1px solid ${m.highlight ? m.color + '55' : 'var(--border)'}`,
                borderRadius: 10,
                padding: '12px 16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  fontWeight: m.highlight ? 700 : 400,
                  color: m.highlight ? 'var(--text-primary)' : 'var(--text-secondary)',
                  whiteSpace: 'pre',
                }}>
                  {m.name}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.0rem', color: 'var(--text-muted)' }}>{m.note}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: m.color,
                    minWidth: 40,
                    textAlign: 'right',
                  }}>
                    {m.f1.toFixed(2)}
                  </span>
                </div>
              </div>
              <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.f1 * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: '100%',
                    background: m.highlight
                      ? `linear-gradient(90deg, ${m.color}, #4ade80)`
                      : m.color,
                    borderRadius: 3,
                    boxShadow: m.highlight ? `0 0 12px ${m.color}66` : 'none',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Roboflow comparison note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{ marginTop: 16, padding: '12px 16px', background: 'var(--green-dim)', border: '1px solid var(--green-border)', borderRadius: 10 }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', color: '#4ade80', lineHeight: 1.7 }}>
            Tested head-to-head against 3 SOTA Roboflow detection models on complex urban imagery
            and multi-panel rooftop scenarios — our cascade consistently produced fewer false positives
            and recovered panels missed by standard one-pass inference.
          </div>
        </motion.div>
      </div>

      {/* Right: radar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div className="label-mono" style={{ fontSize: '0.88rem', textAlign: 'center' }}>Multi-Dimensional Comparison</div>
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}
        >
          <RadarCanvas />
        </motion.div>

        {/* Key stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%' }}>
          {[
            { v: '+10pp', l: 'F1 from cascade' },
            { v: '0.95', l: 'Final F1 score' },
            { v: '<10ms', l: 'T4 GPU inference' },
            { v: '6 stages', l: 'Fallback depth' },
          ].map(s => (
            <div key={s.l} className="card" style={{ padding: '12px 14px', textAlign: 'center' }}>
              <div className="stat-num" style={{ fontSize: '1.9rem' }}>{s.v}</div>
              <div className="stat-label" style={{ fontSize: '0.54rem' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PerformanceSlide;
