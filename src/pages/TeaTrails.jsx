/**
 * TeaTrails.jsx
 * ─────────────────────────────────────────────────────────────
 * Discovery Hub for Assam Tea Heritage, combining:
 *   1. TeaHeritageExplorer (Interactive split-screen trail catalog)
 *   2. TeaMolecularCalculator (Science & Terroir chemical mapper)
 *
 * Registered as route id "tea-trails" in App.jsx
 * ─────────────────────────────────────────────────────────────
 */
import TeaHeritageExplorer   from '../components/TeaHeritageExplorer';
import TeaMolecularCalculator from '../components/TeaMolecularCalculator';

export default function TeaTrails() {
  return (
    <div style={{ backgroundColor: 'var(--bone)' }}>
      {/* ── Section 1: Interactive Estate Bungalow Explorer ──── */}
      <TeaHeritageExplorer />

      {/* ── Visual Section Break ──────────────────────────── */}
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
          {/* Gold cross/diamond separator */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" stroke="var(--gold)" strokeWidth="1" />
            <line x1="12" y1="3" x2="12" y2="21" stroke="var(--gold)" strokeWidth="0.6" opacity="0.6" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="var(--gold)" strokeWidth="0.6" opacity="0.6" />
            <circle cx="12" cy="12" r="3" fill="var(--gold)" />
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
              Chemical & Terroir Analysis
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--bone)',
              letterSpacing: '0.05em',
            }}>
              Flush-to-Cup Science
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
          Tracking molecular transitions, caffeine indexes, and processing step variations across seasons
        </p>
      </div>

      {/* ── Section 2: Molecular Science Calculator ──────────── */}
      <TeaMolecularCalculator />
    </div>
  );
}
