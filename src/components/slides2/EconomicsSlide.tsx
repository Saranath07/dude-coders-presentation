import { motion } from 'framer-motion';

const tiers = [
  { scale: '10K properties', sub: 'Pilot', imagery: 'Free (Sentinel-2)', compute: '~2–3 GPU-hrs', total: '< $5', color: 'var(--teal)' },
  { scale: '100K properties', sub: 'District', imagery: 'Free (Sentinel-2)', compute: '~17 GPU-hrs', total: '< $50', color: 'var(--amber)' },
  { scale: '10M properties', sub: 'National', imagery: 'Free (Sentinel-2)', compute: '~1,700 GPU-hrs', total: '$500–$2K', color: 'var(--green)', highlight: true },
  { scale: 'Drone survey', sub: 'Real-time', imagery: 'N/A', compute: 'Jetson Orin', total: '$249 one-time', color: '#a78bfa' },
];

const sentinelSpecs = [
  { k: 'Resolution', v: '10 m (VIS/NIR)' },
  { k: 'Revisit', v: '5 days' },
  { k: 'Swath', v: '290 km' },
  { k: 'Spectral', v: '13 bands' },
  { k: 'Cost', v: 'FREE' },
];

const edgeSpecs = [
  { k: 'Jetson Orin Nano Super', v: '$249' },
  { k: 'Jetson Orin NX 8GB', v: '70 TOPS · 10–25W' },
  { k: 'Jetson Orin NX 16GB', v: '100 TOPS · 10–25W' },
  { k: 'Jetson AGX Orin', v: '275 TOPS · 60W' },
  { k: 'TensorRT speed', v: '180 FPS at edge' },
];

const EconomicsSlide = () => (
  <div className="slide">
    <div className="glow-teal-bl" style={{ opacity: 0.5 }} />

    <div className="slide-inner">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
        <div className="label-mono" style={{ marginBottom: 8 }}>Part V — Deployment Economics</div>
        <div className="glow-rule" style={{ marginBottom: 14, background: 'var(--teal)', boxShadow: '0 0 12px var(--teal)' }} />
        <h2 className="h-section" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.1 }}>
          Near-Zero Marginal Cost{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--teal)' }}>at National Scale</span>
        </h2>
        <p className="body" style={{ fontSize: '0.88rem', marginTop: 8, maxWidth: 600 }}>
          At scale, the marginal cost of auditing one more property approaches <strong style={{ color: 'var(--text-primary)' }}>zero</strong> when
          built on free Sentinel-2 imagery. Fundamentally different economics from field inspection (~$100–300/property).
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {/* Left: cost table */}
        <div>
          <div className="label-mono" style={{ marginBottom: 12, fontSize: '0.58rem' }}>Total Cost Model</div>
          <div className="card" style={{ overflow: 'hidden' }}>
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.scale}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1fr 1fr 0.9fr',
                  gap: 8,
                  padding: '14px 16px',
                  background: tier.highlight ? 'var(--bg-elevated)' : 'transparent',
                  borderBottom: i < tiers.length - 1 ? '1px solid var(--border)' : 'none',
                  borderLeft: tier.highlight ? `3px solid ${tier.color}` : '3px solid transparent',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: tier.highlight ? 700 : 500, color: tier.highlight ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {tier.scale}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: tier.color }}>{tier.sub}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--teal)' }}>{tier.imagery}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>{tier.compute}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: tier.color, textAlign: 'right' }}>{tier.total}</div>
              </motion.div>
            ))}
          </div>

          {/* Column headers above */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 0.9fr', gap: 8, padding: '0 16px 6px', marginTop: -4 }}>
            {['Scale', 'Imagery', 'Compute', 'Cost'].map(h => (
              <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{h}</div>
            ))}
          </div>

          {/* Insight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: 14, padding: '14px 16px', background: 'var(--amber-dim)', border: '1px solid var(--amber-border)', borderRadius: 10 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--amber-bright)', lineHeight: 1.7 }}>
              Field inspection: $100–300 per property<br />
              SolarSight at national scale: <strong>~$0.0002 per property</strong>
            </div>
          </motion.div>
        </div>

        {/* Right: two spec cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Sentinel-2 */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ padding: '18px 20px', borderColor: 'var(--teal-border)', flex: 1 }}
          >
            <div className="label-mono" style={{ marginBottom: 12, fontSize: '0.58rem', color: 'var(--teal)' }}>
              Option B — ESA Copernicus Sentinel-2
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              <span className="badge badge-teal">Completely Free</span>
              <span className="badge badge-teal">Open Access</span>
              <span className="badge badge-teal">copernicus.eu</span>
            </div>
            {sentinelSpecs.map(s => (
              <div key={s.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{s.k}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: s.k === 'Cost' ? 'var(--green)' : 'var(--teal)' }}>{s.v}</span>
              </div>
            ))}
            <div style={{ marginTop: 10, fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              A national audit of India — every district — on zero-cost imagery. Only pay for compute.
            </div>
          </motion.div>

          {/* Edge hardware */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ padding: '18px 20px', borderColor: '#a78bfa44', flex: 1 }}
          >
            <div className="label-mono" style={{ marginBottom: 12, fontSize: '0.58rem', color: '#a78bfa' }}>
              Edge Deployment — NVIDIA Jetson Orin
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              <span className="badge" style={{ background: '#a78bfa18', border: '1px solid #a78bfa44', color: '#c4b5fd', fontSize: '0.58rem' }}>Drone-ready</span>
              <span className="badge" style={{ background: '#a78bfa18', border: '1px solid #a78bfa44', color: '#c4b5fd', fontSize: '0.58rem' }}>TensorRT export</span>
            </div>
            {edgeSpecs.map(s => (
              <div key={s.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>{s.k}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, color: s.k === 'TensorRT speed' ? 'var(--amber)' : '#c4b5fd' }}>{s.v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

export default EconomicsSlide;
