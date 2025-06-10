const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
});

// Можно опционально проверить подключение:
pool.connect()
  .then(() => console.log('📡 Connected to PostgreSQL'))
  .catch((err) => console.error('❌ Connection error:', err));
  
module.exports = pool; 