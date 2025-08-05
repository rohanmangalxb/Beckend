import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }
})

export default User
