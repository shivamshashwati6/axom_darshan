import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { artisansData, submitWorkshopBooking } from '../data/mockData';

const CRAFT_ICONS = {
  'Muga Silk Weaving':  { icon: '🧵', accent: 'var(--gold)' },
  'Bamboo & Cane Craft':{ icon: '🎋', accent: 'var(--indigo)' },
  default:              { icon: '🎭', accent: 'var(--red-accent)' },
};

export default function Artisans() {
  const { state, bookWorkshop, cancelWorkshop, notify } = useApp();
  const [bookingLoading, setBookingLoading] = useState(null);

  const isBooked = (wsId) => state.bookedWorkshops.some(b => b.workshopId === wsId);

  const handleBook = async (artisan, ws) => {
    if (isBooked(ws.id)) {
      cancelWorkshop(ws.id);
      notify(`Cancelled: ${ws.title}`, 'info');
      return;
    }
    setBookingLoading(ws.id);
    try {
      const result = await submitWorkshopBooking({
        workshopId: ws.id,
        workshopTitle: ws.title,
        artisan: artisan.name,
        price: ws.price,
      });
      if (result.success) {
        bookWorkshop({ workshopId: ws.id, workshopTitle: ws.title, artisan: artisan.name, bookingId: result.bookingId });
        notify(`${result.message}`, 'success');
      }
    } finally {
      setBookingLoading(null);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}>

      {/* ── Page Header ───────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pt-16 pb-12"
        style={{ borderBottom: '1px solid var(--indigo-12)' }}
      >
        <p className="muted-label mb-3">Living Heritage</p>
        <h1 className="section-heading mb-3">Artisan Trails</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--indigo-60)', lineHeight: 1.7 }}>
          Discover master craftspeople and book immersive hands-on workshops
        </p>
      </section>

      <div className="geo-divider" />

      <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">

        {/* Bookings summary bar */}
        {state.bookedWorkshops.length > 0 && (
          <div
            className="flex flex-wrap items-center gap-3 mb-10 p-5 fade-in"
            style={{
              backgroundColor: 'var(--cream)',
              border: '1px solid var(--indigo-12)',
              borderLeft: '3px solid var(--gold)',
              borderRadius: '2px',
            }}
          >
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--indigo)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              {state.bookedWorkshops.length} workshop{state.bookedWorkshops.length > 1 ? 's' : ''} booked
            </span>
            <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--indigo-12)' }} />
            {state.bookedWorkshops.map(b => (
              <span key={b.workshopId} className="tag-gold">{b.workshopTitle}</span>
            ))}
          </div>
        )}

        {/* ── Artisan Grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisansData.map((artisan, idx) => {
            const craftMeta = CRAFT_ICONS[artisan.craft] || CRAFT_ICONS.default;
            return (
              <div
                key={artisan.id}
                className="stagger-item flex flex-col"
                style={{
                  border: '1px solid var(--indigo-12)',
                  borderRadius: '2px',
                  backgroundColor: 'var(--bone)',
                  overflow: 'hidden',
                  animationDelay: `${idx * 0.1}s`,
                  transition: 'border-color 0.3s ease-out',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--indigo-30)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--indigo-12)'}
              >
                {/* Avatar band */}
                <div
                  style={{
                    height: '120px',
                    backgroundColor: 'var(--cream)',
                    borderBottom: `2px solid ${craftMeta.accent}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem',
                  }}
                >
                  <div style={{ fontSize: '3rem' }}>{craftMeta.icon}</div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.375rem',
                      fontWeight: 600,
                      color: 'var(--indigo)',
                      lineHeight: 1.1,
                      letterSpacing: '0.02em',
                    }}>
                      {artisan.name}
                    </p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.72rem',
                      color: craftMeta.accent,
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginTop: '4px',
                    }}>
                      {artisan.craft}
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col" style={{ padding: '1.25rem 1.5rem' }}>
                  {/* Location */}
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    color: 'var(--indigo-60)',
                    marginBottom: '0.875rem',
                    letterSpacing: '0.04em',
                  }}>
                    ◆ {artisan.location}
                  </p>

                  {/* Bio */}
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                    color: 'var(--indigo-60)',
                    lineHeight: 1.7,
                    marginBottom: '1rem',
                  }}>
                    {artisan.bio}
                  </p>

                  {/* Craft badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {artisan.badges.map(b => (
                      <span key={b} className="tag-badge">✓ {b}</span>
                    ))}
                  </div>

                  {/* Workshops */}
                  <div className="mt-auto">
                    <p className="muted-label mb-3">Available Workshops</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {artisan.workshops.map(ws => {
                        const booked = isBooked(ws.id);
                        return (
                          <div
                            key={ws.id}
                            style={{
                              border: '1px solid',
                              borderColor: booked ? 'var(--gold)' : 'var(--indigo-12)',
                              borderLeft: booked ? '2px solid var(--gold)' : '2px solid var(--indigo-12)',
                              borderRadius: '2px',
                              padding: '0.75rem',
                              backgroundColor: booked ? 'rgba(220,161,52,0.06)' : 'transparent',
                              transition: 'all 0.25s ease-out',
                            }}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <p style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: '0.8rem',
                                  fontWeight: 600,
                                  color: 'var(--indigo)',
                                }}>
                                  {ws.title}
                                </p>
                                <p style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: '0.7rem',
                                  color: 'var(--indigo-60)',
                                  marginTop: '2px',
                                }}>
                                  {ws.duration} · {ws.spots} spots
                                </p>
                              </div>
                              <span style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: 'var(--indigo)',
                                flexShrink: 0,
                              }}>
                                ₹{ws.price.toLocaleString()}
                              </span>
                            </div>
                            <button
                              onClick={() => handleBook(artisan, ws)}
                              disabled={bookingLoading === ws.id}
                              style={{
                                width: '100%',
                                padding: '0.4rem 0',
                                border: '1px solid',
                                borderColor: booked ? 'var(--red-accent)' : 'var(--indigo)',
                                borderRadius: '2px',
                                backgroundColor: booked ? 'transparent' : 'var(--indigo)',
                                color: booked ? 'var(--red-accent)' : 'var(--bone)',
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                letterSpacing: '0.07em',
                                textTransform: 'uppercase',
                                cursor: bookingLoading === ws.id ? 'not-allowed' : 'pointer',
                                opacity: bookingLoading === ws.id ? 0.5 : 1,
                                transition: 'all 0.25s ease-out',
                              }}
                            >
                              {bookingLoading === ws.id ? 'Booking…' : booked ? 'Cancel Booking' : 'Book Workshop'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="geo-divider" />
    </div>
  );
}
