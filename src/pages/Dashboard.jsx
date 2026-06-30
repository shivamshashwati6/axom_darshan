import { useApp } from '../context/AppContext';
import { circuitsData, ecoPartnersData, communityReviews } from '../data/mockData';

const pillars = [
  { icon: '🦏', title: 'Wildlife Sanctuaries', desc: 'One-horned rhinos, tigers, and river dolphins across Kaziranga, Manas & Pobitora.' },
  { icon: '🏛️', title: 'Ahom Heritage', desc: 'Magnificent palace ruins, Rang Ghar amphitheatres, and 600-year-old Ahom kingdom relics.' },
  { icon: '🧵', title: 'Living Craft Traditions', desc: 'Muga silk, bamboo craft, mask-making, and hand-loomed textiles from village artisans.' },
  { icon: '🌿', title: 'Eco & Community Tourism', desc: 'Responsible travel through tribal villages, organic homestays, and conservation projects.' },
];

export default function Dashboard({ onNavigate }) {
  const { state, setCircuit } = useApp();

  return (
    <div className="px-4 md:px-8 py-12 max-w-7xl mx-auto space-y-20">

      {/* ── Hero Banner ───────────────────────────────────── */}
      <section className="relative glass border border-white/8 rounded-3xl overflow-hidden px-8 py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-emerald-900/15 pointer-events-none" />
        <p className="text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4 font-semibold">Discover · Experience · Preserve</p>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6" style={{ background: 'linear-gradient(135deg,#fff 50%,#00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Axom Darshan
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto text-lg mb-10">
          An immersive gateway to Northeast India's last great wilderness — where ancient kingdoms, living craft traditions, and biodiversity converge on the banks of the Brahmaputra.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => onNavigate('planner')} className="btn-neon">
            🗺️ Start Planning
          </button>
          <button onClick={() => onNavigate('artisans')} className="px-5 py-2.5 rounded-full text-sm font-semibold border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 transition-all">
            🧵 Meet Artisans
          </button>
        </div>
      </section>

      {/* ── Four Pillars ──────────────────────────────────── */}
      <section>
        <h2 className="section-title text-center mb-2">Four Pillars of Assam</h2>
        <p className="text-white/40 text-center mb-10 text-sm">Explore the dimensions that make Assam a singular destination</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map(p => (
            <div key={p.title} className="glass border border-white/8 rounded-2xl p-6 glow-hover text-center">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-base font-bold mb-2">{p.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick Circuit Selector ─────────────────────────── */}
      <section>
        <h2 className="section-title mb-2">Featured Circuits</h2>
        <p className="text-white/40 text-sm mb-8">Select a themed itinerary to pre-load in the planner</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Object.entries(circuitsData).map(([key, circuit]) => (
            <div key={key} className={`glass border rounded-2xl p-6 glow-hover cursor-pointer transition-all ${state.activeCircuit === key ? 'border-cyan-400/40 bg-cyan-400/5' : 'border-white/8'}`}
              onClick={() => { setCircuit(key); onNavigate('planner'); }}
            >
              <div className="text-3xl mb-3">{circuit.icon}</div>
              <h3 className="font-bold mb-1">{circuit.name}</h3>
              <p className="text-xs text-white/40 mb-3">{circuit.vibe}</p>
              <p className="text-xs text-white/50">{circuit.days.length} curated days</p>
              {state.activeCircuit === key && (
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Active circuit
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Eco Partners ──────────────────────────────────── */}
      <section>
        <h2 className="section-title mb-2">Green Travel Partners</h2>
        <p className="text-white/40 text-sm mb-8">Verified eco-certified operators, accommodations, and artisan initiatives</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ecoPartnersData.map(p => (
            <div key={p.id} className="glass border border-white/8 rounded-2xl p-5 glow-hover">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="font-semibold text-sm leading-snug">{p.name}</h4>
                <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-white/10 text-white/40">{p.type}</span>
              </div>
              <p className="text-white/40 text-xs mb-3 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.badges.map(b => (
                  <span key={b.name} className="eco-badge text-[10px]">✓ {b.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Community Testimonials ─────────────────────────── */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title mb-1">Traveler Stories</h2>
            <p className="text-white/40 text-sm">Voices from across the world</p>
          </div>
          <button onClick={() => onNavigate('community')} className="text-xs text-cyan-400 hover:underline">See all →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {communityReviews.slice(0, 3).map(r => (
            <div key={r.id} className="glass border border-white/8 rounded-2xl p-5 glow-hover">
              <div className="text-amber-400 mb-3">{'★'.repeat(r.rating)}</div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-xs font-bold text-cyan-300">{r.avatar}</div>
                <div>
                  <p className="text-sm font-semibold">{r.user}</p>
                  <p className="text-xs text-white/40">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
