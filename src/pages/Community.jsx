import { useState } from 'react';
import { communityReviews } from '../data/mockData';

const CIRCUITS = ['All', 'Wildlife', 'Heritage', 'Spiritual'];

function StarRating({ rating, interactive = false, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={interactive ? () => onChange(n) : undefined}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: interactive ? 'pointer' : 'default',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill={n <= rating ? 'var(--gold)' : 'var(--indigo-12)'}>
            <path d="M6 0l1.5 4.5H12L8.5 7.5l1.5 4.5L6 9l-4 3 1.5-4.5L0 4.5h4.5Z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

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
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}>

      {/* ── Page Header ───────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pt-16 pb-12"
        style={{ borderBottom: '1px solid var(--indigo-12)' }}
      >
        <p className="muted-label mb-3">Community Voices</p>
        <h1 className="section-heading mb-3">Traveler Community</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--indigo-60)', lineHeight: 1.7 }}>
          Authentic stories, trip reviews, and travel wisdom from real Assam explorers
        </p>
      </section>

      <div className="geo-divider" />

      <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          {/* ── Feed ──────────────────────────────────────── */}
          <div>
            {/* Filters + count */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {CIRCUITS.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`filter-pill ${filter === c ? 'active' : ''}`}
                >
                  {c}
                </button>
              ))}
              <span style={{
                marginLeft: 'auto',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                color: 'var(--indigo-60)',
                letterSpacing: '0.04em',
              }}>
                {filtered.length} reviews
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map((r, idx) => (
                <div
                  key={r.id}
                  className="stagger-item"
                  style={{
                    border: '1px solid var(--indigo-12)',
                    borderRadius: '2px',
                    backgroundColor: 'var(--bone)',
                    padding: '1.5rem',
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
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    {/* Avatar */}
                    <div style={{
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      borderRadius: '2px',
                      backgroundColor: 'var(--indigo)',
                      color: 'var(--bone)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}>
                      {r.avatar}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Meta row */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.625rem' }}>
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 600, color: 'var(--indigo)' }}>
                            {r.user}
                          </p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'var(--indigo-60)', marginTop: '1px' }}>
                            {r.location} · {r.date}
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
                          <span className="tag-badge">{r.circuit}</span>
                          <StarRating rating={r.rating} />
                        </div>
                      </div>

                      {/* Review text */}
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.05rem',
                        fontStyle: 'italic',
                        color: 'var(--indigo)',
                        lineHeight: 1.65,
                      }}>
                        "{r.text}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--indigo-30)' }}>◇</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: 'var(--indigo-60)' }}>
                    No reviews in this category yet.
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--indigo-30)', marginTop: '0.5rem' }}>
                    Be the first to share your story.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Submit Review ──────────────────────────────── */}
          <aside>
            <div
              className="sticky"
              style={{
                top: '84px',
                border: '1px solid var(--indigo-12)',
                borderTop: '2px solid var(--gold)',
                borderRadius: '2px',
                backgroundColor: 'var(--cream)',
                overflow: 'hidden',
              }}
            >
              {/* Form header */}
              <div style={{ padding: '1.25rem 1.25rem 0' }}>
                <p className="muted-label mb-2">Share Your Story</p>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--indigo)',
                  letterSpacing: '0.02em',
                  marginBottom: '1rem',
                }}>
                  Write a Review
                </h3>

                {submitted && (
                  <div
                    className="tag-gold fade-in"
                    style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem 0.75rem', textAlign: 'center' }}
                  >
                    Review posted successfully
                  </div>
                )}
              </div>

              <div className="geo-divider" />

              <form onSubmit={handleSubmit} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={newReview.user}
                  onChange={e => setNewReview(p => ({ ...p, user: e.target.value }))}
                  className="heritage-input"
                />
                <textarea
                  rows={5}
                  placeholder="Tell us about your Assam experience…"
                  value={newReview.text}
                  onChange={e => setNewReview(p => ({ ...p, text: e.target.value }))}
                  className="heritage-input"
                  style={{ resize: 'none', lineHeight: 1.7 }}
                />

                {/* Star rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--indigo-60)', letterSpacing: '0.05em' }}>
                    Rating
                  </span>
                  <StarRating
                    rating={newReview.rating}
                    interactive={true}
                    onChange={n => setNewReview(p => ({ ...p, rating: n }))}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '0.25rem' }}>
                  Post Review
                </button>
              </form>

              {/* Community stats */}
              <div style={{
                margin: '0 1.25rem 1.25rem',
                padding: '1rem',
                border: '1px solid var(--indigo-12)',
                borderRadius: '2px',
                backgroundColor: 'var(--bone)',
              }}>
                <p className="muted-label mb-3">Community Stats</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--indigo-60)' }}>Total Reviews</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: 'var(--indigo)' }}>{reviews.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--indigo-60)' }}>Avg Rating</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: 'var(--gold)' }}>
                      {(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)} ★
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--indigo-60)' }}>Countries</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: 'var(--indigo)' }}>4</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>

      <div className="geo-divider" />
    </div>
  );
}
