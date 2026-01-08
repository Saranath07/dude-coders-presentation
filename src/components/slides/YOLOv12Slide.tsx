import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Convolution Animation
const ConvAnimation = () => {
    const [pos, setPos] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setPos(p => (p + 1) % 4), 350);
        return () => clearInterval(timer);
    }, []);
    const positions = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];
    const { x, y } = positions[pos];

    return (
        <div style={{ width: '40px', height: '40px', position: 'relative', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 11px)', gap: '2px' }}>
                {[...Array(9)].map((_, i) => (
                    <div key={i} style={{ width: '11px', height: '11px', background: 'var(--border-subtle)', borderRadius: '2px' }} />
                ))}
            </div>
            <motion.div
                animate={{ left: x * 13, top: y * 13 }}
                style={{
                    position: 'absolute', width: '24px', height: '24px',
                    border: '2px solid var(--accent-cyan)', borderRadius: '3px',
                    boxShadow: '0 0 10px var(--accent-cyan)',
                }}
            />
        </div>
    );
};

// Neural Network Animation (R-ELAN)
const NeuralNetAnimation = () => {
    const [activeLayer, setActiveLayer] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setActiveLayer(l => (l + 1) % 3), 350);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
            {[0, 1, 2].map(layer => (
                <div key={layer} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {[0, 1, 2].map(node => (
                        <motion.div
                            key={node}
                            animate={{
                                background: activeLayer === layer ? 'var(--accent-green)' : 'var(--border-subtle)',
                                boxShadow: activeLayer === layer ? '0 0 8px var(--accent-green)' : 'none',
                            }}
                            style={{ width: '8px', height: '8px', borderRadius: '50%' }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

// Attention Animation
const AttentionAnimation = () => {
    const [focus, setFocus] = useState({ x: 12, y: 10 });
    useEffect(() => {
        const timer = setInterval(() => setFocus({ x: 6 + Math.random() * 24, y: 6 + Math.random() * 18 }), 450);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ width: '42px', height: '30px', position: 'relative', margin: '0 auto', overflow: 'hidden', borderRadius: '4px' }}>
            <div style={{ width: '100%', height: '100%', background: 'rgba(245, 158, 11, 0.15)' }} />
            <motion.div
                animate={{ left: focus.x, top: focus.y }}
                style={{
                    position: 'absolute', width: '14px', height: '14px',
                    background: 'radial-gradient(circle, var(--accent-amber) 0%, transparent 70%)',
                    borderRadius: '50%', filter: 'blur(3px)',
                }}
            />
        </div>
    );
};

// Upsample Animation
const UpsampleAnimation = () => {
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        const timer = setInterval(() => setExpanded(e => !e), 650);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            animate={{ scale: expanded ? 1.3 : 0.85 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 10px)', gap: '3px', margin: '0 auto' }}
        >
            {[0, 1, 2, 3].map(i => (
                <motion.div key={i} animate={{ background: expanded ? 'var(--accent-green)' : 'var(--border-subtle)' }}
                    style={{ width: '10px', height: '10px', borderRadius: '2px' }} />
            ))}
        </motion.div>
    );
};

// Full Neural Network Animation for Head (Input -> Hidden -> Output with connections)
const FullNeuralNetAnimation = ({ outputLabel }: { outputLabel: string }) => {
    const [activeLayer, setActiveLayer] = useState(0);
    const [signalProgress, setSignalProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveLayer(l => (l + 1) % 4);
            setSignalProgress(p => (p + 1) % 4);
        }, 300);
        return () => clearInterval(timer);
    }, []);

    const layers = [
        { nodes: 4, label: 'In' },
        { nodes: 5, label: '' },
        { nodes: 3, label: '' },
        { nodes: 2, label: outputLabel },
    ];

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
                {layers.map((layer, layerIdx) => (
                    <div key={layerIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                        {[...Array(layer.nodes)].map((_, nodeIdx) => (
                            <motion.div
                                key={nodeIdx}
                                animate={{
                                    background: activeLayer === layerIdx ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                                    boxShadow: activeLayer === layerIdx ? '0 0 8px var(--accent-cyan)' : 'none',
                                    scale: activeLayer === layerIdx ? 1.2 : 1,
                                }}
                                style={{ width: '6px', height: '6px', borderRadius: '50%' }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Connections (simplified lines) */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {[0, 1, 2].map(i => (
                    <motion.line
                        key={i}
                        x1={`${15 + i * 25}%`} y1="50%"
                        x2={`${35 + i * 25}%`} y2="50%"
                        stroke="var(--border-subtle)"
                        strokeWidth="1"
                        animate={{
                            stroke: signalProgress === i ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                            strokeWidth: signalProgress === i ? 2 : 1,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};

// Input Animation
const InputAnimation = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 6px)', gap: '2px', margin: '0 auto' }}>
        {[...Array(25)].map((_, i) => (
            <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 0.6, delay: i * 0.02, repeat: Infinity }}
                style={{ width: '6px', height: '6px', background: 'var(--text-primary)', borderRadius: '1px' }} />
        ))}
    </div>
);

// Data flow particle
const DataFlowParticle = ({ startY, delay }: { startY: number; delay: number }) => (
    <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: [0, 200, 400, 600], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'linear' }}
        style={{
            position: 'absolute', left: 0, top: startY,
            width: '8px', height: '8px',
            background: 'var(--accent-amber)', borderRadius: '50%',
            boxShadow: '0 0 12px var(--accent-amber)',
        }}
    />
);

// Architecture Block
interface BlockProps {
    label: string;
    sublabel?: string;
    type: 'backbone' | 'neck' | 'head' | 'attention' | 'input';
    delay: number;
    animationType?: 'conv' | 'neural' | 'attention' | 'upsample' | 'head-detect' | 'head-segment' | 'head-class' | 'input';
}

const ArchBlock = ({ label, sublabel, type, delay, animationType }: BlockProps) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
        backbone: { bg: 'linear-gradient(180deg, var(--glass-bg), var(--bg-secondary))', border: 'var(--arch-backbone)', text: 'var(--arch-backbone)' },
        neck: { bg: 'linear-gradient(180deg, var(--glass-bg), var(--bg-secondary))', border: 'var(--arch-neck)', text: 'var(--arch-neck)' },
        head: { bg: 'linear-gradient(180deg, var(--glass-bg), var(--bg-secondary))', border: 'var(--arch-head)', text: 'var(--arch-head)' },
        attention: { bg: 'linear-gradient(180deg, var(--glass-bg), var(--bg-secondary))', border: 'var(--arch-attention)', text: 'var(--arch-attention)' },
        input: { bg: 'var(--glass-bg)', border: 'var(--border-subtle)', text: 'var(--text-primary)' },
    };
    const style = colors[type];

    const renderAnimation = () => {
        switch (animationType) {
            case 'conv': return <ConvAnimation />;
            case 'neural': return <NeuralNetAnimation />;
            case 'attention': return <AttentionAnimation />;
            case 'upsample': return <UpsampleAnimation />;
            case 'head-detect': return <FullNeuralNetAnimation outputLabel="Box" />;
            case 'head-segment': return <FullNeuralNetAnimation outputLabel="Mask" />;
            case 'head-class': return <FullNeuralNetAnimation outputLabel="Cls" />;
            case 'input': return <InputAnimation />;
            default: return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3, type: 'spring' }}
            whileHover={{
                scale: 1.05,
                boxShadow: `0 12px 30px ${style.border}33, inset 0 0 10px ${style.border}1a`
            }}
            style={{
                padding: '10px 14px',
                background: style.bg,
                border: `1.5px solid ${style.border}`,
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                minWidth: '140px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                backdropFilter: 'blur(10px)',
                transition: 'border 0.3s ease, box-shadow 0.3s ease'
            }}
        >
            <div style={{ marginBottom: '6px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {renderAnimation()}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: style.text, letterSpacing: '0.02em', marginBottom: '2px' }}>{label}</div>
            {sublabel && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{sublabel}</div>}
        </motion.div>
    );
};

const Arrow = ({ delay }: { delay: number }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}
        style={{ color: 'var(--border-subtle)', fontSize: '1.2rem', textAlign: 'center', padding: '4px 0', opacity: 0.6 }}>↓</motion.div>
);

const YOLOv12Slide = () => {
    return (
        <div className="slide-container" style={{ padding: '0 20px', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="slide-content" style={{ maxWidth: '98vw', width: '100%', overflowY: 'hidden', maxHeight: '100vh', padding: '10px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '30px', justifyContent: 'center' }}>
                    {/* Left: Info Section - More compact to give diagram space */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ flex: '0 0 280px', paddingTop: '10px' }}
                    >
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', background: 'var(--gradient-solar)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            YOLOv12<br />Architecture
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.2rem', lineHeight: 1.4 }}>
                            Attention-centric design with Area Attention (A2) and R-ELAN backbone for superior detection
                        </p>

                        {/* Key features */}
                        <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { name: 'Area Attention', desc: 'Large receptive field' },
                                { name: 'R-ELAN', desc: 'Stable aggregation' },
                                { name: 'Flash Attention', desc: 'Memory optimized' },
                            ].map((f, i) => (
                                <motion.div
                                    key={f.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.8 + i * 0.1 }}
                                    style={{
                                        padding: '12px 18px', background: 'var(--glass-bg)',
                                        border: '1px solid var(--border-subtle)', borderRadius: '12px',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                                    }}
                                >
                                    <div style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: 600 }}>⚡ {f.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{f.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Architecture Diagram - BIGGER */}
                    <div className="glass-card-static" style={{ flex: 1, padding: '28px', position: 'relative', overflow: 'hidden' }}>
                        {/* Data flow particles */}
                        <DataFlowParticle startY={80} delay={0} />
                        <DataFlowParticle startY={180} delay={0.8} />
                        <DataFlowParticle startY={280} delay={1.6} />
                        <DataFlowParticle startY={380} delay={2.4} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', position: 'relative', zIndex: 1 }}>
                            {/* BACKBONE */}
                            <div style={{ flex: 1, minWidth: '140px' }}>
                                <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                                    style={{ textAlign: 'center', marginBottom: '10px', fontSize: '1.0rem', color: 'var(--arch-backbone)', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.05em' }}>
                                    Backbone
                                </motion.h3>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <ArchBlock label="Input" sublabel="640×640" type="input" delay={0.3} animationType="input" />
                                    <Arrow delay={0.35} />
                                    <ArchBlock label="Conv [64]" sublabel="P1/2" type="backbone" delay={0.4} animationType="conv" />
                                    <Arrow delay={0.45} />
                                    <ArchBlock label="Conv [128]" sublabel="P2/4" type="backbone" delay={0.5} animationType="conv" />
                                    <Arrow delay={0.55} />
                                    <ArchBlock label="C3k2 [256]" sublabel="Stage P2" type="backbone" delay={0.6} animationType="conv" />
                                    <Arrow delay={0.65} />
                                    <ArchBlock label="R-ELAN" sublabel="[256]" type="backbone" delay={0.7} animationType="neural" />
                                </div>
                            </div>

                            {/* Separator with flowing gradient */}
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                style={{
                                    width: '1.5px',
                                    background: 'linear-gradient(180deg, transparent, var(--arch-backbone), var(--arch-neck), transparent)',
                                    alignSelf: 'stretch',
                                    opacity: 0.5,
                                    margin: '0 6px'
                                }}
                            />

                            {/* NECK */}
                            <div style={{ flex: 1, minWidth: '140px' }}>
                                <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                                    style={{ textAlign: 'center', marginBottom: '10px', fontSize: '1.0rem', color: 'var(--arch-neck)', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.05em' }}>
                                    Neck
                                </motion.h3>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <ArchBlock label="Conv [512]" sublabel="P4/16" type="neck" delay={0.85} animationType="conv" />
                                    <Arrow delay={0.9} />
                                    <ArchBlock label="A2C2f [512]" sublabel="Area Attention ⚡" type="attention" delay={0.95} animationType="attention" />
                                    <Arrow delay={1.0} />
                                    <ArchBlock label="R-ELAN [512]" type="neck" delay={1.05} animationType="neural" />
                                    <Arrow delay={1.1} />
                                    <ArchBlock label="A2C2f [1024]" sublabel="Area Attention ⚡" type="attention" delay={1.15} animationType="attention" />
                                    <Arrow delay={1.2} />
                                    <ArchBlock label="Upsample" sublabel="+ Concat" type="neck" delay={1.25} animationType="upsample" />
                                </div>
                            </div>

                            {/* Separator */}
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 1.3, duration: 0.5 }}
                                style={{
                                    width: '1.5px',
                                    background: 'linear-gradient(180deg, transparent, var(--arch-neck), var(--arch-head), transparent)',
                                    alignSelf: 'stretch',
                                    opacity: 0.5,
                                    margin: '0 6px'
                                }}
                            />

                            {/* HEAD */}
                            <div style={{ flex: 1, minWidth: '140px' }}>
                                <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                                    style={{ textAlign: 'center', marginBottom: '10px', fontSize: '1.0rem', color: 'var(--arch-head)', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.05em' }}>
                                    Head
                                </motion.h3>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <ArchBlock label="Detection" sublabel="Boxes + Scores" type="head" delay={1.35} animationType="head-detect" />
                                    <Arrow delay={1.4} />
                                    <ArchBlock label="Segment" sublabel="Masks + Pixels" type="head" delay={1.45} animationType="head-segment" />
                                    <Arrow delay={1.5} />
                                    <ArchBlock label="Class" sublabel="Labels + Scores" type="head" delay={1.55} animationType="head-class" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YOLOv12Slide;
