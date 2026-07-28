// MD Agro Services - Application JavaScript

// Product Catalog Database
const PRODUCTS = [
    {
        id: 's1',
        name: 'Premium Hybrid Cotton Seeds',
        category: 'seeds',
        price: 450,
        unit: 'per kg',
        rating: 4.8,
        reviews: 128,
        description: 'High-yield cotton seeds with excellent pest resistance and high adaptability to varying climatic conditions.',
        image: 'cotton-seed',
        tags: ['Best Seller', 'High Yield']
    },
    {
        id: 's2',
        name: 'Golden Wheat Premium Seeds',
        category: 'seeds',
        price: 320,
        unit: 'per 5kg bag',
        rating: 4.7,
        reviews: 95,
        description: 'Certified premium grade wheat seeds optimized for maximum grain weight and rust resistance.',
        image: 'wheat-seed',
        tags: ['Organic', 'Certified']
    },
    {
        id: 's3',
        name: 'Sweet Corn Hybrid F1',
        category: 'seeds',
        price: 180,
        unit: 'per 500g',
        rating: 4.9,
        reviews: 64,
        description: 'Super sweet F1 hybrid variety. Features high germination rates and robust seedling vigor.',
        image: 'corn-seed',
        tags: ['Sweet', 'F1 Hybrid']
    },
    {
        id: 's4',
        name: 'High-Yield Paddy Seeds',
        category: 'seeds',
        price: 550,
        unit: 'per 10kg bag',
        rating: 4.6,
        reviews: 112,
        description: 'Premium rice seeds suitable for both direct seeding and transplanting. High milling yield.',
        image: 'paddy-seed',
        tags: ['Drought Tolerant']
    },
    {
        id: 'f1',
        name: 'Organic Vermicompost booster',
        category: 'fertilizers',
        price: 250,
        unit: 'per 10kg bag',
        rating: 4.9,
        reviews: 210,
        description: '100% organic earthworm compost enriched with nitrogen, phosphorus, and potassium for robust soil health.',
        image: 'vermicompost',
        tags: ['100% Organic', 'Soil Health']
    },
    {
        id: 'f2',
        name: 'NPK 19:19:19 Soluble Fertilizer',
        category: 'fertilizers',
        price: 350,
        unit: 'per kg',
        rating: 4.7,
        reviews: 142,
        description: 'Fully water-soluble fertilizer for balanced crop nutrition. Excellent for foliar application and fertigation.',
        image: 'npk',
        tags: ['Water Soluble']
    },
    {
        id: 'f3',
        name: 'Premium Crop Booster Liquid',
        category: 'fertilizers',
        price: 499,
        unit: 'per 500ml',
        rating: 4.8,
        reviews: 87,
        description: 'Advanced liquid fertilizer with micronutrients and seaweed extract to accelerate growth and flowering.',
        image: 'liquid-booster',
        tags: ['Fast Acting', 'Micronutrients']
    },
    {
        id: 'f4',
        name: 'Soil Micronutrient Mixture',
        category: 'fertilizers',
        price: 280,
        unit: 'per 2kg bag',
        rating: 4.5,
        reviews: 49,
        description: 'Formulated mix of Zinc, Iron, Manganese, Boron, and Copper to cure deficiencies in all crop types.',
        image: 'micronutrient',
        tags: ['Deficiency Cure']
    },
    {
        id: 'p1',
        name: 'Bio-Pesticide Neem Shield',
        category: 'protection',
        price: 290,
        unit: 'per 500ml',
        rating: 4.7,
        reviews: 156,
        description: 'Cold-pressed neem oil formulation with high Azadirachtin content. Natural defense against 200+ chewing & sucking pests.',
        image: 'neem-shield',
        tags: ['Eco-Friendly', 'Non-Toxic']
    },
    {
        id: 'p2',
        name: 'Fungicide Cure-All Pow',
        category: 'protection',
        price: 420,
        unit: 'per 500g',
        rating: 4.6,
        reviews: 73,
        description: 'Broad-spectrum systemic fungicide offering both protective and curative action against fungal leaf spots and rust.',
        image: 'fungicide',
        tags: ['Broad Spectrum']
    },
    {
        id: 'p3',
        name: 'Selective Herbicide Green-Clean',
        category: 'protection',
        price: 380,
        unit: 'per Litre',
        rating: 4.4,
        reviews: 81,
        description: 'Post-emergence selective herbicide for effective control of broadleaf weeds without affecting the primary crops.',
        image: 'herbicide',
        tags: ['Selective Weed Control']
    },
    {
        id: 't1',
        name: 'Premium Ergonomic Hand Trowel',
        category: 'tools',
        price: 150,
        unit: 'per unit',
        rating: 4.8,
        reviews: 90,
        description: 'Heavy duty rust-resistant aluminum trowel with comfortable rubber grip. Ideal for planting and weeding.',
        image: 'trowel',
        tags: ['Durable', 'Ergonomic']
    },
    {
        id: 't2',
        name: 'Battery Operated Knapsack Sprayer',
        category: 'tools',
        price: 2800,
        unit: 'per unit',
        rating: 4.7,
        reviews: 215,
        description: '16-Litre heavy-duty electric sprayer with rechargeable battery, pressure regulator, and multiple spray nozzles.',
        image: 'sprayer',
        tags: ['Electric', 'High Capacity']
    },
    {
        id: 't3',
        name: '3-in-1 Soil Moisture & pH Meter',
        category: 'tools',
        price: 650,
        unit: 'per unit',
        rating: 4.5,
        reviews: 134,
        description: 'Battery-free testing device for soil moisture, pH level, and sunlight intensity. Perfect for precision farming.',
        image: 'ph-meter',
        tags: ['Battery Free', 'Smart Tool']
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

// Application State
let cart = [];
let activeCategory = 'all';
let searchQuery = '';

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderProducts();
    setupEventListeners();
    updateCartUI();
    renderAdvisoryResult(); // Run initial advice render
    initChatbot(); // Initialize AI chatbot
}

// Get SVG Graphic based on identifier
function getProductSVG(imageName) {
    // Generate inline, vector illustrations for products to make them look highly professional and premium
    const colors = {
        seeds: { primary: '#4caf50', accent: '#81c784', dark: '#1b5e20' },
        fertilizers: { primary: '#8d6e63', accent: '#d7ccc8', dark: '#4e342e' },
        protection: { primary: '#0288d1', accent: '#b3e5fc', dark: '#01579b' },
        tools: { primary: '#78909c', accent: '#cfd8dc', dark: '#263238' }
    };

    switch(imageName) {
        case 'cotton-seed':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f1f8e9" rx="12"/>
                <circle cx="50" cy="50" r="30" fill="#fff" opacity="0.6"/>
                <path d="M50 25 C65 30 75 45 70 60 C65 75 50 80 50 80 C50 80 35 75 30 60 C25 45 35 30 50 25 Z" fill="#e0f2f1" stroke="#26a69a" stroke-width="2"/>
                <path d="M50 35 C58 38 64 45 62 55 C60 65 50 72 50 72 C50 72 40 65 38 55 C36 45 42 38 50 35 Z" fill="#ffffff" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"/>
                <path d="M50 72 L50 85" stroke="#26a69a" stroke-width="3" stroke-linecap="round"/>
                <path d="M50 85 C45 87 40 85 36 82" stroke="#26a69a" stroke-width="2" fill="none" stroke-linecap="round"/>
                <circle cx="45" cy="45" r="3" fill="#80cbc4"/>
                <circle cx="55" cy="47" r="4" fill="#b2dfdb"/>
                <circle cx="48" cy="58" r="5" fill="#e0f2f1"/>
            </svg>`;
        case 'wheat-seed':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#fff8e1" rx="12"/>
                <path d="M50 85 L50 15" stroke="#ffa000" stroke-width="3" stroke-linecap="round"/>
                <path d="M50 20 C42 22 40 28 50 32 C60 28 58 22 50 20 Z" fill="#ffe082" stroke="#ffb300" stroke-width="1.5"/>
                <path d="M50 32 C40 34 38 40 50 44 C60 40 58 34 50 32 Z" fill="#ffe082" stroke="#ffb300" stroke-width="1.5"/>
                <path d="M50 44 C40 46 38 52 50 56 C60 52 58 46 50 44 Z" fill="#ffd54f" stroke="#ffb300" stroke-width="1.5"/>
                <path d="M50 56 C40 58 38 64 50 68 C60 64 58 58 50 56 Z" fill="#ffd54f" stroke="#ffb300" stroke-width="1.5"/>
                <path d="M50 68 C40 70 38 76 50 80 C60 76 58 70 50 68 Z" fill="#ffca28" stroke="#ffa000" stroke-width="1.5"/>
                <path d="M50 15 L50 8" stroke="#ffa000" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M43 18 L35 12" stroke="#ffa000" stroke-width="1" stroke-linecap="round"/>
                <path d="M57 18 L65 12" stroke="#ffa000" stroke-width="1" stroke-linecap="round"/>
                <path d="M41 30 L30 25" stroke="#ffa000" stroke-width="1" stroke-linecap="round"/>
                <path d="M59 30 L70 25" stroke="#ffa000" stroke-width="1" stroke-linecap="round"/>
            </svg>`;
        case 'corn-seed':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#fffde7" rx="12"/>
                <path d="M50 80 C65 80 65 30 50 20 C35 30 35 80 50 80 Z" fill="#fbc02d" stroke="#f57f17" stroke-width="2"/>
                <path d="M38 75 C30 65 32 40 42 30" fill="none" stroke="#4caf50" stroke-width="3" stroke-linecap="round"/>
                <path d="M62 75 C70 65 68 40 58 30" fill="none" stroke="#4caf50" stroke-width="3" stroke-linecap="round"/>
                <circle cx="47" cy="35" r="3" fill="#fff59d"/>
                <circle cx="53" cy="35" r="3" fill="#fff59d"/>
                <circle cx="45" cy="45" r="4" fill="#ffee58"/>
                <circle cx="55" cy="45" r="4" fill="#ffee58"/>
                <circle cx="44" cy="55" r="4" fill="#fdd835"/>
                <circle cx="56" cy="55" r="4" fill="#fdd835"/>
                <circle cx="45" cy="65" r="5" fill="#fbc02d"/>
                <circle cx="55" cy="65" r="5" fill="#fbc02d"/>
            </svg>`;
        case 'paddy-seed':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#efebe9" rx="12"/>
                <path d="M20 85 C35 75 45 40 45 15" fill="none" stroke="#81c784" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M80 85 C65 75 55 35 55 20" fill="none" stroke="#81c784" stroke-width="2" stroke-linecap="round"/>
                <path d="M45 15 C41 18 36 28 42 32 C48 28 48 18 45 15 Z" fill="#c8e6c9" stroke="#4caf50" stroke-width="1"/>
                <path d="M55 20 C52 23 48 31 53 35 C58 31 58 23 55 20 Z" fill="#c8e6c9" stroke="#4caf50" stroke-width="1"/>
                <path d="M38 35 C32 37 28 45 35 48 C41 45 40 37 38 35 Z" fill="#e8f5e9" stroke="#4caf50" stroke-width="1"/>
                <path d="M60 40 C56 42 53 48 58 52 C63 48 62 42 60 40 Z" fill="#e8f5e9" stroke="#4caf50" stroke-width="1"/>
            </svg>`;
        case 'vermicompost':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#efebe9" rx="12"/>
                <path d="M25 80 L75 80 L80 40 L20 40 Z" fill="#5d4037" stroke="#3e2723" stroke-width="3" stroke-linejoin="round"/>
                <ellipse cx="50" cy="40" rx="30" ry="10" fill="#8d6e63" stroke="#3e2723" stroke-width="3"/>
                <path d="M30 40 C35 30 40 32 50 35 C60 32 65 30 70 40" fill="none" stroke="#d7ccc8" stroke-width="2" stroke-linecap="round"/>
                <path d="M35 55 C45 52 50 62 65 58" fill="none" stroke="#ff8a80" stroke-width="3" stroke-linecap="round"/>
                <circle cx="45" cy="48" r="2" fill="#3e2723"/>
                <circle cx="58" cy="68" r="3" fill="#3e2723"/>
                <circle cx="32" cy="65" r="2" fill="#3e2723"/>
            </svg>`;
        case 'npk':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#e0f2f1" rx="12"/>
                <path d="M30 25 L70 25 L80 85 L20 85 Z" fill="#ffffff" stroke="#00796b" stroke-width="3" stroke-linejoin="round"/>
                <rect x="35" y="35" width="30" height="22" rx="4" fill="#e0f2f1"/>
                <text x="50" y="48" fill="#004d40" font-weight="bold" font-size="10" text-anchor="middle">NPK</text>
                <text x="50" y="55" fill="#00796b" font-weight="bold" font-size="7" text-anchor="middle">19:19:19</text>
                <circle cx="30" cy="72" r="3" fill="#ffb74d"/>
                <circle cx="50" cy="74" r="3" fill="#4db6ac"/>
                <circle cx="70" cy="71" r="3" fill="#ff8a65"/>
            </svg>`;
        case 'liquid-booster':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f1f8e9" rx="12"/>
                <path d="M40 20 L60 20 L60 30 L70 38 L70 85 L30 85 L30 38 L40 30 Z" fill="#ffffff" stroke="#2e7d32" stroke-width="3" stroke-linejoin="round"/>
                <rect x="42" y="14" width="16" height="6" fill="#1b5e20"/>
                <rect x="30" y="48" width="40" height="20" fill="#81c784"/>
                <path d="M40 58 C45 55 55 61 60 58" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                <circle cx="50" cy="75" r="4" fill="#a5d6a7"/>
                <circle cx="62" cy="78" r="2.5" fill="#a5d6a7"/>
            </svg>`;
        case 'micronutrient':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f9f9f9" rx="12"/>
                <path d="M25 30 L75 30 L82 85 L18 85 Z" fill="#eceff1" stroke="#37474f" stroke-width="3" stroke-linejoin="round"/>
                <circle cx="35" cy="50" r="5" fill="#ff7043"/>
                <circle cx="50" cy="45" r="6" fill="#29b6f6"/>
                <circle cx="65" cy="52" r="4" fill="#26a69a"/>
                <circle cx="42" cy="68" r="5" fill="#ab47bc"/>
                <circle cx="58" cy="65" r="5" fill="#ffca28"/>
                <text x="50" y="80" fill="#37474f" font-weight="bold" font-size="7" text-anchor="middle">MICROS</text>
            </svg>`;
        case 'neem-shield':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#e8f5e9" rx="12"/>
                <path d="M35 25 L65 25 L65 35 L72 42 L72 85 L28 85 L28 42 L35 35 Z" fill="#e8f5e9" stroke="#1b5e20" stroke-width="3" stroke-linejoin="round"/>
                <ellipse cx="50" cy="18" rx="12" ry="4" fill="#388e3c"/>
                <path d="M50 45 C40 50 40 70 50 80 C60 70 60 50 50 45 Z" fill="#81c784" stroke="#1b5e20" stroke-width="1.5"/>
                <path d="M50 45 L50 80" stroke="#1b5e20" stroke-width="1.5"/>
                <path d="M50 55 C46 54 44 51 44 51" stroke="#1b5e20" stroke-width="1.5" fill="none"/>
                <path d="M50 63 C55 62 57 59 57 59" stroke="#1b5e20" stroke-width="1.5" fill="none"/>
            </svg>`;
        case 'fungicide':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#e1f5fe" rx="12"/>
                <path d="M38 20 H62 V30 L75 42 V85 H25 V42 L38 30 Z" fill="#ffffff" stroke="#0277bd" stroke-width="3" stroke-linejoin="round"/>
                <path d="M50 48 L62 58 H38 Z" fill="#e1f5fe" stroke="#0277bd" stroke-width="2"/>
                <circle cx="50" cy="68" r="8" fill="#4fc3f7" opacity="0.7"/>
                <path d="M45 68 H55 M50 63 V73" stroke="#01579b" stroke-width="2.5" stroke-linecap="round"/>
            </svg>`;
        case 'herbicide':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#ede7f6" rx="12"/>
                <path d="M35 15 H65 V28 L72 38 V85 H28 V38 L35 28 Z" fill="#ffffff" stroke="#5e35b1" stroke-width="3"/>
                <rect x="38" y="45" width="24" height="28" fill="#b39ddb"/>
                <path d="M38 52 H62 M38 64 H62" stroke="#5e35b1" stroke-width="1.5"/>
                <circle cx="50" cy="33" r="3.5" fill="#d1c4e9"/>
            </svg>`;
        case 'trowel':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#eceff1" rx="12"/>
                <path d="M50 18 L70 48 H58 L58 75 C58 78 54 82 50 82 C46 82 42 78 42 75 L42 48 H30 Z" fill="#78909c" stroke="#37474f" stroke-width="3" stroke-linejoin="round"/>
                <rect x="44" y="58" width="12" height="22" rx="3" fill="#d84315"/>
                <line x1="50" y1="18" x2="50" y2="48" stroke="#37474f" stroke-width="1.5"/>
            </svg>`;
        case 'sprayer':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#e8f5e9" rx="12"/>
                <rect x="32" y="25" width="36" height="52" rx="8" fill="#2e7d32" stroke="#1b5e20" stroke-width="3"/>
                <rect x="42" y="16" width="16" height="9" fill="#37474f"/>
                <path d="M68 50 L85 50 L85 20 L80 20" fill="none" stroke="#558b2f" stroke-width="3" stroke-linecap="round"/>
                <rect x="36" y="66" width="28" height="7" fill="#1b5e20"/>
                <circle cx="40" cy="38" r="3.5" fill="#a5d6a7"/>
                <circle cx="60" cy="38" r="3.5" fill="#a5d6a7"/>
            </svg>`;
        case 'ph-meter':
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#fafafa" rx="12"/>
                <path d="M42 85 L42 55 H58 L58 85" stroke="#78909c" stroke-width="3" stroke-linecap="round"/>
                <rect x="30" y="20" width="40" height="35" rx="6" fill="#37474f" stroke="#263238" stroke-width="3"/>
                <rect x="36" y="26" width="28" height="15" fill="#9e9e9e"/>
                <line x1="50" y1="38" x2="44" y2="29" stroke="#b71c1c" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="50" cy="38" r="2" fill="#000"/>
                <circle cx="42" cy="48" r="2.5" fill="#4caf50"/>
                <circle cx="50" cy="48" r="2.5" fill="#ffeb3b"/>
                <circle cx="58" cy="48" r="2.5" fill="#f44336"/>
            </svg>`;
        default:
            return `
            <svg class="product-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#e8f5e9" rx="12"/>
                <circle cx="50" cy="50" r="20" fill="#81c784"/>
            </svg>`;
    }
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
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.setAttribute('data-id', product.id);

        const tagsHTML = product.tags.map(tag => `<span class="badge badge-tag">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="product-image-container">
                ${getProductSVG(product.image)}
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
        grid.appendChild(card);
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

    // Crop Advisory Interactive Wizard
    const advisoryCrop = document.getElementById('advisory-crop');
    const advisoryIssue = document.getElementById('advisory-issue');

    if (advisoryCrop && advisoryIssue) {
        advisoryCrop.addEventListener('change', renderAdvisoryResult);
        advisoryIssue.addEventListener('change', renderAdvisoryResult);
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

    // Contact Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M12 2 A 10 10 0 0 1 22 12" stroke-linecap="round"></path>
                </svg> Sending...`;
            
            setTimeout(() => {
                // Success message
                const formGroup = contactForm.parentElement;
                formGroup.innerHTML = `
                    <div class="success-alert fade-in">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2" style="margin-bottom:15px;">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. An MD Agro advisor will contact you within 24 hours.</p>
                    </div>
                `;
            }, 1500);
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
}

// Process Checkout Simulation
function processCheckout() {
    const checkoutContainer = document.getElementById('cart-drawer-content');
    if (!checkoutContainer) return;

    checkoutContainer.innerHTML = `
        <div class="checkout-success-view fade-in">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2" class="success-checkmark">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h2>Order Placed!</h2>
            <p>Your order request has been registered. Our representative will contact you shortly to confirm the delivery schedule and payment terms.</p>
            <div class="order-summary-box">
                <h4>Items Ordered:</h4>
                <ul>
                    ${cart.map(item => `<li>${item.product.name} x ${item.quantity}</li>`).join('')}
                </ul>
            </div>
            <button class="btn btn-primary" id="btn-close-checkout" style="margin-top:20px; width:100%;">Return to Shop</button>
        </div>
    `;

    // Clear cart
    cart = [];
    updateCartUI();

    const closeBtn = document.getElementById('btn-close-checkout');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('cart-drawer').classList.remove('active');
            document.getElementById('cart-overlay').classList.remove('active');
            // Restore cart drawer view state for next time
            setTimeout(() => {
                restoreCartDrawerHTML();
            }, 500);
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

// Show Product Details Modal
function showProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('product-modal-body');
    if (!modal || !modalContent) return;

    const tagsHTML = product.tags.map(tag => `<span class="badge badge-tag">${tag}</span>`).join('');

    modalContent.innerHTML = `
        <div class="modal-product-grid">
            <div class="modal-product-image">
                ${getProductSVG(product.image)}
            </div>
            <div class="modal-product-details">
                <span class="badge category-badge">${product.category.toUpperCase()}</span>
                <h2 class="modal-title">${product.name}</h2>
                <div class="product-rating" style="margin-bottom:15px;">
                    <div class="stars">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="rating-val">${product.rating} (${product.reviews} customer reviews)</span>
                </div>
                <p class="modal-desc">${product.description}</p>
                
                <div class="modal-meta">
                    <div class="meta-item">
                        <strong>Availability:</strong> <span class="text-success">In Stock (Fresh Batch)</span>
                    </div>
                    <div class="meta-item">
                        <strong>Packaging Unit:</strong> <span>${product.unit}</span>
                    </div>
                </div>

                <div class="modal-price-row">
                    <div class="modal-price">
                        <span class="currency">₹</span>
                        <span class="amount">${product.price}</span>
                        <span class="unit">/${product.unit.replace('per ', '')}</span>
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

// AI Agronomist Chatbot Logic
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const quickReplies = document.querySelector('.quick-replies');

    if (!chatbotToggle || !chatbotContainer || !chatbotClose || !chatForm || !chatInput || !chatMessages) return;

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Handle Quick Replies click
    if (quickReplies) {
        quickReplies.addEventListener('click', (e) => {
            const pill = e.target.closest('.reply-pill');
            if (pill) {
                const text = pill.textContent;
                sendMessage(text);
            }
        });
    }

    // Handle Form Submit
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        chatInput.value = '';
        sendMessage(text);
    });

    function sendMessage(text) {
        // User Message
        appendMessage('user', text);
        
        // Show Typing Indicator
        const typingId = showTypingIndicator();

        // Simulate AI Response delay
        setTimeout(() => {
            removeTypingIndicator(typingId);
            const response = getAIResponse(text);
            appendMessage('bot', response);
        }, 1200);
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}-msg fade-in`;
        
        const avatar = sender === 'bot' ? 
            `<div class="chat-avatar bot-avatar">🌱</div>` : 
            `<div class="chat-avatar user-avatar">👤</div>`;

        msgDiv.innerHTML = `
            ${avatar}
            <div class="chat-bubble">
                <p>${text}</p>
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

    function getAIResponse(query) {
        const q = query.toLowerCase();
        
        // Match response
        if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('start') || q.includes('help')) {
            return "Hello there! I am your MD Agro AI assistant. I can advise you on crops, fertilizer needs, or pest management. What crop are you cultivating today?";
        }
        if (q.includes('cotton')) {
            return "Cotton is an excellent crop. Watch out for <strong>Pink Bollworm</strong> and sucking pests. Use our <strong>Bio-Pesticide Neem Shield</strong> for organic defense, and apply <strong>NPK 19:19:19</strong> at flowering.";
        }
        if (q.includes('wheat')) {
            return "For high Wheat yield, ensure proper tillering by applying nitrogen-rich <strong>NPK 19:19:19</strong> or <strong>Vermicompost</strong>. If you spot yellow/brown powdery residue on leaves, spray <strong>Fungicide Cure-All</strong> immediately to prevent rust.";
        }
        if (q.includes('paddy') || q.includes('rice')) {
            return "For Paddy, keep a steady water level. Watch out for brown planthoppers and stem borers (spray Neem Shield). If leaves turn rusty brown, you likely have a Zinc deficiency—use our <strong>Soil Micronutrient Mixture</strong>.";
        }
        if (q.includes('npk') || q.includes('fertilizer') || q.includes('manure')) {
            return "We supply premium <strong>NPK 19:19:19</strong> (water soluble, great for uniform growth) and premium <strong>Vermicompost</strong> (organic matter booster). Apply NPK during vegetative growth and vermicompost for long-term soil health.";
        }
        if (q.includes('pest') || q.includes('insect') || q.includes('spray') || q.includes('weed')) {
            return "For eco-friendly pest control, we highly recommend <strong>Bio-Pesticide Neem Shield</strong>. For fungal diseases like leaf spots or mildews, use <strong>Fungicide Cure-All</strong>. You can use our <strong>Battery Operated Knapsack Sprayer</strong> for easy application!";
        }
        if (q.includes('soil') || q.includes('ph') || q.includes('acid')) {
            return "Test your soil! We offer a <strong>3-in-1 Soil Moisture & pH Meter</strong>. If your soil is acidic, add vermicompost or agricultural lime. Nutrient-deficient soil benefit significantly from <strong>Micronutrient Mixture</strong>.";
        }
        if (q.includes('delivery') || q.includes('order') || q.includes('shop') || q.includes('shipping')) {
            return "MD Agro Services offers cash on delivery and home delivery for farmers. Once you place an order in the cart, our team contacts you to verify the location and deliver within 24-48 hours.";
        }
        if (q.includes('location') || q.includes('contact') || q.includes('phone') || q.includes('address')) {
            return "Our primary shop is located at main market yard block B. You can also call us at +91 98765 43210 or send an email through our contact form. We deliver directly to neighboring farms!";
        }
        
        return "I appreciate your question! I recommend using our **Crop Care Advisor** tool on this page to select your crop and get diagnostic action steps, or check our catalog to buy fertilizers and seeds. Let me know if you need specific product suggestions!";
    }
}
