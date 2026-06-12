import { motion } from 'framer-motion';

const DemoSlide = () => (
  <div className="slide">
    <div className="glow-amber-center" />

    <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="label-mono" style={{ marginBottom: 12 }}>Live Demo</div>
        <div className="glow-rule" style={{ marginBottom: 20 }} />
        <h2 className="h-section" style={{ fontSize: 'clamp(2.6rem, 4.2vw, 4.0rem)', marginBottom: 20, lineHeight: 1.1 }}>
          See It{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Working</span>
        </h2>

        <p className="body" style={{ fontSize: '1.05rem', marginBottom: 28, lineHeight: 1.8 }}>
          Enter any GPS coordinate. Get a structured solar audit in seconds:
          detection confidence, panel area, QC status, and a visual audit image
          with bounding boxes, buffer circles, and rejected candidates marked.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '📍', label: 'Input', val: 'GPS coordinate (lat, lon)' },
            { icon: '🛰️', label: 'Imagery', val: 'Google Maps Static API @ Zoom 20' },
            { icon: '🤖', label: 'Model', val: 'YOLOv12 + 6-stage cascade' },
            { icon: '✅', label: 'Output', val: 'results.json + audit image' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <span style={{ fontSize: '1.1rem' }}>{row.icon}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--amber)', minWidth: 52 }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{row.val}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="https://shriprasad15.github.io/Dude-Coders-Ideathon/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 22px',
              background: 'var(--amber)',
              color: '#000',
              borderRadius: 10,
              fontFamily: 'var(--font-mono)',
              fontSize: '1.0rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
          >
            ↗ Live Demo
          </a>
          <a
            href="https://github.com/shriprasad15/Dude-Coders-Ideathon/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 22px',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              fontFamily: 'var(--font-mono)',
              fontSize: '1.0rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
          >
            ↗ GitHub
          </a>
        </div>
      </motion.div>

      {/* Right: video / comparison */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <div className="card" style={{ padding: 0, overflow: 'hidden', borderColor: 'var(--amber-border)' }}>
          <video
            src={`${import.meta.env.BASE_URL}demo-video.mp4`}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', display: 'block', maxHeight: 320, objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { src: 'comparison/solar1.jpg', label: 'True Positive' },
            { src: 'comparison/solar833.jpg', label: 'Difficult Case' },
            { src: 'comparison/solar2545.jpg', label: 'Multi-panel' },
          ].map(img => (
            <div key={img.src} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img
                src={`${import.meta.env.BASE_URL}${img.src}`}
                alt={img.label}
                style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '4px 8px',
                background: 'rgba(0,0,0,0.7)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.86rem',
                color: 'var(--amber)',
              }}>
                {img.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default DemoSlide;
