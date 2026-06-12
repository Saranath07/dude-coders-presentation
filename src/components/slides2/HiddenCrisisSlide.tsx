import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Animated duck curve
const DuckCurve = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let t = 0, raf: number;

    const drawCurve = () => {
      ctx.clearRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = 'rgba(241,245,249,0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Solar generation curve (hill shape)
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const progress = x / W;
        // Bell curve centered at 0.45
        const solar = Math.exp(-Math.pow((progress - 0.45) * 3.5, 2)) * 0.65;
        ctx.lineTo(x, H * (1 - solar));
      }
      ctx.strokeStyle = 'rgba(245,158,11,0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Animated glow on solar peak
      const peakX = W * 0.45;
      const peakY = H * 0.35;
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.05);
      const grad = ctx.createRadialGradient(peakX, peakY, 0, peakX, peakY, 25 + pulse * 10);
      grad.addColorStop(0, `rgba(245,158,11,${0.3 + pulse * 0.2})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(peakX - 35, peakY - 35, 70, 70);

      // Net load (duck curve)
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const progress = x / W;
        const base = 0.5 + 0.08 * Math.sin(progress * Math.PI);
        const solar = Math.exp(-Math.pow((progress - 0.45) * 3.5, 2)) * 0.55;
        const duck = base - solar;
        ctx.lineTo(x, H * (1 - Math.max(0.05, duck)));
      }
      ctx.strokeStyle = '#14B8A6';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Ramp zone highlight
      const rampX = W * 0.75;
      const rampGrad = ctx.createLinearGradient(rampX, 0, W, 0);
      rampGrad.addColorStop(0, 'rgba(239,68,68,0.0)');
      rampGrad.addColorStop(0.4, 'rgba(239,68,68,0.07)');
      rampGrad.addColorStop(1, 'rgba(239,68,68,0.12)');
      ctx.fillStyle = rampGrad;
      ctx.fillRect(rampX, 0, W - rampX, H);

      // Labels
      ctx.font = `500 10px var(--font-mono, monospace)`;
      ctx.fillStyle = 'rgba(245,158,11,0.8)';
      ctx.fillText('Solar gen', W * 0.05, H * 0.28);
      ctx.fillStyle = '#14B8A6';
      ctx.fillText('Net demand', W * 0.05, H * 0.7);
      ctx.fillStyle = 'rgba(239,68,68,0.8)';
      ctx.fillText('Ramp zone', W * 0.76, H * 0.2);

      t++;
      raf = requestAnimationFrame(drawCurve);
    };

    drawCurve();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} width={340} height={140} style={{ width: '100%', height: 140 }} />;
};

const crises = [
  {
    num: '01',
    title: 'Grid Flying Blind',
    color: 'var(--amber)',
    stats: ['1,650 GW queued', '5–15% curtailed'],
    body: 'The Duck Curve forces natural gas plants to ramp from near-zero to full power in hours as the sun sets. Grid operators cannot plan for generation they cannot see.',
    viz: <DuckCurve />,
  },
  {
    num: '02',
    title: '$9B Subsidies — Verified by Nobody',
    color: '#EF4444',
    stats: ['₹75,000 crore budget', '10M installs targeted'],
    body: "India's PM Surya Ghar scheme explicitly acknowledges: no performance monitoring or verification mechanism exists. Panels can be claimed, subsidised, then removed.",
    viz: null,
  },
  {
    num: '03',
    title: 'Ghost Panel Problem',
    color: 'var(--teal)',
    stats: ['Unknown error margin', 'Every national inventory'],
    body: 'Solar panels that exist on paper — in energy audits, subsidy claims, carbon offset calculations — but may be degraded, stolen, or never installed. No ground truth.',
    viz: null,
  },
];

const HiddenCrisisSlide = () => {
  const [active, setActive] = useState(0);
  const crisis = crises[active];

  return (
    <div className="slide">
      <div className="glow-amber-tr" style={{ opacity: 0.4 }} />

      <div className="slide-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32 }}
        >
          <div className="label-mono" style={{ marginBottom: 10 }}>Part II — The Hidden Crisis</div>
          <div className="glow-rule" style={{ marginBottom: 16 }} />
          <h2
            className="h-section"
            style={{ fontSize: 'clamp(2.4rem, 3.8vw, 3.4rem)' }}
          >
            Millions of Panels.{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>No One's Watching.</span>
          </h2>
          <p className="body" style={{ fontSize: '1.2rem', marginTop: 8, maxWidth: 560 }}>
            42% of all solar additions are distributed/rooftop — largely invisible to grid operators, governments, and financial auditors.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32 }}>
          {/* Tab selectors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {crises.map((c, i) => (
              <motion.button
                key={c.num}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                style={{
                  background: active === i ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1px solid ${active === i ? c.color : 'var(--border)'}`,
                  borderRadius: 12,
                  padding: '16px 20px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  transition: 'all 0.25s ease',
                  outline: 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: c.color, letterSpacing: '0.1em', marginBottom: 4 }}>
                  CRISIS {c.num}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem', lineHeight: 1.2 }}>
                  {c.title}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="card"
            style={{ padding: '28px 32px', borderColor: crisis.color + '44', display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {crisis.stats.map(s => (
                <span key={s} className={`badge badge-${active === 0 ? 'amber' : active === 1 ? 'red' : 'teal'}`}>{s}</span>
              ))}
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {crisis.body}
            </p>

            {crisis.viz && (
              <div style={{ background: 'var(--bg-surface)', borderRadius: 10, padding: '14px 16px', border: '1px solid var(--border)' }}>
                <div className="label-mono" style={{ marginBottom: 8, fontSize: '0.88rem' }}>Duck Curve — CAISO-style load profile</div>
                {crisis.viz}
              </div>
            )}

            {active === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['₹75,000 Cr', 'Subsidy budget'], ['10M', 'Installs targeted'], ['0', 'Monitoring systems'], ['~$9B', 'Unverified capital']].map(([v, l]) => (
                  <div key={l} style={{ background: 'var(--bg-surface)', borderRadius: 8, padding: '14px 16px', border: '1px solid var(--red-border)' }}>
                    <div className="stat-num" style={{ fontSize: '2.2rem', color: '#EF4444' }}>{v}</div>
                    <div className="stat-label">{l}</div>
                  </div>
                ))}
              </div>
            )}

            {active === 2 && (
              <div style={{ padding: '18px 20px', background: 'var(--teal-dim)', border: '1px solid var(--teal-border)', borderRadius: 10 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', color: 'var(--teal-bright)', lineHeight: 1.7 }}>
                  The gap between what is <em>reported</em> and what <em>exists</em>.<br />
                  Every national solar inventory carries an unknown margin of error.
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HiddenCrisisSlide;
