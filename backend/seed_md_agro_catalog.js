/**
 * backend/seed_md_agro_catalog.js
 * ─────────────────────────────────────────────────────────────
 * Official Product Seeder for M D AGRO SERVICES, Sonai
 * Populates Cloud MySQL (Aiven) and local catalog with authentic
 * products from the official 33-page business price list.
 * ─────────────────────────────────────────────────────────────
 */

const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();

const MD_AGRO_PRODUCTS = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. CROP PROTECTION (INSECTICIDES, FUNGICIDES, HERBICIDES)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cp01",
    name: "FMC Coragen (Chlorantraniliprole 18.5% SC)",
    category: "protection",
    price: 890.00,
    unit: "60ml",
    rating: 4.9,
    reviews: 240,
    description: "Industry leading broad-spectrum anthranilic diamide insecticide. Superior control against Pod borer, DBM, Stem borer, and bollworms with long duration efficacy.",
    image: "coragen",
    tags: ["FMC", "Best Seller", "Borer Control"],
    in_stock: 1,
    stock_quantity: 45,
    low_stock_threshold: 10
  },
  {
    id: "cp02",
    name: "FMC Coragen 150ml Pack",
    category: "protection",
    price: 2220.00,
    unit: "150ml",
    rating: 4.9,
    reviews: 180,
    description: "Economy pack of FMC Coragen for larger fields. Provides remarkable protection against lepidopteran chewing pests on Sugarcane, Cotton, and Vegetables.",
    image: "coragen",
    tags: ["FMC", "Economy Pack", "Sugarcane Special"],
    in_stock: 1,
    stock_quantity: 25,
    low_stock_threshold: 5
  },
  {
    id: "cp03",
    name: "Bayer Confidor (Imidacloprid 17.8% SL)",
    category: "protection",
    price: 320.00,
    unit: "100ml",
    rating: 4.8,
    reviews: 195,
    description: "World-renowned systemic neonicotinoid insecticide for sucking pest control including Aphids, Whiteflies, Jassids, and Thrips in vegetables and cash crops.",
    image: "confidor",
    tags: ["Bayer", "Sucking Pests", "Systemic"],
    in_stock: 1,
    stock_quantity: 60,
    low_stock_threshold: 15
  },
  {
    id: "cp04",
    name: "Bayer Confidor Super (Imidacloprid 30.5% SC)",
    category: "protection",
    price: 1050.00,
    unit: "250ml",
    rating: 4.9,
    reviews: 110,
    description: "High concentration formulation delivering immediate knockdown and lingering systemic protection against destructive sucking insect complexes.",
    image: "confidor",
    tags: ["Bayer", "High Concentration", "Super Power"],
    in_stock: 1,
    stock_quantity: 30,
    low_stock_threshold: 8
  },
  {
    id: "cp05",
    name: "Bayer Nativo (Tebuconazole 50% + Trifloxystrobin 25% WG)",
    category: "protection",
    price: 790.00,
    unit: "100gm",
    rating: 4.9,
    reviews: 155,
    description: "Dual-action systemic broad-spectrum fungicide with mesostemic power. Gives excellent preventive and curative action against Sheath Blight, Powdery Mildew, and Anthracnose.",
    image: "fungicide",
    tags: ["Bayer", "Dual Action", "Fungicide"],
    in_stock: 1,
    stock_quantity: 40,
    low_stock_threshold: 10
  },
  {
    id: "cp06",
    name: "Bayer Admire 70% WG (Imidacloprid)",
    category: "protection",
    price: 355.00,
    unit: "30gm",
    rating: 4.8,
    reviews: 90,
    description: "Granular water-dispersible formulation for rapid systemic absorption through foliage and roots against stubborn thrips and jassids.",
    image: "insecticide",
    tags: ["Bayer", "Thrips Control", "WG Formulation"],
    in_stock: 1,
    stock_quantity: 50,
    low_stock_threshold: 12
  },
  {
    id: "cp07",
    name: "Bayer Antracol 70% WP (Propineb)",
    category: "protection",
    price: 730.00,
    unit: "1kg",
    rating: 4.7,
    reviews: 130,
    description: "Superior contact fungicide with containing available Zinc (15%). Ideal for early blight, late blight, and downy mildew control with crop greening benefits.",
    image: "fungicide",
    tags: ["Bayer", "With Zinc", "Leaf Spot"],
    in_stock: 1,
    stock_quantity: 35,
    low_stock_threshold: 10
  },
  {
    id: "cp08",
    name: "Bayer Luna Experience (Fluopyram + Tebuconazole)",
    category: "protection",
    price: 1435.00,
    unit: "250ml",
    rating: 4.9,
    reviews: 82,
    description: "Next-generation SDHI combination fungicide offering unbeatable control over powdery mildew and anthracnose in grapes, pomegranates, and vegetables.",
    image: "fungicide",
    tags: ["Bayer", "Premium", "Fruit Care"],
    in_stock: 1,
    stock_quantity: 20,
    low_stock_threshold: 5
  },
  {
    id: "cp09",
    name: "Syngenta Alika (Thiamethoxam 12.6% + Lambda Cyhalothrin 9.5% ZC)",
    category: "protection",
    price: 580.00,
    unit: "200ml",
    rating: 4.8,
    reviews: 215,
    description: "Unique ZC capsule suspension formulation. Knocks down hidden pests on contact and keeps crops protected systemically with enhanced rainfastness.",
    image: "insecticide",
    tags: ["Syngenta", "ZC Formula", "Fast Knockdown"],
    in_stock: 1,
    stock_quantity: 55,
    low_stock_threshold: 15
  },
  {
    id: "cp10",
    name: "Syngenta Amistar Top (Azoxystrobin 18.2% + Difenoconazole 11.4% SC)",
    category: "protection",
    price: 950.00,
    unit: "200ml",
    rating: 4.9,
    reviews: 145,
    description: "Broad-spectrum strobilurin + triazole fungicide providing outstanding plant health, superior disease resistance, and higher grain luster.",
    image: "fungicide",
    tags: ["Syngenta", "Strobilurin", "Yield Booster"],
    in_stock: 1,
    stock_quantity: 35,
    low_stock_threshold: 8
  },
  {
    id: "cp11",
    name: "Syngenta Ampligo (Chlorantraniliprole 9.3% + Lambda 4.6% ZC)",
    category: "protection",
    price: 1699.00,
    unit: "200ml",
    rating: 4.9,
    reviews: 170,
    description: "Advanced dual-chemistry insecticide for devastating armyworm and bollworm outbreaks in maize, soybean, and cotton crops.",
    image: "coragen",
    tags: ["Syngenta", "Armyworm", "High Power"],
    in_stock: 1,
    stock_quantity: 28,
    low_stock_threshold: 6
  },
  {
    id: "cp12",
    name: "Syngenta Pegasus (Diafenthiuron 50% WP)",
    category: "protection",
    price: 890.00,
    unit: "250gm",
    rating: 4.8,
    reviews: 160,
    description: "Photoderivative insecticide & miticide with vapor action. Highly effective against resistant Whiteflies, Thrips, and Mites under underside of leaves.",
    image: "insecticide",
    tags: ["Syngenta", "Mites & Thrips", "Vapor Action"],
    in_stock: 1,
    stock_quantity: 40,
    low_stock_threshold: 10
  },
  {
    id: "cp13",
    name: "Syngenta Ridomil Gold (Metalaxyl-M 4% + Mancozeb 64% WP)",
    category: "protection",
    price: 790.00,
    unit: "500gm",
    rating: 4.8,
    reviews: 125,
    description: "Gold standard systemic and contact fungicide for damping-off, downy mildew, and late blight prevention in tomato, potato, and grapes.",
    image: "fungicide",
    tags: ["Syngenta", "Gold Standard", "Downy Mildew"],
    in_stock: 1,
    stock_quantity: 30,
    low_stock_threshold: 8
  },
  {
    id: "cp14",
    name: "Syngenta Simodis (Isocycloseram 10% DC)",
    category: "protection",
    price: 1165.00,
    unit: "120ml",
    rating: 4.9,
    reviews: 75,
    description: "Revolutionary PLINAZOLIN technology. Unsurpassed control against difficult-to-kill sucking pests, mites, and thrips in chilli, brinjal, and onions.",
    image: "insecticide",
    tags: ["Syngenta", "Plinazolin", "Next-Gen"],
    in_stock: 1,
    stock_quantity: 22,
    low_stock_threshold: 5
  },
  {
    id: "cp15",
    name: "BASF Cabrio Top (Pyraclostrobin + Metiram 60% WG)",
    category: "protection",
    price: 1350.00,
    unit: "600gm",
    rating: 4.9,
    reviews: 190,
    description: "Blockbuster fungicide with AgCelence effect. Controls anthracnose and downy mildew while significantly boosting crop vitality and fruit polish.",
    image: "fungicide",
    tags: ["BASF", "AgCelence", "Top Quality"],
    in_stock: 1,
    stock_quantity: 32,
    low_stock_threshold: 8
  },
  {
    id: "cp16",
    name: "BASF Exponus (Broflanilide 300 G/L SC)",
    category: "protection",
    price: 1000.00,
    unit: "17ml",
    rating: 4.9,
    reviews: 115,
    description: "Ultra-potent novel insecticide mode-of-action for controlling resistant chewing and sucking larvae with minimal dosage.",
    image: "insecticide",
    tags: ["BASF", "Novel Chemistry", "Super Concentrate"],
    in_stock: 1,
    stock_quantity: 20,
    low_stock_threshold: 5
  },
  {
    id: "cp17",
    name: "BASF Lihocin 50% SL (Chlormequat Chloride)",
    category: "protection",
    price: 475.00,
    unit: "250ml",
    rating: 4.8,
    reviews: 210,
    description: "Trusted plant growth regulator. Diverts vegetative excess into heavy flowering, boll retention, and robust root development in cotton and soybean.",
    image: "liquid-booster",
    tags: ["BASF", "Growth Regulator", "Flowering Power"],
    in_stock: 1,
    stock_quantity: 65,
    low_stock_threshold: 15
  },
  {
    id: "cp18",
    name: "UPL Saaf Fungicide (Carbendazim 12% + Mancozeb 63% WP)",
    category: "protection",
    price: 710.00,
    unit: "1kg",
    rating: 4.8,
    reviews: 310,
    description: "India's most trusted systemic and contact combination fungicide for seed treatment, root drenching, and foliar spray against blights, blast, and rot.",
    image: "fungicide",
    tags: ["UPL", "All-Rounder", "Seed Treatment"],
    in_stock: 1,
    stock_quantity: 85,
    low_stock_threshold: 20
  },
  {
    id: "cp19",
    name: "UPL Ulala (Flonicamid 50% WG)",
    category: "protection",
    price: 620.00,
    unit: "60gm",
    rating: 4.9,
    reviews: 140,
    description: "Specialized systemic insecticide causing immediate cessation of feeding in aphids, brown plant hopper, and whitefly nymphs.",
    image: "insecticide",
    tags: ["UPL", "Anti-Feeding", "Aphid Specialist"],
    in_stock: 1,
    stock_quantity: 45,
    low_stock_threshold: 10
  },
  {
    id: "cp20",
    name: "Crystal Bavistin 50% WP (Carbendazim)",
    category: "protection",
    price: 530.00,
    unit: "500gm",
    rating: 4.7,
    reviews: 180,
    description: "Renowned systemic broad-spectrum fungicide with protective and curative action for seed, soil, and foliar application.",
    image: "fungicide",
    tags: ["Crystal", "Systemic", "Multi-Crop"],
    in_stock: 1,
    stock_quantity: 50,
    low_stock_threshold: 12
  },
  {
    id: "cp21",
    name: "Crystal Blue Copper 50% WP (Copper Oxychloride)",
    category: "protection",
    price: 450.00,
    unit: "500gm",
    rating: 4.7,
    reviews: 95,
    description: "Contact bactericide and fungicide providing thick protective barrier against bacterial blight, canker, and downy mildew in horticulture crops.",
    image: "fungicide",
    tags: ["Crystal", "Copper", "Bactericide"],
    in_stock: 1,
    stock_quantity: 40,
    low_stock_threshold: 10
  },
  {
    id: "cp22",
    name: "Crystal Proclaim (Emamectin Benzoate 5% SG)",
    category: "protection",
    price: 290.00,
    unit: "50gm",
    rating: 4.8,
    reviews: 200,
    description: "Microbially derived insecticide for swift caterpillar control with translaminar movement to reach larvae feeding on the leaf reverse side.",
    image: "insecticide",
    tags: ["Crystal", "Caterpillar", "Translaminar"],
    in_stock: 1,
    stock_quantity: 70,
    low_stock_threshold: 15
  },
  {
    id: "cp23",
    name: "Dhanuka Targa Super (Quizalofop Ethyl 5% EC)",
    category: "protection",
    price: 430.00,
    unit: "250ml",
    rating: 4.8,
    reviews: 135,
    description: "Selective post-emergence herbicide for complete weed eradication of narrow-leaf grassy weeds in broad-leaf crops (soybean, onion, cotton, groundnut).",
    image: "herbicide",
    tags: ["Dhanuka", "Grass Killer", "Selective"],
    in_stock: 1,
    stock_quantity: 40,
    low_stock_threshold: 10
  },
  {
    id: "cp24",
    name: "Dhanuka Sempra 75% WG (Halosulfuron Methyl)",
    category: "protection",
    price: 780.00,
    unit: "18gm",
    rating: 4.9,
    reviews: 175,
    description: "The ultimate solution for eradicating Cyperus rotundus (Nutgrass / Lavala / Motha) weeds from roots in sugarcane and maize fields.",
    image: "herbicide",
    tags: ["Dhanuka", "Nutgrass Eradicator", "Root Action"],
    in_stock: 1,
    stock_quantity: 35,
    low_stock_threshold: 8
  },
  {
    id: "cp25",
    name: "Monsanto Roundup Herbicide (Glyphosate 41% SL)",
    category: "protection",
    price: 580.00,
    unit: "1 Litre",
    rating: 4.7,
    reviews: 280,
    description: "Non-selective systemic post-emergence weed killer. Translocates deep into root rhizomes for field sanitation, bund cleaning, and zero-tillage weed clearance.",
    image: "herbicide",
    tags: ["Monsanto", "Non-Selective", "Bund Cleaner"],
    in_stock: 1,
    stock_quantity: 50,
    low_stock_threshold: 12
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. FERTILIZERS & PLANT NUTRIENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "fn01",
    name: "Aries 19:19:19 NPK 100% Water Soluble Fertilizer",
    category: "fertilizers",
    price: 220.00,
    unit: "1kg",
    rating: 4.8,
    reviews: 290,
    description: "Balanced general-purpose 100% water soluble grade fertilizer for drip irrigation and foliar feeding during early crop growth and vegetative expansion.",
    image: "npk",
    tags: ["Aries Agro", "100% Soluble", "Balanced NPK"],
    in_stock: 1,
    stock_quantity: 120,
    low_stock_threshold: 25
  },
  {
    id: "fn02",
    name: "Aries 00:52:34 MKP (Monopotassium Phosphate)",
    category: "fertilizers",
    price: 5200.00,
    unit: "25kg Bag",
    rating: 4.9,
    reviews: 85,
    description: "High-grade water-soluble Phosphorus and Potassium for abundant flowering induction, fruit set, and enhanced resistance against fungal downy mildew.",
    image: "npk",
    tags: ["Aries Agro", "Flowering Booster", "25kg Commercial"],
    in_stock: 1,
    stock_quantity: 20,
    low_stock_threshold: 5
  },
  {
    id: "fn03",
    name: "Aries 12:61:00 MAP (Monoammonium Phosphate)",
    category: "fertilizers",
    price: 4300.00,
    unit: "25kg Bag",
    rating: 4.8,
    reviews: 70,
    description: "High phosphate starter fertilizer essential for vigorous root proliferation and early seedling establishment in transplanted seedlings.",
    image: "npk",
    tags: ["Aries Agro", "Root Starter", "High Phosphate"],
    in_stock: 1,
    stock_quantity: 18,
    low_stock_threshold: 4
  },
  {
    id: "fn04",
    name: "Aries Agromine Max Multi-Micronutrient Formulation",
    category: "fertilizers",
    price: 550.00,
    unit: "1kg",
    rating: 4.8,
    reviews: 140,
    description: "State-specific complete balanced mix of Zinc, Iron, Manganese, Copper, Boron, and Molybdenum in chelated form to correct chlorosis and yellowing.",
    image: "micronutrient",
    tags: ["Aries Agro", "Multi Micronutrient", "Chelated"],
    in_stock: 1,
    stock_quantity: 60,
    low_stock_threshold: 15
  },
  {
    id: "fn05",
    name: "Aries Boron 20 (Disodium Octaborate Tetrahydrate)",
    category: "fertilizers",
    price: 320.00,
    unit: "500gm",
    rating: 4.7,
    reviews: 110,
    description: "100% water-soluble 20% Boron to prevent flower dropping, fruit cracking, hollow stem, and poor seed filling in onion, pomegranate, and tomato.",
    image: "boron",
    tags: ["Aries Agro", "Boron 20%", "Anti-Drop"],
    in_stock: 1,
    stock_quantity: 50,
    low_stock_threshold: 10
  },
  {
    id: "fn06",
    name: "IFFCO Nano Urea Liquid 4% N",
    category: "fertilizers",
    price: 225.00,
    unit: "500ml Bottle",
    rating: 4.9,
    reviews: 350,
    description: "Revolutionary patented nanotechnology foliar fertilizer. One 500ml bottle replaces a 45kg bag of conventional urea with 80%+ nitrogen use efficiency.",
    image: "urea",
    tags: ["IFFCO", "Nano Tech", "Eco Friendly"],
    in_stock: 1,
    stock_quantity: 100,
    low_stock_threshold: 20
  },
  {
    id: "fn07",
    name: "RCF Ujjawala Neem Coated Urea",
    category: "fertilizers",
    price: 266.00,
    unit: "45kg Bag",
    rating: 4.8,
    reviews: 420,
    description: "Standard subsidized Indian neem-coated urea granular fertilizer supplying 46% nitrogen with slow nitrification for sustained crop nourishment.",
    image: "urea",
    tags: ["RCF", "Neem Coated", "Government Rate"],
    in_stock: 1,
    stock_quantity: 90,
    low_stock_threshold: 20
  },
  {
    id: "fn08",
    name: "RCF MOP Muriate of Potash (00:00:60)",
    category: "fertilizers",
    price: 1500.00,
    unit: "50kg Bag",
    rating: 4.7,
    reviews: 160,
    description: "Essential Potassium fertilizer for crop lodging resistance, sugar synthesis in sugarcane, and high fruit weight with enhanced shelf life.",
    image: "potash",
    tags: ["RCF", "Potassium 60%", "Grain Weight"],
    in_stock: 1,
    stock_quantity: 35,
    low_stock_threshold: 10
  },
  {
    id: "fn09",
    name: "Coromandel Gromor 20:20:0:13 (Ammonium Phosphate Sulphate)",
    category: "fertilizers",
    price: 1300.00,
    unit: "50kg Bag",
    rating: 4.8,
    reviews: 190,
    description: "Popular basal fertilizer supplying 20% Nitrogen, 20% Phosphate, and 13% essential Sulphur for oilseed, pulse, and onion crops.",
    image: "npk",
    tags: ["Coromandel", "With Sulphur", "Basal Grade"],
    in_stock: 1,
    stock_quantity: 40,
    low_stock_threshold: 10
  },
  {
    id: "fn10",
    name: "YaraMila Complex NPK (12:11:18 + S + Mg)",
    category: "fertilizers",
    price: 2500.00,
    unit: "25kg Bag",
    rating: 4.9,
    reviews: 110,
    description: "World-class prilled compound fertilizer with SOP-based chloride-free potassium, magnesium, and sulfur designed for premium horticultural produce.",
    image: "npk",
    tags: ["Yara", "SOP Potassium", "Horticulture Elite"],
    in_stock: 1,
    stock_quantity: 25,
    low_stock_threshold: 5
  },
  {
    id: "fn11",
    name: "Biostadt Biozyme Crop Plus (Seaweed Bio-Stimulant)",
    category: "fertilizers",
    price: 440.00,
    unit: "500ml",
    rating: 4.8,
    reviews: 175,
    description: "Enzymatic Ascophyllum Nodosum seaweed extract enriched with natural cytokinins and auxins to spark rapid root branching and stress recovery.",
    image: "liquid-booster",
    tags: ["Biostadt", "Seaweed Extract", "Growth Tonic"],
    in_stock: 1,
    stock_quantity: 45,
    low_stock_threshold: 10
  },
  {
    id: "fn12",
    name: "Pure Agricultural Sulphur 90% WDG / Powder",
    category: "fertilizers",
    price: 600.00,
    unit: "10kg",
    rating: 4.7,
    reviews: 120,
    description: "Essential fourth primary nutrient. Enhances oil content in groundnut & mustard, acts as preventive soil fungicide, and lowers alkaline soil pH.",
    image: "micronutrient",
    tags: ["Soil Nutrition", "Sulphur 90%", "Oil Booster"],
    in_stock: 1,
    stock_quantity: 50,
    low_stock_threshold: 12
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. CERTIFIED & HYBRID SEEDS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "sd01",
    name: "Rasi RCH-659 BG-II Hybrid Cotton Seeds",
    category: "seeds",
    price: 864.00,
    unit: "475gm Packet",
    rating: 4.9,
    reviews: 320,
    description: "Maharashtra & Marathwada's top-selling Bollgard-II hybrid cotton. Huge boll weight (5.5 - 6.0 gm), high sucking pest tolerance, and exceptional lint ginning outturn.",
    image: "cotton-seed",
    tags: ["Rasi Seeds", "Bollgard-II", "Top Seller"],
    in_stock: 1,
    stock_quantity: 110,
    low_stock_threshold: 25
  },
  {
    id: "sd02",
    name: "Rasi Magic RCH-386 Bt Cotton Seeds",
    category: "seeds",
    price: 864.00,
    unit: "475gm Packet",
    rating: 4.8,
    reviews: 190,
    description: "High boll retention Bollgard-II cotton designed for irrigated as well as medium rainfed soils. High resistance to boll drop under stress conditions.",
    image: "cotton-seed",
    tags: ["Rasi Seeds", "Magic 386", "Stress Tolerant"],
    in_stock: 1,
    stock_quantity: 85,
    low_stock_threshold: 20
  },
  {
    id: "sd03",
    name: "Mahyco Cotton 7351 Gold (Bollgard-II)",
    category: "seeds",
    price: 901.00,
    unit: "475gm Packet",
    rating: 4.8,
    reviews: 145,
    description: "Premium performance cotton hybrid with heavy boll bearing from base to top, compact plant architecture, and early picking convenience.",
    image: "cotton-seed",
    tags: ["Mahyco", "Gold Series", "Easy Picking"],
    in_stock: 1,
    stock_quantity: 70,
    low_stock_threshold: 15
  },
  {
    id: "sd04",
    name: "Advanta Bhendi Radhika Hybrid (3000 Seeds)",
    category: "seeds",
    price: 1500.00,
    unit: "3000 Seeds Pack",
    rating: 4.9,
    reviews: 210,
    description: "Industry benchmark hybrid okra. Dark green slender 5-ridged pods with strong tolerance to Yellow Vein Mosaic Virus (YVMV) and Enation Leaf Curl Virus.",
    image: "okra-seed",
    tags: ["Advanta", "Radhika Okra", "YVMV Resistant"],
    in_stock: 1,
    stock_quantity: 45,
    low_stock_threshold: 10
  },
  {
    id: "sd05",
    name: "Ellora Onion Fursungi Red Seeds",
    category: "seeds",
    price: 925.00,
    unit: "500gm Pack",
    rating: 4.9,
    reviews: 260,
    description: "Genuine Ahmednagar/Nashik Fursungi selection. Attractive globe-shaped dark red bulbs with tight neck and 6-7 months excellent godown storage longevity.",
    image: "onion-seed",
    tags: ["Ellora", "Fursungi Onion", "High Storage"],
    in_stock: 1,
    stock_quantity: 75,
    low_stock_threshold: 15
  },
  {
    id: "sd06",
    name: "Gajanan Onion Prashant Fursungi Seeds",
    category: "seeds",
    price: 2500.00,
    unit: "1kg Pack",
    rating: 4.8,
    reviews: 180,
    description: "Certified commercial onion seed known for uniform bulb size (70-90gm), zero bolting, and maximum market rate in agricultural APMC mandis.",
    image: "onion-seed",
    tags: ["Gajanan", "100% Genuine", "APMC Grade A"],
    in_stock: 1,
    stock_quantity: 40,
    low_stock_threshold: 10
  },
  {
    id: "sd07",
    name: "Bayer Dekalb Maize DKC-9141 Acceleron Seed",
    category: "seeds",
    price: 1650.00,
    unit: "3.5kg Pack",
    rating: 4.9,
    reviews: 135,
    description: "High-yielding single cross corn hybrid treated with Acceleron seed enhancement. Thick orange-yellow cobs with complete tip coverage and strong stay-green stalks.",
    image: "corn-seed",
    tags: ["Bayer Dekalb", "Acceleron", "High Yield Maize"],
    in_stock: 1,
    stock_quantity: 65,
    low_stock_threshold: 15
  },
  {
    id: "sd08",
    name: "Pioneer Bajra 86M94 Hybrid Pearl Millet",
    category: "seeds",
    price: 890.00,
    unit: "1.5kg Pack",
    rating: 4.8,
    reviews: 160,
    description: "Widely grown drought-tolerant hybrid bajra. Compact cylinder heads tightly packed with bold gray grains and high resistance to Downy Mildew / Gosavi disease.",
    image: "millet-seed",
    tags: ["Pioneer", "86M94", "Drought Hardy"],
    in_stock: 1,
    stock_quantity: 50,
    low_stock_threshold: 12
  },
  {
    id: "sd09",
    name: "Rushikesh Certified Soyabean Seed KDS-726 (Phule Sangam)",
    category: "seeds",
    price: 2450.00,
    unit: "24kg Bag",
    rating: 4.9,
    reviews: 290,
    description: "MPKV Rahuri released breakthrough soybean variety KDS-726. Highly resistant to rust and stem fly, pod shattering resistant, giving 14-18 quintals/acre.",
    image: "soybean-seed",
    tags: ["MPKV Rahuri", "KDS-726", "Phule Sangam"],
    in_stock: 1,
    stock_quantity: 35,
    low_stock_threshold: 8
  },
  {
    id: "sd10",
    name: "Certified Wheat Seed Lokwan / GW-496",
    category: "seeds",
    price: 1500.00,
    unit: "20kg Bag",
    rating: 4.8,
    reviews: 220,
    description: "Traditional favourite bold amber grain wheat. Excellent roti making quality, heat tolerant at grain filling stage, and high straw production for livestock fodder.",
    image: "wheat-seed",
    tags: ["Certified Seed", "GW-496", "Lustrous Grains"],
    in_stock: 1,
    stock_quantity: 45,
    low_stock_threshold: 10
  },
  {
    id: "sd11",
    name: "Syngenta Hybrid Tomato 1068 Seeds",
    category: "seeds",
    price: 980.00,
    unit: "10gm Pack",
    rating: 4.8,
    reviews: 140,
    description: "High firm square-round tomatoes with deep red inside color. Excellent long-distance shipping resilience with high TyLCV virus tolerance.",
    image: "tomato-seed",
    tags: ["Syngenta", "Firm Fruit", "Export Quality"],
    in_stock: 1,
    stock_quantity: 60,
    low_stock_threshold: 12
  },
  {
    id: "sd12",
    name: "Syngenta Cauliflower Shobha-185 F1 Seeds",
    category: "seeds",
    price: 270.00,
    unit: "10gm Pack",
    rating: 4.7,
    reviews: 80,
    description: "Early maturity dome-shaped pure white compact curds with excellent self-blanching leaf habit for fresh market sales.",
    image: "vegetable-seed",
    tags: ["Syngenta", "Pure White", "Early Harvest"],
    in_stock: 1,
    stock_quantity: 50,
    low_stock_threshold: 10
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. IRRIGATION, TOOLS & PROTECTIVE GEAR
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "tl01",
    name: "Kaypee KP-777 4-Stroke Heavy Duty Power Sprayer",
    category: "tools",
    price: 9500.00,
    unit: "1 Complete Set",
    rating: 4.9,
    reviews: 85,
    description: "Honda-type 4-stroke petrol engine powered brass pump knapsack sprayer. Delivers steady 40 Bar pressure for rapid orchard and tall field spraying without battery anxiety.",
    image: "sprayer",
    tags: ["Kaypee", "4-Stroke Engine", "Heavy Duty"],
    in_stock: 1,
    stock_quantity: 12,
    low_stock_threshold: 3
  },
  {
    id: "tl02",
    name: "Kaypee Deluxe 2-in-1 12V 12Ah Battery Knapsack Sprayer",
    category: "tools",
    price: 3400.00,
    unit: "1 Unit (16L)",
    rating: 4.8,
    reviews: 140,
    description: "Dual system rechargeable battery sprayer with back-up manual pump lever. High capacity 12Ah dry battery powers 25-30 tanks per full charge with 4 brass nozzles.",
    image: "sprayer",
    tags: ["Kaypee", "2-in-1 Battery", "12V 12Ah"],
    in_stock: 1,
    stock_quantity: 20,
    low_stock_threshold: 5
  },
  {
    id: "tl03",
    name: "Pragati Silver-Black Agricultural Mulching Film 25 Micron",
    category: "tools",
    price: 1950.00,
    unit: "400m Roll (2.5ft)",
    rating: 4.9,
    reviews: 175,
    description: "100% virgin LLDPE UV stabilized agricultural mulching paper. Prevents 95% weed growth, cuts drip water evaporation by half, and accelerates crop growth.",
    image: "mulch-film",
    tags: ["Pragati", "100% Virgin", "25 Micron UV"],
    in_stock: 1,
    stock_quantity: 35,
    low_stock_threshold: 8
  },
  {
    id: "tl04",
    name: "Flat Drip Irrigation Inline Pipe 16mm (20cm Spacing)",
    category: "tools",
    price: 2000.00,
    unit: "Bundle (12kg)",
    rating: 4.8,
    reviews: 95,
    description: "Virgin polymer flat drip tube with injection-molded flat drippers at 20cm pitch. Delivers precise 2 LPH discharge with anti-clogging labyrinth design.",
    image: "drip-kit",
    tags: ["Flat Drip", "Anti-Clog", "16mm Inline"],
    in_stock: 1,
    stock_quantity: 30,
    low_stock_threshold: 6
  },
  {
    id: "tl05",
    name: "L&T MK-1 Direct-On-Line (DOL) 3-Phase Motor Starter (13-22A)",
    category: "tools",
    price: 2000.00,
    unit: "1 Unit",
    rating: 4.9,
    reviews: 160,
    description: "India's highest reliability agricultural pump motor starter from Larsen & Toubro. Built-in bi-metallic thermal overload protection and single-phasing prevention.",
    image: "motor-starter",
    tags: ["L&T", "Pump Protection", "3-Phase Starter"],
    in_stock: 1,
    stock_quantity: 24,
    low_stock_threshold: 5
  },
  {
    id: "tl06",
    name: "Foot Valve Brass Spring Model (3 Inch Imp)",
    category: "tools",
    price: 380.00,
    unit: "1 Unit",
    rating: 4.7,
    reviews: 110,
    description: "Heavy-duty agricultural water pump suction foot valve with stainless steel spring and non-return flap mechanism to hold pump prime permanently.",
    image: "water-pump",
    tags: ["Non-Return", "3 Inch", "Heavy Brass"],
    in_stock: 1,
    stock_quantity: 45,
    low_stock_threshold: 10
  },
  {
    id: "tl07",
    name: "Barrix Catch Fruit Fly Trap with Lure",
    category: "tools",
    price: 430.00,
    unit: "1 Set with Lure",
    rating: 4.8,
    reviews: 120,
    description: "Pheromone fruit fly trap certified for organic farming. Attracts and terminates male Bactrocera dorsalis flies in guava, mango, pomegranate, and cucurbits.",
    image: "sticky-trap",
    tags: ["Barrix", "Pheromone Trap", "Organic Safe"],
    in_stock: 1,
    stock_quantity: 50,
    low_stock_threshold: 15
  },
  {
    id: "tl08",
    name: "Barrix Yellow & Blue Insect Sticky Traps (Pack of 10)",
    category: "tools",
    price: 130.00,
    unit: "Pack of 10",
    rating: 4.8,
    reviews: 210,
    description: "Waterproof, non-drying hot melt glue coated yellow traps (for whiteflies/aphids) and blue traps (for thrips) for zero-chemical IPM pest suppression.",
    image: "sticky-trap",
    tags: ["IPM", "Sticky Sheet", "Zero Chemical"],
    in_stock: 1,
    stock_quantity: 80,
    low_stock_threshold: 20
  }
];

async function seedDatabase() {
  const isCloud = (process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com')) ||
                  process.env.DB_SSL === 'true' ||
                  Number(process.env.DB_PORT) === 25394;

  const dbConfig = {
    host:     process.env.DB_HOST || 'localhost',
    port:     Number(process.env.DB_PORT) || 3306,
    user:     process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mdagroconnect',
  };

  if (isCloud) {
    dbConfig.ssl = { rejectUnauthorized: false };
  }

  console.log(`🌾  Connecting to MySQL (${dbConfig.database} on ${dbConfig.host}:${dbConfig.port})...`);
  
  let pool;
  try {
    pool = mysql.createPool(dbConfig);
    const conn = await pool.getConnection();
    console.log(`✅  Connected to database (${dbConfig.database} on ${dbConfig.host}).`);

    // 1. Ensure table structure is up to date
    await conn.query(`
      CREATE TABLE IF NOT EXISTS products (
        id                  VARCHAR(10)    NOT NULL,
        name                VARCHAR(200)   NOT NULL,
        category            VARCHAR(20)    NOT NULL,
        price               DECIMAL(10,2)  NOT NULL,
        unit                VARCHAR(60)    NOT NULL,
        rating              DECIMAL(3,1)   NOT NULL DEFAULT 0.0,
        reviews             INT UNSIGNED   NOT NULL DEFAULT 0,
        description         TEXT           NOT NULL,
        image               VARCHAR(60)    NOT NULL,
        tags                TEXT           NOT NULL,
        in_stock            TINYINT(1)     NOT NULL DEFAULT 1,
        stock_quantity      INT UNSIGNED   NOT NULL DEFAULT 0,
        low_stock_threshold INT UNSIGNED   NOT NULL DEFAULT 10,
        created_at          TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    // 2. Insert or update all authentic products
    console.log(`📦  Upserting ${MD_AGRO_PRODUCTS.length} authentic products from Sonai price list...`);
    
    for (const p of MD_AGRO_PRODUCTS) {
      const tagsStr = JSON.stringify(p.tags);
      await conn.query(`
        INSERT INTO products 
          (id, name, category, price, unit, rating, reviews, description, image, tags, in_stock, stock_quantity, low_stock_threshold)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          category = VALUES(category),
          price = VALUES(price),
          unit = VALUES(unit),
          rating = VALUES(rating),
          reviews = VALUES(reviews),
          description = VALUES(description),
          image = VALUES(image),
          tags = VALUES(tags),
          in_stock = VALUES(in_stock),
          stock_quantity = VALUES(stock_quantity),
          low_stock_threshold = VALUES(low_stock_threshold)
      `, [
        p.id, p.name, p.category, p.price, p.unit, p.rating, p.reviews,
        p.description, p.image, tagsStr, p.in_stock, p.stock_quantity, p.low_stock_threshold
      ]);
    }

    const [countRows] = await conn.query('SELECT COUNT(*) as count FROM products');
    console.log(`🎉  Total products in database: ${countRows[0].count}`);

    // Seed initial inventory log audit trail
    console.log('📝  Creating initial inventory audit log entries...');
    await conn.query(`DELETE FROM inventory_logs WHERE reference_id = 'OPENING-STOCK'`);
    for (const p of MD_AGRO_PRODUCTS) {
      await conn.query(`
        INSERT INTO inventory_logs 
          (product_id, change_type, quantity_change, quantity_after, reference_id, note, created_by)
        VALUES (?, 'restock', ?, ?, 'OPENING-STOCK', 'Initial physical stock verification from Sonai price list', 'system')
      `, [p.id, p.stock_quantity, p.stock_quantity]);
    }
    console.log('✅  Inventory audit log created.');

    conn.release();

    // 3. Also synchronize local catalog_data.js and memory fallback so local and render match
    const catalogPath = path.join(__dirname, 'catalog_data.js');
    const catalogContent = `// backend/catalog_data.js\n// Official M D AGRO SERVICES Product Master Catalog\nmodule.exports = ${JSON.stringify(MD_AGRO_PRODUCTS, null, 2)};\n`;
    fs.writeFileSync(catalogPath, catalogContent, 'utf8');
    console.log('✅  Updated backend/catalog_data.js with authentic products.');

    console.log('\n🌟  M D AGRO SERVICES product catalog is now active!');
  } catch (err) {
    console.error('❌  Error seeding database:', err.message);
  }
}

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

module.exports = { MD_AGRO_PRODUCTS, seedDatabase };
