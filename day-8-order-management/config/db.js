const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log(process.env.db_pass)

const sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.db_pass,
    {
        host: process.env.db_host,
        port: Number(process.env.db_port) || 3306,
        dialect: 'mariadb',
        logging: false,
        // dialectOptions: {
        //     allowPublicKeyRetrieval: true,
        //     ssl: false
        // }
    }
)

sequelize.authenticate()
    .then(() => console.log('✅ DB Connected'))
    .catch(err => console.log('Error in connection : ', err))

module.exports = sequelize
