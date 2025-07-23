const express = require('express');
const PORT = process.env.PORT || 3000; 
const userRoutes = require('./routes/userRoutes')
const app = express();

// Middleware:
app.use(express.json());
app.use('/', userRoutes);
app.use(express.urlencoded({extended: false}));

app.use()

app.listen(PORT, () => {
    console.log(`listening request on port: ${PORT}`)
})