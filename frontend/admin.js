// ==========================================================================
// MD Agro Services — Admin Portal JavaScript Logic
// ==========================================================================

const DEFAULT_API_BASE = 'http://localhost:3001/api';

// Initial Mock / Demo Data for seamless offline operation & immediate preview
const MOCK_PRODUCTS = [
    { id: 's1', name: 'Premium Hybrid Cotton Seeds', category: 'seeds', price: 450, unit: 'per kg', rating: 4.8, reviews: 128, description: 'High-yield cotton seeds with excellent pest resistance and high adaptability to varying climatic conditions.', image: 'cotton-seed', tags: ['Best Seller', 'High Yield'], in_stock: 1 },
    { id: 's2', name: 'Golden Wheat Premium Seeds', category: 'seeds', price: 320, unit: 'per 5kg bag', rating: 4.7, reviews: 95, description: 'Certified premium grade wheat seeds optimized for maximum grain weight and rust resistance.', image: 'wheat-seed', tags: ['Organic', 'Certified'], in_stock: 1 },
    { id: 's3', name: 'Sweet Corn Hybrid F1', category: 'seeds', price: 180, unit: 'per 500g', rating: 4.9, reviews: 64, description: 'Super sweet F1 hybrid variety. Features high germination rates and robust seedling vigor.', image: 'corn-seed', tags: ['Sweet', 'F1 Hybrid'], in_stock: 1 },
    { id: 's4', name: 'High-Yield Paddy Seeds', category: 'seeds', price: 550, unit: 'per 10kg bag', rating: 4.6, reviews: 112, description: 'Premium rice seeds suitable for both direct seeding and transplanting. High milling yield.', image: 'paddy-seed', tags: ['Drought Tolerant'], in_stock: 1 },
    { id: 'f1', name: 'Organic Vermicompost booster', category: 'fertilizers', price: 250, unit: 'per 10kg bag', rating: 4.9, reviews: 210, description: '100% organic earthworm compost enriched with nitrogen, phosphorus, and potassium for robust soil health.', image: 'vermicompost', tags: ['100% Organic', 'Soil Health'], in_stock: 1 },
    { id: 'f2', name: 'NPK 19:19:19 Soluble Fertilizer', category: 'fertilizers', price: 350, unit: 'per kg', rating: 4.7, reviews: 142, description: 'Fully water-soluble fertilizer for balanced crop nutrition. Excellent for foliar application and fertigation.', image: 'npk', tags: ['Water Soluble'], in_stock: 1 },
    { id: 'f3', name: 'Premium Crop Booster Liquid', category: 'fertilizers', price: 499, unit: 'per 500ml', rating: 4.8, reviews: 87, description: 'Advanced liquid fertilizer with micronutrients and seaweed extract to accelerate growth and flowering.', image: 'liquid-booster', tags: ['Fast Acting', 'Micronutrients'], in_stock: 1 },
    { id: 'f4', name: 'Soil Micronutrient Mixture', category: 'fertilizers', price: 280, unit: 'per 2kg bag', rating: 4.5, reviews: 49, description: 'Formulated mix of Zinc, Iron, Manganese, Boron, and Copper to cure deficiencies in all crop types.', image: 'micronutrient', tags: ['Deficiency Cure'], in_stock: 1 },
    { id: 'p1', name: 'Bio-Pesticide Neem Shield', category: 'protection', price: 290, unit: 'per 500ml', rating: 4.7, reviews: 156, description: 'Cold-pressed neem oil formulation with high Azadirachtin content. Natural defense against 200+ chewing & sucking pests.', image: 'neem-shield', tags: ['Eco-Friendly', 'Non-Toxic'], in_stock: 1 },
    { id: 'p2', name: 'Fungicide Cure-All Pow', category: 'protection', price: 420, unit: 'per 500g', rating: 4.6, reviews: 73, description: 'Broad-spectrum systemic fungicide offering both protective and curative action against fungal leaf spots and rust.', image: 'fungicide', tags: ['Broad Spectrum'], in_stock: 1 },
    { id: 'p3', name: 'Selective Herbicide Green-Clean', category: 'protection', price: 380, unit: 'per Litre', rating: 4.4, reviews: 81, description: 'Post-emergence selective herbicide for effective control of broadleaf weeds without affecting the primary crops.', image: 'herbicide', tags: ['Selective Weed Control'], in_stock: 0 },
    { id: 't1', name: 'Premium Ergonomic Hand Trowel', category: 'tools', price: 150, unit: 'per unit', rating: 4.8, reviews: 90, description: 'Heavy duty rust-resistant aluminum trowel with comfortable rubber grip. Ideal for planting and weeding.', image: 'trowel', tags: ['Durable', 'Ergonomic'], in_stock: 1 },
    { id: 't2', name: 'Battery Operated Knapsack Sprayer', category: 'tools', price: 2800, unit: 'per unit', rating: 4.7, reviews: 215, description: '16-Litre heavy-duty electric sprayer with rechargeable battery, pressure regulator, and multiple spray nozzles.', image: 'sprayer', tags: ['Electric', 'High Capacity'], in_stock: 1 },
    { id: 't3', name: '3-in-1 Soil Moisture & pH Meter', category: 'tools', price: 650, unit: 'per unit', rating: 4.5, reviews: 134, description: 'Battery-free testing device for soil moisture, pH level, and sunlight intensity. Perfect for precision farming.', image: 'ph-meter', tags: ['Battery Free', 'Smart Tool'], in_stock: 1 },
];

const MOCK_ORDERS = [
    {
        id: 101,
        customer_name: 'Rajesh Patil',
        phone: '9822012345',
        address: 'Plot 14, Near Krishi Bhavan, Baramati, Pune - 413102',
        total_amount: 3250.00,
        status: 'pending',
        notes: 'Please dispatch morning batch. Farmer needs seeds before sowing cycle.',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        items: [
            { id: 1, product_id: 's1', product_name: 'Premium Hybrid Cotton Seeds', unit_price: 450, quantity: 4, line_total: 1800 },
            { id: 2, product_id: 'f2', product_name: 'NPK 19:19:19 Soluble Fertilizer', unit_price: 350, quantity: 3, line_total: 1050 },
            { id: 3, product_id: 'p1', product_name: 'Bio-Pesticide Neem Shield', unit_price: 290, quantity: 1, line_total: 290 },
            { id: 4, product_id: 't1', product_name: 'Premium Ergonomic Hand Trowel', unit_price: 150, quantity: 1, line_total: 150 },
        ]
    },
    {
        id: 102,
        customer_name: 'Suresh More',
        phone: '9421098765',
        address: 'Gat No. 88, Post Rahuri, Dist. Ahmednagar - 413705',
        total_amount: 3450.00,
        status: 'confirmed',
        notes: 'Call before dispatch. Village road under maintenance.',
        created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
        items: [
            { id: 5, product_id: 't2', product_name: 'Battery Operated Knapsack Sprayer', unit_price: 2800, quantity: 1, line_total: 2800 },
            { id: 6, product_id: 't3', product_name: '3-in-1 Soil Moisture & pH Meter', unit_price: 650, quantity: 1, line_total: 650 },
        ]
    },
    {
        id: 103,
        customer_name: 'Kiran Verma',
        phone: '9890123456',
        address: 'Farm House #4, Shujalpur Road, Ujjain, MP - 456006',
        total_amount: 1998.00,
        status: 'dispatched',
        notes: 'Urgent tomato foliar spray requirement.',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        items: [
            { id: 7, product_id: 'f3', product_name: 'Premium Crop Booster Liquid', unit_price: 499, quantity: 4, line_total: 1996 },
        ]
    },
    {
        id: 104,
        customer_name: 'Manpreet Singh',
        phone: '9815033445',
        address: 'VPO Samrala, Ludhiana, Punjab - 141114',
        total_amount: 2750.00,
        status: 'delivered',
        notes: 'Delivered directly to farm gate.',
        created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
        items: [
            { id: 8, product_id: 's4', product_name: 'High-Yield Paddy Seeds', unit_price: 550, quantity: 5, line_total: 2750 },
        ]
    }
];

const MOCK_INQUIRIES = [
    { id: 1, name: 'Anil Deshmukh', email: 'anil.deshmukh@gmail.com', phone: '9822156789', message: 'I have 5 acres of cotton. Facing severe pink bollworm infestation in flowering stage. Can you suggest the exact dosage of Neem Shield?', is_read: 0, created_at: new Date(Date.now() - 3600000 * 4).toISOString() },
    { id: 2, name: 'Vikram Joshi', email: 'v.joshi@agritech.in', phone: '9422034567', message: 'Do you provide bulk delivery of NPK 19:19:19 fertilizers for our farmer cooperative in Nashik? Looking for 50 bags.', is_read: 0, created_at: new Date(Date.now() - 3600000 * 12).toISOString() },
    { id: 3, name: 'Ganesh Kadam', email: 'ganeshkadam@yahoo.com', phone: '9765432109', message: 'Inquiry regarding warranty on the 16-litre knapsack sprayer battery and nozzle attachments.', is_read: 1, created_at: new Date(Date.now() - 3600000 * 36).toISOString() }
];

const MOCK_SUBSCRIBERS = [
    { id: 1, email: 'farmer.kiran@gmail.com', is_active: 1, subscribed_at: '2026-08-15 10:24:00' },
    { id: 2, email: 'suresh.more.agri@outlook.com', is_active: 1, subscribed_at: '2026-08-20 14:15:30' },
    { id: 3, email: 'patilfarms.baramati@gmail.com', is_active: 1, subscribed_at: '2026-08-28 09:45:12' },
    { id: 4, email: 'manpreetrpaddy@yahoo.in', is_active: 1, subscribed_at: '2026-09-01 16:30:00' },
];

const MOCK_USERS = [
    {
        id: 1,
        name: 'Ramesh Patil',
        phone: '9822145670',
        email: 'ramesh.patil@gmail.com',
        location: 'Nashik, Maharashtra',
        role: 'farmer',
        is_active: 1,
        created_at: '2026-08-25 11:30:00',
        total_orders: 2,
        total_spent: 1250
    },
    {
        id: 2,
        name: 'Santosh Shinde',
        phone: '9423589123',
        email: 'santosh.shinde@rediffmail.com',
        location: 'Dindori, Maharashtra',
        role: 'farmer',
        is_active: 1,
        created_at: '2026-08-28 14:15:00',
        total_orders: 1,
        total_spent: 450
    },
    {
        id: 3,
        name: 'Ganesh Jadhav',
        phone: '9850123456',
        email: 'ganesh.jadhav@gmail.com',
        location: 'Niphad, Maharashtra',
        role: 'farmer',
        is_active: 1,
        created_at: '2026-09-02 09:20:00',
        total_orders: 3,
        total_spent: 2100
    }
];

const MOCK_ADVISORY = [
    { crop: 'cotton', issue: 'pests', count: 48 },
    { crop: 'wheat', issue: 'deficiency', count: 35 },
    { crop: 'paddy', issue: 'fungal', count: 29 },
    { crop: 'vegetables', issue: 'pests', count: 26 },
    { crop: 'cotton', issue: 'acidity', count: 22 },
    { crop: 'vegetables', issue: 'water', count: 18 },
];

// Product Image map for rendering
const PRODUCT_IMAGES = {
    'cotton-seed': { local: 'images/cotton-seed.jpg', fallback: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=400&q=80' },
    'wheat-seed': { local: 'images/wheat-seed.jpg', fallback: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80' },
    'corn-seed': { local: 'images/corn-seed.jpg', fallback: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80' },
    'paddy-seed': { local: 'images/paddy-seed.jpg', fallback: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=400&q=80' },
    'vermicompost': { local: 'images/vermicompost.jpg', fallback: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=400&q=80' },
    'npk': { local: 'images/npk.jpg', fallback: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=400&q=80' },
    'liquid-booster': { local: 'images/liquid-booster.jpg', fallback: 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=400&q=80' },
    'micronutrient': { local: 'images/micronutrient.jpg', fallback: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=400&q=80' },
    'neem-shield': { local: 'images/neem-shield.jpg', fallback: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80' },
    'fungicide': { local: 'images/fungicide.jpg', fallback: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=400&q=80' },
    'herbicide': { local: 'images/herbicide.jpg', fallback: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80' },
    'trowel': { local: 'images/trowel.jpg', fallback: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80' },
    'sprayer': { local: 'images/sprayer.jpg', fallback: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80' },
    'ph-meter': { local: 'images/ph-meter.jpg', fallback: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=400&q=80' },
    'md-agro-store': { local: 'images/md-agro-store.jpg', fallback: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80' }
};

// ==========================================================================
// Admin App Controller
// ==========================================================================
class AdminApp {
    constructor() {
        this.apiBase = localStorage.getItem('md_admin_api_base') || DEFAULT_API_BASE;
        // Session-only admin authentication: requires credentials when reopening admin portal
        this.token = sessionStorage.getItem('md_admin_token') || null;
        this.adminUser = JSON.parse(sessionStorage.getItem('md_admin_user') || 'null');
        // Clear any stale permanent auto-login tokens from localStorage
        localStorage.removeItem('md_admin_token');
        localStorage.removeItem('md_admin_user');
        this.isOnline = false;

        // Data caches
        this.products = [];
        this.orders = [];
        this.users = [];
        this.inquiries = [];
        this.subscribers = [];
        this.advisoryStats = [];
        this.overview = null;

        // View filters
        this.orderFilterStatus = 'all';
        this.orderSearchQuery = '';
        this.userFilterStatus = 'all';
        this.userSearchQuery = '';
        this.productFilterCategory = 'all';
        this.productSearchQuery = '';
        this.inquiryFilter = 'all';

        // Current editing items
        this.activeOrderId = null;
        this.activeUserId = null;
        this.activeInquiryId = null;
        this.activeProductEditId = null;
    }

    init() {
        this.clearLoginForm();
        this.initThemeToggle();
        this.bindGlobalEvents();
        this.checkAuthStatus();
        this.initTodayDate();
    }

    initThemeToggle() {
        const themeToggleBtn = document.getElementById('admin-theme-toggle-btn');
        
        // Sync current theme state
        const currentTheme = document.documentElement.getAttribute('data-theme') || 
            localStorage.getItem('md_theme') || 
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('title', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            themeToggleBtn.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');

            themeToggleBtn.onclick = () => {
                const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
                const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', nextTheme);
                localStorage.setItem('md_theme', nextTheme);
                themeToggleBtn.setAttribute('title', nextTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
                themeToggleBtn.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
                this.showToast(nextTheme === 'dark' ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated', 'info');
            };
        }

        // Listen for OS scheme changes if not explicitly set
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

    clearLoginForm() {
        const loginForm = document.getElementById('admin-login-form');
        if (loginForm) {
            loginForm.reset();
        }
        const userInput = document.getElementById('admin-user-input');
        const passInput = document.getElementById('admin-pass-input');
        if (userInput) userInput.value = '';
        if (passInput) passInput.value = '';
        const errorElem = document.getElementById('auth-error-msg');
        if (errorElem) {
            errorElem.style.display = 'none';
            errorElem.textContent = '';
        }
    }

    initTodayDate() {
        const dateElem = document.getElementById('dash-current-date');
        if (dateElem) {
            const now = new Date();
            dateElem.textContent = now.toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }
    }

    // ─── AUTHENTICATION ───────────────────────────────────────────────────
    checkAuthStatus() {
        const authOverlay = document.getElementById('admin-auth-overlay');
        const adminLayout = document.getElementById('admin-layout');

        if (this.token && this.adminUser) {
            if (authOverlay) authOverlay.style.display = 'none';
            if (adminLayout) adminLayout.style.display = 'flex';
            
            const nameElem = document.getElementById('admin-display-name');
            const greetElem = document.getElementById('dash-admin-greeting');
            if (nameElem) nameElem.textContent = this.adminUser.name || this.adminUser.username;
            if (greetElem) greetElem.textContent = this.adminUser.name || 'Store Administrator';

            // Connect and load portal data
            this.connectAndLoad();
        } else {
            if (authOverlay) authOverlay.style.display = 'flex';
            if (adminLayout) adminLayout.style.display = 'none';
            this.clearLoginForm();
        }
    }

    async handleLogin(username, password) {
        const errorElem = document.getElementById('auth-error-msg');
        const loginBtn = document.getElementById('admin-login-btn');
        if (errorElem) errorElem.style.display = 'none';

        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<span>Verifying credentials...</span>';
        }

        try {
            // Attempt remote backend login first
            const res = await fetch(`${this.apiBase}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                this.token = data.token;
                this.adminUser = data.user;
                sessionStorage.setItem('md_admin_token', this.token);
                sessionStorage.setItem('md_admin_user', JSON.stringify(this.adminUser));
                localStorage.removeItem('md_admin_token');
                localStorage.removeItem('md_admin_user');
                this.clearLoginForm();
                this.checkAuthStatus();
                this.showToast('✅ Welcome to MD Agro Admin Portal!', 'success');
                return;
            } else {
                throw new Error(data.message || 'Invalid credentials.');
            }
        } catch (err) {
            // Check against local fallback / configured admin credentials
            const localUser = localStorage.getItem('md_admin_custom_user') || 'mdagro';
            const localPass = localStorage.getItem('md_admin_custom_pass') || 'mdagro6074';

            if (username === localUser && password === localPass) {
                this.token = 'local_adm_session_' + Date.now();
                this.adminUser = { username: localUser, name: 'MD Agro Store Administrator', role: 'Store Manager' };
                sessionStorage.setItem('md_admin_token', this.token);
                sessionStorage.setItem('md_admin_user', JSON.stringify(this.adminUser));
                localStorage.removeItem('md_admin_token');
                localStorage.removeItem('md_admin_user');
                this.clearLoginForm();
                this.checkAuthStatus();
                this.showToast('✅ Signed in successfully (Offline/Local Admin Mode)', 'success');
                return;
            }

            // Display error
            if (errorElem) {
                errorElem.textContent = '❌ Invalid administrator credentials. Please verify your passcode.';
                errorElem.style.display = 'block';
            }
        } finally {
            if (loginBtn) {
                loginBtn.disabled = false;
                loginBtn.innerHTML = `<span>Sign In to Admin Portal</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            }
        }
    }

    logout() {
        this.token = null;
        this.adminUser = null;
        sessionStorage.removeItem('md_admin_token');
        sessionStorage.removeItem('md_admin_user');
        localStorage.removeItem('md_admin_token');
        localStorage.removeItem('md_admin_user');
        this.clearLoginForm();
        this.checkAuthStatus();
        this.showToast('Logged out of Admin Portal.', 'warning');
    }

    // ─── CONNECTION & DATA LOADING ─────────────────────────────────────────
    async connectAndLoad() {
        this.updateConnectionStatus('checking', 'Connecting to database...');

        try {
            const res = await fetch(`${this.apiBase}/health`, { signal: AbortSignal.timeout(3000) });
            if (res.ok) {
                this.isOnline = true;
                this.updateConnectionStatus('online', '🟢 Live Database Connected');
            } else {
                throw new Error('API returned non-200');
            }
        } catch (e) {
            this.isOnline = false;
            this.updateConnectionStatus('demo', '🟠 Demo Mode (Local Active)');
        }

        // Fetch data
        await this.loadAllData();
    }

    updateConnectionStatus(status, text) {
        const pill = document.getElementById('conn-status-pill');
        const label = document.getElementById('conn-status-label');
        if (pill && label) {
            pill.className = 'connection-status-pill ' + status;
            label.textContent = text;
        }
    }

    async loadAllData() {
        await Promise.allSettled([
            this.fetchOverview(),
            this.fetchOrders(),
            this.fetchUsers(),
            this.fetchProducts(),
            this.fetchInquiries(),
            this.fetchSubscribers(),
            this.fetchAdvisoryStats()
        ]);

        this.renderAllViews();
    }

    // ─── DATA FETCHERS (WITH LIVE + MOCK RESILIENCE) ───────────────────────
    async fetchOverview() {
        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/admin/overview`);
                const data = await res.json();
                if (res.ok && data.success) {
                    this.overview = data.data;
                    return;
                }
            } catch (e) {
                console.warn('[Admin] Live overview failed, computing locally.');
            }
        }

        // Local computation from current caches or mock data
        const orders = this.orders.length ? this.orders : MOCK_ORDERS;
        const products = this.products.length ? this.products : MOCK_PRODUCTS;
        const inquiries = this.inquiries.length ? this.inquiries : MOCK_INQUIRIES;
        const subscribers = this.subscribers.length ? this.subscribers : MOCK_SUBSCRIBERS;

        const totalRevenue = orders
            .filter(o => o.status !== 'cancelled')
            .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

        this.overview = {
            orders: {
                total: orders.length,
                pending: orders.filter(o => o.status === 'pending').length,
                confirmed: orders.filter(o => o.status === 'confirmed').length,
                dispatched: orders.filter(o => o.status === 'dispatched').length,
                delivered: orders.filter(o => o.status === 'delivered').length,
                cancelled: orders.filter(o => o.status === 'cancelled').length,
                revenue: totalRevenue
            },
            products: {
                total: products.length,
                inStock: products.filter(p => p.in_stock === 1).length,
                outOfStock: products.filter(p => p.in_stock === 0).length,
            },
            messages: {
                total: inquiries.length,
                unread: inquiries.filter(m => !m.is_read).length,
            },
            subscribers: {
                total: subscribers.length,
                active: subscribers.filter(s => s.is_active).length,
            },
            users: {
                total: this.users.length,
                active: this.users.filter(u => u.is_active).length,
            },
            recentOrders: orders.slice(0, 5)
        };
    }

    async fetchOrders() {
        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/orders?limit=100`);
                const data = await res.json();
                if (res.ok && data.success) {
                    this.orders = data.data;
                    return;
                }
            } catch (e) {
                console.warn('[Admin] Live orders fetch failed, using local.');
            }
        }

        // Restore from localStorage or default to MOCK_ORDERS
        const saved = localStorage.getItem('md_local_orders');
        this.orders = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(MOCK_ORDERS));
    }

    async fetchProducts() {
        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/products?all=true`);
                const data = await res.json();
                if (res.ok && data.success) {
                    this.products = data.data;
                    return;
                }
            } catch (e) {
                console.warn('[Admin] Live products fetch failed, using local.');
            }
        }

        const saved = localStorage.getItem('md_local_products');
        this.products = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(MOCK_PRODUCTS));
    }

    async fetchInquiries() {
        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/contact`);
                const data = await res.json();
                if (res.ok && data.success) {
                    this.inquiries = data.data;
                    return;
                }
            } catch (e) {
                console.warn('[Admin] Live inquiries fetch failed, using local.');
            }
        }

        const saved = localStorage.getItem('md_local_inquiries');
        this.inquiries = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(MOCK_INQUIRIES));
    }

    async fetchSubscribers() {
        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/newsletter/subscribers`);
                const data = await res.json();
                if (res.ok && data.success) {
                    this.subscribers = data.data;
                    return;
                }
            } catch (e) {
                console.warn('[Admin] Live subscribers fetch failed, using local.');
            }
        }

        const saved = localStorage.getItem('md_local_subscribers');
        this.subscribers = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(MOCK_SUBSCRIBERS));
    }

    async fetchAdvisoryStats() {
        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/advisory/stats`);
                const data = await res.json();
                if (res.ok && data.success) {
                    this.advisoryStats = data.data;
                    return;
                }
            } catch (e) {
                console.warn('[Admin] Live advisory stats failed, using local.');
            }
        }

        this.advisoryStats = MOCK_ADVISORY;
    }

    async fetchUsers() {
        const localUsers = JSON.parse(localStorage.getItem('md_users_db') || '[]');

        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/admin/users`);
                const data = await res.json();
                if (res.ok && data.success && Array.isArray(data.users)) {
                    const serverPhones = new Set(data.users.map(u => String(u.phone)));
                    const unsyncedLocals = localUsers.filter(u => !serverPhones.has(String(u.phone)));
                    this.users = [...data.users, ...unsyncedLocals];
                    localStorage.setItem('md_users_db', JSON.stringify(this.users));
                    return;
                }
            } catch (e) {
                console.warn('[Admin] Live users fetch failed, falling back to local database.');
            }
        }

        if (localUsers && localUsers.length > 0) {
            this.users = localUsers;
        } else {
            this.users = MOCK_USERS;
            localStorage.setItem('md_users_db', JSON.stringify(MOCK_USERS));
        }
    }

    saveLocalState(key) {
        if (key === 'orders') localStorage.setItem('md_local_orders', JSON.stringify(this.orders));
        if (key === 'users') localStorage.setItem('md_users_db', JSON.stringify(this.users));
        if (key === 'products') localStorage.setItem('md_local_products', JSON.stringify(this.products));
        if (key === 'inquiries') localStorage.setItem('md_local_inquiries', JSON.stringify(this.inquiries));
        if (key === 'subscribers') localStorage.setItem('md_local_subscribers', JSON.stringify(this.subscribers));
    }

    // ─── RENDERING VIEWS ───────────────────────────────────────────────────
    renderAllViews() {
        this.renderBadges();
        this.renderDashboard();
        this.renderOrdersTable();
        this.renderUsersTable();
        this.renderProductsTable();
        this.renderInquiriesTable();
        this.renderSubscribersTable();
        this.renderAdvisoryAnalytics();
    }

    renderBadges() {
        const pendingCount = this.orders.filter(o => o.status === 'pending').length;
        const unreadMsgCount = this.inquiries.filter(i => !i.is_read).length;

        const badgePending = document.getElementById('badge-pending-orders');
        const badgeUsers = document.getElementById('badge-total-users');
        const badgeProducts = document.getElementById('badge-total-products');
        const badgeUnread = document.getElementById('badge-unread-msgs');
        const badgeSubs = document.getElementById('badge-total-subs');

        if (badgePending) {
            badgePending.textContent = pendingCount;
            badgePending.style.display = pendingCount > 0 ? 'inline-block' : 'none';
        }
        if (badgeUsers) badgeUsers.textContent = this.users.length;
        if (badgeProducts) badgeProducts.textContent = this.products.length;
        if (badgeUnread) {
            badgeUnread.textContent = unreadMsgCount;
            badgeUnread.style.display = unreadMsgCount > 0 ? 'inline-block' : 'none';
        }
        if (badgeSubs) badgeSubs.textContent = this.subscribers.length;

        const inquiriesBadge = document.getElementById('inquiries-unread-badge');
        if (inquiriesBadge) inquiriesBadge.textContent = `${unreadMsgCount} Unread`;
    }

    renderDashboard() {
        if (!this.overview) return;

        // KPI Revenue
        const revElem = document.getElementById('kpi-revenue');
        if (revElem) revElem.textContent = `₹${Number(this.overview.orders.revenue).toLocaleString('en-IN')}`;

        // KPI Orders
        const ordElem = document.getElementById('kpi-orders');
        if (ordElem) ordElem.textContent = this.overview.orders.total;
        const ordTags = document.getElementById('kpi-orders-tags');
        if (ordTags) {
            ordTags.innerHTML = `
                <span class="tag-chip tag-pending">${this.overview.orders.pending} Pending</span>
                <span class="tag-chip tag-confirmed">${this.overview.orders.confirmed + this.overview.orders.dispatched} Active</span>
            `;
        }

        // KPI Products
        const prodElem = document.getElementById('kpi-products');
        if (prodElem) prodElem.textContent = this.overview.products.total;
        const prodSub = document.getElementById('kpi-products-sub');
        if (prodSub) prodSub.textContent = `${this.overview.products.inStock} In Stock • ${this.overview.products.outOfStock} Out of Stock`;

        // KPI Messages
        const msgElem = document.getElementById('kpi-messages');
        if (msgElem) msgElem.textContent = this.overview.messages.total;
        const msgSub = document.getElementById('kpi-messages-sub');
        if (msgSub) msgSub.textContent = `${this.overview.messages.unread} unread inquiry messages`;

        // KPI Users
        const userElem = document.getElementById('kpi-users');
        if (userElem) userElem.textContent = (this.overview.users && this.overview.users.total) || this.users.length;
        const userSub = document.getElementById('kpi-users-sub');
        if (userSub) {
            const act = (this.overview.users && this.overview.users.active) || this.users.filter(u => u.is_active).length;
            userSub.textContent = `${act} active farmer accounts`;
        }

        // Order Status Distribution Bars
        const totalOrd = this.overview.orders.total || 1;
        this.setBarWidth('dist-pending', this.overview.orders.pending, totalOrd, '.bar-pending');
        this.setBarWidth('dist-confirmed', this.overview.orders.confirmed, totalOrd, '.bar-confirmed');
        this.setBarWidth('dist-dispatched', this.overview.orders.dispatched, totalOrd, '.bar-dispatched');
        this.setBarWidth('dist-delivered', this.overview.orders.delivered, totalOrd, '.bar-delivered');

        // Top Crops in Dashboard
        this.renderDashTopCrops();

        // Recent Orders Table
        this.renderDashRecentOrders();
    }

    setBarWidth(countElemId, count, total, barClass) {
        const countElem = document.getElementById(countElemId);
        if (countElem) countElem.textContent = count;
        const barFill = document.querySelector(barClass);
        if (barFill) {
            const pct = Math.round((count / total) * 100);
            barFill.style.width = `${pct}%`;
        }
    }

    renderDashTopCrops() {
        const container = document.getElementById('dash-top-crops');
        if (!container) return;

        const cropCounts = {};
        this.advisoryStats.forEach(item => {
            cropCounts[item.crop] = (cropCounts[item.crop] || 0) + Number(item.count || 1);
        });

        const sorted = Object.entries(cropCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
        if (sorted.length === 0) {
            container.innerHTML = '<p class="loading-state">No advisory query logs recorded yet.</p>';
            return;
        }

        const cropEmoji = { cotton: '🌱 Cotton (कापूस)', wheat: '🌾 Wheat (गहू)', paddy: '🌾 Paddy (भात)', vegetables: '🥦 Vegetables (भाजीपाला)' };

        container.innerHTML = sorted.map(([crop, count]) => `
            <div class="crop-insight-item">
                <span class="crop-name-badge">${cropEmoji[crop] || crop}</span>
                <span class="crop-query-count">${count} Inquiries</span>
            </div>
        `).join('');
    }

    renderDashRecentOrders() {
        const tbody = document.getElementById('dash-recent-orders-tbody');
        if (!tbody) return;

        const recent = this.orders.slice(0, 5);
        if (recent.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="loading-state">No orders registered in system yet.</td></tr>';
            return;
        }

        tbody.innerHTML = recent.map(o => `
            <tr>
                <td><strong>#${o.id}</strong></td>
                <td><strong>${this.escapeHtml(o.customer_name)}</strong></td>
                <td>${this.escapeHtml(o.phone)}</td>
                <td><strong>₹${Number(o.total_amount).toLocaleString('en-IN')}</strong></td>
                <td><span class="status-pill status-${o.status}">${o.status}</span></td>
                <td>${this.formatDate(o.created_at)}</td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="adminApp.openOrderDetails(${o.id})">Details</button>
                </td>
            </tr>
        `).join('');
    }

    // ─── ORDERS TABLE RENDERING ────────────────────────────────────────────
    renderOrdersTable() {
        const tbody = document.getElementById('orders-table-tbody');
        if (!tbody) return;

        // Count for tabs
        const cntAll = document.getElementById('filter-cnt-all');
        const cntPending = document.getElementById('filter-cnt-pending');
        const cntConfirmed = document.getElementById('filter-cnt-confirmed');
        const cntDispatched = document.getElementById('filter-cnt-dispatched');
        const cntDelivered = document.getElementById('filter-cnt-delivered');

        if (cntAll) cntAll.textContent = this.orders.length;
        if (cntPending) cntPending.textContent = this.orders.filter(o => o.status === 'pending').length;
        if (cntConfirmed) cntConfirmed.textContent = this.orders.filter(o => o.status === 'confirmed').length;
        if (cntDispatched) cntDispatched.textContent = this.orders.filter(o => o.status === 'dispatched').length;
        if (cntDelivered) cntDelivered.textContent = this.orders.filter(o => o.status === 'delivered').length;

        let filtered = this.orders;

        if (this.orderFilterStatus !== 'all') {
            filtered = filtered.filter(o => o.status === this.orderFilterStatus);
        }

        if (this.orderSearchQuery.trim()) {
            const q = this.orderSearchQuery.toLowerCase().trim();
            filtered = filtered.filter(o => 
                String(o.id).includes(q) ||
                (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
                (o.phone && o.phone.includes(q)) ||
                (o.address && o.address.toLowerCase().includes(q))
            );
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" class="loading-state">No orders match the selected filters.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(o => `
            <tr>
                <td><strong>#${o.id}</strong></td>
                <td>
                    <strong>${this.escapeHtml(o.customer_name)}</strong>
                </td>
                <td><a href="tel:${o.phone}" style="color:var(--adm-primary); font-weight:600; text-decoration:none;">📞 ${this.escapeHtml(o.phone)}</a></td>
                <td style="max-width:240px; font-size:0.82rem; color:#475569;" title="${this.escapeHtml(o.address)}">
                    ${this.escapeHtml(o.address.length > 50 ? o.address.substring(0, 50) + '...' : o.address)}
                </td>
                <td><strong>₹${Number(o.total_amount).toLocaleString('en-IN')}</strong></td>
                <td>
                    <select class="status-pill status-${o.status}" style="cursor:pointer;" onchange="adminApp.quickUpdateOrderStatus(${o.id}, this.value)">
                        <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="confirmed" ${o.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="dispatched" ${o.status === 'dispatched' ? 'selected' : ''}>Dispatched</option>
                        <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td style="font-size:0.8rem; color:#64748b;">${this.formatDate(o.created_at)}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-outline" onclick="adminApp.openOrderDetails(${o.id})" title="View Full Items & Print Slip">
                            View
                        </button>
                        <button class="btn-action-icon btn-delete" onclick="adminApp.confirmDeleteOrder(${o.id})" title="Delete Order">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // ─── PRODUCTS TABLE RENDERING ──────────────────────────────────────────
    renderProductsTable() {
        const tbody = document.getElementById('products-table-tbody');
        if (!tbody) return;

        let filtered = this.products;

        if (this.productFilterCategory !== 'all') {
            filtered = filtered.filter(p => p.category === this.productFilterCategory);
        }

        if (this.productSearchQuery.trim()) {
            const q = this.productSearchQuery.toLowerCase().trim();
            filtered = filtered.filter(p => 
                p.id.toLowerCase().includes(q) ||
                p.name.toLowerCase().includes(q) ||
                (p.description && p.description.toLowerCase().includes(q)) ||
                (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q)))
            );
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" class="loading-state">No products found matching criteria.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(p => {
            const imgData = PRODUCT_IMAGES[p.image] || { local: 'images/md-agro-store.jpg', fallback: 'images/md-agro-store.jpg' };
            const imgSrc = imgData.local;
            const tags = Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || '');

            return `
                <tr>
                    <td>
                        <div class="prod-table-cell">
                            <img src="${imgSrc}" onerror="this.src='${imgData.fallback}'" alt="${this.escapeHtml(p.name)}" class="prod-thumb">
                            <div>
                                <span class="prod-cell-name">${this.escapeHtml(p.name)}</span>
                                <span class="prod-cell-tags">${this.escapeHtml(tags)}</span>
                            </div>
                        </div>
                    </td>
                    <td><code>${p.id}</code></td>
                    <td><span class="tag-chip" style="text-transform:capitalize; background:#e0f2fe; color:#0369a1;">${p.category}</span></td>
                    <td><strong>₹${p.price}</strong></td>
                    <td style="color:#64748b; font-size:0.85rem;">${this.escapeHtml(p.unit)}</td>
                    <td>
                        <button class="stock-toggle-btn ${p.in_stock ? 'is-instock' : 'is-outstock'}" 
                                onclick="adminApp.toggleProductStock('${p.id}')"
                                title="Click to change availability">
                            ${p.in_stock ? '● In Stock' : '✕ Out of Stock'}
                        </button>
                    </td>
                    <td>⭐ ${p.rating || '4.5'} <small style="color:#94a3b8">(${p.reviews || 0})</small></td>
                    <td>
                        <div class="table-actions">
                            <button class="btn-action-icon" onclick="adminApp.openEditProductModal('${p.id}')" title="Edit Product">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button class="btn-action-icon btn-delete" onclick="adminApp.confirmDeleteProduct('${p.id}')" title="Delete Product">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // ─── INQUIRIES TABLE RENDERING ─────────────────────────────────────────
    renderInquiriesTable() {
        const tbody = document.getElementById('inquiries-table-tbody');
        if (!tbody) return;

        let filtered = this.inquiries;

        if (this.inquiryFilter === 'unread') filtered = filtered.filter(m => !m.is_read);
        if (this.inquiryFilter === 'read') filtered = filtered.filter(m => m.is_read);

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="loading-state">No inquiries found in this category.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(m => `
            <tr style="${!m.is_read ? 'background:#f0fdf4;' : ''}">
                <td>
                    <span class="status-pill ${m.is_read ? 'status-read' : 'status-unread'}">
                        ${m.is_read ? 'Read' : '● Unread'}
                    </span>
                </td>
                <td><strong>${this.escapeHtml(m.name)}</strong></td>
                <td><a href="mailto:${m.email}" style="color:var(--adm-primary); text-decoration:none;">${this.escapeHtml(m.email)}</a></td>
                <td>${m.phone ? `<a href="tel:${m.phone}" style="color:var(--adm-primary); text-decoration:none;">📞 ${this.escapeHtml(m.phone)}</a>` : '<span style="color:#94a3b8">—</span>'}</td>
                <td style="max-width:280px; font-size:0.85rem;" title="${this.escapeHtml(m.message)}">
                    ${this.escapeHtml(m.message.length > 60 ? m.message.substring(0, 60) + '...' : m.message)}
                </td>
                <td style="font-size:0.8rem; color:#64748b;">${this.formatDate(m.created_at)}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-outline" onclick="adminApp.openInquiryModal(${m.id})">Read</button>
                        <button class="btn-action-icon btn-delete" onclick="adminApp.confirmDeleteInquiry(${m.id})" title="Delete Inquiry">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // ─── SUBSCRIBERS TABLE RENDERING ───────────────────────────────────────
    renderSubscribersTable() {
        const tbody = document.getElementById('subscribers-table-tbody');
        if (!tbody) return;

        if (this.subscribers.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="loading-state">No subscribers registered yet.</td></tr>`;
            return;
        }

        tbody.innerHTML = this.subscribers.map(s => `
            <tr>
                <td>#${s.id}</td>
                <td><strong>${this.escapeHtml(s.email)}</strong></td>
                <td>
                    <span class="status-pill ${s.is_active ? 'status-delivered' : 'status-cancelled'}">
                        ${s.is_active ? 'Active' : 'Unsubscribed'}
                    </span>
                </td>
                <td style="font-size:0.82rem; color:#64748b;">${this.formatDate(s.subscribed_at)}</td>
                <td>
                    <button class="btn-action-icon btn-delete" onclick="adminApp.confirmDeleteSubscriber(${s.id})" title="Remove Subscriber">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // ─── ADVISORY ANALYTICS RENDERING ──────────────────────────────────────
    renderAdvisoryAnalytics() {
        const cropsContainer = document.getElementById('advisory-crops-container');
        const issuesContainer = document.getElementById('advisory-issues-container');
        const badgeTotal = document.getElementById('advisory-total-queries-badge');

        const cropCounts = {};
        const issueCounts = {};
        let total = 0;

        this.advisoryStats.forEach(item => {
            const count = Number(item.count || 1);
            cropCounts[item.crop] = (cropCounts[item.crop] || 0) + count;
            issueCounts[item.issue] = (issueCounts[item.issue] || 0) + count;
            total += count;
        });

        if (badgeTotal) badgeTotal.textContent = `${total} Farmer Queries Logged`;

        const cropLabels = {
            cotton: '🌱 Cotton (कापूस)',
            wheat: '🌾 Wheat (गहू)',
            paddy: '🌾 Paddy (भात)',
            vegetables: '🥦 Vegetables & Horticulture'
        };

        const issueLabels = {
            pests: '🐛 Pink Bollworm & Insect Pests',
            deficiency: '🧪 Nitrogen / Zinc Deficiency',
            acidity: '⚖️ Soil pH & Acidity Imbalance',
            fungal: '🍄 Root Rot & Rust Fungal Diseases',
            water: '💧 Moisture Stress & Irrigation'
        };

        if (cropsContainer) {
            const sortedCrops = Object.entries(cropCounts).sort((a, b) => b[1] - a[1]);
            const maxCrop = Math.max(...Object.values(cropCounts), 1);

            cropsContainer.innerHTML = sortedCrops.map(([crop, count]) => {
                const pct = Math.round((count / maxCrop) * 100);
                return `
                    <div class="adv-bar-row">
                        <div class="adv-bar-header">
                            <span>${cropLabels[crop] || crop}</span>
                            <strong>${count} inquiries (${Math.round((count / (total || 1)) * 100)}%)</strong>
                        </div>
                        <div class="adv-bar-track">
                            <div class="adv-bar-fill" style="width: ${pct}%;"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        if (issuesContainer) {
            const sortedIssues = Object.entries(issueCounts).sort((a, b) => b[1] - a[1]);
            const maxIssue = Math.max(...Object.values(issueCounts), 1);

            issuesContainer.innerHTML = sortedIssues.map(([issue, count]) => {
                const pct = Math.round((count / maxIssue) * 100);
                return `
                    <div class="adv-bar-row">
                        <div class="adv-bar-header">
                            <span>${issueLabels[issue] || issue}</span>
                            <strong>${count} queries (${Math.round((count / (total || 1)) * 100)}%)</strong>
                        </div>
                        <div class="adv-bar-track">
                            <div class="adv-bar-fill" style="width: ${pct}%; background:linear-gradient(90deg, #f59e0b 0%, #d97706 100%);"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // ─── ORDER ACTIONS ─────────────────────────────────────────────────────
    async openOrderDetails(orderId) {
        this.activeOrderId = orderId;
        const modal = document.getElementById('order-details-modal');
        const content = document.getElementById('modal-order-content');
        const title = document.getElementById('modal-order-title');

        if (title) title.textContent = `Order #${orderId}`;

        let order = this.orders.find(o => o.id === orderId);

        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/orders/${orderId}`);
                const data = await res.json();
                if (res.ok && data.success) {
                    order = data.data;
                }
            } catch (e) {
                console.warn('[Admin] Could not fetch single order items, using cache.');
            }
        }

        if (!order) return;

        const items = order.items && order.items.length ? order.items : [
            { product_name: 'Catalog Agricultural Order Items', unit_price: order.total_amount, quantity: 1, line_total: order.total_amount }
        ];

        content.innerHTML = `
            <div class="order-modal-grid">
                <div class="order-field-group">
                    <span class="lbl">Customer Name</span>
                    <span class="val">${this.escapeHtml(order.customer_name)}</span>
                </div>
                <div class="order-field-group">
                    <span class="lbl">Mobile Number</span>
                    <span class="val"><a href="tel:${order.phone}" style="color:var(--adm-primary); text-decoration:none;">📞 ${this.escapeHtml(order.phone)}</a></span>
                </div>
                <div class="order-field-group" style="grid-column: 1 / -1;">
                    <span class="lbl">Delivery Address</span>
                    <span class="val">${this.escapeHtml(order.address)}</span>
                </div>
                ${order.notes ? `
                <div class="order-field-group" style="grid-column: 1 / -1;">
                    <span class="lbl">Order Notes</span>
                    <span class="val" style="color:#b45309; font-style:italic;">"${this.escapeHtml(order.notes)}"</span>
                </div>
                ` : ''}
            </div>

            <div class="status-change-box">
                <label for="modal-order-status-select">Fulfillment Status:</label>
                <select id="modal-order-status-select">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending Review</option>
                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="dispatched" ${order.status === 'dispatched' ? 'selected' : ''}>Dispatched for Delivery</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
                <button class="btn btn-sm btn-primary" onclick="adminApp.saveModalOrderStatus()">Update Status</button>
            </div>

            <h4>Itemized Order Breakdown:</h4>
            <div class="table-responsive">
                <table class="order-items-table">
                    <thead>
                        <tr>
                            <th>Item Description</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th style="text-align:right;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(it => `
                            <tr>
                                <td><strong>${this.escapeHtml(it.product_name)}</strong></td>
                                <td>₹${it.unit_price}</td>
                                <td>&times; ${it.quantity}</td>
                                <td style="text-align:right; font-weight:700;">₹${Number(it.line_total || it.unit_price * it.quantity).toLocaleString('en-IN')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="order-total-bar">
                <span>Total Payable:</span>
                <span>₹${Number(order.total_amount).toLocaleString('en-IN')}</span>
            </div>
        `;

        modal.classList.add('active');
    }

    async quickUpdateOrderStatus(orderId, newStatus) {
        await this.executeOrderStatusUpdate(orderId, newStatus);
    }

    async saveModalOrderStatus() {
        const select = document.getElementById('modal-order-status-select');
        if (!select || !this.activeOrderId) return;
        await this.executeOrderStatusUpdate(this.activeOrderId, select.value);
        this.closeModal('order-details-modal');
    }

    async executeOrderStatusUpdate(orderId, newStatus) {
        // Optimistic update
        const order = this.orders.find(o => o.id === orderId);
        if (order) order.status = newStatus;

        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/orders/${orderId}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });
                if (!res.ok) throw new Error('Status update failed.');
            } catch (e) {
                console.warn('[Admin] Server update failed, persisted locally.');
            }
        }

        this.saveLocalState('orders');
        await this.fetchOverview();
        this.renderAllViews();
        this.showToast(`Order #${orderId} status updated to "${newStatus}".`, 'success');
    }

    confirmDeleteOrder(orderId) {
        this.openConfirmModal(`Are you sure you want to permanently delete Order #${orderId}?`, async () => {
            if (this.isOnline) {
                try {
                    await fetch(`${this.apiBase}/orders/${orderId}`, { method: 'DELETE' });
                } catch (e) {
                    console.warn('[Admin] Server delete failed, deleting locally.');
                }
            }

            this.orders = this.orders.filter(o => o.id !== orderId);
            this.saveLocalState('orders');
            await this.fetchOverview();
            this.renderAllViews();
            this.showToast(`Order #${orderId} removed.`, 'warning');
        });
    }

    printOrderReceipt() {
        window.print();
    }

    // ─── PRODUCT ACTIONS (CRUD) ────────────────────────────────────────────
    openAddProductModal() {
        this.activeProductEditId = null;
        const modal = document.getElementById('product-form-modal');
        const title = document.getElementById('product-modal-title');
        const form = document.getElementById('product-edit-form');
        const idInput = document.getElementById('prod-id');

        if (title) title.textContent = 'Add New Agricultural Product';
        if (form) form.reset();
        if (idInput) {
            idInput.disabled = false;
            idInput.value = 's' + (this.products.length + 1);
        }
        document.getElementById('prod-in-stock').checked = true;

        modal.classList.add('active');
    }

    openEditProductModal(productId) {
        this.activeProductEditId = productId;
        const p = this.products.find(item => item.id === productId);
        if (!p) return;

        const modal = document.getElementById('product-form-modal');
        const title = document.getElementById('product-modal-title');
        const idInput = document.getElementById('prod-id');

        if (title) title.textContent = `Edit Product: ${p.name}`;
        if (idInput) {
            idInput.value = p.id;
            idInput.disabled = true; // Cannot edit primary key
        }

        document.getElementById('prod-name').value = p.name || '';
        document.getElementById('prod-category').value = p.category || 'seeds';
        document.getElementById('prod-price').value = p.price || 0;
        document.getElementById('prod-unit').value = p.unit || '';
        document.getElementById('prod-desc').value = p.description || '';
        document.getElementById('prod-image-key').value = p.image || 'md-agro-store';
        document.getElementById('prod-tags').value = Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || '');
        document.getElementById('prod-in-stock').checked = p.in_stock === 1;

        modal.classList.add('active');
    }

    async handleSaveProductForm(e) {
        e.preventDefault();
        const id = document.getElementById('prod-id').value.trim();
        const name = document.getElementById('prod-name').value.trim();
        const category = document.getElementById('prod-category').value;
        const price = Number(document.getElementById('prod-price').value);
        const unit = document.getElementById('prod-unit').value.trim();
        const description = document.getElementById('prod-desc').value.trim();
        const image = document.getElementById('prod-image-key').value;
        const tagsRaw = document.getElementById('prod-tags').value.trim();
        const in_stock = document.getElementById('prod-in-stock').checked ? 1 : 0;

        const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : ['Quality Assured'];

        const payload = { id, name, category, price, unit, description, image, tags, in_stock, rating: 4.8, reviews: 10 };

        const isEditing = Boolean(this.activeProductEditId);

        if (this.isOnline) {
            try {
                const url = isEditing ? `${this.apiBase}/products/${id}` : `${this.apiBase}/products`;
                const method = isEditing ? 'PUT' : 'POST';

                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Operation failed');
            } catch (err) {
                console.warn('[Admin] Server product save error, updating local state:', err.message);
            }
        }

        if (isEditing) {
            const idx = this.products.findIndex(p => p.id === id);
            if (idx !== -1) this.products[idx] = { ...this.products[idx], ...payload };
            this.showToast(`Product "${name}" updated successfully.`, 'success');
        } else {
            this.products.unshift(payload);
            this.showToast(`Product "${name}" added to catalog.`, 'success');
        }

        this.saveLocalState('products');
        await this.fetchOverview();
        this.renderAllViews();
        this.closeModal('product-form-modal');
    }

    async toggleProductStock(productId) {
        const p = this.products.find(item => item.id === productId);
        if (!p) return;

        const newStock = p.in_stock === 1 ? 0 : 1;
        p.in_stock = newStock;

        if (this.isOnline) {
            try {
                await fetch(`${this.apiBase}/products/${productId}/stock`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ in_stock: newStock })
                });
            } catch (e) {
                console.warn('[Admin] Server stock toggle failed, persisted locally.');
            }
        }

        this.saveLocalState('products');
        await this.fetchOverview();
        this.renderAllViews();
        this.showToast(`Product status set to: ${newStock === 1 ? 'In Stock' : 'Out of Stock'}`, 'success');
    }

    confirmDeleteProduct(productId) {
        this.openConfirmModal(`Are you sure you want to delete product "${productId}" from catalog?`, async () => {
            if (this.isOnline) {
                try {
                    const res = await fetch(`${this.apiBase}/products/${productId}`, { method: 'DELETE' });
                    const data = await res.json();
                    if (!res.ok) {
                        this.showToast(`⚠ ${data.message || 'Could not delete product'}`, 'warning');
                        return;
                    }
                } catch (e) {
                    console.warn('[Admin] Server delete failed, deleting locally.');
                }
            }

            this.products = this.products.filter(p => p.id !== productId);
            this.saveLocalState('products');
            await this.fetchOverview();
            this.renderAllViews();
            this.showToast('Product deleted from inventory.', 'warning');
        });
    }

    // ─── INQUIRY ACTIONS ───────────────────────────────────────────────────
    async openInquiryModal(inquiryId) {
        this.activeInquiryId = inquiryId;
        const modal = document.getElementById('inquiry-modal');
        const content = document.getElementById('inquiry-modal-content');
        const footer = document.getElementById('inquiry-modal-footer');

        const m = this.inquiries.find(item => item.id === inquiryId);
        if (!m) return;

        // Auto mark as read
        if (!m.is_read) {
            m.is_read = 1;
            this.saveLocalState('inquiries');
            if (this.isOnline) {
                fetch(`${this.apiBase}/contact/${inquiryId}/read`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ is_read: 1 })
                }).catch(() => {});
            }
            this.renderBadges();
            this.renderInquiriesTable();
        }

        content.innerHTML = `
            <div class="order-modal-grid">
                <div class="order-field-group">
                    <span class="lbl">Farmer / Sender</span>
                    <span class="val">${this.escapeHtml(m.name)}</span>
                </div>
                <div class="order-field-group">
                    <span class="lbl">Mobile Number</span>
                    <span class="val">${m.phone ? `<a href="tel:${m.phone}">📞 ${this.escapeHtml(m.phone)}</a>` : '—'}</span>
                </div>
                <div class="order-field-group" style="grid-column: 1 / -1;">
                    <span class="lbl">Email Address</span>
                    <span class="val"><a href="mailto:${m.email}">${this.escapeHtml(m.email)}</a></span>
                </div>
                <div class="order-field-group" style="grid-column: 1 / -1;">
                    <span class="lbl">Date Received</span>
                    <span class="val">${this.formatDate(m.created_at)}</span>
                </div>
            </div>
            <div style="background:#f8faf9; border:1px solid #e2e8f0; padding:16px; border-radius:8px; margin-top:10px;">
                <span style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:#64748b; display:block; margin-bottom:6px;">Message Content:</span>
                <p style="font-size:0.95rem; line-height:1.6; margin:0; white-space:pre-wrap;">${this.escapeHtml(m.message)}</p>
            </div>
        `;

        footer.innerHTML = `
            <a href="mailto:${m.email}?subject=MD Agro Advisory Inquiry Response" class="btn btn-primary">
                ✉️ Reply via Email
            </a>
            ${m.phone ? `<a href="tel:${m.phone}" class="btn btn-outline">📞 Call Farmer</a>` : ''}
            <button type="button" class="btn btn-secondary" onclick="adminApp.closeModal('inquiry-modal')">Close</button>
        `;

        modal.classList.add('active');
    }

    confirmDeleteInquiry(inquiryId) {
        this.openConfirmModal('Delete this inquiry message from the log?', async () => {
            if (this.isOnline) {
                try {
                    await fetch(`${this.apiBase}/contact/${inquiryId}`, { method: 'DELETE' });
                } catch (e) {}
            }
            this.inquiries = this.inquiries.filter(m => m.id !== inquiryId);
            this.saveLocalState('inquiries');
            await this.fetchOverview();
            this.renderAllViews();
            this.showToast('Inquiry message deleted.', 'warning');
        });
    }

    // ─── SUBSCRIBER ACTIONS ────────────────────────────────────────────────
    confirmDeleteSubscriber(subscriberId) {
        this.openConfirmModal('Remove this email from the newsletter subscription list?', async () => {
            if (this.isOnline) {
                try {
                    await fetch(`${this.apiBase}/newsletter/subscribers/${subscriberId}`, { method: 'DELETE' });
                } catch (e) {}
            }
            this.subscribers = this.subscribers.filter(s => s.id !== subscriberId);
            this.saveLocalState('subscribers');
            this.renderBadges();
            this.renderSubscribersTable();
            this.showToast('Subscriber removed.', 'warning');
        });
    }

    copyAllSubscribers() {
        if (this.subscribers.length === 0) {
            this.showToast('No subscriber emails available.', 'warning');
            return;
        }
        const emails = this.subscribers.map(s => s.email).join(', ');
        navigator.clipboard.writeText(emails).then(() => {
            this.showToast(`📋 Copied ${this.subscribers.length} subscriber emails to clipboard!`, 'success');
        }).catch(() => {
            this.showToast('Could not copy to clipboard.', 'error');
        });
    }

    exportSubscribersCSV() {
        if (this.subscribers.length === 0) {
            this.showToast('No subscriber data to export.', 'warning');
            return;
        }
        let csv = 'ID,Email,Active,SubscribedAt\n';
        this.subscribers.forEach(s => {
            csv += `"${s.id}","${s.email}","${s.is_active}","${s.subscribed_at}"\n`;
        });
        this.downloadCSV(csv, 'mdagro_subscribers.csv');
        this.showToast('📁 Exported newsletter subscribers CSV.', 'success');
    }

    exportOrdersCSV() {
        if (this.orders.length === 0) {
            this.showToast('No orders to export.', 'warning');
            return;
        }
        let csv = 'OrderID,CustomerName,Phone,Address,TotalAmount,Status,OrderDate\n';
        this.orders.forEach(o => {
            csv += `"${o.id}","${o.customer_name}","${o.phone}","${o.address.replace(/"/g, '""')}","${o.total_amount}","${o.status}","${o.created_at}"\n`;
        });
        this.downloadCSV(csv, 'mdagro_orders.csv');
        this.showToast('📁 Exported orders CSV.', 'success');
    }

    // ─── USER MANAGEMENT ACTIONS ───────────────────────────────────────────
    renderUsersTable() {
        const tbody = document.getElementById('users-tbody');
        if (!tbody) return;

        let filtered = [...this.users];

        if (this.userFilterStatus === 'active') {
            filtered = filtered.filter(u => u.is_active === 1 || u.is_active === true);
        } else if (this.userFilterStatus === 'suspended') {
            filtered = filtered.filter(u => !u.is_active || u.is_active === 0);
        }

        if (this.userSearchQuery.trim()) {
            const q = this.userSearchQuery.toLowerCase();
            filtered = filtered.filter(u => 
                (u.name && u.name.toLowerCase().includes(q)) ||
                (u.phone && u.phone.includes(q)) ||
                (u.email && u.email.toLowerCase().includes(q)) ||
                (u.location && u.location.toLowerCase().includes(q))
            );
        }

        const statTotal = document.getElementById('users-stat-total');
        const statActive = document.getElementById('users-stat-active');
        const statSusp = document.getElementById('users-stat-suspended');
        const statOrders = document.getElementById('users-stat-orders');

        if (statTotal) statTotal.textContent = this.users.length;
        if (statActive) statActive.textContent = this.users.filter(u => u.is_active).length;
        if (statSusp) statSusp.textContent = this.users.filter(u => !u.is_active).length;
        if (statOrders) {
            const totalOrd = this.users.reduce((sum, u) => sum + Number(u.total_orders || 0), 0);
            statOrders.textContent = totalOrd;
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="empty-cell">
                        <div class="empty-state-box">
                            <span class="empty-icon">👥</span>
                            <h4>No registered farmers found</h4>
                            <p>No user accounts match your search filter. You can register a farmer manually or wait for customer signups.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(u => {
            const initials = u.name ? u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'FM';
            const joinDate = u.created_at ? new Date(u.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent';
            const isActive = u.is_active === 1 || u.is_active === true;
            const ordersCount = u.total_orders || 0;
            const spent = u.total_spent ? `₹${Number(u.total_spent).toLocaleString('en-IN')}` : '₹0';

            return `
                <tr>
                    <td>
                        <div class="farmer-user-cell">
                            <div class="farmer-avatar-badge">${initials}</div>
                            <div class="farmer-user-info">
                                <span class="farmer-user-name">${this.escapeHTML(u.name)}</span>
                                <span class="farmer-user-id">#USR-${u.id || 'N/A'}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div style="font-weight:600;">📞 ${this.escapeHTML(u.phone)}</div>
                        ${u.email ? `<div style="font-size:0.75rem;color:var(--adm-text-muted);">✉️ ${this.escapeHTML(u.email)}</div>` : ''}
                    </td>
                    <td>${this.escapeHTML(u.location || 'Maharashtra, India')}</td>
                    <td>${joinDate}</td>
                    <td><strong>${ordersCount}</strong></td>
                    <td>${spent}</td>
                    <td>
                        <span class="badge ${isActive ? 'status-active' : 'status-suspended'}">
                            ${isActive ? 'Active' : 'Suspended'}
                        </span>
                    </td>
                    <td>
                        <div class="table-actions">
                            <button class="btn-action" title="View Profile & Order History" onclick="adminApp.openUserDetailsModal(${u.id})">
                                👁️
                            </button>
                            <button class="btn-action" title="${isActive ? 'Suspend User' : 'Activate User'}" onclick="adminApp.toggleUserStatus(${u.id})">
                                ${isActive ? '⏸️' : '▶️'}
                            </button>
                            <button class="btn-action action-delete" title="Delete User" onclick="adminApp.deleteUser(${u.id})">
                                🗑️
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    openUserDetailsModal(userId) {
        const user = this.users.find(u => u.id == userId);
        if (!user) return;

        this.activeUserId = userId;
        const modal = document.getElementById('user-details-modal');
        const nameElem = document.getElementById('modal-user-name');
        const contentElem = document.getElementById('modal-user-content');
        if (!modal || !contentElem) return;

        if (nameElem) nameElem.textContent = user.name;

        const userOrders = this.orders.filter(o => o.user_id == user.id || o.phone === user.phone);
        const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'FM';
        const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN') : 'Recent';
        const isActive = user.is_active === 1 || user.is_active === true;

        contentElem.innerHTML = `
            <div class="user-profile-header">
                <div class="user-profile-avatar-lg">${initials}</div>
                <div class="user-profile-info">
                    <h4>${this.escapeHTML(user.name)}</h4>
                    <p>🌾 Role: <strong>Farmer / Customer</strong> &nbsp;|&nbsp; Status: <span class="badge ${isActive ? 'status-active' : 'status-suspended'}">${isActive ? 'Active' : 'Suspended'}</span></p>
                </div>
            </div>

            <div class="user-detail-grid">
                <div class="user-detail-item">
                    <span class="lbl">Mobile Phone</span>
                    <span class="val">📞 ${this.escapeHTML(user.phone)}</span>
                </div>
                <div class="user-detail-item">
                    <span class="lbl">Email</span>
                    <span class="val">${user.email ? this.escapeHTML(user.email) : 'Not provided'}</span>
                </div>
                <div class="user-detail-item">
                    <span class="lbl">Village / District</span>
                    <span class="val">📍 ${this.escapeHTML(user.location || 'Maharashtra')}</span>
                </div>
                <div class="user-detail-item">
                    <span class="lbl">Registration Date</span>
                    <span class="val">${joinDate}</span>
                </div>
            </div>

            <h4 style="margin:20px 0 10px 0; font-size:1.05rem;">Farmer Order History (${userOrders.length})</h4>
            ${userOrders.length === 0 ? '<p style="color:var(--adm-text-muted); font-size:0.9rem;">No orders placed yet by this farmer.</p>' : `
                <div class="table-responsive" style="max-height:220px; overflow-y:auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userOrders.map(o => `
                                <tr>
                                    <td>#${o.id}</td>
                                    <td>${new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                                    <td><strong>₹${Number(o.total_amount).toLocaleString('en-IN')}</strong></td>
                                    <td><span class="status-pill status-${o.status}">${o.status}</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline" onclick="adminApp.closeModal('user-details-modal'); adminApp.openOrderDetailsModal(${o.id});">View Order</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        `;

        modal.classList.add('active');
    }

    openAddUserModal() {
        const form = document.getElementById('admin-user-form');
        if (form) form.reset();
        const pass = document.getElementById('new-farmer-pass');
        if (pass) pass.value = 'farmer123';
        const modal = document.getElementById('user-form-modal');
        if (modal) modal.classList.add('active');
    }

    async handleSaveUserForm(e) {
        e.preventDefault();
        const name = document.getElementById('new-farmer-name').value.trim();
        const phone = document.getElementById('new-farmer-phone').value.trim();
        const email = document.getElementById('new-farmer-email').value.trim();
        const location = document.getElementById('new-farmer-location').value.trim();
        const pass = document.getElementById('new-farmer-pass').value.trim() || 'farmer123';

        if (!name || !phone) {
            this.showToast('Please fill in Farmer Name and Mobile Phone.', 'error');
            return;
        }

        const newUser = {
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

        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/admin/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                });
                const data = await res.json();
                if (res.ok && data.success && data.user) {
                    newUser.id = data.user.id;
                }
            } catch (err) {
                console.warn('[Admin] Live user creation failed, saving locally.');
            }
        }

        this.users.unshift(newUser);
        localStorage.setItem('md_users_db', JSON.stringify(this.users));
        this.closeModal('user-form-modal');
        this.renderBadges();
        this.renderUsersTable();
        await this.fetchOverview();
        this.renderDashboard();
        this.showToast(`✅ Registered farmer "${name}" successfully!`, 'success');
    }

    async toggleUserStatus(userId) {
        const user = this.users.find(u => u.id == userId);
        if (!user) return;

        const newStatus = user.is_active ? 0 : 1;
        user.is_active = newStatus;

        if (this.isOnline) {
            try {
                await fetch(`${this.apiBase}/admin/users/${userId}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isActive: newStatus === 1 })
                });
            } catch (e) {}
        }

        localStorage.setItem('md_users_db', JSON.stringify(this.users));
        this.renderUsersTable();
        this.showToast(`User status updated to ${newStatus ? 'Active' : 'Suspended'}.`, 'success');
    }

    deleteUser(userId) {
        const user = this.users.find(u => u.id == userId);
        if (!user) return;

        this.openConfirmModal(`Permanently delete farmer account "${user.name}" (${user.phone})?`, async () => {
            if (this.isOnline) {
                try {
                    await fetch(`${this.apiBase}/admin/users/${userId}`, { method: 'DELETE' });
                } catch (e) {}
            }
            this.users = this.users.filter(u => u.id != userId);
            localStorage.setItem('md_users_db', JSON.stringify(this.users));
            this.renderBadges();
            this.renderUsersTable();
            await this.fetchOverview();
            this.renderDashboard();
            this.showToast(`User "${user.name}" deleted.`, 'warning');
        });
    }

    exportUsersCSV() {
        if (this.users.length === 0) {
            this.showToast('No registered users to export.', 'warning');
            return;
        }
        let csv = 'ID,Name,Phone,Email,Location,Role,IsActive,CreatedAt,TotalOrders,TotalSpent\n';
        this.users.forEach(u => {
            csv += `"${u.id}","${this.escapeCSV(u.name)}","${u.phone}","${this.escapeCSV(u.email || '')}","${this.escapeCSV(u.location || '')}","${u.role || 'farmer'}","${u.is_active ? 1 : 0}","${u.created_at || ''}","${u.total_orders || 0}","${u.total_spent || 0}"\n`;
        });
        this.downloadCSV(csv, 'mdagro_registered_farmers.csv');
        this.showToast('📁 Exported registered farmers CSV.', 'success');
    }

    escapeCSV(str) {
        return String(str || '').replace(/"/g, '""');
    }

    downloadCSV(csvContent, filename) {
        const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // ─── SETTINGS & API ACTIONS ────────────────────────────────────────────
    async testApiConnection() {
        const box = document.getElementById('ping-result-box');
        const url = document.getElementById('settings-api-url').value.trim();
        if (!box) return;

        box.style.display = 'block';
        box.className = 'ping-result-box';
        box.textContent = '⏳ Testing connectivity to ' + url + '...';

        const startTime = performance.now();
        try {
            const res = await fetch(`${url}/health`, { signal: AbortSignal.timeout(4000) });
            const data = await res.json();
            const latency = Math.round(performance.now() - startTime);

            if (res.ok) {
                box.className = 'ping-result-box success';
                box.innerHTML = `✅ Server Online! (${latency}ms latency)<br>Service: <strong>${data.service || 'MD Agro API'}</strong>`;
            } else {
                throw new Error(data.message || 'Server error');
            }
        } catch (err) {
            box.className = 'ping-result-box error';
            box.innerHTML = `❌ Connection Failed to ${url}.<br><small>Make sure the backend server is running on that port.</small>`;
        }
    }

    saveApiUrl(newUrl) {
        this.apiBase = newUrl;
        localStorage.setItem('md_admin_api_base', newUrl);
        this.showToast('Saved API Base URL: ' + newUrl, 'success');
        this.connectAndLoad();
    }

    updateAdminPasscode(newUsername, newPasscode) {
        localStorage.setItem('md_admin_custom_user', newUsername);
        localStorage.setItem('md_admin_custom_pass', newPasscode);
        this.showToast('✅ Administrator credentials updated successfully.', 'success');
    }

    // ─── TAB NAVIGATION ────────────────────────────────────────────────────
    switchTab(tabId) {
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `pane-${tabId}`);
        });

        const breadcrumb = document.getElementById('breadcrumb-current');
        if (breadcrumb) {
            const titles = {
                dashboard: 'Dashboard',
                orders: 'Orders Management',
                users: 'Registered Users & Farmers',
                products: 'Catalog Products',
                inquiries: 'Farmer Inquiries',
                subscribers: 'Newsletter Subscribers',
                advisory: 'Crop Advisory Insights',
                settings: 'Settings & API'
            };
            breadcrumb.textContent = titles[tabId] || 'Dashboard';
        }

        // Close mobile sidebar if open
        const sidebar = document.getElementById('admin-sidebar');
        if (sidebar) sidebar.classList.remove('sidebar-open');
    }

    // ─── MODAL HELPERS ─────────────────────────────────────────────────────
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    openConfirmModal(msg, onConfirm) {
        const modal = document.getElementById('confirm-modal');
        const msgElem = document.getElementById('confirm-modal-msg');
        const okBtn = document.getElementById('confirm-modal-ok-btn');

        if (msgElem) msgElem.textContent = msg;

        if (okBtn) {
            okBtn.onclick = () => {
                this.closeModal('confirm-modal');
                if (typeof onConfirm === 'function') onConfirm();
            };
        }

        modal.classList.add('active');
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('admin-toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `admin-toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    formatDate(dateStr) {
        if (!dateStr) return '—';
        try {
            const d = new Date(dateStr);
            return d.toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateStr;
        }
    }

    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    escapeHTML(str) {
        return this.escapeHtml(str);
    }

    // ─── GLOBAL EVENT BINDING ──────────────────────────────────────────────
    bindGlobalEvents() {
        // Tab switching
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                if (tab) this.switchTab(tab);
            });
        });

        // Mobile menu toggle
        const menuBtn = document.getElementById('mobile-menu-toggle');
        const sidebar = document.getElementById('admin-sidebar');
        const collapseBtn = document.getElementById('sidebar-collapse-btn');
        if (menuBtn && sidebar) {
            menuBtn.addEventListener('click', () => sidebar.classList.toggle('sidebar-open'));
        }
        if (collapseBtn && sidebar) {
            collapseBtn.addEventListener('click', () => sidebar.classList.remove('sidebar-open'));
        }

        // Login form
        const loginForm = document.getElementById('admin-login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const u = document.getElementById('admin-user-input').value.trim();
                const p = document.getElementById('admin-pass-input').value.trim();
                this.handleLogin(u, p);
            });
        }

        // Password visibility toggle
        const pwdToggle = document.getElementById('pwd-toggle-btn');
        const passInput = document.getElementById('admin-pass-input');
        if (pwdToggle && passInput) {
            pwdToggle.addEventListener('click', () => {
                passInput.type = passInput.type === 'password' ? 'text' : 'password';
            });
        }

        // Logout
        const logoutBtn = document.getElementById('admin-logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Refresh All
        const refreshBtn = document.getElementById('refresh-all-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.connectAndLoad();
                this.showToast('Data refreshed.', 'success');
            });
        }

        // Order filters
        const orderFilters = document.getElementById('orders-status-filters');
        if (orderFilters) {
            orderFilters.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter-btn');
                if (!btn) return;
                orderFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.orderFilterStatus = btn.dataset.status;
                this.renderOrdersTable();
            });
        }

        // Order search
        const orderSearch = document.getElementById('orders-search-input');
        if (orderSearch) {
            orderSearch.addEventListener('input', (e) => {
                this.orderSearchQuery = e.target.value;
                this.renderOrdersTable();
            });
        }

        // Export Orders CSV
        const exportOrders = document.getElementById('export-orders-btn');
        if (exportOrders) {
            exportOrders.addEventListener('click', () => this.exportOrdersCSV());
        }

        // Users search & filter
        const usersSearch = document.getElementById('users-search-input');
        if (usersSearch) {
            usersSearch.addEventListener('input', (e) => {
                this.userSearchQuery = e.target.value;
                this.renderUsersTable();
            });
        }

        const usersFilter = document.getElementById('users-filter-status');
        if (usersFilter) {
            usersFilter.addEventListener('change', (e) => {
                this.userFilterStatus = e.target.value;
                this.renderUsersTable();
            });
        }

        // Admin register farmer form
        const userForm = document.getElementById('admin-user-form');
        if (userForm) {
            userForm.addEventListener('submit', (e) => this.handleSaveUserForm(e));
        }

        // Product Category Filters
        const prodCatFilters = document.getElementById('products-category-filters');
        if (prodCatFilters) {
            prodCatFilters.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter-btn');
                if (!btn) return;
                prodCatFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.productFilterCategory = btn.dataset.category;
                this.renderProductsTable();
            });
        }

        // Product Search
        const prodSearch = document.getElementById('products-search-input');
        if (prodSearch) {
            prodSearch.addEventListener('input', (e) => {
                this.productSearchQuery = e.target.value;
                this.renderProductsTable();
            });
        }

        // Add Product Button
        const addProdBtn = document.getElementById('add-product-btn');
        if (addProdBtn) {
            addProdBtn.addEventListener('click', () => this.openAddProductModal());
        }

        // Save Product Form
        const prodForm = document.getElementById('product-edit-form');
        if (prodForm) {
            prodForm.addEventListener('submit', (e) => this.handleSaveProductForm(e));
        }

        // Inquiry filter tabs
        const inquiryTabs = document.getElementById('inquiries-filter-tabs');
        if (inquiryTabs) {
            inquiryTabs.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter-btn');
                if (!btn) return;
                inquiryTabs.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.inquiryFilter = btn.dataset.filter;
                this.renderInquiriesTable();
            });
        }

        // Subscribers actions
        const copySubsBtn = document.getElementById('copy-subscribers-btn');
        if (copySubsBtn) copySubsBtn.addEventListener('click', () => this.copyAllSubscribers());

        const exportSubsBtn = document.getElementById('export-subscribers-btn');
        if (exportSubsBtn) exportSubsBtn.addEventListener('click', () => this.exportSubscribersCSV());

        // Settings API Ping & Save
        const testPingBtn = document.getElementById('test-api-conn-btn');
        if (testPingBtn) testPingBtn.addEventListener('click', () => this.testApiConnection());

        const settingsApiForm = document.getElementById('settings-api-form');
        if (settingsApiForm) {
            settingsApiForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const url = document.getElementById('settings-api-url').value.trim();
                this.saveApiUrl(url);
            });
        }

        // Settings Credentials Update
        const passForm = document.getElementById('settings-pass-form');
        if (passForm) {
            passForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const u = document.getElementById('settings-admin-username').value.trim();
                const p = document.getElementById('settings-new-pass').value.trim();
                this.updateAdminPasscode(u, p);
            });
        }
    }
}

// Global instance
const adminApp = new AdminApp();
document.addEventListener('DOMContentLoaded', () => adminApp.init());
