import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Database, Sparkles, Layers, X, ArrowRight, Plus } from 'lucide-react';

// Animated Icon that pulses
const PulsingIcon = ({ Icon, delay }: { Icon: React.ElementType; delay: number }) => (
    <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay, type: 'spring', stiffness: 200 }}
    >
        <motion.div
            animate={{ filter: ['drop-shadow(0 0 10px var(--accent-amber))', 'drop-shadow(0 0 25px var(--accent-amber))', 'drop-shadow(0 0 10px var(--accent-amber))'] }}
            transition={{ duration: 4, repeat: Infinity }}
        >
            <Icon size={56} color="var(--accent-amber)" />
        </motion.div>
    </motion.div>
);

// Hard Negative Mining Animation - Multiple non-panel images being added
const HardNegativeAnimation = () => {
    const [imageCount, setImageCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setImageCount(c => (c + 1) % 5), 1200);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ marginTop: '16px' }}>
            <p style={{ fontSize: '1.4rem', opacity: 0.7, marginBottom: '12px', fontWeight: 500 }}>Adding more "No Panel" images:</p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: i <= imageCount ? 1 : 0, opacity: i <= imageCount ? 1 : 0 }}
                        style={{
                            width: '55px', height: '42px',
                            background: 'linear-gradient(135deg, #3a5a40, #588157)',
                            borderRadius: '6px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            position: 'relative',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                        }}
                    >
                        <span style={{ fontSize: '13px', color: 'white', fontWeight: 700 }}>Empty</span>
                        <motion.div
                            animate={{ scale: i <= imageCount ? 1 : 0 }}
                            style={{
                                position: 'absolute', top: '-5px', right: '-5px',
                                background: '#ef4444', borderRadius: '50%',
                                width: '16px', height: '16px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            <X size={10} color="white" />
                        </motion.div>
                    </motion.div>
                ))}
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    style={{
                        width: '36px', height: '36px',
                        background: 'rgba(34, 197, 94, 0.2)',
                        border: '2px dashed #22c55e',
                        borderRadius: '6px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <Plus size={18} color="#22c55e" />
                </motion.div>
            </div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(imageCount + 1) * 20}%` }}
                style={{
                    height: '6px', background: '#22c55e', borderRadius: '3px',
                    marginTop: '14px', maxWidth: '100%',
                }}
            />
            <p style={{ fontSize: '1rem', color: '#22c55e', marginTop: '6px', fontWeight: 600 }}>
                {imageCount + 1}/5 negatives added → Reduces false positives
            </p>
        </div>
    );
};

// SAM Integration Animation
const SAMAnimation = () => {
    const [active, setActive] = useState(false);
    useEffect(() => {
        const timer = setInterval(() => setActive(prev => !prev), 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ marginTop: '16px' }}>
            <p style={{ fontSize: '1.5rem', opacity: 0.7, marginBottom: '12px', fontWeight: 500 }}>Boundary refinement:</p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '100px', height: '120px',
                        border: '3px dashed rgba(239, 68, 68, 0.5)',
                        borderRadius: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative',
                    }}>
                        <div style={{ width: '50px', height: '50px', background: '#1e3a8a', borderRadius: '3px' }} />
                        <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '13px', color: '#ef4444', fontWeight: 'bold' }}>
                            ±5px
                        </div>
                    </div>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '6px', display: 'block' }}>Manual</span>
                </div>

                <motion.div animate={{ x: active ? [0, 8, 0] : 0 }}>
                    <ArrowRight size={24} color="var(--accent-amber)" />
                </motion.div>

                <div style={{ textAlign: 'center' }}>
                    <motion.div
                        animate={{ borderColor: active ? '#22c55e' : 'rgba(34, 197, 94, 0.3)', boxShadow: active ? '0 0 15px rgba(34, 197, 94, 0.4)' : 'none' }}
                        style={{
                            width: '100px', height: '120px', border: '3px solid', borderRadius: '4px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.3s',
                        }}
                    >
                        <div style={{ width: '50px', height: '50px', background: '#1e3a8a', borderRadius: '3px' }} />
                    </motion.div>
                    <span style={{ fontSize: '13px', color: '#22c55e', marginTop: '6px', display: 'block', fontWeight: 'bold' }}>SAM ✓</span>
                </div>
            </div>
        </div>
    );
};

// Mosaic Animation - 4 distinct images combining into grid
const MosaicAnimation = () => {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setStep(s => (s + 1) % 4), 1800);
        return () => clearInterval(timer);
    }, []);

    const images = [
        { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', label: 'A' },
        { bg: 'linear-gradient(135deg, #22c55e, #16a34a)', label: 'B' },
        { bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', label: 'C' },
        { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', label: 'D' },
    ];

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* 4 separate images */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 24px)', gap: '4px' }}>
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: step >= 1 ? 1 : 0.3, scale: step >= 1 ? 1 : 0.8 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                            width: '24px', height: '18px', background: img.bg, borderRadius: '3px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', color: 'white', fontWeight: 700,
                        }}
                    >
                        {img.label}
                    </motion.div>
                ))}
            </div>

            <motion.div animate={{ scale: step >= 2 ? 1.2 : 1 }} style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>→</motion.div>

            {/* Combined mosaic */}
            <motion.div
                animate={{ scale: step >= 2 ? 1 : 0.8, opacity: step >= 2 ? 1 : 0.5 }}
                style={{
                    display: 'grid', gridTemplateColumns: 'repeat(2, 24px)', gap: step >= 3 ? '0px' : '2px',
                    border: step >= 3 ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px', overflow: 'hidden', transition: 'all 0.3s',
                }}
            >
                {images.map((img, i) => (
                    <div key={i} style={{ width: '24px', height: '18px', background: img.bg }} />
                ))}
            </motion.div>
        </div>
    );
};

// Mixup Animation - two images alpha blending with slider
const MixupAnimation = () => {
    const [alpha, setAlpha] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setAlpha(a => (a + 0.1) % 1.1), 350);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Image A */}
            <div style={{
                width: '36px', height: '26px', background: '#3b82f6', borderRadius: '4px',
                opacity: 1 - alpha, transition: 'opacity 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', color: 'white', fontWeight: 700,
            }}>A</div>

            {/* Blend indicator */}
            <div style={{ fontSize: '14px', color: 'var(--accent-amber)' }}>+</div>

            {/* Image B */}
            <div style={{
                width: '36px', height: '26px', background: '#8b5cf6', borderRadius: '4px',
                opacity: alpha, transition: 'opacity 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', color: 'white', fontWeight: 700,
            }}>B</div>

            {/* Result */}
            <div style={{ fontSize: '14px' }}>=</div>
            <div style={{
                width: '36px', height: '26px', borderRadius: '4px',
                background: `linear-gradient(90deg, rgba(59, 130, 246, ${1 - alpha}) 0%, rgba(139, 92, 246, ${alpha}) 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', color: 'white', fontWeight: 600,
            }}>{Math.round(alpha * 100)}%</div>
        </div>
    );
};

// HSV Animation - hue wheel rotating
const HSVAnimation = () => {
    const [hue, setHue] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setHue(h => (h + 10) % 360), 100);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Color wheel indicator */}
            <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: `conic-gradient(from ${hue}deg, red, yellow, lime, aqua, blue, magenta, red)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            }}>
                <div style={{ width: '16px', height: '16px', background: '#0a0a0a', borderRadius: '50%' }} />
            </div>

            {/* Sample image changing color */}
            <div style={{
                width: '50px', height: '36px', borderRadius: '4px',
                background: `hsl(${hue}, 70%, 50%)`,
                transition: 'background 0.1s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', color: 'white', fontWeight: 600,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
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
        const timer = setInterval(() => setAngle(a => (a + 30) % 360), 800);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.div
                animate={{ rotate: angle }}
                style={{
                    width: '42px', height: '28px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '4px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                }}
            >
                <div style={{ width: '10px', height: '6px', background: '#1e3a8a', borderRadius: '1px' }} />
            </motion.div>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{angle}°</span>
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
            display: 'flex', flexDirection: 'column', gap: '12px',
            padding: '14px 16px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            height: '100%', justifyContent: 'center'
        }}
    >
        <span style={{ fontSize: '1rem', color: 'var(--light-blue)', fontWeight: 700 }}>{name}</span>
        {children}
    </motion.div>
);

const DataEngineSlide = () => {
    return (
        <div className="slide-container">
            <div className="slide-content">
                <motion.h2 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                    style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                    The Data Engine: Foundation of Superiority
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '1.5rem', height: '65vh' }}>
                    {/* Hard Negative Mining */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="glass-card"
                        style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}
                    >
                        <PulsingIcon Icon={Database} delay={0.4} />
                        <h3 style={{ marginTop: '16px', marginBottom: '8px', fontSize: '1.6rem' }}>Hard Negative Mining</h3>
                        <p style={{ fontSize: '1.7rem', opacity: 0.8, lineHeight: 1.5 }}>More non-panel images = Fewer false positives</p>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <HardNegativeAnimation />
                        </div>
                    </motion.div>

                    {/* SAM Integration */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        className="glass-card"
                        style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}
                    >
                        <PulsingIcon Icon={Sparkles} delay={0.55} />
                        <h3 style={{ marginTop: '16px', marginBottom: '8px', fontSize: '1.6rem' }}>SAM Integration</h3>
                        <p style={{ fontSize: '1.7rem', opacity: 0.8, lineHeight: 1.5 }}>Precise boundary annotation with AI assistance</p>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <SAMAnimation />
                        </div>
                    </motion.div>

                    {/* Augmentation Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="glass-card"
                        style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}
                    >
                        <PulsingIcon Icon={Layers} delay={0.7} />
                        <h3 style={{ marginTop: '16px', marginBottom: '8px', fontSize: '1.6rem' }}>Augmentation Stack</h3>
                        <p style={{ fontSize: '1.7rem', opacity: 0.8, marginBottom: '20px', lineHeight: 1.5 }}>Data variety for robustness</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', flex: 1 }}>
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
