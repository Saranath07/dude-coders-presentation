import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import TitleSlide from './components/slides/TitleSlide';
import ProblemSlide from './components/slides/ProblemSlide';
import TraditionalMethodSlide from './components/slides/TraditionalMethodSlide';
import MetricsSlide from './components/slides/MetricsSlide';
import DataEngineSlide from './components/slides/DataEngineSlide';
import YOLOv12Slide from './components/slides/YOLOv12Slide';
import InferenceCascadeSlide from './components/slides/InferenceCascadeSlide';
import ResultsSlide from './components/slides/ResultsSlide';
import BenchmarksSlide from './components/slides/BenchmarksSlide';
import ConclusionSlide from './components/slides/ConclusionSlide';
import RedirectSlide from './components/slides/RedirectSlide';
import './styles/glassmorphism.css';

const slides = [
  TitleSlide,
  ProblemSlide,
  TraditionalMethodSlide,
  MetricsSlide,
  DataEngineSlide,
  YOLOv12Slide,
  InferenceCascadeSlide,
  ResultsSlide,
  BenchmarksSlide,
  ConclusionSlide,
  RedirectSlide,
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

function App() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    const nextSlide = currentSlide + newDirection;
    if (nextSlide >= 0 && nextSlide < slides.length) {
      setSlide([nextSlide, newDirection]);
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    const direction = index > currentSlide ? 1 : -1;
    setSlide([index, direction]);
  };

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(console.error);
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(console.error);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        paginate(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        paginate(-1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [paginate, toggleFullscreen, isFullscreen]);

  const CurrentSlide = slides[currentSlide];

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Background glows */}
      <div className="bg-glow gold" />
      <div className="bg-glow blue" />

      {/* Slides */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {/* Fullscreen button */}
      <motion.button
        onClick={toggleFullscreen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '8px 12px',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.75rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s',
        }}
        whileHover={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff' }}
      >
        {isFullscreen ? '⛶ Exit (F)' : '⛶ Fullscreen (F)'}
      </motion.button>

      {/* Navigation dots */}
      <div className="nav-container">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
