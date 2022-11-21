// Constante necesaria para utilizar expressJS
const express = require('express');
const app = express();

// Para poder recibir datos en forma JSON del frontend
app.use(express.json());

// Base de datos
const neo4j = require('neo4j-driver');

const uri = 'neo4j+s://9d7bd182.databases.neo4j.io';
const user = 'neo4j';
const password = 'L3YfEDDGsRRgKIpfawlsjenGyX7bMzX_W5bPjbrQi6E';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();


app.get('/', (req, res) => {
    console.log("LLEGA");
    res.send('Bienvenido al recomendador de conciertos!');
});

app.post('/registro', (req, res) => {
    const {user, pass} = req.body;
    console.log(user + " " + pass);
    // Conectar la sesion con la base de datos

    // Realizar consulta a la base de datos

    // Ver resultados

});

// Ejemplo de crear un nodo
app.post('/crearNodo', (req, res) => {
    const {user, pass} = req.body;
    console.log(user + " " + pass);
    session.run(`CREATE (u:User {name: "${user}", pass: "${pass}"})`)
        .then(resultado => {
            res.send('Usuario registrado ' + resultado);
    }).catch(error => {
        console.log(error);
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});