import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
    return (
        <motion.button
            onClick={toggleTheme}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                position: 'fixed',
                top: '16px',
                right: '160px',
                zIndex: 1000,
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '8px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'light' ? 0 : 180 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                {theme === 'light' ? (
                    <Sun size={20} color="var(--accent-cyan)" />
                ) : (
                    <Moon size={20} color="var(--accent-green)" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
