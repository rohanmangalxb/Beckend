const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.STRING,
        allowNull: false
    },

    imageUrl: {
        type: DataTypes.TEXT,
        defaultValue: undefined
    }
})

module.exports = Product