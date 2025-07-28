const express = require('express')
const app = express()
const PORT = 5000
const pr = require('./routes/productRoutes') 

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello')
// })

app.use('/', pr)

app.listen(PORT, () => {
    console.log(`Listening on Port: http://localhost:${PORT}`)
})