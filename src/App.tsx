import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';

import StarField from './components/StarField';
import TitleSlide        from './components/slides2/TitleSlide';
import ProblemSlide      from './components/slides2/ProblemSlide';
import DemoSlide         from './components/slides2/DemoSlide';
import ArchitectureSlide from './components/slides2/ArchitectureSlide';
import ComparisonSlide   from './components/slides2/ComparisonSlide';
import FutureSlide       from './components/slides2/FutureSlide';

import './styles/heliograph.css';

const slides = [
  { component: TitleSlide,        label: 'Title' },
  { component: ProblemSlide,      label: 'Problem' },
  { component: DemoSlide,         label: 'Demo' },
  { component: ArchitectureSlide, label: 'Architecture' },
  { component: ComparisonSlide,   label: 'Comparison' },
  { component: FutureSlide,       label: 'Future Works' },
];

const EASE_OUT  = [0.16, 1, 0.3, 1] as const;
const EASE_IN   = [0.4, 0, 1, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '60%' : '-60%',
    opacity: 0,
    scale: 0.94,
    filter: 'blur(6px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.62, ease: EASE_OUT },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? '40%' : '-40%',
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
    transition: { duration: 0.32, ease: EASE_IN },
  }),
};

function App() {
  const [[current, direction], setSlide] = useState([0, 0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paginate = useCallback((newDir: number) => {
    setTransitioning(true);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => setTransitioning(false), 600);
    setSlide(([cur]) => {
      const next = cur + newDir;
      if (next < 0 || next >= slides.length) return [cur, newDir];
      return [next, newDir];
    });
  }, []);

  const goTo = useCallback((idx: number) => {
    setTransitioning(true);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => setTransitioning(false), 600);
    setSlide(([cur]) => [idx, idx > cur ? 1 : -1]);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); paginate(1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); paginate(-1); }
      else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFullscreen(); }
      else if (e.key === 'l' || e.key === 'L') { e.preventDefault(); setLightMode(m => !m); }
    };
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('fullscreenchange', onFsChange); };
  }, [paginate, toggleFullscreen]);

  // Preload assets
  useEffect(() => {
    const imgs = ['global-learning.png', 'India-AI-Impact-Summit-2026.png', 'iitm_logo.png',
      'comparison/solar1.jpg', 'comparison/solar2545.jpg', 'comparison/solar833.jpg'];
    imgs.forEach(src => { const i = new Image(); i.src = `${import.meta.env.BASE_URL}${src}`; });
  }, []);

  const CurrentSlide = slides[current].component;

  return (
    <div className={lightMode ? 'light-mode' : ''} style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', background: 'var(--bg-base)' }}>
      {!lightMode && <StarField transitioning={transitioning} />}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ position: 'absolute', inset: 0 }}
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {/* Slide counter top-left */}
      <div style={{
        position: 'fixed', top: 16, left: 20, zIndex: 1000,
        fontFamily: 'var(--font-mono)', fontSize: '0.88rem',
        color: 'var(--text-muted)', letterSpacing: '0.1em',
        userSelect: 'none',
      }}>
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        <span style={{ marginLeft: 10, color: 'var(--amber)', opacity: 0.8 }}>{slides[current].label}</span>
      </div>

      {/* Top-right controls */}
      <div style={{ position: 'fixed', top: 14, right: 16, zIndex: 1000, display: 'flex', gap: 8 }}>
        <motion.button
          onClick={() => setLightMode(m => !m)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: lightMode ? 'rgba(248,250,252,0.85)' : 'rgba(7,7,14,0.8)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '6px 14px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            letterSpacing: '0.08em',
            outline: 'none',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
        >
          {lightMode ? '◑ Dark (L)' : '◐ Light (L)'}
        </motion.button>
        <motion.button
          onClick={toggleFullscreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: lightMode ? 'rgba(248,250,252,0.85)' : 'rgba(7,7,14,0.8)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '6px 14px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            letterSpacing: '0.08em',
            outline: 'none',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
        >
          {isFullscreen ? '⛶ Exit (F)' : '⛶ Full (F)'}
        </motion.button>
      </div>

      {/* Navigation dots bottom-center */}
      <div style={{
        position: 'fixed', bottom: 22, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 5, alignItems: 'center',
        padding: '7px 12px',
        background: 'rgba(7,7,14,0.85)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        zIndex: 1000,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        {slides.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => goTo(i)}
            whileHover={{ scale: 1.4 }}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? 'var(--amber)' : 'var(--border-bright)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: i === current ? '0 0 8px var(--amber)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      {current > 0 && (
        <motion.button
          onClick={() => paginate(-1)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(7,7,14,0.8)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', width: 36, height: 36,
            borderRadius: '50%', cursor: 'pointer', zIndex: 1000,
            fontFamily: 'var(--font-mono)', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', outline: 'none',
          }}
        >
          ←
        </motion.button>
      )}
      {current < slides.length - 1 && (
        <motion.button
          onClick={() => paginate(1)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(7,7,14,0.8)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', width: 36, height: 36,
            borderRadius: '50%', cursor: 'pointer', zIndex: 1000,
            fontFamily: 'var(--font-mono)', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', outline: 'none',
          }}
        >
          →
        </motion.button>
      )}
    </div>
  );
}

export default App;
