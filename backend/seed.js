// backend/seed.js
// Seeds the `products` table with all 15 products from the frontend catalog.
// Run once:  node seed.js
//
// Safe to re-run — uses INSERT IGNORE so existing rows are skipped.

require('dotenv').config();
const pool = require('./db');

const PRODUCTS = [
  // ── Seeds ──────────────────────────────────────────────────────────────
  {
    id: 's1', name: 'Premium Hybrid Cotton Seeds', category: 'seeds',
    price: 450, unit: 'per kg', rating: 4.8, reviews: 128,
    description: 'High-yield cotton seeds with excellent pest resistance and high adaptability to varying climatic conditions.',
    image: 'cotton-seed', tags: ['Best Seller', 'High Yield'],
  },
  {
    id: 's2', name: 'Golden Wheat Premium Seeds', category: 'seeds',
    price: 320, unit: 'per 5kg bag', rating: 4.7, reviews: 95,
    description: 'Certified premium grade wheat seeds optimized for maximum grain weight and rust resistance.',
    image: 'wheat-seed', tags: ['Organic', 'Certified'],
  },
  {
    id: 's3', name: 'Sweet Corn Hybrid F1', category: 'seeds',
    price: 180, unit: 'per 500g', rating: 4.9, reviews: 64,
    description: 'Super sweet F1 hybrid variety. Features high germination rates and robust seedling vigor.',
    image: 'corn-seed', tags: ['Sweet', 'F1 Hybrid'],
  },
  {
    id: 's4', name: 'High-Yield Paddy Seeds', category: 'seeds',
    price: 550, unit: 'per 10kg bag', rating: 4.6, reviews: 112,
    description: 'Premium rice seeds suitable for both direct seeding and transplanting. High milling yield.',
    image: 'paddy-seed', tags: ['Drought Tolerant'],
  },

  // ── Fertilizers ────────────────────────────────────────────────────────
  {
    id: 'f1', name: 'Organic Vermicompost booster', category: 'fertilizers',
    price: 250, unit: 'per 10kg bag', rating: 4.9, reviews: 210,
    description: '100% organic earthworm compost enriched with nitrogen, phosphorus, and potassium for robust soil health.',
    image: 'vermicompost', tags: ['100% Organic', 'Soil Health'],
  },
  {
    id: 'f2', name: 'NPK 19:19:19 Soluble Fertilizer', category: 'fertilizers',
    price: 350, unit: 'per kg', rating: 4.7, reviews: 142,
    description: 'Fully water-soluble fertilizer for balanced crop nutrition. Excellent for foliar application and fertigation.',
    image: 'npk', tags: ['Water Soluble'],
  },
  {
    id: 'f3', name: 'Premium Crop Booster Liquid', category: 'fertilizers',
    price: 499, unit: 'per 500ml', rating: 4.8, reviews: 87,
    description: 'Advanced liquid fertilizer with micronutrients and seaweed extract to accelerate growth and flowering.',
    image: 'liquid-booster', tags: ['Fast Acting', 'Micronutrients'],
  },
  {
    id: 'f4', name: 'Soil Micronutrient Mixture', category: 'fertilizers',
    price: 280, unit: 'per 2kg bag', rating: 4.5, reviews: 49,
    description: 'Formulated mix of Zinc, Iron, Manganese, Boron, and Copper to cure deficiencies in all crop types.',
    image: 'micronutrient', tags: ['Deficiency Cure'],
  },

  // ── Protection ─────────────────────────────────────────────────────────
  {
    id: 'p1', name: 'Bio-Pesticide Neem Shield', category: 'protection',
    price: 290, unit: 'per 500ml', rating: 4.7, reviews: 156,
    description: 'Cold-pressed neem oil formulation with high Azadirachtin content. Natural defense against 200+ chewing & sucking pests.',
    image: 'neem-shield', tags: ['Eco-Friendly', 'Non-Toxic'],
  },
  {
    id: 'p2', name: 'Fungicide Cure-All Pow', category: 'protection',
    price: 420, unit: 'per 500g', rating: 4.6, reviews: 73,
    description: 'Broad-spectrum systemic fungicide offering both protective and curative action against fungal leaf spots and rust.',
    image: 'fungicide', tags: ['Broad Spectrum'],
  },
  {
    id: 'p3', name: 'Selective Herbicide Green-Clean', category: 'protection',
    price: 380, unit: 'per Litre', rating: 4.4, reviews: 81,
    description: 'Post-emergence selective herbicide for effective control of broadleaf weeds without affecting the primary crops.',
    image: 'herbicide', tags: ['Selective Weed Control'],
  },

  // ── Tools ──────────────────────────────────────────────────────────────
  {
    id: 't1', name: 'Premium Ergonomic Hand Trowel', category: 'tools',
    price: 150, unit: 'per unit', rating: 4.8, reviews: 90,
    description: 'Heavy duty rust-resistant aluminum trowel with comfortable rubber grip. Ideal for planting and weeding.',
    image: 'trowel', tags: ['Durable', 'Ergonomic'],
  },
  {
    id: 't2', name: 'Battery Operated Knapsack Sprayer', category: 'tools',
    price: 2800, unit: 'per unit', rating: 4.7, reviews: 215,
    description: '16-Litre heavy-duty electric sprayer with rechargeable battery, pressure regulator, and multiple spray nozzles.',
    image: 'sprayer', tags: ['Electric', 'High Capacity'],
  },
  {
    id: 't3', name: '3-in-1 Soil Moisture & pH Meter', category: 'tools',
    price: 650, unit: 'per unit', rating: 4.5, reviews: 134,
    description: 'Battery-free testing device for soil moisture, pH level, and sunlight intensity. Perfect for precision farming.',
    image: 'ph-meter', tags: ['Battery Free', 'Smart Tool'],
  },
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    console.log('🌱  Starting product seed...\n');

    let inserted = 0;
    let skipped  = 0;

    for (const p of PRODUCTS) {
      const [result] = await conn.execute(
        `INSERT IGNORE INTO products
           (id, name, category, price, unit, rating, reviews, description, image, tags)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.id, p.name, p.category, p.price, p.unit,
         p.rating, p.reviews, p.description, p.image,
         JSON.stringify(p.tags)]
      );

      if (result.affectedRows > 0) {
        console.log(`  ✅  Inserted: [${p.id}] ${p.name}`);
        inserted++;
      } else {
        console.log(`  ⏭️   Skipped (already exists): [${p.id}] ${p.name}`);
        skipped++;
      }
    }

    console.log(`\n✔  Seed complete — ${inserted} inserted, ${skipped} skipped.`);
  } catch (err) {
    console.error('\n❌  Seed failed:', err.message);
    throw err;
  } finally {
    conn.release();
    process.exit(0);
  }
}

seed();
