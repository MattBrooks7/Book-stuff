const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4200;

app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI)

const bookRoutes = require('./routes/routes')
app.use('/api/books', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})