/**
 * HeritageFabricGrid.jsx
 * ─────────────────────────────────────────────────────────────
 * Heritage Fabric Grid — Weaver Connection
 * Theme: Heritage Weaver (Textured Minimalism)
 *
 * A premium connection grid for Assam artisanal clusters.
 * Architecture:
 *  - Bone (#F9F8F6) canvas wrapper
 *  - Cream (#EADCC9) flat cards, 1px Deep Indigo border
 *  - Gold (#DCA134) top-border reveal on hover (CSS transition)
 *  - Inline SVG geometric motif watermark — faint at rest,
 *    brightens on hover; a full description panel slides in
 *  - Technical annotation typography for materials & coordinates
 *  - Zero border-radius, zero box-shadow throughout
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { weaverClusters } from '../data/weaverData';

// ─────────────────────────────────────────────────────────────
// MOTIF SVG LIBRARY
// Each motif is a 80x80 viewBox vector drawing using 1px-weight
// strokes in `currentColor`. Rendered at two sizes:
//   • Watermark: 56px, low opacity, top-right of card header
//   • Reveal panel: 72px, full opacity, in the hover panel
// ─────────────────────────────────────────────────────────────
function MotifSVG({ name, size = 56 }) {
  const shared = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const motifs = {

    /* Miri Cross-Diamond ─────────────────────────────────── */
    'Miri Cross-Diamond': (
      <svg width={size} height={size} viewBox="0 0 80 80" {...shared}>
        {/* Outer diamond */}
        <polygon points="40,4 76,40 40,76 4,40" strokeWidth="1" />
        {/* Inner diamond */}
        <polygon points="40,18 62,40 40,62 18,40" strokeWidth="0.8" />
        {/* Innermost diamond */}
        <polygon points="40,29 51,40 40,51 29,40" strokeWidth="0.6" />
        {/* Cross axes */}
        <line x1="40" y1="4"  x2="40" y2="76" strokeWidth="0.4" strokeOpacity="0.4" />
        <line x1="4"  y1="40" x2="76" y2="40" strokeWidth="0.4" strokeOpacity="0.4" />
        {/* Cardinal arrowheads */}
        <polygon points="40,2 43,8 40,6 37,8"   fill="currentColor" strokeWidth="0" />
        <polygon points="78,40 72,43 74,40 72,37" fill="currentColor" strokeWidth="0" />
        <polygon points="40,78 37,72 40,74 43,72" fill="currentColor" strokeWidth="0" />
        <polygon points="2,40 8,37 6,40 8,43"    fill="currentColor" strokeWidth="0" />
        {/* Centre dot */}
        <circle cx="40" cy="40" r="2.5" fill="currentColor" strokeWidth="0" />
      </svg>
    ),

    /* Kingkhap Royal Brocade ─────────────────────────────── */
    'Kingkhap Royal Brocade': (
      <svg width={size} height={size} viewBox="0 0 80 80" {...shared}>
        {/* Horizontal register bands */}
        <line x1="4"  y1="14" x2="76" y2="14" strokeWidth="1.2" />
        <line x1="4"  y1="40" x2="76" y2="40" strokeWidth="1.8" />
        <line x1="4"  y1="66" x2="76" y2="66" strokeWidth="1.2" />
        {/* Thinner flanking lines */}
        <line x1="4"  y1="8"  x2="76" y2="8"  strokeWidth="0.5" strokeOpacity="0.5" />
        <line x1="4"  y1="72" x2="76" y2="72" strokeWidth="0.5" strokeOpacity="0.5" />
        {/* Full diagonal lattice */}
        <line x1="4"  y1="4"  x2="76" y2="76" strokeWidth="0.5" strokeOpacity="0.35" />
        <line x1="76" y1="4"  x2="4"  y2="76" strokeWidth="0.5" strokeOpacity="0.35" />
        <line x1="4"  y1="26" x2="54" y2="76" strokeWidth="0.4" strokeOpacity="0.25" />
        <line x1="26" y1="4"  x2="76" y2="54" strokeWidth="0.4" strokeOpacity="0.25" />
        <line x1="26" y1="76" x2="76" y2="26" strokeWidth="0.4" strokeOpacity="0.25" />
        <line x1="4"  y1="54" x2="54" y2="4"  strokeWidth="0.4" strokeOpacity="0.25" />
        {/* Central diamond medallion */}
        <polygon points="40,24 56,40 40,56 24,40" strokeWidth="1" />
        <polygon points="40,32 48,40 40,48 32,40" strokeWidth="0.7" />
        {/* Central fill */}
        <circle cx="40" cy="40" r="3" fill="currentColor" strokeWidth="0" />
        {/* Vertical border ticks */}
        <line x1="4"  y1="4"  x2="4"  y2="76" strokeWidth="0.8" />
        <line x1="76" y1="4"  x2="76" y2="76" strokeWidth="0.8" />
      </svg>
    ),

    /* Jonbiri Crescent ───────────────────────────────────── */
    'Jonbiri Crescent': (
      <svg width={size} height={size} viewBox="0 0 80 80" {...shared}>
        {/* Left crescent */}
        <path d="M 28,12 A 28,28 0 0,1 28,68 A 20,20 0 0,0 28,12" strokeWidth="1" />
        {/* Right crescent */}
        <path d="M 52,12 A 28,28 0 0,0 52,68 A 20,20 0 0,1 52,12" strokeWidth="1" />
        {/* Horizontal axis */}
        <line x1="12" y1="40" x2="68" y2="40" strokeWidth="0.5" strokeOpacity="0.4" />
        {/* Centre diamond field */}
        <polygon points="40,26 50,40 40,54 30,40" strokeWidth="0.8" />
        <polygon points="40,31 45,40 40,49 35,40" strokeWidth="0.5" strokeOpacity="0.6" />
        {/* Apex dots */}
        <circle cx="40" cy="10" r="2.5" fill="currentColor" strokeWidth="0" />
        <circle cx="40" cy="70" r="2.5" fill="currentColor" strokeWidth="0" />
        {/* Side points */}
        <circle cx="40" cy="40" r="2" fill="currentColor" strokeWidth="0" />
        {/* Outer frame */}
        <rect x="6" y="6" width="68" height="68" strokeWidth="0.4" strokeOpacity="0.2" />
      </svg>
    ),

    /* Mising Wave Stripe ─────────────────────────────────── */
    'Mising Wave Stripe': (
      <svg width={size} height={size} viewBox="0 0 80 80" {...shared}>
        {/* Wave bands — wide */}
        <path d="M 4,20 Q 14,12 24,20 Q 34,28 44,20 Q 54,12 64,20 Q 74,28 76,20" strokeWidth="1.2" />
        <path d="M 4,40 Q 14,32 24,40 Q 34,48 44,40 Q 54,32 64,40 Q 74,48 76,40" strokeWidth="1.8" />
        <path d="M 4,60 Q 14,52 24,60 Q 34,68 44,60 Q 54,52 64,60 Q 74,68 76,60" strokeWidth="1.2" />
        {/* Thin flanking waves */}
        <path d="M 4,12 Q 14,8  24,12 Q 34,16 44,12 Q 54,8  64,12 Q 74,16 76,12" strokeWidth="0.5" strokeOpacity="0.4" />
        <path d="M 4,68 Q 14,64 24,68 Q 34,72 44,68 Q 54,64 64,68 Q 74,72 76,68" strokeWidth="0.5" strokeOpacity="0.4" />
        {/* Vertical count marks — warp threads */}
        {[16, 28, 40, 52, 64].map(x => (
          <line key={x} x1={x} y1="6" x2={x} y2="74" strokeWidth="0.3" strokeOpacity="0.25" />
        ))}
        {/* Border lines */}
        <line x1="4" y1="4"  x2="76" y2="4"  strokeWidth="0.8" />
        <line x1="4" y1="76" x2="76" y2="76" strokeWidth="0.8" />
      </svg>
    ),

    /* Gamosa Flame Border ────────────────────────────────── */
    'Gamosa Flame Border': (
      <svg width={size} height={size} viewBox="0 0 80 80" {...shared}>
        {/* Outer frame */}
        <rect x="4" y="4" width="72" height="72" strokeWidth="1" />
        {/* Inner frame */}
        <rect x="10" y="10" width="60" height="60" strokeWidth="0.5" strokeOpacity="0.5" />
        {/* Top flame row — seven peaks */}
        <polyline points="10,26 16,14 22,26 28,14 34,26 40,14 46,26 52,14 58,26 64,14 70,26" strokeWidth="1.2" />
        {/* Bottom flame row */}
        <polyline points="10,54 16,66 22,54 28,66 34,54 40,66 46,54 52,66 58,54 64,66 70,54" strokeWidth="1.2" />
        {/* Central stripe field */}
        <line x1="10" y1="36" x2="70" y2="36" strokeWidth="1.5" />
        <line x1="10" y1="44" x2="70" y2="44" strokeWidth="1.5" />
        <line x1="10" y1="40" x2="70" y2="40" strokeWidth="0.5" strokeOpacity="0.5" />
        {/* Corner marks */}
        {[[10,10],[70,10],[10,70],[70,70]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" strokeWidth="0" />
        ))}
      </svg>
    ),

    /* Ahom Medallion Star ────────────────────────────────── */
    'Ahom Medallion Star': (
      <svg width={size} height={size} viewBox="0 0 80 80" {...shared}>
        {/* Outer square frame */}
        <rect x="6" y="6" width="68" height="68" strokeWidth="1" />
        {/* Inner square — rotated 45deg */}
        <polygon points="40,10 70,40 40,70 10,40" strokeWidth="0.8" />
        {/* Eight-point star */}
        <polygon points="40,14 44,36 66,40 44,44 40,66 36,44 14,40 36,36" strokeWidth="1" />
        {/* Inner octagon */}
        <polygon points="40,22 50,30 58,40 50,50 40,58 30,50 22,40 30,30" strokeWidth="0.6" strokeOpacity="0.7" />
        {/* Radial axis lines */}
        <line x1="40" y1="6"  x2="40" y2="74" strokeWidth="0.4" strokeOpacity="0.3" />
        <line x1="6"  y1="40" x2="74" y2="40" strokeWidth="0.4" strokeOpacity="0.3" />
        <line x1="14" y1="14" x2="66" y2="66" strokeWidth="0.4" strokeOpacity="0.3" />
        <line x1="66" y1="14" x2="14" y2="66" strokeWidth="0.4" strokeOpacity="0.3" />
        {/* Centre */}
        <circle cx="40" cy="40" r="4" strokeWidth="0.8" />
        <circle cx="40" cy="40" r="1.5" fill="currentColor" strokeWidth="0" />
        {/* Corner inset diamonds */}
        {[[18,18],[62,18],[18,62],[62,62]].map(([x,y],i) => (
          <polygon key={i} points={`${x},${y-5} ${x+5},${y} ${x},${y+5} ${x-5},${y}`} strokeWidth="0.6" />
        ))}
      </svg>
    ),

    /* Dokhona Chevron Stack ──────────────────────────────── */
    'Dokhona Chevron Stack': (
      <svg width={size} height={size} viewBox="0 0 80 80" {...shared}>
        {/* Five stacked chevrons — widest at bottom, narrowest at top */}
        <polyline points="10,68 40,58 70,68" strokeWidth="1.8" />
        <polyline points="14,56 40,46 66,56" strokeWidth="1.4" />
        <polyline points="18,44 40,34 62,44" strokeWidth="1.1" />
        <polyline points="22,32 40,22 58,32" strokeWidth="0.9" />
        <polyline points="26,20 40,12 54,20" strokeWidth="0.7" />
        {/* Sub-chevron echo lines */}
        <polyline points="10,72 40,62 70,72" strokeWidth="0.5" strokeOpacity="0.35" />
        <polyline points="14,60 40,50 66,60" strokeWidth="0.4" strokeOpacity="0.3" />
        {/* Vertical centre axis */}
        <line x1="40" y1="8" x2="40" y2="76" strokeWidth="0.4" strokeOpacity="0.25" />
        {/* Left and right border */}
        <line x1="6" y1="6" x2="6" y2="74" strokeWidth="0.7" />
        <line x1="74" y1="6" x2="74" y2="74" strokeWidth="0.7" />
        {/* Top and bottom rules */}
        <line x1="6" y1="6"  x2="74" y2="6"  strokeWidth="0.7" />
        <line x1="6" y1="74" x2="74" y2="74" strokeWidth="0.7" />
      </svg>
    ),

    /* Bihu Phool Octet ───────────────────────────────────── */
    'Bihu Phool Octet': (
      <svg width={size} height={size} viewBox="0 0 80 80" {...shared}>
        {/* Eight rhombus petals */}
        <polygon points="40,8 46,40 40,72 34,40"  strokeWidth="0.9" />
        <polygon points="8,40 40,46 72,40 40,34"  strokeWidth="0.9" />
        <polygon points="16,16 46,34 64,64 34,46" strokeWidth="0.9" />
        <polygon points="64,16 46,46 16,64 34,34" strokeWidth="0.9" />
        {/* Inner petal ring */}
        <polygon points="40,20 44,40 40,60 36,40" strokeWidth="0.5" strokeOpacity="0.5" />
        <polygon points="20,40 40,44 60,40 40,36" strokeWidth="0.5" strokeOpacity="0.5" />
        {/* Outer boundary circle */}
        <circle cx="40" cy="40" r="34" strokeWidth="0.5" strokeOpacity="0.3" />
        {/* Inner boundary circle */}
        <circle cx="40" cy="40" r="16" strokeWidth="0.7" strokeOpacity="0.6" />
        {/* Centre core */}
        <circle cx="40" cy="40" r="4.5" strokeWidth="0.9" />
        <circle cx="40" cy="40" r="2"   fill="currentColor" strokeWidth="0" />
        {/* Petal tip dots */}
        {[
          [40,6],[74,40],[40,74],[6,40],
          [63,17],[63,63],[17,63],[17,17],
        ].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1.8" fill="currentColor" strokeWidth="0" />
        ))}
      </svg>
    ),
  };

  // Fallback — generic diamond if motif not found
  return motifs[name] ?? (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke="currentColor">
      <polygon points="40,6 74,40 40,74 6,40" strokeWidth="1" />
      <circle cx="40" cy="40" r="3" fill="currentColor" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// REGION FILTER PILLS
// ─────────────────────────────────────────────────────────────
const REGIONS = ['All', 'Central Assam', 'Lower Assam', 'Upper Assam', 'Western Assam'];

// ─────────────────────────────────────────────────────────────
// SINGLE WEAVER CARD
// ─────────────────────────────────────────────────────────────
function WeaverCard({ cluster, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="stagger-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        /* Flat block — zero border-radius, zero shadow */
        backgroundColor: 'var(--cream)',
        border: '1px solid var(--indigo)',
        borderTop: hovered
          ? '2px solid var(--gold)'
          : '2px solid var(--indigo-12)',
        borderRadius: '0',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        /* Smooth border-top colour transition */
        transition: 'border-top-color 0.3s ease-out, background-color 0.3s ease-out',
        animationDelay: `${(index % 6) * 0.09}s`,
        position: 'relative',
      }}
    >

      {/* ── Card Header ───────────────────────────────────── */}
      <header
        style={{
          padding: '1.375rem 1.5rem 1.125rem',
          borderBottom: '1px solid var(--indigo-12)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        {/* Motif watermark — top-right, faint at rest, brightens on hover */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            right: '1.25rem',
            transform: 'translateY(-50%)',
            color: 'var(--indigo)',
            opacity: hovered ? 0.22 : 0.07,
            transition: 'opacity 0.35s ease-out',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <MotifSVG name={cluster.motif} size={54} />
        </div>

        {/* Established chip */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--indigo-60)',
            marginBottom: '0.25rem',
          }}
        >
          EST. {cluster.established} &nbsp;&middot;&nbsp; {cluster.weavers} WEAVERS
        </span>

        {/* Guild title */}
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.3rem',
            fontWeight: 600,
            color: 'var(--indigo)',
            letterSpacing: '0.03em',
            lineHeight: 1.15,
            margin: 0,
            paddingRight: '4rem', /* clear the watermark */
          }}
        >
          {cluster.title}
        </h3>

        {/* Cluster location */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.72rem',
            fontWeight: 500,
            color: 'var(--indigo-60)',
            letterSpacing: '0.05em',
            margin: 0,
          }}
        >
          ◆ {cluster.cluster}
        </p>
      </header>

      {/* ── Card Body ─────────────────────────────────────── */}
      <div style={{ padding: '1.125rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {/* Materials — technical annotation tags */}
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--indigo-30)',
              marginBottom: '0.5rem',
            }}
          >
            Materials
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {cluster.materials.map(mat => (
              <span
                key={mat}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.67rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  color: 'var(--indigo)',
                  padding: '0.18rem 0.55rem',
                  border: '1px solid var(--indigo-30)',
                  borderRadius: '0',
                  backgroundColor: 'transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Coordinates + Motif — two-column annotation row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--indigo-06)',
          }}
        >
          {/* Coordinates */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--indigo-30)',
              marginBottom: '0.3rem',
            }}>
              Coordinates
            </p>
            <p style={{
              fontFamily: "'Inter', monospace, sans-serif",
              fontSize: '0.7rem',
              fontWeight: 500,
              color: 'var(--indigo)',
              letterSpacing: '0.03em',
              lineHeight: 1.4,
            }}>
              {cluster.coordinates}
            </p>
          </div>

          {/* Motif name */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--indigo-30)',
              marginBottom: '0.3rem',
            }}>
              Signature Motif
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.85rem',
              fontWeight: 600,
              color: hovered ? 'var(--gold)' : 'var(--indigo)',
              fontStyle: 'italic',
              letterSpacing: '0.02em',
              lineHeight: 1.3,
              transition: 'color 0.3s ease-out',
            }}>
              {cluster.motif}
            </p>
          </div>
        </div>

        {/* Landmark annotation */}
        <div
          style={{
            paddingTop: '0.625rem',
            borderTop: '1px solid var(--indigo-06)',
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--indigo-30)',
            marginBottom: '0.3rem',
          }}>
            Exchange Point
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.72rem',
            color: 'var(--indigo-60)',
            letterSpacing: '0.03em',
          }}>
            {cluster.landmark}
          </p>
        </div>
      </div>

      {/* ── Hover Reveal Panel — Motif Description ─────────── */}
      {/*
       * CSS max-height transition: 0 → 200px creates a
       * smooth slide-in without JS animation libraries.
       * Paired with opacity for a premium fade+slide feel.
       */}
      <div
        aria-label={`Motif description: ${cluster.motif}`}
        style={{
          maxHeight: hovered ? '200px' : '0px',
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          transition: 'max-height 0.38s ease-out, opacity 0.3s ease-out',
          borderTop: hovered ? '1px solid var(--indigo-12)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            padding: '1.125rem 1.5rem',
            backgroundColor: 'var(--bone)',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Larger motif SVG */}
          <div
            style={{
              color: 'var(--gold)',
              flexShrink: 0,
              opacity: 0.85,
            }}
          >
            <MotifSVG name={cluster.motif} size={68} />
          </div>

          {/* Motif description text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '0.5rem',
            }}>
              Motif Annotation
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.92rem',
              fontStyle: 'italic',
              color: 'var(--indigo)',
              lineHeight: 1.65,
              margin: 0,
            }}>
              {cluster.motifDesc}
            </p>
          </div>
        </div>
      </div>

      {/* ── Card Footer — Connect CTA ──────────────────────── */}
      <footer
        style={{
          padding: '0.875rem 1.5rem',
          borderTop: '1px solid var(--indigo-12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: hovered ? 'rgba(220,161,52,0.04)' : 'transparent',
          transition: 'background-color 0.3s ease-out',
        }}
      >
        {/* Region tag */}
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--indigo-30)',
        }}>
          {cluster.region}
        </span>

        {/* Connect link with underline draw */}
        <ConnectLink hovered={hovered} contact={cluster.contact} />
      </footer>

    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// CONNECT LINK — Underline-draw hover effect (CSS-only)
// ─────────────────────────────────────────────────────────────
function ConnectLink({ hovered, contact }) {
  return (
    <a
      href={`mailto:${contact}`}
      onClick={e => e.preventDefault()} /* mock — prevents navigation */
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: hovered ? 'var(--gold)' : 'var(--indigo-60)',
        textDecoration: 'none',
        transition: 'color 0.3s ease-out',
      }}
    >
      Connect
      {/* Arrow — shifts 3px right on hover */}
      <span style={{
        fontSize: '0.65rem',
        display: 'inline-block',
        transform: hovered ? 'translateX(3px)' : 'translateX(0px)',
        transition: 'transform 0.3s ease-out',
      }}>
        →
      </span>
      {/* Underline draw — 0% → 100% width on hover */}
      <span style={{
        position: 'absolute',
        bottom: '-2px',
        left: 0,
        height: '1px',
        width: hovered ? '100%' : '0%',
        backgroundColor: 'var(--gold)',
        display: 'block',
        transition: 'width 0.32s ease-out',
      }} />
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT — Heritage Fabric Grid
// ─────────────────────────────────────────────────────────────
export default function HeritageFabricGrid() {
  const [activeRegion, setActiveRegion] = useState('All');

  const filtered =
    activeRegion === 'All'
      ? weaverClusters
      : weaverClusters.filter(c => c.region === activeRegion);

  return (
    <section
      aria-label="Heritage Fabric Grid — Weaver Connection"
      style={{ backgroundColor: 'var(--bone)' }}
    >

      {/* ── Section header ──────────────────────────────── */}
      <div
        className="px-6 md:px-16 pt-16 pb-12"
        style={{ borderBottom: '1px solid var(--indigo-12)' }}
      >
        {/* Gold diamond rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.6 }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="var(--gold)">
            <polygon points="4,0 8,4 4,8 0,4" />
          </svg>
          <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.6 }} />
        </div>

        <p className="muted-label mb-3">Weaver Connection</p>
        <h2 className="section-heading mb-3">Heritage Fabric Grid</h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.9rem',
          color: 'var(--indigo-60)',
          lineHeight: 1.75,
          maxWidth: '600px',
        }}>
          Eight active artisanal clusters across Assam — mapped by guild, material, motif
          tradition, and geographic coordinate. Hover any card to reveal the geometric
          annotation for that cluster&apos;s signature weave pattern.
        </p>
      </div>

      {/* ── Geo divider ─────────────────────────────────── */}
      <div className="geo-divider" />

      <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">

        {/* ── Region filter bar ───────────────────────────── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '3rem' }}>
          {REGIONS.map(region => {
            const isActive = activeRegion === region;
            return (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                style={{
                  padding: '0.35rem 0.875rem',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--indigo)' : 'var(--indigo-12)',
                  borderRadius: '0',
                  backgroundColor: isActive ? 'var(--indigo)' : 'transparent',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.06em',
                  color: isActive ? 'var(--bone)' : 'var(--indigo-60)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease-out',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--indigo-30)';
                    e.currentTarget.style.color = 'var(--indigo)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--indigo-12)';
                    e.currentTarget.style.color = 'var(--indigo-60)';
                  }
                }}
              >
                {region}
              </button>
            );
          })}

          {/* Cluster count */}
          <span style={{
            marginLeft: 'auto',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            color: 'var(--indigo-60)',
            letterSpacing: '0.05em',
          }}>
            {filtered.length} cluster{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Weaver card grid ─────────────────────────────── */}
        {/*
         * gap-8 (2rem) enforces generous whitespace between cards.
         * auto-fill + minmax(300px,1fr) gives us the responsive
         * 1 → 2 → 3 column breakpoint without media query overhead.
         */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {filtered.map((cluster, idx) => (
              <WeaverCard key={cluster.id} cluster={cluster} index={idx} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '6rem 1rem',
            border: '1px solid var(--indigo-12)',
            backgroundColor: 'var(--cream)',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--indigo-30)' }}>◇</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--indigo-60)' }}>
              No clusters in this region.
            </p>
          </div>
        )}

        {/* ── Map coordinate strip — decorative data table ── */}
        <div
          style={{
            marginTop: '4rem',
            border: '1px solid var(--indigo-12)',
            borderTop: '2px solid var(--indigo)',
            backgroundColor: 'var(--cream)',
            overflow: 'hidden',
          }}
        >
          {/* Table header */}
          <div
            style={{
              padding: '0.875rem 1.5rem',
              borderBottom: '1px solid var(--indigo-12)',
              backgroundColor: 'var(--indigo)',
              display: 'grid',
              gridTemplateColumns: '2fr 1.5fr 1fr 1fr',
              gap: '1rem',
            }}
          >
            {['Guild / Cooperative', 'Cluster Location', 'Coordinates', 'Signature Motif'].map(h => (
              <span key={h} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--bone)',
                opacity: 0.8,
              }}>
                {h}
              </span>
            ))}
          </div>

          {/* Table rows */}
          {weaverClusters.map((c, idx) => (
            <div
              key={c.id}
              style={{
                padding: '0.75rem 1.5rem',
                borderBottom: idx < weaverClusters.length - 1 ? '1px solid var(--indigo-06)' : 'none',
                display: 'grid',
                gridTemplateColumns: '2fr 1.5fr 1fr 1fr',
                gap: '1rem',
                alignItems: 'center',
                transition: 'background-color 0.2s ease-out',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--cream-dark)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: 'var(--indigo)', letterSpacing: '0.02em' }}>
                {c.title}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'var(--indigo-60)' }}>
                {c.cluster}
              </span>
              <span style={{ fontFamily: "'Inter', monospace, sans-serif", fontSize: '0.68rem', color: 'var(--indigo-60)', letterSpacing: '0.02em' }}>
                {c.coordinates}
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--indigo)', letterSpacing: '0.02em' }}>
                {c.motif}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom geo divider ──────────────────────────────── */}
      <div className="geo-divider-gold" style={{ opacity: 0.4 }} />

    </section>
  );
}
