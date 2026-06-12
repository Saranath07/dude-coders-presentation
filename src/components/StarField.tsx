import { useEffect, useRef } from 'react';

interface Props {
  transitioning: boolean;
}

const StarField = ({ transitioning }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const transitioningRef = useRef(false);

  useEffect(() => {
    transitioningRef.current = transitioning;
  }, [transitioning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate stars once
    const NUM_STARS = 320;
    type Star = {
      x: number; y: number;
      r: number;
      baseAlpha: number;
      alpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      color: string;
    };

    const COLORS = [
      '#FFFFFF', '#FFFFFF', '#FFFFFF',
      '#FDE68A', '#FCD34D',  // amber-warm stars
      '#BAE6FD', '#E0F2FE',  // cool blue-white
      '#D9F99D',             // rare green-white
    ];

    const stars: Star[] = Array.from({ length: NUM_STARS }, () => {
      const r = Math.random();
      // radius distribution: mostly tiny, a few larger
      const radius = r < 0.7 ? 0.4 + Math.random() * 0.7
                   : r < 0.92 ? 1.0 + Math.random() * 0.8
                   : 1.8 + Math.random() * 1.2;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: radius,
        baseAlpha: 0.12 + Math.random() * 0.28,
        alpha: 0,
        twinkleSpeed: 0.008 + Math.random() * 0.022,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });

    // A handful of "bright hero" stars
    const HERO_STARS = 18;
    const heroStars: Star[] = Array.from({ length: HERO_STARS }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 2.2 + Math.random() * 1.4,
      baseAlpha: 0.35 + Math.random() * 0.25,
      alpha: 0,
      twinkleSpeed: 0.005 + Math.random() * 0.012,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let t = 0;
    let flashIntensity = 0; // 0–1 extra brightness during transition
    let raf: number;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Smooth ramp up fast, decay slowly — feels organic not snappy
      if (transitioningRef.current) {
        flashIntensity = Math.min(1, flashIntensity + 0.04);
      } else {
        flashIntensity = Math.max(0, flashIntensity - 0.008);
      }

      const allStars = [...stars, ...heroStars];

      allStars.forEach(star => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        // Base visibility is low; flash multiplier lifts it during transition
        const baseVisible = star.baseAlpha * (0.22 + 0.45 * twinkle);
        const flashBoost = flashIntensity * star.baseAlpha * 1.6 * twinkle;
        star.alpha = Math.min(1, baseVisible + flashBoost);

        if (star.alpha < 0.01) return;

        // Draw glow for larger stars
        if (star.r > 1.2) {
          const glowSize = star.r * (3 + 2 * twinkle);
          const grd = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowSize);
          grd.addColorStop(0, star.color + Math.floor(star.alpha * 80).toString(16).padStart(2, '0'));
          grd.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.color + Math.floor(star.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Cross-spike for hero stars during flash
        if (star.r > 2 && flashIntensity > 0.1) {
          const spikeLen = star.r * (4 + flashIntensity * 8);
          const spikeAlpha = star.alpha * flashIntensity * 0.5;
          ctx.strokeStyle = star.color + Math.floor(spikeAlpha * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(star.x - spikeLen, star.y);
          ctx.lineTo(star.x + spikeLen, star.y);
          ctx.moveTo(star.x, star.y - spikeLen * 0.7);
          ctx.lineTo(star.x, star.y + spikeLen * 0.7);
          ctx.stroke();
        }
      });

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        filter: 'blur(0.6px)',
      }}
    />
  );
};

export default StarField;
