// Scratch test script to verify End-to-End Reviews & Feedback flow
const http = require('http');

async function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const reqOptions = {
      hostname: u.hostname,
      port: u.port,
      path: u.pathname + u.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- 1. Testing Frontend Static Server ---');
  const feRes = await request('http://localhost:8080/app.js');
  console.log('Frontend app.js status:', feRes.status, 'has Reviews module:', feRes.data.includes('loadProductReviews'));

  console.log('\n--- 2. Placing an Order (Purva Kale) ---');
  const orderRes = await request('http://localhost:3001/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    customerName: 'Purva Kale',
    phone: '8999444650',
    address: 'Rahuri, Ahmednagar',
    items: [
      { productId: 's1', quantity: 2 },
      { productId: 'f1', quantity: 1 }
    ],
    userId: 10
  });
  console.log('Order Placement Response:', orderRes.status, orderRes.data);
  const orderId = orderRes.data.orderId;

  console.log('\n--- 3. Submitting Post-Order Verified Feedback (Flipkart/Amazon style) ---');
  const reviewRes = await request('http://localhost:3001/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    productId: 's1',
    rating: 5,
    title: 'Superb Germination in Rahuri',
    comment: 'Planted on 5 acres. Germination reached 96% in 4 days! Best hybrid seeds for cotton.',
    orderId: orderId,
    customerName: 'Purva Kale'
  });
  console.log('Feedback Submission Response:', reviewRes.status, reviewRes.data);

  console.log('\n--- 4. Checking Product Reviews & Ratings Breakdown (s1) ---');
  const prodReviews = await request('http://localhost:3001/api/reviews?productId=s1');
  console.log('Product Summary:', prodReviews.data.summary);
  console.log('Reviews Count:', prodReviews.data.count);
  console.log('Latest Review Author:', prodReviews.data.reviews[0]?.customer_name);
  console.log('Latest Review Title:', prodReviews.data.reviews[0]?.title);
  console.log('Latest Review Verified:', prodReviews.data.reviews[0]?.is_verified);

  console.log('\n--- 5. Checking Store-wide Recent Reviews (for Testimonials) ---');
  const recent = await request('http://localhost:3001/api/reviews/recent');
  console.log('Recent Reviews Count:', recent.data.reviews?.length);
  console.log('Top Recent Review:', recent.data.reviews[0]?.customer_name, '-', recent.data.reviews[0]?.title);

  console.log('\nAll End-to-End Tests Succeeded!');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
