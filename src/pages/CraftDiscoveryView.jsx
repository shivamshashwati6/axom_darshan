/**
 * CraftDiscoveryView.jsx
 * ─────────────────────────────────────────────────────────────
 * View: The Heritage Fabric Grid & Maker Connection
 * Theme: Heritage Weaver (Textured Minimalism)
 * ─────────────────────────────────────────────────────────────
 */
import HeritageDiscoveryGrid from '../components/HeritageDiscoveryGrid';
import HeritageFabricGrid from '../components/HeritageFabricGrid';

export default function CraftDiscoveryView({ onNavigate }) {
  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}>
      {/* Places and regional grids */}
      <HeritageDiscoveryGrid onNavigate={onNavigate} />

      <div
        style={{
          borderTop: '1px solid var(--indigo-12)',
          borderBottom: '1px solid var(--indigo-12)',
          padding: '1.5rem 4rem',
          backgroundColor: 'var(--indigo)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,12 12,22 2,12" stroke="var(--gold)" strokeWidth="1" />
            <circle cx="12" cy="12" r="2" fill="var(--gold)" />
          </svg>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.2rem' }}>
              Weaver Connection
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--bone)', letterSpacing: '0.05em' }}>
              Artisanal Handloom Cooperatives
            </p>
          </div>
        </div>
      </div>

      {/* Fabric grid mapping active clusters */}
      <HeritageFabricGrid />
    </div>
  );
}
