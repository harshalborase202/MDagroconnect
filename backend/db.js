// backend/db.js
// MySQL connection pool using mysql2/promise
// All routes import this module to get a shared connection pool.

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config(); // Fallback to cwd if any
const mysql = require('mysql2/promise');

// Detect if we're connecting to Aiven (cloud) or local MySQL
const isCloud = process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com');

const poolConfig = {
  host:               process.env.DB_HOST     || 'localhost',
  port:               Number(process.env.DB_PORT) || 3306,
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'mdagroconnect',
  waitForConnections: true,
  connectionLimit:    5,
  queueLimit:         0,
  timezone:           '+05:30',   // IST
};

// Add SSL for Aiven cloud database (SSL is REQUIRED by Aiven)
if (isCloud) {
  poolConfig.ssl = { rejectUnauthorized: false };
  console.log('🔒  SSL enabled for Aiven cloud database');
}

const pool = mysql.createPool(poolConfig);

// Verify connectivity on startup
pool.getConnection()
  .then(conn => {
    console.log(`✅  MySQL connected — database: "${process.env.DB_NAME || 'mdagroconnect'}" on ${process.env.DB_HOST || 'localhost'}`);
    conn.release();
  })
  .catch(err => {
    console.error('❌  MySQL connection failed:', err.message);
    console.error('    → Check your .env credentials and make sure MySQL is running.');
    // Don't crash the server — fallback to local JSON data will handle requests
  });

module.exports = pool;
