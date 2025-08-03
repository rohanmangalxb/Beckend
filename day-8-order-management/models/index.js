const sequelize = require('../config/db');
const { DataTypes } = require('sequelize')
const User = require('./userModel')
const Product = require('./productModel')
const Orders = require('./orderModel');

// UP
User.hasMany(Product, { foreignKey: 'userId', onDelete: 'CASCADE' })
Product.belongsTo(User, { foreignKey: 'userId' });

//UO
User.hasMany(Orders, { foreignKey: 'userId', onDelete: 'CASCADE' })
Orders.belongsTo(User, { foreignKey: 'userId' })

//OP
const OrderItems = sequelize.define('OrderItems', {
    quantity: DataTypes.INTEGER,
    pricing: DataTypes.DECIMAL(10, 2)

})

Orders.belongsToMany(Product, { through: OrderItems })
Product.belongsToMany(Orders, { through: OrderItems })

const initModels = async () => {
    await sequelize.sync({ alter: true });
}

module.exports = { User, Product, Orders, OrderItems, initModels };