import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const stages = [
  { n: 1, name: 'Standard Full-Image', method: 'model.predict(img, conf=0.20)', buffer: '1,200 sqft', boost: false, crop: false, color: 'var(--amber)' },
  { n: 2, name: 'Saturation Boost', method: 'HSV[:,:,1] × 1.5 → predict', buffer: '1,200 sqft', boost: true, crop: false, color: 'var(--amber)' },
  { n: 3, name: 'Crop to Buffer', method: 'image[cy±r₁] → predict', buffer: '1,200 sqft', boost: false, crop: true, color: 'var(--teal)' },
  { n: 4, name: 'Saturated Crop', method: 'saturate(crop) → predict', buffer: '1,200 sqft', boost: true, crop: true, color: 'var(--teal)' },
  { n: 5, name: 'Re-check Step 1 @ r₂', method: 'reuse Step 1 detections (free)', buffer: '2,400 sqft', boost: false, crop: false, color: '#a78bfa', free: true },
  { n: 6, name: 'Re-check Step 2 @ r₂', method: 'reuse Step 2 detections (free)', buffer: '2,400 sqft', boost: true, crop: false, color: '#a78bfa', free: true },
];

// Animated "scanning" satellite image mock
const SatImageScan = ({ stage }: { stage: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let raf: number, t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Background "satellite" texture
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, '#0d1a0f');
      bgGrad.addColorStop(1, '#0a140c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Roof tiles / texture
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 10; col++) {
          const x = col * 14, y = row * 14;
          ctx.fillStyle = `rgba(${30 + (row + col) % 3 * 8}, ${40 + col % 4 * 5}, ${20}, 0.9)`;
          ctx.fillRect(x + 1, y + 1, 12, 12);
        }
      }

      // Stage 2/4: color saturation boost effect
      if (stage >= 2 && stage !== 3) {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.06)';
        ctx.fillRect(0, 0, W, H);
      }

      // Stage 3/4: crop box
      if (stage >= 3) {
        const r = 38;
        const cx = W / 2 + 8, cy = H / 2 - 4;
        ctx.strokeStyle = 'rgba(20,184,166,0.7)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(cx - r, cy - r, r * 2, r * 2);
        ctx.setLineDash([]);
      }

      // Solar panel (the target)
      const px = W / 2 + 8, py = H / 2 - 4;
      ctx.fillStyle = '#1a3a8a';
      ctx.fillRect(px - 12, py - 9, 24, 18);
      // Grid lines on panel
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(px - 12 + i * 6, py - 9); ctx.lineTo(px - 12 + i * 6, py + 9); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(px - 12, py); ctx.lineTo(px + 12, py); ctx.stroke();

      // Detection box (animates in for successful stages)
      if (stage >= 1) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.08);
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.5 + pulse * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(px - 16, py - 13, 32, 26);

        // Confidence badge
        ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
        ctx.fillRect(px - 16, py - 22, 38, 10);
        ctx.fillStyle = '#000';
        ctx.font = '6px var(--font-mono, monospace)';
        ctx.fillText('0.889', px - 14, py - 14);
      }

      // Buffer circle
      const bufR = stage >= 5 ? 50 : 35;
      const bufPulse = 0.3 + 0.3 * Math.sin(t * 0.05);
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, bufR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245, 158, 11, ${bufPulse})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Scan line
      const scanY = (t * 1.5) % H;
      const scanGrad = ctx.createLinearGradient(0, scanY - 6, 0, scanY + 6);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, 'rgba(245,158,11,0.12)');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 6, W, 12);

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  return <canvas ref={canvasRef} width={140} height={112} style={{ borderRadius: 8, width: 140, height: 112 }} />;
};

const CascadeSlide = () => {
  const [activeStage, setActiveStage] = useState(0);
  const s = stages[activeStage];

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => setActiveStage(p => (p + 1) % 6), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slide">
      <div className="glow-amber-tr" style={{ opacity: 0.4 }} />

      <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>
        {/* Left */}
        <div>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
            <div className="label-mono" style={{ marginBottom: 8 }}>Pillar 3 — Inference Cascade</div>
            <div className="glow-rule" style={{ marginBottom: 14 }} />
            <h2 className="h-section" style={{ fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)', lineHeight: 1.1 }}>
              The 6-Stage Fallback Strategy
            </h2>
            <p className="body" style={{ fontSize: '1.15rem', marginTop: 8 }}>
              Each stage only runs if the previous failed. Steps 5 & 6 are free — they reuse cached detections, just re-evaluated at a larger radius.
            </p>
          </motion.div>

          {/* Stage flow */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {stages.map((stage, i) => (
              <motion.div
                key={stage.n}
                onClick={() => setActiveStage(i)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 10,
                  background: activeStage === i ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1px solid ${activeStage === i ? stage.color + '66' : 'var(--border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                whileHover={{ x: 3 }}
              >
                {/* Stage number */}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: activeStage === i ? stage.color : 'transparent',
                  border: `1.5px solid ${stage.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700,
                  color: activeStage === i ? '#000' : stage.color,
                  transition: 'all 0.25s',
                }}>
                  {stage.n}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', gap: 8, alignItems: 'center' }}>
                    {stage.name}
                    {(stage as { free?: boolean }).free && <span className="badge-teal badge" style={{ fontSize: '0.5rem', padding: '2px 8px' }}>FREE</span>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {stage.method}
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: stage.color, flexShrink: 0 }}>
                  {stage.buffer}
                </div>

                {/* Arrow to next */}
                {i < 5 && (
                  <div style={{
                    position: 'absolute',
                    left: 25, bottom: -9,
                    width: 1, height: 9,
                    background: `${stage.color}40`,
                    zIndex: 1,
                  }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: live visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="card"
              style={{ padding: '20px', borderColor: s.color + '55' }}
            >
              <div className="label-mono" style={{ marginBottom: 10, fontSize: '0.9rem', color: s.color }}>
                STAGE {s.n} — LIVE SIMULATION
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                <SatImageScan stage={activeStage + 1} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { l: 'Buffer', v: s.buffer },
                  { l: 'Boost', v: s.boost ? 'HSV ×1.5' : 'Off' },
                  { l: 'Crop', v: s.crop ? 'Active' : 'Off' },
                  { l: 'Inference', v: (s as { free?: boolean }).free ? 'Cached' : 'New call' },
                ].map(kv => (
                  <div key={kv.l} style={{ background: 'var(--bg-surface)', borderRadius: 6, padding: '8px 10px' }}>
                    <div className="stat-label" style={{ fontSize: '0.52rem' }}>{kv.l}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: 2 }}>{kv.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* GSD math */}
          <div className="card" style={{ padding: '16px 18px', borderColor: 'var(--amber-border)' }}>
            <div className="label-mono" style={{ marginBottom: 8, fontSize: '0.57rem' }}>Buffer Geometry @ 21°N India</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              GSD = <span style={{ color: 'var(--amber)' }}>0.059 m/px</span> @ Zoom 20<br />
              r₁ = <span style={{ color: 'var(--amber)' }}>5.96 m</span> (1,200 sqft ≈ 111.5 m²)<br />
              r₂ = <span style={{ color: '#a78bfa' }}>8.43 m</span> (2,400 sqft ≈ 223 m²)
            </div>
          </div>

          {/* F1 improvement */}
          <div className="card" style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="stat-label">Base F1</div>
                <div className="stat-num" style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>0.85</div>
              </div>
              <div style={{ color: 'var(--amber)', fontFamily: 'var(--font-mono)', fontSize: '1.2rem' }}>→</div>
              <div>
                <div className="stat-label">Cascade F1</div>
                <div className="stat-num" style={{ fontSize: '1.5rem' }}>0.95</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CascadeSlide;
