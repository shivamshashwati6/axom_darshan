/**
 * teaEstateData.js
 * ─────────────────────────────────────────────────────────────
 * Mock data for the Tea Heritage Explorer.
 * Nine British-era tea estate bungalows across three Assam
 * trail circuits. Each entry carries historical context,
 * seasonal harvest data, and geographic annotations.
 * ─────────────────────────────────────────────────────────────
 */

// ── Flush definitions for the month slider ────────────────────
export const FLUSH_DATA = {
  3:  {
    flush:  'First Flush',
    grade:  'Delicate & Floral',
    detail: 'The earliest plucking of the Assam season produces light, bright teas with a delicate vegetal note and golden cup colour. High demand at London and Tokyo specialty auctions.',
    color:  '#DCA134',
  },
  4:  {
    flush:  'First Flush — Peak',
    grade:  'High-Tip SFTGFOP',
    detail: 'The second wave of first flush brings the most prized teas of the Assam calendar — high tip content, brisk flavour, and exquisite muscatel aroma at its most refined.',
    color:  '#DCA134',
  },
  5:  {
    flush:  'Second Flush',
    grade:  'Tippy Golden TGFOP',
    detail: 'Second flush Assam teas are bold, malty, and full-bodied. TGFOP grades command premium auction prices during May at the Guwahati and Calcutta tea exchanges.',
    color:  '#C87A22',
  },
  6:  {
    flush:  'Second Flush — Bold',
    grade:  'Muscatel Character',
    detail: 'The muscatel character peaks in late second flush, with rich amber liquor and a distinctive briskness unique to the iron-rich laterite soils of the Brahmaputra valley.',
    color:  '#C87A22',
  },
  7:  {
    flush:  'Monsoon Flush',
    grade:  'Rainy Season Robust',
    detail: 'The monsoon flush produces high-volume, robust teas used primarily for blending. Estate tours shift focus to the dramatic cloud-shrouded garden landscape and plucking demonstrations.',
    color:  '#3A6B4A',
  },
  8:  {
    flush:  'Monsoon Flush — Mid',
    grade:  'Full-bodied Blend Grade',
    detail: 'Heavy rains characterise mid-monsoon production. Teas are less refined but historically form the foundation of classic British breakfast blends still served globally today.',
    color:  '#3A6B4A',
  },
  9:  {
    flush:  'Autumnal Flush',
    grade:  'Mellow & Amber',
    detail: 'As the rains recede, teas develop a mellow, rounded character with amber cup clarity. The Assam autumnal is prized for its gentle warmth and smooth, low-astringency finish.',
    color:  '#8B4513',
  },
  10: {
    flush:  'Autumnal Flush — Late',
    grade:  'Woody & Dried-Fruit',
    detail: 'Late autumnal teas carry a distinct woodsy, dried-fruit quality unique to the post-monsoon terroir. Many bungalows conduct open heritage tours during the golden October weeks.',
    color:  '#8B4513',
  },
  11: {
    flush:  'Late Harvest',
    grade:  'Specialty Reserve',
    detail: 'The final plucking of the season produces specialty teas in limited volumes before winter dormancy. Select bungalows host private tasting events and planter-led farewell dinners.',
    color:  '#5A3800',
  },
};

// ── Trail metadata ─────────────────────────────────────────────
export const TRAIL_META = {
  'Jorhat Trail': {
    color:  '#DCA134',
    region: 'Upper Assam',
    coords: '26.74 N, 94.21 E',
    desc:   'The oldest tea-growing district in Assam. Jorhat estates trace their lineage to 1840s British Raj planting ventures along the Brahmaputra southern bank.',
  },
  'Dibrugarh Trail': {
    color:  '#3A6B4A',
    region: 'Far Upper Assam',
    coords: '27.48 N, 94.91 E',
    desc:   'Recognised as the Tea Capital of the World, Dibrugarh gardens border the Patkai foothills and produce some of the most sought-after second flush orthodox teas globally.',
  },
  'Sonitpur Trail': {
    color:  '#2060A0',
    region: 'Central Assam',
    coords: '26.63 N, 92.80 E',
    desc:   'Sonitpur estates occupy a unique ecological position bordering Kaziranga National Park and the Himalayan foothills, producing teas with a distinctive mineral-forward character.',
  },
};

// ── Estate bungalow data ───────────────────────────────────────
export const teaEstates = [

  /* ── JORHAT TRAIL ─────────────────────────────────────────── */
  {
    id: 'te1',
    name:    'Mancotta Chang Bungalow',
    subtitle: 'The Purvi Discovery',
    region:  'Jorhat Trail',
    history:  "Built in 1875 as the administrative residence of Mancotta Tea Estate — one of Assam's oldest continuously operating gardens. The elevated chang (stilt) structure has survived seven floods and two world wars intact.",
    harvestMonths: [3, 4, 5, 6, 9, 10, 11],
    harvestStatus: 'First Flush specialist — exceptional March plucking',
    established: '1875',
    elevation:   '116m ASL',
    coordinates: '26.74 N, 94.21 E',
    specialty:   'Orthodox Whole-Leaf SFTGFOP',
  },
  {
    id: 'te2',
    name:    'Wild Mahseer Heritage Bungalow',
    subtitle: 'Balipara River Estate',
    region:  'Jorhat Trail',
    history:  "Established in 1901 beside the Jia Bharali river, Wild Mahseer was a staging post for British fishing expeditions. The bungalow retains its original teak floors, cast-iron plumbing, and hand-painted colonial maps.",
    harvestMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    harvestStatus: 'Second flush muscatel — peak June production',
    established: '1901',
    elevation:   '98m ASL',
    coordinates: '26.68 N, 94.18 E',
    specialty:   'CTC & Orthodox Dual-Process',
  },
  {
    id: 'te3',
    name:    'Thengal Manor',
    subtitle: 'Heritage Planter Estate',
    region:  'Jorhat Trail',
    history:  "A rare example of a manor house entirely constructed from hand-hewn Hollock timber in 1889. Thengal was headquarters of the Jorhat Gymkhana tea circuit and once hosted the annual planters ball.",
    harvestMonths: [4, 5, 6, 9, 10],
    harvestStatus: 'Autumnal flush specialist — October peak',
    established: '1889',
    elevation:   '124m ASL',
    coordinates: '26.77 N, 94.19 E',
    specialty:   'Whole-Leaf Orthodox FTGFOP',
  },

  /* ── DIBRUGARH TRAIL ──────────────────────────────────────── */
  {
    id: 'te4',
    name:    'Banyan Grove Tea Estate Manor',
    subtitle: 'Dikom Estate Heritage House',
    region:  'Dibrugarh Trail',
    history:  "The oldest standing colonial manor in the Dibrugarh district, Banyan Grove was built under the patronage of the Assam Company in 1883. Its 400-year-old banyan marks the geographic centre of the original 1,200-acre estate.",
    harvestMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    harvestStatus: 'Year-round production — all-season heritage stays',
    established: '1883',
    elevation:   '110m ASL',
    coordinates: '27.45 N, 94.89 E',
    specialty:   'Second Flush Tippy TGBOP',
  },
  {
    id: 'te5',
    name:    'Tingri Heritage Bungalow',
    subtitle: 'Patkai Foothills Retreat',
    region:  'Dibrugarh Trail',
    history:  "Positioned at the base of the Patkai hills in 1892, Tingri was built as a planter retreat above the monsoon flood line. The wrap-around veranda still faces the original sundowner view across 900 acres of contiguous garden.",
    harvestMonths: [3, 4, 5, 10, 11],
    harvestStatus: 'First flush and autumnal specialist only',
    established: '1892',
    elevation:   '185m ASL',
    coordinates: '27.51 N, 95.10 E',
    specialty:   'High-Altitude Orthodox — Limited Release',
  },
  {
    id: 'te6',
    name:    'Rajmai Tea Estate Bungalow',
    subtitle: 'Dibrugarh Central Circuit',
    region:  'Dibrugarh Trail',
    history:  "Rajmai was the first estate in Assam to adopt mechanical rolling in 1921, making it a landmark of the industrial shift in Indian tea production. The original Britannia rolling machines are still displayed in the factory foyer.",
    harvestMonths: [5, 6, 7, 8, 9],
    harvestStatus: 'Second flush and monsoon — volume production season',
    established: '1856',
    elevation:   '108m ASL',
    coordinates: '27.42 N, 94.93 E',
    specialty:   'Bold CTC Assam — Breakfast Grade',
  },

  /* ── SONITPUR TRAIL ───────────────────────────────────────── */
  {
    id: 'te7',
    name:    'Eco Camp Tea Bungalow',
    subtitle: 'Kaziranga Wildlife Border Estate',
    region:  'Sonitpur Trail',
    history:  "Carved from the Kaziranga buffer forest in 1924, this estate bungalow sits at the precise boundary of one-horned rhino territory. Post-independence, the original planter family donated the north block to the national park expansion.",
    harvestMonths: [10, 11],
    harvestStatus: 'Autumnal harvest only — wildlife season access',
    established: '1924',
    elevation:   '76m ASL',
    coordinates: '26.57 N, 93.17 E',
    specialty:   'Autumnal Specialty — Limited 200kg Annual Release',
  },
  {
    id: 'te8',
    name:    'Bhalukpong Heritage Estate',
    subtitle: 'Arunachal Foothills Retreat',
    region:  'Sonitpur Trail',
    history:  "Built in 1931 at the confluence of the Kameng river and the Assam-Arunachal border, Bhalukpong Heritage was a military communications outpost before conversion to a tea estate bungalow. The original signal tower still stands.",
    harvestMonths: [3, 4, 5, 6, 9, 10],
    harvestStatus: 'First flush and autumnal — closed monsoon months',
    established: '1931',
    elevation:   '210m ASL',
    coordinates: '26.85 N, 92.63 E',
    specialty:   'High-Elevation First Flush — Muscatel Forward',
  },
  {
    id: 'te9',
    name:    'Balipara Foundation Retreat',
    subtitle: 'Conservation Estate Manor',
    region:  'Sonitpur Trail',
    history:  "A rare fusion of heritage bungalow and active conservation campus, the Balipara Foundation Retreat (est. 1908) is managed as a living laboratory for biodiversity and traditional ecological knowledge alongside its working tea garden.",
    harvestMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    harvestStatus: 'All-season production — year-round ecology programmes',
    established: '1908',
    elevation:   '156m ASL',
    coordinates: '26.71 N, 92.74 E',
    specialty:   'Organic Certified — Rainforest Alliance',
  },
];
