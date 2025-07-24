const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.STRING,
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Product
