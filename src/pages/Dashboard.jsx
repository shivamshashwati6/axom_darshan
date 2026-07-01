import { useApp } from '../context/AppContext';
import { circuitsData, ecoPartnersData, communityReviews } from '../data/mockData';

const pillars = [
  {
    icon: '🦏',
    label: 'Wildlife',
    title: 'Wildlife Sanctuaries',
    desc: 'One-horned rhinos, tigers, and river dolphins across Kaziranga, Manas & Pobitora.',
  },
  {
    icon: '🏛️',
    label: 'Heritage',
    title: 'Ahom Heritage',
    desc: 'Magnificent palace ruins, Rang Ghar amphitheatres, and 600-year-old Ahom kingdom relics.',
  },
  {
    icon: '🧵',
    label: 'Craft',
    title: 'Living Craft Traditions',
    desc: 'Muga silk, bamboo craft, mask-making, and hand-loomed textiles from village artisans.',
  },
  {
    icon: '🌿',
    label: 'Eco',
    title: 'Eco & Community Tourism',
    desc: 'Responsible travel through tribal villages, organic homestays, and conservation projects.',
  },
];

export default function Dashboard({ onNavigate }) {
  const { state, setCircuit } = useApp();

  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}>

      {/* ── Hero Section ──────────────────────────────────── */}
      <section
        className="relative px-6 md:px-16 pt-24 pb-20 text-center overflow-hidden"
        style={{ borderBottom: '1px solid var(--indigo-12)' }}
      >
        {/* Faint geometric background textile texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='none'/%3E%3Cline x1='0' y1='40' x2='20' y2='0' stroke='%231A2E40' stroke-width='0.5' stroke-opacity='0.04'/%3E%3Cline x1='20' y1='0' x2='40' y2='40' stroke='%231A2E40' stroke-width='0.5' stroke-opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            pointerEvents: 'none',
          }}
        />

        {/* Kicker */}
        <p
          className="muted-label mb-6"
          style={{ position: 'relative' }}
        >
          Discover · Experience · Preserve
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 300,
            color: 'var(--indigo)',
            letterSpacing: '0.06em',
            lineHeight: 1.0,
            marginBottom: '1.5rem',
            position: 'relative',
          }}
        >
          Axom Darshan
        </h1>

        {/* Gold rule */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', position: 'relative' }}>
          <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--gold)' }} />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="var(--gold)" />
          </svg>
          <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--gold)' }} />
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: 'var(--indigo-60)',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
            position: 'relative',
          }}
        >
          An immersive gateway to Northeast India's last great wilderness — where ancient kingdoms,
          living craft traditions, and biodiversity converge on the banks of the Brahmaputra.
        </p>

        <div className="flex flex-wrap justify-center gap-4" style={{ position: 'relative' }}>
          <button onClick={() => onNavigate('planner')} className="btn-primary">
            Begin Your Journey
          </button>
          <button onClick={() => onNavigate('artisans')} className="btn-outline">
            Meet the Artisans
          </button>
        </div>
      </section>

      {/* ── Geo Divider ───────────────────────────────────── */}
      <div className="geo-divider" />

      <div className="px-6 md:px-16 py-20 max-w-7xl mx-auto space-y-24">

        {/* ── Four Pillars ────────────────────────────────── */}
        <section>
          <div className="mb-10">
            <p className="muted-label mb-3">What Assam Offers</p>
            <h2 className="section-heading">Four Pillars of Assam</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--indigo-60)', marginTop: '0.5rem', lineHeight: 1.7 }}>
              Explore the dimensions that make Assam a singular destination
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0" style={{ border: '1px solid var(--indigo-12)' }}>
            {pillars.map((p, idx) => (
              <div
                key={p.title}
                className="stagger-item"
                style={{
                  padding: '2rem 1.5rem',
                  borderRight: idx < 3 ? '1px solid var(--indigo-12)' : 'none',
                  borderTop: '3px solid transparent',
                  transition: 'border-top-color 0.3s ease-out, background-color 0.3s ease-out',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderTopColor = 'var(--gold)';
                  e.currentTarget.style.backgroundColor = 'var(--cream)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderTopColor = 'transparent';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{p.icon}</div>
                <p className="muted-label mb-2">{p.label}</p>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--indigo)',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.02em',
                }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--indigo-60)', lineHeight: 1.7 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Geo Divider ─────────────────────────────────── */}
        <div className="geo-divider-gold" style={{ marginTop: '-4rem', marginBottom: '-4rem' }} />

        {/* ── Featured Circuits ────────────────────────────── */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="muted-label mb-3">Curated Routes</p>
              <h2 className="section-heading">Featured Circuits</h2>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--indigo-60)' }}>
              Select a circuit to pre-load in the Planner →
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Object.entries(circuitsData).map(([key, circuit], idx) => {
              const isActive = state.activeCircuit === key;
              return (
                <div
                  key={key}
                  className="stagger-item"
                  onClick={() => { setCircuit(key); onNavigate('planner'); }}
                  style={{
                    padding: '1.75rem',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--gold)' : 'var(--indigo-12)',
                    borderTop: isActive ? '2px solid var(--gold)' : '2px solid var(--indigo-12)',
                    backgroundColor: isActive ? 'var(--cream)' : 'var(--bone)',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease-out',
                    animationDelay: `${idx * 0.1}s`,
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--indigo-30)';
                      e.currentTarget.style.backgroundColor = 'var(--cream)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--indigo-12)';
                      e.currentTarget.style.backgroundColor = 'var(--bone)';
                    }
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{circuit.icon}</div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--indigo)',
                    marginBottom: '0.375rem',
                    letterSpacing: '0.02em',
                  }}>
                    {circuit.name}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'var(--indigo-60)', marginBottom: '0.875rem' }}>
                    {circuit.vibe}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="tag-badge">{circuit.days.length} days</span>
                    {isActive && (
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: 'var(--gold)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}>
                        ◆ Active
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Eco Partners ────────────────────────────────── */}
        <section>
          <div className="mb-10">
            <p className="muted-label mb-3">Responsible Travel</p>
            <h2 className="section-heading">Green Travel Partners</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--indigo-60)', marginTop: '0.5rem' }}>
              Verified eco-certified operators, accommodations, and artisan initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ecoPartnersData.map((p, idx) => (
              <div
                key={p.id}
                className="stagger-item bone-card"
                style={{ padding: '1.5rem', animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--indigo)',
                    letterSpacing: '0.02em',
                    lineHeight: 1.3,
                  }}>
                    {p.name}
                  </h4>
                  <span className="tag-badge" style={{ flexShrink: 0 }}>{p.type}</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--indigo-60)', marginBottom: '1rem', lineHeight: 1.7 }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.badges.map(b => (
                    <span key={b.name} className="tag-badge">✓ {b.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ────────────────────────────────── */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="muted-label mb-3">From the Field</p>
              <h2 className="section-heading">Traveler Stories</h2>
            </div>
            <button
              onClick={() => onNavigate('community')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                color: 'var(--gold)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              View all →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {communityReviews.slice(0, 3).map((r, idx) => (
              <div
                key={r.id}
                className="stagger-item heritage-card card-accent-top"
                style={{ padding: '1.5rem', animationDelay: `${idx * 0.1}s` }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="var(--gold)">
                      <path d="M6 0l1.5 4.5H12L8.5 7.5l1.5 4.5L6 9l-4 3 1.5-4.5L0 4.5h4.5Z"/>
                    </svg>
                  ))}
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  color: 'var(--indigo)',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem',
                }}>
                  "{r.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '2px',
                    backgroundColor: 'var(--indigo)',
                    color: 'var(--bone)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    flexShrink: 0,
                  }}>
                    {r.avatar}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'var(--indigo)' }}>
                      {r.user}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'var(--indigo-60)' }}>
                      {r.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Bottom Geo Strip ──────────────────────────────── */}
      <div className="geo-divider" />
    </div>
  );
}
