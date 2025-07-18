const express = require('express')
const app = express()
const port = 3000

const dateVal = new Date(Date.now())
const date = `${dateVal.getDate().toString()}/${dateVal.getMonth()+1}/${dateVal.getFullYear()}`

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.get('/api/user', (req, res) => {
    res.json({ name: 'John Doe', role: 'Backend Intern' });
});

app.get('/api/greet/:username', (req, res) => {
    const { username } = req.params;
    res.json({ message: `Hello, ${username}!` });
});

app.get('/api/search', (req, res) => {
    const q  = req.query;
    res.json({ result: `You searched for: ${q.name}` });
});


app.get('/api/about', (req, res) => {
    const data = {
        name: 'Rohan',
        Date: date,
        Note: 'You are welcome to my personal site!'
    }
    res.json(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

