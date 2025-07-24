const sequelize = require('../../config/db');
const User = require('./user')
const Product = require('./product')

User.hasMany(Product, {foreignKey: 'userId', onDelete: 'CASCADE'})
Product.belongsTo(User, {foreignKey: 'userId'});

const initModels = async() => {
    await sequelize.sync({alter: true});
}

module.exports = {User, Product, initModels};