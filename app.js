const express = require('express');
require('dotenv').config();

const port = process.env.PORT;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`App corriendo en: localhost:${port}`);
});