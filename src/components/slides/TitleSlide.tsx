import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

const TitleSlide = () => {
    return (
        <div className="slide-container" style={{ textAlign: 'center' }}>
            <div className="slide-content">
                {/* Header Logos - Near Sun */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '80px',
                        marginBottom: '40px'
                    }}
                >
                    <img src={`${import.meta.env.BASE_URL}global-learning.png`} alt="Global Learning" style={{ height: '90px', objectFit: 'contain' }} />
                    <img src={`${import.meta.env.BASE_URL}India-AI-Impact-Summit-2026.png`} alt="AI Impact Summit 2026" style={{ height: '120px', objectFit: 'contain' }} />
                    <img src={`${import.meta.env.BASE_URL}iitm_logo.png`} alt="IITM Logo" style={{ height: '90px', objectFit: 'contain' }} />
                </motion.div>

                {/* Animated Sun Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ marginBottom: '2rem' }}
                >
                    <Sun size={80} color="var(--accent-amber)" className="animate-glow" />
                </motion.div>

                {/* Event Header */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                    <h3 style={{
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        color: 'var(--accent-green)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        textShadow: '0 0 15px rgba(34, 197, 94, 0.4)'
                    }}>
                        AI For A Better Earth
                    </h3>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: 'var(--text-primary)',
                        textTransform: 'uppercase',
                        lineHeight: 1,
                        marginBottom: '4px'
                    }}>
                        ECOINNOVATORS IDEATHON 2026
                    </h2>
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

                {/* Team Members */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    style={{
                        marginTop: '2rem',
                        display: 'flex',
                        gap: '40px',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '1.2rem',
                        fontWeight: 500
                    }}
                >
                    <span>S Shriprasad</span>
                    <span>P Saranath</span>
                    <span>B Shruthi</span>
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
