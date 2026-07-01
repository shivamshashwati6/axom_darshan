/**
 * TeaMolecularCalculator.jsx
 * ─────────────────────────────────────────────────────────────
 * "Flush to Cup" Molecular Calculator
 * Theme: Heritage Weaver (Textured Minimalism)
 *
 * An interactive, purely math-driven scientific chart and data panel
 * tracking the chemical transformation of Assam tea across the seasons.
 *
 * Features:
 *  - Custom 1px-stroke SVG coordinate scatter graph mapping Oxidation % (X)
 *    and Caffeine & Body Intensity % (Y) with gridlines and dynamic cursor.
 *  - Month scrubber timeline (March to November) with a sharp square thumb.
 *  - Dynamic coordinate translation (X: 0-100% -> 50-250 SVG pixels, Y: 0-100% -> 250-50 SVG pixels).
 *  - Technical readout panel in Eri Silk Cream (#EADCC9) detailing chemical profile
 *    and physical manufacturing step flows inside Assamese tea factories.
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from 'react';

// ── Scientific Seasonal Data Matrix ───────────────────────────
const SEASONAL_DATA = {
  3: {
    month: 'March',
    flushName: 'First Flush (Early Spring)',
    oxidation: 10, // 10%
    caffeine: 65,  // 65%
    flavor: 'Floral, Brisk, Vegetal',
    color: '#DCA134', // Muga Gold
    factoryProcess: 'Solar Withering → Gentle Rolling → Mechanical Sorting',
    molecularNotes: 'High levels of unoxidized Epigallocatechin gallate (EGCG). Light, floral profile with brisk liquor.',
  },
  4: {
    month: 'April',
    flushName: 'First Flush (Peak Spring)',
    oxidation: 15,
    caffeine: 68,
    flavor: 'Grassy, Sweet Nectar, Floral',
    color: '#DCA134',
    factoryProcess: 'Controlled Ambient Withering → Light Hand-Rolling → Sorting',
    molecularNotes: 'Peak amino acid (L-Theanine) concentration, providing clean cognitive focus with minimal bitterness.',
  },
  5: {
    month: 'May',
    flushName: 'Second Flush (Early Summer)',
    oxidation: 90,
    caffeine: 90,
    flavor: 'Stone Fruit, Rich Malt',
    color: '#C87A22',
    factoryProcess: 'Deep Withering → Hard Press Rolling → Thermal Oxidation → High Firing',
    molecularNotes: 'Synthesis of complex theaflavins and thearubigins. Full body with sweet malt character.',
  },
  6: {
    month: 'June',
    flushName: 'Second Flush (Peak Muscatel)',
    oxidation: 100,
    caffeine: 95,
    flavor: 'Rich Muscatel, Bold Cocoa, Malt',
    color: '#C87A22',
    factoryProcess: 'Deep Withering → Hard Rolling → Full Aerobic Oxidation → High-Heat Firing',
    molecularNotes: 'Maximum theaflavin concentration. Highest caffeine content of the season. Classic stout Assam profile.',
  },
  7: {
    month: 'July',
    flushName: 'Monsoon Flush (Early Rains)',
    oxidation: 100,
    caffeine: 78,
    flavor: 'Earthy, Woody, Robust',
    color: '#3A6B4A',
    factoryProcess: 'Rapid CTC Crushing & Tearing → Continuous Bed Fermentation → Rotary Drying',
    molecularNotes: 'Rapid enzymatic oxidation. High water content in leaves slightly dilutes soluble solids.',
  },
  8: {
    month: 'August',
    flushName: 'Monsoon Flush (Peak Rains)',
    oxidation: 100,
    caffeine: 75,
    flavor: 'Earthy, Pungent, Heavy',
    color: '#3A6B4A',
    factoryProcess: 'CTC Processing → Rapid Humid Fermentation → Fluidized Bed Drying',
    molecularNotes: 'High chlorophyll preservation due to rapid processing, producing deep red-brown liquor.',
  },
  9: {
    month: 'September',
    flushName: 'Monsoon Flush (Late Rains)',
    oxidation: 95,
    caffeine: 70,
    flavor: 'Mellow Earth, Leather',
    color: '#3A6B4A',
    factoryProcess: 'CTC & Orthodox Hybrid → Ambient Oxidation → Standard Firing',
    molecularNotes: 'Transition period. Leaf chemistry stabilizes as monsoon precipitation drops.',
  },
  10: {
    month: 'October',
    flushName: 'Autumnal Flush (Golden Autumn)',
    oxidation: 90,
    caffeine: 55,
    flavor: 'Amber Honey, Roasted Grain, Mellow',
    color: '#8B4513',
    factoryProcess: 'Slow Sun-Withering → Medium Rolling → Balanced Oxidation → Pan-Firing',
    molecularNotes: 'Complex soluble carbohydrate accumulation in leaf cells, enhancing natural sweetness and reducing astringency.',
  },
  11: {
    month: 'November',
    flushName: 'Autumnal Flush (Late Frost)',
    oxidation: 85,
    caffeine: 50,
    flavor: 'Sweet Woody, Dried Fruits, Smooth',
    color: '#5A3800',
    factoryProcess: 'Cold-Air Withering → Balanced Rolling → Slow Oxidation → Double Pan-Firing',
    molecularNotes: 'Metabolic slowdown in tea bushes concentrates simple sugars. Mellow cup with deep amber clarity.',
  },
};

const MONTH_KEYS = [3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function TeaMolecularCalculator() {
  const [selectedMonth, setSelectedMonth] = useState(6); // Default June (Peak Muscatel)

  const activeData = SEASONAL_DATA[selectedMonth];

  // Convert percentages (0-100) to SVG viewbox coordinates (50 to 250)
  // X: 0% -> 50px, 100% -> 250px
  // Y: 0% -> 250px, 100% -> 50px
  const getX = (val) => 50 + (val / 100) * 200;
  const getY = (val) => 250 - (val / 100) * 200;

  const currentX = getX(activeData.oxidation);
  const currentY = getY(activeData.caffeine);

  return (
    <section
      aria-label="Flush to Cup Molecular Calculator"
      style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}
    >
      {/* ── Section Header ──────────────────────────────── */}
      <div
        className="px-6 md:px-16 pt-16 pb-12"
        style={{ borderBottom: '1px solid var(--indigo-12)' }}
      >
        <p className="muted-label mb-3">Tea Science & Terroir</p>
        <h2 className="section-heading mb-3">"Flush to Cup" Molecular Calculator</h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: 'var(--indigo-60)',
            lineHeight: 1.75,
            maxWidth: '640px',
          }}
        >
          An interactive scientific matrix mapping the molecular composition of Assam tea.
          Scrub the timeline below to watch the chemical transition between oxidation, caffeine concentration,
          and factory manufacturing sequences across the seasons.
        </p>
      </div>

      <div className="geo-divider" />

      <div className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
        {/* ── Timeline Slider ────────────────────────────── */}
        <div className="mb-12" style={{ maxWidth: '720px' }}>
          <label
            htmlFor="month-range"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--indigo-60)',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Seasonal Timeline Scrubber — {activeData.month}
          </label>

          <div style={{ position: 'relative', padding: '0.5rem 0' }}>
            <input
              id="month-range"
              type="range"
              min="3"
              max="11"
              step="1"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              style={{
                width: '100%',
                cursor: 'pointer',
                accentColor: 'var(--indigo)',
                background: 'var(--indigo-12)',
                height: '2px',
                borderRadius: '0',
                outline: 'none',
              }}
            />
            {/* Custom Scale ticks */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
              {MONTH_KEYS.map((k) => (
                <button
                  key={k}
                  onClick={() => setSelectedMonth(k)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.65rem',
                    fontWeight: selectedMonth === k ? 700 : 400,
                    color: selectedMonth === k ? 'var(--indigo)' : 'var(--indigo-30)',
                    transition: 'color 0.2s',
                  }}
                >
                  {SEASONAL_DATA[k].month.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Layout Grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Column: Pure SVG Geometric Scatter Plot */}
          <div
            style={{
              backgroundColor: 'var(--bone)',
              border: '1px solid var(--indigo-12)',
              padding: '1.5rem',
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--indigo)',
                letterSpacing: '0.02em',
                marginBottom: '1rem',
              }}
            >
              Chemical Profile Matrix
            </h3>

            <svg
              width="100%"
              viewBox="0 0 300 300"
              style={{
                backgroundColor: 'var(--bone)',
                border: '1px solid var(--indigo-06)',
              }}
            >
              {/* Grid Lines */}
              {[50, 100, 150, 200, 250].map((pos) => (
                <g key={pos}>
                  {/* Vertical lines */}
                  <line
                    x1={pos}
                    y1="50"
                    x2={pos}
                    y2="250"
                    stroke="var(--indigo-12)"
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                  />
                  {/* Horizontal lines */}
                  <line
                    x1="50"
                    y1={pos}
                    x2="250"
                    y2={pos}
                    stroke="var(--indigo-12)"
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                  />
                </g>
              ))}

              {/* Axes lines */}
              <line x1="50" y1="250" x2="270" y2="250" stroke="var(--indigo)" strokeWidth="1" />
              <line x1="50" y1="250" x2="50" y2="30" stroke="var(--indigo)" strokeWidth="1" />

              {/* Axes arrow heads */}
              <polygon points="270,248 275,250 270,252" fill="var(--indigo)" />
              <polygon points="48,30 50,25 52,30" fill="var(--indigo)" />

              {/* Axis Labels */}
              <text
                x="160"
                y="275"
                textAnchor="middle"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '8px',
                  fontWeight: 600,
                  fill: 'var(--indigo-60)',
                  letterSpacing: '0.08em',
                }}
              >
                OXIDATION LEVEL (%)
              </text>
              <text
                x="15"
                y="150"
                textAnchor="middle"
                transform="rotate(-90, 15, 150)"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '8px',
                  fontWeight: 600,
                  fill: 'var(--indigo-60)',
                  letterSpacing: '0.08em',
                }}
              >
                CAFFEINE & BODY INTENSITY (%)
              </text>

              {/* Min/Max indicators */}
              <text x="50" y="260" textAnchor="middle" style={{ fontFamily: "'Inter', monospace", fontSize: '6px', fill: 'var(--indigo-30)' }}>0</text>
              <text x="250" y="260" textAnchor="middle" style={{ fontFamily: "'Inter', monospace", fontSize: '6px', fill: 'var(--indigo-30)' }}>100</text>
              <text x="42" y="250" textAnchor="end" style={{ fontFamily: "'Inter', monospace", fontSize: '6px', fill: 'var(--indigo-30)' }}>0</text>
              <text x="42" y="50" textAnchor="end" style={{ fontFamily: "'Inter', monospace", fontSize: '6px', fill: 'var(--indigo-30)' }}>100</text>

              {/* Coordinate point trace path (historical seasonal arc) */}
              <path
                d={`M ${getX(10)},${getY(65)} 
                   C ${getX(15)},${getY(68)} ${getX(90)},${getY(90)} ${getX(100)},${getY(95)}
                   S ${getX(100)},${getY(75)} ${getX(90)},${getY(55)}
                   L ${getX(85)},${getY(50)}`}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.8"
                strokeDasharray="4,3"
                opacity="0.5"
              />

              {/* Dynamic Crosshair Guides */}
              <line
                x1="50"
                y1={currentY}
                x2={currentX}
                y2={currentY}
                stroke={activeData.color}
                strokeWidth="0.5"
                strokeOpacity="0.4"
                style={{ transition: 'all 0.5s ease-in-out' }}
              />
              <line
                x1={currentX}
                y1="250"
                x2={currentX}
                y2={currentY}
                stroke={activeData.color}
                strokeWidth="0.5"
                strokeOpacity="0.4"
                style={{ transition: 'all 0.5s ease-in-out' }}
              />

              {/* Current Active Data Marker - Sharp Square */}
              <rect
                x={currentX - 4}
                y={currentY - 4}
                width="8"
                height="8"
                fill={activeData.color}
                stroke="var(--indigo)"
                strokeWidth="1"
                style={{ transition: 'all 0.5s ease-in-out' }}
              />
            </svg>
          </div>

          {/* Right Column: Technical Annotation Panel */}
          <div
            style={{
              backgroundColor: 'var(--cream)',
              border: '1px solid var(--indigo)',
              padding: '2rem 1.75rem',
            }}
          >
            <p className="muted-label mb-2">Molecular Profile</p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--indigo)',
                letterSpacing: '0.02em',
                marginBottom: '1rem',
              }}
            >
              {activeData.flushName.toUpperCase()}
            </h3>

            {/* Metric blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  border: '1px solid var(--indigo-12)',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bone)',
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--indigo-30)' }}>
                  Oxidation Level
                </span>
                <p style={{ fontFamily: "'Inter', monospace, sans-serif", fontSize: '1.25rem', fontWeight: 600, color: 'var(--indigo)', marginTop: '2px' }}>
                  {activeData.oxidation}%
                </p>
              </div>

              <div
                style={{
                  border: '1px solid var(--indigo-12)',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bone)',
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--indigo-30)' }}>
                  Caffeine Index
                </span>
                <p style={{ fontFamily: "'Inter', monospace, sans-serif", fontSize: '1.25rem', fontWeight: 600, color: 'var(--indigo)', marginTop: '2px' }}>
                  {activeData.caffeine}%
                </p>
              </div>
            </div>

            {/* Flavor coordinates */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--indigo-30)' }}>
                Flavor coordinates
              </span>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--indigo)', fontWeight: 600, marginTop: '2px' }}>
                {activeData.flavor}
              </p>
            </div>

            {/* Manufacturing step progression flow */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--indigo-30)' }}>
                Active Factory Processing Sequence
              </span>
              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeData.factoryProcess.split('→').map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontFamily: "'Inter', monospace",
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        backgroundColor: 'var(--indigo)',
                        color: 'var(--bone)',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'var(--indigo)', fontWeight: 500 }}>
                      {step.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Molecular science details */}
            <div style={{ borderTop: '1px solid var(--indigo-12)', paddingTop: '1.25rem' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--indigo-30)' }}>
                Cellular & Organic Analysis
              </span>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'var(--indigo-60)', lineHeight: 1.65, marginTop: '4px' }}>
                {activeData.molecularNotes}
              </p>
            </div>

          </div>
        </div>

      </div>

      <div className="geo-divider" />
    </section>
  );
}
