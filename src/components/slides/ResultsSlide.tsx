import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedCounter = ({ target, duration = 1.2 }: { target: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const increment = target / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else { setCount(start); }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [target, duration]);
    return <span>{count.toFixed(2)}</span>;
};

const AnimatedBarChart = () => {
    const bars = [
        { label: 'Traditional', value: 0.54, color: '#9ca3af' },
        { label: 'YOLOv12', value: 0.85, color: '#22c55e' },
        { label: '+ Cascade', value: 0.95, color: '#16a34a' },
    ];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '24px',
            height: '140px',
            justifyContent: 'center',
            paddingBottom: '30px'
        }}>
            {bars.map((bar, i) => (
                <div
                    key={bar.label}
                    style={{
                        width: '60px',
                        height: `${bar.value * 100}px`,
                        background: `linear-gradient(180deg, ${bar.color}, ${bar.color}cc)`,
                        borderRadius: '6px 6px 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingTop: '8px',
                        position: 'relative',
                    }}
                >
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                        {bar.value.toFixed(2)}
                    </span>
                    <span style={{
                        position: 'absolute',
                        bottom: '-26px',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        whiteSpace: 'nowrap'
                    }}>
                        {bar.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

const transformations = [
    { label: 'Traditional IP', value: 0.54, color: 'var(--text-muted)' },
    { label: 'Base YOLOv12', value: 0.85, color: 'var(--accent-green-light)' },
    { label: '+ Cascade', value: 0.95, color: 'var(--accent-green)' },
];

const ResultsSlide = () => {
    return (
        <div className="slide-container" style={{ padding: '40px 80px' }}>
            <div className="slide-content" style={{ maxWidth: '1200px' }}>
                <motion.h2 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                    style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    The Transformation: Results
                </motion.h2>

                {/* Metric cards - smaller */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {transformations.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.15, duration: 0.4 }}
                            className="glass-card"
                            style={{
                                padding: '20px', textAlign: 'center',
                                borderColor: item.color, borderWidth: '2px',
                            }}
                        >
                            <div style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '2.8rem', fontWeight: 700, color: item.color,
                            }}>
                                <AnimatedCounter target={item.value} />
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {item.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Two column layout for chart and table */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '1.2rem' }}>
                    {/* Visual Bar Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                        className="glass-card-static"
                        style={{ padding: '20px' }}
                    >
                        <h3 style={{ marginBottom: '16px', textAlign: 'center', fontSize: '1.1rem' }}>F1 Score Progression</h3>
                        <AnimatedBarChart />
                    </motion.div>

                    {/* Benchmark table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.4 }}
                        className="glass-card-static"
                        style={{ padding: '20px' }}
                    >
                        <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>Benchmark Comparison</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid var(--accent-green)', color: 'var(--accent-green)', fontSize: '0.9rem' }}>Model</th>
                                    <th style={{ textAlign: 'right', padding: '8px', borderBottom: '2px solid var(--accent-green)', color: 'var(--accent-green)', fontSize: '0.9rem' }}>F1 Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { model: 'UNet Baseline', score: 0.75 },
                                    { model: 'YOLOv8-seg', score: 0.8 },
                                    { model: 'Our YOLOv12 + Cascade', score: 0.95, highlight: true },
                                ].map((row, i) => (
                                    <motion.tr
                                        key={row.model}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.1 + i * 0.1 }}
                                        style={{ background: row.highlight ? 'var(--glass-bg)' : 'transparent' }}
                                    >
                                        <td style={{ padding: '10px 8px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '1rem', fontWeight: row.highlight ? 600 : 400 }}>
                                            {row.model} {row.highlight && '🏆'}
                                        </td>
                                        <td style={{
                                            padding: '10px 8px', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right',
                                            fontWeight: 700, color: row.highlight ? 'var(--accent-green)' : 'inherit', fontSize: row.highlight ? '1.1rem' : '1rem',
                                        }}>
                                            {row.score.toFixed(2)}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </div>
        </div >
    );
};

export default ResultsSlide;
