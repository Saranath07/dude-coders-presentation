import { motion } from 'framer-motion';

const pillars = [
  {
    num: '01',
    color: 'var(--amber)',
    title: 'YOLOv12',
    subtitle: 'Attention-Centric Architecture',
    points: [
      'Area Attention (A²) + R-ELAN backbone',
      '1024×1024 resolution training',
      'Detection + Segmentation + Classification',
      'Pixel-level panel area measurement',
    ],
  },
  {
    num: '02',
    color: 'var(--teal)',
    title: 'Data Engine',
    subtitle: "Teaching the model what isn't a panel",
    points: [
      'Hard Negative Mining: pools, wet roofs, skylights',
      'SAM-assisted pixel-perfect boundary labels',
      'Full 360° rotation augmentation',
      'Mosaic 1.0 + Mixup 0.5 + copy-paste',
    ],
  },
  {
    num: '03',
    color: '#a78bfa',
    title: '6-Stage Cascade',
    subtitle: 'No panel left behind',
    points: [
      'Progressive sensitivity escalation',
      'HSV saturation boost: spectral dehydration',
      'Dual buffer radii: 1,200 and 2,400 sqft',
      'F1: 0.85 → 0.95 from cascade alone',
    ],
  },
];

const SolutionSlide = () => (
  <div className="slide">
    <div className="glow-amber-tr" style={{ opacity: 0.5 }} />
    <div className="glow-teal-bl" />

    <div className="slide-inner">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 20, textAlign: 'center' }}
      >
        <div className="label-mono" style={{ marginBottom: 8, fontSize: '0.75rem' }}>Part III — Our Solution</div>
        <div className="glow-rule" style={{ margin: '0 auto 14px' }} />
        <h2 className="h-section" style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', lineHeight: 1.1 }}>
          We Didn't Just Build a Detector.{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>We Built a Verifier.</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 620, margin: '10px auto 0', lineHeight: 1.6 }}>
          GPS coordinate in → structured, verifiable solar energy audit out.
          Not just "is there a panel?" but "what size, where, how confident, does it belong to this address?"
        </p>
      </motion.div>

      {/* Three pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {pillars.map((p, i) => (
          <motion.div
            key={p.num}
            className="card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, borderColor: p.color + '66' }}
            style={{ padding: '20px 18px', borderTop: `3px solid ${p.color}` }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: p.color, letterSpacing: '0.12em' }}>
                PILLAR {p.num}
              </div>
              <span className="badge" style={{ background: p.color + '18', border: `1px solid ${p.color}40`, color: p.color, fontSize: '0.65rem', padding: '3px 10px' }}>
                Core
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3, lineHeight: 1.1 }}>
              {p.title}
            </h3>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: p.color, marginBottom: 14, opacity: 0.85 }}>
              {p.subtitle}
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {p.points.map(point => (
                <li key={point} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  <span style={{ color: p.color, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: 3, flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom stat bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ display: 'flex', gap: 0, marginTop: 14, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}
      >
        {[
          { val: '0.95', label: 'F1 Score', color: 'var(--amber)' },
          { val: '0.889', label: 'Confidence Example', color: 'var(--teal)' },
          { val: '38.4 m²', label: 'Panel Area Est.', color: '#a78bfa' },
          { val: '<3m', label: 'Geo Accuracy', color: 'var(--green)' },
          { val: '6-Stage', label: 'Fallback Depth', color: 'var(--amber)' },
        ].map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              padding: '12px 14px',
              background: 'var(--bg-card)',
              borderRight: i < 4 ? '1px solid var(--border)' : 'none',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color: s.color }}>{s.val}</div>
            <div className="stat-label" style={{ fontSize: '0.68rem', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default SolutionSlide;
