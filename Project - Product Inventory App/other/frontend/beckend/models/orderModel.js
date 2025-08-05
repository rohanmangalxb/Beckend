import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const Order = sequelize.define('Order', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('placed', 'shipped', 'delivered'),
        defaultValue: 'placed'
    }
})

export default Order
