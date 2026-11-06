const mysql = require('mysql2/promise');

const DB_NAME = process.env.DB_NAME || 'clinic_db';
const baseConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};

let pool;

/** Creates the database and table if they do not exist, then opens a pool. */
async function initDb() {
  const conn = await mysql.createConnection(baseConfig);
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await conn.end();

  pool = mysql.createPool({ ...baseConfig, database: DB_NAME, connectionLimit: 10 });
  await pool.query(`CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Female','Male','Other') NOT NULL,
    phone VARCHAR(30),
    address VARCHAR(200),
    diagnosis VARCHAR(200),
    status ENUM('Active','Follow-up','Discharged') NOT NULL DEFAULT 'Active',
    visit_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (full_name),
    INDEX idx_status (status)
  )`);
  return pool;
}

const getPool = () => pool;

module.exports = { initDb, getPool };
