import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { artisansData, submitWorkshopBooking } from '../data/mockData';

export default function Artisans() {
  const { state, bookWorkshop, cancelWorkshop, notify } = useApp();
  const [selectedArtisan, setSelectedArtisan] = useState(null);
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
        notify(`✅ ${result.message}`);
      }
    } finally {
      setBookingLoading(null);
    }
  };

  return (
    <div className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="section-title mb-2">Artisan Trails</h1>
        <p className="text-white/40 text-sm">Discover master craftspeople and book immersive hands-on workshops</p>
      </div>

      {/* Bookings summary bar */}
      {state.bookedWorkshops.length > 0 && (
        <div className="glass border border-emerald-400/20 rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-emerald-300">🧵 {state.bookedWorkshops.length} workshop{state.bookedWorkshops.length > 1 ? 's' : ''} booked</span>
          {state.bookedWorkshops.map(b => (
            <span key={b.workshopId} className="eco-badge text-xs">{b.workshopTitle}</span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artisansData.map(artisan => (
          <div key={artisan.id} className="glass border border-white/8 rounded-2xl overflow-hidden glow-hover flex flex-col">
            {/* Artisan avatar band */}
            <div className="h-32 bg-gradient-to-br from-amber-900/30 to-emerald-900/20 flex items-center justify-center text-6xl border-b border-white/5">
              {artisan.craft === 'Muga Silk Weaving' ? '🧵' : artisan.craft === 'Bamboo & Cane Craft' ? '🎋' : '🎭'}
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-3">
                <h3 className="font-bold text-base">{artisan.name}</h3>
                <p className="text-xs text-amber-300/80 font-semibold mt-0.5">{artisan.craft}</p>
                <p className="text-xs text-white/40 mt-0.5">📍 {artisan.location}</p>
              </div>

              <p className="text-white/50 text-xs leading-relaxed mb-4">{artisan.bio}</p>

              {/* Eco badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {artisan.badges.map(b => (
                  <span key={b} className="eco-badge text-[10px]">✓ {b}</span>
                ))}
              </div>

              {/* Workshops */}
              <div className="space-y-2 mt-auto">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Available Workshops</p>
                {artisan.workshops.map(ws => {
                  const booked = isBooked(ws.id);
                  return (
                    <div key={ws.id} className={`rounded-xl border p-3 transition-all ${booked ? 'border-emerald-400/30 bg-emerald-400/5' : 'border-white/5 bg-white/2'}`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="text-xs font-semibold">{ws.title}</p>
                          <p className="text-[10px] text-white/40">{ws.duration} · {ws.spots} spots</p>
                        </div>
                        <span className="text-xs font-bold text-amber-300 shrink-0">₹{ws.price.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => handleBook(artisan, ws)}
                        disabled={bookingLoading === ws.id}
                        className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          booked
                            ? 'bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 hover:bg-red-400/10 hover:text-red-300 hover:border-red-400/30'
                            : 'btn-neon'
                        }`}
                      >
                        {bookingLoading === ws.id ? '⏳ Booking…' : booked ? '✓ Booked · Cancel' : 'Book Workshop'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
