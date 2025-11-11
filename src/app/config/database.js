const mysql = require('mysql2/promise');
let pool;
async function connectDB() {
  if (pool) return pool;
  pool = await mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });
  await pool.query('SELECT 1');
  console.log('✅ MySQL connected');
  return pool;
}

function getPool() {
  if (!pool) throw new Error('Pool not initialized. Call connectDB() first.');
  return pool;
}

module.exports = { connectDB, getPool };
