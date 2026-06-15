import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ── 1. Multispectral: stacked wavelength bands sweeping across a panel ──
const MultispectralAnim = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let t = 0, raf: number;

    const bands = [
      { label: 'RGB',  color: '#60a5fa', y: 0.12 },
      { label: 'NIR',  color: '#f59e0b', y: 0.30 },
      { label: 'SWIR', color: '#34d399', y: 0.48 },
      { label: 'SAR',  color: '#a78bfa', y: 0.66 },
      { label: 'RE',   color: '#f472b6', y: 0.84 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#07070E'; ctx.fillRect(0, 0, W, H);

      // Satellite icon top-right
      ctx.fillStyle = 'rgba(245,158,11,0.6)';
      ctx.fillRect(W - 28, 6, 18, 12);
      ctx.fillRect(W - 36, 10, 8, 4);
      ctx.fillRect(W - 18, 10, 8, 4);

      bands.forEach((b) => {
        const py = H * b.y;
        const bh = H * 0.10;

        // Sliding signal wave
        for (let x = 0; x < W - 60; x++) {
          const progress = (x + t * 1.2) / (W - 60);
          const amp = 0.3 + 0.6 * Math.abs(Math.sin(progress * Math.PI * 5));
          ctx.fillStyle = b.color + Math.floor(amp * 180).toString(16).padStart(2, '0');
          ctx.fillRect(x + 55, py, 1, bh * amp);
        }

        // Label
        ctx.fillStyle = b.color;
        ctx.font = 'bold 9px monospace';
        ctx.fillText(b.label, 4, py + bh * 0.75);
      });

      // Vertical "panel detected" line sweeping
      const vx = 55 + ((t * 1.2) % (W - 55));
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(vx, 0); ctx.lineTo(vx, H); ctx.stroke();

      // Panel outline at center
      const cx = (W - 55) / 2 + 55, cy = H / 2;
      const pulse = 0.4 + 0.4 * Math.sin(t * 0.06);
      ctx.strokeStyle = `rgba(34,197,94,${pulse})`;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - 12, cy - 8, 24, 16);

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width={300} height={120} style={{ width: '100%', height: 120, borderRadius: 10 }} />;
};

// ── 2. Hyperspectral: hundreds of bands as a colour-coded heatmap strip ──
const HyperspectralAnim = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let t = 0, raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#07070E'; ctx.fillRect(0, 0, W, H);

      const numBands = 120;
      const bw = (W - 40) / numBands;

      // Rainbow heatmap across all bands
      for (let i = 0; i < numBands; i++) {
        const hue = (i / numBands) * 280; // violet → red spectrum
        const panelResponse = // bump where solar panels respond (NIR ~800nm = band ~60, SWIR ~1600nm = band ~90)
          Math.exp(-Math.pow((i - 60) / 12, 2)) * 0.9 +
          Math.exp(-Math.pow((i - 90) / 8, 2)) * 0.7 +
          0.15;
        const amp = Math.min(1, panelResponse + 0.05 * Math.sin(i * 0.3 + t * 0.04));
        const barH = amp * H * 0.65;

        ctx.fillStyle = `hsla(${hue}, 85%, 60%, ${0.5 + amp * 0.5})`;
        ctx.fillRect(40 + i * bw, H - barH - 10, Math.max(1, bw - 0.5), barH);
      }

      // Axis labels
      ctx.fillStyle = 'rgba(241,245,249,0.4)';
      ctx.font = '8px monospace';
      ctx.fillText('400nm', 40, H - 2);
      ctx.fillText('2500nm', W - 44, H - 2);

      // Highlight peaks with pulse
      const pulse = 0.6 + 0.4 * Math.sin(t * 0.07);
      [60, 90].forEach(idx => {
        const x = 40 + idx * bw;
        ctx.strokeStyle = `rgba(255,255,255,${pulse * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H - 14); ctx.stroke();
      });

      // Label peaks
      ctx.fillStyle = 'rgba(245,158,11,0.9)';
      ctx.font = '8px monospace';
      ctx.fillText('NIR', 40 + 60 * bw - 6, 12);
      ctx.fillStyle = 'rgba(20,184,166,0.9)';
      ctx.fillText('SWIR', 40 + 90 * bw - 10, 12);

      // Side label
      ctx.save();
      ctx.fillStyle = 'rgba(241,245,249,0.35)';
      ctx.font = '9px monospace';
      ctx.translate(12, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Reflectance', -28, 0);
      ctx.restore();

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width={300} height={120} style={{ width: '100%', height: 120, borderRadius: 10 }} />;
};

// ── 3. Thermal IR: panel grid with hotspot cells glowing ──
const ThermalAnim = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let t = 0, raf: number;

    const COLS = 8, ROWS = 5;
    // Some cells are healthy, some are hotspots, one is dead
    const cellStates: ('ok' | 'hot' | 'dead')[] = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      cellStates[i] = i === 11 || i === 19 || i === 27 ? 'hot'
        : i === 3 || i === 35 ? 'dead'
        : 'ok';
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#05050D'; ctx.fillRect(0, 0, W, H);

      const cw = (W - 60) / COLS, ch = (H - 28) / ROWS;
      const ox = 30, oy = 14;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = r * COLS + c;
          const x = ox + c * cw, y = oy + r * ch;
          const state = cellStates[i];

          if (state === 'ok') {
            // Normal cell — cool blue/teal gradient
            const temp = 0.3 + 0.1 * Math.sin(t * 0.02 + i * 0.4);
            ctx.fillStyle = `rgba(20, ${100 + temp * 60}, ${160 + temp * 40}, 0.85)`;
          } else if (state === 'hot') {
            // Hotspot — pulsing red/orange
            const pulse = 0.5 + 0.5 * Math.sin(t * 0.08 + i);
            ctx.fillStyle = `rgba(${220 + pulse * 35}, ${60 + pulse * 40}, 20, ${0.8 + pulse * 0.18})`;
          } else {
            // Dead cell — dark grey
            ctx.fillStyle = 'rgba(40, 40, 50, 0.7)';
          }
          ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2);

          // Cell border
          ctx.strokeStyle = 'rgba(255,255,255,0.06)';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x + 1, y + 1, cw - 2, ch - 2);
        }
      }

      // Glow halo on hotspots
      [11, 19, 27].forEach(i => {
        const r = Math.floor(i / COLS), c = i % COLS;
        const x = ox + c * cw + cw / 2, y2 = oy + r * ch + ch / 2;
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.08 + i);
        const grd = ctx.createRadialGradient(x, y2, 0, x, y2, cw);
        grd.addColorStop(0, `rgba(239,68,68,${0.3 + pulse * 0.3})`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(x - cw, y2 - ch, cw * 2, ch * 2);
      });

      // Legend
      ctx.fillStyle = 'rgba(20,184,166,0.8)';
      ctx.font = '8px monospace';
      ctx.fillText('Normal', ox, H - 3);
      ctx.fillStyle = 'rgba(239,68,68,0.9)';
      ctx.fillText('Hotspot', ox + 60, H - 3);
      ctx.fillStyle = 'rgba(100,100,120,0.7)';
      ctx.fillText('Dead cell', ox + 128, H - 3);

      // Thermal scale bar
      const scaleGrd = ctx.createLinearGradient(W - 20, oy, W - 20, oy + ROWS * ch);
      scaleGrd.addColorStop(0, '#ef4444');
      scaleGrd.addColorStop(0.5, '#f59e0b');
      scaleGrd.addColorStop(1, '#14b8a6');
      ctx.fillStyle = scaleGrd;
      ctx.fillRect(W - 18, oy, 10, ROWS * ch);
      ctx.fillStyle = 'rgba(241,245,249,0.4)';
      ctx.font = '7px monospace';
      ctx.fillText('Hot', W - 17, oy + 8);
      ctx.fillText('Cool', W - 18, oy + ROWS * ch - 2);

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width={300} height={120} style={{ width: '100%', height: 120, borderRadius: 10 }} />;
};

// ── 4. Smart Meter: visual vs actual generation bar comparison ──
const SmartMeterAnim = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let t = 0, raf: number;

    const installs = [
      { kWp: 0.85, kWh: 0.82 }, // healthy
      { kWp: 0.90, kWh: 0.41 }, // degraded
      { kWp: 0.75, kWh: 0.73 }, // healthy
      { kWp: 0.80, kWh: 0.05 }, // ghost — claimed but generating nothing
      { kWp: 0.70, kWh: 0.68 }, // healthy
      { kWp: 0.95, kWh: 0.30 }, // degraded
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#07070E'; ctx.fillRect(0, 0, W, H);

      const n = installs.length;
      const groupW = (W - 40) / n;
      const maxH = H - 36;
      const ox = 20, oy = 10;

      installs.forEach((inst, i) => {
        const gx = ox + i * groupW;
        const bw = groupW * 0.3;

        // Visual (kWp) bar — amber
        const vBarH = inst.kWp * maxH;
        ctx.fillStyle = 'rgba(245,158,11,0.5)';
        ctx.fillRect(gx + groupW * 0.05, oy + maxH - vBarH, bw, vBarH);

        // Actual (kWh) bar — green or red depending on gap
        const gap = inst.kWp - inst.kWh;
        const isGhost = inst.kWh < 0.15;
        const aBarH = inst.kWh * maxH;
        ctx.fillStyle = isGhost
          ? `rgba(239,68,68,${0.6 + 0.3 * Math.sin(t * 0.08 + i)})`
          : gap > 0.35
          ? 'rgba(251,146,60,0.7)'
          : 'rgba(34,197,94,0.65)';
        ctx.fillRect(gx + groupW * 0.45, oy + maxH - aBarH, bw, aBarH);

        // Gap indicator
        if (gap > 0.15) {
          const topY = oy + maxH - vBarH;
          const botY = oy + maxH - aBarH;
          ctx.strokeStyle = isGhost ? 'rgba(239,68,68,0.8)' : 'rgba(251,146,60,0.6)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(gx + groupW * 0.25, topY);
          ctx.lineTo(gx + groupW * 0.45, topY);
          ctx.moveTo(gx + groupW * 0.25, botY);
          ctx.lineTo(gx + groupW * 0.45, botY);
          ctx.stroke();
          ctx.setLineDash([]);

          // Gap label
          if (isGhost) {
            const pulse = 0.6 + 0.4 * Math.sin(t * 0.09 + i);
            ctx.fillStyle = `rgba(239,68,68,${pulse})`;
            ctx.font = 'bold 8px monospace';
            ctx.fillText('!', gx + groupW * 0.52, (topY + botY) / 2 + 3);
          }
        }

        // X label
        ctx.fillStyle = isGhost ? 'rgba(239,68,68,0.8)' : 'rgba(241,245,249,0.35)';
        ctx.font = `${isGhost ? 'bold ' : ''}8px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(isGhost ? 'GHOST' : `#${i + 1}`, gx + groupW / 2, H - 3);
        ctx.textAlign = 'left';
      });

      // Legend
      ctx.fillStyle = 'rgba(245,158,11,0.8)';
      ctx.font = '8px monospace';
      ctx.fillText('■ Visual kWp', 2, H - 14);
      ctx.fillStyle = 'rgba(34,197,94,0.8)';
      ctx.fillText('■ Actual kWh', 80, H - 14);
      ctx.fillStyle = 'rgba(239,68,68,0.8)';
      ctx.fillText('■ Ghost', 162, H - 14);

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width={300} height={120} style={{ width: '100%', height: 120, borderRadius: 10 }} />;
};

const ANIMS = [MultispectralAnim, HyperspectralAnim, ThermalAnim, SmartMeterAnim];

const signals = [
  {
    id: 'multispectral',
    label: 'Multispectral + SAR',
    color: '#60a5fa',
    badge: 'Near-term upgrade',
    title: 'Sentinel-2 + Sentinel-1 SAR Fusion',
    stats: ['99.97% accuracy', '85.86% producer acc.', 'Netherlands validated'],
    body: 'Solar panel glass has a distinctive NIR/SWIR spectral signature. SAR adds radar returns from metal frames — surviving cloud cover and monsoon haze. Proven on freely available satellite data.',
    note: 'Re-train on Sentinel-2 + SAR combined space → cloud-penetrating detection year-round',
  },
  {
    id: 'hyperspectral',
    label: 'Hyperspectral',
    color: 'var(--teal)',
    badge: 'ESA PRISMA proven',
    title: 'Hundreds of Spectral Bands',
    stats: ['88.06% producer acc.', 'PRISMA satellite proven', 'ESA CHIME → 2029'],
    body: 'PV silicon and glass have unique absorption curves across the full EM spectrum. Hyperspectral data distinguishes solar panels from every other reflective surface that fools RGB systems.',
    note: 'As hyperspectral satellites proliferate, spectral fingerprinting from space becomes feasible',
  },
  {
    id: 'thermal',
    label: 'Thermal IR',
    color: '#f472b6',
    badge: 'Health detection',
    title: 'From Presence to Panel Health',
    stats: ['Landsat TIRS 100m', 'NASA ECOSTRESS 38m', 'Hotspot detection'],
    body: 'A functioning panel operates at a predictable temperature. Cell failures, soiling, or degradation produce "hotspot" signatures visible from orbit — turning detection into continuous health monitoring.',
    note: 'Upgrades from binary detection to continuous performance monitoring of the solar fleet',
  },
  {
    id: 'smartmeter',
    label: 'Smart Meter Fusion',
    color: 'var(--green)',
    badge: '250M meter target',
    title: 'Hybrid Verification — Ground Truth Layer',
    stats: ['250M India AMI target', 'EUR 170B EU investment', '$17B peak savings'],
    body: 'Cross-reference satellite visual inventories with smart meter generation data. Visual gives max capacity (kWp). Meter gives actual output (kWh). The gap reveals ghost panels, degradation, and fraud.',
    note: 'No single source answers all three questions. The fusion does.',
  },
];

const FutureSlide = () => {
  const [active, setActive] = useState(0);
  const sig = signals[active];
  const AnimComp = ANIMS[active];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSelect = (i: number) => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setActive(i);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(p => (p + 1) % 4), 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="slide">
      <div className="glow-amber-tr" style={{ opacity: 0.3 }} />
      <div className="glow-teal-bl" style={{ opacity: 0.25 }} />

      <div className="slide-inner">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
          <div className="label-mono" style={{ fontSize: '1.35rem', marginBottom: 10 }}>Future Works — Beyond RGB</div>
          <div className="glow-rule" style={{ marginBottom: 14 }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.8rem, 3.8vw, 3.8rem)',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>
            What We Built Is{' '}
            <span style={{ color: 'var(--amber)' }}>Just the Beginning</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: '#CBD5E1', marginTop: 8, lineHeight: 1.6, maxWidth: 560 }}>
            Our system sees RGB. Solar panels reveal themselves across the full electromagnetic spectrum.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 28 }}>
          {/* Signal selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {signals.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => handleSelect(i)}
                whileHover={{ x: 4 }}
                style={{
                  background: active === i ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1.5px solid ${active === i ? s.color + '66' : 'var(--border)'}`,
                  borderLeft: `4px solid ${active === i ? s.color : 'transparent'}`,
                  borderRadius: '0 12px 12px 0',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  outline: 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: s.color, marginBottom: 5, letterSpacing: '0.06em' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: active === i ? 700 : 500,
                  color: active === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                  lineHeight: 1.25,
                }}>
                  {s.label}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <div className="card" style={{ padding: '22px 26px', borderColor: sig.color + '44' }}>
                {/* Badge */}
                <span className="badge" style={{
                  background: sig.color + '18',
                  border: `1px solid ${sig.color}44`,
                  color: sig.color,
                  fontSize: '0.9rem',
                  padding: '5px 14px',
                  marginBottom: 14,
                  display: 'inline-flex',
                }}>
                  {sig.badge}
                </span>

                {/* Unique animation per signal */}
                <div style={{ background: 'var(--bg-surface)', borderRadius: 10, padding: '10px', marginBottom: 16, border: `1px solid ${sig.color}22` }}>
                  <AnimComp />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.9rem',
                  color: 'var(--text-primary)',
                  marginBottom: 10,
                  lineHeight: 1.2,
                }}>
                  {sig.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.35rem',
                  color: '#CBD5E1',
                  lineHeight: 1.75,
                  marginBottom: 14,
                }}>
                  {sig.body}
                </p>

                <div style={{ padding: '12px 16px', background: sig.color + '12', border: `1px solid ${sig.color}30`, borderRadius: 8 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', color: sig.color, lineHeight: 1.6 }}>
                    → {sig.note}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 10 }}>
                {sig.stats.map(s => (
                  <div key={s} style={{
                    flex: 1,
                    padding: '12px 14px',
                    background: 'var(--bg-card)',
                    border: `1.5px solid ${sig.color}30`,
                    borderRadius: 12,
                    textAlign: 'center',
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', fontWeight: 600, color: sig.color }}>{s}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FutureSlide;
