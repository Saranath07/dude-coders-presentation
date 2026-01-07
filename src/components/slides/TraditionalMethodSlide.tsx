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
        <div style={{ position: 'relative', width: '300px', height: '200px', margin: '0 auto' }}>
            {/* Background "satellite image" */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #3a5a40 0%, #588157 50%, #a3b18a 100%)',
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
                        background: '#1a237e',
                        border: step >= 2 ? '2px solid #4CAF50' : 'none',
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
                        background: '#0288d1',
                        borderRadius: '4px',
                        border: step >= 2 ? '2px solid #f44336' : 'none',
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
                                background: '#FFB703',
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
                                background: '#f44336',
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
                                background: '#4CAF50',
                                color: 'white',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '10px',
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
                                background: '#f44336',
                                color: 'white',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '10px',
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
                        <div className="glass-card-static callout" style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ marginBottom: '12px' }}>The Hypothesis</h3>
                            <p style={{ fontStyle: 'italic' }}>
                                "Panels are blue rectangles with distinct edges—let's use{' '}
                                <strong style={{ color: 'var(--solar-gold)' }}>Hough Transform</strong> +{' '}
                                <strong style={{ color: 'var(--solar-gold)' }}>Color Thresholding</strong>!"
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <h3 style={{ marginBottom: '16px', color: 'var(--solar-orange)' }}>Why It Failed</h3>
                            <ul className="feature-list">
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <span><strong style={{ color: '#f44336' }}>False Positives:</strong> Swimming pools, tarps, skylights</span>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <span><strong style={{ color: '#f44336' }}>False Negatives:</strong> 70% of shadowed panels missed</span>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <span><strong style={{ color: '#f44336' }}>Rigidity:</strong> Parameters couldn't adapt across cities</span>
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
                        <h3 style={{ marginBottom: '24px', textAlign: 'center' }}>Edge Detection Demo</h3>
                        <HoughTransformDemo />
                        <p style={{ marginTop: '16px', fontSize: '0.9rem', opacity: 0.7, textAlign: 'center' }}>
                            Hough lines detect edges... but can't distinguish purpose
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TraditionalMethodSlide;
