// ============================================================
// Axom Darshan – Unified Mock Data Store
// ============================================================

// ── Travel Circuits ──────────────────────────────────────────
export const circuitsData = {
  wildlife: {
    name: 'Wildlife & Conservation',
    icon: '🌿',
    vibe: 'Nature & Adventure',
    days: [
      { id: 'w1', day: 1, place: 'Guwahati', activity: 'Arrive & visit Kamakhya Temple; sunset Brahmaputra cruise', icon: '⛵' },
      { id: 'w2', day: 2, place: 'Pobitora', activity: 'Highest one-horned rhino density wildlife reserve jeep safari', icon: '🦏' },
      { id: 'w3', day: 3, place: 'Kaziranga', activity: 'Dawn elephant safari; explore the floodplains on elephant-back', icon: '🐘' },
      { id: 'w4', day: 4, place: 'Kaziranga', activity: 'Jeep safari in the Eastern Range; sunset at Kohora', icon: '🌅' },
      { id: 'w5', day: 5, place: 'Dihing Patkai', activity: 'Rainforest trek with certified naturalist guide; birdwatching', icon: '🦜' },
    ],
  },
  heritage: {
    name: 'Heritage & Architecture',
    icon: '🏛️',
    vibe: 'History & Culture',
    days: [
      { id: 'h1', day: 1, place: 'Guwahati', activity: 'City heritage walk; Umananda Island temple visit by ferry', icon: '⛩️' },
      { id: 'h2', day: 2, place: 'Sivasagar', activity: 'Ahom-era Rang Ghar amphitheatre, Talatal Ghar royal palace', icon: '👑' },
      { id: 'h3', day: 3, place: 'Sualkuchi', activity: 'Silk weaving village tour; Muga & Pat silk loom workshop', icon: '🧵' },
      { id: 'h4', day: 4, place: 'Majuli', activity: "World's largest river island; Vaishnavite Satra monastery visits", icon: '🛕' },
      { id: 'h5', day: 5, place: 'Tezpur', activity: 'Agnigarh Hill, Da Parbatia sculptures, Bamuni Hills ruins', icon: '🗿' },
    ],
  },
  spiritual: {
    name: 'Spiritual & Mystic Route',
    icon: '🕉️',
    vibe: 'Pilgrimage & Mysticism',
    days: [
      { id: 's1', day: 1, place: 'Kamakhya', activity: 'Shakti pilgrimage; ritual at the living goddess shrine', icon: '🌺' },
      { id: 's2', day: 2, place: 'Hajo', activity: 'Multi-faith pilgrimage hub: Hayagriva Madhav, Poa Mecca', icon: '🕌' },
      { id: 's3', day: 3, place: 'Majuli', activity: 'Raas Leela performance; initiation in the Kamalabari Satra', icon: '🎭' },
      { id: 's4', day: 4, place: 'Sibsagar', activity: 'Sivasagar Shiva Dol temple — tallest Shiva temple in India', icon: '⛪' },
      { id: 's5', day: 5, place: 'Basistha Ashram', activity: 'Sacred hermitage; forest meditation retreat at Guwahati', icon: '🧘' },
    ],
  },
};

// ── Artisans ─────────────────────────────────────────────────
export const artisansData = [
  {
    id: 'a1',
    name: 'Rupali Bora',
    craft: 'Muga Silk Weaving',
    location: 'Sualkuchi, Kamrup',
    image: null,
    bio: 'Fifth-generation silk weaver renowned for intricate Muga and Pat silk mekhela-chadors blending ancient Ahom motifs with contemporary design.',
    workshops: [
      { id: 'ws1', title: 'Half-Day Loom Introduction', duration: '4h', price: 1800, spots: 6 },
      { id: 'ws2', title: 'Natural Dye & Weave Masterclass', duration: '8h', price: 3500, spots: 4 },
    ],
    badges: ['Ethical Wages', 'Eco-Dyes Only'],
  },
  {
    id: 'a2',
    name: 'Dipak Phukan',
    craft: 'Bamboo & Cane Craft',
    location: 'Barpeta, Assam',
    image: null,
    bio: 'Master craftsman who transforms locally harvested bamboo into architectural furniture, decorative objects, and traditional musical instruments.',
    workshops: [
      { id: 'ws3', title: 'Bamboo Craft Basics', duration: '3h', price: 1200, spots: 8 },
      { id: 'ws4', title: 'Instrument Making — Pepa', duration: '6h', price: 2800, spots: 4 },
    ],
    badges: ['100% Locally Sourced', 'Zero Single-Use Plastic'],
  },
  {
    id: 'a3',
    name: 'Meena Rabha',
    craft: 'Traditional Mask Making',
    location: 'Majuli Island',
    image: null,
    bio: 'Satra-trained mask artist specialising in Raas Leela performance masks fashioned from bamboo, cane, and natural pigments rooted in 500-year-old traditions.',
    workshops: [
      { id: 'ws5', title: 'Mini Mask Painting Session', duration: '3h', price: 1500, spots: 10 },
      { id: 'ws6', title: 'Full Mask Craft Immersion', duration: '2 days', price: 5500, spots: 3 },
    ],
    badges: ['Community-Owned', 'Certified Naturalist Guide'],
  },
];

// ── Cultural Events Calendar ──────────────────────────────────
export const eventsData = [
  { id: 'e1', name: 'Rongali Bihu Festival', date: 'April 14–20', location: 'State-wide', category: 'festival', description: 'The spring Bihu marks the Assamese New Year with Bihu dances, Husori folk songs, and feasts.' },
  { id: 'e2', name: 'Raas Leela of Majuli', date: 'November (Full Moon)', location: 'Majuli Satras', category: 'cultural', description: "The grand Vaishnavite drama festival on the world's largest river island — centuries old." },
  { id: 'e3', name: 'Dehing Patkai Elephant Festival', date: 'January', location: 'Dibrugarh', category: 'festival', description: 'Celebrate the endangered Asian elephant with processions, mahout shows, and rainforest treks.' },
  { id: 'e4', name: 'Ambubachi Mela', date: 'June (4 days)', location: 'Kamakhya Temple, Guwahati', category: 'pilgrimage', description: 'Annual pilgrimage to Kamakhya attracting hundreds of thousands of devotees and tantric sadhus.' },
  { id: 'e5', name: 'Brahmaputra Valley Music Festival', date: 'February', location: 'Guwahati Riverfront', category: 'music', description: "A curated outdoor concert celebrating Assam's folk, classical, and contemporary fusion music." },
  { id: 'e6', name: 'Kaziranga Elephant Festival', date: 'February', location: 'Kaziranga', category: 'festival', description: 'Two-day festival featuring elephant polo, elephant races, and eco-tourism awareness events.' },
];

// ── Community Reviews ─────────────────────────────────────────
export const communityReviews = [
  { id: 'r1', user: 'Mark Sullivan', avatar: 'MS', location: 'Solo Traveler, UK', rating: 5, text: 'Seeing the rhinos at Kaziranga at dawn was a bucket-list moment I will never forget. The precision of the itinerary planner was astonishing.', circuit: 'Wildlife', date: '2 weeks ago' },
  { id: 'r2', user: 'Ananya Patel', avatar: 'AP', location: 'Family Trip, Mumbai', rating: 5, text: 'Living in a 100-year-old tea bungalow felt like stepping back in time. The hospitality and the food were world-class. Majuli stole our hearts.', circuit: 'Heritage', date: '1 month ago' },
  { id: 'r3', user: 'James David', avatar: 'JD', location: 'Photographer, USA', rating: 5, text: 'The Bihu dance performance was so energetic! The light during golden hour at Rang Ghar was absolutely cinematic. Came back for more photographs.', circuit: 'Heritage', date: '3 weeks ago' },
  { id: 'r4', user: 'Priya Krishnan', avatar: 'PK', location: 'Solo Traveler, Chennai', rating: 5, text: 'Ambubachi Mela was a profoundly spiritual experience. The Kamakhya temple at dawn, surrounded by sadhus and pilgrims, was unlike anything I had seen.', circuit: 'Spiritual', date: '5 months ago' },
];

// ── Eco Partners ──────────────────────────────────────────────
export const ecoPartnersData = [
  { id: 'p1', name: 'Majuli Organic Homestay Co-op', type: 'accommodation', badges: [{ name: '100% Locally Sourced', desc: 'All materials, ingredients, and staff sourced within the local village cluster.' }, { name: 'Zero Single-Use Plastic', desc: 'Completely plastic-free stays; steel bottles and bamboo containers provided.' }], description: 'Traditional stilt houses utilizing solar energy and serving organic, farm-to-table tribal meals.' },
  { id: 'p2', name: 'Dihing Wildlife Eco-Tours', type: 'operator', badges: [{ name: 'Carbon-Offset', desc: 'A portion of tour costs funds local reforestation projects in Dihing Patkai.' }, { name: 'Certified Naturalist Guide', desc: 'Tours led by certified local wildlife conservationists and tribal trackers.' }], description: 'Low-impact, small-group walking tours specialising in birdwatching and rainforest conservation education.' },
  { id: 'p3', name: 'Sualkuchi Fair-Trade Loom Alliance', type: 'artisan', badges: [{ name: 'Ethical Wages', desc: 'Ensures weavers receive direct fair profit share, above middleman rates.' }, { name: 'Eco-Dyes Only', desc: 'Utilises organic, non-chemical herbal dyes for traditional silk weaving.' }], description: 'A cooperative ensuring full financial transparency and organic, non-chemical dyes for silk weaving.' },
];

// ── Ambient Soundscape Tracks ─────────────────────────────────
export const soundscapeTracks = [
  { id: 't1', title: 'Brahmaputra River Dawn', desc: 'Morning river ambience & bird calls', icon: '🌊' },
  { id: 't2', title: 'Rhythms of the Valley', desc: 'Pepa & Gogona folk instruments', icon: '🎵' },
  { id: 't3', title: 'Rainforest Symphony', desc: 'Deep jungle rain & cicadas', icon: '🌿' },
];

// ── Mock API helpers ──────────────────────────────────────────

/** Simulate fetching live Guwahati events */
export async function fetchLocalEvents() {
  await new Promise(r => setTimeout(r, 600));
  return eventsData;
}

/** Simulate submitting a workshop booking */
export async function submitWorkshopBooking(payload) {
  await new Promise(r => setTimeout(r, 800));
  console.log('[API] Workshop booking submitted:', payload);
  return { success: true, bookingId: `BK-${Date.now()}`, message: `Booking confirmed for "${payload.workshopTitle}"` };
}

/** Simulate saving & exporting itinerary as JSON */
export async function exportItinerary(itinerary, userProfile) {
  await new Promise(r => setTimeout(r, 400));
  const payload = { exportedAt: new Date().toISOString(), user: userProfile, itinerary };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'axom-darshan-itinerary.json';
  a.click();
  URL.revokeObjectURL(url);
  return { success: true };
}
