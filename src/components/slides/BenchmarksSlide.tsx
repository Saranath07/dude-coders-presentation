import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Trophy, Info } from 'lucide-react';

const samples = [
    { id: '1', title: 'Sample #1 (Complex Urban)' },
    { id: '833', title: 'Sample #833 (Multi-Panel Complex)' },
    { id: '2545', title: 'Sample #2545 (Scale Challenge)' },
];

const models = [
    { name: 'Model 1 (Roboflow)', imagePrefix: 'model1-', type: 'external' },
    { name: 'Model 2 (Roboflow)', imagePrefix: 'model2-', type: 'external' },
    { name: 'Model 3 (Roboflow)', imagePrefix: 'model3-', type: 'external' },
    { name: 'Our YOLOv12 + Cascade', imagePrefix: 'solar', type: 'ours' },
];

const BenchmarksSlide = () => {
    const [activeSample, setActiveSample] = useState(samples[0]);

    const getImagePath = (model: any) => {
        const baseUrl = import.meta.env.BASE_URL;
        if (model.type === 'ours') {
            return `${baseUrl}comparison/solar${activeSample.id}.jpg`;
        }
        // Model 3 only has 1 and 833 according to user description
        if (model.name === 'Model 3 (Roboflow)' && activeSample.id === '2545') {
            return null;
        }
        return `${baseUrl}comparison/${model.imagePrefix}${activeSample.id}.png`;
    };

    return (
        <div className="slide-container">
            <div className="slide-content">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}
                    >
                        Head-to-Head Benchmarks
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}
                    >
                        Comparison against state-of-the-art Roboflow detection models
                    </motion.p>
                </div>

                {/* Sample Selector */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    {samples.map((sample) => (
                        <button
                            key={sample.id}
                            onClick={() => setActiveSample(sample)}
                            className="glass-card-static"
                            style={{
                                padding: '12px 24px',
                                border: `2px solid ${activeSample.id === sample.id ? 'var(--accent-green)' : 'transparent'}`,
                                background: activeSample.id === sample.id ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                color: activeSample.id === sample.id ? 'var(--accent-green)' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            {sample.title}
                        </button>
                    ))}
                </div>

                {/* Comparison Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px',
                    height: '450px'
                }}>
                    <AnimatePresence mode="wait">
                        {models.map((model, idx) => {
                            const imgPath = getImagePath(model);
                            return (
                                <motion.div
                                    key={`${activeSample.id}-${model.name}`}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass-card"
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        border: model.type === 'ours' ? '2px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                                        boxShadow: model.type === 'ours' ? '0 0 30px rgba(34, 197, 94, 0.2)' : 'none'
                                    }}
                                >
                                    {/* Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        padding: '10px',
                                        background: model.type === 'ours' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(0,0,0,0.6)',
                                        zIndex: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        color: '#fff',
                                        fontWeight: 700,
                                        fontSize: '0.9rem'
                                    }}>
                                        {model.type === 'ours' && <Trophy size={16} />}
                                        {model.name}
                                    </div>

                                    {/* Image Container */}
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: '#0a0a0a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {imgPath ? (
                                            <img
                                                src={imgPath}
                                                alt={model.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                                                <Info size={40} style={{ marginBottom: '10px', opacity: 0.5 }} />
                                                <p>Screenshot not available for this sample</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Brief Analysis */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="glass-card callout success"
                    style={{ marginTop: '2.5rem', textAlign: 'center' }}
                >
                    <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>
                        <strong style={{ color: 'var(--accent-green)' }}>Verdict:</strong> Our <strong>Cascade Strategy</strong> successfully filters false positives and handles low-resolution satellite feeds better than standard one-pass detection models.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default BenchmarksSlide;
