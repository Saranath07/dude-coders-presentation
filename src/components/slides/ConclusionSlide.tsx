import { motion } from 'framer-motion';
import { Sun, CheckCircle, Rocket } from 'lucide-react';

const highlights = [
    { icon: CheckCircle, text: 'YOLOv12 Architecture: Area Attention & R-ELAN', color: '#4CAF50' },
    { icon: CheckCircle, text: 'Data Strategy: Hard Negative Mining & SAM-assisted labels', color: '#2196F3' },
    { icon: CheckCircle, text: 'Inference Cascade: Multi-stage fallback for difficult cases', color: '#9C27B0' },
];

const ConclusionSlide = () => {
    return (
        <div className="slide-container" style={{ textAlign: 'center' }}>
            <div className="slide-content">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: '2rem' }}
                >
                    Conclusion
                </motion.h2>

                {/* Transformation highlight */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="glass-card"
                    style={{
                        padding: '32px 48px',
                        display: 'inline-block',
                        marginBottom: '2.5rem',
                    }}
                >
                    <p style={{ fontSize: '1.6rem', margin: 0 }}>
                        <strong style={{ color: 'var(--solar-gold)' }}>Transformation:</strong>{' '}
                        From <span style={{ color: '#f44336', fontWeight: 700 }}>0.54</span> F1 (Traditional){' '}
                        to <span style={{ color: '#4CAF50', fontWeight: 800, fontSize: '1.8rem' }}>0.95</span> F1 (Deep Learning)
                    </p>
                </motion.div>

                {/* Key drivers */}
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ marginBottom: '1.5rem' }}
                >
                    Key Drivers
                </motion.h3>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
                    {highlights.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.text}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.15, duration: 0.4 }}
                                className="glass-card-static"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '20px 32px',
                                    width: '100%',
                                }}
                            >
                                <Icon size={28} color={item.color} />
                                <span style={{ fontSize: '1.1rem' }}>{item.text}</span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Status */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                >
                    <Rocket size={24} color="#4CAF50" />
                    <span style={{ fontSize: '1.2rem', color: '#4CAF50', fontWeight: 600 }}>
                        Production-ready pipeline for automated solar auditing
                    </span>
                </motion.div>

                {/* Thank you */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.6, type: 'spring' }}
                    style={{ marginTop: '3rem' }}
                >
                    <Sun size={60} color="#FFB703" className="animate-glow" style={{ marginBottom: '16px' }} />
                    <motion.h1
                        animate={{
                            textShadow: ['0 0 20px rgba(255, 183, 3, 0.3)', '0 0 40px rgba(255, 183, 3, 0.6)', '0 0 20px rgba(255, 183, 3, 0.3)'],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ fontSize: '3rem' }}
                    >
                        Thank You!
                    </motion.h1>
                </motion.div>
            </div>
        </div>
    );
};

export default ConclusionSlide;
