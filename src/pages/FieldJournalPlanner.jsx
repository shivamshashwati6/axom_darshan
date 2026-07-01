/**
 * FieldJournalPlanner.jsx
 * ─────────────────────────────────────────────────────────────
 * View: Field Notebook & Itinerary Builder
 * Theme: Heritage Weaver (Textured Minimalism)
 * ─────────────────────────────────────────────────────────────
 */
import Planner from './Planner';

const ETIQUETTE = [
  { topic: 'Namghar Entry', rules: 'Remove leather shoes at the threshold. Avoid photography inside the inner sanctum.' },
  { topic: 'Handloom Gamosa', rules: 'Receive with both hands. Worn around the neck during Bihu greeting rituals.' },
  { topic: 'Wildlife Trails', rules: 'Observe silent distance. Avoid high contrast or glowing items in Kaziranga buffer tracks.' },
];

export default function FieldJournalPlanner() {
  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}>
      {/* Route Planner Component */}
      <Planner />

      {/* Interstitial Banner */}
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
              Cultural Protocol
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--bone)', letterSpacing: '0.05em' }}>
              Assam Field Etiquette
            </p>
          </div>
        </div>
      </div>

      {/* Etiquette Charts */}
      <section className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
        <p className="muted-label mb-2">Field Annotations</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600, color: 'var(--indigo)', marginBottom: '1.5rem' }}>
          Traditional Protocols
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ETIQUETTE.map((e) => (
            <div
              key={e.topic}
              style={{
                backgroundColor: 'var(--cream)',
                border: '1px solid var(--indigo-12)',
                padding: '1.25rem',
              }}
            >
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--indigo)', marginBottom: '0.5rem' }}>
                ◆ {e.topic}
              </h4>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'var(--indigo-60)', lineHeight: 1.6 }}>
                {e.rules}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="geo-divider" />
    </div>
  );
}
