const express = require('express')
const app = express()
const PORT = 5000
const pr = require('./routes/productRoutes')

app.use(express.json())


app.get('/', (req, res) => {
    res.json({GET: "List products with given query", POST: 'Add new Product', DELETE: "Delete existing products"})
})

app.use('/products', pr)

app.listen(PORT, () => {
    console.log(`Listening on Port: http://localhost:${PORT}`)
})