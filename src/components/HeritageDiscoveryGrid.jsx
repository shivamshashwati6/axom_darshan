/**
 * HeritageDiscoveryGrid.jsx
 * ─────────────────────────────────────────────────────────────
 * A premium regional discovery grid for the Axom Darshan app.
 * Theme: Heritage Weaver (Textured Minimalism)
 *
 * Features:
 *  - Filterable grid of Assam regional destinations
 *  - Sharp-edged flat cards on the bone (#F9F8F6) canvas
 *  - Cream (#EADCC9) card backgrounds with 1px Indigo borders
 *  - Gold top-border reveal + underline-draw CTA on hover
 *  - Stagger-load entry animations (CSS only, no library)
 *  - Category-coded accent colours per destination type
 *  - Fully self-contained — data lives inside this file
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from 'react';

// ── Category accent palette ───────────────────────────────────
// Each category gets a distinct but heritage-aligned accent.
// All accents contrast sufficiently against the cream background.
const CATEGORY_META = {
  'Muga Silk Weaving':    { color: '#DCA134', bg: 'rgba(220,161,52,0.10)',  label: 'Muga Silk Weaving'    },
  'Organic Tea Heritage': { color: '#3A6B4A', bg: 'rgba(58,107,74,0.10)',   label: 'Organic Tea Heritage'  },
  'Riverine Culture':     { color: '#2060A0', bg: 'rgba(32,96,160,0.09)',   label: 'Riverine Culture'      },
  'Sacred Sanctuary':     { color: '#C83232', bg: 'rgba(200,50,50,0.08)',   label: 'Sacred Sanctuary'      },
  'Wildlife Corridor':    { color: '#1A2E40', bg: 'rgba(26,46,64,0.08)',    label: 'Wildlife Corridor'     },
  'Living Craft':         { color: '#7B4A1E', bg: 'rgba(123,74,30,0.10)',   label: 'Living Craft'          },
};

const ALL_CATEGORIES = ['All', ...Object.keys(CATEGORY_META)];

// ── Destination data ──────────────────────────────────────────
// 9 meticulously researched Assam destinations across all categories.
const discoveryData = [
  {
    id: 'd1',
    name: 'Sualkuchi',
    subtitle: 'The Silk Village',
    region: 'Kamrup, Assam',
    distance: '35 km from Guwahati',
    category: 'Muga Silk Weaving',
    icon: '🧵',
    description:
      "A living museum where every household shelters a handloom. Sualkuchi produces over 70% of Assam's Muga and Pat silk — the golden thread of a 500-year-old tradition.",
    signature:
      'Watch pit-loom weavers create mekhela-chadors with shuttle rhythms unchanged since the Ahom kingdom.',
    highlights: ['Cooperative silk markets', 'Natural indigo dye process', 'Loom demonstration homestays'],
    bestTime: 'October – March',
    duration: '1 – 2 days',
  },
  {
    id: 'd2',
    name: 'Jorhat Tea Trails',
    subtitle: 'Colonial Bungalow Circuit',
    region: 'Jorhat, Upper Assam',
    distance: '310 km from Guwahati',
    category: 'Organic Tea Heritage',
    icon: '🍃',
    description:
      "Jorhat anchors the world's oldest tea-growing region. Colonial-era planter bungalows, still functioning as heritage estates, offer immersive stays amid endless emerald rows.",
    signature:
      "Guided estate walks at dawn, followed by a cupped tasting session with the estate's senior tea taster.",
    highlights: ['Heritage bungalow stays', 'First-flush harvest tours', 'Tea-pairing dinners'],
    bestTime: 'March – May, Oct – Nov',
    duration: '2 – 3 days',
  },
  {
    id: 'd3',
    name: 'Majuli Island',
    subtitle: "World's Largest River Island",
    region: 'Majuli, Assam',
    distance: '350 km from Guwahati',
    category: 'Riverine Culture',
    icon: '🛕',
    description:
      "Rising from the Brahmaputra mid-stream, Majuli is both the world's largest river island and a living centre of Vaishnavite philosophy, mask-making, and monsoon resilience.",
    signature:
      'Attend a Raas Leela performance at the Kamalabari Satra — a five-century-old theatrical tradition still practiced by monk-scholars.',
    highlights: ['Satra monastery visits', 'Mask-making workshops', 'Mishing tribal villages'],
    bestTime: 'November – February',
    duration: '2 – 4 days',
  },
  {
    id: 'd4',
    name: 'Kamakhya Temple Complex',
    subtitle: 'The Tantric Heart of Assam',
    region: 'Nilachal Hill, Guwahati',
    distance: '7 km from Guwahati centre',
    category: 'Sacred Sanctuary',
    icon: '🌺',
    description:
      "Perched on Nilachal Hill above the Brahmaputra, Kamakhya is one of India's most powerful Shakti Peethas — a living centre of tantra, devotion, and annual Ambubachi pilgrimage.",
    signature:
      'Witness the pre-dawn aarti ritual when mist still cloaks the Brahmaputra and conch shells echo across the hill.',
    highlights: ['Ambubachi Mela pilgrimage', 'Tantric temple architecture', 'Brahmaputra panorama'],
    bestTime: 'October – March',
    duration: '1 day',
  },
  {
    id: 'd5',
    name: 'Kaziranga Buffer Zones',
    subtitle: 'Rhino Country Fringe',
    region: 'Golaghat & Nagaon Districts',
    distance: '217 km from Guwahati',
    category: 'Wildlife Corridor',
    icon: '🦏',
    description:
      'Beyond the national park boundaries, the buffer villages and fringe forests host authentic wildlife encounters — rhinos grazing alongside farmland, wild elephants crossing roads at dusk.',
    signature:
      "Night walks with tribal mahouts along the forest fringe, listening for the one-horned rhino's movement through tall elephant grass.",
    highlights: ['Mahout-led forest walks', 'Village conservation homestays', 'Wetland bird counts'],
    bestTime: 'November – April',
    duration: '2 – 3 days',
  },
  {
    id: 'd6',
    name: 'Barpeta Weaving Cluster',
    subtitle: 'Cane & Craft Heartland',
    region: 'Barpeta, Assam',
    distance: '140 km from Guwahati',
    category: 'Living Craft',
    icon: '🎋',
    description:
      "Barpeta's master craftsmen transform locally harvested bamboo and cane into architectural objects, ceremonial instruments, and everyday vessels of rare geometric precision.",
    signature:
      'A full-day immersion with a master craftsman building a traditional Pepa (bamboo oboe) from raw culm to finished instrument.',
    highlights: ['Bamboo architecture tours', 'Pepa instrument crafting', 'Vaishnavite Namghar visits'],
    bestTime: 'September – February',
    duration: '1 – 2 days',
  },
  {
    id: 'd7',
    name: 'Dibrugarh Tea Circuit',
    subtitle: 'The Tea Capital of the World',
    region: 'Dibrugarh, Upper Assam',
    distance: '439 km from Guwahati',
    category: 'Organic Tea Heritage',
    icon: '🫖',
    description:
      'Dibrugarh sits at the epicentre of CTC and orthodox tea production. The surrounding estates — some established in the 1840s — now offer organic farm experiences and scenic river cruises.',
    signature:
      "Board a wooden riverboat at the Brahmaputra ghat for a floating tea-tasting session as Arunachal's hills glow at sunset.",
    highlights: ['Organic estate certifications', 'Victorian-era factory tours', 'Brahmaputra river cruise'],
    bestTime: 'March – June',
    duration: '2 – 3 days',
  },
  {
    id: 'd8',
    name: 'Sibsagar Royal Complex',
    subtitle: 'Capital of the Ahom Empire',
    region: 'Sibsagar, Upper Assam',
    distance: '375 km from Guwahati',
    category: 'Sacred Sanctuary',
    icon: '👑',
    description:
      "The ancient Ahom capital preserves the Sivasagar Shiva Dol — tallest Shiva temple in India — alongside Rang Ghar (Asia's oldest amphitheatre) and the Talatal Ghar seven-storey palace.",
    signature:
      'Stand inside the Rang Ghar arena at golden hour, where Ahom kings once watched elephant combats beneath the same sky 300 years ago.',
    highlights: ['Talatal Ghar underground passages', 'Rang Ghar amphitheatre', 'Kareng Ghar palace ruins'],
    bestTime: 'October – March',
    duration: '2 – 3 days',
  },
  {
    id: 'd9',
    name: 'Hajo Pilgrimage Confluence',
    subtitle: 'Where Three Faiths Meet',
    region: 'Hajo, Kamrup',
    distance: '30 km from Guwahati',
    category: 'Sacred Sanctuary',
    icon: '🕌',
    description:
      'On a single hilltop, Hindu, Buddhist, and Muslim shrines coexist in unbroken harmony — Hayagriva Madhav temple, Poa Mecca mosque, and the Kedaresvara shrine have shared this ground for centuries.',
    signature:
      'Arrive at the Hayagriva Madhav temple at the moment of the noon conch ceremony, with the Brahmaputra valley spread below in every direction.',
    highlights: ['Tri-faith cultural heritage', 'Hilltop Brahmaputra views', 'Traditional boat crossing'],
    bestTime: 'October – April',
    duration: '1 day',
  },
];

// ── Geometric textile band patterns per category ──────────────
// Inline SVG backgrounds that mimic handloom border motifs.
// Sharp, 1px-weight geometric shapes — not illustrations.
function TextileBand({ category }) {
  const meta = CATEGORY_META[category] || CATEGORY_META['Living Craft'];

  // Each category gets a distinct SVG micro-pattern
  const patterns = {
    'Muga Silk Weaving': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='32' height='32' fill='none'/%3E%3Cline x1='0' y1='16' x2='16' y2='0' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.6' stroke-opacity='0.3'/%3E%3Cline x1='16' y1='0' x2='32' y2='16' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.6' stroke-opacity='0.3'/%3E%3Cline x1='0' y1='32' x2='32' y2='0' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.4' stroke-opacity='0.15'/%3E%3C/svg%3E")`,
    'Organic Tea Heritage': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='4' fill='none' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.5' stroke-opacity='0.25'/%3E%3Cline x1='0' y1='0' x2='20' y2='20' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.4' stroke-opacity='0.12'/%3E%3C/svg%3E")`,
    'Riverine Culture': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='16'%3E%3Cpath d='M0,8 Q10,2 20,8 Q30,14 40,8' fill='none' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.6' stroke-opacity='0.25'/%3E%3C/svg%3E")`,
    'Sacred Sanctuary': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpolygon points='12,2 22,22 2,22' fill='none' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.6' stroke-opacity='0.22'/%3E%3C/svg%3E")`,
    'Wildlife Corridor': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Crect x='4' y='4' width='16' height='16' fill='none' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.6' stroke-opacity='0.22'/%3E%3Crect x='8' y='8' width='8' height='8' fill='none' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.4' stroke-opacity='0.15'/%3E%3C/svg%3E")`,
    'Living Craft': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Cline x1='0' y1='14' x2='28' y2='14' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.5' stroke-opacity='0.2'/%3E%3Cline x1='14' y1='0' x2='14' y2='28' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.5' stroke-opacity='0.2'/%3E%3Ccircle cx='14' cy='14' r='3' fill='none' stroke='${encodeURIComponent(meta.color)}' stroke-width='0.5' stroke-opacity='0.3'/%3E%3C/svg%3E")`,
  };

  return (
    <div
      aria-hidden="true"
      style={{
        height: '88px',
        backgroundColor: meta.bg,
        backgroundImage: patterns[category] || patterns['Living Craft'],
        backgroundRepeat: 'repeat',
        borderBottom: `1px solid ${meta.color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.95,
        flexShrink: 0,
      }}
    >
      {/* Large destination icon centred in the band */}
      <span
        style={{
          fontSize: '2.5rem',
          lineHeight: 1,
          filter: 'grayscale(0.15)',
        }}
        role="img"
        aria-label={category}
      >
        {/* icon passed via prop */}
      </span>
    </div>
  );
}

// ── Single discovery card ─────────────────────────────────────
function DiscoveryCard({ destination, index }) {
  const [hovered, setHovered] = useState(false);
  const meta = CATEGORY_META[destination.category] || CATEGORY_META['Living Craft'];

  return (
    <article
      className="stagger-item"
      style={{
        /* Sharp-edged flat block — no border-radius */
        border: '1px solid var(--indigo-12)',
        borderTop: hovered ? `2px solid ${meta.color}` : '2px solid var(--indigo-12)',
        borderRadius: '2px',
        backgroundColor: hovered ? 'var(--cream)' : 'var(--bone)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        /* CSS-only transition — no JS animation library */
        transition: 'border-top-color 0.28s ease-out, background-color 0.28s ease-out, border-color 0.28s ease-out',
        animationDelay: `${(index % 6) * 0.08}s`,
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* ── Textile band header ─────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          height: '88px',
          backgroundColor: meta.bg,
          backgroundImage: (() => {
            const c = encodeURIComponent(meta.color);
            const patterns = {
              'Muga Silk Weaving':    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cline x1='0' y1='16' x2='16' y2='0' stroke='${c}' stroke-width='0.7' stroke-opacity='0.28'/%3E%3Cline x1='16' y1='0' x2='32' y2='16' stroke='${c}' stroke-width='0.7' stroke-opacity='0.28'/%3E%3Cline x1='0' y1='32' x2='32' y2='0' stroke='${c}' stroke-width='0.4' stroke-opacity='0.12'/%3E%3C/svg%3E")`,
              'Organic Tea Heritage': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='5' fill='none' stroke='${c}' stroke-width='0.5' stroke-opacity='0.28'/%3E%3Cline x1='0' y1='0' x2='20' y2='20' stroke='${c}' stroke-width='0.4' stroke-opacity='0.15'/%3E%3C/svg%3E")`,
              'Riverine Culture':     `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='16'%3E%3Cpath d='M0,8 Q10,2 20,8 Q30,14 40,8' fill='none' stroke='${c}' stroke-width='0.7' stroke-opacity='0.28'/%3E%3Cpath d='M0,14 Q10,8 20,14 Q30,20 40,14' fill='none' stroke='${c}' stroke-width='0.4' stroke-opacity='0.14'/%3E%3C/svg%3E")`,
              'Sacred Sanctuary':     `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpolygon points='12,2 22,22 2,22' fill='none' stroke='${c}' stroke-width='0.6' stroke-opacity='0.25'/%3E%3Cpolygon points='12,7 19,19 5,19' fill='none' stroke='${c}' stroke-width='0.4' stroke-opacity='0.14'/%3E%3C/svg%3E")`,
              'Wildlife Corridor':    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Crect x='3' y='3' width='18' height='18' fill='none' stroke='${c}' stroke-width='0.6' stroke-opacity='0.25'/%3E%3Crect x='8' y='8' width='8' height='8' fill='none' stroke='${c}' stroke-width='0.4' stroke-opacity='0.18'/%3E%3C/svg%3E")`,
              'Living Craft':         `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Cline x1='0' y1='14' x2='28' y2='14' stroke='${c}' stroke-width='0.5' stroke-opacity='0.22'/%3E%3Cline x1='14' y1='0' x2='14' y2='28' stroke='${c}' stroke-width='0.5' stroke-opacity='0.22'/%3E%3Ccircle cx='14' cy='14' r='4' fill='none' stroke='${c}' stroke-width='0.5' stroke-opacity='0.28'/%3E%3C/svg%3E")`,
            };
            return patterns[destination.category] || patterns['Living Craft'];
          })(),
          backgroundRepeat: 'repeat',
          borderBottom: `1px solid ${meta.color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem',
          flexShrink: 0,
          transition: 'background-color 0.28s ease-out',
        }}
      >
        {/* Destination emoji icon */}
        <span style={{ fontSize: '2.25rem', lineHeight: 1 }}>{destination.icon}</span>

        {/* Category tag — top-right of the band */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '0.22rem 0.55rem',
            backgroundColor: 'var(--bone)',
            border: `1px solid ${meta.color}`,
            borderRadius: '2px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.625rem',
            fontWeight: 700,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: meta.color,
            whiteSpace: 'nowrap',
          }}
        >
          {/* Category colour dot */}
          <span
            style={{
              display: 'inline-block',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: meta.color,
              flexShrink: 0,
            }}
          />
          {destination.category}
        </span>
      </div>

      {/* ── Card body ───────────────────────────────────── */}
      <div
        style={{
          padding: '1.25rem 1.375rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}
      >

        {/* Destination name + subtitle */}
        <div style={{ marginBottom: '0.375rem' }}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.35rem',
              fontWeight: 600,
              color: 'var(--indigo)',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {destination.name}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 500,
              color: meta.color,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '3px',
            }}
          >
            {destination.subtitle}
          </p>
        </div>

        {/* Region / distance meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.5rem 0',
            borderBottom: '1px solid var(--indigo-06)',
            marginBottom: '0.875rem',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem',
              color: 'var(--indigo-60)',
              letterSpacing: '0.03em',
            }}
          >
            ◆ {destination.region}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              color: 'var(--indigo-30)',
              letterSpacing: '0.03em',
              marginLeft: 'auto',
            }}
          >
            {destination.distance}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8rem',
            color: 'var(--indigo-60)',
            lineHeight: 1.75,
            marginBottom: '1rem',
          }}
        >
          {destination.description}
        </p>

        {/* Signature experience — italic serif pull-quote */}
        <blockquote
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.95rem',
            fontStyle: 'italic',
            color: 'var(--indigo)',
            lineHeight: 1.6,
            margin: '0 0 1rem 0',
            paddingLeft: '0.875rem',
            borderLeft: `2px solid ${meta.color}`,
          }}
        >
          {destination.signature}
        </blockquote>

        {/* Highlight chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '1.25rem',
          }}
        >
          {destination.highlights.map(h => (
            <span key={h} className="tag-badge" style={{ fontSize: '0.62rem' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Footer meta — best time + duration */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.875rem',
            borderTop: '1px solid var(--indigo-06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.62rem',
                fontWeight: 600,
                color: 'var(--indigo-30)',
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                marginBottom: '2px',
              }}
            >
              Best Time
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                color: 'var(--indigo)',
                fontWeight: 500,
              }}
            >
              {destination.bestTime}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.62rem',
                fontWeight: 600,
                color: 'var(--indigo-30)',
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                marginBottom: '2px',
              }}
            >
              Duration
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                color: 'var(--indigo)',
                fontWeight: 500,
              }}
            >
              {destination.duration}
            </p>
          </div>
        </div>

        {/* ── CTA — underline-draw hover ───────────────── */}
        <ExploreLink hovered={hovered} color={meta.color} />
      </div>
    </article>
  );
}

/**
 * ExploreLink
 * CSS-driven underline-draw effect — no external library.
 * The underline expands from left to right on hover.
 */
function ExploreLink({ hovered, color }) {
  return (
    <div
      style={{
        marginTop: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        position: 'relative',
        width: 'fit-content',
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color: hovered ? color : 'var(--indigo-60)',
          transition: 'color 0.28s ease-out',
        }}
      >
        Explore Destination
      </span>

      {/* Arrow — shifts 3px right on hover */}
      <span
        style={{
          fontSize: '0.7rem',
          color: hovered ? color : 'var(--indigo-30)',
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
          transition: 'transform 0.28s ease-out, color 0.28s ease-out',
          display: 'inline-block',
        }}
      >
        →
      </span>

      {/* Underline draw — expands from 0 to 100% width on hover */}
      <span
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          height: '1px',
          width: hovered ? '100%' : '0%',
          backgroundColor: color,
          transition: 'width 0.32s ease-out',
          display: 'block',
        }}
      />
    </div>
  );
}

// ── Main grid component (default export) ─────────────────────
export default function HeritageDiscoveryGrid({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter destinations by selected category
  const filtered =
    activeCategory === 'All'
      ? discoveryData
      : discoveryData.filter(d => d.category === activeCategory);

  // Currently visible slice (for load-more)
  const visible = filtered.slice(0, visibleCount);
  const hasMore  = visibleCount < filtered.length;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(6); // reset visible count on filter change
  };

  return (
    <section
      aria-label="Heritage Discovery Grid"
      style={{ backgroundColor: 'var(--bone)', minHeight: '100%' }}
    >

      {/* ── Section header ──────────────────────────────── */}
      <div
        className="px-6 md:px-16 pt-16 pb-12"
        style={{ borderBottom: '1px solid var(--indigo-12)' }}
      >
        <p className="muted-label mb-3">Regional Discovery</p>
        <h1 className="section-heading mb-3">Heritage Discovery Grid</h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: 'var(--indigo-60)',
            lineHeight: 1.75,
            maxWidth: '640px',
          }}
        >
          Nine carefully curated territories across Assam — from silk-weaving villages
          and colonial tea estates to sacred river islands and ancient Ahom capitals.
          Each destination is a living thread in the fabric of the Northeast.
        </p>
      </div>

      {/* ── Kingkhap peak geo-divider ────────────────────── */}
      <div className="geo-divider" />

      <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">

        {/* ── Category filter bar ─────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '3rem',
          }}
        >
          {ALL_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            const meta     = CATEGORY_META[cat];
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  padding: '0.35rem 0.875rem',
                  border: '1px solid',
                  borderColor: isActive
                    ? (meta ? meta.color : 'var(--indigo)')
                    : 'var(--indigo-12)',
                  borderRadius: '2px',
                  backgroundColor: isActive
                    ? (meta ? meta.bg : 'var(--indigo-06)')
                    : 'transparent',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.06em',
                  textTransform: 'capitalize',
                  color: isActive
                    ? (meta ? meta.color : 'var(--indigo)')
                    : 'var(--indigo-60)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease-out',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = meta ? meta.color : 'var(--indigo-30)';
                    e.currentTarget.style.color       = 'var(--indigo)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--indigo-12)';
                    e.currentTarget.style.color       = 'var(--indigo-60)';
                  }
                }}
              >
                {/* Colour dot for non-"All" filters */}
                {meta && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: meta.color,
                      marginRight: '6px',
                      verticalAlign: 'middle',
                      opacity: isActive ? 1 : 0.5,
                    }}
                  />
                )}
                {cat}
              </button>
            );
          })}

          {/* Result count — right-aligned */}
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              color: 'var(--indigo-60)',
              letterSpacing: '0.05em',
            }}
          >
            {filtered.length} destination{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Discovery card grid ─────────────────────────── */}
        {visible.length > 0 ? (
          <div
            style={{
              display: 'grid',
              /* Responsive: 1 col → 2 col → 3 col */
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1px', /* hairline gap — creates a "grid lines" aesthetic */
              backgroundColor: 'var(--indigo-12)', /* the gap colour = visible grid lines */
              border: '1px solid var(--indigo-12)',
            }}
          >
            {visible.map((dest, idx) => (
              <div
                key={dest.id}
                style={{ backgroundColor: 'var(--bone)' }} /* each cell restores the background */
              >
                <DiscoveryCard destination={dest} index={idx} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              textAlign: 'center',
              padding: '6rem 1rem',
              border: '1px solid var(--indigo-12)',
              borderRadius: '2px',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--indigo-30)' }}>◇</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--indigo-60)' }}>
              No destinations in this category yet.
            </p>
          </div>
        )}

        {/* ── Load more ──────────────────────────────────── */}
        {hasMore && (
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}
          >
            <button
              onClick={() => setVisibleCount(c => c + 3)}
              className="btn-outline"
              style={{ padding: '0.75rem 2.5rem' }}
            >
              Load More — {filtered.length - visibleCount} remaining
            </button>
          </div>
        )}

        {/* ── CTA strip — navigate to Planner ───────────── */}
        {onNavigate && (
          <div
            style={{
              marginTop: '4rem',
              padding: '2rem 2.5rem',
              border: '1px solid var(--indigo-12)',
              borderTop: '2px solid var(--gold)',
              borderRadius: '2px',
              backgroundColor: 'var(--cream)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'flex-start',
            }}
          >
            <div className="geo-divider-gold" style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
            <p className="muted-label">Ready to explore?</p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--indigo)',
                letterSpacing: '0.02em',
                margin: 0,
              }}
            >
              Build your bespoke Assam itinerary
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'var(--indigo-60)',
                lineHeight: 1.7,
                maxWidth: '540px',
                margin: 0,
              }}
            >
              Combine destinations from this grid into a custom day-by-day journey using
              the Route Planner — then export it as a shareable JSON itinerary.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('planner')}
                className="btn-primary"
              >
                Open Route Planner
              </button>
              <button
                onClick={() => onNavigate('artisans')}
                className="btn-outline"
              >
                Meet the Artisans
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ── Bottom geo divider ──────────────────────────── */}
      <div className="geo-divider" />
    </section>
  );
}
