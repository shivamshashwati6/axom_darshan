/**
 * TeaHeritageExplorer.jsx
 * ─────────────────────────────────────────────────────────────
 * Heritage Weaver (Textured Minimalism) — Tea Trails Feature
 *
 * Implements a split-screen interactive explorer:
 *   LEFT  — Vertical trail timeline + month step-bar + flush
 *            annotation panel (Eri Silk Cream background)
 *   RIGHT — Asymmetric editorial gallery that updates in
 *            real-time based on selected trail and month
 *
 * Design constraints:
 *   • Zero border-radius, zero box-shadow
 *   • All borders are 1px, indigo-12 or indigo
 *   • Typography: Cormorant Garamond serif headings, Inter body
 *   • Palette: bone canvas, cream containers, indigo text, gold accent
 *   • All interactions use CSS transitions (no JS animation lib)
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useCallback } from 'react';
import { teaEstates, FLUSH_DATA, TRAIL_META } from '../data/teaEstateData';
import EditorialFilmstrip from './EditorialFilmstrip';

// ── Month configuration ───────────────────────────────────────
const MONTHS = [
  { num: 3,  label: 'Mar' },
  { num: 4,  label: 'Apr' },
  { num: 5,  label: 'May' },
  { num: 6,  label: 'Jun' },
  { num: 7,  label: 'Jul' },
  { num: 8,  label: 'Aug' },
  { num: 9,  label: 'Sep' },
  { num: 10, label: 'Oct' },
  { num: 11, label: 'Nov' },
];

const TRAILS = Object.keys(TRAIL_META);

// ─────────────────────────────────────────────────────────────
// TEA FIELD IMAGE — SVG geometric placeholder per trail
// Mimics the aerial geometry of tea garden terraces
// ─────────────────────────────────────────────────────────────
function TeaFieldImage({ region, tall = false, active = false }) {
  const meta   = TRAIL_META[region] || TRAIL_META['Jorhat Trail'];
  const color  = meta.color;
  const height = tall ? '280px' : '180px';
  const enc    = encodeURIComponent(color);

  // Each trail gets a distinct geometric field pattern
  const patterns = {
    'Jorhat Trail': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20'%3E%3Cline x1='0' y1='10' x2='40' y2='10' stroke='${enc}' stroke-width='0.7' stroke-opacity='0.3'/%3E%3Cline x1='0' y1='5'  x2='40' y2='5'  stroke='${enc}' stroke-width='0.3' stroke-opacity='0.15'/%3E%3Cline x1='0' y1='15' x2='40' y2='15' stroke='${enc}' stroke-width='0.3' stroke-opacity='0.15'/%3E%3Cline x1='20' y1='0' x2='20' y2='20' stroke='${enc}' stroke-width='0.3' stroke-opacity='0.12'/%3E%3C/svg%3E")`,
    'Dibrugarh Trail': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath d='M0,16 Q8,8 16,16 Q24,24 32,16' fill='none' stroke='${enc}' stroke-width='0.7' stroke-opacity='0.28'/%3E%3Cpath d='M0,24 Q8,16 16,24 Q24,32 32,24' fill='none' stroke='${enc}' stroke-width='0.4' stroke-opacity='0.16'/%3E%3C/svg%3E")`,
    'Sonitpur Trail': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='5' fill='none' stroke='${enc}' stroke-width='0.5' stroke-opacity='0.22'/%3E%3Ccircle cx='12' cy='12' r='1.5' fill='${enc}' fill-opacity='0.2'/%3E%3Cline x1='0' y1='12' x2='24' y2='12' stroke='${enc}' stroke-width='0.3' stroke-opacity='0.12'/%3E%3Cline x1='12' y1='0' x2='12' y2='24' stroke='${enc}' stroke-width='0.3' stroke-opacity='0.12'/%3E%3C/svg%3E")`,
  };

  const bgPattern = patterns[region] || patterns['Jorhat Trail'];
  const bgColor   = active
    ? `rgba(${hexToRgb(color)}, 0.14)`
    : `rgba(${hexToRgb(color)}, 0.07)`;

  return (
    <div
      aria-hidden="true"
      style={{
        height,
        backgroundColor: bgColor,
        backgroundImage: bgPattern,
        backgroundRepeat: 'repeat',
        borderBottom: `1px solid ${active ? color : 'rgba(26,46,64,0.12)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'background-color 0.35s ease-out, border-color 0.35s ease-out',
        overflow: 'hidden',
      }}
    >
      {/* Geometric tea-leaf SVG centred in the image area */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        style={{ opacity: active ? 0.35 : 0.15, transition: 'opacity 0.35s ease-out' }}
      >
        {/* Stylised tea leaf silhouette */}
        <path d="M32,8 C42,8 54,16 54,32 C54,48 42,56 32,56 C22,56 10,48 10,32 C10,16 22,8 32,8 Z"
              stroke={color} strokeWidth="1" />
        <path d="M32,8 C32,20 28,36 24,52" stroke={color} strokeWidth="0.6" strokeOpacity="0.6" />
        <path d="M32,8 C32,20 36,36 40,52" stroke={color} strokeWidth="0.6" strokeOpacity="0.6" />
        <line x1="20" y1="28" x2="44" y2="28" stroke={color} strokeWidth="0.5" strokeOpacity="0.5" />
        <line x1="18" y1="36" x2="46" y2="36" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="22" y1="44" x2="42" y2="44" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
        <circle cx="32" cy="56" r="2" fill={color} fillOpacity="0.6" />
      </svg>

      {/* Active glow overlay */}
      {active && (
        <div style={{
          position: 'absolute',
          inset: 0,
          border: `2px solid ${color}`,
          pointerEvents: 'none',
          opacity: 0.5,
        }} />
      )}
    </div>
  );
}

// Helper: convert 6-digit hex to "r,g,b" string
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ─────────────────────────────────────────────────────────────
// ESTATE CARD — Right panel card unit
// ─────────────────────────────────────────────────────────────
function EstateCard({ estate, active, selectedMonth, flushInfo, tall = false }) {
  const [hovered, setHovered] = useState(false);
  const meta = TRAIL_META[estate.region] || TRAIL_META['Jorhat Trail'];

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor:  'var(--bone)',
        border:           '1px solid var(--indigo-12)',
        borderTop:        active
          ? `2px solid ${meta.color}`
          : hovered
            ? '2px solid var(--indigo-30)'
            : '2px solid transparent',
        borderRadius:     '0',
        boxShadow:        'none',
        display:          'flex',
        flexDirection:    'column',
        overflow:         'hidden',
        height:           '100%',
        transition:       'border-top-color 0.3s ease-out',
        position:         'relative',
      }}
    >
      {/* Active status ribbon */}
      {active && (
        <div style={{
          position:        'absolute',
          top:             '10px',
          right:           '10px',
          zIndex:          2,
          backgroundColor: meta.color,
          padding:         '0.2rem 0.6rem',
          display:         'flex',
          alignItems:      'center',
          gap:             '5px',
        }}>
          <span style={{
            width:           '5px',
            height:          '5px',
            borderRadius:    '50%',
            backgroundColor: 'var(--bone)',
            display:         'inline-block',
            animation:       'pulse-dot 1.8s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily:      "'Inter', sans-serif",
            fontSize:        '0.6rem',
            fontWeight:      700,
            letterSpacing:   '0.1em',
            textTransform:   'uppercase',
            color:           'var(--bone)',
          }}>
            Active — {MONTHS.find(m => m.num === selectedMonth)?.label}
          </span>
        </div>
      )}

      {/* Tea field image area */}
      <TeaFieldImage region={estate.region} tall={tall} active={active} />

      {/* Card body */}
      <div style={{ padding: '1.125rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>

        {/* Estate name + subtitle */}
        <div>
          <h3 style={{
            fontFamily:    "'Cormorant Garamond', serif",
            fontSize:      tall ? '1.3rem' : '1.1rem',
            fontWeight:    600,
            color:         'var(--indigo)',
            letterSpacing: '0.02em',
            lineHeight:    1.15,
            margin:        0,
          }}>
            {estate.name}
          </h3>
          <p style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      '0.68rem',
            fontWeight:    500,
            color:         active ? meta.color : 'var(--indigo-60)',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginTop:     '3px',
            transition:    'color 0.3s ease-out',
          }}>
            {estate.subtitle}
          </p>
        </div>

        {/* History caption */}
        <p style={{
          fontFamily:  "'Inter', sans-serif",
          fontSize:    '0.75rem',
          color:       'var(--indigo-60)',
          lineHeight:  1.7,
          flex:        1,
          display:     tall ? 'block' : '-webkit-box',
          WebkitLineClamp: tall ? 'unset' : 3,
          WebkitBoxOrient: 'vertical',
          overflow:    tall ? 'visible' : 'hidden',
        }}>
          {estate.history}
        </p>

        {/* Technical annotation row */}
        <div style={{
          paddingTop:   '0.75rem',
          borderTop:    '1px solid var(--indigo-06)',
          display:      'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:          '0.5rem',
        }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--indigo-30)', marginBottom: '2px' }}>
              Established
            </p>
            <p style={{ fontFamily: "'Inter', monospace, sans-serif", fontSize: '0.72rem', color: 'var(--indigo)' }}>
              {estate.established}
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--indigo-30)', marginBottom: '2px' }}>
              Elevation
            </p>
            <p style={{ fontFamily: "'Inter', monospace, sans-serif", fontSize: '0.72rem', color: 'var(--indigo)' }}>
              {estate.elevation}
            </p>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--indigo-30)', marginBottom: '2px' }}>
              Coordinates
            </p>
            <p style={{ fontFamily: "'Inter', monospace, sans-serif", fontSize: '0.7rem', color: 'var(--indigo-60)' }}>
              {estate.coordinates}
            </p>
          </div>
        </div>

        {/* Specialty tag */}
        <div style={{
          padding:         '0.3rem 0.625rem',
          border:          `1px solid ${active ? meta.color : 'var(--indigo-12)'}`,
          backgroundColor: active ? `rgba(${hexToRgb(meta.color)},0.06)` : 'transparent',
          transition:      'all 0.3s ease-out',
        }}>
          <p style={{
            fontFamily:  "'Inter', sans-serif",
            fontSize:    '0.67rem',
            fontWeight:  500,
            color:       active ? meta.color : 'var(--indigo-60)',
            letterSpacing: '0.04em',
            transition:  'color 0.3s ease-out',
          }}>
            {estate.specialty}
          </p>
        </div>

        {/* Active flush info — inline if active */}
        {active && flushInfo && (
          <div style={{
            padding:         '0.625rem 0.75rem',
            backgroundColor: 'var(--cream)',
            borderLeft:      `2px solid ${meta.color}`,
          }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--indigo)', lineHeight: 1.5 }}>
              {flushInfo.flush} — {flushInfo.grade}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// ASYMMETRIC GALLERY — Right panel editorial grid
// Layout: Estate 1 large (left col, row-span-2),
//         Estate 2 + 3 stacked (right col)
// ─────────────────────────────────────────────────────────────
function AsymmetricGallery({ estates, activeIds, selectedMonth, flushInfo }) {
  if (!estates.length) return null;

  const [e1, e2, e3] = estates;
  const isActive = (e) => e && activeIds.has(e.id);

  return (
    <div style={{ padding: '1.5rem', height: '100%' }}>
      {e1 && !e2 ? (
        /* Single card — full width */
        <div style={{ height: '100%' }}>
          <EstateCard estate={e1} active={isActive(e1)} selectedMonth={selectedMonth} flushInfo={flushInfo} tall />
        </div>
      ) : (
        /* Two-column asymmetric: large left, stacked right */
        <div style={{
          display:               'grid',
          gridTemplateColumns:   '3fr 2fr',
          gridTemplateRows:      '1fr 1fr',
          gap:                   '1px',
          backgroundColor:       'var(--indigo-12)',
          height:                '100%',
          border:                '1px solid var(--indigo-12)',
        }}>
          {/* Estate 1 — spans both rows (tall hero card) */}
          <div style={{ gridRow: '1 / 3', backgroundColor: 'var(--bone)' }}>
            {e1 && (
              <EstateCard
                estate={e1}
                active={isActive(e1)}
                selectedMonth={selectedMonth}
                flushInfo={flushInfo}
                tall
              />
            )}
          </div>

          {/* Estate 2 — top-right cell */}
          <div style={{ backgroundColor: 'var(--bone)' }}>
            {e2 && (
              <EstateCard
                estate={e2}
                active={isActive(e2)}
                selectedMonth={selectedMonth}
                flushInfo={flushInfo}
              />
            )}
          </div>

          {/* Estate 3 — bottom-right cell, with slight top padding for offset */}
          <div style={{ backgroundColor: 'var(--bone)', paddingTop: '1.5rem' }}>
            {e3 && (
              <EstateCard
                estate={e3}
                active={isActive(e3)}
                selectedMonth={selectedMonth}
                flushInfo={flushInfo}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MONTH STEP BAR
// 9 clickable month cells connected by a 1px line
// ─────────────────────────────────────────────────────────────
function MonthStepBar({ selectedMonth, onMonthSelect }) {
  return (
    <div>
      <p style={{
        fontFamily:    "'Inter', sans-serif",
        fontSize:      '0.6rem',
        fontWeight:    700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         'var(--indigo-30)',
        marginBottom:  '0.75rem',
      }}>
        Harvest Season Slider
      </p>

      {/* Month step track */}
      <div style={{ position: 'relative' }}>
        {/* Connecting baseline */}
        <div style={{
          position:        'absolute',
          top:             '18px',
          left:            '20px',
          right:           '20px',
          height:          '1px',
          backgroundColor: 'var(--indigo-12)',
          zIndex:          0,
        }} />

        {/* Month buttons */}
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          {MONTHS.map(({ num, label }) => {
            const isSelected = selectedMonth === num;
            return (
              <button
                key={num}
                onClick={() => onMonthSelect(isSelected ? null : num)}
                title={`Select ${label}`}
                style={{
                  display:         'flex',
                  flexDirection:   'column',
                  alignItems:      'center',
                  gap:             '4px',
                  background:      'none',
                  border:          'none',
                  padding:         0,
                  cursor:          'pointer',
                  flex:            1,
                }}
              >
                {/* Month dot / square */}
                <div style={{
                  width:           '36px',
                  height:          '36px',
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  backgroundColor: isSelected ? 'var(--indigo)' : 'var(--cream)',
                  border:          `1px solid ${isSelected ? 'var(--indigo)' : 'var(--indigo-12)'}`,
                  borderRadius:    '0',
                  transition:      'all 0.22s ease-out',
                  flexShrink:      0,
                }}>
                  <span style={{
                    fontFamily:    "'Inter', sans-serif",
                    fontSize:      '0.6rem',
                    fontWeight:    700,
                    letterSpacing: '0.04em',
                    color:         isSelected ? 'var(--bone)' : 'var(--indigo-60)',
                    transition:    'color 0.22s ease-out',
                  }}>
                    {label}
                  </span>
                </div>

                {/* Active month indicator dot below */}
                <div style={{
                  width:           '4px',
                  height:          '4px',
                  backgroundColor: isSelected ? 'var(--gold)' : 'transparent',
                  borderRadius:    '0',
                  transition:      'background-color 0.22s ease-out',
                }} />
              </button>
            );
          })}
        </div>
      </div>

      {selectedMonth && (
        <p style={{
          fontFamily:    "'Inter', sans-serif",
          fontSize:      '0.68rem',
          color:         'var(--indigo-60)',
          marginTop:     '0.625rem',
          letterSpacing: '0.03em',
        }}>
          Click the active month again to clear the filter.
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FLUSH ANNOTATION PANEL
// Cream background panel — revealed when a month is selected
// ─────────────────────────────────────────────────────────────
function FlushAnnotation({ selectedMonth, flushInfo, activeCount, totalCount }) {
  return (
    <div style={{
      maxHeight:       selectedMonth ? '260px' : '0px',
      overflow:        'hidden',
      opacity:         selectedMonth ? 1 : 0,
      transition:      'max-height 0.38s ease-out, opacity 0.3s ease-out',
    }}>
      {flushInfo && (
        <div style={{
          marginTop:       '1rem',
          backgroundColor: 'var(--cream)',
          borderTop:       `2px solid ${flushInfo.color}`,
          border:          '1px solid var(--indigo-12)',
          borderTopWidth:  '2px',
          padding:         '1.25rem',
        }}>
          {/* Flush label */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.75rem' }}>
            <div>
              <p style={{
                fontFamily:    "'Inter', sans-serif",
                fontSize:      '0.6rem',
                fontWeight:    700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         flushInfo.color,
                marginBottom:  '0.3rem',
              }}>
                Current Processing Stage
              </p>
              <h4 style={{
                fontFamily:    "'Cormorant Garamond', serif",
                fontSize:      '1.2rem',
                fontWeight:    600,
                color:         'var(--indigo)',
                letterSpacing: '0.03em',
                margin:        0,
              }}>
                {flushInfo.flush}
              </h4>
              <p style={{
                fontFamily:    "'Cormorant Garamond', serif",
                fontSize:      '0.9rem',
                fontStyle:     'italic',
                color:         flushInfo.color,
                marginTop:     '2px',
              }}>
                {flushInfo.grade}
              </p>
            </div>

            {/* Active estates count badge */}
            <div style={{
              flexShrink:      0,
              textAlign:       'right',
              padding:         '0.5rem 0.75rem',
              border:          `1px solid ${flushInfo.color}`,
              backgroundColor: 'var(--bone)',
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, color: 'var(--indigo)', lineHeight: 1 }}>
                {activeCount}
                <span style={{ fontSize: '1rem', color: 'var(--indigo-30)' }}>/{totalCount}</span>
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--indigo-30)', marginTop: '2px' }}>
                Active Estates
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'var(--indigo-12)', marginBottom: '0.75rem' }} />

          {/* Flush detail */}
          <p style={{
            fontFamily:  "'Inter', sans-serif",
            fontSize:    '0.78rem',
            color:       'var(--indigo-60)',
            lineHeight:  1.75,
            margin:      0,
          }}>
            {flushInfo.detail}
          </p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TRAIL TIMELINE — Left panel trail selector
// Vertical line with dots and trail labels
// ─────────────────────────────────────────────────────────────
function TrailTimeline({ selectedTrail, onSelectTrail }) {
  return (
    <div>
      <p style={{
        fontFamily:    "'Inter', sans-serif",
        fontSize:      '0.6rem',
        fontWeight:    700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         'var(--indigo-30)',
        marginBottom:  '1rem',
      }}>
        Trail Circuit
      </p>

      <div style={{ position: 'relative', paddingLeft: '1.75rem' }}>
        {/* Vertical timeline line */}
        <div style={{
          position:        'absolute',
          left:            '7px',
          top:             '8px',
          bottom:          '8px',
          width:           '1px',
          backgroundColor: 'var(--indigo-12)',
        }} />

        {TRAILS.map((trail, idx) => {
          const isActive = selectedTrail === trail;
          const meta     = TRAIL_META[trail];

          return (
            <button
              key={trail}
              onClick={() => onSelectTrail(trail)}
              style={{
                display:         'flex',
                alignItems:      'flex-start',
                gap:             '0.875rem',
                width:           '100%',
                background:      'none',
                border:          'none',
                cursor:          'pointer',
                padding:         `0.625rem 0.75rem 0.625rem 0`,
                marginBottom:    idx < TRAILS.length - 1 ? '0.25rem' : 0,
                textAlign:       'left',
                position:        'relative',
                backgroundColor: isActive ? 'rgba(26,46,64,0.04)' : 'transparent',
                borderLeft:      isActive ? `2px solid ${meta.color}` : '2px solid transparent',
                transition:      'all 0.25s ease-out',
              }}
            >
              {/* Timeline dot — overlaid on the vertical line */}
              <div style={{
                position:        'absolute',
                left:            '-1.75rem',
                top:             '50%',
                transform:       'translateY(-50%)',
                width:           isActive ? '14px' : '8px',
                height:          isActive ? '14px' : '8px',
                backgroundColor: isActive ? meta.color : 'var(--bone)',
                border:          `1px solid ${isActive ? meta.color : 'var(--indigo-30)'}`,
                borderRadius:    '0',
                transition:      'all 0.25s ease-out',
                flexShrink:      0,
              }} />

              {/* Trail labels */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily:    "'Cormorant Garamond', serif",
                  fontSize:      '1.05rem',
                  fontWeight:    600,
                  color:         isActive ? 'var(--indigo)' : 'var(--indigo-60)',
                  letterSpacing: '0.03em',
                  lineHeight:    1.1,
                  margin:        0,
                  transition:    'color 0.25s ease-out',
                }}>
                  {trail}
                </p>
                <p style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      '0.67rem',
                  color:         isActive ? meta.color : 'var(--indigo-30)',
                  letterSpacing: '0.06em',
                  marginTop:     '2px',
                  transition:    'color 0.25s ease-out',
                }}>
                  {meta.region}
                </p>
                {isActive && (
                  <p style={{
                    fontFamily:  "'Inter', sans-serif",
                    fontSize:    '0.68rem',
                    color:       'var(--indigo-60)',
                    lineHeight:  1.6,
                    marginTop:   '0.375rem',
                  }}>
                    {meta.desc}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LEFT PANEL
// ─────────────────────────────────────────────────────────────
function LeftPanel({
  selectedTrail, onSelectTrail,
  selectedMonth, onMonthSelect,
  flushInfo, activeCount, totalCount,
  trailMeta,
}) {
  return (
    <aside style={{
      width:           '42%',
      flexShrink:      0,
      borderRight:     '1px solid var(--indigo-12)',
      overflowY:       'auto',
      backgroundColor: 'var(--bone)',
      display:         'flex',
      flexDirection:   'column',
    }}>
      {/* Header */}
      <div style={{
        padding:       '2rem 1.75rem 1.5rem',
        borderBottom:  '1px solid var(--indigo-12)',
        flexShrink:    0,
      }}>
        <p style={{
          fontFamily:    "'Inter', sans-serif",
          fontSize:      '0.6rem',
          fontWeight:    700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color:         'var(--indigo-30)',
          marginBottom:  '0.5rem',
        }}>
          Heritage Explorer
        </p>
        <h2 style={{
          fontFamily:    "'Cormorant Garamond', serif",
          fontSize:      '2rem',
          fontWeight:    600,
          color:         'var(--indigo)',
          letterSpacing: '0.04em',
          lineHeight:    1.1,
          margin:        '0 0 0.5rem 0',
        }}>
          Tea Heritage
          <br />
          <span style={{ color: 'var(--gold)' }}>Explorer</span>
        </h2>
        <p style={{
          fontFamily:  "'Inter', sans-serif",
          fontSize:    '0.78rem',
          color:       'var(--indigo-60)',
          lineHeight:  1.7,
          margin:      0,
        }}>
          Navigate British-era estate bungalows across
          three Assam trail circuits. Select a month to
          filter estates by active harvest season.
        </p>
      </div>

      {/* Trail timeline */}
      <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid var(--indigo-12)', flexShrink: 0 }}>
        <TrailTimeline selectedTrail={selectedTrail} onSelectTrail={onSelectTrail} />
      </div>

      {/* Active trail coordinates annotation */}
      {trailMeta && (
        <div style={{
          padding:         '0.875rem 1.75rem',
          borderBottom:    '1px solid var(--indigo-12)',
          backgroundColor: 'var(--indigo-06)',
          flexShrink:      0,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--indigo-30)', marginBottom: '2px' }}>Circuit Centre</p>
              <p style={{ fontFamily: "'Inter', monospace, sans-serif", fontSize: '0.7rem', color: 'var(--indigo)' }}>{trailMeta.coords}</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--indigo-30)', marginBottom: '2px' }}>Region</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'var(--indigo)' }}>{trailMeta.region}</p>
            </div>
          </div>
        </div>
      )}

      {/* Month slider */}
      <div style={{ padding: '1.375rem 1.75rem', borderBottom: '1px solid var(--indigo-12)', flexShrink: 0 }}>
        <MonthStepBar selectedMonth={selectedMonth} onMonthSelect={onMonthSelect} />

        {/* Flush annotation panel — slides in on month select */}
        <FlushAnnotation
          selectedMonth={selectedMonth}
          flushInfo={flushInfo}
          activeCount={activeCount}
          totalCount={totalCount}
        />
      </div>

      {/* Season legend */}
      <div style={{ padding: '1.25rem 1.75rem', flexShrink: 0 }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--indigo-30)', marginBottom: '0.75rem' }}>
          Season Legend
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { label: 'First Flush',    months: 'Mar — Apr', color: '#DCA134' },
            { label: 'Second Flush',   months: 'May — Jun', color: '#C87A22' },
            { label: 'Monsoon Flush',  months: 'Jul — Aug', color: '#3A6B4A' },
            { label: 'Autumnal Flush', months: 'Sep — Oct', color: '#8B4513' },
            { label: 'Late Harvest',   months: 'Nov',        color: '#5A3800' },
          ].map(({ label, months, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '20px', height: '3px', backgroundColor: color, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'var(--indigo-60)', flex: 1 }}>
                {label}
              </span>
              <span style={{ fontFamily: "'Inter', monospace, sans-serif", fontSize: '0.65rem', color: 'var(--indigo-30)' }}>
                {months}
              </span>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}

// ─────────────────────────────────────────────────────────────
// RIGHT PANEL
// ─────────────────────────────────────────────────────────────
function RightPanel({ selectedTrail, onTrailIntersect }) {
  const meta = TRAIL_META[selectedTrail];

  return (
    <div style={{
      flex:            1,
      overflow:        'hidden',
      backgroundColor: 'var(--bone)',
      display:         'flex',
      flexDirection:   'column',
    }}>
      {/* Right panel header strip */}
      <div style={{
        padding:         '1.125rem 1.5rem',
        borderBottom:    '1px solid var(--indigo-12)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        flexShrink:      0,
        backgroundColor: 'var(--bone)',
        gap:             '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Trail colour bar */}
          <div style={{ width: '3px', height: '36px', backgroundColor: meta?.color || 'var(--gold)', flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--indigo-30)', marginBottom: '2px' }}>
              Active Trail Circuit
            </p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: 'var(--indigo)', margin: 0, letterSpacing: '0.02em' }}>
              {selectedTrail}
            </h3>
          </div>
        </div>
      </div>

      {/* Asymmetric Editorial Filmstrip */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <EditorialFilmstrip
          selectedTrail={selectedTrail}
          onTrailIntersect={onTrailIntersect}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT — TeaHeritageExplorer
// ─────────────────────────────────────────────────────────────
export default function TeaHeritageExplorer() {
  const [selectedTrail, setSelectedTrail] = useState('Jorhat Trail');
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Derive filtered data
  const trailEstates  = teaEstates.filter(e => e.region === selectedTrail);
  const activeIds     = new Set(
    selectedMonth
      ? trailEstates.filter(e => e.harvestMonths.includes(selectedMonth)).map(e => e.id)
      : []
  );
  const flushInfo     = selectedMonth ? FLUSH_DATA[selectedMonth] : null;
  const trailMeta     = TRAIL_META[selectedTrail];

  const handleTrailSelect = useCallback((trail) => {
    setSelectedTrail(trail);
    setSelectedMonth(null); // reset month filter on trail change
  }, []);

  return (
    <>
      {/* Inline keyframe for the active dot pulse */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>

      {/* Split-screen container — fills viewport below navbar */}
      <div style={{
        height:          'calc(100vh - 64px)',
        display:         'flex',
        flexDirection:   'row',
        overflow:        'hidden',
        backgroundColor: 'var(--bone)',
      }}
      className="md:flex-row flex-col"
      >
        {/* ── LEFT PANEL ──────────────────────────────── */}
        <LeftPanel
          selectedTrail={selectedTrail}
          onSelectTrail={handleTrailSelect}
          selectedMonth={selectedMonth}
          onMonthSelect={setSelectedMonth}
          flushInfo={flushInfo}
          activeCount={activeIds.size}
          totalCount={trailEstates.length}
          trailMeta={trailMeta}
        />

        {/* ── Vertical 1px divider ─────────────────────── */}
        <div style={{ width: '1px', backgroundColor: 'var(--indigo-12)', flexShrink: 0 }} />

        {/* ── RIGHT PANEL ─────────────────────────────── */}
        <RightPanel
          selectedTrail={selectedTrail}
          onTrailIntersect={setSelectedTrail}
        />
      </div>
    </>
  );
}
