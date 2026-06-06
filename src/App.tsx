import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

import TitleSlide      from './components/slides2/TitleSlide';
import SolarBoomSlide  from './components/slides2/SolarBoomSlide';
import HiddenCrisisSlide from './components/slides2/HiddenCrisisSlide';
import SolutionSlide   from './components/slides2/SolutionSlide';
import YOLOSlide       from './components/slides2/YOLOSlide';
import DataEngineSlide from './components/slides2/DataEngineSlide';
import CascadeSlide    from './components/slides2/CascadeSlide';
import OutputSlide     from './components/slides2/OutputSlide';
import PerformanceSlide from './components/slides2/PerformanceSlide';
import EconomicsSlide  from './components/slides2/EconomicsSlide';
import FutureSlide     from './components/slides2/FutureSlide';
import MultiModalSlide from './components/slides2/MultiModalSlide';
import RoadmapSlide    from './components/slides2/RoadmapSlide';
import DemoSlide       from './components/slides2/DemoSlide';
import ConclusionSlide from './components/slides2/ConclusionSlide';

import './styles/heliograph.css';

const slides = [
  { component: TitleSlide,       label: 'Title' },
  { component: SolarBoomSlide,   label: 'Solar Boom' },
  { component: HiddenCrisisSlide,label: 'Hidden Crisis' },
  { component: SolutionSlide,    label: 'Solution' },
  { component: YOLOSlide,        label: 'YOLOv12' },
  { component: DataEngineSlide,  label: 'Data Engine' },
  { component: CascadeSlide,     label: 'Cascade' },
  { component: OutputSlide,      label: 'Output' },
  { component: PerformanceSlide, label: 'Performance' },
  { component: EconomicsSlide,   label: 'Economics' },
  { component: FutureSlide,      label: 'Future' },
  { component: MultiModalSlide,  label: 'Multi-Modal' },
  { component: RoadmapSlide,     label: 'Roadmap' },
  { component: DemoSlide,        label: 'Demo' },
  { component: ConclusionSlide,  label: 'Conclusion' },
];

const EASE_OUT  = [0.16, 1, 0.3, 1] as const;
const EASE_IN   = [0.4, 0, 1, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: { duration: 0.4, ease: EASE_IN },
  }),
};

function App() {
  const [[current, direction], setSlide] = useState([0, 0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const paginate = useCallback((newDir: number) => {
    setSlide(([cur]) => {
      const next = cur + newDir;
      if (next < 0 || next >= slides.length) return [cur, newDir];
      return [next, newDir];
    });
  }, []);

  const goTo = useCallback((idx: number) => {
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
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', background: 'var(--bg-base)' }}>
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
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        color: 'var(--text-muted)', letterSpacing: '0.1em',
        userSelect: 'none',
      }}>
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        <span style={{ marginLeft: 10, color: 'var(--amber)', opacity: 0.7 }}>{slides[current].label}</span>
      </div>

      {/* Fullscreen button top-right */}
      <motion.button
        onClick={toggleFullscreen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'fixed', top: 14, right: 16, zIndex: 1000,
          background: 'rgba(7,7,14,0.8)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '6px 14px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          letterSpacing: '0.08em',
          outline: 'none',
        }}
      >
        {isFullscreen ? '⛶ Exit (F)' : '⛶ Fullscreen (F)'}
      </motion.button>

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
