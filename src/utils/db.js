const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

let pool;

async function getConnection() {
    if (!pool) {
        pool = mysql.createPool({
            connectionLimit: 10,
            ...dbConfig
        });
    }
    return pool;
}

module.exports = { getConnection };
