
const sequelize = require('../config/db');
const Products = require('./productModel');
const User = require('./userModel');
const Orders = require('./orderModel');

User.hasMany(Products, { foreignKey: 'userId', onDelete: 'CASCADE' })
Products.belongsTo(User, { foreignKey: 'userId' })

// User.hasMany(Orders, { foreignKey: 'userId', onDelete: 'CASCADE' })
// Orders.belongsTo(User, { foreignKey: 'userId' })

// const OrderItems = sequelize.define('OrderItems', {
//     quantity: DataTypes.INTEGER
// })

// Orders.belongsToMany(Products, { through: OrderItems })
// Products.belongsToMany(Orders, { through: OrderItems })

module.exports = { 
    // Orders,
    //  OrderItems, 
     User, Products }