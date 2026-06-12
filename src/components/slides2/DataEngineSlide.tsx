import { motion } from 'framer-motion';
import { useState } from 'react';

const augmentations = [
  { name: 'Mosaic', value: '1.0', desc: 'Combines 4 images — forces detection of partial panels at edges', color: 'var(--amber)' },
  { name: 'Mixup', value: '0.5', desc: '50% blend of two images — simulates haze and overlap conditions', color: 'var(--teal)' },
  { name: 'Rotation', value: '360°', desc: 'Full rotation — satellite has no canonical orientation', color: '#a78bfa' },
  { name: 'Scale', value: '±60%', desc: 'Extreme zoom range — handles tiny rooftop to large utility', color: 'var(--green)' },
  { name: 'HSV Jitter', value: 'S:0.8 V:0.5', desc: 'Color variance — simulates atmospheric and sensor variation', color: 'var(--amber)' },
  { name: 'Copy-Paste', value: '0.5', desc: 'Pastes panel crops onto negative images — expands rare positives', color: 'var(--teal)' },
];

const negatives = [
  { label: 'Swimming pools', icon: '🏊', why: 'Similar blue spectral signature, rectangular shape' },
  { label: 'Wet rooftops', icon: '💧', why: 'Dark reflective surface post-rain looks like glass panels' },
  { label: 'Skylights', icon: '🔲', why: 'Rectangular glass on rooftop — near-identical geometry' },
  { label: 'Metal surfaces', icon: '⚙️', why: 'Industrial roofing with specular reflection' },
  { label: 'Solar water heaters', icon: '♨️', why: 'Related but different — no PV generation' },
];

const DataEngineSlide = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="slide">
      <div className="glow-teal-bl" style={{ opacity: 0.5 }} />

      <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, alignItems: 'start' }}>
        {/* Left */}
        <div>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 26 }}>
            <div className="label-mono" style={{ marginBottom: 8 }}>Pillar 2 — Data Engine</div>
            <div className="glow-rule" style={{ marginBottom: 16, background: 'var(--teal)', boxShadow: '0 0 12px var(--teal)' }} />
            <h2 className="h-section" style={{ fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)', lineHeight: 1.15 }}>
              Teaching the Model{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--teal)' }}>What Isn't a Panel</span>
            </h2>
            <p className="body" style={{ fontSize: '1.18rem', marginTop: 10 }}>
              Most detection systems fail on solar because they're trained on too-clean data.
              Our data pipeline attacked this with hard negative mining and SAM-assisted labeling.
            </p>
          </motion.div>

          {/* SAM label quality */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ padding: '20px 22px', marginBottom: 16, borderColor: 'var(--teal-border)' }}
          >
            <div className="label-mono" style={{ marginBottom: 12, fontSize: '0.9rem', color: 'var(--teal)' }}>SAM-Assisted Labeling</div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: '#EF4444' }}>±5px</div>
                <div className="stat-label">Manual label error</div>
              </div>
              <div style={{ flex: 1, height: 2, background: 'var(--border)', position: 'relative' }}>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: 'absolute', top: -3, right: 0, width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)' }}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--teal)' }}>pixel</div>
                <div className="stat-label">SAM-assisted precision</div>
              </div>
            </div>
          </motion.div>

          {/* Hard negatives */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ padding: '18px 22px' }}
          >
            <div className="label-mono" style={{ marginBottom: 12, fontSize: '0.9rem' }}>Hard Negative Mining — Trained on These Imposters</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {negatives.map((n, i) => (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-surface)' }}
                >
                  <span style={{ fontSize: '1rem' }}>{n.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{n.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.0rem', color: 'var(--text-muted)' }}>{n.why}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: augmentation grid */}
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} style={{ marginBottom: 18 }}>
            <div className="label-mono" style={{ marginBottom: 8, fontSize: '0.9rem' }}>Augmentation Pipeline — All Active During Training</div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {augmentations.map((aug, i) => (
              <motion.div
                key={aug.name}
                className="card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                style={{
                  padding: '16px 18px',
                  borderColor: hovered === i ? aug.color + '66' : 'var(--border)',
                  cursor: 'default',
                  transition: 'border-color 0.25s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: aug.color }}>{aug.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{aug.value}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {hovered === i ? aug.desc : aug.desc.substring(0, 48) + '…'}
                </p>
              </motion.div>
            ))}
          </div>

          {/* TTA note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: 16, padding: '14px 18px', background: 'var(--amber-dim)', border: '1px solid var(--amber-border)', borderRadius: 10 }}
          >
            <div className="label-mono" style={{ marginBottom: 6, fontSize: '0.88rem' }}>Test-Time Augmentation (TTA)</div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', color: 'var(--amber-bright)', lineHeight: 1.6 }}>
              Every inference call uses <code>augment=True</code> — the model internally runs on original + flipped/scaled variants
              and merges predictions. +2–3% recall on difficult cases. Zero extra engineering cost.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DataEngineSlide;
