// Loads sample patients: npm run seed
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { initDb, getPool } = require('../src/config/db');

(async () => {
  await initDb();
  const sql = fs.readFileSync(path.join(__dirname, '..', 'database', 'seed.sql'), 'utf8')
    .replace(/^USE .*;$/m, '');
  await getPool().query(sql);
  console.log('Sample patients added.');
  process.exit(0);
})().catch((err) => { console.error(err.message); process.exit(1); });
