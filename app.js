const express = require('express');
const port = 8080;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`App corriendo en: localhost:${port}`);
});