import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mariadb',
        logging: false,
    }
)

export const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('✅ DB Connected successfully')
    } catch (error) {
        console.error('❌ DB Connection Failed:', error)
        process.exit(1)
    }
}

export { sequelize }
// export default connectDB
