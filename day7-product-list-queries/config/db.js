const mariadb = require("mariadb");

var pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "Appcino@123",
    port: 3306,
    database: "p_querry"
})

module.exports = Object.freeze({
    pool: pool
});