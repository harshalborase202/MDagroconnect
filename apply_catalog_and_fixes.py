import json, re
from seed_large_catalog import PRODUCTS_DATA
from generate_catalog_data import images_map

js_products = "// Product Catalog Database\nconst PRODUCTS = " + json.dumps(PRODUCTS_DATA, indent=4) + ";\n"
js_mock_products = "// Initial Mock / Demo Data for seamless offline operation & immediate preview\nconst MOCK_PRODUCTS = " + json.dumps(PRODUCTS_DATA, indent=4) + ";\n"
js_images = "// Real Photographic Product Images Database (High-Res Realistic Agricultural Photos)\nconst PRODUCT_IMAGES = " + json.dumps(images_map, indent=4) + ";\n"

# 1. Update app.js and frontend/app.js
def update_app_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace PRODUCTS array (between '// Product Catalog Database' and '// Crop Care Advisor Database')
    p_regex = re.compile(r'// Product Catalog Database\s*const PRODUCTS = \[.*?\];', re.DOTALL)
    if not p_regex.search(content):
        raise ValueError("Could not find PRODUCTS regex in " + filepath)
    content = p_regex.sub(js_products.strip(), content, count=1)

    # Replace PRODUCT_IMAGES
    img_regex = re.compile(r'// Real Photographic Product Images Database[^\n]*\nconst PRODUCT_IMAGES = \{.*?\};', re.DOTALL)
    if not img_regex.search(content):
        raise ValueError("Could not find PRODUCT_IMAGES regex in " + filepath)
    content = img_regex.sub(js_images.strip(), content, count=1)

    # Check if syncProductsFromServer is in initApp
    if 'syncProductsFromServer();' not in content:
        content = content.replace('initChatbot(); // Initialize AI chatbot', 'initChatbot(); // Initialize AI chatbot\n    syncProductsFromServer();')

    # Add syncProductsFromServer implementation if not present
    if 'async function syncProductsFromServer()' not in content:
        sync_fn = """
// Sync products catalog dynamically from live backend if online
async function syncProductsFromServer() {
    try {
        const res = await fetch(`${API_BASE}/products`, { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                data.data.forEach(sp => {
                    const idx = PRODUCTS.findIndex(p => p.id === sp.id);
                    if (idx !== -1) {
                        PRODUCTS[idx] = { ...PRODUCTS[idx], ...sp };
                    } else {
                        PRODUCTS.push(sp);
                    }
                });
                renderProducts();
                renderFeaturedProducts();
            }
        }
    } catch (e) {
        // Fallback gracefully to built-in comprehensive catalog
    }
}
"""
        # Append before window exports at end of file
        content = re.sub(r'(\n\s*// Expose functions globally to window)', sync_fn + r'\1', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath} successfully!")

# 2. Update admin.js and frontend/admin.js
def update_admin_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace MOCK_PRODUCTS
    mp_regex = re.compile(r'// Initial Mock / Demo Data for seamless offline operation & immediate preview\s*const MOCK_PRODUCTS = \[.*?\];', re.DOTALL)
    if not mp_regex.search(content):
        raise ValueError("Could not find MOCK_PRODUCTS regex in " + filepath)
    content = mp_regex.sub(js_mock_products.strip(), content, count=1)

    # Replace PRODUCT_IMAGES
    pi_regex = re.compile(r'// Product Image map for rendering\s*const PRODUCT_IMAGES = \{.*?\};', re.DOTALL)
    if not pi_regex.search(content):
        raise ValueError("Could not find PRODUCT_IMAGES in " + filepath)
    content = pi_regex.sub("// Product Image map for rendering\n" + json.dumps(images_map, indent=4) + ";", content, count=1)

    # Fix openOrderDetails
    old_open_order = """    async openOrderDetails(orderId) {
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

        if (!order) return;"""

    new_open_order = """    async openOrderDetails(orderId) {
        const cleanId = String(orderId).replace(/^#/, '').trim();
        this.activeOrderId = cleanId;
        const modal = document.getElementById('order-details-modal');
        const content = document.getElementById('modal-order-content');
        const title = document.getElementById('modal-order-title');

        if (title) title.textContent = `Order #${cleanId}`;

        let order = this.orders.find(o => String(o.id).replace(/^#/, '').trim() === cleanId || Number(o.id) === Number(cleanId));

        if (this.isOnline) {
            try {
                const res = await fetch(`${this.apiBase}/orders/${cleanId}`);
                const data = await res.json();
                if (res.ok && data.success) {
                    const fetched = data.order || data.data;
                    if (fetched) order = fetched;
                }
            } catch (e) {
                console.warn('[Admin] Could not fetch single order items, using cache.');
            }
        }

        if (!order) {
            this.showToast(`Order #${cleanId} not found in database or local store.`, 'warning');
            return;
        }"""

    if old_open_order in content:
        content = content.replace(old_open_order, new_open_order)
    else:
        print("Warning: old_open_order exact match not found, checking with regex...")
        # Use regex replacement for openOrderDetails up to if (!order) return;
        ood_regex = re.compile(r'async openOrderDetails\(orderId\)\s*\{.*?if \(!order\) return;', re.DOTALL)
        content = ood_regex.sub(new_open_order.strip(), content, count=1)

    # Also wrap modal open in safe check
    content = content.replace("modal.classList.add('active');", "if (modal) modal.classList.add('active');")

    # Ensure openOrderDetails in table actions passes string: adminApp.openOrderDetails('${o.id}')
    content = content.replace("adminApp.openOrderDetails(${o.id})", "adminApp.openOrderDetails('${o.id}')")
    content = content.replace("adminApp.sendOrderWhatsAppAlert(${o.id})", "adminApp.sendOrderWhatsAppAlert('${o.id}')")
    content = content.replace("adminApp.openTaxInvoiceModal(${o.id})", "adminApp.openTaxInvoiceModal('${o.id}')")
    content = content.replace("adminApp.confirmDeleteOrder(${o.id})", "adminApp.confirmDeleteOrder('${o.id}')")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath} successfully!")

if __name__ == '__main__':
    update_app_js('app.js')
    update_app_js('frontend/app.js')
    update_admin_js('admin.js')
    update_admin_js('frontend/admin.js')
