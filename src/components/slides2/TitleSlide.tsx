import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

const TitleSlide = () => (
  <div className="slide">
    <div className="glow-amber-center" />
    <div className="slide-inner" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

      {/* Logos */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 80, marginBottom: 28 }}
      >
        <img src={`${import.meta.env.BASE_URL}global-learning.png`} alt="Global Learning" style={{ height: 84, objectFit: 'contain' }} />
        <img src={`${import.meta.env.BASE_URL}India-AI-Impact-Summit-2026.png`} alt="AI Impact Summit 2026" style={{ height: 110, objectFit: 'contain' }} />
        <img src={`${import.meta.env.BASE_URL}iitm_logo.png`} alt="IITM Logo" style={{ height: 84, objectFit: 'contain' }} />
      </motion.div>

      {/* Animated Sun */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ marginBottom: 18 }}
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          <Sun size={72} color="var(--amber)" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.6))' }} />
        </motion.div>
      </motion.div>

      {/* Event label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ marginBottom: 16 }}
      >
        <div className="label-mono" style={{ fontSize: '1.0rem', marginBottom: 5 }}>AI For A Better Earth</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1.4rem, 2.0vw, 1.9rem)',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          lineHeight: 1.1,
        }}>
          EcoInnovators Ideathon 2026
        </div>
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 4.6vw, 4.8rem)',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          marginBottom: 12,
        }}
      >
        Advanced Solar Panel<br />
        <span style={{ color: 'var(--amber)' }}>Detection System</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
          color: 'var(--teal-bright)',
          marginBottom: 28,
          lineHeight: 1.4,
        }}
      >
        A Multi-Stage Deep Learning Approach
      </motion.p>

      {/* Team card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}
        style={{
          padding: '14px 48px',
          background: 'var(--amber-dim)',
          border: '1.5px solid var(--amber-border)',
          borderRadius: 16,
          marginBottom: 16,
          boxShadow: '0 0 32px rgba(245,158,11,0.1)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--amber-bright)', letterSpacing: '0.08em' }}>
          Team Dude Coders
        </div>
      </motion.div>

      {/* Team members */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{ display: 'flex', gap: 48, justifyContent: 'center', color: '#94A3B8', fontSize: '1.2rem', fontWeight: 500 }}
      >
        {['S Shriprasad', 'P Saranath', 'B Shruthi'].map(name => (
          <span key={name} style={{ fontFamily: 'var(--font-body)' }}>{name}</span>
        ))}
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            background: 'var(--amber)',
            borderRadius: '50%',
            boxShadow: '0 0 12px var(--amber)',
            left: `${12 + i * 14}%`,
            bottom: '15%',
          }}
          animate={{ y: [-20, -70, -20], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
    </div>
  </div>
);

export default TitleSlide;
