import { QRCodeSVG } from 'qrcode.react';

const members = [
  { name: 'P Saranath',    url: 'https://www.linkedin.com/in/saranath-premkumar-594513200/' },
  { name: 'S Shriprasad',  url: 'https://www.linkedin.com/in/shriprasad-s-51723a240/' },
  { name: 'B Shruthi',     url: 'https://www.linkedin.com/in/shruthibalasubramanian/' },
];

const TeamQRs = ({ size = 80 }: { size?: number }) => (
  <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center' }}>
    {members.map(m => (
      <div key={m.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{
          padding: 6,
          background: '#fff',
          borderRadius: 10,
          lineHeight: 0,
          boxShadow: '0 0 16px rgba(245,158,11,0.2)',
        }}>
          <QRCodeSVG
            value={m.url}
            size={size}
            bgColor="#ffffff"
            fgColor="#04040A"
            level="M"
          />
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: '#94A3B8',
          fontWeight: 500,
          textAlign: 'center',
        }}>
          {m.name}
        </div>
      </div>
    ))}
  </div>
);

export default TeamQRs;
