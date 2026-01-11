import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Satellite/Resolution Animation - pixels becoming clearer
const ResolutionAnimation = () => {
    const [clear, setClear] = useState(false);
    useEffect(() => {
        const timer = setInterval(() => setClear(c => !c), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 10px)', gap: clear ? '1px' : '3px', transition: 'gap 0.5s' }}>
            {[...Array(16)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        opacity: clear ? 1 : 0.3 + Math.random() * 0.4,
                        background: clear ? '#22c55e' : `hsl(${120 + Math.random() * 60}, 50%, ${30 + Math.random() * 20}%)`,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '10px', height: '10px', borderRadius: '2px' }}
                />
            ))}
        </div>
    );
};

// Environment Animation - shadows moving, lighting changing
const EnvironmentAnimation = () => {
    const [phase, setPhase] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setPhase(p => (p + 1) % 4), 600);
        return () => clearInterval(timer);
    }, []);

    const shadowPositions = [
        { x: 0, y: 0 }, { x: 5, y: 5 }, { x: 10, y: 10 }, { x: 5, y: 5 }
    ];

    return (
        <div style={{ position: 'relative', width: '50px', height: '40px' }}>
            {/* Roof */}
            <div style={{
                width: '40px', height: '25px',
                background: `hsl(${20 + phase * 10}, 30%, ${40 + phase * 5}%)`,
                position: 'absolute', top: '5px', left: '5px',
                borderRadius: '3px', transition: 'background 0.3s',
            }} />
            {/* Shadow */}
            <motion.div
                animate={{ x: shadowPositions[phase].x, y: shadowPositions[phase].y }}
                style={{
                    width: '40px', height: '25px',
                    background: 'rgba(0,0,0,0.3)', position: 'absolute', top: '5px', left: '5px',
                    borderRadius: '3px', filter: 'blur(3px)',
                }}
            />
            {/* Sun indicator */}
            <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                    position: 'absolute', top: 0, right: 0,
                    width: '8px', height: '8px',
                    background: '#f59e0b', borderRadius: '50%',
                    boxShadow: '0 0 8px #f59e0b',
                }}
            />
        </div>
    );
};

// Scale Animation - zooming in on tiny object
const ScaleAnimation = () => {
    const [zoom, setZoom] = useState(1);
    useEffect(() => {
        const timer = setInterval(() => setZoom(z => z === 1 ? 2 : 1), 800);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ width: '50px', height: '40px', overflow: 'hidden', position: 'relative' }}>
            <motion.div
                animate={{ scale: zoom }}
                style={{
                    width: '100%', height: '100%',
                    background: 'linear-gradient(135deg, #3a5a40, #588157)',
                    borderRadius: '4px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transformOrigin: 'center',
                }}
            >
                {/* Tiny panel */}
                <motion.div
                    animate={{ scale: zoom === 2 ? 1.5 : 1 }}
                    style={{
                        width: '8px', height: '6px',
                        background: '#1e3a8a',
                        border: zoom === 2 ? '1px solid #f59e0b' : 'none',
                        transition: 'border 0.3s',
                    }}
                />
            </motion.div>
            {/* Magnifying glass */}
            {zoom === 2 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                        position: 'absolute', top: '-5px', right: '-5px',
                        width: '20px', height: '20px',
                        border: '2px solid #f59e0b',
                        borderRadius: '50%',
                        background: 'rgba(245, 158, 11, 0.1)',
                    }}
                />
            )}
        </div>
    );
};

const challenges = [
    {
        title: 'Low Resolution',
        desc: 'Satellite feeds vary in clarity and noise levels',
        Animation: ResolutionAnimation,
        color: '#f59e0b',
    },
    {
        title: 'Environment',
        desc: 'Shadows, diverse roof textures, and lighting variance',
        Animation: EnvironmentAnimation,
        color: '#22c55e',
    },
    {
        title: 'Scale',
        desc: 'Tiny panels on large, cluttered backgrounds',
        Animation: ScaleAnimation,
        color: '#06b6d4',
    },
];

const ProblemSlide = () => {
    return (
        <div className="slide-container">
            <div className="slide-content">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    The Challenge We Faced
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="callout glass-card-static"
                    style={{ marginBottom: '2.5rem', padding: '30px' }}
                >
                    <p style={{ fontSize: '1.8rem', lineHeight: 1.4 }}>
                        <strong style={{ color: '#f59e0b', fontSize: '2rem' }}>Mission:</strong>{' '}
                        Accurately detect solar panels in satellite imagery for automated residential and commercial energy audits.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '2.5rem' }}>
                    {challenges.map((challenge, index) => (
                        <motion.div
                            key={challenge.title}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                            className="glass-card"
                            style={{ padding: '40px 30px', textAlign: 'center' }}
                            whileHover={{ scale: 1.05, borderColor: challenge.color }}
                        >
                            {/* Animation */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1.5 }}
                                transition={{ delay: 0.6 + index * 0.15, type: 'spring' }}
                                style={{
                                    display: 'flex', justifyContent: 'center',
                                    marginBottom: '24px', height: '60px', alignItems: 'center'
                                }}
                            >
                                <challenge.Animation />
                            </motion.div>

                            <h3 style={{ marginBottom: '12px', color: challenge.color, fontSize: '2.5rem' }}>{challenge.title}</h3>
                            <p style={{ fontSize: '2rem', opacity: 0.8, lineHeight: 1.5 }}>{challenge.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProblemSlide;
