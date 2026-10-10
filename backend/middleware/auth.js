// backend/middleware/auth.js
// JSON Web Token (JWT) Authentication & Authorization Middleware

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mdagro_jwt_secret_key_2026_secure_ibsl';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Sign a JWT token for a user or administrator.
 * @param {Object} payload - Data to embed in the token (id, phone, name, role)
 * @param {String} [expiresIn] - Optional custom expiry
 * @returns {String} JWT token string
 */
function signToken(payload, expiresIn = JWT_EXPIRES_IN) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Middleware to verify a required JWT Bearer token in the Authorization header.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.',
    });
  }

  // Support "Bearer <token>" or raw token
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader.trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Malformed authorization header.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    const isExpired = err.name === 'TokenExpiredError';
    return res.status(401).json({
      success: false,
      message: isExpired
        ? 'Session has expired. Please sign in again.'
        : 'Invalid token. Authentication failed.',
      expired: isExpired,
    });
  }
}

/**
 * Middleware to require administrator privileges.
 * Must be used after verifyToken.
 */
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Administrator privileges required.',
    });
  }
  return next();
}

/**
 * Optional token verification: attaches req.user if a valid token is present,
 * but allows the request to continue if no token is provided.
 */
function optionalToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader) {
    req.user = null;
    return next();
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader.trim();

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    req.user = null;
  }
  return next();
}

module.exports = {
  signToken,
  verifyToken,
  requireAdmin,
  optionalToken,
  JWT_SECRET,
};
