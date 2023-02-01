const { urlencoded } = require('body-parser');
const exp = require('constants');
const express = require('express');
const db = require('./config/connection')
const routes = require('./routes')

app = express();
PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(routes)

db.once('open', (req,res) => {
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}`)
    })
})