require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const {initModels} = require('./models')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/products', productRoutes)


initModels().then(() => {
    app.listen(PORT, () => {
        console.log(`PORT: http://localhost:${PORT}`)
    })
})