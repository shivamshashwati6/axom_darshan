import { useState, useEffect } from 'react';
import { fetchLocalEvents } from '../data/mockData';

const CATEGORIES = ['all', 'festival', 'cultural', 'pilgrimage', 'music'];

const CAT_STYLES = {
  festival:   { color: 'var(--gold)',        bg: 'rgba(220,161,52,0.08)',  border: 'var(--gold)' },
  cultural:   { color: 'var(--indigo)',      bg: 'var(--cream)',           border: 'var(--indigo-30)' },
  pilgrimage: { color: 'var(--red-accent)',  bg: 'rgba(200,50,50,0.06)',   border: 'var(--red-accent)' },
  music:      { color: '#3A6B4A',            bg: 'rgba(58,107,74,0.07)',   border: '#3A6B4A' },
};

function CategoryDot({ category }) {
  const style = CAT_STYLES[category] || CAT_STYLES.cultural;
  return (
    <span style={{
      display: 'inline-block',
      width: '8px',
      height: '8px',
      backgroundColor: style.color,
      borderRadius: '50%',
      flexShrink: 0,
    }} />
  );
}

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLocalEvents().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'all' ? events : events.filter(e => e.category === filter);

  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}>

      {/* ── Page Header ───────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pt-16 pb-12"
        style={{ borderBottom: '1px solid var(--indigo-12)' }}
      >
        <p className="muted-label mb-3">Events & Festivals</p>
        <h1 className="section-heading mb-3">Cultural Calendar</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--indigo-60)', lineHeight: 1.7 }}>
          Festivals, pilgrimages, and live events across Assam — updated in real-time
        </p>
      </section>

      <div className="geo-divider" />

      <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">

        {/* Category filters + count */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-pill ${filter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
          <span style={{
            marginLeft: 'auto',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            color: 'var(--indigo-60)',
            letterSpacing: '0.05em',
          }}>
            {filtered.length} events
          </span>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="skeleton"
                style={{ height: '180px', animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((event, idx) => {
              const catStyle = CAT_STYLES[event.category] || CAT_STYLES.cultural;
              return (
                <div
                  key={event.id}
                  className="stagger-item"
                  style={{
                    border: '1px solid var(--indigo-12)',
                    borderTop: `2px solid ${catStyle.border}`,
                    borderRadius: '2px',
                    backgroundColor: 'var(--bone)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.875rem',
                    animationDelay: `${idx * 0.07}s`,
                    transition: 'border-color 0.3s ease-out, background-color 0.3s ease-out',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'var(--cream)';
                    e.currentTarget.style.borderColor = 'var(--indigo-30)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'var(--bone)';
                    e.currentTarget.style.borderColor = 'var(--indigo-12)';
                  }}
                >
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: 'var(--indigo)',
                      letterSpacing: '0.02em',
                      lineHeight: 1.3,
                    }}>
                      {event.name}
                    </h3>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '0.2rem 0.5rem',
                      backgroundColor: catStyle.bg,
                      border: `1px solid ${catStyle.border}`,
                      borderRadius: '2px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: catStyle.color,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      flexShrink: 0,
                    }}>
                      <CategoryDot category={event.category} />
                      {event.category}
                    </span>
                  </div>

                  {/* Meta */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--indigo-60)', letterSpacing: '0.03em' }}>
                      {event.date}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--indigo-60)', letterSpacing: '0.03em' }}>
                      ◆ {event.location}
                    </p>
                  </div>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--indigo-60)', lineHeight: 1.7, flex: 1 }}>
                    {event.description}
                  </p>

                  <button
                    className="btn-outline"
                    style={{ fontSize: '0.72rem', padding: '0.4rem 0.875rem' }}
                  >
                    Add to Itinerary →
                  </button>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div
                className="col-span-3"
                style={{
                  textAlign: 'center',
                  padding: '5rem 1rem',
                  color: 'var(--indigo-30)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--indigo-30)' }}>◇</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: 'var(--indigo-60)' }}>
                  No events in this category
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="geo-divider" />
    </div>
  );
}
