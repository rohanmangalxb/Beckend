const { DataTypes } = require('sequelize')
const sequelize = require('../config/db');

const Products = sequelize.define('Products', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Products;