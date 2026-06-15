import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ── Animation 1: Rooftop aerial — grid sees only net load, not panels ──
const RooftopAnim = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let t = 0, raf: number;

    const houses = [
      { x: 30,  y: 30,  w: 100, h: 70,  panelW: 50, panelH: 30, hasSolar: true  },
      { x: 160, y: 20,  w: 110, h: 80,  panelW: 60, panelH: 35, hasSolar: true  },
      { x: 300, y: 35,  w: 95,  h: 65,  panelW: 0,  panelH: 0,  hasSolar: false },
      { x: 40,  y: 145, w: 90,  h: 70,  panelW: 45, panelH: 28, hasSolar: true  },
      { x: 165, y: 140, w: 105, h: 75,  panelW: 55, panelH: 32, hasSolar: true  },
      { x: 300, y: 148, w: 100, h: 68,  panelW: 52, panelH: 30, hasSolar: true  },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#04040A'; ctx.fillRect(0, 0, W, H);

      // Grid pattern
      ctx.strokeStyle = 'rgba(241,245,249,0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 28) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 28) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      // Draw rooftops
      houses.forEach(h => {
        // Roof base
        ctx.fillStyle = '#1a1a2e';
        ctx.strokeStyle = 'rgba(241,245,249,0.12)';
        ctx.lineWidth = 1;
        ctx.fillRect(h.x, h.y, h.w, h.h);
        ctx.strokeRect(h.x, h.y, h.w, h.h);

        // Roof tiles texture
        ctx.strokeStyle = 'rgba(241,245,249,0.05)';
        for (let tx = h.x; tx < h.x + h.w; tx += 14) {
          ctx.beginPath(); ctx.moveTo(tx, h.y); ctx.lineTo(tx, h.y + h.h); ctx.stroke();
        }
        for (let ty = h.y; ty < h.y + h.h; ty += 12) {
          ctx.beginPath(); ctx.moveTo(h.x, ty); ctx.lineTo(h.x + h.w, ty); ctx.stroke();
        }

        if (h.hasSolar) {
          // Solar panel
          const px = h.x + (h.w - h.panelW) / 2;
          const py = h.y + (h.h - h.panelH) / 2;
          ctx.fillStyle = '#1e3a8a';
          ctx.fillRect(px, py, h.panelW, h.panelH);
          // Panel grid
          ctx.strokeStyle = 'rgba(255,255,255,0.2)';
          ctx.lineWidth = 0.5;
          for (let i = 1; i < 4; i++) {
            ctx.beginPath(); ctx.moveTo(px + i*(h.panelW/4), py); ctx.lineTo(px + i*(h.panelW/4), py+h.panelH); ctx.stroke();
          }
          ctx.beginPath(); ctx.moveTo(px, py+h.panelH/2); ctx.lineTo(px+h.panelW, py+h.panelH/2); ctx.stroke();

          // "Invisible to grid" — no detection box, just faint question signal
          const glow = 0.15 + 0.1 * Math.sin(t * 0.04 + h.x);
          ctx.strokeStyle = `rgba(245,158,11,${glow})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 5]);
          ctx.strokeRect(px - 3, py - 3, h.panelW + 6, h.panelH + 6);
          ctx.setLineDash([]);
        }
      });

      // "GRID OPERATOR VIEW" overlay — shows only a flat net-load number, not panels
      const barY = H - 46;
      ctx.fillStyle = 'rgba(4,4,10,0.85)';
      ctx.fillRect(0, barY, W, 46);
      ctx.strokeStyle = 'rgba(245,158,11,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, barY); ctx.lineTo(W, barY); ctx.stroke();

      ctx.fillStyle = 'rgba(245,158,11,0.7)';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('GRID OPERATOR VIEW', 8, barY + 13);

      // Net load waveform — no solar detail
      ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const netLoad = 0.5 + 0.18 * Math.sin((x / W) * Math.PI * 3 + t * 0.02)
                       - 0.12 * Math.exp(-Math.pow((x/W - 0.5) * 2.8, 2)); // hidden solar dip
        ctx.lineTo(x, barY + 40 - netLoad * 28);
      }
      ctx.strokeStyle = '#14B8A6';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#14B8A6';
      ctx.font = '8px monospace';
      ctx.fillText('Net load only — solar generation hidden', 8, barY + 42);

      // Satellite scan sweep over rooftops
      const sy = (t * 0.6) % (barY + 10) - 5;
      const sg = ctx.createLinearGradient(0, sy-6, 0, sy+6);
      sg.addColorStop(0, 'transparent');
      sg.addColorStop(0.5, 'rgba(245,158,11,0.08)');
      sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg;
      ctx.fillRect(0, sy - 6, W, 12);

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width={420} height={260} style={{ width: '100%', height: 260, borderRadius: 12 }} />;
};

// ── Animation 2: Newspaper/document — PM Surya Ghar budget, DISCOM stamps ──
const NewspaperAnim = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let t = 0, raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Paper background — aged newsprint feel
      ctx.fillStyle = '#0e0e18';
      ctx.fillRect(0, 0, W, H);

      // Paper texture lines
      ctx.strokeStyle = 'rgba(241,245,249,0.03)';
      ctx.lineWidth = 1;
      for (let y = 0; y < H; y += 8) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Newspaper masthead
      const mhY = 14;
      ctx.fillStyle = 'rgba(241,245,249,0.9)';
      ctx.font = 'bold 13px serif';
      ctx.textAlign = 'center';
      ctx.fillText('THE ENERGY TIMES', W/2, mhY);
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(241,245,249,0.25)';
      ctx.font = '7px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GOVERNMENT EDITION  ·  NEW DELHI', W/2, mhY + 11);
      ctx.textAlign = 'left';

      // Divider rule
      ctx.strokeStyle = 'rgba(241,245,249,0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(16, 34); ctx.lineTo(W - 16, 34); ctx.stroke();
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(16, 37); ctx.lineTo(W - 16, 37); ctx.stroke();

      // Headline
      ctx.fillStyle = '#F1F5F9';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('PM Surya Ghar Muft', 16, 56);
      ctx.fillText('Bijli Yojana', 16, 74);

      // Budget highlight box
      const budgetPulse = 0.7 + 0.15 * Math.sin(t * 0.04);
      ctx.fillStyle = `rgba(245,158,11,${budgetPulse * 0.18})`;
      ctx.fillRect(16, 82, 180, 38);
      ctx.strokeStyle = `rgba(245,158,11,${budgetPulse * 0.6})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(16, 82, 180, 38);
      ctx.fillStyle = `rgba(245,158,11,${budgetPulse})`;
      ctx.font = 'bold 18px monospace';
      ctx.fillText('₹75,021 Cr', 24, 105);
      ctx.fillStyle = 'rgba(241,245,249,0.55)';
      ctx.font = '8px monospace';
      ctx.fillText('APPROVED OUTLAY', 24, 116);

      // Target counter
      ctx.fillStyle = 'rgba(241,245,249,0.8)';
      ctx.font = '9px sans-serif';
      const installs = Math.min(10, Math.floor((t / 180) % 12));
      ctx.fillText(`Target: ${installs}M+ rooftop installs`, 16, 140);

      // Column divider
      ctx.strokeStyle = 'rgba(241,245,249,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(210, 40); ctx.lineTo(210, H - 16); ctx.stroke();

      // Right column — DISCOM validation process
      ctx.fillStyle = 'rgba(241,245,249,0.6)';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('VALIDATION PROCESS', 220, 56);

      const steps = [
        { label: 'Site photo upload',   done: true  },
        { label: 'DISCOM inspection',   done: true  },
        { label: 'Net-meter install',   done: true  },
        { label: 'Ongoing monitoring',  done: false },
        { label: 'Performance verify',  done: false },
      ];

      steps.forEach((step, i) => {
        const sy2 = 70 + i * 28;
        const blink = step.done ? 1 : (Math.sin(t * 0.06 + i) > 0 ? 0.5 : 0.2);

        // Check or X
        if (step.done) {
          ctx.fillStyle = `rgba(34,197,94,${blink})`;
          ctx.font = 'bold 11px monospace';
          ctx.fillText('✓', 222, sy2 + 9);
        } else {
          ctx.fillStyle = `rgba(239,68,68,${blink})`;
          ctx.font = 'bold 11px monospace';
          ctx.fillText('✗', 222, sy2 + 9);
        }

        // Step label
        ctx.fillStyle = step.done
          ? `rgba(241,245,249,0.7)`
          : `rgba(239,68,68,${blink})`;
        ctx.font = `${step.done ? '' : 'bold '}8px monospace`;
        ctx.fillText(step.label, 238, sy2 + 9);

        // Progress bar
        const barW = step.done ? 140 : 0;
        ctx.fillStyle = 'rgba(241,245,249,0.08)';
        ctx.fillRect(222, sy2 + 13, 160, 5);
        ctx.fillStyle = step.done ? 'rgba(34,197,94,0.55)' : 'rgba(239,68,68,0.3)';
        ctx.fillRect(222, sy2 + 13, barW, 5);
      });

      // "DOES NOT SCALE" stamp — faint red diagonal
      ctx.save();
      ctx.globalAlpha = 0.13 + 0.05 * Math.sin(t * 0.03);
      ctx.translate(W * 0.62, H * 0.68);
      ctx.rotate(-0.35);
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 2.5;
      ctx.font = 'bold 22px sans-serif';
      ctx.strokeText('DOES NOT SCALE', -70, 0);
      ctx.restore();

      // Bottom rule + date
      ctx.strokeStyle = 'rgba(241,245,249,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(16, H - 18); ctx.lineTo(W - 16, H - 18); ctx.stroke();
      ctx.fillStyle = 'rgba(241,245,249,0.25)';
      ctx.font = '7px monospace';
      ctx.fillText('Source: Ministry of New and Renewable Energy, India, 2024', 16, H - 7);

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width={420} height={260} style={{ width: '100%', height: 260, borderRadius: 12 }} />;
};

// ── Animation 3: Leakage — panels appearing/disappearing, audit counter drifting ──
const LeakageAnim = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    let t = 0, raf: number;

    // 12 panel "installations" — some are real, some are ghost
    type PanelState = 'real' | 'ghost' | 'removed';
    const panels: { x: number; y: number; state: PanelState; flickerOffset: number }[] = [
      { x: 30,  y: 30,  state: 'real',    flickerOffset: 0.0 },
      { x: 100, y: 30,  state: 'ghost',   flickerOffset: 1.1 },
      { x: 170, y: 30,  state: 'real',    flickerOffset: 2.3 },
      { x: 240, y: 30,  state: 'removed', flickerOffset: 0.7 },
      { x: 310, y: 30,  state: 'real',    flickerOffset: 1.9 },
      { x: 30,  y: 110, state: 'ghost',   flickerOffset: 0.4 },
      { x: 100, y: 110, state: 'real',    flickerOffset: 2.1 },
      { x: 170, y: 110, state: 'removed', flickerOffset: 1.5 },
      { x: 240, y: 110, state: 'ghost',   flickerOffset: 0.2 },
      { x: 310, y: 110, state: 'real',    flickerOffset: 1.7 },
      { x: 65,  y: 190, state: 'real',    flickerOffset: 0.9 },
      { x: 135, y: 190, state: 'ghost',   flickerOffset: 2.5 },
      { x: 205, y: 190, state: 'real',    flickerOffset: 0.6 },
      { x: 275, y: 190, state: 'removed', flickerOffset: 1.3 },
    ];

    const PW = 58, PH = 38;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#04040A'; ctx.fillRect(0, 0, W, H);

      // Subtle grid
      ctx.strokeStyle = 'rgba(241,245,249,0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 36) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 36) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      // Subsidy ledger header
      ctx.fillStyle = 'rgba(241,245,249,0.4)';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('SUBSIDY LEDGER', 8, 14);

      let realCount = 0, ghostCount = 0, removedCount = 0;

      panels.forEach(p => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.05 + p.flickerOffset * 2);

        if (p.state === 'real') {
          realCount++;
          // Solid blue panel
          ctx.fillStyle = '#1e3a8a';
          ctx.fillRect(p.x, p.y, PW, PH);
          ctx.strokeStyle = 'rgba(34,197,94,0.6)';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(p.x, p.y, PW, PH);
          // Grid lines
          ctx.strokeStyle = 'rgba(255,255,255,0.15)';
          ctx.lineWidth = 0.5;
          for (let i = 1; i < 4; i++) {
            ctx.beginPath(); ctx.moveTo(p.x + i*(PW/4), p.y); ctx.lineTo(p.x + i*(PW/4), p.y+PH); ctx.stroke();
          }
          ctx.beginPath(); ctx.moveTo(p.x, p.y+PH/2); ctx.lineTo(p.x+PW, p.y+PH/2); ctx.stroke();

          // Small ✓
          ctx.fillStyle = 'rgba(34,197,94,0.8)';
          ctx.font = 'bold 9px monospace';
          ctx.fillText('✓', p.x + PW - 12, p.y + PH - 4);

        } else if (p.state === 'ghost') {
          ghostCount++;
          // Ghost: dashed red outline, "claimed" but nothing solid
          const alpha = 0.3 + 0.4 * pulse;
          ctx.fillStyle = `rgba(239,68,68,${0.08 + pulse * 0.06})`;
          ctx.fillRect(p.x, p.y, PW, PH);
          ctx.strokeStyle = `rgba(239,68,68,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([5, 4]);
          ctx.strokeRect(p.x, p.y, PW, PH);
          ctx.setLineDash([]);
          // ? mark
          ctx.fillStyle = `rgba(239,68,68,${alpha + 0.1})`;
          ctx.font = `bold ${12 + pulse * 3}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText('?', p.x + PW/2, p.y + PH/2 + 5);
          ctx.textAlign = 'left';
          // "CLAIMED" badge
          ctx.fillStyle = `rgba(239,68,68,${0.5 + pulse * 0.3})`;
          ctx.font = '6px monospace';
          ctx.fillText('CLAIMED', p.x + 2, p.y + 9);

        } else {
          removedCount++;
          // Removed: strikethrough box
          ctx.fillStyle = 'rgba(100,100,120,0.15)';
          ctx.fillRect(p.x, p.y, PW, PH);
          ctx.strokeStyle = 'rgba(100,100,120,0.35)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(p.x, p.y, PW, PH);
          ctx.setLineDash([]);
          // Diagonal cross
          ctx.strokeStyle = 'rgba(239,68,68,0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(p.x+4, p.y+4); ctx.lineTo(p.x+PW-4, p.y+PH-4); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(p.x+PW-4, p.y+4); ctx.lineTo(p.x+4, p.y+PH-4); ctx.stroke();
          ctx.fillStyle = 'rgba(239,68,68,0.5)';
          ctx.font = '6px monospace';
          ctx.fillText('REMOVED', p.x + 2, p.y + 9);
        }
      });

      // Counter bar at bottom
      const barY = H - 44;
      ctx.fillStyle = 'rgba(4,4,10,0.9)';
      ctx.fillRect(0, barY, W, 44);
      ctx.strokeStyle = 'rgba(241,245,249,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, barY); ctx.lineTo(W, barY); ctx.stroke();

      const counts = [
        { label: 'Verified',  val: realCount,    color: 'rgba(34,197,94,0.9)' },
        { label: 'Claimed',   val: ghostCount,   color: 'rgba(239,68,68,0.9)' },
        { label: 'Removed',   val: removedCount, color: 'rgba(100,100,120,0.8)' },
      ];
      const segW = W / 3;
      counts.forEach((c, i) => {
        ctx.fillStyle = c.color;
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(c.val), i * segW + segW/2, barY + 22);
        ctx.fillStyle = 'rgba(241,245,249,0.4)';
        ctx.font = '8px monospace';
        ctx.fillText(c.label, i * segW + segW/2, barY + 38);
      });
      ctx.textAlign = 'left';

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width={420} height={260} style={{ width: '100%', height: 260, borderRadius: 12 }} />;
};

const ANIMS = [RooftopAnim, NewspaperAnim, LeakageAnim];
const ANIM_LABELS = [
  'Rooftop BTM — grid sees net load only',
  'PM Surya Ghar — ₹75,021 Cr deployment',
  'Subsidy ledger — verified vs claimed',
];

const problems = [
  {
    color: 'var(--amber)',
    icon: '⚡',
    title: 'Behind-the-Meter Blindspots',
    body: 'Rooftop solar operates behind-the-meter — grid operators only see net load, not actual generation. A cloud front can cause a sudden net-load spike with no warning, creating real-time balancing and stability risks.',
  },
  {
    color: '#EF4444',
    icon: '₹',
    title: 'Infrastructure Deployment at Scale',
    body: "PM Surya Ghar's ₹75,021 Cr budget targets 10 million installs. Validation relies on DISCOM photo documentation and net-meter checks — a process that doesn't scale to verify ongoing performance across millions of sites.",
  },
  {
    color: 'var(--teal)',
    icon: '👻',
    title: 'The Leakage & Verification Risk',
    body: 'Subsidy fraud — claiming grants for panels that are later removed or degraded — is a documented risk in decentralised asset markets. Without remote sensing, verification gaps compound silently across every national inventory.',
  },
];

const ProblemSlide = () => {
  const [active, setActive] = useState(0);
  const AnimComp = ANIMS[active];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoAdvance = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p + 1) % 3), 5000);
  };

  const handleSelect = (i: number) => {
    // Stop auto-advance permanently once user clicks
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setActive(i);
  };

  useEffect(() => {
    startAutoAdvance();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="slide">
      <div className="glow-amber-tr" style={{ opacity: 0.4 }} />

      <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>

        {/* Left: problem cards */}
        <div>
          <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
            <div className="label-mono" style={{ fontSize: '1.05rem', marginBottom: 10 }}>The Problem</div>
            <div className="glow-rule" style={{ marginBottom: 16 }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.6rem, 3.8vw, 3.8rem)',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}>
              Solar is booming.<br />
              <span style={{ color: 'var(--amber)' }}>Nobody's watching.</span>
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                onClick={() => handleSelect(i)}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.12, duration: 0.5 }}
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '18px 20px',
                  background: active === i ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1.5px solid ${active === i ? p.color + '66' : 'var(--border)'}`,
                  borderLeft: `4px solid ${active === i ? p.color : 'var(--border)'}`,
                  borderRadius: '0 14px 14px 0',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: active === i ? `0 0 20px ${p.color}14` : 'none',
                }}
              >
                <div style={{ fontSize: '1.5rem', lineHeight: 1, width: 32, flexShrink: 0, paddingTop: 2 }}>
                  {p.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: active === i ? p.color : '#F1F5F9',
                    marginBottom: 6,
                    lineHeight: 1.2,
                    transition: 'color 0.25s',
                  }}>
                    {p.title}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    color: '#CBD5E1',
                    lineHeight: 1.65,
                  }}>
                    {p.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: per-problem animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          {/* Active indicator dots */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {problems.map((p, i) => (
              <motion.div
                key={i}
                onClick={() => handleSelect(i)}
                animate={{ width: active === i ? 24 : 8, background: active === i ? p.color : 'var(--border-bright)' }}
                style={{ height: 6, borderRadius: 3, cursor: 'pointer' }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: `1.5px solid ${problems[active].color}44`,
                boxShadow: `0 0 32px ${problems[active].color}12`,
              }}
            >
              <AnimComp />
            </motion.div>
          </AnimatePresence>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            color: problems[active].color,
            textAlign: 'center',
            letterSpacing: '0.06em',
            opacity: 0.8,
          }}>
            {ANIM_LABELS[active]}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemSlide;
