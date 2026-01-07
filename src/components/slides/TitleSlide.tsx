import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

const TitleSlide = () => {
    return (
        <div className="slide-container" style={{ textAlign: 'center' }}>
            <div className="slide-content">
                {/* Animated Sun Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ marginBottom: '2rem' }}
                >
                    <Sun size={80} color="#FFB703" className="animate-glow" />
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={{ marginBottom: '1rem' }}
                >
                    Advanced Solar Panel Detection System
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{
                        fontSize: '1.8rem',
                        color: 'var(--light-blue)',
                        marginBottom: '3rem'
                    }}
                >
                    A Multi-Stage Deep Learning Approach
                </motion.p>

                {/* Team Name */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="glass-card"
                    style={{
                        display: 'inline-block',
                        padding: '16px 48px',
                    }}
                >
                    <span style={{ color: 'var(--solar-gold)', fontWeight: 600 }}>
                        Team Dude Coders
                    </span>
                </motion.div>

                {/* Floating particles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: '4px',
                            height: '4px',
                            background: 'var(--solar-gold)',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px var(--solar-gold)',
                            left: `${20 + i * 15}%`,
                            bottom: '20%',
                        }}
                        animate={{
                            y: [-20, -60, -20],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default TitleSlide;
