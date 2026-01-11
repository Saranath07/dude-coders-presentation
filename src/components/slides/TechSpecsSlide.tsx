import { motion } from 'framer-motion';
import { FileJson, Calculator, CheckCircle, AlertTriangle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const TechSpecsSlide = () => {



    return (
        <div className="slide-container" style={{ padding: '0 40px' }}>
            <div className="slide-content" style={{ maxWidth: '1400px' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '30px', textAlign: 'center' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Standard Solar Audit Protocol</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                        The "Exact Math" behind our verifiable solar intelligence
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', height: 'auto', minHeight: '65vh' }}>
                    {/* Left Panel: Digital Audit Card */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--accent-green)' }}>
                            <FileJson size={24} />
                            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Digital Audit Output</h3>
                        </div>

                        {/* Digital Audit Card Content */}
                        <div style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                            borderRadius: '16px',
                            border: '1px solid var(--border-subtle)',
                            padding: '30px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                        }}>
                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Audit Sample ID</div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-primary)' }}>#0001-SOLAR</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Capture Date</div>
                                    <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', textAlign: 'right' }}>2026-01-04</div>
                                </div>
                            </div>

                            {/* Main Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                {/* Location */}
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Geolocation</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--action-blue)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                        <span style={{ color: 'var(--text-primary)' }}>Lat:</span> 21.110114
                                    </div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--action-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ color: 'var(--text-primary)' }}>Lon:</span> 72.864345
                                    </div>
                                </div>

                                {/* Detection Stats */}
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Detection Model</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '1rem' }}>Confidence:</span>
                                        <span style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '1.2rem' }}>88.89%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                                        <div style={{ width: '88.89%', height: '100%', background: 'var(--accent-green)', borderRadius: '3px' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Metrics Row */}
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                <div style={{ flex: 1, padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--solar-gold)' }}>38.41 <span style={{ fontSize: '1rem' }}>m²</span></div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>Est. PV Area</div>
                                </div>
                                <div style={{ flex: 1, padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>2.82 <span style={{ fontSize: '1rem' }}>m</span></div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>Euclidean Dist.</div>
                                </div>
                            </div>

                            {/* Verdict Badge */}
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.15)',
                                border: '1px solid var(--accent-green)',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '16px'
                            }}>
                                <CheckCircle size={32} color="var(--accent-green)" />
                                <div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)', letterSpacing: '0.05em' }}>VERIFIABLE</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--accent-green)', opacity: 0.9 }}>Quality Control Passed</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Mathematical Logic (Larger Fonts) */}
                    <div className="glass-card-static" style={{ padding: '30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', color: 'var(--accent-cyan)' }}>
                            <Calculator size={24} />
                            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Mathematical Logic</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.3rem' }}>
                                    1. Area Estimation (GSD)
                                </h4>
                                <div style={{ fontSize: '1.3rem', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
                                    <BlockMath math="Area (m^2) = (W_{px} \times H_{px}) \times \left( \frac{C_{earth} \times \cos(Lat)}{2^{Zoom}} \right)^2" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '1rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
                                    <div><strong style={{ color: 'var(--text-primary)' }}><InlineMath math="W_{px}, H_{px}" /></strong>: Dimensions (px)</div>
                                    <div><strong style={{ color: 'var(--text-primary)' }}>Lat</strong>: Latitude</div>
                                    <div><strong style={{ color: 'var(--text-primary)' }}>Zoom</strong>: Zoom Level (20)</div>
                                    <div><strong style={{ color: 'var(--text-primary)' }}><InlineMath math="C_{earth}" /></strong>: 156543.03</div>
                                </div>
                            </div>

                            <div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.3rem' }}>
                                    2. Euclidean Verification
                                </h4>
                                <div style={{ fontSize: '1.3rem', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
                                    <BlockMath math="Distance (m) = \sqrt{\Delta X^2 + \Delta Y^2} \times GSD" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '1rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
                                    <div><strong style={{ color: 'var(--text-primary)' }}><InlineMath math="\Delta X, \Delta Y" /></strong>: Pixel Offset</div>
                                    <div><strong style={{ color: 'var(--text-primary)' }}>GSD</strong>: Ground Sample Dist.</div>
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <AlertTriangle size={24} color="var(--accent-amber)" />
                                <div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '4px' }}>Fraud Prevention</div>
                                    <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                                        Prevents "Ghost Panels" via strict Euclidean checks.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechSpecsSlide;
