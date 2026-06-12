import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const samples = [
  { id: '1', title: 'Sample #1 — Complex Urban' },
  { id: '833', title: 'Sample #833 — Multi-Panel' },
];

const models = [
  { name: 'Model 1', sub: 'Roboflow', imagePrefix: 'model1-', type: 'external', color: 'var(--text-muted)' },
  { name: 'Model 2', sub: 'Roboflow', imagePrefix: 'model2-', type: 'external', color: 'var(--text-muted)' },
  { name: 'Model 3', sub: 'Roboflow', imagePrefix: 'model3-', type: 'external', color: 'var(--text-muted)' },
  { name: 'YOLOv12 + Cascade', sub: 'Ours', imagePrefix: 'solar', type: 'ours', color: 'var(--green)' },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const BenchmarksSlide = () => {
  const [activeSample, setActiveSample] = useState(samples[0]);

  const getImagePath = (model: typeof models[0]) => {
    const base = import.meta.env.BASE_URL;
    if (model.type === 'ours') return `${base}comparison/solar${activeSample.id}.jpg`;
    return `${base}comparison/${model.imagePrefix}${activeSample.id}.png`;
  };

  return (
    <div className="slide">
      <div className="glow-amber-tr" style={{ opacity: 0.4 }} />
      <div className="glow-teal-bl" style={{ opacity: 0.3 }} />

      <div className="slide-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 18, textAlign: 'center' }}
        >
          <div className="label-mono" style={{ marginBottom: 8, fontSize: '0.75rem' }}>Head-to-Head</div>
          <div className="glow-rule" style={{ margin: '0 auto 12px' }} />
          <h2 className="h-section" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.1 }}>
            How We Compare Against{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Existing Models</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: 6 }}>
            Visual comparison against state-of-the-art Roboflow detection models on the same input
          </p>
        </motion.div>

        {/* Sample selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16 }}
        >
          {samples.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSample(s)}
              style={{
                padding: '8px 22px',
                borderRadius: 10,
                border: `1px solid ${activeSample.id === s.id ? 'var(--amber-border)' : 'var(--border)'}`,
                background: activeSample.id === s.id ? 'var(--amber-dim)' : 'var(--bg-card)',
                color: activeSample.id === s.id ? 'var(--amber-bright)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.25s ease',
                letterSpacing: '0.06em',
              }}
            >
              {s.title}
            </button>
          ))}
        </motion.div>

        {/* Comparison grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <AnimatePresence mode="wait">
            {models.map((model, idx) => (
              <motion.div
                key={`${activeSample.id}-${model.name}`}
                initial={{ opacity: 0, scale: 0.93, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: -12 }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: model.type === 'ours'
                    ? '2px solid var(--green-border)'
                    : '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  boxShadow: model.type === 'ours' ? '0 0 24px rgba(34,197,94,0.12)' : 'none',
                }}
              >
                {/* Header badge */}
                <div style={{
                  padding: '9px 14px',
                  background: model.type === 'ours' ? 'var(--green-dim)' : 'var(--bg-elevated)',
                  borderBottom: `1px solid ${model.type === 'ours' ? 'var(--green-border)' : 'var(--border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 6,
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: model.type === 'ours' ? 'var(--green)' : 'var(--text-primary)',
                    }}>
                      {model.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                      {model.sub}
                    </div>
                  </div>
                  {model.type === 'ours' && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700,
                      color: 'var(--green)', background: 'var(--green-dim)',
                      border: '1px solid var(--green-border)', borderRadius: 6, padding: '2px 8px',
                      letterSpacing: '0.08em',
                    }}>
                      F1 0.95 ★
                    </span>
                  )}
                </div>

                {/* Image */}
                <div style={{ width: '100%', aspectRatio: '1 / 1', background: 'var(--bg-surface)', overflow: 'hidden' }}>
                  <img
                    src={getImagePath(model)}
                    alt={model.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = 'none';
                      t.parentElement!.style.display = 'flex';
                      t.parentElement!.style.alignItems = 'center';
                      t.parentElement!.style.justifyContent = 'center';
                      t.insertAdjacentHTML('afterend', `<span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);padding:16px;text-align:center">Image not available</span>`);
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Verdict bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            marginTop: 14,
            padding: '12px 20px',
            background: 'var(--green-dim)',
            border: '1px solid var(--green-border)',
            borderRadius: 12,
            textAlign: 'center',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--green)', fontWeight: 700 }}>
            Verdict:
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', marginLeft: 8 }}>
            Our cascade strategy filters false positives and handles low-resolution satellite imagery better than standard one-pass detection models.
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default BenchmarksSlide;
