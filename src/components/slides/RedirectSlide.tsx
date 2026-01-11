import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const RedirectSlide = () => {
    return (
        <div className="slide-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    width: '100%',
                    maxWidth: '1400px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    height: '90vh'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 20px',
                    background: 'var(--glass-bg)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)'
                }}>
                    <ExternalLink size={20} color="var(--accent-green)" />
                    <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Project Landing Page</span>
                    <a
                        href="https://shriprasad15.github.io/Dude-Coders-Ideathon/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            marginLeft: 'auto',
                            color: 'var(--accent-green)',
                            textDecoration: 'none',
                            fontSize: '0.9rem'
                        }}
                    >
                        Open in new tab ↗
                    </a>
                </div>

                <div className="glass-card" style={{
                    flex: 1,
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <video
                        src={`${import.meta.env.BASE_URL}demo-video.mp4`}
                        poster={`${import.meta.env.BASE_URL}comparison/solar1.jpg`}
                        autoPlay
                        loop
                        muted
                        controls
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '12px'
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default RedirectSlide;
