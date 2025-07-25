const Sequelize = require('sequelize')
require('dotenv').config();
const envpr = process.env

const sequelize = new Sequelize(
    envpr.db_name,
    envpr.db_user,
    envpr.db_password,
    {
        host: envpr.db_host,
        port: Number(envpr.db_port) || 3306,
        dialect: 'mariadb',
        loggin: false
    }
);

sequelize.authenticate().then(() => console.log("Db connected")).catch(err => console.error(err))

module.exports = sequelize