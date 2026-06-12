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
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.025);

      // Orbit ring 1
      ctx.beginPath();
      ctx.ellipse(cx, cy, 200, 70, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245,158,11,${0.14 + pulse * 0.06})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Orbit ring 2
      ctx.beginPath();
      ctx.ellipse(cx, cy, 300, 105, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(20,184,166,${0.09 + pulse * 0.04})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Orbit ring 3
      ctx.beginPath();
      ctx.ellipse(cx, cy, 410, 145, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245,158,11,${0.05 + pulse * 0.02})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Trailing tail for ring 1 satellite
      const a1 = t * 0.013;
      for (let i = 0; i < 10; i++) {
        const ta = a1 - i * 0.04;
        const tx = cx + Math.cos(ta) * 200;
        const ty = cy + Math.sin(ta) * 70;
        ctx.beginPath();
        ctx.arc(tx, ty, 3.5 - i * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,158,11,${(0.8 - i * 0.07)})`;
        ctx.fill();
      }
      // Dot on ring 1
      const dx1 = cx + Math.cos(a1) * 200;
      const dy1 = cy + Math.sin(a1) * 70;
      ctx.beginPath();
      ctx.arc(dx1, dy1, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FCD34D';
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Trailing tail for ring 2 satellite
      const a2 = -t * 0.008 + 1.2;
      for (let i = 0; i < 8; i++) {
        const ta = a2 + i * 0.04;
        const tx = cx + Math.cos(ta) * 300;
        const ty = cy + Math.sin(ta) * 105;
        ctx.beginPath();
        ctx.arc(tx, ty, 3 - i * 0.27, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20,184,166,${0.7 - i * 0.08})`;
        ctx.fill();
      }
      // Dot on ring 2
      const dx2 = cx + Math.cos(a2) * 300;
      const dy2 = cy + Math.sin(a2) * 105;
      ctx.beginPath();
      ctx.arc(dx2, dy2, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#2DD4BF';
      ctx.shadowColor = '#14B8A6';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Dot on ring 3
      const a3 = t * 0.006 + 2.4;
      const dx3 = cx + Math.cos(a3) * 410;
      const dy3 = cy + Math.sin(a3) * 145;
      ctx.beginPath();
      ctx.arc(dx3, dy3, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,158,11,${0.5 + pulse * 0.3})`;
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Center sun outer glow (breathing)
      const outerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80 + pulse * 16);
      outerGrad.addColorStop(0, `rgba(245,158,11,${0.20 + pulse * 0.08})`);
      outerGrad.addColorStop(0.5, `rgba(245,158,11,${0.08 + pulse * 0.04})`);
      outerGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 80 + pulse * 16, 0, Math.PI * 2);
      ctx.fillStyle = outerGrad;
      ctx.fill();

      // Center sun
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 36 + pulse * 6);
      grad.addColorStop(0, '#FDE68A');
      grad.addColorStop(0.4, '#F59E0B');
      grad.addColorStop(0.8, 'rgba(245,158,11,0.4)');
      grad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 36 + pulse * 6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 40 + pulse * 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Sunray spokes
      const numRays = 8;
      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2 + t * 0.006;
        const r0 = 20, r1 = 55 + pulse * 12;
        ctx.beginPath();
        ctx.moveTo(cx + r0 * Math.cos(angle), cy + r0 * Math.sin(angle));
        ctx.lineTo(cx + r1 * Math.cos(angle), cy + r1 * Math.sin(angle));
        ctx.strokeStyle = `rgba(245,158,11,${0.12 + 0.07 * Math.sin(t * 0.05 + i)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={320}
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.92 }}
    />
  );
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 32, scale: 0.97, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE_OUT } },
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
        <span className="label-mono" style={{ fontSize: '1.0rem', color: 'var(--teal)' }}>
          EcoInnovators Ideathon 2026 · AI For A Better Earth
        </span>
      </motion.div>

      {/* Main title */}
      <motion.h1
        variants={item}
        className="h-display"
        style={{
          fontSize: 'clamp(5rem, 9vw, 10rem)',
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
          fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
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
            style={{ fontSize: '1.0rem' }}
          >
            {name}
          </span>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <span className="label-mono" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          IIT Madras · India AI Impact Summit 2026
        </span>
      </motion.div>
    </motion.div>
  </div>
);

export default TitleSlide;
