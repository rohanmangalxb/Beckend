import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'
import User from './userModel.js'
import Product from './productModel.js'
import Order from './orderModel.js'
// User - Order (One-to-Many)
User.hasMany(Order)
Order.belongsTo(User)

// Order - Product (Many-to-Many)

const OrderProduct = sequelize.define('OrderProduct', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})

Order.belongsToMany(Product, { through: OrderProduct })
Product.belongsToMany(Order, { through: OrderProduct })


const syncModels = async () => {
    await sequelize.sync({ alter: true }) // or force: true for dev reset
    console.log('✅ All models synced successfully')
}

export { User, Product, Order, OrderProduct, syncModels }
