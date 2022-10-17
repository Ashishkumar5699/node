const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user:"root",
    database:"test",
    connectionLimit:10
})

module.exports = pool;