import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Database, Sparkles, Layers, X, Check, ArrowRight, Plus } from 'lucide-react';

// Animated Icon that pulses
const PulsingIcon = ({ Icon, delay }: { Icon: React.ElementType; delay: number }) => (
    <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay, type: 'spring', stiffness: 200 }}
    >
        <motion.div
            animate={{ filter: ['drop-shadow(0 0 8px rgba(245, 158, 11, 0.3))', 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.6))', 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.3))'] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <Icon size={44} color="#f59e0b" />
        </motion.div>
    </motion.div>
);

// Hard Negative Mining Animation - Multiple non-panel images being added
const HardNegativeAnimation = () => {
    const [imageCount, setImageCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setImageCount(c => (c + 1) % 5), 600);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ marginTop: '12px' }}>
            <p style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '10px' }}>Adding more "No Panel" images:</p>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: i <= imageCount ? 1 : 0, opacity: i <= imageCount ? 1 : 0 }}
                        style={{
                            width: '45px', height: '35px',
                            background: 'linear-gradient(135deg, #3a5a40, #588157)',
                            borderRadius: '4px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            position: 'relative',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                        }}
                    >
                        <span style={{ fontSize: '6px', color: 'white' }}>Empty</span>
                        <motion.div
                            animate={{ scale: i <= imageCount ? 1 : 0 }}
                            style={{
                                position: 'absolute', top: '-4px', right: '-4px',
                                background: '#ef4444', borderRadius: '50%',
                                width: '12px', height: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            <X size={8} color="white" />
                        </motion.div>
                    </motion.div>
                ))}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    style={{
                        width: '30px', height: '30px',
                        background: 'rgba(34, 197, 94, 0.2)',
                        border: '1px dashed #22c55e',
                        borderRadius: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <Plus size={14} color="#22c55e" />
                </motion.div>
            </div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(imageCount + 1) * 20}%` }}
                style={{
                    height: '4px', background: '#22c55e', borderRadius: '2px',
                    marginTop: '10px', maxWidth: '100%',
                }}
            />
            <p style={{ fontSize: '0.65rem', color: '#22c55e', marginTop: '4px' }}>
                {imageCount + 1}/5 negatives added → Reduces false positives
            </p>
        </div>
    );
};

// SAM Integration Animation
const SAMAnimation = () => {
    const [active, setActive] = useState(false);
    useEffect(() => {
        const timer = setInterval(() => setActive(prev => !prev), 1200);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ marginTop: '12px' }}>
            <p style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '10px' }}>Boundary refinement:</p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '55px', height: '40px',
                        border: '2px dashed rgba(239, 68, 68, 0.5)',
                        borderRadius: '3px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative',
                    }}>
                        <div style={{ width: '28px', height: '18px', background: '#1e3a8a', borderRadius: '2px' }} />
                        <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', fontSize: '8px', color: '#ef4444' }}>
                            ±5px
                        </div>
                    </div>
                    <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)' }}>Manual</span>
                </div>

                <motion.div animate={{ x: active ? [0, 5, 0] : 0 }}>
                    <ArrowRight size={18} color="#f59e0b" />
                </motion.div>

                <div style={{ textAlign: 'center' }}>
                    <motion.div
                        animate={{ borderColor: active ? '#22c55e' : 'rgba(34, 197, 94, 0.3)', boxShadow: active ? '0 0 10px rgba(34, 197, 94, 0.3)' : 'none' }}
                        style={{
                            width: '55px', height: '40px', border: '2px solid', borderRadius: '2px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.3s',
                        }}
                    >
                        <div style={{ width: '28px', height: '18px', background: '#1e3a8a', borderRadius: '2px' }} />
                    </motion.div>
                    <span style={{ fontSize: '8px', color: '#22c55e' }}>SAM ✓</span>
                </div>
            </div>
        </div>
    );
};

// Mosaic Animation - 4 distinct images combining into grid
const MosaicAnimation = () => {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setStep(s => (s + 1) % 4), 500);
        return () => clearInterval(timer);
    }, []);

    const images = [
        { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', label: 'A' },
        { bg: 'linear-gradient(135deg, #22c55e, #16a34a)', label: 'B' },
        { bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', label: 'C' },
        { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', label: 'D' },
    ];

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* 4 separate images */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 18px)', gap: '4px' }}>
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: step >= 1 ? 1 : 0.3, scale: step >= 1 ? 1 : 0.8 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                            width: '18px', height: '14px', background: img.bg, borderRadius: '2px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '8px', color: 'white', fontWeight: 700,
                        }}
                    >
                        {img.label}
                    </motion.div>
                ))}
            </div>

            <motion.div animate={{ scale: step >= 2 ? 1.2 : 1 }}>→</motion.div>

            {/* Combined mosaic */}
            <motion.div
                animate={{ scale: step >= 2 ? 1 : 0.8, opacity: step >= 2 ? 1 : 0.5 }}
                style={{
                    display: 'grid', gridTemplateColumns: 'repeat(2, 18px)', gap: step >= 3 ? '0px' : '2px',
                    border: step >= 3 ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px', overflow: 'hidden', transition: 'all 0.3s',
                }}
            >
                {images.map((img, i) => (
                    <div key={i} style={{ width: '18px', height: '14px', background: img.bg }} />
                ))}
            </motion.div>
        </div>
    );
};

// Mixup Animation - two images alpha blending with slider
const MixupAnimation = () => {
    const [alpha, setAlpha] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setAlpha(a => (a + 0.1) % 1.1), 200);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Image A */}
            <div style={{
                width: '28px', height: '20px', background: '#3b82f6', borderRadius: '3px',
                opacity: 1 - alpha, transition: 'opacity 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '8px', color: 'white', fontWeight: 700,
            }}>A</div>

            {/* Blend indicator */}
            <div style={{ fontSize: '10px', color: '#f59e0b' }}>+</div>

            {/* Image B */}
            <div style={{
                width: '28px', height: '20px', background: '#8b5cf6', borderRadius: '3px',
                opacity: alpha, transition: 'opacity 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '8px', color: 'white', fontWeight: 700,
            }}>B</div>

            {/* Result */}
            <div style={{ fontSize: '10px' }}>=</div>
            <div style={{
                width: '28px', height: '20px', borderRadius: '3px',
                background: `linear-gradient(90deg, rgba(59, 130, 246, ${1 - alpha}) 0%, rgba(139, 92, 246, ${alpha}) 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '7px', color: 'white',
            }}>{Math.round(alpha * 100)}%</div>
        </div>
    );
};

// HSV Animation - hue wheel rotating
const HSVAnimation = () => {
    const [hue, setHue] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setHue(h => (h + 20) % 360), 100);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Color wheel indicator */}
            <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: `conic-gradient(from ${hue}deg, red, yellow, lime, aqua, blue, magenta, red)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <div style={{ width: '12px', height: '12px', background: '#0a0a0a', borderRadius: '50%' }} />
            </div>

            {/* Sample image changing color */}
            <div style={{
                width: '40px', height: '28px', borderRadius: '3px',
                background: `hsl(${hue}, 70%, 50%)`,
                transition: 'background 0.1s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '8px', color: 'white',
            }}>
                H:{Math.round(hue)}°
            </div>
        </div>
    );
};

// Rotate Animation
const RotateAnimation = () => {
    const [angle, setAngle] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setAngle(a => (a + 30) % 360), 400);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <motion.div
                animate={{ rotate: angle }}
                style={{
                    width: '32px', height: '22px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '3px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
            >
                <div style={{ width: '8px', height: '5px', background: '#1e3a8a', borderRadius: '1px' }} />
            </motion.div>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>{angle}°</span>
        </div>
    );
};

// Augmentation card
const AugCard = ({ name, children, delay }: { name: string; children: React.ReactNode; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        style={{
            display: 'flex', flexDirection: 'column', gap: '8px',
            padding: '10px 12px',
            background: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '8px',
        }}
    >
        <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 600 }}>{name}</span>
        {children}
    </motion.div>
);

const DataEngineSlide = () => {
    return (
        <div className="slide-container">
            <div className="slide-content">
                <motion.h2 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    The Data Engine: Foundation of Superiority
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '1.5rem' }}>
                    {/* Hard Negative Mining */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="glass-card"
                        style={{ padding: '20px' }}
                    >
                        <PulsingIcon Icon={Database} delay={0.4} />
                        <h3 style={{ marginTop: '10px', marginBottom: '4px' }}>Hard Negative Mining</h3>
                        <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>More non-panel images = Fewer false positives</p>
                        <HardNegativeAnimation />
                    </motion.div>

                    {/* SAM Integration */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        className="glass-card"
                        style={{ padding: '20px' }}
                    >
                        <PulsingIcon Icon={Sparkles} delay={0.55} />
                        <h3 style={{ marginTop: '10px', marginBottom: '4px' }}>SAM Integration</h3>
                        <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Precise boundary annotation</p>
                        <SAMAnimation />
                    </motion.div>

                    {/* Augmentation Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="glass-card"
                        style={{ padding: '20px' }}
                    >
                        <PulsingIcon Icon={Layers} delay={0.7} />
                        <h3 style={{ marginTop: '10px', marginBottom: '4px' }}>Augmentation Stack</h3>
                        <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '10px' }}>Data variety for robustness</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <AugCard name="Mosaic" delay={0.8}><MosaicAnimation /></AugCard>
                            <AugCard name="Mixup" delay={0.9}><MixupAnimation /></AugCard>
                            <AugCard name="HSV Jitter" delay={1.0}><HSVAnimation /></AugCard>
                            <AugCard name="Rotate" delay={1.1}><RotateAnimation /></AugCard>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DataEngineSlide;
