import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react';

const RedirectSlide = () => {
    useEffect(() => {
        // Hard redirect to the external site
        const timer = setTimeout(() => {
            window.location.href = "https://shriprasad15.github.io/Dude-Coders-Ideathon/";
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="slide-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card"
                style={{ padding: '60px', maxWidth: '600px' }}
            >
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <Loader2 size={60} className="animate-spin" color="var(--accent-green)" />
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Finalizing...</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Redirecting to the official project landing page
                </p>
                <div className="glass-card-static" style={{ padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <ExternalLink size={20} />
                    <span>shriprasad15.github.io/Dude-Coders-Ideathon</span>
                </div>
            </motion.div>
        </div>
    );
};

export default RedirectSlide;
