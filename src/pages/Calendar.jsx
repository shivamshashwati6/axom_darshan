import { useState, useEffect } from 'react';
import { fetchLocalEvents } from '../data/mockData';

const CATEGORIES = ['all', 'festival', 'cultural', 'pilgrimage', 'music'];
const CAT_COLORS = {
  festival:   'border-amber-400/30 text-amber-300 bg-amber-400/5',
  cultural:   'border-cyan-400/30 text-cyan-300 bg-cyan-400/5',
  pilgrimage: 'border-purple-400/30 text-purple-300 bg-purple-400/5',
  music:      'border-emerald-400/30 text-emerald-300 bg-emerald-400/5',
};

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
    <div className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="section-title mb-2">Cultural Calendar</h1>
        <p className="text-white/40 text-sm">Festivals, pilgrimages, and live events across Assam — updated in real-time</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border capitalize transition-all ${
              filter === cat
                ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                : 'border-white/10 text-white/50 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass border border-white/5 rounded-2xl p-5 h-40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(event => (
            <div key={event.id} className="glass border border-white/8 rounded-2xl p-5 glow-hover flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-sm leading-snug">{event.name}</h3>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${CAT_COLORS[event.category] || 'border-white/10 text-white/40'}`}>
                  {event.category}
                </span>
              </div>
              <div className="space-y-1 text-xs text-white/40">
                <p>📅 {event.date}</p>
                <p>📍 {event.location}</p>
              </div>
              <p className="text-white/50 text-xs leading-relaxed flex-1">{event.description}</p>
              <button className="btn-neon text-xs py-2">Add to Itinerary →</button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-20 text-white/30">
              <p className="text-4xl mb-3">📅</p>
              <p className="text-sm">No events in this category</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
