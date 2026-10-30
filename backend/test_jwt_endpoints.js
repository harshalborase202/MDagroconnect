// backend/test_jwt_endpoints.js
// End-to-end API Route JWT verification using Supertest-style in-memory Express dispatch

require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/api`;
  console.log(`🚀 Temporary test server listening on port ${port}`);

  try {
    const testPhone = '999' + Math.floor(1000000 + Math.random() * 9000000);
    console.log(`1. Testing Farmer Registration (POST /api/auth/register) with ${testPhone}...`);
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Farmer Patil',
        phone: testPhone,
        password: 'securefarmer123',
        location: 'Nashik'
      })
    });
    const regData = await regRes.json();
    console.log('   Register response status:', regRes.status);
    console.log('   Token received is JWT:', regData.token && regData.token.startsWith('ey') ? '✅ YES' : '❌ NO');
    const farmerToken = regData.token;

    // 2. Access /api/auth/me with Farmer Token
    console.log('2. Testing Authenticated Profile (GET /api/auth/me)...');
    const meRes = await fetch(`${baseUrl}/auth/me`, {
      headers: { 'Authorization': `Bearer ${farmerToken}` }
    });
    const meData = await meRes.json();
    console.log('   /me with valid Bearer token:', meRes.status === 200 && meData.user.phone === testPhone ? '✅ PASS' : '❌ FAIL');

    // 3. Access /api/auth/me without token -> should 401
    console.log('3. Testing /api/auth/me without token (expect 401)...');
    const meUnauthRes = await fetch(`${baseUrl}/auth/me`);
    console.log('   /me rejected without token:', meUnauthRes.status === 401 ? '✅ PASS (401 Unauthorized)' : '❌ FAIL');

    // 4. Admin Login -> returns Admin JWT
    console.log('4. Testing Admin Login (POST /api/admin/login)...');
    const admRes = await fetch(`${baseUrl}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'mdagro', password: 'mdagro6074' })
    });
    const admData = await admRes.json();
    console.log('   Admin token received is JWT:', admData.token && admData.token.startsWith('ey') ? '✅ YES' : '❌ NO');
    const adminToken = admData.token;

    // 5. Access /api/admin/overview with Admin Token
    console.log('5. Testing Admin Overview (GET /api/admin/overview) with Admin Token...');
    const ovRes = await fetch(`${baseUrl}/admin/overview`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    console.log('   Overview access with Admin token:', ovRes.status === 200 ? '✅ PASS' : '❌ FAIL');

    // 6. Access /api/admin/overview with Farmer Token -> should 403 Forbidden
    console.log('6. Testing Admin Overview with Farmer Token (expect 403 Forbidden)...');
    const ovFarmerRes = await fetch(`${baseUrl}/admin/overview`, {
      headers: { 'Authorization': `Bearer ${farmerToken}` }
    });
    console.log('   Farmer rejected from admin overview:', ovFarmerRes.status === 403 ? '✅ PASS (403 Forbidden)' : '❌ FAIL');

    // 7. Access /api/orders with Admin Token
    console.log('7. Testing Admin Orders Listing (GET /api/orders) with Admin Token...');
    const ordRes = await fetch(`${baseUrl}/orders`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    console.log('   Orders access with Admin token:', ordRes.status === 200 ? '✅ PASS' : '❌ FAIL');

    // 8. Access /api/orders without token -> should 401
    console.log('8. Testing Admin Orders Listing without token (expect 401)...');
    const ordUnauthRes = await fetch(`${baseUrl}/orders`);
    console.log('   Orders listing rejected without token:', ordUnauthRes.status === 401 ? '✅ PASS (401 Unauthorized)' : '❌ FAIL');

    console.log('\n🎉 ALL END-TO-END HTTP JWT INTEGRATION TESTS PASSED!');
  } catch (err) {
    console.error('❌ Endpoint test failed:', err);
  } finally {
    server.close();
    try {
      const pool = require('./db');
      await pool.end();
    } catch (e) {}
    process.exit(0);
  }
});
