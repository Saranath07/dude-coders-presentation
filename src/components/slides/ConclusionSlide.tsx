import { motion } from 'framer-motion';
import { Zap, Battery, ArrowRight, TrendingUp, Grid, ShieldCheck } from 'lucide-react';

const ConclusionSlide = () => {
    const recommendations = [
        {
            icon: Zap,
            title: 'Hybrid Verification',
            desc: 'Combine Vision (Capacity) with Meter Data (Output) to detect system inefficiencies and degradation.',
            color: 'var(--accent-amber)'
        },
        
        {
            icon: Battery,
            title: 'Edge Efficiency',
            desc: 'Deploy on sub-5W drones (Jetson/Myriad) for <1% battery impact and real-time pathing.',
            color: 'var(--accent-green)'
        }
    ];

    return (
        <div className="slide-container" style={{ padding: '0 60px' }}>
            <div className="slide-content" style={{ maxWidth: '1400px' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '40px' }}
                >
                    <h2 style={{ fontSize: '2.8rem', marginBottom: '12px' }}>Strategic Conclusion</h2>
                    <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>Addressing the Larger Problem: Solar Intelligence</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', height: 'auto', minHeight: '65vh' }}>

                    {/* Left Column: Technical Enablers */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center' }}>
                        <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '16px' }}>Technical Recommendations</h3>
                        {recommendations.map((rec, i) => {
                            const Icon = rec.icon;
                            return (
                                <motion.div
                                    key={rec.title}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.15 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    className="glass-card"
                                    style={{
                                        padding: '28px',
                                        borderLeft: `6px solid ${rec.color}`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                        <div style={{ padding: '10px', background: `${rec.color}22`, borderRadius: '10px' }}>
                                            <Icon size={28} color={rec.color} />
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{rec.title}</h3>
                                    </div>
                                    <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                        {rec.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Column: The "Larger Problem" Narrative */}
                    <div className="glass-card-static" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
                            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '10px' }}>The "Next Step" Problem</h3>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                "We found the panels. Now what?"
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
                            {/* Connecting Line */}
                            <div style={{ position: 'absolute', left: '24px', top: '30px', bottom: '30px', width: '3px', background: 'var(--border-subtle)', zIndex: 0 }} />

                            {[
                                { title: '1. Reliable Inventory (Solved)', desc: 'Exact geolocation & area of assets.', icon: ShieldCheck, color: 'var(--accent-green)' },
                                { title: '2. Capacity Estimation', desc: 'Pixel-to-Power: Calculating theoretical generation potential.', icon: TrendingUp, color: 'var(--accent-cyan)' },
                                { title: '3. Grid Intelligence', desc: 'Load Balancing & Virtual Power Plant (VPP) planning.', icon: Grid, color: 'var(--accent-amber)' },
                            ].map((step, i) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + i * 0.2 }}
                                    style={{ display: 'flex', gap: '20px', padding: '20px 0', position: 'relative', zIndex: 1 }}
                                >
                                    <div style={{
                                        minWidth: '50px', height: '50px', borderRadius: '50%', background: 'var(--bg-card)',
                                        border: `3px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: `0 0 20px ${step.color}44`
                                    }}>
                                        <step.icon size={24} color={step.color} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1.3rem', color: i === 0 ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: i === 0 ? 'line-through' : 'none', opacity: i === 0 ? 0.7 : 1 }}>
                                            {step.title}
                                        </div>
                                        <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                                            {step.desc}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                                <ArrowRight size={24} color="var(--accent-cyan)" />
                                Result: From "Dots on a Map" to "Energy Security"
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConclusionSlide;
