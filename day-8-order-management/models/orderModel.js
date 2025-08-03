const { DataTypes } = require('sequelize')
const sequelize = require('../config/db');

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
})

module.exports = Orders