// backend/middleware/auth.js
// JSON Web Token (JWT) Authentication & Authorization Middleware
// Secures API endpoints for MD Agro Connect

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mdagro_jwt_production_secret_key_2026_secured_agro_connect';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_ADMIN_EXPIRES_IN = process.env.JWT_ADMIN_EXPIRES_IN || '24h';
const ADMIN_USER = process.env.ADMIN_USERNAME || 'mdagro';

/**
 * Sign a new JWT token for a user or admin session
 * @param {Object} payload - Data to embed in the token (e.g. { id, phone, email, role, username })
 * @param {string} [expiresIn] - Optional custom expiry duration (e.g. '7d', '24h')
 * @returns {string} Signed JWT string
 */
function generateToken(payload, expiresIn) {
  const duration = expiresIn || (payload && payload.role === 'admin' ? JWT_ADMIN_EXPIRES_IN : JWT_EXPIRES_IN);
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: duration,
    issuer: 'MD-Agro-Connect',
    audience: payload && payload.role === 'admin' ? 'MD-Agro-Admin' : 'MD-Agro-Farmer',
  });
}

/**
 * Sign a JWT token (alias for generateToken to preserve compatibility with ArtiAwari branch)
 */
function signToken(payload, expiresIn = JWT_EXPIRES_IN) {
  return generateToken(payload, expiresIn);
}

/**
 * Extract token from standard authorization sources:
 * 1. Authorization: Bearer <token> header
 * 2. x-access-token header
 * 3. query parameter ?token=
 */
function extractToken(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (authHeader && typeof authHeader === 'string') {
    const parts = authHeader.trim().split(' ');
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
      return parts[1];
    }
    // Handle bare token in Authorization header
    if (parts.length === 1 && !parts[0].includes(' ')) {
      return parts[0];
    }
  }

  const altHeader = req.headers['x-access-token'];
  if (altHeader && typeof altHeader === 'string') {
    return altHeader.trim();
  }

  if (req.query && req.query.token) {
    return String(req.query.token).trim();
  }

  return null;
}

/**
 * Mandatory JWT Verification Middleware
 * Requires a valid, unexpired token. Rejects with 401/403 otherwise.
 */
function verifyToken(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided. Please sign in.',
      code: 'NO_TOKEN',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.token = token;
    return next();
  } catch (err) {
    const isExpired = err.name === 'TokenExpiredError';
    return res.status(isExpired ? 401 : 403).json({
      success: false,
      message: isExpired
        ? 'Your session has expired. Please sign in again.'
        : 'Invalid authentication token. Verification failed.',
      expired: isExpired,
      code: isExpired ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID',
      detail: err.message,
    });
  }
}

/**
 * Optional JWT Verification Middleware
 * If a token is provided and valid, attaches req.user.
 * If no token is provided, proceeds with req.user = null without blocking.
 */
function optionalToken(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.token = token;
  } catch (err) {
    req.user = null;
  }
  return next();
}

/**
 * Admin Role Verification Middleware
 * Verifies JWT and confirms user has administrative privileges.
 * Supports both standalone usage and chained usage after verifyToken.
 */
function verifyAdmin(req, res, next) {
  const checkAdmin = () => {
    const user = req.user;
    const isAdmin = user && (
      user.role === 'admin' ||
      user.role === 'Store Manager' ||
      user.username === ADMIN_USER ||
      user.username === 'admin'
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Administrator privileges required for this action.',
        code: 'ADMIN_PRIVILEGE_REQUIRED',
      });
    }

    return next();
  };

  if (req.user) {
    return checkAdmin();
  }
  return verifyToken(req, res, checkAdmin);
}

/**
 * Alias requireAdmin to verifyAdmin to preserve compatibility with ArtiAwari branch.
 */
const requireAdmin = verifyAdmin;

/**
 * Farmer/Customer Verification Middleware
 * Verifies JWT and confirms valid registered user.
 */
function verifyFarmer(req, res, next) {
  verifyToken(req, res, () => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Farmer authentication required.',
        code: 'FARMER_REQUIRED',
      });
    }
    return next();
  });
}

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_ADMIN_EXPIRES_IN,
  generateToken,
  signToken,
  extractToken,
  verifyToken,
  optionalToken,
  verifyAdmin,
  requireAdmin,
  verifyFarmer,
};
