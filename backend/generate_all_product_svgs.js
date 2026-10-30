// backend/generate_all_product_svgs.js
// Creates high-fidelity, authentic agricultural product artwork for items without local photos

const fs = require('fs');
const path = require('path');
const catalog = require('./catalog_data');

const dir1 = path.join(__dirname, '..', 'images');
const dir2 = path.join(__dirname, '..', 'frontend', 'images');

if (!fs.existsSync(dir1)) fs.mkdirSync(dir1, { recursive: true });
if (!fs.existsSync(dir2)) fs.mkdirSync(dir2, { recursive: true });

function getProductArtwork(p) {
  let catColor1 = '#1b4d3e', catColor2 = '#2e7d32';
  let catBadge = 'CERTIFIED SEED';
  let icon = '🌱';
  let spec = 'High Germination • 100% Genuine';

  if (p.category === 'fertilizers') {
    catColor1 = '#14532d'; catColor2 = '#15803d';
    catBadge = 'PLANT NUTRITION';
    icon = '🧪';
    spec = 'Fast Absorption • FCO Approved';
  } else if (p.category === 'protection') {
    catColor1 = '#0c4a6e'; catColor2 = '#0284c7';
    catBadge = 'CROP PROTECTION';
    icon = '🛡️';
    spec = 'Targeted Defense • Maximum Shield';
  } else if (p.category === 'tools') {
    catColor1 = '#1e293b'; catColor2 = '#475569';
    catBadge = 'FARM MACHINERY & TOOLS';
    icon = '⚙️';
    spec = 'Heavy Duty • Precision Quality';
  }

  // Specific specs
  if (p.name.includes('Humic')) spec = '98% Concentrated Organic Flakes';
  else if (p.name.includes('Seaweed')) spec = 'Cold-Water Kelp Bio-Zyme';
  else if (p.name.includes('Calcium')) spec = 'Fortified with Boron • Water Soluble';
  else if (p.name.includes('Magnesium')) spec = 'Epsom Salt • Chlorophyll Booster';
  else if (p.name.includes('Neem Cake')) spec = 'Cold-Pressed • Nematode Repeller';
  else if (p.name.includes('Zinc EDTA')) spec = '12% Chelated Foliar Nutrient';
  else if (p.name.includes('Ferrous')) spec = 'Heera Kasis • Rapid Green-Up';
  else if (p.name.includes('Potash')) spec = 'Molasses Derived Organic Potash';
  else if (p.name.includes('Imidacloprid')) spec = '17.8% SL • Systemic Insecticide';
  else if (p.name.includes('Chlorpyrifos')) spec = '20% EC • Soil Termite Defense';
  else if (p.name.includes('Trichoderma')) spec = '1% WP Bio-Fungicide • Root Care';
  else if (p.name.includes('Mancozeb')) spec = '75% WP Broad Spectrum Shield';
  else if (p.name.includes('Emamectin')) spec = '5% SG Caterpillar Buster';
  else if (p.name.includes('Sticky Trap')) spec = 'Yellow & Blue Double Adhesive';
  else if (p.name.includes('Pheromone')) spec = 'Pink Bollworm Funnel Lure';
  else if (p.name.includes('Nitrobenzene')) spec = '20% W/W Flowering Booster';
  else if (p.name.includes('Copper')) spec = '50% WP Bactericide & Fungicide';
  else if (p.name.includes('Pseudomonas')) spec = 'Liquid PGPR Bio-Inoculant';
  else if (p.name.includes('Chlorantraniliprole')) spec = '18.5% SC Long Duration Shield';
  else if (p.name.includes('Acetamiprid')) spec = '20% SP Whitefly Specialist';
  else if (p.name.includes('Gibberellic')) spec = '0.001% L Cell Elongation Tonic';
  else if (p.name.includes('Spreader')) spec = 'Silicon Non-Ionic Wetting Agent';
  else if (p.name.includes('Lance')) spec = '9-Ft Brass Telescopic Wand';
  else if (p.name.includes('Solar')) spec = 'Auto Dusk-to-Dawn Light Trap';
  else if (p.name.includes('Mulching')) spec = '25 Micron Silver-Black UV Film';
  else if (p.name.includes('TDS')) spec = 'Digital EC, TDS & Temp Sensor';
  else if (p.name.includes('Tarpaulin')) spec = '250 GSM 100% Waterproof Heavy Sheet';
  else if (p.name.includes('Drip Master')) spec = 'Complete 1-Acre Irrigation Lateral Kit';
  else if (p.name.includes('Shade Net')) spec = '50% Agro UV Stabilized Green Net';
  else if (p.name.includes('Tiller') || p.name.includes('Weeder')) spec = 'Multi-Crop Power Weeder Attachment';

  const cleanName = p.name.replace(/[<>&"]/g, '');
  const title1 = cleanName.length > 28 ? cleanName.substring(0, 26) + '...' : cleanName;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
  <defs>
    <linearGradient id="bg_${p.image}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${catColor1}"/>
      <stop offset="100%" stop-color="${catColor2}"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.35)"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg_${p.image})"/>
  
  <!-- Subtle agricultural background pattern -->
  <circle cx="50" cy="50" r="140" fill="rgba(255,255,255,0.03)"/>
  <circle cx="550" cy="400" r="180" fill="rgba(255,255,255,0.03)"/>
  <circle cx="300" cy="225" r="160" fill="rgba(255,255,255,0.04)"/>

  <!-- Top Brand Ribbon -->
  <rect x="0" y="0" width="600" height="42" fill="rgba(0,0,0,0.3)"/>
  <text x="30" y="26" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="13" font-weight="800" letter-spacing="2" fill="#4ade80">MD AGRO CONNECT</text>
  <rect x="420" y="10" width="150" height="22" rx="11" fill="rgba(255,255,255,0.2)"/>
  <text x="495" y="25" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="10" font-weight="700" letter-spacing="1" fill="#ffffff" text-anchor="middle">VERIFIED PRODUCT</text>

  <!-- Central Visual Container -->
  <rect x="50" y="65" width="500" height="320" rx="16" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>

  <!-- Icon Aura -->
  <circle cx="300" cy="170" r="75" fill="rgba(255,255,255,0.12)"/>
  <circle cx="300" cy="170" r="55" fill="rgba(255,255,255,0.18)"/>
  <text x="300" y="188" font-size="64" text-anchor="middle" dominant-baseline="middle">${icon}</text>

  <!-- Category Badge -->
  <rect x="180" y="265" width="240" height="28" rx="14" fill="#0f172a"/>
  <text x="300" y="283" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="11" font-weight="800" letter-spacing="1.5" fill="#4ade80" text-anchor="middle">${catBadge}</text>

  <!-- Product Title -->
  <text x="300" y="325" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="19" font-weight="700" fill="#ffffff" text-anchor="middle">${title1}</text>

  <!-- Technical Spec Subtitle -->
  <text x="300" y="355" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="12" font-weight="500" fill="rgba(255,255,255,0.85)" text-anchor="middle">${spec}</text>

  <!-- Bottom Quality Guarantee Bar -->
  <rect x="0" y="415" width="600" height="35" fill="rgba(0,0,0,0.5)"/>
  <text x="300" y="437" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="11" font-weight="600" fill="#a7f3d0" text-anchor="middle">100% Pure Agricultural Input • Direct Farmer Guarantee</text>
</svg>`;
}

let generatedCount = 0;
catalog.forEach(p => {
  const svg = getProductArtwork(p);
  const file1 = path.join(dir1, `${p.image}.svg`);
  const file2 = path.join(dir2, `${p.image}.svg`);
  fs.writeFileSync(file1, svg, 'utf8');
  fs.writeFileSync(file2, svg, 'utf8');
  generatedCount++;
});

console.log(`✅ Generated dedicated high-fidelity SVG graphics for all ${generatedCount} catalog items!`);
