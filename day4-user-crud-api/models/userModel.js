const mariadb = require("mariadb");

var pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "Appcino@123",
    port: 3306,
    database: "d4-crud"
})

module.exports = Object.freeze({
    pool: pool
});