import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const ArchBlock = ({
  label, sublabel, color, x, y, width = 90, height = 38, active, onClick
}: {
  label: string; sublabel?: string; color: string;
  x: number; y: number; width?: number; height?: number;
  active: boolean; onClick: () => void;
}) => (
  <motion.g
    onClick={onClick}
    style={{ cursor: 'pointer' }}
    whileHover={{ scale: 1.04 }}
  >
    <motion.rect
      x={x} y={y} width={width} height={height} rx={7}
      fill={active ? color + '35' : color + '15'}
      stroke={color}
      strokeWidth={active ? 1.8 : 0.8}
      strokeOpacity={active ? 1 : 0.45}
      animate={{ fillOpacity: active ? 1 : 0.6 }}
    />
    <text x={x + width / 2} y={y + height / 2 - (sublabel ? 5 : 0)} textAnchor="middle"
      dominantBaseline="middle" fill={active ? '#fff' : color}
      fontSize={active ? 10 : 9} fontWeight={active ? 700 : 500}
      fontFamily="var(--font-mono,monospace)">
      {label}
    </text>
    {sublabel && (
      <text x={x + width / 2} y={y + height / 2 + 9} textAnchor="middle"
        dominantBaseline="middle" fill={color} fontSize={7.5} fontFamily="var(--font-mono,monospace)" opacity={0.7}>
        {sublabel}
      </text>
    )}
  </motion.g>
);

const Arrow = ({ x1, y1, x2, y2, color = 'rgba(241,245,249,0.15)' }: { x1: number; y1: number; x2: number; y2: number; color?: string }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1} markerEnd="url(#arrow)" />
);

const details: Record<string, { title: string; body: React.ReactNode }> = {
  Input: {
    title: '1024×1024 Satellite Input',
    body: <>High-resolution RGB patches from Google Maps Static API at Zoom Level 20 (<InlineMath math="\approx 6\,\text{cm/px}" /> over India). Higher resolution than standard YOLO training captures rooftop panel detail.</>,
  },
  'R-ELAN': {
    title: 'Residual Efficient Layer Aggregation Network',
    body: 'The backbone. Efficiently extracts multi-scale features while preserving spatial resolution. Custom residual connections reduce vanishing gradients in deep satellite image analysis.',
  },
  'A² (×3)': {
    title: 'Area Attention Module',
    body: <>Divides feature maps into local windows, computes attention within and across windows. Focuses compute on regions likely to contain solar panels — not every pixel equally.</>,
  },
  'AIFI': {
    title: 'Attention-based Intra-scale Feature Interaction',
    body: 'Enables cross-scale information exchange within the neck. Critical for connecting large-scale roof context with small-scale panel detail.',
  },
  'P3/P4/P5': {
    title: 'Multi-Scale Detection Heads',
    body: 'P3: small panels on large roofs. P4: medium residential arrays. P5: large commercial/utility installations. All three run in parallel for comprehensive coverage.',
  },
  Detection: {
    title: 'Bounding Box Output',
    body: <>Returns <InlineMath math="[x,\,y,\,w,\,h]" /> + confidence score. Used for GPS distance calculation (Euclidean to claimed coordinate) and QC classification. If <InlineMath math="d > r_{\text{buffer}}" /> → ghost panel alert.</>,
  },
  Segmentation: {
    title: 'Pixel-Level Mask Output',
    body: <>Pixel-accurate boundary masks enable GSD-based area estimation: <InlineMath math="\text{Area (m}^2) = W \times H_{\text{px}} \times \text{GSD}^2" />. GSD corrected for Mercator distortion at each latitude.</>,
  },
};

const YOLOSlide = () => {
  const [activeBlock, setActiveBlock] = useState<string>('A² (×3)');

  const toggle = (key: string) => setActiveBlock(prev => prev === key ? '' : key);

  const info = activeBlock ? details[activeBlock] : null;

  return (
    <div className="slide">
      <div className="glow-amber-tr" style={{ opacity: 0.4 }} />

      <div className="slide-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'center' }}>
        {/* Left: arch diagram */}
        <div>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
            <div className="label-mono" style={{ marginBottom: 8 }}>YOLOv12 Architecture</div>
            <div className="glow-rule" style={{ marginBottom: 14 }} />
            <h2 className="h-section" style={{ fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)' }}>
              Pillar 1: The Right Architecture{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>for This Problem</span>
            </h2>
            <p className="body" style={{ fontSize: '1.15rem', marginTop: 8 }}>
              Tap any block to learn why we chose it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ padding: '20px', overflow: 'visible' }}
          >
            <svg viewBox="0 0 640 220" width="100%" style={{ overflow: 'visible' }}>
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="rgba(241,245,249,0.2)" />
                </marker>
              </defs>

              {/* Input — col 0 */}
              <ArchBlock label="Input" sublabel="1024×1024" color="#94A3B8" x={8} y={91} width={82} height={38}
                active={activeBlock === 'Input'} onClick={() => toggle('Input')} />
              <Arrow x1={90} y1={110} x2={112} y2={110} />

              {/* Backbone — col 1: x 112-204 */}
              <text x={158} y={16} textAnchor="middle" fill="rgba(20,184,166,0.7)" fontSize={8} fontFamily="var(--font-mono,monospace)" letterSpacing={2}>BACKBONE</text>
              <ArchBlock label="R-ELAN" sublabel="×4" color="#14B8A6" x={112} y={55} width={80} height={38}
                active={activeBlock === 'R-ELAN'} onClick={() => toggle('R-ELAN')} />
              <ArchBlock label="A² (×3)" sublabel="AreaAttn" color="#14B8A6" x={112} y={127} width={80} height={38}
                active={activeBlock === 'A² (×3)'} onClick={() => toggle('A² (×3)')} />

              <Arrow x1={192} y1={74} x2={218} y2={100} />
              <Arrow x1={192} y1={146} x2={218} y2={120} />

              {/* Neck — col 2: x 218-298 */}
              <text x={258} y={16} textAnchor="middle" fill="rgba(245,158,11,0.7)" fontSize={8} fontFamily="var(--font-mono,monospace)" letterSpacing={2}>NECK (PAN+BiFPN)</text>
              <ArchBlock label="AIFI" color="#F59E0B" x={218} y={55} width={76} height={38}
                active={activeBlock === 'AIFI'} onClick={() => toggle('AIFI')} />
              <ArchBlock label="RepC3" color="#F59E0B" x={218} y={127} width={76} height={38}
                active={activeBlock === 'RepC3'} onClick={() => toggle('AIFI')} />

              <Arrow x1={294} y1={74} x2={320} y2={60} />
              <Arrow x1={294} y1={74} x2={320} y2={110} color="rgba(245,158,11,0.2)" />
              <Arrow x1={294} y1={146} x2={320} y2={160} />
              <Arrow x1={294} y1={146} x2={320} y2={110} color="rgba(245,158,11,0.2)" />

              {/* Detection Heads — col 3: x 320-388 */}
              <text x={354} y={16} textAnchor="middle" fill="rgba(168,85,247,0.7)" fontSize={8} fontFamily="var(--font-mono,monospace)" letterSpacing={2}>DET. HEADS</text>
              <ArchBlock label="P3" sublabel="small" color="#a78bfa" x={320} y={44} width={64} height={32}
                active={activeBlock === 'P3/P4/P5'} onClick={() => toggle('P3/P4/P5')} />
              <ArchBlock label="P4" sublabel="medium" color="#a78bfa" x={320} y={94} width={64} height={32}
                active={activeBlock === 'P3/P4/P5'} onClick={() => toggle('P3/P4/P5')} />
              <ArchBlock label="P5" sublabel="large" color="#a78bfa" x={320} y={144} width={64} height={32}
                active={activeBlock === 'P3/P4/P5'} onClick={() => toggle('P3/P4/P5')} />

              <Arrow x1={384} y1={60} x2={412} y2={72} />
              <Arrow x1={384} y1={110} x2={412} y2={110} />
              <Arrow x1={384} y1={160} x2={412} y2={148} />

              {/* Outputs — col 4: x 412-544 */}
              <text x={480} y={16} textAnchor="middle" fill="rgba(34,197,94,0.7)" fontSize={8} fontFamily="var(--font-mono,monospace)" letterSpacing={2}>OUTPUTS</text>
              <ArchBlock label="Detection" sublabel="bbox+conf" color="#22C55E" x={412} y={55} width={100} height={34}
                active={activeBlock === 'Detection'} onClick={() => toggle('Detection')} />
              <ArchBlock label="Segmentation" sublabel="pixel mask" color="#22C55E" x={412} y={99} width={100} height={34}
                active={activeBlock === 'Segmentation'} onClick={() => toggle('Segmentation')} />
              <ArchBlock label="Classification" sublabel="label+score" color="#22C55E" x={412} y={143} width={100} height={34}
                active={activeBlock === 'Detection'} onClick={() => toggle('Detection')} />

              {/* Separator lines */}
              <line x1={206} y1={20} x2={206} y2={200} stroke="rgba(241,245,249,0.05)" strokeWidth={1} strokeDasharray="4 4" />
              <line x1={310} y1={20} x2={310} y2={200} stroke="rgba(241,245,249,0.05)" strokeWidth={1} strokeDasharray="4 4" />
              <line x1={402} y1={20} x2={402} y2={200} stroke="rgba(241,245,249,0.05)" strokeWidth={1} strokeDasharray="4 4" />
            </svg>
          </motion.div>
        </div>

        {/* Right: detail panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {info ? (
            <motion.div
              key={activeBlock}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
              style={{ padding: '24px', borderColor: 'var(--amber-border)' }}
            >
              <div className="label-mono" style={{ marginBottom: 10, fontSize: '0.9rem' }}>
                {activeBlock}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.2 }}>
                {info.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                {info.body}
              </p>
            </motion.div>
          ) : (
            <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0rem', color: 'var(--text-muted)' }}>← Tap a block</p>
            </div>
          )}

          {/* Key metrics */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <div className="label-mono" style={{ marginBottom: 14, fontSize: '0.88rem' }}>Why YOLOv12 over alternatives</div>
            {[
              { label: 'Traditional (Hough)', f1: 54, color: '#EF4444' },
              { label: 'Faster R-CNN', f1: 68, color: '#F59E0B' },
              { label: 'YOLOv8-seg', f1: 82, color: '#F59E0B' },
              { label: 'YOLOv12 base', f1: 85, color: '#14B8A6' },
              { label: 'YOLOv12 + Cascade', f1: 95, color: '#22C55E' },
            ].map(r => (
              <div key={r.label} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{r.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: r.color, fontWeight: 700 }}>{r.f1}%</span>
                </div>
                <div style={{ height: 3, background: 'var(--border)', borderRadius: 2 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.f1}%` }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: '100%', background: r.color, borderRadius: 2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YOLOSlide;
