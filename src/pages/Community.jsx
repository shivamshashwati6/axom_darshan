import { useState } from 'react';
import { communityReviews } from '../data/mockData';

const CIRCUITS = ['All', 'Wildlife', 'Heritage', 'Spiritual'];

export default function Community() {
  const [filter, setFilter] = useState('All');
  const [newReview, setNewReview] = useState({ user: '', text: '', rating: 5 });
  const [reviews, setReviews] = useState(communityReviews);
  const [submitted, setSubmitted] = useState(false);

  const filtered = filter === 'All' ? reviews : reviews.filter(r => r.circuit === filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.user || !newReview.text) return;
    const entry = {
      id: `r-${Date.now()}`,
      user: newReview.user,
      avatar: newReview.user.slice(0, 2).toUpperCase(),
      location: 'Explorer',
      rating: newReview.rating,
      text: newReview.text,
      circuit: 'Heritage',
      date: 'Just now',
    };
    setReviews(prev => [entry, ...prev]);
    setNewReview({ user: '', text: '', rating: 5 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="section-title mb-2">Traveler Community</h1>
        <p className="text-white/40 text-sm">Authentic stories, trip reviews, and travel wisdom from real Assam explorers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* ── Feed ──────────────────────────────────────────── */}
        <div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CIRCUITS.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  filter === c
                    ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/20'
                }`}
              >
                {c}
              </button>
            ))}
            <span className="ml-auto text-xs text-white/30 self-center">{filtered.length} reviews</span>
          </div>

          <div className="space-y-4">
            {filtered.map(r => (
              <div key={r.id} className="glass border border-white/8 rounded-2xl p-5 glow-hover">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-sm font-bold text-cyan-300">
                    {r.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-semibold text-sm">{r.user}</p>
                        <p className="text-xs text-white/40">{r.location} · {r.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="eco-badge text-[10px]">{r.circuit}</span>
                        <span className="text-amber-400 text-xs">{'★'.repeat(r.rating)}</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mt-3">"{r.text}"</p>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-20 text-white/30">
                <p className="text-4xl mb-3">💬</p>
                <p className="text-sm">No reviews in this category yet. Be the first!</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Submit Review ─────────────────────────────────── */}
        <aside>
          <div className="glass border border-white/8 rounded-2xl p-5 sticky top-24">
            <h3 className="font-bold text-sm mb-4">✍️ Share Your Story</h3>
            {submitted && (
              <div className="eco-badge mb-4 text-xs">✅ Review posted!</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={newReview.user}
                onChange={e => setNewReview(p => ({ ...p, user: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40"
              />
              <textarea
                rows={4}
                placeholder="Tell us about your Assam experience…"
                value={newReview.text}
                onChange={e => setNewReview(p => ({ ...p, text: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40 resize-none"
              />
              {/* Star rating */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">Rating:</span>
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNewReview(p => ({ ...p, rating: n }))}
                    className={`text-lg transition-all ${n <= newReview.rating ? 'text-amber-400' : 'text-white/20'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button type="submit" className="w-full btn-neon">Post Review</button>
            </form>

            {/* Stats */}
            <div className="mt-6 pt-5 border-t border-white/5 space-y-2">
              <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-3">Community Stats</p>
              <p className="text-xs text-white/50">📝 {reviews.length} total reviews</p>
              <p className="text-xs text-white/50">⭐ {(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1)} avg rating</p>
              <p className="text-xs text-white/50">🌏 4 countries represented</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
