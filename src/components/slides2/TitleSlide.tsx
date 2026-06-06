import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const SunOrbit = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let t = 0;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;

      // Orbit ring 1
      ctx.beginPath();
      ctx.ellipse(cx, cy, 130, 46, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245,158,11,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Orbit ring 2
      ctx.beginPath();
      ctx.ellipse(cx, cy, 195, 68, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(20,184,166,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Orbit ring 3
      ctx.beginPath();
      ctx.ellipse(cx, cy, 270, 95, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245,158,11,0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Moving dot on ring 1 (solar panel satellite)
      const a1 = t * 0.012;
      const dx1 = cx + Math.cos(a1) * 130;
      const dy1 = cy + Math.sin(a1) * 46;
      ctx.beginPath();
      ctx.arc(dx1, dy1, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#F59E0B';
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Moving dot on ring 2
      const a2 = -t * 0.007 + 1.2;
      const dx2 = cx + Math.cos(a2) * 195;
      const dy2 = cy + Math.sin(a2) * 68;
      ctx.beginPath();
      ctx.arc(dx2, dy2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#14B8A6';
      ctx.shadowColor = '#14B8A6';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Moving dot on ring 3
      const a3 = t * 0.005 + 2.4;
      const dx3 = cx + Math.cos(a3) * 270;
      const dy3 = cy + Math.sin(a3) * 95;
      ctx.beginPath();
      ctx.arc(dx3, dy3, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245,158,11,0.6)';
      ctx.fill();

      // Center sun
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 44);
      grad.addColorStop(0, 'rgba(245,158,11,0.5)');
      grad.addColorStop(0.5, 'rgba(245,158,11,0.18)');
      grad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 44, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245,158,11,0.85)';
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={220}
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.9 }}
    />
  );
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const TitleSlide = () => (
  <div className="slide">
    <div className="glow-amber-center" />

    {/* Canvas orbit */}
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SunOrbit />
    </div>

    <motion.div
      className="slide-inner"
      style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Logos */}
      <motion.div variants={item} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 64, marginBottom: 56 }}>
        <img src={`${import.meta.env.BASE_URL}global-learning.png`} alt="Global Learning" style={{ height: 72, objectFit: 'contain', opacity: 0.85 }} />
        <img src={`${import.meta.env.BASE_URL}India-AI-Impact-Summit-2026.png`} alt="AI Impact Summit 2026" style={{ height: 96, objectFit: 'contain', opacity: 0.9 }} />
        <img src={`${import.meta.env.BASE_URL}iitm_logo.png`} alt="IITM Logo" style={{ height: 72, objectFit: 'contain', opacity: 0.85 }} />
      </motion.div>

      {/* Event label */}
      <motion.div variants={item} style={{ marginBottom: 20 }}>
        <span className="label-mono" style={{ fontSize: '0.7rem', color: 'var(--teal)' }}>
          EcoInnovators Ideathon 2026 · AI For A Better Earth
        </span>
      </motion.div>

      {/* Main title */}
      <motion.h1
        variants={item}
        className="h-display"
        style={{
          fontSize: 'clamp(3.5rem, 6.5vw, 6.5rem)',
          background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 45%, #fff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 12,
          lineHeight: 0.92,
        }}
      >
        SolarSight
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={item}
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
          color: 'var(--text-secondary)',
          marginBottom: 40,
          letterSpacing: '-0.01em',
        }}
      >
        AI-Powered Solar Intelligence for a Planet That Can't Afford to Guess
      </motion.p>

      {/* Team badge */}
      <motion.div variants={item} style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
        {['S Shriprasad', 'P Saranath', 'B Shruthi'].map(name => (
          <span
            key={name}
            className="badge badge-amber"
            style={{ fontSize: '0.72rem' }}
          >
            {name}
          </span>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <span className="label-mono" style={{ color: 'var(--text-muted)', fontSize: '0.62rem' }}>
          IIT Madras · India AI Impact Summit 2026
        </span>
      </motion.div>
    </motion.div>
  </div>
);

export default TitleSlide;
