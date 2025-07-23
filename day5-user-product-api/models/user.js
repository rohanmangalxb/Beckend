const mariadb = require("mariadb")

var pool = mariadb.createPool({
    host: process.env.host || "localhost",
    user: process.env.user || "root",
    password: process.env.user || "Appcino@123",
    database: process.env.user || "restapi",
})

module.exports = Object.freeze({
    pool:pool
})