import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectDB} from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler } from './middleware/error.js'
import './models/index.js' // import all models and associations

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// Sync DB and start server
connectDB.sync({ alter: true })
    .then(() => {
        console.log('✅ Database connected and synced')
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err.message)
    })
