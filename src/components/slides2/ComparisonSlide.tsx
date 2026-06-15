import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const samples = [
  { id: '1',    title: 'Sample #1 — Complex Urban' },
  { id: '833',  title: 'Sample #833 — Multi-Panel' },
];

const models = [
  { name: 'Model 1',          sub: 'Roboflow',  imagePrefix: 'model1-', type: 'external', color: 'var(--text-muted)' },
  { name: 'Model 2',          sub: 'Roboflow',  imagePrefix: 'model2-', type: 'external', color: 'var(--text-muted)' },
  { name: 'Model 3',          sub: 'Roboflow',  imagePrefix: 'model3-', type: 'external', color: 'var(--text-muted)' },
  { name: 'YOLOv12 + Cascade', sub: 'Ours',    imagePrefix: 'solar',   type: 'ours',     color: 'var(--green)' },
];

const metrics = [
  { label: 'F1 Score',   ours: '0.95', baseline: '~0.78', color: 'var(--green)' },
  { label: 'Precision',  ours: '0.96', baseline: '~0.74', color: 'var(--teal-bright)' },
  { label: 'Recall',     ours: '0.94', baseline: '~0.71', color: '#a78bfa' },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const ComparisonSlide = () => {
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
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 22, textAlign: 'center' }}
        >
          <div className="label-mono" style={{ fontSize: '1.35rem', marginBottom: 10 }}>Head-to-Head Comparison</div>
          <div className="glow-rule" style={{ margin: '0 auto 14px' }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(2.6rem, 3.8vw, 3.8rem)',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
          }}>
            How We Compare Against{' '}
            <span style={{ color: 'var(--amber)' }}>Existing Models</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.35rem', color: '#CBD5E1', marginTop: 8 }}>
            Visual comparison against state-of-the-art Roboflow detection models on the same satellite input
          </p>
        </motion.div>

        {/* Sample selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 20 }}
        >
          {samples.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSample(s)}
              style={{
                padding: '10px 28px',
                borderRadius: 12,
                border: `1.5px solid ${activeSample.id === s.id ? 'var(--amber-border)' : 'var(--border)'}`,
                background: activeSample.id === s.id ? 'var(--amber-dim)' : 'var(--bg-card)',
                color: activeSample.id === s.id ? 'var(--amber-bright)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.0rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.25s ease',
                letterSpacing: '0.05em',
              }}
            >
              {s.title}
            </button>
          ))}
        </motion.div>

        {/* Model comparison grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <AnimatePresence mode="wait">
            {models.map((model, idx) => (
              <motion.div
                key={`${activeSample.id}-${model.name}`}
                initial={{ opacity: 0, scale: 0.92, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -14 }}
                transition={{ delay: idx * 0.09, duration: 0.5, ease: EASE_OUT }}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: model.type === 'ours'
                    ? '2.5px solid var(--green-border)'
                    : '1.5px solid var(--border)',
                  background: 'var(--bg-card)',
                  boxShadow: model.type === 'ours' ? '0 0 32px rgba(34,197,94,0.14)' : 'none',
                }}
              >
                {/* Header */}
                <div style={{
                  padding: '12px 16px',
                  background: model.type === 'ours' ? 'var(--green-dim)' : 'var(--bg-elevated)',
                  borderBottom: `1px solid ${model.type === 'ours' ? 'var(--green-border)' : 'var(--border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      color: model.type === 'ours' ? 'var(--green)' : 'var(--text-primary)',
                    }}>
                      {model.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                      {model.sub}
                    </div>
                  </div>
                  {model.type === 'ours' && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700,
                      color: 'var(--green)', background: 'var(--green-dim)',
                      border: '1px solid var(--green-border)', borderRadius: 8, padding: '3px 10px',
                      letterSpacing: '0.06em',
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
                      if (t.parentElement) {
                        t.parentElement.style.display = 'flex';
                        t.parentElement.style.alignItems = 'center';
                        t.parentElement.style.justifyContent = 'center';
                      }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Metric summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 14, alignItems: 'center' }}
        >
          <div style={{
            padding: '14px 22px',
            background: 'var(--green-dim)',
            border: '1.5px solid var(--green-border)',
            borderRadius: 14,
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', color: 'var(--green)', fontWeight: 700 }}>
              Verdict:
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: '#CBD5E1', marginLeft: 10 }}>
              Our cascade filters false positives and handles low-res satellite imagery better than one-pass models.
            </span>
          </div>
          {metrics.map(m => (
            <div
              key={m.label}
              style={{
                padding: '14px 16px',
                background: 'var(--bg-card)',
                border: `1.5px solid var(--border)`,
                borderTop: `3px solid ${m.color}`,
                borderRadius: '0 0 14px 14px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: m.color }}>{m.ours}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.0rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: 2 }}>{m.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: 2 }}>
                vs {m.baseline}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonSlide;
