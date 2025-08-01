const express = require('express')
const app = express()

const USERS = require('./routes/userRoutes');
const PRODUCTS = require('./routes/productRoutes');
// const ORDERS = require('./routes/orderRoutes');

require('dotenv').config()

const PORT = process.env.PORT || 3000

app.get('/', (req, res)=> {
    res.send('Hello')
})

app.use('/api/users/', USERS)
app.use('/api/products/', PRODUCTS)
// app.use('/api/orders/', ORDERS)

app.listen(PORT, ()=>{
    console.log(`Running on http://localhost:${PORT}`)
})