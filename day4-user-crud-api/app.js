const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes')

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('/', userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});