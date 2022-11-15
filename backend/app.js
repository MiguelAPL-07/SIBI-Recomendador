// Constante necesaria para utilizar expressJS
const express = require('express');

const app = express();

const port = 3001;

app.get('/', (req, res) => {
    res.send('Bienvenido al recomendador de conciertos!')
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});