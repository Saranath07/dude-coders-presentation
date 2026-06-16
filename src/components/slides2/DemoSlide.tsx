import { motion } from 'framer-motion';
import { MapPin, Satellite, Bot, CheckSquare } from 'lucide-react';
import TeamQRs from '../TeamQRs';

const steps = [
  { Icon: MapPin,    label: 'Input',   val: 'GPS coordinate (lat, lon)',           color: 'var(--amber)' },
  { Icon: Satellite, label: 'Imagery', val: 'Google Maps Static API @ Zoom 20',    color: 'var(--teal-bright)' },
  { Icon: Bot,       label: 'Model',   val: 'YOLOv12 + 6-stage cascade pipeline',  color: '#a78bfa' },
  { Icon: CheckSquare, label: 'Output', val: 'results.json + annotated audit image', color: 'var(--green)' },
];

const DemoSlide = () => (
  <div className="slide">
    <div className="glow-amber-center" />

    <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
      {/* Left */}
      <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
        <div className="label-mono" style={{ fontSize: '1.35rem', marginBottom: 14 }}>Live Demo</div>
        <div className="glow-rule" style={{ marginBottom: 22 }} />

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(3.0rem, 4.6vw, 4.6rem)',
          lineHeight: 0.98,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: 24,
        }}>
          See It{' '}
          <span style={{ color: 'var(--amber)' }}>Working</span>
        </h2>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.3rem', color: '#CBD5E1', lineHeight: 1.75, marginBottom: 32 }}>
          Enter any GPS coordinate. Get a structured solar audit in seconds — detection confidence, panel area, QC status, and a visual audit image with bounding boxes and rejected candidates marked.
        </p>

        {/* Pipeline steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
          {steps.map(({ Icon, label, val, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.12 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '14px 18px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderLeft: `3px solid ${color}`,
                borderRadius: '0 12px 12px 0',
              }}
            >
              <Icon size={22} color={color} strokeWidth={1.8} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', color, minWidth: 64, fontWeight: 600 }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.35rem', color: '#CBD5E1' }}>{val}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: 16 }}
        >
          <a
            href="https://shriprasad15.github.io/Dude-Coders-Ideathon/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '14px 32px',
              background: 'var(--amber)',
              color: '#000',
              borderRadius: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: '1.3rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.06em',
              boxShadow: '0 0 24px rgba(245,158,11,0.35)',
            }}
          >
            ↗ Live Demo
          </a>
          <a
            href="https://github.com/shriprasad15/Dude-Coders-Ideathon/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '14px 32px',
              background: 'var(--bg-card)',
              color: '#CBD5E1',
              border: '1.5px solid var(--border)',
              borderRadius: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: '1.3rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.06em',
            }}
          >
            ↗ GitHub
          </a>
        </motion.div>

        {/* LinkedIn QRs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ marginTop: 8 }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 10 }}>
            CONNECT WITH US
          </div>
          <TeamQRs size={72} />
        </motion.div>
      </motion.div>

      {/* Right — video + comparison images */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <div className="card" style={{ padding: 0, overflow: 'hidden', borderColor: 'var(--amber-border)', boxShadow: '0 0 40px rgba(245,158,11,0.1)' }}>
          <video
            src={`${import.meta.env.BASE_URL}demo-video.mp4`}
            autoPlay muted loop playsInline
            style={{ width: '100%', display: 'block', maxHeight: 340, objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[
            { src: 'comparison/solar1.jpg',    label: 'True Positive',  color: 'var(--green)' },
            { src: 'comparison/solar833.jpg',  label: 'Difficult Case', color: 'var(--amber)' },
            { src: 'comparison/solar2545.jpg', label: 'Multi-panel',    color: 'var(--teal)' },
          ].map(img => (
            <div key={img.src} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: `1.5px solid ${img.color}44` }}>
              <img
                src={`${import.meta.env.BASE_URL}${img.src}`}
                alt={img.label}
                style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '5px 10px',
                background: 'rgba(0,0,0,0.75)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: img.color,
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
