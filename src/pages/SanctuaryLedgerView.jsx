/**
 * SanctuaryLedgerView.jsx
 * ─────────────────────────────────────────────────────────────
 * View: Wilderness & Cultural Trails with Active Climate Telemetry
 * Theme: Heritage Weaver (Textured Minimalism)
 * ─────────────────────────────────────────────────────────────
 */
import { useState } from 'react';

const SANCTUARIES = [
  {
    id: 's1',
    name: 'Kaziranga National Park',
    zone: 'Kohora / Bagori / Agaratoli',
    type: 'Wetland Grasslands',
    temp: '26°C',
    humidity: '78%',
    activity: 'High',
    telemetry: 'Water level stable. Rhino population concentration high in central range.',
    highlights: ['One-Horned Rhinoceros', 'Wild Water Buffalo', 'Asian Elephant'],
    color: '#3A6B4A',
  },
  {
    id: 's2',
    name: 'Manas Biosphere Reserve',
    zone: 'Bansbari / Bhuyanpara',
    type: 'Sub-Himalayan Forest',
    temp: '24°C',
    humidity: '82%',
    activity: 'Moderate',
    telemetry: 'Monsoon streams receding. Golden Langur sightings reported at forest edge.',
    highlights: ['Golden Langur', 'Assamese Roofed Turtle', 'Bengal Florican'],
    color: '#DCA134',
  },
  {
    id: 's3',
    name: 'Pobitora Wildlife Sanctuary',
    zone: 'Mayong range',
    type: 'Alluvial Grasslands',
    temp: '27°C',
    humidity: '80%',
    activity: 'Peak',
    telemetry: 'Jeep track dry. Highest density of rhinoceros active in western sector.',
    highlights: ['Indian Rhinoceros', 'Barking Deer', 'Dolphin Sightings'],
    color: '#C83232',
  },
];

export default function SanctuaryLedgerView() {
  const [activeSanctuary, setActiveSanctuary] = useState('s1');

  const selected = SANCTUARIES.find((s) => s.id === activeSanctuary);

  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}>
      {/* Page Header */}
      <section
        className="px-6 md:px-16 pt-16 pb-12"
        style={{ borderBottom: '1px solid var(--indigo-12)' }}
      >
        <p className="muted-label mb-3">Wilderness Ledger</p>
        <h1 className="section-heading mb-3">Sanctuaries & Trails</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--indigo-60)', lineHeight: 1.7 }}>
          Active ecological tracking and sanctuary guides across Assam’s river basins.
        </p>
      </section>

      <div className="geo-divider" />

      {/* Main Grid split */}
      <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12">
        {/* Left Side: Ledger List */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--indigo-30)', marginBottom: '0.5rem' }}>
            Telemetry Node List
          </p>
          {SANCTUARIES.map((s) => {
            const isActive = s.id === activeSanctuary;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSanctuary(s.id)}
                style={{
                  padding: '1.25rem',
                  border: '1px solid var(--indigo-12)',
                  borderLeft: isActive ? `2px solid ${s.color}` : '2px solid transparent',
                  backgroundColor: isActive ? 'var(--cream)' : 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '0',
                  transition: 'all 0.25s ease-out',
                }}
              >
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--indigo)' }}>
                  {s.name}
                </h4>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: 'var(--indigo-60)', marginTop: '2px' }}>
                  {s.zone}
                </p>
              </button>
            );
          })}
        </aside>

        {/* Right Side: Active Telemetry Data Block */}
        <main
          style={{
            backgroundColor: 'var(--cream)',
            border: '1px solid var(--indigo)',
            padding: '2.5rem 2rem',
            position: 'relative',
          }}
        >
          {/* Accent strip */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: selected.color }} />

          <p className="muted-label mb-2">Live Sanctuary Telemetry</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: 'var(--indigo)', marginBottom: '1.5rem' }}>
            {selected.name}
          </h2>

          {/* Metric row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div style={{ backgroundColor: 'var(--bone)', border: '1px solid var(--indigo-12)', padding: '1rem' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--indigo-30)' }}>Ambient Temperature</span>
              <p style={{ fontFamily: "'Inter', monospace", fontSize: '1.5rem', fontWeight: 600, color: 'var(--indigo)', marginTop: '4px' }}>{selected.temp}</p>
            </div>
            <div style={{ backgroundColor: 'var(--bone)', border: '1px solid var(--indigo-12)', padding: '1rem' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--indigo-30)' }}>Relative Humidity</span>
              <p style={{ fontFamily: "'Inter', monospace", fontSize: '1.5rem', fontWeight: 600, color: 'var(--indigo)', marginTop: '4px' }}>{selected.humidity}</p>
            </div>
            <div style={{ backgroundColor: 'var(--bone)', border: '1px solid var(--indigo-12)', padding: '1rem' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--indigo-30)' }}>Animal Activity Index</span>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.25rem', fontWeight: 600, color: selected.color, marginTop: '8px' }}>{selected.activity.toUpperCase()}</p>
            </div>
          </div>

          {/* Telemetry log */}
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--indigo-30)' }}>Telemetry Log</span>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--indigo)', lineHeight: 1.7, marginTop: '6px' }}>
              {selected.telemetry}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--indigo-30)', display: 'block', marginBottom: '0.5rem' }}>Core Wildlife Indicators</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selected.highlights.map((h) => (
                <span key={h} className="tag-badge">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>

      <div className="geo-divider" />
    </div>
  );
}
