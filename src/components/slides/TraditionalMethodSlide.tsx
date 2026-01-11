import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Simulated Hough Transform Animation
const HoughTransformDemo = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev < 4 ? prev + 1 : prev));
        }, 800);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ position: 'relative', width: '450px', height: '300px', margin: '0 auto' }}>
            {/* Background "satellite image" */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Simulated roof */}
                <div
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '20%',
                        width: '60%',
                        height: '40%',
                        background: '#8d6e63',
                        transform: 'perspective(100px) rotateX(5deg)',
                    }}
                />

                {/* Solar panel (actual) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: step >= 1 ? 1 : 0 }}
                    style={{
                        position: 'absolute',
                        top: '35%',
                        left: '25%',
                        width: '20%',
                        height: '25%',
                        background: 'var(--solar-panel-blue)',
                        border: step >= 2 ? '2px solid var(--accent-green)' : 'none',
                    }}
                />

                {/* Pool (false positive) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: step >= 1 ? 1 : 0 }}
                    style={{
                        position: 'absolute',
                        top: '60%',
                        left: '55%',
                        width: '25%',
                        height: '20%',
                        background: 'var(--pool-blue)',
                        borderRadius: '4px',
                        border: step >= 2 ? '2px solid var(--accent-red)' : 'none',
                    }}
                />

                {/* Hough lines appearing */}
                {step >= 1 && (
                    <>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: 'absolute',
                                top: '35%',
                                left: '25%',
                                width: '20%',
                                height: '2px',
                                background: 'var(--accent-amber)',
                                transformOrigin: 'left',
                            }}
                        />
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            style={{
                                position: 'absolute',
                                top: '35%',
                                left: '25%',
                                width: '2px',
                                height: '25%',
                                background: '#FFB703',
                                transformOrigin: 'top',
                            }}
                        />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            style={{
                                position: 'absolute',
                                top: '60%',
                                left: '55%',
                                width: '25%',
                                height: '2px',
                                background: 'var(--accent-red)',
                                transformOrigin: 'left',
                            }}
                        />
                    </>
                )}

                {/* Labels */}
                {step >= 3 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                position: 'absolute',
                                top: '25%',
                                left: '22%',
                                background: 'var(--accent-green)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '14px',
                            }}
                        >
                            Panel ✓
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                position: 'absolute',
                                top: '52%',
                                left: '58%',
                                background: 'var(--accent-red)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '14px',
                            }}
                        >
                            Pool ✗
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
};

const TraditionalMethodSlide = () => {
    return (
        <div className="slide-container">
            <div className="slide-content">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    The Failed Approach: Traditional Image Processing
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginTop: '2rem' }}>
                    {/* Left: Explanation */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="glass-card-static callout" style={{ marginBottom: '1.8rem' }}>
                            <h2 style={{ marginBottom: '12px' }}>The Hypothesis</h2>
                            <p style={{ fontStyle: 'italic', fontSize: '1.5em', lineHeight: '1.6' }}>
                                "Panels are blue rectangles with distinct edges—let's use{' '}
                                <strong style={{ color: 'var(--accent-green)' }}>Hough Transform</strong> +{' '}
                                <strong style={{ color: 'var(--accent-green)' }}>Color Thresholding</strong>!"
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <h2 style={{ marginBottom: '26px', color: 'var(--accent-amber)', fontSize: '2rem' }}>Why It Failed</h2>
                            <ul className="feature-list">
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                    style={{ marginBottom: '24px' }}
                                >
                                    <span style={{ fontSize: '1.5rem', lineHeight: '1.4' }}><strong style={{ color: 'var(--accent-red)', fontSize: '1.6rem' }}>False Positives:</strong> Swimming pools, tarps, skylights</span>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                    style={{ marginBottom: '24px' }}
                                >
                                    <span style={{ fontSize: '1.5rem', lineHeight: '1.4' }}><strong style={{ color: '#f44336', fontSize: '1.6rem' }}>False Negatives:</strong> 70% of shadowed panels missed</span>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                    style={{ marginBottom: '24px' }}
                                >
                                    <span style={{ fontSize: '1.5rem', lineHeight: '1.4' }}><strong style={{ color: '#f44336', fontSize: '1.6rem' }}>Rigidity:</strong> Parameters couldn't adapt across cities</span>
                                </motion.li>
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* Right: Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="glass-card"
                        style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <h2 style={{ marginBottom: '64px', textAlign: 'center' }}>Edge Detection Demo</h2>
                        <HoughTransformDemo />
                        <p style={{ marginTop: '26px', fontSize: '1.5rem', opacity: 0.7, textAlign: 'center' }}>
                            Hough lines detect edges... but can't distinguish purpose
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TraditionalMethodSlide;
