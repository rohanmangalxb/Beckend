const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');


const PORT = process.env.PORT || 3000
const { initModels } = require('./models')


//Routes:
const USERS = require('./routes/userRoutes');
const PRODUCTS = require('./routes/productRoutes');
const ORDERS = require('./routes/orderRoutes');

app.use(cors());


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello')
})

app.use('/api/auth/', USERS)
app.use('/api/products/', PRODUCTS)
app.use('/api/orders/', ORDERS)

initModels().then(() => {
    app.listen(PORT, () => {
        console.log(`PORT: http://localhost:${PORT}`)
    })
})
