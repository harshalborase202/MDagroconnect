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

// ─── Backend API Base URL ────────────────────────────────────────────────
// Dynamically uses the current hostname so it works on any PC on the network.
const API_BASE = `http://${window.location.hostname}:3001/api`;

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
    initChatbot(); // Initialize AI chatbot
}

// Real Photographic Product Images Database (High-Res Realistic Agricultural Photos)
const PRODUCT_IMAGES = {
    'cotton-seed': {
        local: 'images/cotton-seed.jpg',
        fallback: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80',
        alt: 'Real high yield hybrid cotton crop'
    },
    'wheat-seed': {
        local: 'images/wheat-seed.jpg',
        fallback: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
        alt: 'Real golden wheat harvest seeds and ears'
    },
    'corn-seed': {
        local: 'images/corn-seed.jpg',
        fallback: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
        alt: 'Real sweet hybrid F1 corn'
    },
    'paddy-seed': {
        local: 'images/paddy-seed.jpg',
        fallback: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
        alt: 'Real agricultural rice paddy grains'
    },
    'vermicompost': {
        local: 'images/vermicompost.jpg',
        fallback: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80',
        alt: 'Real organic dark vermicompost enriched soil'
    },
    'npk': {
        local: 'images/npk.jpg',
        fallback: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80',
        alt: 'Real NPK water-soluble fertilizer nutrients'
    },
    'liquid-booster': {
        local: 'images/liquid-booster.jpg',
        fallback: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
        alt: 'Real liquid crop booster nutrition bottle'
    },
    'micronutrient': {
        local: 'images/micronutrient.jpg',
        fallback: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
        alt: 'Real soil micronutrient minerals mixture'
    },
    'neem-shield': {
        local: 'images/neem-shield.jpg',
        fallback: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
        alt: 'Real bio-pesticide neem shield botanical oil'
    },
    'fungicide': {
        local: 'images/fungicide.jpg',
        fallback: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
        alt: 'Real broad-spectrum agricultural fungicide'
    },
    'herbicide': {
        local: 'images/herbicide.jpg',
        fallback: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80',
        alt: 'Real selective agricultural weed herbicide'
    },
    'trowel': {
        local: 'images/trowel.jpg',
        fallback: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800&q=80',
        alt: 'Real ergonomic aluminum hand trowel in soil'
    },
    'sprayer': {
        local: 'images/sprayer.jpg',
        fallback: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
        alt: 'Real battery-operated knapsack sprayer'
    },
    'ph-meter': {
        local: 'images/ph-meter.jpg',
        fallback: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=800&q=80',
        alt: 'Real 3-in-1 soil moisture and pH tester device'
    }
};

// Get Real Product Image with fallback and optional product name tag badge
function getProductSVG(imageName, productName = '', showNameTag = true) {
    if (!productName) {
        const found = PRODUCTS.find(p => p.image === imageName);
        if (found) productName = found.name;
    }

    const item = PRODUCT_IMAGES[imageName] || {
        local: `images/${imageName}.jpg`,
        fallback: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=500&auto=format&fit=crop&q=80',
        alt: productName || imageName
    };

    const nameBadgeHTML = (showNameTag && productName)
        ? `<div class="product-img-name-tag"><span>${productName}</span></div>`
        : '';

    return `
        <div class="real-product-image-wrap">
            <img src="${item.local}" 
                 alt="${productName || item.alt}" 
                 class="real-product-img product-img" 
                 loading="lazy" 
                 onerror="if(this.src!=='${item.fallback}'){this.src='${item.fallback}';}" />
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

    // Contact Form submission — posts to backend API
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M12 2 A 10 10 0 0 1 22 12" stroke-linecap="round"></path>
                </svg> Sending...`;

            const name = contactForm.querySelector('#contact-name')?.value || contactForm.querySelector('[name="name"]')?.value || '';
            const email = contactForm.querySelector('#contact-email')?.value || contactForm.querySelector('[name="email"]')?.value || '';
            const phone = contactForm.querySelector('#contact-phone')?.value || contactForm.querySelector('[name="phone"]')?.value || '';
            const message = contactForm.querySelector('#contact-msg')?.value || contactForm.querySelector('[name="message"]')?.value || contactForm.querySelector('textarea')?.value || '';

            try {
                const res = await fetch(`${API_BASE}/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone, message }),
                });
                const data = await res.json();

                const formGroup = contactForm.parentElement;
                if (res.ok && data.success) {
                    formGroup.innerHTML = `
                        <div class="success-alert fade-in">
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2" style="margin-bottom:15px;">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <h3>Thank You!</h3>
                            <p>${data.message}</p>
                        </div>`;
                } else {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHTML;
                    const errMsg = data.errors ? data.errors.map(e => e.msg).join(' ') : (data.message || 'Failed to send. Please try again.');
                    showToast('⚠ ' + errMsg);
                }
            } catch (err) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
                showToast('⚠ Could not reach the server. Please check your connection.');
            }
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

    try {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerName: name, phone, address, items, userId: currentUser ? currentUser.id : null }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
            _showCheckoutSuccess(data, name, phone, address);
        } else {
            if (checkoutBtn) { checkoutBtn.disabled = false; checkoutBtn.innerHTML = origBtnText; }
            const errMsg = data.errors ? data.errors.map(e => e.msg).join(' ') : (data.message || 'Order failed. Please try again.');
            showToast('⚠ ' + errMsg);
        }
    } catch (err) {
        if (checkoutBtn) { checkoutBtn.disabled = false; checkoutBtn.innerHTML = origBtnText; }
        showToast('⚠ Cannot reach server. Please check your internet connection.');
    }
}

function _showCheckoutSuccess(data, name, phone, address) {
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

        const localOrders = JSON.parse(localStorage.getItem('md_local_orders') || '[]');
        localOrders.unshift({
            id: data.orderId || (Date.now() % 100000),
            user_id: currentUser.id,
            customer_name: name || currentUser.name,
            phone: phone || currentUser.phone,
            address: address || currentUser.location,
            total_amount: Number(data.totalAmount) || 0,
            status: 'pending',
            created_at: new Date().toISOString()
        });
        localStorage.setItem('md_local_orders', JSON.stringify(localOrders));
    }

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
                    ${cart.map(item => `<li>${item.product.name} &times; ${item.quantity}</li>`).join('')}
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
    const GEMINI_ENDPOINT = GEMINI_API_KEY
        ? 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=' + GEMINI_API_KEY
        : '';

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
        const text = chatInput.value.trim();
        if (!text) return;
        chatInput.value = '';
        sendMessage(text);
    });

    async function queryGemini(userText) {
        // 1. Try local Express backend proxy first if available
        try {
            const backendRes = await fetch(`http://${window.location.hostname}:3001/api/chat`, {
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
            if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('• ')) {
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
    // 1. Clear any stale permanent auto-login tokens from localStorage
    localStorage.removeItem('md_current_user');
    localStorage.removeItem('md_admin_token');
    localStorage.removeItem('md_admin_user');

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
                sessionStorage.removeItem('md_gateway_dismissed');
                localStorage.removeItem('md_current_user');
                currentUser = null;
                renderUserHeaderUI();
                showToast('👋 Signed out successfully.');

                // Reset and clear all login/register forms and inputs
                const forms = ['gw-user-login-form', 'gw-user-reg-form', 'gw-admin-login-form'];
                forms.forEach(id => {
                    const f = document.getElementById(id);
                    if (f) f.reset();
                });
                ['gw-login-id', 'gw-login-pass', 'gw-reg-name', 'gw-reg-phone', 'gw-reg-email', 'gw-reg-location', 'gw-reg-pass', 'gw-admin-user', 'gw-admin-pass'].forEach(id => {
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

    // Admin Login in Gateway
    const adminGwForm = document.getElementById('gw-admin-login-form');
    if (adminGwForm) {
        adminGwForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const u = document.getElementById('gw-admin-user').value.trim();
            const p = document.getElementById('gw-admin-pass').value.trim();
            const errElem = document.getElementById('gw-admin-error');
            const submitBtn = document.getElementById('btn-gw-admin-submit');

            if (errElem) errElem.style.display = 'none';
            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Authenticating...'; }

            let ok = false;
            try {
                const res = await fetch(`${API_BASE}/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: u, password: p }),
                    signal: AbortSignal.timeout(3000)
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    ok = true;
                    sessionStorage.setItem('md_admin_token', data.token);
                    sessionStorage.setItem('md_admin_user', JSON.stringify(data.user));
                    localStorage.removeItem('md_admin_token');
                    localStorage.removeItem('md_admin_user');
                }
            } catch (e) {}

            if (!ok) {
                const localUser = localStorage.getItem('md_admin_custom_user') || 'mdagro';
                const localPass = localStorage.getItem('md_admin_custom_pass') || 'mdagro6074';
                if (u === localUser && p === localPass) {
                    ok = true;
                    sessionStorage.setItem('md_admin_token', 'gw_adm_session_' + Date.now());
                    sessionStorage.setItem('md_admin_user', JSON.stringify({ username: localUser, name: 'Store Admin', role: 'Store Manager' }));
                    localStorage.removeItem('md_admin_token');
                    localStorage.removeItem('md_admin_user');
                }
            }

            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Enter Store Admin Dashboard ➔'; }

            if (ok) {
                const adminUserEl = document.getElementById('gw-admin-user');
                const adminPassEl = document.getElementById('gw-admin-pass');
                if (adminUserEl) adminUserEl.value = '';
                if (adminPassEl) adminPassEl.value = '';
                window.location.href = 'admin.html';
            } else {
                if (errElem) {
                    errElem.textContent = '❌ Invalid administrator username or password. Access denied.';
                    errElem.style.display = 'block';
                }
            }
        });
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
        const res = await fetch(`${API_BASE}/auth/my-orders?phone=${encodeURIComponent(currentUser.phone)}&userId=${currentUser.id || ''}`);
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

    content.innerHTML = orders.map(o => `
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
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:0.85rem; color:#475569;">
                    <span>Delivery: <strong>${escapeHTML(o.address || 'Standard Delivery')}</strong></span>
                </div>
                <div>
                    <strong style="font-size:1.1rem; color:#0f5132;">₹${Number(o.total_amount).toLocaleString('en-IN')}</strong>
                </div>
            </div>
        </div>
    `).join('');
}

