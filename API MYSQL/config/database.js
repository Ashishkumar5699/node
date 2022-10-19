const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user:"root",
    password: "ASdf@1234",
    database:"Ashish",
    connectionLimit:10
})

module.exports = pool;