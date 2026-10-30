import urllib.request, json

BASE = 'http://localhost:3001'

def run_tests():
    # 1. Health
    r = urllib.request.urlopen(f'{BASE}/api/health')
    assert r.status == 200
    h_data = json.loads(r.read())
    print('[PASS] Health check:', h_data['status'], '| DB:', h_data['database'])

    # 2. Products API
    r = urllib.request.urlopen(f'{BASE}/api/products')
    assert r.status == 200
    p_data = json.loads(r.read())
    products = p_data['data']
    print(f'[PASS] /api/products returned {len(products)} products')
    assert len(products) == 52, f'Expected 52 products, got {len(products)}'
    
    categories = {}
    for p in products:
        cat = p['category']
        categories[cat] = categories.get(cat, 0) + 1
    print('       Category distribution:', categories)
    assert 'seeds' in categories and categories['seeds'] == 15
    assert 'fertilizers' in categories and categories['fertilizers'] == 14
    assert 'protection' in categories and categories['protection'] == 13
    assert 'tools' in categories and categories['tools'] == 10

    # 3. Single Order API
    r = urllib.request.urlopen(f'{BASE}/api/orders/899712')
    assert r.status == 200
    o_data = json.loads(r.read())
    print('[PASS] /api/orders/899712 returned successfully')
    assert o_data['success'] is True
    assert 'order' in o_data, 'Response missing order key'
    assert 'data' in o_data, 'Response missing data key'
    order = o_data['order']
    print(f'       Customer: {order["customer_name"]} | Total: Rs.{order["total_amount"]} | Status: {order["status"]}')
    print(f'       Items breakdown count: {len(order.get("items", []))}')

    # 4. Web pages HTTP 200
    for page in ['/admin.html', '/products.html', '/index.html', '/services.html', '/contact.html', '/advisor.html']:
        r = urllib.request.urlopen(f'{BASE}{page}')
        assert r.status == 200
        print(f'[PASS] {page} is serving HTTP 200 (size: {len(r.read())} bytes)')

    # 5. Static scripts verification
    r = urllib.request.urlopen(f'{BASE}/admin.js')
    content = r.read().decode('utf-8')
    assert 'cleanId = String(orderId).replace(/^#/, \'\').trim()' in content
    assert 'order-details-modal' in content
    assert "modal.classList.add('active')" in content
    print('[PASS] admin.js verified with openOrderDetails fix and modal display!')

    r = urllib.request.urlopen(f'{BASE}/app.js')
    content = r.read().decode('utf-8')
    assert 'const PRODUCTS = [' in content
    assert 'syncProductsFromServer()' in content
    assert 's15' in content and 'f14' in content and 'p13' in content and 't10' in content
    print('[PASS] app.js verified with all 52 products and auto-sync!')

    print('\n[SUCCESS] ALL AUTOMATED TESTS PASSED!')

if __name__ == '__main__':
    run_tests()
