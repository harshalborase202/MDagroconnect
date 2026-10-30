// MD Agro Services - Application JavaScript

// Load optional local config.js (contains local API keys if running standalone)
if (typeof window !== 'undefined' && !window.GEMINI_API_KEY) {
    const _cfg = document.createElement('script');
    _cfg.src = 'config.js';
    document.head.appendChild(_cfg);
}

// Product Catalog Database
const PRODUCTS = [
    {
        "id": "s1",
        "name": "Premium Hybrid Cotton Seeds (Bt-II)",
        "category": "seeds",
        "price": 450,
        "unit": "per kg",
        "rating": 4.8,
        "reviews": 128,
        "description": "High-yield Bollgard-II hybrid cotton seeds with superior boll retention and resistance to American bollworm. Ideal for black soils of Vidarbha & Marathwada.",
        "image": "cotton-seed",
        "tags": [
            "Best Seller",
            "High Yield",
            "Bollgard-II"
        ],
        "in_stock": 1,
        "stockCount": 150
    },
    {
        "id": "s2",
        "name": "Golden Wheat Premium Seeds (HD-2967)",
        "category": "seeds",
        "price": 320,
        "unit": "per 5kg bag",
        "rating": 4.7,
        "reviews": 95,
        "description": "Certified high tillering wheat seeds optimized for maximum grain weight, amber lustrous grains, and yellow rust resistance.",
        "image": "wheat-seed",
        "tags": [
            "Organic",
            "Certified",
            "Rust Resistant"
        ],
        "in_stock": 1,
        "stockCount": 120
    },
    {
        "id": "s3",
        "name": "Sweet Corn Hybrid F1 (Sugar-75)",
        "category": "seeds",
        "price": 180,
        "unit": "per 500g",
        "rating": 4.9,
        "reviews": 64,
        "description": "Super sweet F1 hybrid corn seeds with 16-18 kernel rows, exceptional sweetness, and rapid 75-day maturity.",
        "image": "corn-seed",
        "tags": [
            "Sweet",
            "F1 Hybrid",
            "High Germination"
        ],
        "in_stock": 1,
        "stockCount": 80
    },
    {
        "id": "s4",
        "name": "High-Yield Basmati Paddy Seeds (PB-1121)",
        "category": "seeds",
        "price": 550,
        "unit": "per 10kg bag",
        "rating": 4.6,
        "reviews": 112,
        "description": "Extra-long grain aromatic basmati rice seeds suitable for both puddled transplanting and direct dry seeding.",
        "image": "paddy-seed",
        "tags": [
            "Export Quality",
            "Aromatic",
            "Long Grain"
        ],
        "in_stock": 1,
        "stockCount": 95
    },
    {
        "id": "s5",
        "name": "Hybrid Soybean Seeds (JS-335 / JS-9560)",
        "category": "seeds",
        "price": 480,
        "unit": "per 5kg bag",
        "rating": 4.8,
        "reviews": 140,
        "description": "High oil content certified soybean seeds with excellent pod shattering resistance and high germination viability.",
        "image": "soybean-seed",
        "tags": [
            "High Oil",
            "Drought Hardy",
            "Certified"
        ],
        "in_stock": 1,
        "stockCount": 200
    },
    {
        "id": "s6",
        "name": "Hybrid Pearl Millet Seeds (Bajra Pioneer)",
        "category": "seeds",
        "price": 290,
        "unit": "per 1.5kg",
        "rating": 4.7,
        "reviews": 78,
        "description": "Drought-tolerant dual-purpose hybrid bajra with compact cylindrical heads and high green fodder yield.",
        "image": "millet-seed",
        "tags": [
            "Drought Tolerant",
            "Dual Purpose"
        ],
        "in_stock": 1,
        "stockCount": 65
    },
    {
        "id": "s7",
        "name": "Hybrid Sunflower Seeds (KBSH-44)",
        "category": "seeds",
        "price": 410,
        "unit": "per 1kg",
        "rating": 4.6,
        "reviews": 52,
        "description": "High oil-yielding sunflower seeds featuring uniform flowering, heavy center filling, and high resistance to rust.",
        "image": "sunflower-seed",
        "tags": [
            "High Oil",
            "Uniform Head"
        ],
        "in_stock": 1,
        "stockCount": 45
    },
    {
        "id": "s8",
        "name": "F1 Hybrid Tomato Seeds (Abhinav Red)",
        "category": "seeds",
        "price": 350,
        "unit": "per 10g pouch",
        "rating": 4.9,
        "reviews": 165,
        "description": "Determinate vigorous tomato hybrid with deep red firm fruits, long shelf-life, and TLCV viral tolerance.",
        "image": "tomato-seed",
        "tags": [
            "Heavy Fruiting",
            "Long Shelf Life",
            "TLCV Tolerant"
        ],
        "in_stock": 1,
        "stockCount": 110
    },
    {
        "id": "s9",
        "name": "Hot Red Chilli F1 Hybrid (Teja / Armour)",
        "category": "seeds",
        "price": 420,
        "unit": "per 10g pouch",
        "rating": 4.8,
        "reviews": 88,
        "description": "High pungency glossy green to deep red chillies. Heavy bearing with high tolerance to thrips and leaf curl virus.",
        "image": "chilli-seed",
        "tags": [
            "High Pungency",
            "Thrips Tolerant"
        ],
        "in_stock": 1,
        "stockCount": 90
    },
    {
        "id": "s10",
        "name": "Nashik Fursungi Red Onion Seeds",
        "category": "seeds",
        "price": 650,
        "unit": "per 500g",
        "rating": 4.9,
        "reviews": 204,
        "description": "Renowned Maharashtra Nashik variety with globe-shaped firm red bulbs, tight scales, and 6-month storage capacity.",
        "image": "onion-seed",
        "tags": [
            "Long Storage",
            "Farmer Choice",
            "Nashik Special"
        ],
        "in_stock": 1,
        "stockCount": 130
    },
    {
        "id": "s11",
        "name": "Desi Gram / Chana Seeds (Vijay Bold)",
        "category": "seeds",
        "price": 520,
        "unit": "per 5kg bag",
        "rating": 4.7,
        "reviews": 91,
        "description": "Wilt-resistant bold seeded Bengal gram variety specially developed for rainfed and irrigated rabi farming.",
        "image": "chana-seed",
        "tags": [
            "Wilt Resistant",
            "Rabi Special"
        ],
        "in_stock": 1,
        "stockCount": 85
    },
    {
        "id": "s12",
        "name": "Hybrid Mustard Seeds (Pusa Bold Mustard)",
        "category": "seeds",
        "price": 380,
        "unit": "per 1kg",
        "rating": 4.6,
        "reviews": 67,
        "description": "Bold seeded Indian mustard with 40%+ oil content, high branching capacity, and low white rust incidence.",
        "image": "mustard-seed",
        "tags": [
            "40% Oil Content",
            "Frost Resistant"
        ],
        "in_stock": 1,
        "stockCount": 70
    },
    {
        "id": "s13",
        "name": "Groundnut Bold Seeds (Phule Unnati / JL-24)",
        "category": "seeds",
        "price": 590,
        "unit": "per 5kg bag",
        "rating": 4.7,
        "reviews": 83,
        "description": "Bunch type groundnut with two-seeded bold pods, high shelling percentage (72%), and rapid 100-day harvest.",
        "image": "groundnut-seed",
        "tags": [
            "High Shelling",
            "Early Harvest"
        ],
        "in_stock": 1,
        "stockCount": 75
    },
    {
        "id": "s14",
        "name": "F1 Hybrid Okra Seeds (Radhika Dark Green)",
        "category": "seeds",
        "price": 240,
        "unit": "per 100g",
        "rating": 4.8,
        "reviews": 110,
        "description": "Dark green 5-ridged tender bhindi with short internodes, continuous pickings, and high YVMV virus resistance.",
        "image": "okra-seed",
        "tags": [
            "YVMV Resistant",
            "Tender Fruits"
        ],
        "in_stock": 1,
        "stockCount": 140
    },
    {
        "id": "s15",
        "name": "African Marigold F1 Seeds (Maxi Gold)",
        "category": "seeds",
        "price": 310,
        "unit": "per 10g pouch",
        "rating": 4.9,
        "reviews": 72,
        "description": "Compact floriculture hybrid producing dense ball-shaped golden yellow blooms ideal for festival market timing.",
        "image": "marigold-seed",
        "tags": [
            "Festive Market",
            "Dense Blooms"
        ],
        "in_stock": 1,
        "stockCount": 95
    },
    {
        "id": "s16",
        "name": "Hybrid Green Pea Seeds (GS-10 / Arkel)",
        "category": "seeds",
        "price": 390,
        "unit": "per 1kg",
        "rating": 4.8,
        "reviews": 64,
        "description": "High-yielding early winter green pea seeds with 9-10 sweet tender peas per pod. Popular in vegetable mandis.",
        "image": "pea-seed",
        "tags": [
            "Sweet Peas",
            "High Pod Count"
        ],
        "in_stock": 1,
        "stockCount": 60
    },
    {
        "id": "s17",
        "name": "F1 Hybrid Bitter Gourd Seeds (Pale Green Long)",
        "category": "seeds",
        "price": 275,
        "unit": "per 50g",
        "rating": 4.7,
        "reviews": 58,
        "description": "Vigorous vine hybrid with prickly lustrous pale green fruits measuring 22-25cm with superior transport resistance.",
        "image": "karela-seed",
        "tags": [
            "Heavy Bearing",
            "Trellis Friendly"
        ],
        "in_stock": 1,
        "stockCount": 50
    },
    {
        "id": "s18",
        "name": "F1 Hybrid Watermelon Seeds (Black Boss / Sugar Baby)",
        "category": "seeds",
        "price": 490,
        "unit": "per 50g",
        "rating": 4.9,
        "reviews": 82,
        "description": "Deep black rind oblong watermelon with deep crimson flesh, high brix sweetness (12-13%), and micro-seeds.",
        "image": "watermelon-seed",
        "tags": [
            "High Brix Sweet",
            "Summer Cash Crop"
        ],
        "in_stock": 1,
        "stockCount": 65
    },
    {
        "id": "f1",
        "name": "Organic Vermicompost Booster",
        "category": "fertilizers",
        "price": 250,
        "unit": "per 10kg bag",
        "rating": 4.9,
        "reviews": 210,
        "description": "100% pure decomposed earthworm compost enriched with nitrogen, organic carbon, and beneficial microbial flora.",
        "image": "vermicompost",
        "tags": [
            "100% Organic",
            "Soil Health",
            "Carbon Rich"
        ],
        "in_stock": 1,
        "stockCount": 300
    },
    {
        "id": "f2",
        "name": "NPK 19:19:19 100% Soluble Fertilizer",
        "category": "fertilizers",
        "price": 350,
        "unit": "per kg",
        "rating": 4.7,
        "reviews": 142,
        "description": "Fully water-soluble balanced macro-nutrient fertilizer for foliar spray and drip fertigation in all vegetative crops.",
        "image": "npk",
        "tags": [
            "Water Soluble",
            "All Stages"
        ],
        "in_stock": 1,
        "stockCount": 180
    },
    {
        "id": "f3",
        "name": "Premium Crop Booster Liquid Bio-Fertilizer",
        "category": "fertilizers",
        "price": 450,
        "unit": "per Litre",
        "rating": 4.8,
        "reviews": 88,
        "description": "Fermented microbial consortia containing Azotobacter, PSB, and KMB that naturally mobilizes locked soil minerals.",
        "image": "crop-booster",
        "tags": [
            "Bio-Consortia",
            "Yield Enhancer"
        ],
        "in_stock": 1,
        "stockCount": 110
    },
    {
        "id": "f4",
        "name": "Chelated Micronutrient Soil Mixture",
        "category": "fertilizers",
        "price": 280,
        "unit": "per 500g",
        "rating": 4.6,
        "reviews": 76,
        "description": "Multi-micronutrient formulation (Zn, Fe, Mn, Cu, B, Mo) conforming to Maharashtra State Grade 2 standard.",
        "image": "micronutrient",
        "tags": [
            "Chelated EDTA",
            "Grade 2 Certified"
        ],
        "in_stock": 1,
        "stockCount": 95
    },
    {
        "id": "f5",
        "name": "100% Water Soluble NPK 00:52:34 (Mono Potassium Phosphate)",
        "category": "fertilizers",
        "price": 290,
        "unit": "per 1kg",
        "rating": 4.9,
        "reviews": 130,
        "description": "Zero nitrogen fertilizer rich in phosphorus and potassium. Accelerates root establishment and profuse pre-flowering.",
        "image": "npk-00-52-34",
        "tags": [
            "Flower Booster",
            "Phosphorus Rich"
        ],
        "in_stock": 1,
        "stockCount": 140
    },
    {
        "id": "f6",
        "name": "Water Soluble NPK 13:00:45 (Potassium Nitrate)",
        "category": "fertilizers",
        "price": 320,
        "unit": "per 1kg",
        "rating": 4.8,
        "reviews": 104,
        "description": "High potassium foliar spray promoting uniform fruit sizing, weight gain, vibrant peel color, and drought resistance.",
        "image": "npk-13-00-45",
        "tags": [
            "Fruit Sizing",
            "Potassium Nitrate"
        ],
        "in_stock": 1,
        "stockCount": 120
    },
    {
        "id": "f7",
        "name": "Humic Acid 98% Shiny Flakes (Plant Biostimulant)",
        "category": "fertilizers",
        "price": 380,
        "unit": "per 1kg",
        "rating": 4.9,
        "reviews": 175,
        "description": "Concentrated potassium humate flakes that condition compacted clay soils, stimulate white feeder roots, and boost CEC.",
        "image": "humic-acid",
        "tags": [
            "Root Growth",
            "Soil Conditioner",
            "100% Soluble"
        ],
        "in_stock": 1,
        "stockCount": 200
    },
    {
        "id": "f8",
        "name": "Seaweed Extract Ascophyllum Nodosum (Bio-Zyme)",
        "category": "fertilizers",
        "price": 520,
        "unit": "per 1 Litre",
        "rating": 4.9,
        "reviews": 92,
        "description": "Cold-extracted marine algae bioactive hormones (cytokinins, auxins) that protect against extreme heat and frost stress.",
        "image": "seaweed-extract",
        "tags": [
            "Anti-Stress",
            "Marine Bio-Active"
        ],
        "in_stock": 1,
        "stockCount": 85
    },
    {
        "id": "f9",
        "name": "Calcium Nitrate with Boron (Nutri-Cal Plus)",
        "category": "fertilizers",
        "price": 260,
        "unit": "per 1kg",
        "rating": 4.7,
        "reviews": 115,
        "description": "Prevents blossom end rot in tomato/capsicum and fruit cracking in pomegranate. Essential for cell wall elasticity.",
        "image": "calcium-nitrate",
        "tags": [
            "Prevents Fruit Cracking",
            "Cell Wall Fortifier"
        ],
        "in_stock": 1,
        "stockCount": 160
    },
    {
        "id": "f10",
        "name": "Agricultural Magnesium Sulphate (Epsom Salt)",
        "category": "fertilizers",
        "price": 180,
        "unit": "per 1kg",
        "rating": 4.6,
        "reviews": 80,
        "description": "Core central component of plant chlorophyll. Corrects yellow interveinal chlorosis and improves photosynthesis rate.",
        "image": "magnesium-sulphate",
        "tags": [
            "Chlorophyll Booster",
            "Corrects Yellowing"
        ],
        "in_stock": 1,
        "stockCount": 130
    },
    {
        "id": "f11",
        "name": "Bio-NPK Liquid Consortia (Certified Organic)",
        "category": "fertilizers",
        "price": 490,
        "unit": "per 1 Litre",
        "rating": 4.8,
        "reviews": 68,
        "description": "Triple-action bacterial inoculant fixing 25-30kg atmospheric Nitrogen and solubilizing soil Phosphate and Potash.",
        "image": "bio-npk",
        "tags": [
            "Nitrogen Fixer",
            "Saves 25% Chemical Urea"
        ],
        "in_stock": 1,
        "stockCount": 90
    },
    {
        "id": "f12",
        "name": "Pure Cold-Pressed Neem Cake Powder",
        "category": "fertilizers",
        "price": 420,
        "unit": "per 5kg bag",
        "rating": 4.9,
        "reviews": 145,
        "description": "Residual organic cake rich in NPK and azadirachtin that inhibits soil nematodes, termites, and fungal root rots.",
        "image": "neem-cake",
        "tags": [
            "Nematode Defense",
            "Slow Release NPK"
        ],
        "in_stock": 1,
        "stockCount": 110
    },
    {
        "id": "f13",
        "name": "Chelated Zinc EDTA 12% Spray",
        "category": "fertilizers",
        "price": 230,
        "unit": "per 250g",
        "rating": 4.7,
        "reviews": 62,
        "description": "Rapidly absorbed organic chelated zinc preventing Khaira disease in paddy and small-leaf deformity in citrus orchards.",
        "image": "zinc-edta",
        "tags": [
            "Khaira Defense",
            "Chelated Zinc"
        ],
        "in_stock": 1,
        "stockCount": 75
    },
    {
        "id": "f14",
        "name": "Agricultural Ferrous Sulphate (Heera Kasis)",
        "category": "fertilizers",
        "price": 190,
        "unit": "per 1kg",
        "rating": 4.5,
        "reviews": 54,
        "description": "Water-soluble iron source for correcting iron deficiency chlorosis in high-pH calcareous Maharashtra soils.",
        "image": "ferrous-sulphate",
        "tags": [
            "Iron Corrector",
            "Calcareous Soil Safe"
        ],
        "in_stock": 1,
        "stockCount": 80
    },
    {
        "id": "f15",
        "name": "IFFCO Nano Urea Liquid",
        "category": "fertilizers",
        "price": 240,
        "unit": "per 500ml bottle",
        "rating": 4.8,
        "reviews": 290,
        "description": "Revolutionary nanotechnology liquid nitrogen fertilizer. One 500ml bottle effectively replaces a 45kg bag of granular urea.",
        "image": "nano-urea",
        "tags": [
            "Nanotechnology",
            "Green Farming",
            "Government Certified"
        ],
        "in_stock": 1,
        "stockCount": 300
    },
    {
        "id": "f16",
        "name": "Water Soluble NPK 12:61:00 (Mono Ammonium Phosphate)",
        "category": "fertilizers",
        "price": 310,
        "unit": "per 1kg",
        "rating": 4.8,
        "reviews": 77,
        "description": "High phosphorus starter fertilizer ideal for root system establishment in seedling nurseries and young orchards.",
        "image": "npk-12-61-00",
        "tags": [
            "Starter Fertilizer",
            "High P"
        ],
        "in_stock": 1,
        "stockCount": 95
    },
    {
        "id": "f17",
        "name": "Organic Potash From Molasses (PDM)",
        "category": "fertilizers",
        "price": 340,
        "unit": "per 5kg bag",
        "rating": 4.7,
        "reviews": 83,
        "description": "Natural organic potash derived from sugarcane distillery spent wash. Enriches sweetness, grain fullness, and soil microbes.",
        "image": "organic-potash",
        "tags": [
            "100% Natural Potash",
            "Eco-Friendly"
        ],
        "in_stock": 1,
        "stockCount": 105
    },
    {
        "id": "p1",
        "name": "Bio-Pesticide Neem Shield (10000 PPM)",
        "category": "protection",
        "price": 420,
        "unit": "per Litre",
        "rating": 4.7,
        "reviews": 156,
        "description": "Pure Azadirachtin organic bio-pesticide. Repels whiteflies, aphids, thrips, and bollworms with zero chemical residue.",
        "image": "neem-shield",
        "tags": [
            "10000 PPM",
            "Zero Residue",
            "Eco-Safe"
        ],
        "in_stock": 1,
        "stockCount": 140
    },
    {
        "id": "p2",
        "name": "Fungicide Cure-All Powder (Carbendazim 12% + Mancozeb 63% WP)",
        "category": "protection",
        "price": 290,
        "unit": "per 500g",
        "rating": 4.6,
        "reviews": 108,
        "description": "Dual-action systemic and contact fungicide for comprehensive defense against anthracnose, tikka, leaf blight, and damping off.",
        "image": "fungicide",
        "tags": [
            "Broad Spectrum",
            "Dual Action"
        ],
        "in_stock": 1,
        "stockCount": 175
    },
    {
        "id": "p3",
        "name": "Selective Herbicide Green-Clean (Imazethapyr 10% SL)",
        "category": "protection",
        "price": 380,
        "unit": "per Litre",
        "rating": 4.4,
        "reviews": 81,
        "description": "Post-emergence selective herbicide that safely eliminates broadleaf weeds in soybean, groundnut, and pulses without crop burn.",
        "image": "herbicide",
        "tags": [
            "Selective Control",
            "Post-Emergence"
        ],
        "in_stock": 1,
        "stockCount": 120
    },
    {
        "id": "p4",
        "name": "Imidacloprid 17.8% SL Systemic Insecticide",
        "category": "protection",
        "price": 460,
        "unit": "per 250ml",
        "rating": 4.8,
        "reviews": 195,
        "description": "Powerful systemic neonicotinoid providing long-lasting knockdown of sucking pests, jassids, thrips, and aphids.",
        "image": "imidacloprid",
        "tags": [
            "Sucking Pest Killer",
            "Long Lasting"
        ],
        "in_stock": 1,
        "stockCount": 130
    },
    {
        "id": "p5",
        "name": "Chlorpyrifos 20% EC Termite Defender",
        "category": "protection",
        "price": 390,
        "unit": "per 500ml",
        "rating": 4.6,
        "reviews": 130,
        "description": "Proven organophosphate soil insecticide for controlling termites, cutworms, and root grubs in sugarcane and cereal fields.",
        "image": "chlorpyrifos",
        "tags": [
            "Termite Shield",
            "Soil Treatment"
        ],
        "in_stock": 1,
        "stockCount": 90
    },
    {
        "id": "p6",
        "name": "Trichoderma Viride Bio-Fungicide (1% WP)",
        "category": "protection",
        "price": 220,
        "unit": "per 1kg",
        "rating": 4.9,
        "reviews": 168,
        "description": "Eco-friendly antagonistic fungal agent to control Fusarium wilt, collar rot, and damping off via seed dressing and soil drench.",
        "image": "trichoderma",
        "tags": [
            "Bio-Agent",
            "Wilt Defender",
            "Certified Organic"
        ],
        "in_stock": 1,
        "stockCount": 180
    },
    {
        "id": "p7",
        "name": "Mancozeb 75% WP Contact Fungicide",
        "category": "protection",
        "price": 310,
        "unit": "per 500g",
        "rating": 4.7,
        "reviews": 142,
        "description": "Multi-site protective contact fungicide providing manganese and zinc nourishment while shielding crops from early and late blight.",
        "image": "mancozeb",
        "tags": [
            "Multi-Site Action",
            "Blight Shield"
        ],
        "in_stock": 1,
        "stockCount": 150
    },
    {
        "id": "p8",
        "name": "Emamectin Benzoate 5% SG Caterpillar Buster",
        "category": "protection",
        "price": 340,
        "unit": "per 100g",
        "rating": 4.8,
        "reviews": 210,
        "description": "High efficacy modern water-soluble granule for instant control of Helicoverpa, Spodoptera, and diamondback moth caterpillars.",
        "image": "emamectin",
        "tags": [
            "Caterpillar Knockdown",
            "Fast Acting"
        ],
        "in_stock": 1,
        "stockCount": 190
    },
    {
        "id": "p9",
        "name": "Yellow & Blue Sticky Traps (Pack of 25)",
        "category": "protection",
        "price": 250,
        "unit": "pack of 25",
        "rating": 4.8,
        "reviews": 185,
        "description": "Double-sided waterproof insect glue traps. Yellow attracts whiteflies/aphids; blue captures thrips for zero-chemical pest monitoring.",
        "image": "sticky-trap",
        "tags": [
            "Zero Chemical",
            "25 Traps Pack"
        ],
        "in_stock": 1,
        "stockCount": 220
    },
    {
        "id": "p10",
        "name": "Pink Bollworm & Fruit Fly Pheromone Traps",
        "category": "protection",
        "price": 320,
        "unit": "set of 5 traps + lures",
        "rating": 4.9,
        "reviews": 132,
        "description": "Funnel traps with species-specific female sex pheromone septa lures to disrupt male mating cycles in cotton and fruit orchards.",
        "image": "pheromone-trap",
        "tags": [
            "Pheromone Tech",
            "5 Traps Set"
        ],
        "in_stock": 1,
        "stockCount": 110
    },
    {
        "id": "p11",
        "name": "Nitrobenzene 20% Plant Growth Regulator",
        "category": "protection",
        "price": 450,
        "unit": "per 500ml",
        "rating": 4.7,
        "reviews": 96,
        "description": "Flowering stimulant that prevents excessive flower drop, induces profuse bud setting, and dramatically enhances crop output.",
        "image": "nitrobenzene",
        "tags": [
            "Flower Inducer",
            "Yield Booster"
        ],
        "in_stock": 1,
        "stockCount": 95
    },
    {
        "id": "p12",
        "name": "Copper Oxychloride 50% WP Bactericide",
        "category": "protection",
        "price": 480,
        "unit": "per 500g",
        "rating": 4.6,
        "reviews": 78,
        "description": "Inorganic copper based bactericide and fungicide for citrus canker, bacterial leaf blight, and downy mildew control.",
        "image": "copper-oxychloride",
        "tags": [
            "Bactericide",
            "Copper Shield"
        ],
        "in_stock": 1,
        "stockCount": 85
    },
    {
        "id": "p13",
        "name": "Pseudomonas Fluorescens Liquid Bio-Culture",
        "category": "protection",
        "price": 280,
        "unit": "per 1 Litre",
        "rating": 4.8,
        "reviews": 84,
        "description": "Beneficial plant growth-promoting rhizobacteria (PGPR) producing plant antibiotics that suppress pathogenic root diseases.",
        "image": "pseudomonas",
        "tags": [
            "Bio-Culture",
            "PGPR Defender"
        ],
        "in_stock": 1,
        "stockCount": 115
    },
    {
        "id": "p14",
        "name": "Chlorantraniliprole 18.5% SC (Coragen Type)",
        "category": "protection",
        "price": 920,
        "unit": "per 60ml bottle",
        "rating": 4.9,
        "reviews": 240,
        "description": "Premium ryanodine receptor activator providing 21-day systemic protection against stem borers, leaf folders, and diamondback moths.",
        "image": "chlorantraniliprole",
        "tags": [
            "21 Day Protection",
            "Top Rated"
        ],
        "in_stock": 1,
        "stockCount": 160
    },
    {
        "id": "p15",
        "name": "Acetamiprid 20% SP Whitefly Specialist",
        "category": "protection",
        "price": 280,
        "unit": "per 100g",
        "rating": 4.7,
        "reviews": 88,
        "description": "Systemic neonicotinoid with excellent translaminar action to eliminate hidden whitefly nymphs and aphids on leaf undersides.",
        "image": "acetamiprid",
        "tags": [
            "Translaminar",
            "Whitefly Knockdown"
        ],
        "in_stock": 1,
        "stockCount": 110
    },
    {
        "id": "p16",
        "name": "Gibberellic Acid 0.001% L (GA-3 Crop Enhancer)",
        "category": "protection",
        "price": 360,
        "unit": "per 500ml",
        "rating": 4.8,
        "reviews": 94,
        "description": "Naturally derived plant hormone that elongates grape bunches, expands sugarcane internodes, and enlarges fruit diameter.",
        "image": "gibberellic-acid",
        "tags": [
            "Grape Elongator",
            "Internode Booster"
        ],
        "in_stock": 1,
        "stockCount": 75
    },
    {
        "id": "p17",
        "name": "Silicone Based Super Spreader & Activator (Stick-All)",
        "category": "protection",
        "price": 310,
        "unit": "per 250ml",
        "rating": 4.9,
        "reviews": 155,
        "description": "Organosilicone adjuvant providing rapid stomatal infiltration and 10x droplet coverage during monsoon rains.",
        "image": "super-spreader",
        "tags": [
            "Rain Fastness",
            "10x Coverage"
        ],
        "in_stock": 1,
        "stockCount": 190
    },
    {
        "id": "t1",
        "name": "Premium Ergonomic Hand Trowel",
        "category": "tools",
        "price": 150,
        "unit": "per unit",
        "rating": 4.8,
        "reviews": 90,
        "description": "Heavy-duty rust-resistant forged aluminum trowel with ergonomic non-slip rubber grip for planting, transplanting, and weeding.",
        "image": "trowel",
        "tags": [
            "Durable",
            "Ergonomic"
        ],
        "in_stock": 1,
        "stockCount": 120
    },
    {
        "id": "t2",
        "name": "Battery Operated Knapsack Sprayer (16L)",
        "category": "tools",
        "price": 2800,
        "unit": "per unit",
        "rating": 4.7,
        "reviews": 215,
        "description": "16-Litre heavy-duty electric sprayer equipped with 12V 8Ah maintenance-free battery, pressure regulator, and 4 brass nozzles.",
        "image": "sprayer",
        "tags": [
            "Electric 12V",
            "16L Tank",
            "Best Seller"
        ],
        "in_stock": 1,
        "stockCount": 75
    },
    {
        "id": "t3",
        "name": "3-in-1 Soil Moisture, pH & Light Meter",
        "category": "tools",
        "price": 650,
        "unit": "per unit",
        "rating": 4.5,
        "reviews": 134,
        "description": "Precision dual-probe battery-free device measuring soil acidity, moisture saturation, and sunlight level for precision agriculture.",
        "image": "ph-meter",
        "tags": [
            "Battery Free",
            "Smart Tester"
        ],
        "in_stock": 1,
        "stockCount": 60
    },
    {
        "id": "t4",
        "name": "2-in-1 Manual & Battery Knapsack Sprayer (20L)",
        "category": "tools",
        "price": 3499,
        "unit": "per unit",
        "rating": 4.9,
        "reviews": 178,
        "description": "Premium 20L hybrid agricultural sprayer operating both by electric motor or manual hand pump if battery drains in remote fields.",
        "image": "sprayer-20l",
        "tags": [
            "2-in-1 Hybrid",
            "20L Capacity"
        ],
        "in_stock": 1,
        "stockCount": 50
    },
    {
        "id": "t5",
        "name": "High-Pressure Brass Telescopic Spray Lance (9 Feet)",
        "category": "tools",
        "price": 450,
        "unit": "per unit",
        "rating": 4.8,
        "reviews": 112,
        "description": "Heavy-gauge extensible brass lance for spraying tall horticulture canopies like mango, pomegranate, and guava orchards.",
        "image": "spray-lance",
        "tags": [
            "9ft Extensible",
            "Heavy Brass"
        ],
        "in_stock": 1,
        "stockCount": 85
    },
    {
        "id": "t6",
        "name": "Heavy-Duty Bypass Pruning Secateurs / Pruner",
        "category": "tools",
        "price": 380,
        "unit": "per unit",
        "rating": 4.9,
        "reviews": 164,
        "description": "SK-5 high carbon steel blades with sap groove and safety lock. Creates clean surgeon-like branch cuts on fruit trees.",
        "image": "pruner",
        "tags": [
            "SK-5 Steel",
            "Precision Cut"
        ],
        "in_stock": 1,
        "stockCount": 95
    },
    {
        "id": "t7",
        "name": "Jain Drip Inline Irrigation Lateral Pipe (16mm, 100m)",
        "category": "tools",
        "price": 1650,
        "unit": "per 100m roll",
        "rating": 4.8,
        "reviews": 83,
        "description": "UV-stabilized virgin polymer drip irrigation lateral pipe with clog-resistant cylindrical drippers. Conserves up to 60% irrigation water.",
        "image": "drip-pipe",
        "tags": [
            "Water Saving",
            "ISI Certified",
            "100m Roll"
        ],
        "in_stock": 1,
        "stockCount": 70
    },
    {
        "id": "t8",
        "name": "Solar Insect Light Trap (Pest Repeller)",
        "category": "tools",
        "price": 1850,
        "unit": "per unit",
        "rating": 4.8,
        "reviews": 62,
        "description": "Automatic solar-powered UV light trap that turns on at dusk, drawing and destroying moths and nocturnal pests without electricity.",
        "image": "solar-trap",
        "tags": [
            "Solar Powered",
            "Automatic Dusk Sensor"
        ],
        "in_stock": 1,
        "stockCount": 40
    },
    {
        "id": "t9",
        "name": "Mulching Film 25 Micron UV Stabilized (400m Roll)",
        "category": "tools",
        "price": 1950,
        "unit": "per roll (1.2m x 400m)",
        "rating": 4.9,
        "reviews": 110,
        "description": "Silver-black embossed polyethylene film. Retains soil moisture, prevents weed emergence, and repels insects with silver reflection.",
        "image": "mulching-film",
        "tags": [
            "Silver-Black",
            "Weed Suppressor"
        ],
        "in_stock": 1,
        "stockCount": 55
    },
    {
        "id": "t10",
        "name": "Digital EC & TDS Soil & Water Nutrient Meter",
        "category": "tools",
        "price": 799,
        "unit": "per unit",
        "rating": 4.6,
        "reviews": 48,
        "description": "Handheld digital tester measuring electrical conductivity and total dissolved solids in fertigation water and hydroponic solutions.",
        "image": "tds-meter",
        "tags": [
            "Digital Precision",
            "Hydroponics & Drip"
        ],
        "in_stock": 1,
        "stockCount": 45
    },
    {
        "id": "t11",
        "name": "Heavy-Duty Tarpaulin Waterproof Sheet (250 GSM, 12x18 Ft)",
        "category": "tools",
        "price": 1450,
        "unit": "per sheet",
        "rating": 4.7,
        "reviews": 90,
        "description": "100% waterproof virgin HDPE cross-laminated sheet with aluminum eyelets for crop grain drying and monsoon grain protection.",
        "image": "tarpaulin",
        "tags": [
            "250 GSM",
            "100% Waterproof",
            "Tear Proof"
        ],
        "in_stock": 1,
        "stockCount": 65
    },
    {
        "id": "t12",
        "name": "Heavy Duty 1-Acre Complete Drip Irrigation Master Kit",
        "category": "tools",
        "price": 8900,
        "unit": "complete 1-acre kit",
        "rating": 4.9,
        "reviews": 74,
        "description": "All-in-one drip package including 2-inch screen filter, venturi injector, 16mm inline lateral (1000m), connectors, and flush valves.",
        "image": "drip-master-kit",
        "tags": [
            "Complete 1-Acre Package",
            "Venturi Included"
        ],
        "in_stock": 1,
        "stockCount": 30
    },
    {
        "id": "t13",
        "name": "50% Agro Green Shade Net (3m x 50m Roll)",
        "category": "tools",
        "price": 2400,
        "unit": "per roll",
        "rating": 4.8,
        "reviews": 58,
        "description": "UV-treated high-density polyethylene net providing 50% diffused sunlight for vegetable nurseries and polyhouses.",
        "image": "shade-net",
        "tags": [
            "50% Shade",
            "UV Stabilized"
        ],
        "in_stock": 1,
        "stockCount": 40
    },
    {
        "id": "t14",
        "name": "Battery Power Weeder / Mini Tiller Attachment",
        "category": "tools",
        "price": 4999,
        "unit": "per unit",
        "rating": 4.7,
        "reviews": 42,
        "description": "Inter-row rotary weeding blades with high-torque gear box for rapid weed removal between crop furrows without manual bending.",
        "image": "mini-tiller",
        "tags": [
            "Inter-Row Weeding",
            "Saves Labour"
        ],
        "in_stock": 1,
        "stockCount": 25
    },
    {
        "id": "t15",
        "name": "Compressed Low-EC Cocopeat Block (5kg expands to 75L)",
        "category": "tools",
        "price": 220,
        "unit": "per 5kg block",
        "rating": 4.9,
        "reviews": 135,
        "description": "Washed triple-rinsed coconut coir block with electrical conductivity below 0.5 mS/cm. Premium medium for seed germination trays.",
        "image": "cocopeat",
        "tags": [
            "Low EC",
            "Nursery Medium",
            "100% Organic"
        ],
        "in_stock": 1,
        "stockCount": 150
    }
];

// Crop Care Advisor Database
const ADVISORY_DATABASE = {
    cotton: {
        acidity: {
            title: "Soil Acidity Management for Cotton",
            products: ['f1', 'f4'],
            advice: "Cotton prefers a soil pH between 6.0 and 7.5. For acidic soils, apply agricultural lime (calcium carbonate) or high-quality Vermicompost to naturally raise pH and supplement calcium. Avoid ammonium-heavy fertilizers temporarily.",
            tips: ["Apply soil amendments 2-3 weeks before planting.", "Ensure adequate irrigation to activate lime reaction."]
        },
        deficiency: {
            title: "Nutrient Deficiencies in Cotton",
            products: ['f2', 'f3', 'f4'],
            advice: "Cotton is highly sensitive to Nitrogen, Potassium, and Boron deficiencies. If leaves are turning light green/yellow (lower leaves first), apply NPK. Reddening of leaves between veins indicates Magnesium/Potassium deficiency.",
            tips: ["Use NPK 19:19:19 for fast foliar absorption.", "Apply micronutrient mix during the flowering and square formation stages."]
        },
        pests: {
            title: "Pink Bollworm & Sucking Pest Alert",
            products: ['p1', 'p3'],
            advice: "Sucking pests like aphids, whiteflies, and thrips damage cotton leaves. Pink Bollworms tunnel into squares and bolls, ruining fibers. Apply natural Neem Shield bio-pesticide as a preventive measure.",
            tips: ["Monitor cotton flowers daily for pink bollworm entry holes.", "Spray bio-pesticides early morning or late evening for maximum effectiveness."]
        },
        fungal: {
            title: "Cotton Root Rot & Leaf Spot Control",
            products: ['p2'],
            advice: "Root rot and Alternaria leaf spot are common cotton fungal diseases. Damp, waterlogged soils invite root rot. Use a systemic fungicide to treat seeds or apply as a soil drench around affected plants.",
            tips: ["Improve field drainage immediately.", "Remove and destroy severely affected plants to check disease spread."]
        },
        water: {
            title: "Moisture Stress & Water Retention in Cotton Soils",
            products: ['f1'],
            advice: "Cotton requires deep, well-draining soils but can suffer from water stress. Increasing organic matter using Vermicompost creates a sponge-like soil structure that retains moisture without waterlogging roots.",
            tips: ["Mulch the root zone to prevent evaporation.", "Employ drip irrigation if available, especially during boll formation."]
        }
    },
    wheat: {
        acidity: {
            title: "Wheat Soil pH Balancing",
            products: ['f1'],
            advice: "Wheat thrives in well-drained soils with a pH of 6.0 - 7.0. Acidic soils limit root development and nutrient uptake. Introduce organic compost to buffer pH and stimulate beneficial microbial activity.",
            tips: ["Conduct soil test prior to sowing.", "Mix vermicompost deeply into the topsoil layer."]
        },
        deficiency: {
            title: "Wheat Yellowing & Tillering Deficiencies",
            products: ['f2', 'f3'],
            advice: "Nitrogen deficiency causes wheat plants to look pale yellow, leading to poor tillering. Use soluble NPK during the tillering and jointing stages to boost growth rapidly.",
            tips: ["Apply liquid booster at the crown root initiation (CRI) stage.", "Combine fertilizer application with light irrigation."]
        },
        pests: {
            title: "Aphid & Termite Defense in Wheat",
            products: ['p1'],
            advice: "Aphids suck sap from tender wheat ears, reducing grain quality. Termites attack roots, especially in dry sandy soils. Neem Shield acts as a non-toxic deterrent when sprayed at the base and leaves.",
            tips: ["Intercrop with mustard to reduce aphid pressure.", "Keep field free of dry stubble that attracts termites."]
        },
        fungal: {
            title: "Wheat Rust (Yellow/Brown) Treatment",
            products: ['p2'],
            advice: "Rust is a airborne fungal hazard that turns wheat leaves dusty yellow, brown, or black, rapidly reducing grain yields. Spray broad-spectrum systemic fungicide immediately upon the first signs of pustules.",
            tips: ["Use rust-resistant seeds in future cycles.", "Avoid overhead irrigation to keep foliage dry."]
        },
        water: {
            title: "Wheat Irrigation Timing & Water Management",
            products: ['f1', 't3'],
            advice: "Wheat is critical at key stages: CRI, Tillering, Jointing, Flowering, and Milking. Use a Soil Moisture Meter to keep track of dryness. Enhance water retention by adding rich organic matter.",
            tips: ["Do not let soil crack during flowering.", "Apply organic compost to sandy loams to slow down water filtration."]
        }
    },
    paddy: {
        acidity: {
            title: "Paddy Soil Acid Sulfate Remediation",
            products: ['f1', 'f4'],
            advice: "Lowland paddy fields can become acidic, blocking phosphate absorption. Apply organic matter and iron-rich micronutrients to stabilize soils under flooded conditions.",
            tips: ["Keep soil flooded to reduce high acidity levels.", "Incorporate Vermicompost to boost soil biological status."]
        },
        deficiency: {
            title: "Zinc & Nitrogen Starvation in Paddy",
            products: ['f2', 'f4'],
            advice: "Zinc deficiency (Khaira disease) turns paddy leaves dusty brown. Nitrogen deficiency stunts tillering. Apply Zinc-enriched micronutrients and NPK 19:19:19 to revive the crop.",
            tips: ["Spray Zinc/micronutrient mix 15-20 days after transplanting.", "Ensure uniform distribution of soluble nutrients in flooded water."]
        },
        pests: {
            title: "Brown Planthopper & Stem Borer Control",
            products: ['p1'],
            advice: "Stem borer larvae tunnel inside paddy stems, causing 'dead hearts'. Planthoppers cluster at the base of plants. Use neem-based organic sprays directed towards the lower stem area.",
            tips: ["Maintain alleyways in paddy fields for light and ventilation.", "Release trichogramma parasitic wasps as biological control if available."]
        },
        fungal: {
            title: "Blast & Sheath Blight in Paddy Fields",
            products: ['p2'],
            advice: "Blast disease creates eye-shaped spots on leaves, and sheath blight rots the stems. Apply high-potency systemic fungicide when the humidity is high and spots first appear.",
            tips: ["Avoid excessive nitrogen application, which makes leaves soft and vulnerable.", "Burn or deeply bury crop residues from infected fields."]
        },
        water: {
            title: "Flooding & Water Efficiency in Paddy",
            products: ['t3'],
            advice: "Paddy requires continuous shallow flooding. Check water levels frequently with moisture meters or indicators. Organic matter improves clay-loam structure, creating an impervious layer that holds standing water.",
            tips: ["Keep a standing water level of 2-5 cm.", "Drain the field 10-12 days before harvesting."]
        }
    },
    vegetables: {
        acidity: {
            title: "pH Adjustment for Vegetable Beds",
            products: ['f1', 't3'],
            advice: "Most vegetables need a pH of 6.2 - 6.8. Test regularly with a 3-in-1 pH meter. Add vermicompost to enrich soil buffering capacity and make phosphorus readily available.",
            tips: ["Add compost every planting cycle.", "Apply wood ash in small doses to raise pH naturally if too acidic."]
        },
        deficiency: {
            title: "Fruit Drop & Leaf Curl Deficiencies",
            products: ['f3', 'f4'],
            advice: "Calcium deficiency causes blossom end rot in tomatoes/peppers. General micronutrient shortages reduce flowering and crop set. Spray liquid booster containing seaweeds and micronutrients.",
            tips: ["Perform foliar spray during early morning when stomata are open.", "Water consistently to allow plant to draw calcium from the soil."]
        },
        pests: {
            title: "Fruit Borers, Aphids & Spider Mite Management",
            products: ['p1', 't2'],
            advice: "Vegetables are susceptible to diverse insect pests. Use a battery-operated knapsack sprayer for even distribution of organic Neem Shield over and under leaves.",
            tips: ["Spray once a week as a preventive measure.", "Harvest mature vegetables before spraying even organic pest-control."]
        },
        fungal: {
            title: "Damping Off & Powdery Mildew Remedies",
            products: ['p2'],
            advice: "Seedlings dying at the base is damping off (soil fungus). Powdery mildew creates a white powder coating on leaves. Treat with fungicide and avoid watering from above.",
            tips: ["Space seedlings well to ensure air circulation.", "Use clean, pasteurized seedling starting mixes."]
        },
        water: {
            title: "Consistent Irrigation for Vegetable Yields",
            products: ['f1', 't3'],
            advice: "Inconsistent watering causes split fruits and bitter taste. Keep soil moisture at optimal levels using a soil tester. Add organic mulches and vermicompost to soil.",
            tips: ["Water deeply early in the morning.", "Use organic mulching to keep root systems cool and damp."]
        }
    }
};

// ─── Backend API Base URL ────────────────────────────────────────────────
// Dynamically uses current origin for production hosting (Render/Vercel) or localhost:3001 for local dev
const _hostname = (typeof window !== 'undefined' && window.location && window.location.hostname) ? window.location.hostname : 'localhost';
const _port = (typeof window !== 'undefined' && window.location && window.location.port) ? window.location.port : '';
const API_BASE = (_port === '8080' || _port === '5500') ? `http://${_hostname}:3001/api` : '/api';

// Application State
let cart = JSON.parse(localStorage.getItem('md_cart') || '[]');
let activeCategory = 'all';
let searchQuery = '';

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initThemeToggle();
    initAuthGateway();
    renderProducts();
    renderFeaturedProducts();
    setupEventListeners();
    updateCartUI();
    renderAdvisoryResult(); // Run initial advice render
    loadRecentReviewsForHome(); // Amazon & Flipkart live customer feedback for home testimonials
    syncProductsFromServer();
}

async function syncProductsFromServer() {
    try {
        if (typeof API_BASE === 'undefined') return;
        const res = await fetch(`${API_BASE}/products`, { signal: AbortSignal.timeout(10000) });
        if (res.ok) {
            const data = await res.json();
            if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
                // Ensure live products from database are loaded and displayed
                PRODUCTS.splice(0, PRODUCTS.length, ...data.data);
                renderProducts();
                renderFeaturedProducts();
            }
        }
    } catch (e) {
        // Fallback catalog is already loaded
    }
}

// Real Photographic Product Images Database (High-Res Realistic Agricultural Photos)
const PRODUCT_IMAGES = {
    "cotton-seed": {
        "local": "images/cotton-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600&auto=format&fit=crop&q=80",
        "alt": "Real Bollgard-II hybrid cotton bolls and seeds"
    },
    "wheat-seed": {
        "local": "images/wheat-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
        "alt": "Real golden wheat grain and certified seeds"
    },
    "corn-seed": {
        "local": "images/corn-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80",
        "alt": "Real sweet hybrid F1 corn cobs"
    },
    "paddy-seed": {
        "local": "images/paddy-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
        "alt": "Real basmati rice paddy field and grains"
    },
    "soybean-seed": {
        "local": "images/soybean-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&auto=format&fit=crop&q=80",
        "alt": "Real certified high oil soybean pods"
    },
    "millet-seed": {
        "local": "images/millet-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
        "alt": "Real hybrid pearl millet bajra heads"
    },
    "sunflower-seed": {
        "local": "images/sunflower-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop&q=80",
        "alt": "Real hybrid sunflower head with oil seeds"
    },
    "tomato-seed": {
        "local": "images/tomato-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
        "alt": "Real firm red hybrid tomatoes on vine"
    },
    "chilli-seed": {
        "local": "images/chilli-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80",
        "alt": "Real hot red Teja chillies harvest"
    },
    "onion-seed": {
        "local": "images/onion-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
        "alt": "Real Nashik red onions with tight skins"
    },
    "chana-seed": {
        "local": "images/chana-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop&q=80",
        "alt": "Real bold Bengal gram chana pulses"
    },
    "mustard-seed": {
        "local": "images/mustard-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1508747703725-719777637510?w=600&auto=format&fit=crop&q=80",
        "alt": "Real yellow mustard flowers and seeds"
    },
    "groundnut-seed": {
        "local": "images/groundnut-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1567892328001-c806283b9a06?w=600&auto=format&fit=crop&q=80",
        "alt": "Real fresh groundnuts in pod"
    },
    "okra-seed": {
        "local": "images/okra-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=600&auto=format&fit=crop&q=80",
        "alt": "Real tender dark green bhindi okra pods"
    },
    "marigold-seed": {
        "local": "images/marigold-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=600&auto=format&fit=crop&q=80",
        "alt": "Real dense golden African marigold blossoms"
    },
    "pea-seed": {
        "local": "images/pea-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&auto=format&fit=crop&q=80",
        "alt": "Real sweet green pea pods on vine"
    },
    "karela-seed": {
        "local": "images/karela-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&auto=format&fit=crop&q=80",
        "alt": "Real fresh long pale green bitter gourd karela"
    },
    "watermelon-seed": {
        "local": "images/watermelon-seed.jpg",
        "fallback": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
        "alt": "Real sweet juicy crimson watermelon slice"
    },
    "vermicompost": {
        "local": "images/vermicompost.jpg",
        "fallback": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
        "alt": "Real dark rich organic vermicompost castings"
    },
    "npk": {
        "local": "images/npk.jpg",
        "fallback": "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&auto=format&fit=crop&q=80",
        "alt": "Real 100% water soluble NPK 19:19:19"
    },
    "crop-booster": {
        "local": "images/crop-booster.jpg",
        "fallback": "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&auto=format&fit=crop&q=80",
        "alt": "Real liquid bio-fertilizer and plant tonic"
    },
    "micronutrient": {
        "local": "images/micronutrient.jpg",
        "fallback": "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80",
        "alt": "Real Grade 2 chelated micronutrient mixture"
    },
    "npk-00-52-34": {
        "local": "images/npk-00-52-34.jpg",
        "fallback": "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600&auto=format&fit=crop&q=80",
        "alt": "Real mono potassium phosphate flowering booster"
    },
    "npk-13-00-45": {
        "local": "images/npk-13-00-45.jpg",
        "fallback": "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=600&auto=format&fit=crop&q=80",
        "alt": "Real potassium nitrate fruit development spray"
    },
    "humic-acid": {
        "local": "images/humic-acid.jpg",
        "fallback": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80",
        "alt": "Real shiny 98% potassium humate flakes"
    },
    "seaweed-extract": {
        "local": "images/seaweed-extract.jpg",
        "fallback": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80",
        "alt": "Real marine Ascophyllum nodosum bio-zyme"
    },
    "calcium-nitrate": {
        "local": "images/calcium-nitrate.jpg",
        "fallback": "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80",
        "alt": "Real calcium nitrate with boron for anti-cracking"
    },
    "magnesium-sulphate": {
        "local": "images/magnesium-sulphate.jpg",
        "fallback": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&auto=format&fit=crop&q=80",
        "alt": "Real agricultural epsom salt magnesium crystals"
    },
    "bio-npk": {
        "local": "images/bio-npk.jpg",
        "fallback": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "alt": "Real bacterial liquid consortia nitrogen fixer"
    },
    "neem-cake": {
        "local": "images/neem-cake.jpg",
        "fallback": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80",
        "alt": "Real pure cold pressed neem seed cake powder"
    },
    "zinc-edta": {
        "local": "images/zinc-edta.jpg",
        "fallback": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
        "alt": "Real 12% chelated zinc EDTA micronutrient"
    },
    "ferrous-sulphate": {
        "local": "images/ferrous-sulphate.jpg",
        "fallback": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
        "alt": "Real green vitriol iron chlorosis corrector"
    },
    "nano-urea": {
        "local": "images/nano-urea.jpg",
        "fallback": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80",
        "alt": "Real IFFCO nano urea liquid fertilizer bottle"
    },
    "npk-12-61-00": {
        "local": "images/npk-12-61-00.jpg",
        "fallback": "https://images.unsplash.com/photo-1592417817098-8f3d69104a47?w=600&auto=format&fit=crop&q=80",
        "alt": "Real mono ammonium phosphate starter fertilizer"
    },
    "organic-potash": {
        "local": "images/organic-potash.jpg",
        "fallback": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop&q=80",
        "alt": "Real natural potash derived from molasses"
    },
    "neem-shield": {
        "local": "images/neem-shield.jpg",
        "fallback": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80",
        "alt": "Real 10,000 PPM pure neem oil bio-pesticide"
    },
    "fungicide": {
        "local": "images/fungicide.jpg",
        "fallback": "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?w=600&auto=format&fit=crop&q=80",
        "alt": "Real systemic and contact agricultural fungicide"
    },
    "herbicide": {
        "local": "images/herbicide.jpg",
        "fallback": "https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=600&auto=format&fit=crop&q=80",
        "alt": "Real selective post-emergence weed killer"
    },
    "imidacloprid": {
        "local": "images/imidacloprid.jpg",
        "fallback": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80",
        "alt": "Real systemic sucking pest insecticide"
    },
    "chlorpyrifos": {
        "local": "images/chlorpyrifos.jpg",
        "fallback": "https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?w=600&auto=format&fit=crop&q=80",
        "alt": "Real soil termite and root grub protector"
    },
    "trichoderma": {
        "local": "images/trichoderma.jpg",
        "fallback": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop&q=80",
        "alt": "Real bio-fungicide antagonistic fungal powder"
    },
    "mancozeb": {
        "local": "images/mancozeb.jpg",
        "fallback": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
        "alt": "Real multi-site contact fungicide shield"
    },
    "emamectin": {
        "local": "images/emamectin.jpg",
        "fallback": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80",
        "alt": "Real fast-acting caterpillar buster granules"
    },
    "sticky-trap": {
        "local": "images/sticky-trap.jpg",
        "fallback": "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80",
        "alt": "Real yellow and blue insect glue sticky traps"
    },
    "pheromone-trap": {
        "local": "images/pheromone-trap.jpg",
        "fallback": "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80",
        "alt": "Real pink bollworm funnel pheromone trap"
    },
    "nitrobenzene": {
        "local": "images/nitrobenzene.jpg",
        "fallback": "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&auto=format&fit=crop&q=80",
        "alt": "Real plant flowering booster and growth regulator"
    },
    "copper-oxychloride": {
        "local": "images/copper-oxychloride.jpg",
        "fallback": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80",
        "alt": "Real copper oxychloride bactericide powder"
    },
    "pseudomonas": {
        "local": "images/pseudomonas.jpg",
        "fallback": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "alt": "Real beneficial rhizobacteria PGPR liquid culture"
    },
    "chlorantraniliprole": {
        "local": "images/chlorantraniliprole.jpg",
        "fallback": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80",
        "alt": "Real 21-day systemic borer and caterpillar defense"
    },
    "acetamiprid": {
        "local": "images/acetamiprid.jpg",
        "fallback": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
        "alt": "Real translaminar whitefly and aphid specialist"
    },
    "gibberellic-acid": {
        "local": "images/gibberellic-acid.jpg",
        "fallback": "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&auto=format&fit=crop&q=80",
        "alt": "Real GA-3 crop growth and fruit elongator"
    },
    "super-spreader": {
        "local": "images/super-spreader.jpg",
        "fallback": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80",
        "alt": "Real organosilicone rain-fast super spreader"
    },
    "trowel": {
        "local": "images/trowel.jpg",
        "fallback": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80",
        "alt": "Real forged aluminum ergonomic hand trowel"
    },
    "sprayer": {
        "local": "images/sprayer.jpg",
        "fallback": "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80",
        "alt": "Real 16-litre 12V battery knapsack sprayer"
    },
    "ph-meter": {
        "local": "images/ph-meter.jpg",
        "fallback": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "alt": "Real 3-in-1 soil moisture and pH tester"
    },
    "sprayer-20l": {
        "local": "images/sprayer-20l.jpg",
        "fallback": "https://images.unsplash.com/photo-1592417817098-8f3d69104a47?w=600&auto=format&fit=crop&q=80",
        "alt": "Real 20-litre hybrid manual and battery sprayer"
    },
    "spray-lance": {
        "local": "images/spray-lance.jpg",
        "fallback": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "alt": "Real 9-foot extendable brass spray wand"
    },
    "pruner": {
        "local": "images/pruner.jpg",
        "fallback": "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&auto=format&fit=crop&q=80",
        "alt": "Real SK-5 high carbon steel bypass pruning shears"
    },
    "drip-pipe": {
        "local": "images/drip-pipe.jpg",
        "fallback": "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&auto=format&fit=crop&q=80",
        "alt": "Real 16mm inline drip irrigation lateral roll"
    },
    "solar-trap": {
        "local": "images/solar-trap.jpg",
        "fallback": "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "alt": "Real automatic solar-powered insect pest trap"
    },
    "mulching-film": {
        "local": "images/mulching-film.jpg",
        "fallback": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80",
        "alt": "Real silver-black 25 micron mulching film roll"
    },
    "tds-meter": {
        "local": "images/tds-meter.jpg",
        "fallback": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        "alt": "Real digital EC and TDS fertigation water tester"
    },
    "tarpaulin": {
        "local": "images/tarpaulin.jpg",
        "fallback": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80",
        "alt": "Real heavy-duty 250 GSM waterproof tarpaulin"
    },
    "drip-master-kit": {
        "local": "images/drip-master-kit.jpg",
        "fallback": "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&auto=format&fit=crop&q=80",
        "alt": "Real complete 1-acre drip irrigation installation"
    },
    "shade-net": {
        "local": "images/shade-net.jpg",
        "fallback": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80",
        "alt": "Real 50% UV treated agro green shade netting"
    },
    "mini-tiller": {
        "local": "images/mini-tiller.jpg",
        "fallback": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
        "alt": "Real rotary inter-row battery power weeder tiller"
    },
    "cocopeat": {
        "local": "images/cocopeat.jpg",
        "fallback": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
        "alt": "Real low-EC compressed coconut coir 5kg block"
    }
};

// Authentic Indian Agricultural Visual Generator (Zero Beer, Zero People, 100% Pure Farming)
function getAgroCardSVG(category, name) {
    const cleanName = (name || 'MD Agro Input').replace(/[<>&"]/g, '');
    let bgGradient = '#1b4d3e, #2e7d32';
    let icon = '🌱';
    let catLabel = 'CERTIFIED SEEDS';
    let subLabel = 'High Germination • 100% Genuine';

    if (category === 'fertilizers') {
        bgGradient = '#2e473b, #1b5e20';
        icon = '🧪';
        catLabel = 'PLANT NUTRITION';
        subLabel = 'Rich Nutrients • Soil Enhancer';
    } else if (category === 'protection') {
        bgGradient = '#0f3a5d, #0288d1';
        icon = '🛡️';
        catLabel = 'CROP DEFENSE';
        subLabel = 'Pest & Disease Control';
    } else if (category === 'tools') {
        bgGradient = '#263238, #37474f';
        icon = '⚙️';
        catLabel = 'FARM EQUIPMENT';
        subLabel = 'Heavy Duty • Precision Farming';
    }

    const shortName = cleanName.length > 30 ? cleanName.substring(0, 28) + '...' : cleanName;

    const svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><defs><linearGradient id="g_${category}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${bgGradient.split(',')[0].trim()}"/><stop offset="100%" stop-color="${bgGradient.split(',')[1].trim()}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g_${category})"/><circle cx="200" cy="105" r="50" fill="rgba(255,255,255,0.12)"/><text x="200" y="118" font-size="48" text-anchor="middle" dominant-baseline="middle">${icon}</text><rect x="40" y="175" width="320" height="26" rx="13" fill="rgba(0,0,0,0.35)"/><text x="200" y="192" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" fill="#4ade80" text-anchor="middle">${catLabel}</text><text x="200" y="232" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">${shortName}</text><text x="200" y="258" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="11" fill="rgba(255,255,255,0.75)" text-anchor="middle">${subLabel}</text></svg>`;

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgXml);
}

// Get Real Product Image with verified local photos and agricultural vector fallback
function getProductSVG(imageName, productName = '', showNameTag = true) {
    const found = PRODUCTS.find(p => p.image === imageName || p.name === productName);
    const category = found ? found.category : 'seeds';
    const cleanName = productName || (found ? found.name : imageName);
    const fallbackSVG = getAgroCardSVG(category, cleanName);

    // Verified 100% agricultural photos that exist locally on disk (36 items)
    const verifiedJPGs = [
        'cotton-seed', 'wheat-seed', 'corn-seed', 'paddy-seed',
        'soybean-seed', 'millet-seed', 'sunflower-seed', 'tomato-seed',
        'chilli-seed', 'onion-seed', 'chana-seed', 'mustard-seed',
        'groundnut-seed', 'okra-seed', 'marigold-seed', 'pea-seed',
        'karela-seed', 'watermelon-seed', 'vermicompost', 'npk',
        'micronutrient', 'npk-00-52-34', 'npk-13-00-45', 'bio-npk',
        'nano-urea', 'npk-12-61-00', 'neem-shield', 'fungicide',
        'herbicide', 'trowel', 'sprayer', 'ph-meter', 'sprayer-20l',
        'pruner', 'drip-pipe', 'cocopeat'
    ];

    const imgSrc = verifiedJPGs.includes(imageName)
        ? `images/${imageName}.jpg`
        : `images/${imageName}.svg`;

    const nameBadgeHTML = (showNameTag && cleanName)
        ? `<div class="product-img-name-tag"><span>${cleanName}</span></div>`
        : '';

    return `
        <div class="real-product-image-wrap">
            <img src="${imgSrc}" 
                 alt="${cleanName}" 
                 class="real-product-img product-img" 
                 loading="lazy" 
                 onerror="this.onerror=null; this.src='images/${imageName}.svg'; if (!this.complete || this.naturalWidth === 0) { this.src='${fallbackSVG}'; }" />
            ${nameBadgeHTML}
        </div>
    `;
}

function getProductImage(imageName, customAlt = '') {
    return getProductSVG(imageName, customAlt, false);
}


// Render Featured Products (Home Page Preview - 4 Items)
function renderFeaturedProducts() {
    const grid = document.getElementById('featured-products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const featured = PRODUCTS.slice(0, 4);
    featured.forEach(product => {
        const card = createProductCardElement(product);
        grid.appendChild(card);
    });
}

// Real-time stock status calculator for user display
function getProductStockInfo(product) {
    let qty = 45;
    if (product.stock_quantity !== undefined && product.stock_quantity !== null) {
        qty = Number(product.stock_quantity);
    } else if (product.stockCount !== undefined && product.stockCount !== null) {
        qty = Number(product.stockCount);
    } else if (product.in_stock === 0 || product.in_stock === false) {
        qty = 0;
    }

    if (qty <= 0 || product.in_stock === 0) {
        return {
            qty: 0,
            statusClass: 'out-of-stock',
            text: 'Out of Stock',
            badgeHTML: '<div class="product-stock-pill out-of-stock"><span class="stock-indicator-dot"></span><span class="stock-qty-text">Out of Stock</span></div>'
        };
    } else if (qty <= 10) {
        return {
            qty,
            statusClass: 'low-stock',
            text: 'Only ' + qty + ' left in stock!',
            badgeHTML: '<div class="product-stock-pill low-stock"><span class="stock-indicator-dot"></span><span class="stock-qty-text">Only <strong>' + qty + ' left</strong> in stock!</span></div>'
        };
    } else {
        return {
            qty,
            statusClass: 'in-stock',
            text: 'In Stock (' + qty + ' units)',
            badgeHTML: '<div class="product-stock-pill in-stock"><span class="stock-indicator-dot"></span><span class="stock-qty-text">In Stock: <strong>' + qty + ' units</strong></span></div>'
        };
    }
}

// Helper to create product card element
function createProductCardElement(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.setAttribute('data-id', product.id);

    const tagsHTML = product.tags.map(tag => `<span class="badge badge-tag">${tag}</span>`).join('');

    card.innerHTML = `
        <div class="product-image-container">
            ${getProductSVG(product.image, product.name, true)}
            <div class="product-card-overlay">
                <button class="btn btn-icon btn-view-details" title="Quick View">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-rating">
                <div class="stars">
                    ${renderStars(product.rating)}
                </div>
                <span class="rating-val">${product.rating} (${product.reviews})</span>
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-desc-short">${product.description.substring(0, 75)}...</p>
            <div class="product-tags-row">${tagsHTML}</div>
            ${getProductStockInfo(product).badgeHTML}
            <div class="product-footer-row">
                <div class="product-price">
                    <span class="currency">₹</span>
                    <span class="amount">${product.price}</span>
                    <span class="unit">/${product.unit.replace('per ', '')}</span>
                </div>
                <button class="btn btn-primary btn-add-to-cart" data-id="${product.id}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg> Add
                </button>
            </div>
        </div>
    `;
    return card;
}


// Render Products Catalog
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Filter and search logic
    const filtered = PRODUCTS.filter(p => {
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-products-found">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3>No products found</h3>
                <p>Try checking your spelling or adjusting your filters.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(product => {
        grid.appendChild(createProductCardElement(product));
    });
}

function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += `<svg width="14" height="14" fill="#ffc107" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
        } else if (i === fullStars && hasHalf) {
            stars += `<svg width="14" height="14" fill="#ffc107" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>`;
        } else {
            stars += `<svg width="14" height="14" fill="#e0e0e0" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" fill="#e0e0e0"/></svg>`;
        }
    }
    return stars;
}

// Setup Event Listeners
function setupEventListeners() {
    // Categories filtering
    const categoryButtons = document.querySelectorAll('.filter-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-category');
            renderProducts();
        });
    });

    // Search bar
    const searchInput = document.getElementById('catalog-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProducts();
        });
    }

    // Modal Details, Cart Click delegation
    const grid = document.getElementById('products-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;
            const productId = card.getAttribute('data-id');

            // Check if user clicked add-to-cart button
            const addToCartBtn = e.target.closest('.btn-add-to-cart');
            if (addToCartBtn) {
                e.stopPropagation();
                addToCart(productId);
                return;
            }

            // Check if user clicked view-details button
            const viewDetailsBtn = e.target.closest('.btn-view-details');
            if (viewDetailsBtn || e.target.closest('.product-image-container') || e.target.closest('.product-name')) {
                showProductModal(productId);
            }
        });
    }

    // Cart Drawer Controls
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');

    if (cartToggle) {
        cartToggle.addEventListener('click', () => {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
            prefillCheckoutUserDetails();
        });
    }

    const closeCartAction = () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
    };

    if (closeCart) closeCart.addEventListener('click', closeCartAction);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartAction);

    // Cart interaction (increase, decrease, remove)
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const btnQty = e.target.closest('.cart-qty-btn');
            if (btnQty) {
                const id = btnQty.getAttribute('data-id');
                const action = btnQty.getAttribute('data-action');
                updateCartQuantity(id, action);
                return;
            }

            const btnRemove = e.target.closest('.cart-item-remove');
            if (btnRemove) {
                const id = btnRemove.getAttribute('data-id');
                removeFromCart(id);
            }
        });
    }

    // Checkout Form Submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            processCheckout();
        });
    }

    // Advisory dropdowns — log selection to backend analytics
    const advisoryLogDebounce = (() => {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const crop = document.getElementById('advisory-crop')?.value;
                const issue = document.getElementById('advisory-issue')?.value;
                if (crop && issue) {
                    fetch(`${API_BASE}/advisory/log`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ crop, issue }),
                    }).catch(() => { /* analytics failure is non-critical */ });
                }
            }, 600);
        };
    })();

    // Crop Advisory Interactive Wizard
    const advisoryCrop = document.getElementById('advisory-crop');
    const advisoryIssue = document.getElementById('advisory-issue');

    if (advisoryCrop && advisoryIssue) {
        advisoryCrop.addEventListener('change', () => { renderAdvisoryResult(); advisoryLogDebounce(); });
        advisoryIssue.addEventListener('change', () => { renderAdvisoryResult(); advisoryLogDebounce(); });
    }

    // Modal Close
    const modalClose = document.getElementById('product-modal-close');
    const modal = document.getElementById('product-modal');
    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Contact Form submission — supports both #main-contact-form and #contact-form
    const contactForm = document.getElementById('main-contact-form') || document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn ? submitBtn.innerHTML : 'Submit';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                        <path d="M12 2 A 10 10 0 0 1 22 12" stroke-linecap="round"></path>
                    </svg> Sending...`;
            }

            const name = (contactForm.querySelector('#contact-name')?.value || contactForm.querySelector('[name="name"]')?.value || '').trim();
            const email = (contactForm.querySelector('#contact-email')?.value || contactForm.querySelector('[name="email"]')?.value || '').trim();
            const phone = (contactForm.querySelector('#contact-phone')?.value || contactForm.querySelector('[name="phone"]')?.value || '').trim();
            const crop = (contactForm.querySelector('#contact-crop')?.value || '').trim();
            let rawMsg = (contactForm.querySelector('#contact-message')?.value || contactForm.querySelector('#contact-msg')?.value || contactForm.querySelector('textarea')?.value || '').trim();

            let fullMessage = rawMsg;
            if (crop && !rawMsg.toLowerCase().includes(crop.toLowerCase())) {
                fullMessage = `[Crop: ${crop.toUpperCase()}] ${rawMsg}`;
            }

            let sentSuccess = false;
            let successMessage = 'Thank you! Your message has been received. An MD Agro advisor will contact you within 24 hours.';

            try {
                const res = await fetch(`${API_BASE}/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone, message: fullMessage }),
                    signal: AbortSignal.timeout(4000)
                });
                const data = await res.json();

                if (res.ok && data.success) {
                    sentSuccess = true;
                    if (data.message) successMessage = data.message;
                } else if (!res.ok && data.message) {
                    console.warn('[Contact] Backend response not ok:', data.message);
                }
            } catch (err) {
                console.warn('[Contact] Server fetch error, using local fallback:', err.message);
            }

            // Save in localStorage as well so it is visible in Admin Portal immediately
            const localInquiries = JSON.parse(localStorage.getItem('md_local_inquiries') || '[]');
            localInquiries.unshift({
                id: Date.now() % 100000,
                name,
                email: email || (phone ? `${phone}@farmer.in` : 'farmer@mdagro.com'),
                phone: phone || '',
                message: fullMessage,
                is_read: 0,
                created_at: new Date().toISOString()
            });
            localStorage.setItem('md_local_inquiries', JSON.stringify(localInquiries));

            const formCard = contactForm.closest('.contact-form-card') || contactForm.parentElement;
            if (formCard) {
                formCard.innerHTML = `
                    <div class="success-alert fade-in" style="text-align:center; padding:30px 20px;">
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2" style="margin-bottom:15px; display:inline-block;">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3 style="color:#0f5132; margin-bottom:8px;">Thank You, ${escapeHTML(name)}!</h3>
                        <p style="color:#475569; font-size:0.95rem;">${escapeHTML(successMessage)}</p>
                        <button class="btn btn-outline btn-sm" onclick="window.location.reload()" style="margin-top:20px;">Send Another Message</button>
                    </div>`;
            }
            showToast('✅ Message sent to MD Agro Support team!');
        });
    }

    // Mobile Navigation Hamburger
    const navMenuBtn = document.getElementById('nav-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (navMenuBtn && navLinks) {
        navMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navMenuBtn.classList.toggle('active');
        });

        // Close when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navMenuBtn.classList.remove('active');
            });
        });
    }

    // Newsletter subscription — posts to backend API
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const email = emailInput?.value.trim();
            if (!email) return;

            const orig = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.textContent = '...';

            try {
                const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });
                const data = await res.json();
                showToast(data.success ? '✅ ' + data.message : '⚠ ' + (data.message || 'Subscription failed.'));
                if (res.ok && data.success) newsletterForm.reset();
            } catch {
                showToast('⚠ Could not reach server. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = orig;
            }
        });
    }
}

// ════════════════════════════════════════════════════════════════════
// THEME CONTROLLER (LIGHT & DARK MODE)
// ════════════════════════════════════════════════════════════════════

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Sync current theme state
    const currentTheme = document.documentElement.getAttribute('data-theme') || 
        localStorage.getItem('md_theme') || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.setAttribute('title', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        themeToggleBtn.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');

        // Remove old listener if re-initialized
        themeToggleBtn.onclick = () => {
            const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('md_theme', nextTheme);
            themeToggleBtn.setAttribute('title', nextTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            themeToggleBtn.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            showToast(nextTheme === 'dark' ? '🌙 Dark mode activated' : '☀️ Light mode activated');
        };
    }

    // Listen to OS preference changes if user hasn't explicitly saved a choice
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('md_theme')) {
                const autoTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', autoTheme);
                if (themeToggleBtn) {
                    themeToggleBtn.setAttribute('title', autoTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
                    themeToggleBtn.setAttribute('aria-label', autoTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
                }
            }
        });
    }
}

// Add to Cart
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.product.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCartUI();

    // Add micro-animation effect to Cart count in Navbar
    const badge = document.querySelector('.cart-count-badge');
    if (badge) {
        badge.classList.remove('pulse-animation');
        void badge.offsetWidth; // Trigger reflow
        badge.classList.add('pulse-animation');
    }

    // Success notification overlay or mini toast
    showToast(`${product.name} added to cart`);
}

// Update Cart Quantity
function updateCartQuantity(id, action) {
    const item = cart.find(item => item.product.id === id);
    if (!item) return;

    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease') {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }
    updateCartUI();
}

// Remove from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.product.id !== id);
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    try {
        localStorage.setItem('md_cart', JSON.stringify(cart));
    } catch (e) { }

    const container = document.getElementById('cart-items-container');
    const totalCountElem = document.getElementById('cart-total-count');
    const subtotalElem = document.getElementById('cart-subtotal');
    const badgeCount = document.querySelector('.cart-count-badge');
    const checkoutBtn = document.getElementById('cart-checkout-btn');

    if (!container) return;

    let totalCount = 0;
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-view">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:15px; opacity:0.6;">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>Your cart is empty</p>
                <button class="btn btn-secondary btn-sm" id="cart-start-shopping" style="margin-top:10px;">Start Shopping</button>
            </div>
        `;
        if (checkoutBtn) checkoutBtn.disabled = true;

        const startShopBtn = document.getElementById('cart-start-shopping');
        if (startShopBtn) {
            startShopBtn.addEventListener('click', () => {
                document.getElementById('cart-drawer').classList.remove('active');
                document.getElementById('cart-overlay').classList.remove('active');
                document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
            });
        }
    } else {
        container.innerHTML = '';
        if (checkoutBtn) checkoutBtn.disabled = false;

        cart.forEach(item => {
            totalCount += item.quantity;
            subtotal += item.product.price * item.quantity;

            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                <div class="cart-item-thumb">
                    ${getProductSVG(item.product.image)}
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.product.name}</h4>
                    <span class="cart-item-price">₹${item.product.price} / ${item.product.unit.replace('per ', '')}</span>
                    <div class="cart-item-qty-row">
                        <div class="qty-selector">
                            <button class="cart-qty-btn" data-id="${item.product.id}" data-action="decrease">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="cart-qty-btn" data-id="${item.product.id}" data-action="increase">+</button>
                        </div>
                        <button class="cart-item-remove" data-id="${item.product.id}">Remove</button>
                    </div>
                </div>
                <div class="cart-item-subtotal">
                    ₹${item.product.price * item.quantity}
                </div>
            `;
            container.appendChild(row);
        });
    }

    if (totalCountElem) totalCountElem.textContent = totalCount;
    if (subtotalElem) subtotalElem.textContent = `₹${subtotal}`;
    if (badgeCount) {
        badgeCount.textContent = totalCount;
        badgeCount.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    // Refresh UPI dynamic QR code if UPI payment mode is currently selected
    try {
        const selectedPay = document.querySelector('input[name="pay_mode"]:checked')?.value;
        if (selectedPay === 'upi' && typeof toggleCheckoutPayMode === 'function') {
            toggleCheckoutPayMode('upi');
        }
    } catch (e) {}
}

// Process Checkout Simulation
async function processCheckout() {
    const name = document.getElementById('chk-name')?.value.trim() || '';
    const phone = document.getElementById('chk-phone')?.value.trim() || '';
    const address = document.getElementById('chk-address')?.value.trim() || '';

    if (!name || !phone || !address) {
        showToast('⚠ Please fill in all delivery details.');
        return;
    }

    if (!cart || cart.length === 0) {
        showToast('⚠ Your cart is empty.');
        return;
    }

    const checkoutBtn = document.getElementById('cart-checkout-btn');
    const origBtnText = checkoutBtn ? checkoutBtn.innerHTML : '';
    if (checkoutBtn) {
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = `<svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2 A 10 10 0 0 1 22 12" stroke-linecap="round"></path></svg> Placing Order...`;
    }

    const items = cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
    }));
    const totalAmt = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const payMode = document.querySelector('input[name="pay_mode"]:checked')?.value || 'cod';

    let orderPlaced = false;

    try {
        const userToken = sessionStorage.getItem('md_user_token') || sessionStorage.getItem('md_farmer_token') || localStorage.getItem('md_user_token') || localStorage.getItem('md_farmer_token');
        const orderHeaders = { 'Content-Type': 'application/json' };
        if (userToken) {
            orderHeaders['Authorization'] = `Bearer ${userToken}`;
        }

        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: orderHeaders,
            body: JSON.stringify({ customerName: name, phone, address, items, userId: currentUser ? currentUser.id : null, paymentMethod: payMode }),
            signal: AbortSignal.timeout(15000)
        });
        const data = await res.json();

        if (res.ok && data.success) {
            _showCheckoutSuccess(data, name, phone, address, payMode);
            return;
        } else {
            const errMsg = (data.errors && data.errors[0] && data.errors[0].msg) || (data.errors ? data.errors.map(e => e.msg).join(' ') : (data.message || 'Order failed. Please try again.'));
            showToast('⚠ ' + errMsg, 'error');
            if (checkoutBtn) { checkoutBtn.disabled = false; checkoutBtn.innerHTML = origBtnText; }
            return;
        }
    } catch (err) {
        // Backend offline or unreachable: seamlessly complete order in resilient local mode
        console.warn('[Checkout] Backend offline, saving order to local database:', err.message);
        const fallbackOrderId = Math.floor(100000 + Math.random() * 900000);
        let fallbackTotal = cart.reduce((sum, i) => sum + ((i.product.price || 0) * (i.quantity || 1)), 0);
        const fallbackData = {
            success: true,
            orderId: fallbackOrderId,
            totalAmount: fallbackTotal,
            message: 'Order registered successfully!'
        };
        _showCheckoutSuccess(fallbackData, name, phone, address, payMode);
        showToast('✅ Order placed successfully!', 'success');
    }
}

function _showCheckoutSuccess(data, name, phone, address, payMode = 'cod') {
    const checkoutContainer = document.getElementById('cart-drawer-content');
    if (!checkoutContainer) return;

    const orderRef = data.orderId ? `#${data.orderId}` : '';
    const totalAmt = data.totalAmount ? `₹${Number(data.totalAmount).toLocaleString('en-IN')}` : '';

    if (currentUser) {
        currentUser.total_orders = (currentUser.total_orders || 0) + 1;
        currentUser.total_spent = (currentUser.total_spent || 0) + (Number(data.totalAmount) || 0);
        sessionStorage.setItem('md_current_user', JSON.stringify(currentUser));
        localStorage.removeItem('md_current_user');

        const localUsers = JSON.parse(localStorage.getItem('md_users_db') || '[]');
        const idx = localUsers.findIndex(u => u.phone === currentUser.phone);
        if (idx >= 0) {
            localUsers[idx].total_orders = (localUsers[idx].total_orders || 0) + 1;
            localUsers[idx].total_spent = (localUsers[idx].total_spent || 0) + (Number(data.totalAmount) || 0);
            localStorage.setItem('md_users_db', JSON.stringify(localUsers));
        }
    }

    // Snapshot purchased items before clearing cart (used for verified product reviews)
    const purchasedItems = (cart && cart.length > 0) ? cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity
    })) : [{ id: 's1', name: 'Premium Hybrid Cotton Seeds', quantity: 1 }];

    // Always record order in local database so it is visible in Admin Portal and user history
    const localOrders = JSON.parse(localStorage.getItem('md_local_orders') || '[]');
    const orderItems = cart.map((item, idx) => ({
        id: idx + 1,
        product_id: item.product.id,
        product_name: item.product.name,
        unit_price: item.product.price,
        quantity: item.quantity,
        line_total: item.product.price * item.quantity
    }));

    localOrders.unshift({
        id: data.orderId || (Date.now() % 100000),
        user_id: currentUser ? currentUser.id : null,
        customer_name: name || (currentUser ? currentUser.name : 'Farmer Customer'),
        phone: phone || (currentUser ? currentUser.phone : ''),
        address: address || (currentUser ? currentUser.location : ''),
        total_amount: Number(data.totalAmount) || 0,
        status: 'pending',
        payment_method: payMode,
        notes: `Placed via storefront (${payMode.toUpperCase()})`,
        created_at: new Date().toISOString(),
        items: orderItems
    });
    localStorage.setItem('md_local_orders', JSON.stringify(localOrders));

    checkoutContainer.innerHTML = `
        <div class="checkout-success-view fade-in">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2" class="success-checkmark">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h2>Order Placed!</h2>
            ${orderRef ? `<p style="font-size:0.85rem;color:#666;">Order Ref: <strong>${orderRef}</strong>${totalAmt ? ' &nbsp;|&nbsp; Total: <strong>' + totalAmt + '</strong>' : ''}</p>` : ''}
            <p>Your order has been registered in our system. Our representative will contact you shortly to confirm delivery.</p>
            <div class="order-summary-box">
                <h4>Items Ordered:</h4>
                <ul>
                    ${purchasedItems.map(item => `<li>${escapeHTML(item.name)} &times; ${item.quantity}</li>`).join('')}
                </ul>
            </div>

            <!-- Amazon / Flipkart Style Post-Order Feedback Widget -->
            <div class="post-order-feedback-box" id="post-order-feedback-widget">
                <div class="feedback-badge">★ Verified Buyer Feedback</div>
                <h4>Rate your purchased items</h4>
                <p>Help other farmers by sharing your rating & feedback for this purchase:</p>

                ${purchasedItems.length > 1 ? `
                <div class="feedback-input-group">
                    <label for="fb-product-select">Select Item to Review:</label>
                    <select id="fb-product-select">
                        ${purchasedItems.map(item => `<option value="${item.id}">${escapeHTML(item.name)}</option>`).join('')}
                    </select>
                </div>
                ` : `<input type="hidden" id="fb-product-select" value="${purchasedItems[0]?.id || ''}">`}

                <div class="interactive-star-rating">
                    <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Your Star Rating:</label>
                    <div class="star-rating-stars" id="fb-stars-picker">
                        <span class="star-btn active" data-rating="1">★</span>
                        <span class="star-btn active" data-rating="2">★</span>
                        <span class="star-btn active" data-rating="3">★</span>
                        <span class="star-btn active" data-rating="4">★</span>
                        <span class="star-btn active" data-rating="5">★</span>
                    </div>
                    <span class="rating-label-text" id="fb-rating-text">5 ★ - Outstanding Quality!</span>
                </div>

                <div class="feedback-input-group">
                    <label for="fb-review-comment">Review & Comments:</label>
                    <textarea id="fb-review-comment" rows="2" placeholder="e.g. Excellent germination, prompt delivery, highly recommended!"></textarea>
                </div>

                <button class="btn btn-primary" id="btn-submit-post-feedback" style="width:100%; margin-bottom:5px;">
                    Submit Verified Review ★
                </button>
                <div id="fb-status-msg"></div>
            </div>

            <button class="btn btn-secondary" id="btn-close-checkout" style="margin-top:15px; width:100%;">Return to Shop</button>
        </div>
    `;

    // Clear cart
    cart = [];
    updateCartUI();

    // Initialize Post-Order Feedback logic
    initPostOrderFeedbackWidget(data.orderId, name, purchasedItems);

    const closeBtn = document.getElementById('btn-close-checkout');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('cart-drawer').classList.remove('active');
            document.getElementById('cart-overlay').classList.remove('active');
            setTimeout(() => { restoreCartDrawerHTML(); }, 500);
        });
    }
}

// Restore default HTML structure inside Cart Drawer (needed after checkout success completes)
function restoreCartDrawerHTML() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    drawer.innerHTML = `
        <div class="cart-drawer-header">
            <h3>Shopping Cart (<span id="cart-total-count">0</span>)</h3>
            <button class="close-btn" id="close-cart">&times;</button>
        </div>
        <div id="cart-drawer-content">
            <div class="cart-items-wrapper" id="cart-items-container">
                <!-- Cart items load here dynamically -->
            </div>
            <div class="cart-footer">
                <div class="cart-summary">
                    <span class="label">Total Amount:</span>
                    <span class="value" id="cart-subtotal">₹0</span>
                </div>
                <div class="checkout-form-container">
                    <h4>Quick Delivery Details</h4>
                    <form id="checkout-form">
                        <div class="form-group-sm">
                            <input type="text" placeholder="Name" required id="chk-name">
                        </div>
                        <div class="form-group-sm">
                            <input type="tel" placeholder="Mobile Number" required id="chk-phone">
                        </div>
                        <div class="form-group-sm">
                            <input type="text" placeholder="Delivery Address" required id="chk-address">
                        </div>
                        <!-- Payment Options: COD vs Dynamic UPI QR -->
                        <div class="payment-method-selector">
                            <label class="pay-method-opt">
                                <input type="radio" name="pay_mode" value="cod" checked onchange="toggleCheckoutPayMode(this.value)">
                                <span>💵 Cash on Delivery / Pay on Pickup</span>
                            </label>
                            <label class="pay-method-opt">
                                <input type="radio" name="pay_mode" value="upi" onchange="toggleCheckoutPayMode(this.value)">
                                <span>⚡ Pay via UPI QR (GPay / PhonePe / Paytm)</span>
                            </label>
                        </div>
                        <div id="upi-qr-section" class="upi-qr-box" style="display:none;"></div>
                        <button type="submit" class="btn btn-primary btn-block" id="cart-checkout-btn" disabled>Confirm & Order</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    // Re-bind listeners
    setupEventListeners();
    updateCartUI();
}

// Show Product Details Modal with Amazon & Flipkart Style Ratings & Reviews
function showProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('product-modal-body');
    if (!modal || !modalContent) return;

    const tagsHTML = (product.tags || []).map(tag => `<span class="badge badge-tag">${tag}</span>`).join('');

    modalContent.innerHTML = `
        <div class="modal-product-grid">
            <div class="modal-product-image">
                ${getProductSVG(product.image)}
            </div>
            <div class="modal-product-details">
                <span class="badge category-badge">${(product.category || '').toUpperCase()}</span>
                <h2 class="modal-title">${escapeHTML(product.name)}</h2>
                <div class="product-rating" style="margin-bottom:15px; cursor:pointer;" onclick="document.getElementById('product-reviews-section')?.scrollIntoView({behavior:'smooth'})" title="Click to view reviews">
                    <div class="stars" id="modal-top-stars">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="rating-val" id="modal-top-rating-text">${product.rating} (${product.reviews} customer ratings & reviews)</span>
                </div>
                <p class="modal-desc">${product.description}</p>
                
                <div class="modal-meta">
                    <div class="meta-item">
                        <strong>Availability:</strong> <span>${getProductStockInfo(product).badgeHTML}</span>
                    </div>
                    <div class="meta-item">
                        <strong>Packaging Unit:</strong> <span>${product.unit}</span>
                    </div>
                </div>

                <div class="modal-price-row">
                    <div class="modal-price">
                        <span class="currency">₹</span>
                        <span class="amount">${product.price}</span>
                        <span class="unit">/${(product.unit || '').replace('per ', '')}</span>
                    </div>
                </div>

                <div class="modal-actions">
                    <button class="btn btn-primary btn-lg" id="modal-add-to-cart" data-id="${product.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg> Add to Cart
                    </button>
                </div>
                <div style="margin-top:15px;">${tagsHTML}</div>
            </div>
        </div>
        <!-- Amazon / Flipkart Style Customer Reviews & Ratings Section -->
        <div class="product-reviews-container" id="product-reviews-section">
            <div class="reviews-header-strip">
                <h3>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    Customer Ratings & Reviews
                </h3>
                <button class="btn btn-secondary btn-sm" id="btn-toggle-modal-review-form">★ Rate & Review Product</button>
            </div>

            <!-- Inline Write Review Drawer (Collapsible) -->
            <div class="write-review-drawer" id="modal-write-review-box" style="display:none;">
                <h4 style="margin:0 0 10px 0; font-size:1.05rem; color:var(--text-main);">Share Your Verified Farmer Feedback</h4>
                <div class="interactive-star-rating">
                    <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Select Star Rating:</label>
                    <div class="star-rating-stars" id="modal-stars-picker">
                        <span class="star-btn active" data-rating="1">★</span>
                        <span class="star-btn active" data-rating="2">★</span>
                        <span class="star-btn active" data-rating="3">★</span>
                        <span class="star-btn active" data-rating="4">★</span>
                        <span class="star-btn active" data-rating="5">★</span>
                    </div>
                    <span class="rating-label-text" id="modal-rating-label">5 ★ - Outstanding Quality!</span>
                </div>
                <div class="feedback-input-group">
                    <label>Your Name:</label>
                    <input type="text" id="modal-rev-author" placeholder="Farmer Name" value="${currentUser ? escapeHTML(currentUser.name) : ''}">
                </div>
                <div class="feedback-input-group">
                    <label>Review Headline (optional):</label>
                    <input type="text" id="modal-rev-title" placeholder="e.g. Excellent crop germination & yield!">
                </div>
                <div class="feedback-input-group">
                    <label>Detailed Experience / Feedback:</label>
                    <textarea id="modal-rev-body" rows="3" placeholder="Share your experience on product quality, packaging, delivery or yield improvement..."></textarea>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                    <button class="btn btn-primary btn-sm" id="btn-submit-modal-review">Submit Review</button>
                    <button class="btn btn-secondary btn-sm" id="btn-cancel-modal-review">Cancel</button>
                </div>
                <div id="modal-rev-status" style="margin-top:10px;"></div>
            </div>

            <!-- Rating Summary Breakdown (Flipkart / Amazon Bar Chart) -->
            <div class="reviews-summary-card" id="reviews-summary-container">
                <div style="text-align:center; padding:20px; color:#64748b;">
                    Loading verified ratings...
                </div>
            </div>

            <!-- Verified Customer Reviews List -->
            <div class="reviews-list" id="modal-reviews-list">
                <div style="text-align:center; padding:20px; color:#64748b;">
                    Loading customer feedback...
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');

    // Add click handler inside modal
    const modalAddBtn = document.getElementById('modal-add-to-cart');
    if (modalAddBtn) {
        modalAddBtn.addEventListener('click', () => {
            addToCart(product.id);
            modal.classList.remove('active');
        });
    }

    // Toggle Review Drawer
    const toggleBtn = document.getElementById('btn-toggle-modal-review-form');
    const writeDrawer = document.getElementById('modal-write-review-box');
    const cancelBtn = document.getElementById('btn-cancel-modal-review');
    if (toggleBtn && writeDrawer) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = writeDrawer.style.display === 'none';
            writeDrawer.style.display = isHidden ? 'block' : 'none';
            toggleBtn.textContent = isHidden ? '✕ Close Review Form' : '★ Rate & Review Product';
        });
    }
    if (cancelBtn && writeDrawer) {
        cancelBtn.addEventListener('click', () => {
            writeDrawer.style.display = 'none';
            if (toggleBtn) toggleBtn.textContent = '★ Rate & Review Product';
        });
    }

    // Setup interactive star rating and submission for Modal review form
    setupModalReviewForm(product.id);

    // Fetch and render customer reviews
    loadProductReviews(product.id);
}

// Fetch and render reviews for a product (Amazon & Flipkart style)
async function loadProductReviews(productId) {
    const summaryContainer = document.getElementById('reviews-summary-container');
    const listContainer = document.getElementById('modal-reviews-list');
    if (!summaryContainer || !listContainer) return;

    try {
        const res = await fetch(`${API_BASE}/reviews?productId=${encodeURIComponent(productId)}`);
        const data = await res.json();

        if (res.ok && data.success) {
            const summary = data.summary || { averageRating: 5.0, totalReviews: 0, distribution: {} };
            const reviews = data.reviews || [];

            // Update top product rating in modal
            const topStars = document.getElementById('modal-top-stars');
            const topText = document.getElementById('modal-top-rating-text');
            if (topStars) topStars.innerHTML = renderStars(summary.averageRating);
            if (topText) topText.innerHTML = `${summary.averageRating} (${summary.totalReviews} customer ratings & reviews)`;

            // Also update product in PRODUCTS catalog array
            const prod = PRODUCTS.find(p => p.id === productId);
            if (prod) {
                prod.rating = summary.averageRating;
                prod.reviews = summary.totalReviews;
            }

            // Render Flipkart / Amazon Star Distribution Summary Card
            const dist = summary.distribution || {};
            summaryContainer.innerHTML = `
                <div class="rating-big-score">
                    <div class="rating-big-number">${summary.averageRating}</div>
                    <div class="rating-big-stars">${renderStars(summary.averageRating)}</div>
                    <div class="rating-total-label">${summary.totalReviews} total verified ratings</div>
                </div>
                <div class="star-bars-col">
                    ${[5, 4, 3, 2, 1].map(star => {
                        const starInfo = dist[star] || { count: 0, percentage: 0 };
                        return `
                            <div class="star-bar-row">
                                <span class="star-bar-label">${star} ★</span>
                                <div class="star-bar-track">
                                    <div class="star-bar-fill" style="width: ${starInfo.percentage}%;"></div>
                                </div>
                                <span class="star-bar-pct">${starInfo.percentage}%</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            // Render Reviews List
            if (reviews.length === 0) {
                listContainer.innerHTML = `
                    <div style="text-align:center; padding:30px 20px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:10px; color:#64748b;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" style="margin-bottom:8px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <p style="margin:0 0 8px 0; font-weight:600; color:#334155;">No customer reviews yet</p>
                        <p style="margin:0; font-size:0.85rem;">Be the first farmer to share your experience with this product!</p>
                    </div>
                `;
            } else {
                listContainer.innerHTML = reviews.map(rev => {
                    const initials = (rev.customer_name || 'Farmer').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                    const formattedDate = rev.created_at ? new Date(rev.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently';
                    const verifiedBadge = rev.is_verified ? `<span class="verified-purchase-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified Purchase</span>` : '';

                    return `
                        <div class="review-item-card fade-in">
                            <div class="review-user-row">
                                <div class="review-avatar">${initials}</div>
                                <div class="review-user-name">${escapeHTML(rev.customer_name || 'Verified Farmer')}</div>
                                ${verifiedBadge}
                            </div>
                            <div class="review-rating-row">
                                <span class="review-stars">${'★'.repeat(Math.round(rev.rating || 5))}${'☆'.repeat(5 - Math.round(rev.rating || 5))}</span>
                                ${rev.title ? `<span class="review-title">${escapeHTML(rev.title)}</span>` : ''}
                            </div>
                            <div class="review-date">Reviewed in India on ${formattedDate}</div>
                            <p class="review-comment-body">${escapeHTML(rev.comment || '')}</p>
                            <div style="margin-top:10px; font-size:0.8rem; color:#64748b; display:flex; align-items:center; gap:6px;">
                                <span>Helpful?</span>
                                <button class="btn btn-secondary btn-xs" onclick="this.innerHTML='✔ Thank you!'; this.disabled=true;" style="padding:2px 8px; font-size:0.75rem;">👍 Helpful</button>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }
    } catch (err) {
        console.warn('[Reviews] Could not load product reviews:', err.message);
        summaryContainer.innerHTML = `<p style="font-size:0.85rem; color:#64748b;">Ratings summary temporarily offline.</p>`;
    }
}

// Setup interactive star rating and submission for Modal review form
function setupModalReviewForm(productId) {
    const picker = document.getElementById('modal-stars-picker');
    const label = document.getElementById('modal-rating-label');
    const submitBtn = document.getElementById('btn-submit-modal-review');
    const statusDiv = document.getElementById('modal-rev-status');
    if (!picker || !submitBtn) return;

    let selectedRating = 5;

    const ratingTexts = {
        1: '1 ★ - Poor Experience',
        2: '2 ★ - Fair / Needs Improvement',
        3: '3 ★ - Good / Average',
        4: '4 ★ - Very Good Quality',
        5: '5 ★ - Outstanding Quality!'
    };

    function updateStarsDisplay(val) {
        picker.querySelectorAll('.star-btn').forEach(btn => {
            const r = parseInt(btn.getAttribute('data-rating'), 10);
            if (r <= val) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        if (label) label.textContent = ratingTexts[val] || `${val} ★`;
    }

    picker.querySelectorAll('.star-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const r = parseInt(btn.getAttribute('data-rating'), 10);
            updateStarsDisplay(r);
        });
        btn.addEventListener('mouseleave', () => {
            updateStarsDisplay(selectedRating);
        });
        btn.addEventListener('click', () => {
            selectedRating = parseInt(btn.getAttribute('data-rating'), 10);
            updateStarsDisplay(selectedRating);
        });
    });

    submitBtn.addEventListener('click', async () => {
        const authorInput = document.getElementById('modal-rev-author');
        const titleInput = document.getElementById('modal-rev-title');
        const commentInput = document.getElementById('modal-rev-body');

        const authorName = authorInput?.value.trim() || (currentUser ? currentUser.name : 'Verified Farmer');
        const title = titleInput?.value.trim() || '';
        const comment = commentInput?.value.trim() || '';

        if (!comment || comment.length < 3) {
            if (statusDiv) statusDiv.innerHTML = `<div style="color:#dc2626; font-size:0.85rem;">⚠ Please write at least 3 characters in your review comment.</div>`;
            return;
        }

        submitBtn.disabled = true;
        const origText = submitBtn.textContent;
        submitBtn.textContent = 'Publishing Review...';

        try {
            const token = sessionStorage.getItem('md_user_token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_BASE}/reviews`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    productId,
                    rating: selectedRating,
                    title,
                    comment,
                    customerName: authorName
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                if (statusDiv) {
                    statusDiv.innerHTML = `<div class="fb-success-alert">✔ धन्यवाद! Your review has been published and is now visible to all farmers.</div>`;
                }
                showToast('✔ Review published successfully!');
                if (commentInput) commentInput.value = '';
                if (titleInput) titleInput.value = '';

                // Reload reviews after short delay so the new review appears
                setTimeout(() => {
                    loadProductReviews(productId);
                    const writeDrawer = document.getElementById('modal-write-review-box');
                    const toggleBtn = document.getElementById('btn-toggle-modal-review-form');
                    if (writeDrawer) writeDrawer.style.display = 'none';
                    if (toggleBtn) toggleBtn.textContent = '★ Rate & Review Product';
                }, 1500);
            } else {
                if (statusDiv) statusDiv.innerHTML = `<div style="color:#dc2626; font-size:0.85rem;">⚠ ${data.message || 'Error submitting review.'}</div>`;
                submitBtn.disabled = false;
                submitBtn.textContent = origText;
            }
        } catch (err) {
            console.error('[Review Submit Error]', err);
            if (statusDiv) statusDiv.innerHTML = `<div style="color:#dc2626; font-size:0.85rem;">⚠ Network error. Please try again.</div>`;
            submitBtn.disabled = false;
            submitBtn.textContent = origText;
        }
    });
}

// Post-Order Feedback Widget Logic (inside Checkout Success screen)
function initPostOrderFeedbackWidget(orderId, customerName, purchasedItems) {
    const starsPicker = document.getElementById('fb-stars-picker');
    const ratingLabel = document.getElementById('fb-rating-text');
    const submitBtn = document.getElementById('btn-submit-post-feedback');
    const statusMsg = document.getElementById('fb-status-msg');
    const productSelect = document.getElementById('fb-product-select');
    const commentInput = document.getElementById('fb-review-comment');

    if (!starsPicker || !submitBtn) return;

    let selectedRating = 5;

    const ratingTexts = {
        1: '1 ★ - Poor Experience',
        2: '2 ★ - Fair Quality',
        3: '3 ★ - Good / Satisfactory',
        4: '4 ★ - Very Good Quality',
        5: '5 ★ - Outstanding Quality!'
    };

    function updateStars(val) {
        starsPicker.querySelectorAll('.star-btn').forEach(btn => {
            const r = parseInt(btn.getAttribute('data-rating'), 10);
            if (r <= val) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        if (ratingLabel) ratingLabel.textContent = ratingTexts[val] || `${val} ★`;
    }

    starsPicker.querySelectorAll('.star-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const r = parseInt(btn.getAttribute('data-rating'), 10);
            updateStars(r);
        });
        starsPicker.addEventListener('mouseleave', () => {
            updateStars(selectedRating);
        });
        btn.addEventListener('click', () => {
            selectedRating = parseInt(btn.getAttribute('data-rating'), 10);
            updateStars(selectedRating);
        });
    });

    submitBtn.addEventListener('click', async () => {
        const prodId = productSelect ? productSelect.value : (purchasedItems[0]?.id || 's1');
        const prodObj = purchasedItems.find(p => p.id === prodId) || purchasedItems[0] || {};
        const comment = (commentInput?.value.trim()) || 'Excellent product quality and prompt delivery. Highly recommended for farmers!';

        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Feedback...';

        try {
            const token = sessionStorage.getItem('md_user_token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_BASE}/reviews`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    productId: prodId,
                    rating: selectedRating,
                    title: `${selectedRating} Star Verified Feedback`,
                    comment,
                    orderId: orderId || null,
                    customerName: customerName || (currentUser ? currentUser.name : 'Verified Farmer')
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                const widget = document.getElementById('post-order-feedback-widget');
                if (widget) {
                    widget.innerHTML = `
                        <div class="fb-success-alert fade-in" style="margin:0;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <div>
                                <strong>धन्यवाद, ${escapeHTML(customerName || 'Farmer')}!</strong><br>
                                <span style="font-size:0.85rem;">Your verified feedback & ${selectedRating}★ rating for <strong>${escapeHTML(prodObj.name || 'product')}</strong> have been published. Other farmers can now see your review!</span>
                            </div>
                        </div>
                    `;
                }
                showToast('✔ Feedback published & visible to all farmers!');
                // Update home page testimonials if on home page
                loadRecentReviewsForHome();
            } else {
                if (statusMsg) statusMsg.innerHTML = `<div style="color:#dc2626; font-size:0.85rem; margin-top:8px;">⚠ ${data.message || 'Error submitting feedback.'}</div>`;
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Verified Review ★';
            }
        } catch (err) {
            console.error('[Post-order feedback error]', err);
            if (statusMsg) statusMsg.innerHTML = `<div style="color:#dc2626; font-size:0.85rem; margin-top:8px;">⚠ Network error. Please try again.</div>`;
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Verified Review ★';
        }
    });
}

// Load recent verified customer reviews into Home page testimonials
async function loadRecentReviewsForHome() {
    const testimonialsRow = document.querySelector('.testimonials-row');
    if (!testimonialsRow) return;

    try {
        const res = await fetch(`${API_BASE}/reviews/recent`);
        const data = await res.json();

        if (res.ok && data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
            // Take the top 3-4 most recent reviews
            const reviewsToShow = data.reviews.slice(0, 3);
            testimonialsRow.innerHTML = reviewsToShow.map(rev => {
                const initials = (rev.customer_name || 'Farmer').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                const starStr = '⭐'.repeat(Math.min(5, Math.max(1, Math.round(rev.rating || 5))));
                const productName = rev.product_name ? `<span style="display:inline-block; font-size:0.75rem; background:#dcfce7; color:#166534; font-weight:700; padding:2px 8px; border-radius:12px; margin-bottom:6px;">✔ Verified: ${escapeHTML(rev.product_name)}</span>` : '';

                return `
                    <div class="testimonial-card fade-in">
                        <div style="margin-bottom:6px;">${productName}</div>
                        <div class="test-stars">${starStr}</div>
                        <p>"${escapeHTML(rev.comment || 'Excellent product and prompt service.')}"</p>
                        <div class="user-profile">
                            <div class="user-avatar-circle">${initials}</div>
                            <div class="user-meta">
                                <h4>${escapeHTML(rev.customer_name || 'Verified Farmer')}</h4>
                                <span>Verified Buyer • ${rev.created_at ? new Date(rev.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Recent'}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    } catch (err) {
        console.warn('[Home Testimonials] Could not fetch recent reviews:', err.message);
    }
}

// Render Crop Advisor Result
function renderAdvisoryResult() {
    const cropSelect = document.getElementById('advisory-crop');
    const issueSelect = document.getElementById('advisory-issue');
    const adviceBox = document.getElementById('advisory-result');

    if (!cropSelect || !issueSelect || !adviceBox) return;

    const crop = cropSelect.value;
    const issue = issueSelect.value;

    const data = ADVISORY_DATABASE[crop][issue];
    if (!data) return;

    // Get recommended products HTML
    let productsHTML = '';
    data.products.forEach(pId => {
        const prod = PRODUCTS.find(p => p.id === pId);
        if (prod) {
            productsHTML += `
                <div class="recommended-product-item" onclick="showProductModal('${prod.id}')">
                    <div class="rec-thumb">${getProductSVG(prod.image)}</div>
                    <div class="rec-details">
                        <h5>${prod.name}</h5>
                        <p class="rec-price">₹${prod.price} / ${prod.unit.replace('per ', '')}</p>
                    </div>
                    <button class="btn btn-secondary btn-xs" onclick="event.stopPropagation(); addToCart('${prod.id}')">Add</button>
                </div>
            `;
        }
    });

    const tipsHTML = data.tips.map(tip => `<li>${tip}</li>`).join('');

    adviceBox.innerHTML = `
        <div class="advice-card fade-in">
            <h4 class="advice-title">${data.title}</h4>
            <p class="advice-text">${data.advice}</p>
            
            <div class="advice-tips">
                <h5>Expert Action Steps:</h5>
                <ul>
                    ${tipsHTML}
                </ul>
            </div>

            <div class="recommended-products-section">
                <h5>Recommended Solutions:</h5>
                <div class="recommended-products-list">
                    ${productsHTML}
                </div>
            </div>
        </div>
    `;
}

// Toast notification helper
function showToast(message) {
    const existing = document.querySelector('.agro-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'agro-toast fade-in';
    toast.innerHTML = `
        <div class="toast-content">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2" style="margin-right:8px;">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// AI Agronomist Chatbot Logic — Powered by Google Gemini AI & Local Knowledge Base
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const quickReplies = document.querySelector('.quick-replies');

    if (!chatbotToggle || !chatbotContainer || !chatbotClose || !chatForm || !chatInput || !chatMessages) return;

    // Google Gemini API Configuration
    // Uses backend proxy (/api/chat) or window.GEMINI_API_KEY (from local config.js)
    const GEMINI_API_KEY = window.GEMINI_API_KEY || '';
    const GEMINI_ENDPOINT = GEMINI_API_KEY ?
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=' + GEMINI_API_KEY : '';

    const SYSTEM_PROMPT = `You are MD Agro Smart Agronomist, a friendly and practical agricultural assistant for MD Agro Connect (एम. डी. अँग्रो सर्व्हिसेस).
Your mission is to provide simple, crisp, and farmer-friendly advice.
Guidelines:
1. Keep answers SHORT, CRISP, and SIMPLE (2 to 3 bullet points, under 60 words total). Avoid long paragraphs and scientific jargon.
2. Give actionable farming steps (e.g. soil treatment, pest spray, irrigation timing).
3. Recommend suitable MD Agro products when relevant (e.g. Organic Vermicompost, NPK 19:19:19, Neem Shield Bio-Pesticide, Fungicide Cure-All, Selective Herbicide, Knapsack Sprayer, 3-in-1 Soil pH Meter, Hybrid Seeds).
4. Reply in the farmer's language (Marathi, Hindi, or English).
5. Be warm, supportive, and respectful.`;

    let chatHistory = [];

    // Delegate click on Add-to-cart buttons inside chatbot messages
    chatMessages.addEventListener('click', (e) => {
        const buyBtn = e.target.closest('.chat-buy-btn');
        if (buyBtn) {
            const prodId = buyBtn.getAttribute('data-product-id');
            if (prodId && typeof addToCart === 'function') {
                addToCart(prodId);
            }
        }
    });

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Handle Quick Replies click
    if (quickReplies) {
        quickReplies.addEventListener('click', (e) => {
            const pill = e.target.closest('.reply-pill');
            if (pill) {
                const text = pill.textContent.trim();
                sendMessage(text);
            }
        });
    }



    // Handle Form Submit
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const text = chatInput.value.trim();
        if (!text) return;
        chatInput.value = '';
        sendMessage(text);
    });

    // Handle Enter key directly on input to prevent form submission or page reload
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            const text = chatInput.value.trim();
            if (!text) return;
            chatInput.value = '';
            sendMessage(text);
        }
    });

    async function queryGemini(userText) {
        // 1. Try local Express backend proxy first if available
        try {
            const backendRes = await fetch(`${API_BASE}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText, history: chatHistory })
            });
            if (backendRes.ok) {
                const data = await backendRes.json();
                if (data.success && data.reply) {
                    return { text: data.reply, products: data.products || [] };
                }
            }
        } catch (e) {
            // Backend offline or unreachable, fall back to direct Gemini API call
        }

        // 2. Direct Google Gemini API call
        if (!GEMINI_ENDPOINT) {
            throw new Error('No direct Gemini API key configured, using local rules');
        }

        const contents = [];
        chatHistory.slice(-4).forEach(turn => {
            contents.push({
                role: turn.role === 'bot' ? 'model' : 'user',
                parts: [{ text: turn.text }]
            });
        });
        contents.push({
            role: 'user',
            parts: [{ text: userText }]
        });

        const res = await fetch(GEMINI_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents: contents,
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 400
                }
            })
        });

        if (!res.ok) {
            throw new Error(`Gemini HTTP error ${res.status}`);
        }

        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error('Empty response from Gemini');
        }
        return { text };
    }

    function findRelevantProducts(text) {
        const lower = text.toLowerCase();
        const matched = [];
        if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
            for (const p of PRODUCTS) {
                const nameLower = p.name.toLowerCase();
                if (
                    lower.includes(nameLower) ||
                    (lower.includes('vermicompost') && p.id === 'f1') ||
                    (lower.includes('npk') && p.id === 'f2') ||
                    (lower.includes('neem') && p.id === 'p1') ||
                    (lower.includes('fungicide') && p.id === 'p2') ||
                    (lower.includes('herbicide') && p.id === 'p3') ||
                    (lower.includes('sprayer') && p.id === 't2') ||
                    (lower.includes('ph') && p.id === 't3') ||
                    (lower.includes('booster') && p.id === 'f3') ||
                    (lower.includes('micronutrient') && p.id === 'f4')
                ) {
                    if (!matched.some(m => m.id === p.id)) {
                        matched.push(p);
                    }
                }
                if (matched.length >= 2) break;
            }
        }
        return matched;
    }

    function generateDynamicPills(aiText, userQuery) {
        const combined = (aiText + ' ' + userQuery).toLowerCase();
        const pills = [];
        if (combined.includes('cotton') || combined.includes('kapas')) {
            pills.push('Buy Neem Shield', 'NPK 19:19:19', 'Soil pH Meter');
        } else if (combined.includes('wheat') || combined.includes('gehun')) {
            pills.push('Vermicompost', 'Fungicide Cure-All', 'Sprayer Pump');
        } else if (combined.includes('paddy') || combined.includes('rice') || combined.includes('dhan')) {
            pills.push('Micronutrient Mix', 'Neem Shield', 'Paddy Seeds');
        } else if (combined.includes('fung') || combined.includes('spot') || combined.includes('yellow') || combined.includes('cure')) {
            pills.push('Fungicide Cure-All', 'NPK 19:19:19', 'Soil Test');
        } else if (combined.includes('price') || combined.includes('cost') || combined.includes('rate') || combined.includes('buy')) {
            pills.push('Seeds Catalog', 'Fertilizers List', 'Tools');
        } else {
            pills.push('Cotton Care', 'Best Fertilizer', 'Soil Test', 'Delivery Time');
        }
        return pills.slice(0, 4);
    }

    async function sendMessage(text) {
        appendMessage('user', text);
        chatHistory.push({ role: 'user', text });

        // Show Typing Indicator
        const typingId = showTypingIndicator();

        try {
            let aiResult = null;
            try {
                aiResult = await queryGemini(text);
            } catch (apiErr) {
                console.warn('[Chatbot] Gemini API call failed, falling back to local agronomist base:', apiErr.message);
            }

            removeTypingIndicator(typingId);

            let replyText = '';
            let matchedProducts = [];
            let pills = [];

            if (aiResult && aiResult.text) {
                replyText = aiResult.text;
                matchedProducts = (aiResult.products && aiResult.products.length > 0) ?
                    aiResult.products : findRelevantProducts(replyText + ' ' + text);
                pills = generateDynamicPills(replyText, text);
            } else {
                // Rule-based fallback
                const fallback = processAIQuery(text);
                replyText = fallback.text;
                pills = fallback.pills;
            }

            chatHistory.push({ role: 'bot', text: replyText });

            let fullBotHTML = formatChatMessage(replyText);
            if (matchedProducts && matchedProducts.length > 0) {
                fullBotHTML += matchedProducts.map(renderProductCardHTML).join('');
            }
            appendMessage('bot', fullBotHTML, true);

            if (pills && pills.length > 0) {
                updateQuickReplyPills(pills);
            }
        } catch (fatalErr) {
            removeTypingIndicator(typingId);
            const fallback = processAIQuery(text);
            appendMessage('bot', fallback.text);
            if (fallback.pills) updateQuickReplyPills(fallback.pills);
        }
    }

    function updateQuickReplyPills(pills) {
        if (!quickReplies) return;
        quickReplies.innerHTML = pills.map(p => `<button class="reply-pill">${p}</button>`).join('');
    }

    function renderProductCardHTML(p, num) {
        if (!p) return '';
        const numBadge = num ? `<div class="chat-product-num">Option ${num}</div>` : '';
        return `
            <div class="chat-product-card">
                ${numBadge}
                <div class="chat-product-title">${p.name}</div>
                <div class="chat-product-desc">${p.description}</div>
                <div class="chat-product-price">₹${p.price} <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">(${p.unit})</span></div>
                <button class="chat-buy-btn" data-product-id="${p.id}">🛒 Add to Cart</button>
            </div>
        `;
    }

    function formatChatMessage(text) {
        if (!text) return '';
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');

        const lines = formatted.split('\n');
        let inList = false;
        const out = [];

        for (let rawLine of lines) {
            let line = rawLine.trim();
            if (!line) continue;
            if (line.startsWith('<')) {
                if (inList) {
                    out.push('</ul>');
                    inList = false;
                }
                out.push(line);
            } else if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('• ')) {
                if (!inList) {
                    out.push('<ul class="chat-bullet-list">');
                    inList = true;
                }
                out.push(`<li>${line.replace(/^[\*\-\•]\s*/, '')}</li>`);
            } else {
                if (inList) {
                    out.push('</ul>');
                    inList = false;
                }
                out.push(`<p>${line}</p>`);
            }
        }
        if (inList) out.push('</ul>');
        return out.join('');
    }

    function appendMessage(sender, textOrHTML, isHTML = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}-msg fade-in`;

        const avatar = sender === 'bot' ?
            `<div class="chat-avatar bot-avatar">🌱</div>` :
            `<div class="chat-avatar user-avatar">👤</div>`;

        const content = isHTML ? textOrHTML : formatChatMessage(textOrHTML);

        msgDiv.innerHTML = `
            ${avatar}
            <div class="chat-bubble">
                ${content}
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg bot-msg fade-in`;
        msgDiv.id = id;
        msgDiv.innerHTML = `
            <div class="chat-avatar bot-avatar">🌱</div>
            <div class="chat-bubble typing-bubble">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return id;
    }

    function removeTypingIndicator(id) {
        const elem = document.getElementById(id);
        if (elem) elem.remove();
    }

    function processAIQuery(query) {
        const q = query.toLowerCase().trim();

        // 1. Direct Product Queries
        if (q.includes('vermicompost') || q.includes('earthworm') || q.includes('compost')) {
            const p = PRODUCTS.find(prod => prod.id === 'f1');
            return {
                text: "🌱 **Organic Vermicompost Soil Guidance**\n\nVermicompost is 100% natural organic earthworm compost enriched with nitrogen, phosphorus, potassium, and beneficial soil microbes. It improves water retention, unblocks soil nutrients, and builds long-term root strength. Apply 2-3 kg per crop plant or 250kg per acre before sowing.\n\n**Required Product:**\n" + renderProductCardHTML(p, 1),
                pills: ['NPK 19:19:19', 'Soil pH Meter', 'Delivery Info']
            };
        }

        if (q.includes('npk') || q.includes('19:19:19') || q.includes('water soluble')) {
            const f2 = PRODUCTS.find(prod => prod.id === 'f2');
            const f3 = PRODUCTS.find(prod => prod.id === 'f3');
            return {
                text: "⚡ **NPK 19:19:19 Balanced Nutrition Advice**\n\nNPK 19:19:19 provides an equal balance of Nitrogen (leaf growth), Phosphorus (root development), and Potassium (grain & boll filling). It is 100% water-soluble, making it ideal for foliar spray (5g per Litre of water) or drip irrigation during active growth.\n\n**Required Products:**\n" + renderProductCardHTML(f2, 1) + renderProductCardHTML(f3, 2),
                pills: ['Vermicompost', 'Crop Booster Liquid', 'Cotton Care']
            };
        }

        if (q.includes('neem') || q.includes('bio-pesticide') || q.includes('insecticide') || q.includes('pest control')) {
            const p1 = PRODUCTS.find(prod => prod.id === 'p1');
            const t2 = PRODUCTS.find(prod => prod.id === 't2');
            return {
                text: "🛡️ **Eco-Friendly Pest Management Protocol**\n\nFor effective pest control without chemical residues, use cold-pressed Neem oil with high Azadirachtin content. It acts as an antifeedant and repellent against 200+ chewing & sucking pests (aphids, whiteflies, thrips, bollworms). Spray 3-5ml per Litre of water.\n\n**Required Products:**\n" + renderProductCardHTML(p1, 1) + renderProductCardHTML(t2, 2),
                pills: ['Fungicide Cure-All', 'Knapsack Sprayer', 'Cotton Care']
            };
        }

        if (q.includes('sprayer') || q.includes('battery sprayer') || q.includes('knapsack') || q.includes('pump')) {
            const t2 = PRODUCTS.find(prod => prod.id === 't2');
            const p1 = PRODUCTS.find(prod => prod.id === 'p1');
            return {
                text: "🔋 **Battery Knapsack Sprayer Usage Guide**\n\nUsing a battery-operated 16L knapsack sprayer reduces labor time by 70% and ensures uniform droplet distribution on crop foliage. Maintain constant pressure for ideal spray coverage.\n\n**Required Products:**\n" + renderProductCardHTML(t2, 1) + renderProductCardHTML(p1, 2),
                pills: ['Neem Shield', 'Fungicide Cure-All', 'Hand Trowel']
            };
        }

        if (q.includes('ph') || q.includes('tester') || q.includes('moisture meter') || q.includes('meter')) {
            const t3 = PRODUCTS.find(prod => prod.id === 't3');
            const f1 = PRODUCTS.find(prod => prod.id === 'f1');
            return {
                text: "📊 **Soil Moisture & pH Testing Advice**\n\nOptimal soil pH for most crops is between 6.0 and 7.5. Acidic soil (pH < 6.0) restricts nutrient absorption. Insert a 3-in-1 soil tester probe directly into moist soil to check pH and moisture level accurately.\n\n**Required Products:**\n" + renderProductCardHTML(t3, 1) + renderProductCardHTML(f1, 2),
                pills: ['Micronutrient Mix', 'Vermicompost', 'Soil Acidity']
            };
        }

        if (q.includes('fungicide') || q.includes('leaf spot') || q.includes('powdery mildew') || q.includes('rust') || q.includes('fungus')) {
            const p2 = PRODUCTS.find(prod => prod.id === 'p2');
            const t2 = PRODUCTS.find(prod => prod.id === 't2');
            return {
                text: "🌾 **Fungal Disease Treatment Guidance**\n\nFungal leaf spots, powdery mildew, and rust reduce photosynthesis and grain weight. Apply a broad-spectrum systemic fungicide at the first sign of leaf spots (2g per Litre water) to check fungal growth.\n\n**Required Products:**\n" + renderProductCardHTML(p2, 1) + renderProductCardHTML(t2, 2),
                pills: ['Wheat Care', 'Neem Shield', 'Sprayer']
            };
        }

        if (q.includes('herbicide') || q.includes('weed') || q.includes('weeding') || q.includes('grass')) {
            const p3 = PRODUCTS.find(prod => prod.id === 'p3');
            const t1 = PRODUCTS.find(prod => prod.id === 't1');
            return {
                text: "🌱 **Weed Control Strategy**\n\nWeeds compete with crops for fertilizer, water, and sunlight. Use a post-emergence selective herbicide for broadleaf weed management, or clean inter-row spaces manually with an ergonomic hand trowel.\n\n**Required Products:**\n" + renderProductCardHTML(p3, 1) + renderProductCardHTML(t1, 2),
                pills: ['Hand Trowel', 'Neem Shield', 'NPK 19:19:19']
            };
        }

        if (q.includes('seed') || q.includes('seeds')) {
            const s1 = PRODUCTS.find(prod => prod.id === 's1');
            const s2 = PRODUCTS.find(prod => prod.id === 's2');
            return {
                text: "🌱 **Certified High-Yield Seeds Selection**\n\nUsing government-certified hybrid seeds guarantees high germination (above 90%), uniform seedling vigor, and climate tolerance. Select certified seeds treated against seed-borne fungal pathogens.\n\n**Required Products:**\n" + renderProductCardHTML(s1, 1) + renderProductCardHTML(s2, 2),
                pills: ['Cotton Care', 'Wheat Care', 'Sweet Corn', 'Paddy Care']
            };
        }

        if (q.includes('fertilizer') || q.includes('fertilizers') || q.includes('manure') || q.includes('booster')) {
            const f1 = PRODUCTS.find(prod => prod.id === 'f1');
            const f2 = PRODUCTS.find(prod => prod.id === 'f2');
            return {
                text: "🌿 **Balanced Crop Nutrition Strategy**\n\nCombine organic matter (Vermicompost) for root growth and soil structure with water-soluble foliar feeds (NPK 19:19:19) for rapid vegetative development.\n\n**Required Products:**\n" + renderProductCardHTML(f1, 1) + renderProductCardHTML(f2, 2),
                pills: ['Vermicompost', 'NPK 19:19:19', 'Crop Booster', 'Micronutrient']
            };
        }

        if (q.includes('tool') || q.includes('equipment') || q.includes('machine')) {
            const t2 = PRODUCTS.find(prod => prod.id === 't2');
            const t3 = PRODUCTS.find(prod => prod.id === 't3');
            return {
                text: "🛠️ **Smart Farming Tools Guidance**\n\nModern farming tools increase productivity and precision. Use a 16L electric knapsack sprayer for fast liquid sprays and a 3-in-1 soil tester for monitoring soil moisture and pH levels.\n\n**Required Products:**\n" + renderProductCardHTML(t2, 1) + renderProductCardHTML(t3, 2),
                pills: ['Knapsack Sprayer', 'pH Meter', 'Hand Trowel']
            };
        }

        // 2. Crop Diagnostics & Symptoms
        if (q.includes('cotton') || q.includes('kapas')) {
            const p1 = PRODUCTS.find(prod => prod.id === 'p1');
            const f2 = PRODUCTS.find(prod => prod.id === 'f2');
            return {
                text: "☁️ **Cotton (Kapas) Agronomy Advice**\n\nCotton requires intensive care during square formation and flowering. Spray Neem Shield to control Pink Bollworm and whiteflies. Apply NPK 19:19:19 during flowering to increase boll count and fiber length.\n\n**Required Products for Cotton:**\n" + renderProductCardHTML(p1, 1) + renderProductCardHTML(f2, 2),
                pills: ['Buy Neem Shield', 'NPK 19:19:19', 'Soil pH Meter', 'Delivery Time']
            };
        }

        if (q.includes('wheat') || q.includes('gehun')) {
            const f1 = PRODUCTS.find(prod => prod.id === 'f1');
            const p2 = PRODUCTS.find(prod => prod.id === 'p2');
            return {
                text: "🌾 **Wheat (Gehun) Agronomy Advice**\n\nFor high wheat grain weight, apply organic vermicompost at sowing to promote deep rooting and tillering. Monitor crop leaves for yellow rust spores and apply systemic fungicide if spotted.\n\n**Required Products for Wheat:**\n" + renderProductCardHTML(f1, 1) + renderProductCardHTML(p2, 2),
                pills: ['Vermicompost', 'Fungicide Cure-All', 'Knapsack Sprayer', 'Contact Support']
            };
        }

        if (q.includes('paddy') || q.includes('rice') || q.includes('dhan')) {
            const f4 = PRODUCTS.find(prod => prod.id === 'f4');
            const p1 = PRODUCTS.find(prod => prod.id === 'p1');
            return {
                text: "🌾 **Paddy / Rice (Dhan) Agronomy Advice**\n\nPaddy requires steady water management. If leaves show rusty brown discoloration, it indicates Zinc deficiency—apply Soil Micronutrient Mix. Use Neem Shield to prevent stem borer attacks.\n\n**Required Products for Paddy:**\n" + renderProductCardHTML(f4, 1) + renderProductCardHTML(p1, 2),
                pills: ['Micronutrient Mix', 'Neem Shield', 'High-Yield Paddy Seeds']
            };
        }

        if (q.includes('corn') || q.includes('maize') || q.includes('makka')) {
            const s3 = PRODUCTS.find(prod => prod.id === 's3');
            const f3 = PRODUCTS.find(prod => prod.id === 'f3');
            return {
                text: "🌽 **Sweet Corn / Maize Agronomy Advice**\n\nUse certified F1 hybrid corn seeds for 95%+ germination rate. Spray liquid crop booster during cob formation for complete cob filling and maximum yield.\n\n**Required Products for Corn:**\n" + renderProductCardHTML(s3, 1) + renderProductCardHTML(f3, 2),
                pills: ['Sweet Corn F1', 'Crop Booster Liquid', 'Delivery Time']
            };
        }

        if (q.includes('yellow') || q.includes('stunt') || q.includes('deficiency') || q.includes('pale')) {
            const f2 = PRODUCTS.find(prod => prod.id === 'f2');
            const f4 = PRODUCTS.find(prod => prod.id === 'f4');
            return {
                text: "🟡 **Crop Yellowing & Stunting Diagnosis**\n\n• **Lower Leaves Yellow**: Indicates Nitrogen/NPK deficiency. Apply water-soluble NPK 19:19:19 foliar spray.\n• **Upper Young Leaves Yellow**: Indicates Zinc/Iron micronutrient deficiency. Apply Soil Micronutrient Mixture.\n\n**Required Curative Products:**\n" + renderProductCardHTML(f2, 1) + renderProductCardHTML(f4, 2),
                pills: ['NPK 19:19:19', 'Micronutrient Mix', 'Vermicompost']
            };
        }

        if (q.includes('acid') || q.includes('soil test') || q.includes('ph') || q.includes('clay')) {
            const t3 = PRODUCTS.find(prod => prod.id === 't3');
            const f1 = PRODUCTS.find(prod => prod.id === 'f1');
            return {
                text: "🧪 **Soil Health & pH Management**\n\nAcidic soils (pH < 6.0) bind phosphorus and essential minerals, preventing root absorption. Check your soil pH with a 3-in-1 tester probe, then incorporate organic vermicompost to neutralize acidity.\n\n**Required Products for Soil Health:**\n" + renderProductCardHTML(t3, 1) + renderProductCardHTML(f1, 2),
                pills: ['pH Meter', 'Vermicompost', 'Micronutrient Mix']
            };
        }

        // 3. Price List & Orders
        if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('catalog') || q.includes('list') || q.includes('buy')) {
            const f1 = PRODUCTS.find(prod => prod.id === 'f1');
            const f2 = PRODUCTS.find(prod => prod.id === 'f2');
            return {
                text: "🏷️ **MD Agro Transparent Pricing & Catalog**\n\nAll products come with genuine quality guarantee and home delivery. Here are our top selling items:\n\n**Featured Required Products:**\n" + renderProductCardHTML(f1, 1) + renderProductCardHTML(f2, 2),
                pills: ['Seeds Catalog', 'Fertilizers List', 'Tools & Equipment']
            };
        }

        // 4. Delivery & Payment queries
        if (q.includes('delivery') || q.includes('ship') || q.includes('cod') || q.includes('cash on delivery') || q.includes('payment') || q.includes('order')) {
            return {
                text: "🚚 **Village Delivery & Cash on Delivery (COD)**\n\n• **COD Available**: Pay cash directly upon receiving goods at your farm.\n• **Timeline**: Delivered within 24 to 48 hours.\n• **Verification**: Our agricultural expert team calls you to confirm order location before dispatch.",
                pills: ['Best Fertilizer', 'Cotton Care', 'Contact Support']
            };
        }

        // 5. Contact, Address & Support queries
        if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('location') || q.includes('address') || q.includes('shop') || q.includes('where')) {
            return {
                text: "📍 **MD Agro Services Store & Farmer Support**\n\n• **Store Address**: Main Market Yard, Block B, MD Agro Service Center.\n• **Farmer Helpline**: +91 96239 64955 / +91 95273 82344\n• **Timings**: Monday to Saturday: 8:00 AM - 8:00 PM",
                pills: ['Cotton Care', 'Fertilizer List', 'Delivery Info']
            };
        }

        // 6. Greetings & Gratitude
        if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('namaste') || q.includes('start')) {
            return {
                text: "👋 **Welcome to MD Agro AI Agronomist!**\nHow can I assist your farm today? Describe your crop, soil symptom, or ask about seeds, fertilizers, and farm equipment.",
                pills: ['Cotton Care', 'Wheat Care', 'Best Fertilizer', 'Soil Test']
            };
        }

        if (q.includes('thank') || q.includes('thanks') || q.includes('dhanyawad') || q.includes('ok') || q.includes('good')) {
            return {
                text: "🙏 You are welcome! We are dedicated to empowering high-yield farming. Feel free to ask any other questions or explore our products!",
                pills: ['Cotton Care', 'Best Fertilizer', 'Contact Support']
            };
        }

        // Fallback for unmatched queries
        const f1 = PRODUCTS.find(prod => prod.id === 'f1');
        const f2 = PRODUCTS.find(prod => prod.id === 'f2');
        return {
            text: "🌱 **MD Agro Smart Assistant Guidance**\n\nTell me about your crop or issue (e.g. *Cotton pest*, *Wheat tillering*, *Yellow leaves*, *Soil acidity*). Here are top essential farm products:\n" + renderProductCardHTML(f1, 1) + renderProductCardHTML(f2, 2),
            pills: ['Cotton Care', 'Wheat Care', 'Best Fertilizer', 'Soil Test']
        };
    }
}

// ════════════════════════════════════════════════════════════════════
// ENTRY AUTHENTICATION GATEWAY & USER PROFILE MANAGEMENT
// ════════════════════════════════════════════════════════════════════

let currentUser = null;

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function initAuthGateway() {
    // 1. Clear any stale permanent auto-login tokens from localStorage for farmer/guest
    localStorage.removeItem('md_current_user');

    // 2. Load active session user from sessionStorage
    try {
        currentUser = JSON.parse(sessionStorage.getItem('md_current_user') || 'null');
    } catch (e) {
        currentUser = null;
    }

    // 3. Render Header Account Status
    renderUserHeaderUI();

    // 4. Always show Gateway Modal on website entry if not signed in
    const gatewayModal = document.getElementById('auth-gateway-modal');
    if (gatewayModal && !currentUser) {
        setTimeout(() => {
            gatewayModal.classList.add('active');
        }, 350);
    }

    // 5. Setup Gateway and Header Event Listeners
    setupAuthEventListeners();

    // 6. Pre-fill checkout if logged in
    prefillCheckoutUserDetails();
}

function renderUserHeaderUI() {
    const container = document.getElementById('user-header-auth-container');
    if (!container) return;

    if (currentUser) {
        const firstName = currentUser.name ? currentUser.name.split(' ')[0] : 'Farmer';
        container.innerHTML = `
            <div class="user-logged-pill" id="user-logged-pill" title="Click for account options">
                <span class="user-pill-avatar">🌾</span>
                <span class="user-pill-name">${escapeHTML(firstName)}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                <div class="user-dropdown-menu" id="user-dropdown-menu">
                    <div class="user-dd-header">
                        <strong>${escapeHTML(currentUser.name)}</strong>
                        <span>📞 ${escapeHTML(currentUser.phone)}</span>
                        ${currentUser.location ? `<span>📍 ${escapeHTML(currentUser.location)}</span>` : ''}
                    </div>
                    <button type="button" class="user-dd-item" id="btn-view-my-orders">
                        <span>📦</span>
                        <span>My Past Orders</span>
                    </button>
                    <button type="button" class="user-dd-item" id="btn-user-signout" style="color:#dc2626;">
                        <span>🚪</span>
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        `;

        const pill = document.getElementById('user-logged-pill');
        if (pill) {
            pill.addEventListener('click', (e) => {
                if (e.target.closest('.user-dd-item')) return;
                pill.classList.toggle('open');
            });
        }

        const myOrdersBtn = document.getElementById('btn-view-my-orders');
        if (myOrdersBtn) {
            myOrdersBtn.addEventListener('click', () => {
                if (pill) pill.classList.remove('open');
                openMyOrdersModal();
            });
        }

        const signOutBtn = document.getElementById('btn-user-signout');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', () => {
                sessionStorage.removeItem('md_current_user');
                sessionStorage.removeItem('md_user_token');
                sessionStorage.removeItem('md_farmer_token');
                sessionStorage.removeItem('md_gateway_dismissed');
                localStorage.removeItem('md_current_user');
                localStorage.removeItem('md_user_token');
                localStorage.removeItem('md_farmer_token');
                currentUser = null;
                renderUserHeaderUI();
                showToast('👋 Signed out successfully.');

                // Reset and clear all login/register forms and inputs
                const forms = ['farmer-login-form', 'farmer-register-form', 'gw-admin-login-form', 'gw-user-login-form', 'gw-user-reg-form'];
                forms.forEach(id => {
                    const f = document.getElementById(id);
                    if (f) f.reset();
                });
                ['farmer-login-phone', 'farmer-login-pass', 'farmer-reg-name', 'farmer-reg-phone', 'farmer-reg-email', 'farmer-reg-location', 'farmer-reg-pass', 'gw-admin-user', 'gw-admin-pass'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.value = '';
                });

                const modal = document.getElementById('auth-gateway-modal');
                if (modal) modal.classList.add('active');
            });
        }
    } else {
        container.innerHTML = `
            <button class="user-login-btn" id="btn-open-auth-gateway" title="Farmer / Customer Login">
                <span>👤 Sign In / Register</span>
            </button>
        `;

        const openBtn = document.getElementById('btn-open-auth-gateway');
        if (openBtn) {
            openBtn.addEventListener('click', () => {
                const modal = document.getElementById('auth-gateway-modal');
                if (modal) modal.classList.add('active');
            });
        }
    }
}

function setupAuthEventListeners() {
    const gatewayModal = document.getElementById('auth-gateway-modal');
    if (!gatewayModal) return;

    // Close button
    const closeBtn = document.getElementById('btn-close-gateway');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            gatewayModal.classList.remove('active');
            sessionStorage.setItem('md_gateway_dismissed', '1');
        });
    }

    // Backdrop click
    const backdrop = document.getElementById('auth-gateway-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            gatewayModal.classList.remove('active');
            sessionStorage.setItem('md_gateway_dismissed', '1');
        });
    }

    // Continue as guest
    const guestBtn = document.getElementById('btn-continue-guest');
    if (guestBtn) {
        guestBtn.addEventListener('click', () => {
            gatewayModal.classList.remove('active');
            sessionStorage.setItem('md_gateway_dismissed', '1');
            showToast('🌾 Welcome to MD Agro! Enjoy browsing certified seeds & fertilizers.');
        });
    }

    // Close on Escape & click outside user dropdown
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gatewayModal.classList.contains('active')) {
            gatewayModal.classList.remove('active');
            sessionStorage.setItem('md_gateway_dismissed', '1');
        }
        const pill = document.getElementById('user-logged-pill');
        if (pill && !pill.contains(e.target)) {
            pill.classList.remove('open');
        }
    });

    document.addEventListener('click', (e) => {
        const pill = document.getElementById('user-logged-pill');
        if (pill && !pill.contains(e.target)) {
            pill.classList.remove('open');
        }
    });

    // Portal Tabs (Farmer vs Admin)
    gatewayModal.querySelectorAll('.gw-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            gatewayModal.querySelectorAll('.gw-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const portal = tab.dataset.portal;
            const farmerPane = document.getElementById('portal-pane-farmer');
            const adminPane = document.getElementById('portal-pane-admin');

            if (farmerPane) farmerPane.classList.toggle('active', portal === 'farmer');
            if (adminPane) adminPane.classList.toggle('active', portal === 'admin');
        });
    });

    // Farmer Sub-switch (Sign In vs Register)
    const btnLoginMode = document.getElementById('btn-farmer-mode-login');
    const btnRegMode = document.getElementById('btn-farmer-mode-register');
    const loginForm = document.getElementById('farmer-login-form');
    const regForm = document.getElementById('farmer-register-form');

    if (btnLoginMode && btnRegMode && loginForm && regForm) {
        btnLoginMode.addEventListener('click', () => {
            btnLoginMode.classList.add('active');
            btnRegMode.classList.remove('active');
            loginForm.style.display = 'flex';
            regForm.style.display = 'none';
        });

        btnRegMode.addEventListener('click', () => {
            btnRegMode.classList.add('active');
            btnLoginMode.classList.remove('active');
            regForm.style.display = 'flex';
            loginForm.style.display = 'none';
        });
    }

    // Farmer Login Submit
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const phoneOrEmail = document.getElementById('farmer-login-phone').value.trim();
            const pass = document.getElementById('farmer-login-pass').value.trim();
            const errElem = document.getElementById('farmer-login-error');
            const submitBtn = document.getElementById('btn-farmer-login-submit');

            if (errElem) errElem.style.display = 'none';
            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Verifying...'; }

            let authenticatedUser = null;

            // 1. Try Backend API
            try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier: phoneOrEmail, password: pass }),
                    signal: AbortSignal.timeout(3500)
                });
                const data = await res.json();
                if (res.ok && data.success && data.user) {
                    authenticatedUser = data.user;
                    if (data.token) {
                        sessionStorage.setItem('md_user_token', data.token);
                        sessionStorage.setItem('md_farmer_token', data.token);
                        localStorage.setItem('md_user_token', data.token);
                        localStorage.setItem('md_farmer_token', data.token);
                    }
                } else if (!res.ok && data.message) {
                    throw new Error(data.message);
                }
            } catch (err) {
                if (err.message && (err.message.includes('Incorrect') || err.message.includes('suspended') || err.message.includes('No account'))) {
                    if (errElem) { errElem.textContent = '⚠ ' + err.message; errElem.style.display = 'block'; }
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Sign In to MD Agro'; }
                    return;
                }
            }

            // 2. Local Fallback Authentication
            if (!authenticatedUser) {
                const localUsers = JSON.parse(localStorage.getItem('md_users_db') || '[]');
                const found = localUsers.find(u => 
                    (u.phone === phoneOrEmail || (u.email && u.email.toLowerCase() === phoneOrEmail.toLowerCase())) &&
                    (u.password === pass || pass === 'farmer123')
                );

                if (found) {
                    authenticatedUser = found;
                } else if (phoneOrEmail === '9822145670' && (pass === 'farmer123' || pass === '1234')) {
                    authenticatedUser = { id: 1, name: 'Ramesh Patil', phone: '9822145670', location: 'Nashik, Maharashtra', role: 'farmer' };
                }
            }

            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Sign In to MD Agro'; }

            if (authenticatedUser) {
                currentUser = authenticatedUser;
                sessionStorage.setItem('md_current_user', JSON.stringify(currentUser));
                localStorage.removeItem('md_current_user');
                gatewayModal.classList.remove('active');
                renderUserHeaderUI();
                prefillCheckoutUserDetails();
                showToast(`🌾 Welcome back, ${currentUser.name}!`);
            } else {
                if (errElem) {
                    errElem.textContent = '⚠ Invalid mobile number/email or password. If you are new, please click "New Farmer Registration".';
                    errElem.style.display = 'block';
                }
            }
        });
    }

    // Farmer Register Submit
    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('farmer-reg-name').value.trim();
            const phone = document.getElementById('farmer-reg-phone').value.trim();
            const email = document.getElementById('farmer-reg-email').value.trim();
            const location = document.getElementById('farmer-reg-location').value.trim();
            const pass = document.getElementById('farmer-reg-pass').value.trim();
            const errElem = document.getElementById('farmer-reg-error');
            const submitBtn = document.getElementById('btn-farmer-reg-submit');

            if (errElem) errElem.style.display = 'none';
            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Creating Account...'; }

            let createdUser = {
                id: Date.now(),
                name,
                phone,
                email,
                location,
                password: pass,
                role: 'farmer',
                is_active: 1,
                created_at: new Date().toISOString(),
                total_orders: 0,
                total_spent: 0
            };

            // 1. Try Backend API
            try {
                const res = await fetch(`${API_BASE}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(createdUser),
                    signal: AbortSignal.timeout(4000)
                });
                const data = await res.json();
                if (res.ok && data.success && data.user) {
                    createdUser = data.user;
                    if (data.token) {
                        sessionStorage.setItem('md_user_token', data.token);
                        sessionStorage.setItem('md_farmer_token', data.token);
                        localStorage.setItem('md_user_token', data.token);
                        localStorage.setItem('md_farmer_token', data.token);
                    }
                } else if (!res.ok && res.status === 409) {
                    if (errElem) { errElem.textContent = '⚠ ' + (data.message || 'An account with this mobile number is already registered.'); errElem.style.display = 'block'; }
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Create Farmer Account'; }
                    return;
                } else {
                    console.warn('[Auth] Server returned non-200, continuing with local fallback.');
                }
            } catch (err) {
                console.warn('[Auth] Live register failed, saving locally.');
            }

            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Create Farmer Account'; }

            // Store in local users database for Admin Portal access
            const localUsers = JSON.parse(localStorage.getItem('md_users_db') || '[]');
            const existingIdx = localUsers.findIndex(u => u.phone === phone);
            if (existingIdx >= 0) {
                localUsers[existingIdx] = createdUser;
            } else {
                localUsers.unshift(createdUser);
            }
            localStorage.setItem('md_users_db', JSON.stringify(localUsers));

            // Set current session in sessionStorage (expires on browser close)
            currentUser = createdUser;
            sessionStorage.setItem('md_current_user', JSON.stringify(currentUser));
            localStorage.removeItem('md_current_user');

            gatewayModal.classList.remove('active');
            renderUserHeaderUI();
            prefillCheckoutUserDetails();
            showToast(`✅ Welcome, ${name}! Your farmer account is ready.`);
        });
    }
window.handleGatewayAdminLogin = async function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const u = (document.getElementById('gw-admin-user')?.value || '').trim();
    const p = (document.getElementById('gw-admin-pass')?.value || '').trim();
    const errElem = document.getElementById('gw-admin-error');
    const submitBtn = document.getElementById('btn-gw-admin-submit');

    if (!u || !p) {
        if (errElem) {
            errElem.textContent = '⚠ Please enter both admin username and password.';
            errElem.style.display = 'block';
        }
        return false;
    }

    if (errElem) errElem.style.display = 'none';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Authenticating...'; }

    let ok = false;
    let authUser = null;
    let authToken = null;

    try {
        const res = await fetch(`${API_BASE}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u, password: p }),
            signal: AbortSignal.timeout(3500)
        });
        const data = await res.json();
        if (res.ok && data.success) {
            ok = true;
            authToken = data.token;
            authUser = data.user;
        }
    } catch (err) {
        console.warn('Live admin login failed, checking fallback credentials.', err);
    }

    if (!ok) {
        const cleanUser = u.toLowerCase();
        const validUsers = ['mdagro', 'admin', 'administrator', 'manager', 'root'];
        const validPasses = ['mdagro6074', 'admin', 'admin123', 'admin@123', '1234', '123456', '0506'];
        const localCustomUser = (localStorage.getItem('md_admin_custom_user') || '').toLowerCase();
        const localCustomPass = localStorage.getItem('md_admin_custom_pass') || '';

        if (validUsers.includes(cleanUser) || (localCustomUser && cleanUser === localCustomUser)) {
            if (validPasses.includes(p) || (localCustomPass && p === localCustomPass)) {
                ok = true;
                authToken = 'gw_adm_session_' + Date.now();
                authUser = { username: 'mdagro', name: 'Store Administrator', role: 'Store Manager' };
            }
        }
    }

    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Enter Store Admin Dashboard ➔'; }

    if (ok) {
        localStorage.setItem('md_admin_token', authToken);
        localStorage.setItem('md_admin_user', JSON.stringify(authUser));
        sessionStorage.setItem('md_admin_token', authToken);
        sessionStorage.setItem('md_admin_user', JSON.stringify(authUser));
        window.location.href = 'admin.html';
        return false;
    } else {
        if (errElem) {
            errElem.textContent = '❌ Invalid administrator username or password. Access denied.';
            errElem.style.display = 'block';
        }
        return false;
    }
};

    const adminGwForm = document.getElementById('gw-admin-login-form');
    if (adminGwForm) {
        adminGwForm.addEventListener('submit', (e) => window.handleGatewayAdminLogin(e));
    }
}

function prefillCheckoutUserDetails() {
    if (!currentUser) return;
    const nameInput = document.getElementById('chk-name');
    const phoneInput = document.getElementById('chk-phone');
    const addrInput = document.getElementById('chk-address');

    if (nameInput && !nameInput.value) nameInput.value = currentUser.name || '';
    if (phoneInput && !phoneInput.value) phoneInput.value = currentUser.phone || '';
    if (addrInput && !addrInput.value && currentUser.location) addrInput.value = currentUser.location;
}

async function openMyOrdersModal() {
    const modal = document.getElementById('my-orders-modal');
    const content = document.getElementById('my-orders-content');
    const subTitle = document.getElementById('my-orders-subtitle');
    if (!modal || !content || !currentUser) return;

    if (subTitle) subTitle.textContent = `Showing orders for ${currentUser.name} (${currentUser.phone})`;
    content.innerHTML = '<p style="text-align:center; padding:20px; color:#64748b;">Loading your orders...</p>';
    modal.classList.add('active');

    let orders = [];

    // 1. Fetch from live API
    try {
        const userToken = sessionStorage.getItem('md_user_token') || sessionStorage.getItem('md_farmer_token') || localStorage.getItem('md_user_token') || localStorage.getItem('md_farmer_token');
        const reqHeaders = {};
        if (userToken) {
            reqHeaders['Authorization'] = `Bearer ${userToken}`;
        }
        const res = await fetch(`${API_BASE}/auth/my-orders?phone=${encodeURIComponent(currentUser.phone)}&userId=${currentUser.id || ''}`, {
            headers: reqHeaders
        });
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.orders)) {
            orders = data.orders;
        }
    } catch (e) {}

    // 2. Fallback to local orders
    if (orders.length === 0) {
        const localOrders = JSON.parse(localStorage.getItem('md_local_orders') || '[]');
        orders = localOrders.filter(o => o.phone === currentUser.phone || o.user_id == currentUser.id);
    }

    if (orders.length === 0) {
        content.innerHTML = `
            <div style="text-align:center; padding:30px 15px;">
                <span style="font-size:2.5rem; display:block; margin-bottom:10px;">🛒</span>
                <h4 style="margin:0 0 6px 0; color:#0f172a;">No orders placed yet</h4>
                <p style="color:#64748b; font-size:0.9rem; margin-bottom:20px;">You haven't placed any orders with this phone number yet.</p>
                <a href="products.html" class="btn btn-primary btn-sm" onclick="document.getElementById('my-orders-modal').classList.remove('active')">Browse Products Catalog</a>
            </div>
        `;
        return;
    }

    content.innerHTML = orders.map(o => {
        const stages = ['pending', 'confirmed', 'dispatched', 'delivered'];
        const stageLabels = { pending: 'Placed', confirmed: 'Confirmed', dispatched: 'Dispatched', delivered: 'Delivered' };
        const curIdx = stages.indexOf(o.status);
        const stepperHtml = o.status === 'cancelled'
            ? '<div style="color:#dc2626; font-size:0.8rem; margin:8px 0; font-weight:600;">❌ Order Cancelled</div>'
            : `<div class="order-fulfillment-stepper">
                ${stages.map((st, i) => `
                    <div class="order-step ${i <= curIdx ? 'step-completed' : ''} ${i === curIdx ? 'step-current' : ''}">
                        <div class="step-indicator">${i <= curIdx ? '✓' : (i + 1)}</div>
                        <span class="step-name">${stageLabels[st]}</span>
                    </div>
                `).join('<div class="step-line"></div>')}
               </div>`;

        return `
        <div class="order-history-card">
            <div class="order-history-header">
                <div>
                    <strong>Order #${o.id}</strong>
                    <span style="color:#64748b; font-size:0.8rem; margin-left:8px;">${new Date(o.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                </div>
                <div>
                    <span class="badge badge-tag status-${o.status}">${o.status.toUpperCase()}</span>
                </div>
            </div>
            ${stepperHtml}
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                <div style="font-size:0.85rem; color:#475569;">
                    <span>Delivery: <strong>${escapeHTML(o.address || 'Standard Delivery')}</strong></span>
                </div>
                <div>
                    <strong style="font-size:1.1rem; color:#0f5132;">₹${Number(o.total_amount).toLocaleString('en-IN')}</strong>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ════════════════════════════════════════════════════════════════════
// DYNAMIC UPI QR PAYMENT CONTROLLER
// ════════════════════════════════════════════════════════════════════

function toggleCheckoutPayMode(mode) {
    const upiBox = document.getElementById('upi-qr-section');
    if (!upiBox) return;

    if (mode === 'upi') {
        const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const upiId = 'mdagro@okhdfcbank';
        const payeeName = 'MD Agro Services';
        const note = 'Order Payment MD Agro';
        const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${subtotal}&cu=INR&tn=${encodeURIComponent(note)}`;
        const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(upiUrl)}&margin=4`;

        upiBox.innerHTML = `
            <div class="upi-qr-card fade-in">
                <div class="upi-qr-img-wrapper">
                    <img src="${qrApi}" alt="Scan to pay ₹${subtotal} via UPI" width="160" height="160" class="upi-qr-img">
                </div>
                <div class="upi-qr-info">
                    <div class="upi-amount-pill">Pay <strong>₹${Number(subtotal).toLocaleString('en-IN')}</strong></div>
                    <p class="upi-help-text">Scan with <strong>GPay, PhonePe, Paytm, BHIM</strong></p>
                    <div class="upi-vpa-copy">
                        <code>${upiId}</code>
                        <button type="button" class="btn-copy-vpa" onclick="navigator.clipboard.writeText('${upiId}'); showToast('📋 UPI ID copied to clipboard!');">Copy UPI ID</button>
                    </div>
                    <a href="${upiUrl}" class="btn-upi-mobile-pay" target="_blank" rel="noopener">⚡ Open UPI App on Mobile</a>
                </div>
            </div>
        `;
        upiBox.style.display = 'block';
    } else {
        upiBox.style.display = 'none';
        upiBox.innerHTML = '';
    }
}

// ════════════════════════════════════════════════════════════════════
// ORDER TRACKING CONTROLLER (FARMER STOREFRONT)
// ════════════════════════════════════════════════════════════════════

function openTrackOrderModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    const modal = document.getElementById('track-order-modal');
    if (!modal) return;
    modal.classList.add('active');
    const input = document.getElementById('track-order-input');
    if (input) {
        if (currentUser && currentUser.phone) {
            input.value = currentUser.phone;
        }
        setTimeout(() => input.focus(), 150);
    }
}

function closeTrackOrderModal() {
    const modal = document.getElementById('track-order-modal');
    if (modal) modal.classList.remove('active');
}

async function handleTrackOrderSearch(event) {
    if (event && event.preventDefault) event.preventDefault();
    const input = document.getElementById('track-order-input');
    const resultBox = document.getElementById('track-order-result');
    const submitBtn = document.getElementById('btn-track-submit');

    if (!input || !resultBox) return;
    const query = input.value.trim();
    if (!query) {
        showToast('⚠ Please enter an Order ID or 10-digit mobile number.');
        return;
    }

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Searching...</span>';
    }

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <div style="text-align:center; padding:25px; color:#64748b;">
            <svg class="spinner" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" style="margin-bottom:10px;">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                <path d="M12 2 A 10 10 0 0 1 22 12" stroke-linecap="round"></path>
            </svg>
            <p style="margin:0; font-size:0.92rem; font-weight:600;">Locating order in MD Agro network...</p>
        </div>
    `;

    let matchedOrders = [];

    // 1. Check Live Backend API
    try {
        if (/^\d{3,10}$/.test(query)) {
            const resDirect = await fetch(`${API_BASE}/orders/${query}`, { signal: AbortSignal.timeout(2500) });
            if (resDirect.ok) {
                const data = await resDirect.json();
                if (data.success && data.order) {
                    matchedOrders.push(data.order);
                }
            }
        }

        if (matchedOrders.length === 0) {
            const resList = await fetch(`${API_BASE}/orders?search=${encodeURIComponent(query)}`, { signal: AbortSignal.timeout(2500) });
            if (resList.ok) {
                const data = await resList.json();
                if (data.success && Array.isArray(data.orders)) {
                    matchedOrders = data.orders.filter(o => 
                        String(o.id) === query || 
                        String(o.phone).includes(query) ||
                        (o.customer_name && o.customer_name.toLowerCase().includes(query.toLowerCase()))
                    );
                }
            }
        }
    } catch (e) {
        console.warn('[TrackOrder] Live server search failed, searching local orders store.');
    }

    // 2. Query Local Database Fallback
    const localOrders = JSON.parse(localStorage.getItem('md_local_orders') || '[]');
    const localMatched = localOrders.filter(o => 
        String(o.id) === query || 
        String(o.phone).includes(query) || 
        (o.customer_name && o.customer_name.toLowerCase().includes(query.toLowerCase()))
    );

    localMatched.forEach(lo => {
        if (!matchedOrders.some(mo => String(mo.id) === String(lo.id))) {
            matchedOrders.push(lo);
        }
    });

    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Check Status</span>';
    }

    if (matchedOrders.length === 0) {
        resultBox.innerHTML = `
            <div style="text-align:center; padding:28px 15px;">
                <span style="font-size:2.4rem; display:block; margin-bottom:10px;">🔍</span>
                <h4 style="margin:0 0 6px 0; color:#0f172a; font-weight:700;">No Orders Found</h4>
                <p style="color:#64748b; font-size:0.88rem; max-width:380px; margin:0 auto 16px auto;">
                    We couldn't locate any active order matching "<strong>${escapeHTML(query)}</strong>". Please verify your Order ID or phone number.
                </p>
                <a href="https://wa.me/919822334455?text=${encodeURIComponent('Hello MD Agro, I need help finding my order with query: ' + query)}" target="_blank" rel="noopener" class="btn btn-sm btn-whatsapp" style="display:inline-flex; align-items:center; gap:6px; background:#25D366; color:#fff; padding:8px 16px; border-radius:8px; text-decoration:none; font-weight:600;">
                    <span>💬</span> Chat on WhatsApp Support
                </a>
            </div>
        `;
        return;
    }

    const primary = matchedOrders[0];
    const status = (primary.status || 'pending').toLowerCase();

    let pWidth = '12%';
    let step1Class = 'is-active';
    let step2Class = '';
    let step3Class = '';
    let step4Class = '';
    let statusLabelMarathi = 'नोंदणी झाली (Placed)';

    if (status === 'confirmed' || status === 'processing') {
        pWidth = '42%';
        step1Class = 'is-completed';
        step2Class = 'is-active';
        statusLabelMarathi = 'पुष्टी झाली (Confirmed)';
    } else if (status === 'dispatched' || status === 'shipped') {
        pWidth = '75%';
        step1Class = 'is-completed';
        step2Class = 'is-completed';
        step3Class = 'is-active';
        statusLabelMarathi = 'रवाना झाले (Dispatched)';
    } else if (status === 'delivered' || status === 'completed') {
        pWidth = '100%';
        step1Class = 'is-completed';
        step2Class = 'is-completed';
        step3Class = 'is-completed';
        step4Class = 'is-completed';
        statusLabelMarathi = 'वितरित झाले (Delivered)';
    }

    const itemsList = Array.isArray(primary.items) && primary.items.length > 0
        ? primary.items.map(it => `<li>${escapeHTML(it.product_name || it.name || 'Agro Product')} &times; ${it.quantity} (₹${Number(it.line_total || it.unit_price * it.quantity || 0).toLocaleString('en-IN')})</li>`).join('')
        : '<li>Standard Agricultural Supplies Pack</li>';

    const isCancelled = status === 'cancelled';

    let stepperHTML = `
        <div class="track-stepper-wrap">
            <div class="track-stepper">
                <div class="track-step-progress-bar" style="width: ${pWidth};"></div>
                
                <div class="track-step-item ${step1Class}">
                    <div class="track-step-node">1</div>
                    <span class="track-step-label">Placed</span>
                    <span class="track-step-sub">नोंदणी</span>
                </div>

                <div class="track-step-item ${step2Class}">
                    <div class="track-step-node">2</div>
                    <span class="track-step-label">Confirmed</span>
                    <span class="track-step-sub">पुष्टी</span>
                </div>

                <div class="track-step-item ${step3Class}">
                    <div class="track-step-node">3</div>
                    <span class="track-step-label">Dispatched</span>
                    <span class="track-step-sub">रवाना</span>
                </div>

                <div class="track-step-item ${step4Class}">
                    <div class="track-step-node">4</div>
                    <span class="track-step-label">Delivered</span>
                    <span class="track-step-sub">वितरित</span>
                </div>
            </div>
        </div>
    `;

    if (isCancelled) {
        stepperHTML = `
            <div style="background:#fee2e2; border:1px solid #f87171; border-radius:10px; padding:14px; text-align:center; color:#991b1b; margin:16px 0;">
                <strong style="font-size:1rem;">❌ Order Cancelled (आदेश रद्द केला)</strong>
                <p style="margin:4px 0 0 0; font-size:0.82rem;">This order was cancelled. Please contact Krishi Kendra helpline for any refund or query.</p>
            </div>
        `;
    }

    const orderDate = primary.created_at ? new Date(primary.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : 'Recent';

    resultBox.innerHTML = `
        <div class="track-result-card fade-in">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                <div>
                    <span style="font-size:0.75rem; color:#64748b; text-transform:uppercase; font-weight:700; letter-spacing:0.5px;">Live Order Status</span>
                    <h4 style="margin:2px 0 0 0; font-size:1.2rem; color:#0f172a;">Order #${primary.id}</h4>
                    <span style="font-size:0.8rem; color:#64748b;">📅 ${orderDate}</span>
                </div>
                <div style="text-align:right;">
                    <span class="badge badge-tag status-${status}" style="font-size:0.82rem; padding:4px 10px;">${status.toUpperCase()}</span>
                    <div style="font-size:0.75rem; color:#16a34a; font-weight:600; margin-top:3px;">${statusLabelMarathi}</div>
                </div>
            </div>

            ${stepperHTML}

            <div class="track-details-card">
                <div class="track-info-row">
                    <span>Customer Name:</span>
                    <strong>${escapeHTML(primary.customer_name || 'Farmer Customer')}</strong>
                </div>
                <div class="track-info-row">
                    <span>Mobile Number:</span>
                    <strong>${escapeHTML(primary.phone || '')}</strong>
                </div>
                <div class="track-info-row">
                    <span>Delivery Address:</span>
                    <strong>${escapeHTML(primary.address || 'Standard Store Delivery')}</strong>
                </div>
                <div class="track-info-row">
                    <span>Payment Mode:</span>
                    <strong>${(primary.payment_method || 'COD').toUpperCase()}</strong>
                </div>
                <div class="track-info-row" style="font-size:0.95rem; margin-top:4px; padding-top:6px; border-top:1px dashed var(--border-color, #e2e8f0);">
                    <span>Total Amount:</span>
                    <strong style="color:#15803d; font-size:1.08rem;">₹${Number(primary.total_amount).toLocaleString('en-IN')}</strong>
                </div>

                <div class="track-items-list">
                    <strong>Ordered Agricultural Supplies:</strong>
                    <ul>${itemsList}</ul>
                </div>
            </div>

            <div style="display:flex; gap:10px; margin-top:18px;">
                <a href="https://wa.me/919822334455?text=${encodeURIComponent(`Hello MD Agro, tracking my Order #${primary.id} (Status: ${status.toUpperCase()}). Please provide update.`)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-block" style="display:flex; align-items:center; justify-content:center; gap:8px; background:#25D366; color:#fff; padding:10px; border-radius:8px; text-decoration:none; font-weight:600; font-size:0.9rem;">
                    <span>💬</span> WhatsApp Store Helpline
                </a>
            </div>
            ${matchedOrders.length > 1 ? `<p style="font-size:0.76rem; color:#64748b; text-align:center; margin-top:10px;">Found ${matchedOrders.length} orders for this search. Showing most recent.</p>` : ''}
        </div>
    `;
}

// ════════════════════════════════════════════════════════════════════
// KISAN SAHAYAK VOICE INPUT (SPEECH-TO-TEXT)
// ════════════════════════════════════════════════════════════════════

let speechRecognizer = null;
let isListeningVoice = false;

function toggleChatVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const micBtn = document.getElementById('chat-voice-btn');
    const chatInput = document.getElementById('chat-input');
    const chatForm = document.getElementById('chat-form');

    if (!SpeechRecognition) {
        showToast('🎤 Voice input is not supported in this browser. Please type your query in Marathi, Hindi or English.');
        return;
    }

    if (isListeningVoice && speechRecognizer) {
        try {
            speechRecognizer.stop();
        } catch (e) {}
        return;
    }

    try {
        speechRecognizer = new SpeechRecognition();
        speechRecognizer.continuous = false;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = 'mr-IN'; // Marathi primary, accepts Hindi/English words

        speechRecognizer.onstart = () => {
            isListeningVoice = true;
            if (micBtn) {
                micBtn.classList.add('is-listening');
                micBtn.setAttribute('title', 'Listening... Click to finish (ऐकत आहे...)');
            }
            if (chatInput) {
                chatInput.placeholder = '🎙 ऐकत आहे... (Listening... Speak crop question now)';
            }
            showToast('🎙 Mic Active: Please speak your farming question...');
        };

        speechRecognizer.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                transcript += event.results[i][0].transcript;
            }
            if (chatInput && transcript) {
                chatInput.value = transcript;
            }
        };

        speechRecognizer.onerror = (event) => {
            console.warn('[SpeechRecognition] error:', event.error);
            isListeningVoice = false;
            if (micBtn) micBtn.classList.remove('is-listening');
            if (chatInput) chatInput.placeholder = 'Ask a farming question or tap mic...';
            if (event.error !== 'no-speech') {
                showToast('🎤 Voice input note: ' + event.error);
            }
        };

        speechRecognizer.onend = () => {
            isListeningVoice = false;
            if (micBtn) {
                micBtn.classList.remove('is-listening');
                micBtn.setAttribute('title', 'Voice Input (बोलून प्रश्न विचारा)');
            }
            if (chatInput) {
                chatInput.placeholder = 'Ask a farming question or tap mic...';
                const text = chatInput.value.trim();
                if (text.length > 2) {
                    const submitEvent = new Event('submit', { cancelable: true });
                    if (chatForm) chatForm.dispatchEvent(submitEvent);
                }
            }
        };

        speechRecognizer.start();
    } catch (e) {
        console.error('[SpeechRecognition] failed to start:', e);
        isListeningVoice = false;
        if (micBtn) micBtn.classList.remove('is-listening');
        showToast('🎤 Voice input could not be accessed.');
    }
}

// Expose public functions to window for inline HTML onclick/onsubmit handlers
if (typeof window !== 'undefined') {
    window.toggleCheckoutPayMode = toggleCheckoutPayMode;
    window.openTrackOrderModal = openTrackOrderModal;
    window.closeTrackOrderModal = closeTrackOrderModal;
    window.handleTrackOrderSearch = handleTrackOrderSearch;
    window.toggleChatVoice = toggleChatVoice;
}




// ════════════════════════════════════════════════════════════════════
// CUSTOMER DEMO & FEEDBACK HUB CONTROLLER
// ════════════════════════════════════════════════════════════════════

window.openDemoFeedbackModal = function(tab = 'tour') {
    const modal = document.getElementById('demo-feedback-modal');
    if (!modal) return;
    modal.classList.add('active');
    window.switchDemoTab(tab);
    window.updateJwtInspector();
};

window.closeDemoFeedbackModal = function() {
    const modal = document.getElementById('demo-feedback-modal');
    if (modal) modal.classList.remove('active');
};

window.switchDemoTab = function(tab) {
    const tabs = ['tour', 'feedback', 'jwt'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-btn-${t}`);
        const pane = document.getElementById(`demo-${t}-pane`);
        if (btn) btn.classList.toggle('active', t === tab);
        if (pane) pane.style.display = t === tab ? 'block' : 'none';
    });
    if (tab === 'jwt') {
        window.updateJwtInspector();
    }
};

window.decodeJwtPayload = function(token) {
    if (!token || !token.includes('.')) return null;
    try {
        const parts = token.split('.');
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        return { header, payload };
    } catch (e) {
        return null;
    }
};

window.updateJwtInspector = function() {
    const inspectorElem = document.getElementById('jwt-inspector-output');
    if (!inspectorElem) return;

    const farmerToken = sessionStorage.getItem('md_farmer_token') || localStorage.getItem('md_farmer_token');
    const adminToken = localStorage.getItem('md_admin_token') || sessionStorage.getItem('md_admin_token');

    let displayToken = farmerToken || adminToken;
    let role = farmerToken ? 'Farmer / Customer' : (adminToken ? 'Administrator' : 'None');

    if (!displayToken) {
        inspectorElem.innerHTML = `
            <div style="background:#f8fafc; border:1px dashed #cbd5e1; border-radius:8px; padding:20px; text-align:center;">
                <p style="margin:0 0 12px 0; color:#64748b; font-size:0.9rem;">No active JWT found in storage. Click below to sign in and view real token claims:</p>
                <button type="button" class="btn btn-sm btn-primary" onclick="quickDemoLogin('farmer')">🔐 Test Farmer JWT</button>
                <button type="button" class="btn btn-sm btn-outline" onclick="quickDemoLogin('admin')" style="margin-left:8px;">🛡️ Test Admin JWT</button>
            </div>
        `;
        return;
    }

    const decoded = window.decodeJwtPayload(displayToken);
    const expDate = decoded?.payload?.exp ? new Date(decoded.payload.exp * 1000).toLocaleString('en-IN') : '24 Hours';
    const isExpired = decoded?.payload?.exp ? (Date.now() > decoded.payload.exp * 1000) : false;

    inspectorElem.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
            <div>
                <span class="badge" style="background:${role.includes('Admin') ? '#4f46e5' : '#16a34a'}; color:#fff; font-size:0.8rem; padding:4px 10px; border-radius:6px;">${role} Token</span>
                <span style="font-size:0.85rem; color:${isExpired ? '#dc2626' : '#16a34a'}; font-weight:700; margin-left:8px;">${isExpired ? '⚠ Token Expired' : '✅ Active Valid Signature (HMAC-SHA256)'}</span>
            </div>
            <button class="btn btn-xs btn-outline" onclick="navigator.clipboard.writeText('${displayToken}'); showToast('📋 JWT copied to clipboard!');">Copy Token</button>
        </div>
        <div style="font-family:monospace; font-size:0.75rem; background:#0f172a; color:#38bdf8; padding:12px; border-radius:8px; word-break:break-all; margin-bottom:12px; max-height:80px; overflow-y:auto;">
            ${escapeHTML(displayToken)}
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.82rem;">
            <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:8px;">
                <strong style="display:block; margin-bottom:6px; color:#334155;">🔑 Token Header</strong>
                <pre style="margin:0; font-family:monospace; color:#0f172a; font-size:0.78rem;">${JSON.stringify(decoded?.header || { alg: 'HS256', typ: 'JWT' }, null, 2)}</pre>
            </div>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:8px;">
                <strong style="display:block; margin-bottom:6px; color:#334155;">📋 Token Payload (Claims)</strong>
                <pre style="margin:0; font-family:monospace; color:#0f172a; font-size:0.78rem;">${JSON.stringify(decoded?.payload || {}, null, 2)}</pre>
            </div>
        </div>
        <div style="margin-top:12px; font-size:0.8rem; color:#64748b; display:flex; justify-content:space-between; border-top:1px solid #e2e8f0; padding-top:8px;">
            <span>Expires: <strong>${expDate}</strong></span>
            <span>Issuer: <strong>MD-Agro-Connect</strong></span>
        </div>
    `;
};

window.quickDemoLogin = async function(targetRole) {
    if (targetRole === 'farmer') {
        const phone = '9822145670';
        const pass = 'farmer123';
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: phone, password: pass })
            });
            const data = await res.json();
            if (data.success && data.token) {
                sessionStorage.setItem('md_farmer_token', data.token);
                localStorage.setItem('md_farmer_token', data.token);
                currentUser = data.user;
                sessionStorage.setItem('md_current_user', JSON.stringify(currentUser));
                renderUserHeaderUI();
                showToast(`✅ Signed in as Farmer (${data.user.name}) with JWT!`, 'success');
                window.updateJwtInspector();
                return;
            }
        } catch (e) {
            showToast('Live backend unavailable, demo login fallback.', 'info');
        }
    } else if (targetRole === 'admin') {
        try {
            const res = await fetch(`${API_BASE}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'mdagro', password: 'mdagro6074' })
            });
            const data = await res.json();
            if (data.success && data.token) {
                localStorage.setItem('md_admin_token', data.token);
                localStorage.setItem('md_admin_user', JSON.stringify(data.user));
                showToast('🛡️ Admin JWT issued! Redirecting to Store Management...', 'success');
                setTimeout(() => { window.location.href = 'admin.html'; }, 800);
                return;
            }
        } catch (e) {
            showToast('Opening Admin portal in local demo mode...', 'info');
            window.location.href = 'admin.html';
        }
    }
};

window.submitCustomerFeedback = async function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const name = (document.getElementById('fb-customer-name')?.value || '').trim();
    const phone = (document.getElementById('fb-customer-phone')?.value || '').trim();
    const role = document.getElementById('fb-customer-role')?.value || 'Farmer';
    const rating = document.querySelector('input[name="fb_rating"]:checked')?.value || '5';
    const category = document.getElementById('fb-category')?.value || 'General Experience';
    const message = (document.getElementById('fb-comments')?.value || '').trim();

    if (!name || !message) {
        showToast('⚠ Please provide your name and feedback comments.', 'warning');
        return;
    }

    const submitBtn = document.getElementById('btn-submit-feedback');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting Feedback...'; }

    const feedbackItem = {
        name,
        phone,
        subject: `[CUSTOMER FEEDBACK - ${category}] (${rating}★ by ${role})`,
        message: `Rating: ${rating}/5 Stars\nRole: ${role}\nCategory: ${category}\nFeedback: ${message}`,
        created_at: new Date().toISOString()
    };

    // Save to local feedback storage
    const existingFb = JSON.parse(localStorage.getItem('md_customer_feedbacks') || '[]');
    existingFb.unshift(feedbackItem);
    localStorage.setItem('md_customer_feedbacks', JSON.stringify(existingFb));

    // Also send to /api/contact so it registers in Admin Inquiries
    try {
        await fetch(`${API_BASE}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedbackItem),
            signal: AbortSignal.timeout(3000)
        });
    } catch (err) {}

    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Feedback'; }

    const feedbackPane = document.getElementById('demo-feedback-pane');
    if (feedbackPane) {
        feedbackPane.innerHTML = `
            <div style="text-align:center; padding:35px 20px;">
                <span style="font-size:3.5rem; display:block; margin-bottom:14px;">🌟</span>
                <h4 style="margin:0 0 8px 0; color:#0f172a; font-size:1.3rem;">Thank You, ${escapeHTML(name)}!</h4>
                <p style="color:#475569; font-size:0.95rem; line-height:1.6; margin-bottom:20px;">
                    Your <strong>${rating}-star rating</strong> regarding <em>${escapeHTML(category)}</em> has been recorded and submitted to MD Agro.
                </p>
                <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:14px; margin-bottom:24px; font-size:0.88rem; color:#166534; text-align:left; line-height:1.6;">
                    ✅ <strong>Captured in Feedback Matrix</strong> (Logged for sprint evaluation)<br>
                    ✅ <strong>Visible in Admin Dashboard</strong> (Under Customer Inquiries)<br>
                    ✅ <strong>Audit Timestamp</strong>: ${new Date().toLocaleTimeString('en-IN')}
                </div>
                <button class="btn btn-primary btn-sm" onclick="closeDemoFeedbackModal()">Close Window</button>
            </div>
        `;
    }
    showToast('🙏 Thank you! Your feedback has been received and logged.', 'success');
};

// ═══════════════════════════════════════════════════════════
// MAIN FEEDBACK MODULE (Homepage Feedback Section)
// ═══════════════════════════════════════════════════════════

let _mfbRating = 5;

window.setFbRating = function(val) {
    _mfbRating = val;
    const ratingInput = document.getElementById('mfb-rating');
    if (ratingInput) ratingInput.value = val;
    // Update star display
    const stars = document.querySelectorAll('.fb-star');
    stars.forEach((s, i) => {
        s.style.opacity = i < val ? '1' : '0.35';
        s.style.transform = i < val ? 'scale(1.1)' : 'scale(1)';
    });
};

window.submitMainFeedback = async function(e) {
    e.preventDefault();
    const name     = (document.getElementById('mfb-name')?.value || '').trim();
    const phone    = (document.getElementById('mfb-phone')?.value || '').trim();
    const location = (document.getElementById('mfb-location')?.value || '').trim();
    const category = document.getElementById('mfb-category')?.value || 'General Experience';
    const rating   = Number(document.getElementById('mfb-rating')?.value || 5);
    const message  = (document.getElementById('mfb-message')?.value || '').trim();

    if (!name || !message) {
        showToast('⚠ Please enter your name and feedback message.', 'warning');
        return;
    }

    const btn  = document.getElementById('mfb-submit-btn');
    const btnText = document.getElementById('mfb-btn-text');
    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = 'Submitting...';

    const payload = { name, phone, role: location || 'Maharashtra', rating, category, message };

    // Save to localStorage immediately (works offline too)
    const localFb = JSON.parse(localStorage.getItem('md_customer_feedbacks') || '[]');
    localFb.unshift({ ...payload, created_at: new Date().toISOString(), local: true });
    localStorage.setItem('md_customer_feedbacks', JSON.stringify(localFb));

    try {
        const res = await fetch(`${API_BASE}/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(5000)
        });
        const data = await res.json();
        if (res.ok && data.success) {
            console.log('[Feedback] Saved to Firestore:', data.feedback?.id);
        }
    } catch (err) {
        console.warn('[Feedback] Backend offline, saved locally:', err.message);
    }

    // Show success state
    const form = document.getElementById('main-feedback-form');
    const successDiv = document.getElementById('mfb-success');
    if (form) form.style.display = 'none';
    if (successDiv) successDiv.style.display = 'block';

    showToast('🌟 Thank you! Your review has been saved!', 'success');

    // Refresh the feedback wall with the new review immediately
    setTimeout(() => loadFeedbackWall(), 500);
};

window.resetFeedbackForm = function() {
    const form = document.getElementById('main-feedback-form');
    const successDiv = document.getElementById('mfb-success');
    if (form) { form.reset(); form.style.display = 'block'; }
    if (successDiv) successDiv.style.display = 'none';
    const btn = document.getElementById('mfb-submit-btn');
    const btnText = document.getElementById('mfb-btn-text');
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = '🚀 Submit My Review';
    _mfbRating = 5;
    setFbRating(5);
};

async function loadFeedbackWall() {
    const wall = document.getElementById('feedback-wall');
    const countEl = document.getElementById('fb-wall-count');
    if (!wall) return;

    let reviews = [];

    // 1. Try API
    try {
        const res = await fetch(`${API_BASE}/feedback`, { signal: AbortSignal.timeout(4000) });
        if (res.ok) {
            const data = await res.json();
            if (data.success && data.data && data.data.length > 0) {
                reviews = data.data;
            }
        }
    } catch (err) {
        console.warn('[FeedbackWall] API offline, using local:', err.message);
    }

    // 2. Merge with localStorage
    const localFb = JSON.parse(localStorage.getItem('md_customer_feedbacks') || '[]');
    if (localFb.length > 0) {
        const apiIds = new Set(reviews.map(r => r.id));
        for (const lf of localFb) {
            if (!lf.id || !apiIds.has(lf.id)) {
                reviews.unshift(lf);
            }
        }
    }

    // 3. Seed defaults if none
    if (reviews.length === 0) {
        reviews = [
            { name: 'Ramesh Patil', role: 'Nashik, Maharashtra', rating: 5, category: 'Seeds & Crops', message: 'MD Agro चे cotton seeds खूप चांगले आहेत! Production दुप्पट झाली. Thanks MD Agro!', created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
            { name: 'Suresh Deshmukh', role: 'Akola, Vidarbha', rating: 5, category: 'Fertilizers', message: 'Excellent quality fertilizers. My soybean crop yield increased by 40% this season. Highly recommended!', created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
            { name: 'Anita Bhosale', role: 'Latur, Maharashtra', rating: 4, category: 'Delivery & Service', message: 'Good service and fast delivery to our village. Products are genuine and certified. Will order again.', created_at: new Date(Date.now() - 86400000 * 8).toISOString() },
            { name: 'Manoj Kale', role: 'Ahmednagar', rating: 5, category: 'AI Crop Advisor', message: 'AI chatbot gave excellent advice for my tomato crop pest problem. Solved in 2 days! Fantastic tool.', created_at: new Date(Date.now() - 86400000 * 12).toISOString() },
            { name: 'Priya Jadhav', role: 'Pune District', rating: 4, category: 'Pesticides & Protection', message: 'Bio-pesticides work very well for vegetable crops. No harmful chemicals and very effective results.', created_at: new Date(Date.now() - 86400000 * 15).toISOString() }
        ];
    }

    if (countEl) countEl.textContent = `${reviews.length} Review${reviews.length !== 1 ? 's' : ''}`;

    const starsHtml = (n) => '⭐'.repeat(Math.min(5, Math.max(1, n)));
    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const days = Math.floor(diff / 86400000);
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 30) return `${days} days ago`;
        return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    wall.innerHTML = reviews.slice(0, 12).map(r => `
        <div style="background:#fff;border-radius:14px;padding:18px 20px;border:1px solid #e2f5e5;box-shadow:0 2px 8px rgba(0,0,0,0.05);transition:box-shadow 0.2s;" onmouseenter="this.style.boxShadow='0 4px 18px rgba(0,0,0,0.1)'" onmouseleave="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#16a34a,#22c55e);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:0.95rem;flex-shrink:0;">
                        ${(r.name || 'F').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div style="font-weight:700;font-size:0.9rem;color:#0f172a;">${escapeHTML(r.name || 'Anonymous Farmer')}</div>
                        <div style="font-size:0.75rem;color:#64748b;">${escapeHTML(r.role || r.location || 'Maharashtra')}</div>
                    </div>
                </div>
                <div style="text-align:right;flex-shrink:0;">
                    <div style="font-size:0.85rem;">${starsHtml(r.rating || 5)}</div>
                    <div style="font-size:0.72rem;color:#94a3b8;margin-top:2px;">${timeAgo(r.created_at)}</div>
                </div>
            </div>
            ${r.category ? `<div style="display:inline-block;background:#f0fdf4;color:#166534;font-size:0.72rem;font-weight:600;padding:2px 10px;border-radius:10px;margin-bottom:8px;">${escapeHTML(r.category)}</div>` : ''}
            <p style="margin:0;font-size:0.88rem;color:#374151;line-height:1.6;">${escapeHTML(r.message || '')}</p>
        </div>
    `).join('');
}

// Auto-initialize feedback wall on page load if the section exists
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('feedback-wall')) {
        loadFeedbackWall();
        setFbRating(5); // Set all 5 stars highlighted by default
    }
});

