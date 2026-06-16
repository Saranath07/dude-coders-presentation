import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const stages = [
  { n: 1, name: 'Standard Full-Image',   method: 'model.predict(img, conf=0.20)', buffer: '1,200 sqft', boost: false, crop: false, color: '#F59E0B', numColor: '#F59E0B' },
  { n: 2, name: 'Saturation Boost',      method: 'HSV[:,:,1] × 1.5 → predict',   buffer: '1,200 sqft', boost: true,  crop: false, color: '#FB923C', numColor: '#FB923C' },
  { n: 3, name: 'Crop to Buffer',        method: 'image[cy±r₁] → predict',        buffer: '1,200 sqft', boost: false, crop: true,  color: '#14B8A6', numColor: '#14B8A6' },
  { n: 4, name: 'Saturated Crop',        method: 'saturate(crop) → predict',      buffer: '1,200 sqft', boost: true,  crop: true,  color: '#2DD4BF', numColor: '#2DD4BF' },
  { n: 5, name: 'Re-check Step 1 @ r₂', method: 'reuse Step 1 detections',        buffer: '2,400 sqft', boost: false, crop: false, color: '#A78BFA', numColor: '#A78BFA' },
  { n: 6, name: 'Re-check Step 2 @ r₂', method: 'reuse Step 2 detections',        buffer: '2,400 sqft', boost: true,  crop: false, color: '#C4B5FD', numColor: '#C4B5FD' },
];

// Each stage renders a completely different scene
const SatImageScan = ({ stage }: { stage: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let raf: number, t = 0;

    // Panel position (center)
    const PX = W / 2, PY = H / 2;
    const PW = 32, PH = 22;

    const drawPanel = (saturated: boolean) => {
      // Panel body
      const r = saturated ? 50 : 30;
      const g = saturated ? 90 : 58;
      ctx.fillStyle = `rgb(${r},${g},160)`;
      ctx.fillRect(PX - PW / 2, PY - PH / 2, PW, PH);
      // Grid lines on panel
      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(PX - PW / 2 + i * (PW / 5), PY - PH / 2);
        ctx.lineTo(PX - PW / 2 + i * (PW / 5), PY + PH / 2);
        ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(PX - PW / 2, PY); ctx.lineTo(PX + PW / 2, PY); ctx.stroke();
    };

    const drawRoofTiles = (saturated: boolean) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 11; col++) {
          const base = saturated ? 48 : 28;
          ctx.fillStyle = `rgba(${base + (row + col) % 4 * 6}, ${(saturated ? 52 : 36) + col % 4 * 4}, 18, 0.95)`;
          ctx.fillRect(col * 15 + 1, row * 15 + 1, 13, 13);
        }
      }
    };

    const drawDetectionBox = (conf: string, pulse: number) => {
      ctx.strokeStyle = `rgba(34,197,94,${0.5 + pulse * 0.45})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(PX - PW / 2 - 5, PY - PH / 2 - 5, PW + 10, PH + 10);
      // Confidence tag
      ctx.fillStyle = `rgba(34,197,94,${0.75 + pulse * 0.2})`;
      ctx.fillRect(PX - PW / 2 - 5, PY - PH / 2 - 17, 56, 13);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 7px monospace';
      ctx.fillText(`conf ${conf}`, PX - PW / 2 - 3, PY - PH / 2 - 6);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (stage === 1) {
        // ── STAGE 1: Full image sweep, amber scan line top→bottom ──
        ctx.fillStyle = '#0a140c';
        ctx.fillRect(0, 0, W, H);
        drawRoofTiles(false);

        // Horizontal scan line sweeping down
        const sy = (t * 1.6) % (H + 20) - 10;
        const sg = ctx.createLinearGradient(0, sy - 12, 0, sy + 12);
        sg.addColorStop(0, 'transparent');
        sg.addColorStop(0.5, 'rgba(245,158,11,0.35)');
        sg.addColorStop(1, 'transparent');
        ctx.fillStyle = sg;
        ctx.fillRect(0, sy - 12, W, 24);

        // Panel
        drawPanel(false);

        // Faint detection emerging
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.06);
        ctx.strokeStyle = `rgba(245,158,11,${0.25 + pulse * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(PX - PW / 2 - 6, PY - PH / 2 - 6, PW + 12, PH + 12);
        ctx.setLineDash([]);

        // Small buffer ring r1
        const bp = 0.25 + 0.2 * Math.sin(t * 0.04);
        ctx.beginPath();
        ctx.arc(PX, PY, 38, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245,158,11,${bp})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.fillStyle = 'rgba(245,158,11,0.7)';
        ctx.font = '9px monospace';
        ctx.fillText('Full image', 6, 14);
        ctx.fillText('conf=0.20', 6, 24);

      } else if (stage === 2) {
        // ── STAGE 2: Saturation boost — warm orange wash floods image ──
        ctx.fillStyle = '#0a140c';
        ctx.fillRect(0, 0, W, H);
        drawRoofTiles(true);

        // Strong warm overlay pulsing
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.05);
        ctx.fillStyle = `rgba(245,120,11,${0.12 + pulse * 0.08})`;
        ctx.fillRect(0, 0, W, H);

        // HSV boost shimmer effect — horizontal colour bands
        for (let y = 0; y < H; y += 6) {
          const shimmer = Math.sin(y * 0.15 + t * 0.08) * 0.04;
          ctx.fillStyle = `rgba(255,160,30,${Math.max(0, shimmer)})`;
          ctx.fillRect(0, y, W, 3);
        }

        drawPanel(true);

        // Stronger detection box - saturation helped
        drawDetectionBox('0.91', 0.5 + 0.5 * Math.sin(t * 0.07));

        // Buffer ring r1
        const bp = 0.4 + 0.3 * Math.sin(t * 0.05);
        ctx.beginPath();
        ctx.arc(PX, PY, 38, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245,158,11,${bp})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.fillStyle = 'rgba(245,158,11,0.9)';
        ctx.font = '9px monospace';
        ctx.fillText('HSV ×1.5', 6, 14);
        ctx.fillText('Saturated', 6, 24);

      } else if (stage === 3) {
        // ── STAGE 3: Crop to buffer — outer area blacked out, only circle area visible ──
        ctx.fillStyle = '#0a140c';
        ctx.fillRect(0, 0, W, H);
        drawRoofTiles(false);
        drawPanel(false);

        // Dim the entire image
        ctx.fillStyle = 'rgba(4,4,10,0.72)';
        ctx.fillRect(0, 0, W, H);

        // Cut out the crop circle (clip region stays bright)
        ctx.save();
        ctx.beginPath();
        ctx.arc(PX, PY, 46, 0, Math.PI * 2);
        ctx.clip();
        drawRoofTiles(false);
        drawPanel(false);
        ctx.restore();

        // Crop circle border — teal dashed
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.06);
        ctx.beginPath();
        ctx.arc(PX, PY, 46, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(20,184,166,${0.7 + pulse * 0.25})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Detection box
        drawDetectionBox('0.87', pulse);

        // Label
        ctx.fillStyle = 'rgba(20,184,166,0.9)';
        ctx.font = '9px monospace';
        ctx.fillText('Cropped', 6, 14);
        ctx.fillText('r₁ buffer', 6, 24);

      } else if (stage === 4) {
        // ── STAGE 4: Saturated crop — cropped + warm tint ──
        ctx.fillStyle = '#0a140c';
        ctx.fillRect(0, 0, W, H);
        drawRoofTiles(false);
        drawPanel(false);

        // Dim outer
        ctx.fillStyle = 'rgba(4,4,10,0.72)';
        ctx.fillRect(0, 0, W, H);

        // Bright + saturated crop circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(PX, PY, 46, 0, Math.PI * 2);
        ctx.clip();
        drawRoofTiles(true);
        drawPanel(true);
        // Warm tint inside crop
        const p2 = 0.5 + 0.5 * Math.sin(t * 0.05);
        ctx.fillStyle = `rgba(245,100,20,${0.10 + p2 * 0.06})`;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();

        // Teal crop border
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.06);
        ctx.beginPath();
        ctx.arc(PX, PY, 46, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(20,184,166,${0.7 + pulse * 0.25})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Stronger detection — best conf yet
        drawDetectionBox('0.95', pulse);

        // Label
        ctx.fillStyle = 'rgba(20,184,166,0.9)';
        ctx.font = '9px monospace';
        ctx.fillText('Sat+Crop', 6, 14);
        ctx.fillText('conf 0.95', 6, 24);

      } else if (stage === 5) {
        // ── STAGE 5: Re-check at r₂ — same detection, bigger purple ring ──
        ctx.fillStyle = '#0a140c';
        ctx.fillRect(0, 0, W, H);
        drawRoofTiles(false);
        drawPanel(false);

        // Cached badge — show a "CACHED" stamp feel
        ctx.fillStyle = 'rgba(167,139,250,0.06)';
        ctx.fillRect(0, 0, W, H);

        // Solid detection box (reused, green)
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.07);
        drawDetectionBox('0.89', pulse);

        // Large r₂ buffer ring — prominent purple
        const bp = 0.55 + 0.3 * Math.sin(t * 0.04);
        ctx.beginPath();
        ctx.arc(PX, PY, 58, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167,139,250,${bp})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // r₁ ring faint
        ctx.beginPath();
        ctx.arc(PX, PY, 38, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(167,139,250,0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // "CACHED" watermark
        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = '#a78bfa';
        ctx.font = 'bold 14px monospace';
        ctx.translate(W / 2, H / 2 + 38);
        ctx.rotate(-0.3);
        ctx.fillText('CACHED', -28, 0);
        ctx.restore();

        // r₁/r₂ labels
        ctx.fillStyle = 'rgba(167,139,250,0.85)';
        ctx.font = '9px monospace';
        ctx.fillText('r₂ = 2,400 sqft', 6, 14);
        ctx.fillText('Free recheck', 6, 24);

      } else if (stage === 6) {
        // ── STAGE 6: Re-check r₂ + saturation boost ──
        ctx.fillStyle = '#0a140c';
        ctx.fillRect(0, 0, W, H);
        drawRoofTiles(true);

        // Warm + purple blend overlay
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.05);
        ctx.fillStyle = `rgba(200,130,50,${0.08 + pulse * 0.05})`;
        ctx.fillRect(0, 0, W, H);

        // Shimmer bands
        for (let y = 0; y < H; y += 6) {
          const shimmer = Math.sin(y * 0.15 + t * 0.08) * 0.03;
          ctx.fillStyle = `rgba(200,150,80,${Math.max(0, shimmer)})`;
          ctx.fillRect(0, y, W, 3);
        }

        drawPanel(true);
        drawDetectionBox('0.95', pulse);

        // Large r₂ purple ring
        const bp = 0.55 + 0.3 * Math.sin(t * 0.04);
        ctx.beginPath();
        ctx.arc(PX, PY, 58, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167,139,250,${bp})`;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = '#a78bfa';
        ctx.font = 'bold 14px monospace';
        ctx.translate(W / 2, H / 2 + 38);
        ctx.rotate(-0.3);
        ctx.fillText('CACHED', -28, 0);
        ctx.restore();

        ctx.fillStyle = 'rgba(167,139,250,0.85)';
        ctx.font = '9px monospace';
        ctx.fillText('Sat+r₂', 6, 14);
        ctx.fillText('Free recheck', 6, 24);
      }

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  return (
    <canvas
      ref={canvasRef}
      width={220}
      height={160}
      style={{ borderRadius: 10, width: '100%', height: 160 }}
    />
  );
};

const ArchitectureSlide = () => {
  const [active, setActive] = useState(0);
  const s = stages[active];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSelect = (i: number) => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setActive(i);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(p => (p + 1) % 6), 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="slide">
      <div className="glow-amber-tr" style={{ opacity: 0.4 }} />

      <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 32, alignItems: 'start' }}>
        {/* Left: header + stage list */}
        <div>
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 18 }}>
            <div className="label-mono" style={{ fontSize: '0.9rem', marginBottom: 8 }}>Architecture & Inference Mechanism</div>
            <div className="glow-rule" style={{ marginBottom: 12 }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}>
              The 6-Stage{' '}
              <span style={{ color: 'var(--amber)' }}>Fallback Cascade</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: '#CBD5E1', marginTop: 8, lineHeight: 1.6 }}>
              Each stage runs only if the previous fails. Steps 5 & 6 are free — cached detections re-evaluated at larger radius.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {stages.map((stage, i) => (
              <motion.div
                key={stage.n}
                onClick={() => handleSelect(i)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + i * 0.06 }}
                whileHover={{ x: 3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '15px 18px',
                  borderRadius: 12,
                  background: active === i ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1.5px solid ${active === i ? stage.color + '77' : 'var(--border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {/* Stage bubble */}
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                  background: active === i ? stage.numColor : stage.numColor + '22',
                  border: `2px solid ${stage.numColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700,
                  color: active === i ? '#000' : stage.numColor,
                  transition: 'all 0.25s',
                }}>
                  {stage.n}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', gap: 6, alignItems: 'center' }}>
                    {stage.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#94A3B8', marginTop: 3 }}>
                    {stage.method}
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: stage.color, flexShrink: 0, fontWeight: 600 }}>
                  {stage.buffer}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: compact live viz */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="card"
              style={{ padding: '14px', borderColor: s.color + '66' }}
            >
              <div className="label-mono" style={{ marginBottom: 8, fontSize: '0.78rem', color: s.color }}>
                STAGE {s.n} — SIMULATION
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                <SatImageScan stage={active + 1} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[
                  { l: 'Buffer',    v: s.buffer },
                  { l: 'Boost',     v: s.boost ? 'HSV ×1.5' : 'Off' },
                  { l: 'Crop',      v: s.crop ? 'Active' : 'Off' },
                  { l: 'Inference', v: s.n >= 5 ? 'Cached ✓' : 'New call' },
                ].map(kv => (
                  <div key={kv.l} style={{ background: 'var(--bg-surface)', borderRadius: 6, padding: '7px 9px' }}>
                    <div className="stat-label" style={{ fontSize: '0.62rem' }}>{kv.l}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: 2 }}>{kv.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* GSD math */}
          <div className="card" style={{ padding: '12px 14px', borderColor: 'var(--amber-border)' }}>
            <div className="label-mono" style={{ marginBottom: 6, fontSize: '0.7rem' }}>Buffer Geometry @ 21°N</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.8 }}>
              GSD = <span style={{ color: 'var(--amber)' }}>0.059 m/px</span> @ Zoom 20<br />
              r₁ = <span style={{ color: 'var(--amber)' }}>5.96 m</span> (1,200 sqft)<br />
              r₂ = <span style={{ color: '#a78bfa' }}>8.43 m</span> (2,400 sqft)
            </div>
          </div>

          {/* F1 improvement */}
          <div className="card" style={{ padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="stat-label" style={{ fontSize: '0.7rem' }}>Base F1</div>
                <div className="stat-num" style={{ fontSize: '1.6rem', color: 'var(--text-muted)' }}>0.85</div>
              </div>
              <div style={{ color: 'var(--amber)', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700 }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div className="stat-label" style={{ fontSize: '0.7rem' }}>Cascade F1</div>
                <div className="stat-num" style={{ fontSize: '1.6rem', color: 'var(--green)' }}>0.95</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureSlide;
