/**
 * TeaHeritageView.jsx
 * ─────────────────────────────────────────────────────────────
 * View: Tea Estate Explorer & Molecular Flush Calculator
 * Theme: Heritage Weaver (Textured Minimalism)
 * ─────────────────────────────────────────────────────────────
 */
import TeaHeritageExplorer from '../components/TeaHeritageExplorer';
import TeaMolecularCalculator from '../components/TeaMolecularCalculator';

export default function TeaHeritageView() {
  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}>
      {/* Dynamic Split-Screen Explorer */}
      <TeaHeritageExplorer />

      {/* Visual Interstitial Banner */}
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
            <rect x="3" y="3" width="18" height="18" stroke="var(--gold)" strokeWidth="1" />
            <circle cx="12" cy="12" r="3" fill="var(--gold)" />
          </svg>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.2rem' }}>
              Chemical & Terroir Analysis
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--bone)', letterSpacing: '0.05em' }}>
              Molecular Chemistry Matrix
            </p>
          </div>
        </div>
      </div>

      {/* Chemical Molecular Calculator */}
      <TeaMolecularCalculator />
    </div>
  );
}
