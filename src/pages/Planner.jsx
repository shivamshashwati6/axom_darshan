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

  const handleMoveUp = (idx) => {
    if (idx === 0) return;
    reorderDays(idx, idx - 1);
  };

  const handleMoveDown = (idx) => {
    if (idx === state.itinerary.length - 1) return;
    reorderDays(idx, idx + 1);
  };

  const handleAddDay = () => {
    if (!selectedDest) return;
    const dest = ALL_DESTINATIONS.find(d => d.id === selectedDest);
    if (dest) {
      addDay({ place: dest.place, activity: dest.activity, icon: dest.icon });
      setSelectedDest('');
      notify(`📍 ${dest.place} added to Day ${state.itinerary.length + 1}`);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportItinerary(state.itinerary, state.user);
      notify('📥 Itinerary exported as JSON!');
    } finally {
      setIsExporting(false);
    }
  };

  // Drag-and-drop handlers
  const handleDragStart = (idx) => setDragIndex(idx);
  const handleDragOver = (e, idx) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== idx) {
      reorderDays(dragIndex, idx);
      setDragIndex(idx);
    }
  };
  const handleDragEnd = () => setDragIndex(null);

  return (
    <div className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="section-title mb-2">Route Planner</h1>
        <p className="text-white/40 text-sm">Build, reorder, and export your custom day-by-day Assam journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

        {/* ── Left: Config Panel ────────────────────────────── */}
        <aside className="space-y-5">
          {/* Circuit selector */}
          <div className="glass border border-white/8 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-4">Select Circuit</h3>
            <div className="space-y-2">
              {Object.entries(circuitsData).map(([key, c]) => (
                <button
                  key={key}
                  onClick={() => { setCircuit(key); notify(`Loaded ${c.name}`); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                    state.activeCircuit === key
                      ? 'border-cyan-400/40 bg-cyan-400/5 text-cyan-300'
                      : 'border-white/5 text-white/60 hover:border-white/15'
                  }`}
                >
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-xs text-white/40">{c.vibe}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Add destination */}
          <div className="glass border border-white/8 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-3">Add Destination</h3>
            <select
              value={selectedDest}
              onChange={e => setSelectedDest(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white mb-3 focus:outline-none focus:border-cyan-400/40"
            >
              <option value="">— Choose a destination —</option>
              {ALL_DESTINATIONS.map(d => (
                <option key={d.id} value={d.id}>{d.place}</option>
              ))}
            </select>
            <button
              onClick={handleAddDay}
              disabled={!selectedDest}
              className="w-full btn-neon disabled:opacity-40 disabled:cursor-not-allowed"
            >
              + Add Day
            </button>
          </div>

          {/* Export */}
          <button
            onClick={handleExport}
            disabled={isExporting || state.itinerary.length === 0}
            className="w-full px-5 py-3 rounded-2xl text-sm font-semibold border border-amber-400/30 text-amber-300 bg-amber-400/5 hover:bg-amber-400/10 transition-all disabled:opacity-40"
          >
            {isExporting ? '⏳ Exporting…' : '📥 Export Itinerary JSON'}
          </button>
        </aside>

        {/* ── Right: Timeline Canvas ────────────────────────── */}
        <div className="glass border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-lg">{circuit.icon} {circuit.name}</h2>
              <p className="text-white/40 text-xs mt-0.5">{state.itinerary.length} days · {circuit.vibe}</p>
            </div>
            <span className="eco-badge">{state.itinerary.length} Days</span>
          </div>

          {state.itinerary.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <p className="text-4xl mb-4">🗺️</p>
              <p className="text-sm">No days yet. Select a circuit or add destinations.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.itinerary.map((day, idx) => (
                <div
                  key={day.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={e => handleDragOver(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`group flex items-center gap-4 glass border rounded-xl px-4 py-3 transition-all cursor-grab active:cursor-grabbing ${
                    dragIndex === idx ? 'border-cyan-400/40 scale-[1.01] shadow-lg' : 'border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Day number */}
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-xs font-bold text-cyan-400">
                    {day.day}
                  </div>
                  {/* Icon */}
                  <span className="text-xl shrink-0">{day.icon}</span>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{day.place}</p>
                    <p className="text-white/40 text-xs truncate">{day.activity}</p>
                  </div>
                  {/* Controls */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleMoveUp(idx)} disabled={idx === 0} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs disabled:opacity-30 transition-all">↑</button>
                    <button onClick={() => handleMoveDown(idx)} disabled={idx === state.itinerary.length - 1} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs disabled:opacity-30 transition-all">↓</button>
                    <button onClick={() => { removeDay(day.id); notify(`Removed ${day.place}`); }} className="w-7 h-7 rounded-lg bg-red-400/10 hover:bg-red-400/20 text-red-400 flex items-center justify-center text-xs transition-all">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
