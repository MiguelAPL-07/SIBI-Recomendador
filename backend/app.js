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
    res.send('Bienvenido al recomendador de conciertos!');
});

app.post('/registro', (req, res) => {
    const {user, pass} = req.body;
    // Conectar la sesion con la base de datos

    // Realizar consulta a la base de datos

    // Ver resultados

});

// Ejemplo de crear un nodo
app.post('/crearNodo', (req, res) => {
    const {user, pass} = req.body;
    session.run(`CREATE (u:User {name: "${user}", pass: "${pass}"})`)
        .then(resultado => {
            res.send('Usuario registrado ' + resultado);
    }).catch(error => {
        console.log(error);
    });
});

app.get('/api/allConcerts', (req, res) => {
    let query = `MATCH (n:Conciertos) RETURN n`;
    const request = session.run(query);

    request.then(result => { 
        
        let concerts = [];

        result.records.forEach((current) => {
            let concert = {
                name: current._fields[0].properties.name
            };
            concerts.push(concert);
        })
        res.send(concerts);
    }).catch();
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});