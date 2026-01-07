import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, Crop, Droplets, Search, Target, Shield } from 'lucide-react';

const stages = [
    { num: 1, name: 'Standard Inference', desc: 'Full image, high confidence', icon: Search, color: '#4CAF50' },
    { num: 2, name: 'Saturation Boost', desc: '+50% saturation enhancement', icon: Droplets, color: '#2196F3' },
    { num: 3, name: 'Cropping', desc: '1200 sqft buffer crop', icon: Crop, color: '#9C27B0' },
    { num: 4, name: 'Saturated Crop', desc: 'Combined approach', icon: Zap, color: '#FF9800' },
    { num: 5, name: 'Expanded Buffer', desc: '2400 sqft search radius', icon: Target, color: '#E91E63' },
    { num: 6, name: 'Rescue Mode', desc: 'Off-center detection', icon: Shield, color: '#00BCD4' },
];

// Simulated image transformation
const ImageTransform = ({ activeStage }: { activeStage: number }) => {
    const saturation = activeStage >= 2 ? 1.5 : 1;
    const scale = activeStage >= 3 ? 1.3 : 1;
    const showBox = activeStage >= 5;

    return (
        <div
            style={{
                width: '200px',
                height: '150px',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(135deg, #3a5a40 0%, #588157 50%, #a3b18a 100%)',
                filter: `saturate(${saturation})`,
                transform: `scale(${scale})`,
                transition: 'all 0.5s ease',
                transformOrigin: 'center',
            }}
        >
            {/* Simulated roof */}
            <div
                style={{
                    position: 'absolute',
                    top: '25%',
                    left: '20%',
                    width: '60%',
                    height: '50%',
                    background: '#8d6e63',
                }}
            />
            {/* Solar panel */}
            <div
                style={{
                    position: 'absolute',
                    top: '35%',
                    left: '30%',
                    width: '25%',
                    height: '30%',
                    background: '#1a237e',
                }}
            />
            {/* Detection box */}
            {showBox && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        position: 'absolute',
                        top: '32%',
                        left: '27%',
                        width: '31%',
                        height: '36%',
                        border: '3px solid #4CAF50',
                        borderRadius: '4px',
                        boxShadow: '0 0 15px rgba(76, 175, 80, 0.5)',
                    }}
                />
            )}
        </div>
    );
};

const InferenceCascadeSlide = () => {
    const [activeStage, setActiveStage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStage((prev) => (prev < 6 ? prev + 1 : 1));
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="slide-container">
            <div className="slide-content">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    The Secret Sauce: Multi-Stage Inference Cascade
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ marginBottom: '2rem', opacity: 0.8 }}
                >
                    A single pass misses edge cases. We built a <strong style={{ color: 'var(--solar-gold)' }}>6-Stage Fallback Strategy</strong>.
                </motion.p>

                <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                    {/* Pipeline stages */}
                    <div style={{ flex: 2 }}>
                        <div className="glass-card-static" style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                                {stages.map((stage, index) => {
                                    const Icon = stage.icon;
                                    const isActive = activeStage === stage.num;
                                    return (
                                        <motion.div
                                            key={stage.num}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{
                                                opacity: 1,
                                                scale: isActive ? 1.1 : 1,
                                                boxShadow: isActive ? `0 0 30px ${stage.color}40` : 'none',
                                            }}
                                            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                                            onClick={() => setActiveStage(stage.num)}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                padding: '20px',
                                                minWidth: '140px',
                                                background: isActive ? `${stage.color}20` : 'rgba(255,255,255,0.05)',
                                                border: `2px solid ${isActive ? stage.color : 'rgba(255,255,255,0.1)'}`,
                                                borderRadius: '16px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            <motion.div
                                                animate={{ rotate: isActive ? 360 : 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <Icon size={32} color={stage.color} />
                                            </motion.div>
                                            <div
                                                style={{
                                                    marginTop: '12px',
                                                    fontSize: '2rem',
                                                    fontWeight: 800,
                                                    background: `linear-gradient(135deg, ${stage.color}, #fff)`,
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                }}
                                            >
                                                {stage.num}
                                            </div>
                                            <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '8px', textAlign: 'center' }}>
                                                {stage.name}
                                            </div>
                                            <div style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '4px', textAlign: 'center' }}>
                                                {stage.desc}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Image preview */}
                    <div style={{ flex: 1 }}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass-card"
                            style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <h3 style={{ marginBottom: '20px' }}>Live Preview</h3>
                            <ImageTransform activeStage={activeStage} />
                            <div style={{ marginTop: '16px', fontSize: '1rem', opacity: 0.8, textAlign: 'center' }}>
                                {activeStage > 0 ? stages[activeStage - 1].name : 'Click a stage'}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Impact */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="glass-card callout success"
                    style={{ marginTop: '2rem', textAlign: 'center' }}
                >
                    <p style={{ fontSize: '1.5rem', margin: 0 }}>
                        <strong>Impact:</strong> F1 Score{' '}
                        <span style={{ color: 'var(--solar-orange)' }}>0.85</span>
                        {' → '}
                        <span style={{ color: '#4CAF50', fontWeight: 800 }}>0.95</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default InferenceCascadeSlide;
