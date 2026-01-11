import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import TitleSlide from './components/slides/TitleSlide';
import ProblemSlide from './components/slides/ProblemSlide';
import TraditionalMethodSlide from './components/slides/TraditionalMethodSlide';
import MetricsSlide from './components/slides/MetricsSlide';
import DataEngineSlide from './components/slides/DataEngineSlide';
import YOLOv12Slide from './components/slides/YOLOv12Slide';
import InferenceCascadeSlide from './components/slides/InferenceCascadeSlide';
import TechSpecsSlide from './components/slides/TechSpecsSlide';
import ResultsSlide from './components/slides/ResultsSlide';
import BenchmarksSlide from './components/slides/BenchmarksSlide';
import ConclusionSlide from './components/slides/ConclusionSlide';
import RedirectSlide from './components/slides/RedirectSlide';
import ThemeToggle from './components/ThemeToggle';
import './styles/glassmorphism.css';

const slides = [
  TitleSlide,
  ProblemSlide,
  TraditionalMethodSlide,
  MetricsSlide,
  DataEngineSlide,
  YOLOv12Slide,
  InferenceCascadeSlide,
  TechSpecsSlide,
  ResultsSlide,
  BenchmarksSlide,
  RedirectSlide,
  ConclusionSlide,
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
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

function App() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Preload Images
  useEffect(() => {
    const imagesToPreload = [
      'global-learning.png',
      'India-AI-Impact-Summit-2026.png',
      'iitm_logo.png',
      'comparison/model1-1.png',
      'comparison/model1-833.png',
      'comparison/model2-1.png',
      'comparison/model2-833.png',
      'comparison/model3-1.png',
      'comparison/model3-833.png',
      'comparison/solar1.jpg',
      'comparison/solar2545.jpg',
      'comparison/solar833.jpg'
    ];

    imagesToPreload.forEach(image => {
      const img = new Image();
      img.src = `${import.meta.env.BASE_URL}${image}`;
    });

    // Preload Video
    const videoUrl = `${import.meta.env.BASE_URL}demo-video.mp4`;
    fetch(videoUrl).then(response => {
      if (!response.ok) console.warn('Failed to preload video');
    }).catch(err => console.error('Video preload error:', err));
  }, []);

  const paginate = useCallback((newDirection: number) => {
    const nextSlide = currentSlide + newDirection;
    if (nextSlide >= 0 && nextSlide < slides.length) {
      setSlide([nextSlide, newDirection]);
    }
  }, [currentSlide]);

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

      {/* Theme Toggle */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

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
          background: 'var(--glass-bg)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '8px 16px',
          color: 'var(--text-secondary)',
          fontSize: '0.75rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        whileHover={{ background: 'var(--border-accent)', color: 'var(--text-primary)' }}
      >
        {isFullscreen ? '⛶ Exit (F)' : '⛶ Fullscreen (F)'}
      </motion.button>

      {/* Dynamic Progress Bar at bottom */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        padding: '8px 14px',
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '20px',
        zIndex: 1000,
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        {slides.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setSlide([i, i > currentSlide ? 1 : -1])}
            whileHover={{ scale: 1.2 }}
            style={{
              width: i === currentSlide ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === currentSlide ? 'var(--accent-green)' : 'var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
            }}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
