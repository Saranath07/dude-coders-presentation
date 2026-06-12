import { motion } from 'framer-motion';
import { useState } from 'react';

const jsonOutput = `{
  "sample_id": "1",
  "lat": 21.1101140695566,
  "lon": 72.86434588591383,
  "has_solar": true,
  "confidence": 0.8889,
  "pv_area_sqm_est": 38.41,
  "euclidean_distance_m_est": 2.82,
  "buffer_radius_sqft": 1200,
  "qc_status": "VERIFIABLE",
  "bbox_or_mask": [[290.8, 276.7, 329.7, 327.6]],
  "image_metadata": {
    "source": "Google Maps Static API",
    "capture_date": "2026-01-04"
  }
}`;

const mathLines = [
  {
    label: 'Area Estimation (GSD formula)',
    formula: 'Area (m²) = (W_px × H_px) × (156543.03 × cos(Lat) / 2^Zoom)²',
    note: 'Mercator distortion corrected per latitude',
    color: 'var(--amber)',
  },
  {
    label: 'Geo Accuracy Check',
    formula: 'Distance (m) = √(ΔX² + ΔY²) × GSD',
    note: 'Verifies panel belongs to this address, not a neighbor',
    color: 'var(--teal)',
  },
];

const qcRules = [
  { status: 'VERIFIABLE', condition: 'Confidence > 70% OR confirmed absent after exhaustive 6-stage search', color: 'var(--green)', icon: '✓' },
  { status: 'NOT_VERIFIABLE', condition: 'Confidence ≤ 70% — flagged for human review queue', color: '#EF4444', icon: '⚠' },
];

const fields = [
  { key: 'has_solar', value: 'true', note: 'Panel detected', color: 'var(--green)' },
  { key: 'confidence', value: '0.8889', note: '88.89% certainty', color: 'var(--amber)' },
  { key: 'pv_area_sqm_est', value: '38.41 m²', note: '~6.2kWp estimated capacity', color: 'var(--teal)' },
  { key: 'euclidean_distance_m_est', value: '2.82 m', note: 'Within r₁ buffer — verified', color: 'var(--amber)' },
  { key: 'qc_status', value: 'VERIFIABLE', note: 'conf > 0.70 threshold passed', color: 'var(--green)' },
];

const OutputSlide = () => {
  const [tab, setTab] = useState<'json' | 'fields'>('fields');

  return (
    <div className="slide">
      <div className="glow-teal-bl" style={{ opacity: 0.4 }} />
      <div className="glow-amber-tr" style={{ opacity: 0.3 }} />

      <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, alignItems: 'start' }}>
        {/* Left */}
        <div>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 26 }}>
            <div className="label-mono" style={{ marginBottom: 8 }}>Audit Output</div>
            <div className="glow-rule" style={{ marginBottom: 16 }} />
            <h2 className="h-section" style={{ fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)', lineHeight: 1.1 }}>
              A Verifiable{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Audit Record</span>
            </h2>
            <p className="body" style={{ fontSize: '1.18rem', marginTop: 10 }}>
              Every location produces a structured, machine-readable record answering not just <em>presence</em> but
              <em> size, location precision, confidence, and fraud risk</em>.
            </p>
          </motion.div>

          {/* JSON / Fields tab */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
            {(['fields', 'json'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 8,
                  border: `1px solid ${tab === t ? 'var(--amber-border)' : 'var(--border)'}`,
                  background: tab === t ? 'var(--amber-dim)' : 'var(--bg-card)',
                  color: tab === t ? 'var(--amber-bright)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
              >
                {t === 'json' ? 'JSON Output' : 'Field Breakdown'}
              </button>
            ))}
          </div>

          {tab === 'fields' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {fields.map((f, i) => (
                <motion.div
                  key={f.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    background: 'var(--bg-card)',
                    border: `1px solid var(--border)`,
                    borderLeft: `3px solid ${f.color}`,
                    borderRadius: '0 8px 8px 0',
                    gap: 12,
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', color: 'var(--text-secondary)' }}>{f.key}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color: f.color }}>{f.value}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)' }}>{f.note}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card"
              style={{ padding: '16px', overflow: 'auto', maxHeight: 280 }}
            >
              <pre style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.0rem',
                color: 'var(--text-secondary)',
                whiteSpace: 'pre',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {jsonOutput.split('\n').map((line, i) => {
                  const isKey = line.includes('"') && line.includes(':');
                  const isNum = /:\s[\d.]+[,]?$/.test(line.trim());
                  const isBool = /: true|: false/.test(line);
                  const isStr = /: "/.test(line);
                  return (
                    <div key={i} style={{ color: isNum || isBool ? 'var(--amber)' : isStr ? 'var(--teal)' : isKey ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {line}
                    </div>
                  );
                })}
              </pre>
            </motion.div>
          )}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Math */}
          <div>
            <div className="label-mono" style={{ marginBottom: 12, fontSize: '0.88rem' }}>The Math Behind the Numbers</div>
            {mathLines.map((m, i) => (
              <motion.div
                key={m.label}
                className="card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
                style={{ padding: '16px 18px', marginBottom: 12, borderColor: m.color + '44' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: m.color, marginBottom: 8 }}>{m.label}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.0rem',
                  color: 'var(--text-primary)',
                  background: 'var(--bg-surface)',
                  padding: '8px 12px',
                  borderRadius: 6,
                  marginBottom: 8,
                  wordBreak: 'break-all',
                }}>
                  {m.formula}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.0rem', color: 'var(--text-muted)' }}>{m.note}</div>
              </motion.div>
            ))}
          </div>

          {/* QC Status */}
          <div>
            <div className="label-mono" style={{ marginBottom: 12, fontSize: '0.88rem' }}>QC Status Logic</div>
            {qcRules.map((r, i) => (
              <motion.div
                key={r.status}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: '14px 16px',
                  marginBottom: 10,
                  background: 'var(--bg-card)',
                  border: `1px solid ${r.color}44`,
                  borderRadius: 10,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: '1.2rem', color: r.color, lineHeight: 1 }}>{r.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', fontWeight: 700, color: r.color, marginBottom: 4 }}>
                    {r.status}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {r.condition}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputSlide;
