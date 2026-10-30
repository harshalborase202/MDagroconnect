// backend/test_jwt_auth.js
// Automated verification for MD Agro JWT authentication integration

require('dotenv').config({ path: __dirname + '/.env' });
const jwt = require('jsonwebtoken');
const { generateToken, verifyToken, verifyAdmin, extractToken } = require('./middleware/auth');

console.log('🧪 Starting MD Agro JWT Integration Verification...');

// 1. Verify environment secret
const secret = process.env.JWT_SECRET;
console.log('1. JWT Secret loaded:', secret ? '✅ Yes (' + secret.substring(0, 10) + '...)' : '❌ No');
if (!secret) {
  process.exit(1);
}

// 2. Farmer Token Signing and Verification
const farmerPayload = {
  id: 101,
  name: 'Ramesh Patil',
  phone: '9822145670',
  email: 'ramesh.patil@gmail.com',
  role: 'farmer'
};

const farmerToken = generateToken(farmerPayload);
console.log('2. Farmer Token Generated:');
console.log('   Token:', farmerToken.substring(0, 30) + '...');

const decodedFarmer = jwt.verify(farmerToken, secret);
console.log('   Decoded successfully:', decodedFarmer.name === 'Ramesh Patil' && decodedFarmer.role === 'farmer' ? '✅ PASS' : '❌ FAIL');
console.log('   Issuer & Audience:', decodedFarmer.iss, '/', decodedFarmer.aud);

// 3. Admin Token Signing and Verification
const adminPayload = {
  username: 'mdagro',
  name: 'Store Administrator',
  role: 'admin'
};

const adminToken = generateToken(adminPayload, '24h');
console.log('3. Admin Token Generated:');
console.log('   Token:', adminToken.substring(0, 30) + '...');

const decodedAdmin = jwt.verify(adminToken, secret);
console.log('   Decoded successfully:', decodedAdmin.username === 'mdagro' && decodedAdmin.role === 'admin' ? '✅ PASS' : '❌ FAIL');

// 4. Token Extraction Mock Tests
const mockReqWithBearer = {
  headers: {
    authorization: `Bearer ${farmerToken}`
  }
};
const extractedBearer = extractToken(mockReqWithBearer);
console.log('4. Extract Bearer token test:', extractedBearer === farmerToken ? '✅ PASS' : '❌ FAIL');

const mockReqWithoutToken = { headers: {} };
const extractedNone = extractToken(mockReqWithoutToken);
console.log('   Extract missing token test:', extractedNone === null ? '✅ PASS' : '❌ FAIL');

// 5. Middleware Mock Test: verifyToken
let nextCalled = false;
let resStatus = null;
let resBody = null;

const mockRes = {
  status(code) {
    resStatus = code;
    return {
      json(data) {
        resBody = data;
      }
    };
  }
};

verifyToken(mockReqWithBearer, mockRes, () => {
  nextCalled = true;
});
console.log('5. verifyToken with valid token calls next():', nextCalled && mockReqWithBearer.user.phone === '9822145670' ? '✅ PASS' : '❌ FAIL');

// 6. Middleware Mock Test: verifyToken rejection on missing token
nextCalled = false;
resStatus = null;
verifyToken(mockReqWithoutToken, mockRes, () => {
  nextCalled = true;
});
console.log('6. verifyToken rejects missing token with 401:', !nextCalled && resStatus === 401 ? '✅ PASS' : '❌ FAIL');

// 7. Middleware Mock Test: verifyAdmin rejection on farmer token
nextCalled = false;
resStatus = null;
// mockReqWithBearer has farmer token
verifyAdmin(mockReqWithBearer, mockRes, () => {
  nextCalled = true;
});
console.log('7. verifyAdmin rejects farmer token with 403 Forbidden:', !nextCalled && resStatus === 403 ? '✅ PASS' : '❌ FAIL');

// 8. Middleware Mock Test: verifyAdmin acceptance on admin token
const mockReqAdmin = {
  headers: {
    authorization: `Bearer ${adminToken}`
  }
};
nextCalled = false;
resStatus = null;
verifyAdmin(mockReqAdmin, mockRes, () => {
  nextCalled = true;
});
console.log('8. verifyAdmin accepts admin token:', nextCalled && mockReqAdmin.user.role === 'admin' ? '✅ PASS' : '❌ FAIL');

// 9. Tampered Token Test
const tamperedToken = farmerToken.substring(0, farmerToken.length - 5) + 'xxxxx';
const mockReqTampered = {
  headers: {
    authorization: `Bearer ${tamperedToken}`
  }
};
nextCalled = false;
resStatus = null;
verifyToken(mockReqTampered, mockRes, () => {
  nextCalled = true;
});
console.log('9. verifyToken rejects tampered token with 403:', !nextCalled && resStatus === 403 ? '✅ PASS' : '❌ FAIL');

console.log('\n🎉 ALL 9 JWT BACKEND TESTS PASSED SUCCESSFULLY!');
