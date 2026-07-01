import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { circuitsData, exportItinerary } from '../data/mockData';

const ALL_DESTINATIONS = Object.values(circuitsData).flatMap(c => c.days);

export default function Planner() {
  const { state, setCircuit, addDay, removeDay, reorderDays, notify } = useApp();
  const [dragIndex, setDragIndex] = useState(null);
  const [selectedDest, setSelectedDest] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const circuit = circuitsData[state.activeCircuit];

  const handleMoveUp   = (idx) => { if (idx > 0) reorderDays(idx, idx - 1); };
  const handleMoveDown = (idx) => { if (idx < state.itinerary.length - 1) reorderDays(idx, idx + 1); };

  const handleAddDay = () => {
    if (!selectedDest) return;
    const dest = ALL_DESTINATIONS.find(d => d.id === selectedDest);
    if (dest) {
      addDay({ place: dest.place, activity: dest.activity, icon: dest.icon });
      setSelectedDest('');
      notify(`${dest.place} added to Day ${state.itinerary.length + 1}`);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportItinerary(state.itinerary, state.user);
      notify('Itinerary exported as JSON!');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDragStart = (idx) => setDragIndex(idx);
  const handleDragOver  = (e, idx) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== idx) {
      reorderDays(dragIndex, idx);
      setDragIndex(idx);
    }
  };
  const handleDragEnd = () => setDragIndex(null);

  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}>

      {/* ── Page Header ───────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pt-16 pb-12"
        style={{ borderBottom: '1px solid var(--indigo-12)' }}
      >
        <p className="muted-label mb-3">Build Your Journey</p>
        <h1 className="section-heading mb-3">Route Planner</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--indigo-60)', lineHeight: 1.7 }}>
          Build, reorder, and export your custom day-by-day Assam journey
        </p>
      </section>

      <div className="geo-divider" />

      <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

          {/* ── Left: Config Panel ─────────────────────────── */}
          <aside className="space-y-5">

            {/* Circuit selector */}
            <div
              style={{
                border: '1px solid var(--indigo-12)',
                borderRadius: '2px',
                backgroundColor: 'var(--cream)',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--indigo-12)' }}>
                <p className="muted-label">Select Circuit</p>
              </div>
              <div style={{ padding: '0.5rem' }}>
                {Object.entries(circuitsData).map(([key, c]) => {
                  const isActive = state.activeCircuit === key;
                  return (
                    <button
                      key={key}
                      onClick={() => { setCircuit(key); notify(`Loaded ${c.name}`); }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 0.875rem',
                        border: 'none',
                        borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                        borderRadius: '2px',
                        backgroundColor: isActive ? 'var(--bone)' : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease-out',
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(249,248,246,0.6)'; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{c.icon}</span>
                      <div>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.825rem',
                          fontWeight: isActive ? 600 : 400,
                          color: 'var(--indigo)',
                        }}>
                          {c.name}
                        </p>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.7rem',
                          color: 'var(--indigo-60)',
                        }}>
                          {c.vibe}
                        </p>
                      </div>
                      {isActive && (
                        <span style={{ marginLeft: 'auto', color: 'var(--gold)', fontSize: '0.6rem' }}>◆</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add destination */}
            <div
              style={{
                border: '1px solid var(--indigo-12)',
                borderRadius: '2px',
                backgroundColor: 'var(--cream)',
                padding: '1.25rem',
              }}
            >
              <p className="muted-label mb-3">Add Destination</p>
              <select
                value={selectedDest}
                onChange={e => setSelectedDest(e.target.value)}
                className="heritage-input mb-3"
                style={{ backgroundColor: 'var(--bone)' }}
              >
                <option value="">— Choose a destination —</option>
                {ALL_DESTINATIONS.map(d => (
                  <option key={d.id} value={d.id}>{d.place}</option>
                ))}
              </select>
              <button
                onClick={handleAddDay}
                disabled={!selectedDest}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                + Add Day
              </button>
            </div>

            {/* Export */}
            <button
              onClick={handleExport}
              disabled={isExporting || state.itinerary.length === 0}
              className="btn-outline"
              style={{ width: '100%', padding: '0.75rem 1.25rem' }}
            >
              {isExporting ? 'Exporting…' : 'Export Itinerary (JSON)'}
            </button>

          </aside>

          {/* ── Right: Timeline Canvas ─────────────────────── */}
          <div
            style={{
              border: '1px solid var(--indigo-12)',
              borderRadius: '2px',
              backgroundColor: 'var(--bone)',
              overflow: 'hidden',
            }}
          >
            {/* Timeline header */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--indigo-12)',
                backgroundColor: 'var(--cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--indigo)',
                  letterSpacing: '0.02em',
                }}>
                  {circuit.icon} {circuit.name}
                </h2>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.72rem',
                  color: 'var(--indigo-60)',
                  marginTop: '2px',
                }}>
                  {circuit.vibe}
                </p>
              </div>
              <span className="tag-badge">{state.itinerary.length} Days</span>
            </div>

            <div className="geo-divider" />

            {/* Timeline body */}
            <div style={{ padding: '1.5rem' }}>
              {state.itinerary.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '5rem 1rem',
                  color: 'var(--indigo-30)',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>◇</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: 'var(--indigo-60)' }}>
                    Your journey awaits
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--indigo-30)', marginTop: '0.5rem' }}>
                    Select a circuit or add destinations to begin
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {state.itinerary.map((day, idx) => (
                    <div
                      key={day.id}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={e => handleDragOver(e, idx)}
                      onDragEnd={handleDragEnd}
                      className="group stagger-item"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.875rem 1rem',
                        border: '1px solid',
                        borderLeft: '3px solid',
                        borderColor: dragIndex === idx ? 'var(--gold)' : 'var(--indigo-12)',
                        borderLeftColor: dragIndex === idx ? 'var(--gold)' : 'var(--indigo-12)',
                        borderRadius: '2px',
                        backgroundColor: dragIndex === idx ? 'var(--cream)' : 'transparent',
                        cursor: 'grab',
                        transition: 'all 0.2s ease-out',
                        animationDelay: `${idx * 0.06}s`,
                      }}
                      onMouseEnter={e => {
                        if (dragIndex === null) {
                          e.currentTarget.style.borderLeftColor = 'var(--gold)';
                          e.currentTarget.style.backgroundColor = 'var(--indigo-06)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (dragIndex === null) {
                          e.currentTarget.style.borderLeftColor = 'var(--indigo-12)';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {/* Day number */}
                      <div style={{
                        flexShrink: 0,
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'var(--indigo)',
                        color: 'var(--bone)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        borderRadius: '2px',
                      }}>
                        {day.day}
                      </div>

                      {/* Icon */}
                      <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{day.icon}</span>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: 'var(--indigo)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {day.place}
                        </p>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.72rem',
                          color: 'var(--indigo-60)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {day.activity}
                        </p>
                      </div>

                      {/* Controls — reveal on hover */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button
                          onClick={() => handleMoveUp(idx)}
                          disabled={idx === 0}
                          style={{
                            width: '26px',
                            height: '26px',
                            border: '1px solid var(--indigo-12)',
                            borderRadius: '2px',
                            backgroundColor: 'transparent',
                            color: 'var(--indigo-60)',
                            fontSize: '0.75rem',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            opacity: idx === 0 ? 0.3 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                        >↑</button>
                        <button
                          onClick={() => handleMoveDown(idx)}
                          disabled={idx === state.itinerary.length - 1}
                          style={{
                            width: '26px',
                            height: '26px',
                            border: '1px solid var(--indigo-12)',
                            borderRadius: '2px',
                            backgroundColor: 'transparent',
                            color: 'var(--indigo-60)',
                            fontSize: '0.75rem',
                            cursor: idx === state.itinerary.length - 1 ? 'not-allowed' : 'pointer',
                            opacity: idx === state.itinerary.length - 1 ? 0.3 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                        >↓</button>
                        <button
                          onClick={() => { removeDay(day.id); notify(`Removed ${day.place}`); }}
                          style={{
                            width: '26px',
                            height: '26px',
                            border: '1px solid var(--red-accent)',
                            borderRadius: '2px',
                            backgroundColor: 'transparent',
                            color: 'var(--red-accent)',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                        >✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="geo-divider" />
    </div>
  );
}
