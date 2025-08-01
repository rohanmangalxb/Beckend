const { DataTypes } = require('sequelize')
const sequelize = require('../config/db');

const Products = require('./productModel');
const User = require('./userModel');

const Orders = sequelize.define('Orders', {
    quantity:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },

    status:{
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Delivered'),
        defaultValue: 'Pending'
    },
    createdAt:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
})




// Orders.hasMany(Products, {foreignKey:'productId', onDelete:'CASCADE'})
// Products.belongsTo(Orders, {foreignKey: 'productId'})

module.exports = Orders