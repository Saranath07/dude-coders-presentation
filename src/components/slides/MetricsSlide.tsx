import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedCounter = ({ target, duration = 1.5 }: { target: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = target / (duration * 60);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{count.toFixed(2)}</span>;
};

const metrics = [
    { value: 0.62, label: 'Precision', color: '#f59e0b', highlight: false },
    { value: 0.48, label: 'Recall', color: '#f59e0b', highlight: false },
    { value: 0.54, label: 'F1 Score', color: '#ef4444', highlight: true },
];

const MetricsSlide = () => {
    return (
        <div className="slide-container">
            <div className="slide-content">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Traditional Method: The Numbers Don't Lie
                </motion.h2>

                <div className="metric-grid" style={{ marginTop: '3rem' }}>
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.2, duration: 0.5, type: 'spring' }}
                            className="glass-card metric-card"
                            style={{
                                borderColor: metric.highlight ? '#ef4444' : 'rgba(255,255,255,0.08)',
                                borderWidth: metric.highlight ? '2px' : '1px',
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '4.5rem',
                                    fontWeight: 700,
                                    color: metric.color,
                                }}
                            >
                                <AnimatedCounter target={metric.value} />
                            </div>
                            <div className="metric-label">
                                {metric.label} {metric.highlight && '❌'}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="glass-card-static callout warning"
                    style={{ marginTop: '2rem', textAlign: 'center' }}
                >
                    <p style={{ fontSize: '1.3rem' }}>
                        <strong style={{ color: '#f59e0b' }}>Verdict:</strong>{' '}
                        Unacceptable for production. We needed a smarter approach.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default MetricsSlide;
