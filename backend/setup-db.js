// backend/setup-db.js
// Node.js script to automatically create database, execute schema, and seed data.
// No need for MySQL CLI / PATH setup!

require('dotenv').config();
const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');

async function setupDatabase() {
  console.log('⚡ Starting automatic MySQL database setup...');
  
  const host     = process.env.DB_HOST     || 'localhost';
  const port     = Number(process.env.DB_PORT) || 3306;
  const user     = process.env.DB_USER     || 'root';
  const password = process.env.DB_PASSWORD || '';
  const dbName   = process.env.DB_NAME     || 'mdagroconnect';

  let connection;

  try {
    // 1. Connect without specifying database to create DB if it doesn't exist
    connection = await mysql.createConnection({ host, port, user, password, multipleStatements: true });
    console.log(`✅ Connected to MySQL server at ${host}:${port}`);

    // 2. Read schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql  = fs.readFileSync(schemaPath, 'utf8');

    // 3. Execute schema
    console.log(`📜 Creating database "${dbName}" and tables...`);
    await connection.query(schemaSql);
    console.log(`✅ Schema executed successfully!`);
    await connection.end();

    // 4. Run seed script
    console.log('🌱 Seeding initial product catalog...');
    require('./seed.js');
  } catch (err) {
    console.error('\n❌ Database setup failed:', err.message);
    if (err.code === 'ECONNREFUSED') {
      console.error('\n💡 MySQL Server is NOT running locally.');
      console.error('   Please start your MySQL Server (or XAMPP / WAMP control panel) and try again.');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Access denied. Please check DB_USER and DB_PASSWORD in backend/.env');
    }
    process.exit(1);
  }
}

setupDatabase();
