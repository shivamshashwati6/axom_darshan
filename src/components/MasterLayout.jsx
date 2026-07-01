import { useState } from 'react';
import { useApp } from '../context/AppContext';


const navItems = [
  { id: 'dashboard', label: 'CRUISE' },
  { id: 'fabric',    label: 'FABRIC GRID' },
  { id: 'tea',       label: 'TEA TRAILS' },
  { id: 'sanctuary', label: 'WILDERNESS LEDGER' },
  { id: 'planner',   label: 'FIELD PLANNER' },
];

export default function MasterLayout({ currentPage, onNavigate, children }) {
  const { state } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bone)', color: 'var(--indigo)' }}>

      {/* ── Top Navigation Bar ───────────────────────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 flex items-center justify-between"
        style={{
          backgroundColor: 'rgba(249, 248, 246, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--indigo-12)',
          height: '64px',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 group"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {/* Geometric logo mark — twin diagonal lines */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="27" height="27" stroke="var(--indigo)" strokeWidth="1"/>
            <line x1="4" y1="24" x2="14" y2="4" stroke="var(--gold)" strokeWidth="1.5"/>
            <line x1="14" y1="4" x2="24" y2="24" stroke="var(--indigo)" strokeWidth="1"/>
          </svg>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.25rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--indigo)',
              lineHeight: 1,
            }}
          >
            Axom Darshan
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: status badges */}
        <div className="flex items-center gap-3">
          {state.itinerary.length > 0 && (
            <button
              onClick={() => onNavigate('planner')}
              className="inline-flex tag-badge hover:border-[var(--indigo)] transition-colors"
              style={{ cursor: 'pointer' }}
            >
              {state.itinerary.length} planned
            </button>
          )}
          {state.bookedWorkshops.length > 0 && (
            <button
              onClick={() => onNavigate('artisans')}
              className="inline-flex tag-gold hover:opacity-80 transition-opacity"
              style={{ cursor: 'pointer' }}
            >
              {state.bookedWorkshops.length} booked
            </button>
          )}
        </div>
      </header>

      {/* ── Page Content ──────────────────────────────────── */}
      <main className="flex-1 pb-16 md:pb-0" style={{ paddingTop: '64px' }}>
        {children}
      </main>

      {/* ── Mobile Bottom Navigation Bar ────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 flex items-center justify-around"
        style={{
          backgroundColor: 'var(--cream)',
          borderTop: '1px solid var(--indigo)',
        }}
      >
        {navItems.map(item => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Inter', monospace, sans-serif",
                fontSize: '10px',
                fontWeight: isActive ? 700 : 400,
                letterSpacing: '0.12em',
                color: 'var(--indigo)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <span>{item.label.split(' ')[0]}</span>
              {isActive && (
                <span style={{ color: 'var(--gold)', fontSize: '8px' }}>◆</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Footer Geo Strip ──────────────────────────────── */}
      <footer
        className="mt-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          borderTop: '1px solid var(--indigo-12)',
          backgroundColor: 'var(--cream)',
        }}
      >
        <div className="geo-divider-gold" style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0.6 }} />
        <div className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <rect x="0.5" y="0.5" width="27" height="27" stroke="var(--indigo)" strokeWidth="1"/>
            <line x1="4" y1="24" x2="14" y2="4" stroke="var(--gold)" strokeWidth="1.5"/>
            <line x1="14" y1="4" x2="24" y2="24" stroke="var(--indigo)" strokeWidth="1"/>
          </svg>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: 'var(--indigo)', letterSpacing: '0.06em' }}>
            Axom Darshan
          </span>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--indigo-60)', letterSpacing: '0.05em' }}>
          Preserving the living traditions of Assam · Est. 2024
        </p>
        <div className="flex gap-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
                color: 'var(--indigo-60)', letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--indigo)'}
              onMouseLeave={e => e.target.style.color = 'var(--indigo-60)'}
            >
              {item.label}
            </button>
          ))}
        </div>
      </footer>

      {/* ── Global Notification Toast ─────────────────────── */}
      <NotificationToast />


    </div>
  );
}

function NotificationToast() {
  const { state } = useApp();
  if (!state.notification) return null;

  const styles = {
    success: { borderColor: 'var(--gold)',       color: '#5A3800' },
    error:   { borderColor: 'var(--red-accent)', color: 'var(--red-accent)' },
    info:    { borderColor: 'var(--indigo-30)',  color: 'var(--indigo)' },
  };

  const s = styles[state.notification.type] || styles.info;

  return (
    <div
      className="toast-animate fixed bottom-24 left-1/2 z-50 px-6 py-3 text-sm font-semibold shadow-none"
      style={{
        transform: 'translateX(-50%)',
        backgroundColor: 'var(--bone)',
        border: `1px solid ${s.borderColor}`,
        borderRadius: '0',
        color: s.color,
        fontFamily: "'Inter', sans-serif",
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
      }}
    >
      {state.notification.message}
    </div>
  );
}
