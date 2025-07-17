const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello from Beckend Intern!')
})

app.get('/:slug', (req, res) => {
  res.send(`Hey, This is ${req.params.slug}`)
})

app.get('/api/message', (req, res) => {
  res.json({message: 'You made it to Beckend!'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
