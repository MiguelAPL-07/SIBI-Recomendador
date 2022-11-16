// Constante necesaria para utilizar expressJS
const express = require('express');
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    console.log("LLEGA");
    //res.send('Bienvenido al recomendador de conciertos!');
});

app.post('/registro', (req, res) => {
    const {user, pass} = req.body;
    console.log(user + " " + pass);
    // Conectar la sesion con la base de datos

    // Realizar consulta a la base de datos

    // Ver resultados

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});