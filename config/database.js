const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'payments_api_dev',
    password: 'postgres',
    port: 5432,
});

module.exports = pool;
