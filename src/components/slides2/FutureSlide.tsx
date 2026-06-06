import { motion } from 'framer-motion';
import { useState } from 'react';

const signals = [
  {
    id: 'multispectral',
    label: '01 · Multispectral + SAR',
    color: 'var(--amber)',
    badge: 'Near-term upgrade',
    title: 'Sentinel-2 + Sentinel-1 SAR Fusion',
    stats: ['99.97% overall accuracy', '85.86% producer accuracy', 'Netherlands validation'],
    body: 'Solar panel glass has a distinctive NIR/SWIR spectral signature. SAR adds radar returns from metal frames — surviving cloud cover and monsoon haze. Plakman et al. (2022) proved this on freely available satellite data.',
    note: 'Re-train on Sentinel-2 + Sentinel-1 combined feature space → cloud-penetrating detection',
  },
  {
    id: 'hyperspectral',
    label: '02 · Hyperspectral',
    color: 'var(--teal)',
    badge: 'ESA PRISMA proven',
    title: 'Hundreds of Spectral Bands',
    stats: ['88.06% producer accuracy', 'PRISMA satellite proven', 'ESA CHIME → 2029'],
    body: "PV silicon and glass have unique spectral absorption curves across the full EM spectrum. Hyperspectral data can distinguish solar panel material from every other reflective surface that fools RGB systems. Jörges et al. (2023) showed this with PRISMA.",
    note: 'As hyperspectral satellites proliferate, spectral fingerprinting of individual panels becomes feasible from space',
  },
  {
    id: 'thermal',
    label: '03 · Thermal IR',
    color: '#f472b6',
    badge: 'Health detection',
    title: 'From Presence to Panel Health',
    stats: ['Landsat TIRS 100m', 'NASA ECOSTRESS 38m', 'Hotspot detection'],
    body: 'A functioning panel operates at a predictable temperature. Cell failures, soiling, or degradation produce "hotspot" signatures. Satellite thermal transforms the audit from binary ("panel exists?") to performance ("is it generating what it should?").',
    note: 'Moves from detection to continuous health monitoring of the distributed solar fleet',
  },
  {
    id: 'smartmeter',
    label: '04 · Smart Meter Fusion',
    color: 'var(--green)',
    badge: '250M meter target',
    title: 'Hybrid Verification — The Ground Truth Layer',
    stats: ['250M India AMI target', 'EUR 170B EU grid investment', '$17B peak savings (RMI)'],
    body: 'Cross-reference satellite-derived visual inventories with smart meter generation data. Visual anchor gives theoretical max capacity (kWp). Smart meter gives actual output (kWh). The gap reveals: underperforming panels, ghost panels, and unregistered installations.',
    note: 'No single data source answers all three questions. The fusion does.',
  },
];

const FutureSlide = () => {
  const [active, setActive] = useState(0);
  const sig = signals[active];

  return (
    <div className="slide">
      <div className="glow-amber-tr" style={{ opacity: 0.35 }} />
      <div className="glow-teal-bl" style={{ opacity: 0.3 }} />

      <div className="slide-inner">
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
          <div className="label-mono" style={{ marginBottom: 8 }}>Part VI — Beyond RGB</div>
          <div className="glow-rule" style={{ marginBottom: 14 }} />
          <h2 className="h-section" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.1 }}>
            What We Built Is{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Just the Beginning</span>
          </h2>
          <p className="body" style={{ fontSize: '0.88rem', marginTop: 8, maxWidth: 560 }}>
            Our system operates on RGB imagery. The electromagnetic spectrum contains far more information about solar panels than human eyes can see.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28 }}>
          {/* Signal selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {signals.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                style={{
                  background: active === i ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1px solid ${active === i ? s.color + '66' : 'var(--border)'}`,
                  borderLeft: active === i ? `3px solid ${s.color}` : '3px solid transparent',
                  borderRadius: '0 10px 10px 0',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  outline: 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: s.color, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: active === i ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.3 }}>
                  {s.title}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div className="card" style={{ padding: '24px 28px', borderColor: sig.color + '44', flex: 1 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                <span className="badge" style={{
                  background: sig.color + '18',
                  border: `1px solid ${sig.color}44`,
                  color: sig.color,
                  fontSize: '0.6rem',
                }}>
                  {sig.badge}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: 14, lineHeight: 1.2 }}>
                {sig.title}
              </h3>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                {sig.body}
              </p>

              <div style={{ padding: '12px 16px', background: sig.color + '12', border: `1px solid ${sig.color}33`, borderRadius: 8 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: sig.color, lineHeight: 1.6 }}>
                  → {sig.note}
                </div>
              </div>
            </div>

            {/* Proven stats */}
            <div style={{ display: 'flex', gap: 10 }}>
              {sig.stats.map(s => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    background: 'var(--bg-card)',
                    border: `1px solid ${sig.color}33`,
                    borderRadius: 10,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, color: sig.color, lineHeight: 1.3 }}>{s}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FutureSlide;
