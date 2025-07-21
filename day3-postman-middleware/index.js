const express = require('express')
const app = express()
const port = 5000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/register', (req, res) => {
    if (!req.body) {
        return res.status(204).json({ error: 'Body not present' })
    }

    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required!' });
    }

    res.status(201).json({ message: 'User Registered', user: { name, email } });
})

app.post('/api/feedback', (req, res) => {
    if (!req.body) {
        return res.status(204).json({ error: 'Body not present' })
    }
    
    const { message, rating } = req.body;
    if (!message || typeof rating !== 'number') {
        return res.status(400).json({ error: 'Invalid feedback data' })
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating should be in range 0-5' });
    }

    res.status(200).json({ message: 'Feedback received', data: req.body });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
