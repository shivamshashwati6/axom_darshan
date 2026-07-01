/**
 * EditorialFilmstrip.jsx
 * ─────────────────────────────────────────────────────────────
 * Asymmetric "Infinite-Scroll" Editorial Filmstrip
 * Theme: Heritage Weaver (Textured Minimalism)
 *
 * Implements a premium, high-end editorial layout for the right media panel.
 * Composition Rules:
 *  - Alternating aspect ratios (3/4, 16/9, 1/1)
 *  - Asymmetric layout offsets (translate-y-4 vs -translate-y-6)
 *  - 1px crisp borders, rounded-none throughout
 *  - Staggered CSS-only GPU-accelerated transition animations (0ms, 100ms, 200ms lag)
 *  - Understated hover effects: border turns Gold, caption shifts down 4px
 *  - Scroll synchronization: Intercepts active trail state and emits updates
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react';
import { TRAIL_META } from '../data/teaEstateData';

// ── Curated High-End Scene/Landscape Metadata ──────────────────
const SCENES = [
  {
    id: 'sc1',
    trail: 'Jorhat Trail',
    title: 'The Great Chang Veranda',
    metadata: 'LAT 26.74° N // ELEV 116M // ORTHODOX',
    aspect: '3/4', // aspect-[3/4]
    caption: 'Veranda layout facing northern tea fields, constructed 1875.',
    offsetClass: 'translate-y-4',
  },
  {
    id: 'sc2',
    trail: 'Jorhat Trail',
    title: 'Dikom Estate Sentinel',
    metadata: 'LAT 27.45° N // ELEV 110M // HERITAGE BANYAN',
    aspect: '16/9', // aspect-[16/9]
    caption: 'Historical central Banyan tree framing plantation fields.',
    offsetClass: '-translate-y-6',
  },
  {
    id: 'sc3',
    trail: 'Jorhat Trail',
    title: 'Gymkhana Tea Exchange',
    metadata: 'LAT 26.77° N // ELEV 124M // PLUCK PATTERN',
    aspect: '1/1', // aspect-[1/1]
    caption: 'Restored Hollock timber rafters inside planters manor.',
    offsetClass: 'translate-y-2',
  },
  {
    id: 'sc4',
    trail: 'Dibrugarh Trail',
    title: 'Patkai Foothill Terraces',
    metadata: 'LAT 27.51° N // ELEV 185M // MOUNTAIN ORTHODOX',
    aspect: '16/9',
    caption: 'Asymmetrical terrace planting lanes bordering rainforest buffer.',
    offsetClass: 'translate-y-6',
  },
  {
    id: 'sc5',
    trail: 'Dibrugarh Trail',
    title: 'Steam Roller Frame',
    metadata: 'LAT 27.42° N // ELEV 108M // VINTAGE BRITANNIA',
    aspect: '3/4',
    caption: 'Industrial rolling drum frame preserved from 1921 line.',
    offsetClass: '-translate-y-4',
  },
  {
    id: 'sc6',
    trail: 'Dibrugarh Trail',
    title: 'First-Flush Leaf Bed',
    metadata: 'LAT 27.48° N // ELEV 190M // WITHERING BAY',
    aspect: '1/1',
    caption: 'Withering process room holding early spring organic harvest.',
    offsetClass: 'translate-y-0',
  },
  {
    id: 'sc7',
    trail: 'Sonitpur Trail',
    title: 'Jia Bharali River Confluence',
    metadata: 'LAT 26.85° N // ELEV 210M // ECO CAMP RANGE',
    aspect: '3/4',
    caption: 'Cold mountain riverbank flanking Sonitpur organic garden.',
    offsetClass: '-translate-y-8',
  },
  {
    id: 'sc8',
    trail: 'Sonitpur Trail',
    title: 'Wild Elephant Corridor Gate',
    metadata: 'LAT 26.57° N // ELEV 76M // WILDLIFE BUFFER',
    aspect: '16/9',
    caption: 'Natural migration line fencing boundary of Balipara retreat.',
    offsetClass: 'translate-y-4',
  },
  {
    id: 'sc9',
    trail: 'Sonitpur Trail',
    title: 'Molecular Canopy Research',
    metadata: 'LAT 26.71° N // ELEV 156M // ECOLOGICAL LAB',
    aspect: '1/1',
    caption: 'Shade trees mapping organic light absorption rates.',
    offsetClass: '-translate-y-2',
  },
];

// ─────────────────────────────────────────────────────────────
// VECTOR SCENE DRAWING PLACEHOLDER
// Renders dynamic, minimalist geometric wireframe art
// ─────────────────────────────────────────────────────────────
function SceneVector({ id, aspect, color }) {
  const enc = encodeURIComponent(color);
  
  // Custom abstract geometric sketches representing tea hills, river banks, and rafters
  const drawings = {
    sc1: (
      <svg viewBox="0 0 300 400" width="100%" height="100%" fill="none" stroke={color}>
        <rect x="20" y="20" width="260" height="360" strokeWidth="0.8" strokeDasharray="3,3" />
        <line x1="20" y1="200" x2="280" y2="200" strokeWidth="1" />
        {/* Chang stilt pillars */}
        {[60, 100, 140, 180, 220, 260].map((x) => (
          <line key={x} x1={x} y1="200" x2={x} y2="380" strokeWidth="0.5" strokeOpacity="0.4" />
        ))}
        {/* Horizon rays */}
        <polygon points="150,120 180,180 120,180" strokeWidth="0.8" />
      </svg>
    ),
    sc2: (
      <svg viewBox="0 0 400 225" width="100%" height="100%" fill="none" stroke={color}>
        <circle cx="200" cy="112" r="60" strokeWidth="0.8" />
        <circle cx="200" cy="112" r="40" strokeWidth="0.5" strokeDasharray="2,2" />
        {/* Branches */}
        <line x1="200" y1="112" x2="150" y2="50" strokeWidth="0.8" />
        <line x1="200" y1="112" x2="250" y2="50" strokeWidth="0.8" />
        <line x1="200" y1="112" x2="200" y2="210" strokeWidth="1.2" />
      </svg>
    ),
    sc3: (
      <svg viewBox="0 0 300 300" width="100%" height="100%" fill="none" stroke={color}>
        {/* Structural timbers */}
        <rect x="40" y="40" width="220" height="220" strokeWidth="0.8" />
        <line x1="40" y1="40" x2="260" y2="260" strokeWidth="1.2" />
        <line x1="260" y1="40" x2="40" y2="260" strokeWidth="1.2" />
        <circle cx="150" cy="150" r="25" fill="var(--bone)" stroke={color} strokeWidth="1" />
      </svg>
    ),
    sc4: (
      <svg viewBox="0 0 400 225" width="100%" height="100%" fill="none" stroke={color}>
        {/* Contoured landscape lines */}
        <path d="M10,180 C100,120 200,210 390,160" strokeWidth="0.8" />
        <path d="M10,140 C120,80 230,170 390,120" strokeWidth="0.8" />
        <path d="M10,100 C140,50 250,130 390,80" strokeWidth="0.6" strokeDasharray="4,2" />
      </svg>
    ),
    sc5: (
      <svg viewBox="0 0 300 400" width="100%" height="100%" fill="none" stroke={color}>
        {/* Machine cog blueprint */}
        <circle cx="150" cy="200" r="70" strokeWidth="1" />
        <circle cx="150" cy="200" r="40" strokeWidth="0.6" strokeDasharray="2,2" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="150"
            y1="200"
            x2={150 + 90 * Math.cos((deg * Math.PI) / 180)}
            y2={200 + 90 * Math.sin((deg * Math.PI) / 180)}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        ))}
      </svg>
    ),
    sc6: (
      <svg viewBox="0 0 300 300" width="100%" height="100%" fill="none" stroke={color}>
        {/* Micro diamond leaves layout */}
        <rect x="20" y="20" width="260" height="260" strokeWidth="0.5" strokeDasharray="1,2" />
        {[[60, 60], [150, 60], [240, 60], [60, 150], [150, 150], [240, 150], [60, 240], [150, 240], [240, 240]].map(([cx, cy], i) => (
          <polygon key={i} points={`${cx},${cy - 12} ${cx + 12},${cy} ${cx},${cy + 12} ${cx - 12},${cy}`} strokeWidth="0.8" />
        ))}
      </svg>
    ),
    sc7: (
      <svg viewBox="0 0 300 400" width="100%" height="100%" fill="none" stroke={color}>
        {/* River curves */}
        <path d="M150,20 Q120,120 180,220 T150,380" strokeWidth="1.2" />
        <path d="M165,20 Q135,120 195,220 T165,380" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1="20" y1="200" x2="280" y2="200" strokeWidth="0.5" strokeOpacity="0.4" />
      </svg>
    ),
    sc8: (
      <svg viewBox="0 0 400 225" width="100%" height="100%" fill="none" stroke={color}>
        {/* Gateway layout */}
        <rect x="120" y="40" width="160" height="185" strokeWidth="1" />
        <line x1="120" y1="130" x2="280" y2="130" strokeWidth="0.6" strokeDasharray="2,2" />
        {/* Stylized animal footprint dot tracks */}
        <circle cx="80" cy="120" r="3" fill={color} />
        <circle cx="95" cy="130" r="3" fill={color} />
        <circle cx="320" cy="140" r="3" fill={color} />
      </svg>
    ),
    sc9: (
      <svg viewBox="0 0 300 300" width="100%" height="100%" fill="none" stroke={color}>
        {/* Tree canopy mapping chart */}
        <circle cx="150" cy="150" r="90" strokeWidth="0.5" strokeDasharray="5,5" />
        <rect x="100" y="100" width="100" height="100" strokeWidth="0.8" />
        <circle cx="150" cy="150" r="40" strokeWidth="1" />
        <line x1="60" y1="150" x2="240" y2="150" strokeWidth="0.5" />
        <line x1="150" y1="60" x2="150" y2="240" strokeWidth="0.5" />
      </svg>
    ),
  };

  const aspectBg = {
    '3/4': 'rgba(26,46,64,0.02)',
    '16/9': 'rgba(26,46,64,0.04)',
    '1/1': 'rgba(26,46,64,0.03)',
  };

  return (
    <div
      style={{
        backgroundColor: aspectBg[aspect] || 'transparent',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {drawings[id] ?? drawings.sc3}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SINGLE FILMSTRIP CARD
// ─────────────────────────────────────────────────────────────
function FilmstripCard({ scene, selectedTrail, activeIndex, index }) {
  const [hovered, setHovered] = useState(false);
  const meta = TRAIL_META[scene.trail] || TRAIL_META['Jorhat Trail'];

  // Aspect ratio mappings
  const aspectStyle = {
    '3/4': { paddingBottom: '133.33%' },
    '16/9': { paddingBottom: '56.25%' },
    '1/1': { paddingBottom: '100%' },
  }[scene.aspect] || { paddingBottom: '100%' };

  // Calculate dynamic transition stagger delays
  const staggerDelay = `${index * 100}ms`;

  return (
    <div
      className={`stagger-item ${scene.offsetClass} md:block flex flex-col`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: selectedTrail === scene.trail ? 1 : 0.45,
        transform: `translate3d(0, 0, 0)`,
        transition: 'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: staggerDelay,
        animationDelay: staggerDelay,
        marginBottom: '2.5rem',
      }}
    >
      {/* Visual Frame */}
      <div
        style={{
          border: hovered ? `1px solid ${meta.color}` : '1px solid var(--indigo-12)',
          borderRadius: '0',
          backgroundColor: 'var(--bone)',
          position: 'relative',
          width: '100%',
          ...aspectStyle,
          overflow: 'hidden',
          transition: 'border-color 0.3s ease-out',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <SceneVector id={scene.id} aspect={scene.aspect} color={meta.color} />
        </div>

        {/* Technical overlay tags */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            fontFamily: "'Inter', monospace",
            fontSize: '8px',
            color: 'var(--indigo-30)',
            letterSpacing: '0.05em',
            backgroundColor: 'var(--bone)',
            padding: '2px 6px',
            border: '1px solid var(--indigo-06)',
          }}
        >
          {scene.metadata}
        </div>
      </div>

      {/* Caption details block - moves down by 4px on hover */}
      <div
        style={{
          marginTop: '0.75rem',
          paddingLeft: '4px',
          transform: hovered ? 'translateY(4px)' : 'translateY(0)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h4
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--indigo)',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          {scene.title}
        </h4>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.7rem',
            color: 'var(--indigo-60)',
            lineHeight: 1.4,
            marginTop: '2px',
            letterSpacing: '0.02em',
          }}
        >
          {scene.caption}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EDITORIAL FILMSTRIP COMPONENT
// ─────────────────────────────────────────────────────────────
export default function EditorialFilmstrip({ selectedTrail, onTrailIntersect }) {
  const containerRef = useRef(null);

  // Monitor scroll movements to track which trail is in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollPos = el.scrollTop + el.clientHeight / 3;
      
      // Calculate layout boundaries of each scene element
      const children = el.children;
      let activeTrail = null;
      let minDistance = Infinity;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const childCenter = child.offsetTop - el.offsetTop + child.clientHeight / 2;
        const dist = Math.abs(scrollPos - childCenter);
        
        if (dist < minDistance) {
          minDistance = dist;
          activeTrail = SCENES[i]?.trail;
        }
      }

      if (activeTrail && activeTrail !== selectedTrail && onTrailIntersect) {
        onTrailIntersect(activeTrail);
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [selectedTrail, onTrailIntersect]);

  // When selectedTrail updates from parent, scroll to first matching card
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const firstMatchIdx = SCENES.findIndex((s) => s.trail === selectedTrail);
    if (firstMatchIdx === -1) return;

    const targetChild = el.children[firstMatchIdx];
    if (targetChild) {
      el.scrollTo({
        top: targetChild.offsetTop - el.offsetTop - 20,
        behavior: 'smooth',
      });
    }
  }, [selectedTrail]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none',  // IE
        willChange: 'scroll-position',
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 px-8 py-12"
    >
      {/* Hide scrollbar for webkit browsers */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {SCENES.map((scene, idx) => (
        <FilmstripCard
          key={scene.id}
          scene={scene}
          selectedTrail={selectedTrail}
          index={idx}
        />
      ))}
    </div>
  );
}
