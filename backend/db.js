// backend/db.js
// MySQL connection pool using mysql2/promise
// All routes import this module to get a shared connection pool.

require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               Number(process.env.DB_PORT) || 3306,
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'mdagroconnect',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  timezone:           '+05:30',   // IST
});

// Verify connectivity on startup
pool.getConnection()
  .then(conn => {
    console.log(`✅  MySQL connected — database: "${process.env.DB_NAME || 'mdagroconnect'}"`);
    conn.release();
  })
  .catch(err => {
    console.error('❌  MySQL connection failed:', err.message);
    console.error('    → Check your .env credentials and make sure MySQL is running.');
  });

module.exports = pool;
