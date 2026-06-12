import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

const CountUp = ({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const unsub = rounded.on('change', v => setDisplay(v));
    const ctrl = animate(count, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] });
    return () => { ctrl.stop(); unsub(); };
  }, [to]);

  return <span>{display}</span>;
};

const BarChart = () => {
  const data = [
    { year: '2020', val: 130, label: '130 GW' },
    { year: '2021', val: 175, label: '175 GW' },
    { year: '2022', val: 240, label: '240 GW' },
    { year: '2023', val: 430, label: '430 GW' },
    { year: '2025', val: 600, label: '600 TWh eq.' },
  ];
  const max = 600;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 130, paddingTop: 12 }}>
      {data.map((d, i) => (
        <div key={d.year} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--amber)', marginBottom: 4, opacity: 0.9 }}>
            {d.label}
          </span>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              height: (d.val / max) * 90,
              background: i === data.length - 1
                ? 'linear-gradient(180deg, #FCD34D 0%, #F59E0B 100%)'
                : 'linear-gradient(180deg, rgba(245,158,11,0.6) 0%, rgba(245,158,11,0.2) 100%)',
              borderRadius: '3px 3px 0 0',
              transformOrigin: 'bottom',
              border: i === data.length - 1 ? '1px solid rgba(245,158,11,0.6)' : '1px solid rgba(245,158,11,0.15)',
            }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: 5 }}>{d.year}</span>
        </div>
      ))}
    </div>
  );
};

const stats = [
  { num: 600, suffix: ' TWh', label: 'Added in 2025 alone', note: 'Largest single-tech increase in history' },
  { num: 430, suffix: ' GW', label: 'Capacity added in 2023', note: 'Nearly doubling year-over-year' },
  { prefix: '$', num: 480, suffix: 'B', label: 'Invested in solar 2023', note: 'More than all other power tech combined' },
  { num: 80, suffix: '%', label: 'Of renewable growth by 2030', note: 'Solar alone, per IEA Renewables 2024' },
];

const SolarBoomSlide = () => (
  <div className="slide">
    <div className="glow-amber-tr" style={{ opacity: 0.6 }} />
    <div className="glow-teal-bl" style={{ opacity: 0.4 }} />

    <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
      {/* Left */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="label-mono" style={{ marginBottom: 16 }}>Part I — The Solar Revolution</div>
          <div className="glow-rule" style={{ marginBottom: 24 }} />
          <h2
            className="h-section"
            style={{ fontSize: 'clamp(2.6rem, 4.2vw, 3.8rem)', marginBottom: 20, lineHeight: 1.1 }}
          >
            The World Is Going Solar —{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Faster Than Anyone Expected</span>
          </h2>
          <p className="body" style={{ fontSize: '1.05rem', marginBottom: 28 }}>
            In 2025, solar PV surpassed <strong style={{ color: 'var(--text-primary)' }}>25% of all global energy demand growth</strong>,
            eclipsing every other energy source on the planet in a single year. The revolution is not coming. It is here.
          </p>
          <div style={{ padding: '14px 20px', background: 'var(--amber-dim)', border: '1px solid var(--amber-border)', borderRadius: 10 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', color: 'var(--amber-bright)', lineHeight: 1.6 }}>
              IEA Net Zero target: <strong>6,700 GW</strong> of solar by 2030<br />
              That requires <strong>~900 GW/yr</strong> — double the 2023 record
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right */}
      <div>
        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="card card-p"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              style={{ padding: '18px 20px' }}
            >
              <div className="stat-num" style={{ fontSize: '2.8rem' }}>
                <CountUp to={s.num} suffix={s.suffix} prefix={s.prefix ?? ''} />
              </div>
              <div className="stat-label">{s.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.4 }}>
                {s.note}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bar chart */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ padding: '16px 20px 10px' }}
        >
          <div className="label-mono" style={{ marginBottom: 6, fontSize: '0.9rem' }}>Global Solar Capacity Additions (GW / TWh-eq)</div>
          <BarChart />
        </motion.div>
      </div>
    </div>
  </div>
);

export default SolarBoomSlide;
