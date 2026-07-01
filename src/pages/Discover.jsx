/**
 * Discover.jsx
 * ─────────────────────────────────────────────────────────────
 * Comprehensive discovery hub combining two complementary sections:
 *   1. HeritageDiscoveryGrid — 9 regional destinations
 *   2. HeritageFabricGrid   — 8 artisanal weaver clusters
 *
 * Registered as route id "discover" in App.jsx
 * ─────────────────────────────────────────────────────────────
 */
import HeritageDiscoveryGrid from '../components/HeritageDiscoveryGrid';
import HeritageFabricGrid   from '../components/HeritageFabricGrid';

export default function Discover({ onNavigate }) {
  return (
    <div style={{ backgroundColor: 'var(--bone)' }}>
      {/* ── Section 1: Regional Destination Grid ─────────── */}
      <HeritageDiscoveryGrid onNavigate={onNavigate} />

      {/* ── Visual break between sections ─────────────────── */}
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
          {/* Gold diamond motif separator */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,12 12,22 2,12" stroke="var(--gold)" strokeWidth="1" />
            <polygon points="12,7 17,12 12,17 7,12" stroke="var(--gold)" strokeWidth="0.6" opacity="0.6" />
            <circle cx="12" cy="12" r="2" fill="var(--gold)" />
          </svg>
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '0.2rem',
              opacity: 0.8,
            }}>
              Part Two
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--bone)',
              letterSpacing: '0.05em',
            }}>
              Connect with the Makers
            </p>
          </div>
        </div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.75rem',
          color: 'rgba(249,248,246,0.5)',
          letterSpacing: '0.05em',
          maxWidth: '340px',
        }}>
          Eight active weaver guilds &amp; artisan cooperatives — mapped by motif, material, and coordinate
        </p>
      </div>

      {/* ── Section 2: Artisan Weaver Connection Grid ──────── */}
      <HeritageFabricGrid />
    </div>
  );
}
