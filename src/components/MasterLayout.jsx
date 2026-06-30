import { useState } from 'react';
import { useApp } from '../context/AppContext';
import SoundscapePlayer from './SoundscapePlayer';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🧭' },
  { id: 'planner',   label: 'Planner',   icon: '🗺️' },
  { id: 'artisans',  label: 'Artisans',  icon: '🧵' },
  { id: 'calendar',  label: 'Calendar',  icon: '📅' },
  { id: 'community', label: 'Community', icon: '💬' },
];

export default function MasterLayout({ currentPage, onNavigate, children }) {
  const { state } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Top Navigation Bar ───────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5 px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="font-serif text-xl font-bold tracking-widest"
          style={{ background: 'linear-gradient(90deg,#fff 60%,#00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Axom Darshan
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                currentPage === item.id
                  ? 'nav-active border-cyan-400/30'
                  : 'border-transparent text-white/50 hover:text-white hover:border-white/10'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: user + mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Itinerary badge */}
          {state.itinerary.length > 0 && (
            <button
              onClick={() => onNavigate('planner')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-400/30 text-amber-300 bg-amber-400/5 hover:bg-amber-400/10 transition-all"
            >
              🗺️ {state.itinerary.length} days planned
            </button>
          )}
          {/* Bookings badge */}
          {state.bookedWorkshops.length > 0 && (
            <button
              onClick={() => onNavigate('artisans')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-400/30 text-emerald-300 bg-emerald-400/5 hover:bg-emerald-400/10 transition-all"
            >
              🧵 {state.bookedWorkshops.length} booked
            </button>
          )}
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </header>

      {/* ── Mobile Dropdown ───────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed top-[60px] inset-x-0 z-40 glass border-b border-white/5 p-4 flex flex-col gap-1 md:hidden">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
                currentPage === item.id
                  ? 'nav-active border-cyan-400/30'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Page Content ──────────────────────────────────── */}
      <main className="flex-1 pt-[72px]">
        {children}
      </main>

      {/* ── Global Notification Toast ─────────────────────── */}
      <NotificationToast />

      {/* ── Persistent Floating Soundscape Player ─────────── */}
      <SoundscapePlayer />
    </div>
  );
}

function NotificationToast() {
  const { state } = useApp();
  if (!state.notification) return null;

  const colors = {
    success: 'border-emerald-400/40 text-emerald-300',
    error:   'border-red-400/40 text-red-300',
    info:    'border-cyan-400/40 text-cyan-300',
  };

  return (
    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 glass border px-6 py-3 rounded-full text-sm font-semibold shadow-2xl animate-pulse-glow ${colors[state.notification.type] || colors.info}`}>
      {state.notification.message}
    </div>
  );
}
