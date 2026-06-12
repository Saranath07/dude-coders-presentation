import { motion } from 'framer-motion';

const phases = [
  {
    phase: 'Phase 1',
    status: 'achieved',
    label: 'Reliable Inventory',
    metric: 'F1 = 0.95',
    color: 'var(--green)',
    timeline: 'Achieved',
    bullets: [
      'Automated verifiable detection from satellite imagery',
      'Exact geolocation and pixel-level area of every asset',
      '6-stage cascade with dual buffer radii',
    ],
  },
  {
    phase: 'Phase 2',
    status: 'next',
    label: 'Capacity Estimation',
    metric: 'Next Quarter',
    color: 'var(--teal)',
    timeline: 'Q3 2026',
    bullets: [
      'Pixel area → predicted kWp via orientation + tilt estimation',
      'Shadow analysis for azimuth/tilt inference',
      'Local irradiance data integration per property',
    ],
  },
  {
    phase: 'Phase 3',
    status: 'planned',
    label: 'Grid Intelligence',
    metric: '$45.67B VPP by 2035',
    color: 'var(--amber)',
    timeline: 'Year 1',
    bullets: [
      'Aggregate distributed solar inventory across grid zones',
      'Transformer load balancing + Virtual Power Plant planning',
      'VPP market: 22.61% CAGR; solar holds 29.2% share',
    ],
  },
  {
    phase: 'Phase 4',
    status: 'planned',
    label: 'Financial Compliance',
    metric: 'Year 2',
    color: '#f472b6',
    timeline: 'Year 2',
    bullets: [
      'Cross-ref visual inventories vs subsidy databases',
      'Smart meter fusion to detect ghost assets',
      'Capacity misrepresentation and fraud detection',
    ],
  },
];

const vppStats = [
  { v: '$6.28B', l: 'VPP market 2025' },
  { v: '$45.67B', l: 'VPP market 2035' },
  { v: '22.61%', l: 'CAGR' },
  { v: '60 GW', l: 'US peak reduction by 2030 (RMI)' },
  { v: '$17B', l: 'Annual savings by 2030' },
];

const RoadmapSlide = () => (
  <div className="slide">
    <div className="glow-amber-tr" style={{ opacity: 0.4 }} />
    <div className="glow-teal-bl" style={{ opacity: 0.3 }} />

    <div className="slide-inner">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 26 }}>
        <div className="label-mono" style={{ marginBottom: 8 }}>Part VII — The Larger Vision</div>
        <div className="glow-rule" style={{ marginBottom: 12 }} />
        <h2 className="h-section" style={{ fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)', lineHeight: 1.1 }}>
          From Dots on a Map to{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Energy Security</span>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 28 }}>
        {/* Phase timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical connecting line */}
          <div style={{ position: 'absolute', left: 19, top: 24, bottom: 24, width: 2, background: 'linear-gradient(180deg, var(--green) 0%, var(--teal) 33%, var(--amber) 66%, #f472b6 100%)', opacity: 0.3, zIndex: 0 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {phases.map((ph, i) => (
              <motion.div
                key={ph.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                style={{ display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}
              >
                {/* Phase dot */}
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  background: ph.status === 'achieved' ? ph.color : 'var(--bg-card)',
                  border: `2px solid ${ph.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: ph.status === 'achieved' ? `0 0 16px ${ph.color}55` : 'none',
                }}>
                  {ph.status === 'achieved'
                    ? <span style={{ fontSize: '1rem' }}>✓</span>
                    : <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: ph.color }}>{i + 1}</span>
                  }
                </div>

                {/* Content */}
                <div style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: ph.status === 'achieved' ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1px solid ${ph.status === 'achieved' ? ph.color + '55' : 'var(--border)'}`,
                  borderRadius: 10,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: ph.color }}>{ph.phase}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{ph.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span className="badge" style={{
                        background: ph.color + '18', border: `1px solid ${ph.color}44`,
                        color: ph.color, fontSize: '0.88rem',
                      }}>
                        {ph.metric}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', color: 'var(--text-muted)' }}>{ph.timeline}</span>
                    </div>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {ph.bullets.map(b => (
                      <li key={b} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: ph.color, fontSize: '0.9rem', marginTop: 3, flexShrink: 0 }}>→</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: VPP stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="label-mono" style={{ marginBottom: 4, fontSize: '0.86rem' }}>Virtual Power Plant Market</div>

          {vppStats.map((s, i) => (
            <motion.div
              key={s.l}
              className="card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              style={{ padding: '14px 16px' }}
            >
              <div className="stat-num" style={{ fontSize: '2.2rem', color: i < 2 ? 'var(--amber)' : i === 2 ? 'var(--teal)' : 'var(--green)' }}>{s.v}</div>
              <div className="stat-label" style={{ fontSize: '0.86rem', marginTop: 4 }}>{s.l}</div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ padding: '14px 16px', background: 'var(--amber-dim)', border: '1px solid var(--amber-border)', borderRadius: 10 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.98rem', color: 'var(--amber-bright)', lineHeight: 1.7 }}>
              "You cannot orchestrate what you haven't mapped."
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

export default RoadmapSlide;
