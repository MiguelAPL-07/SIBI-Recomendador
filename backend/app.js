// Constante necesaria para utilizar expressJS
const express = require('express');
const app = express();

// Para poder recibir datos en forma JSON del frontend
app.use(express.json());

// Base de datos
const neo4j = require('neo4j-driver');

//const uri = 'neo4j+s://9d7bd182.databases.neo4j.io';
const uri = 'bolt://localhost:7687';
const user = 'neo4j';
//const password = 'L3YfEDDGsRRgKIpfawlsjenGyX7bMzX_W5bPjbrQi6E';
const password = '1234';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

var userID = -1;


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

app.get('/api/login', (req, res) => {
    const {user, pass} = req.body;
    //let query = `MATCH (u:User) WHERE u.username = '${user}' and u.password = '${pass}' RETURN u`;
    let query = `MATCH (u:User) WHERE u.name = 'Pedro' RETURN u.userID`;
    const request = session.run(query);
    request.then(result => { 
        if(result.records.length > 0) {
            userID = parseInt(result.records[0]._fields[0]);
            res.json({login: 1});
            console.log(userID);
        } else {
            res.json({login: 0})
        }
    }).then(() => session.close());
});

app.post('/api/register', (req, res) => {

});

app.put('/api/changePass', (req, res) => {

});

app.get('/api/allConcerts', (req, res) => {
    let query = `MATCH (n:Concierto) RETURN n`;
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

// Algoritmo basado en el contenido sin importar el usuario
app.get('/api/bestConcerts', (re, res) => {
    let query = `MATCH (n:Concierto) RETURN n`;
    const request = session.run(query);

    
    // Obtengo todos los conciertos
    request.then(result => { 
        let concerts = [];
        result.records.forEach((current) => {
            let concert = {
                artist: current._fields[0].properties.artist,
                city: current._fields[0].properties.city,
                genre: current._fields[0].properties.genre,
                score: 0
            };
            concerts.push(concert);
        });
        let cityUser = 'Madrid';
        let genreUser = 'Pop';
    
        concerts.forEach((current) => {
            if(current.city == cityUser) {
                current.score += 1;
            }
            if(current.genre == genreUser) {
                current.score += 1;
            }
            //console.log(current);
        });
        //console.log(concerts);
        let conciertosOrdenados = concerts.sort((a, b) => a.score - b.score).reverse();
        console.log(conciertosOrdenados);
        res.send(conciertosOrdenados);
    });
});


app.get('/api/artistsOfMoment', (req, res) => {
});

app.get('/api/mostPopularArtists', (req, res) => {

});


app.get('/api/getConcertsLike', (req, res) => {
    let query = `MATCH (n:Concierto)<-[:ME_GUSTA]-(u:User) WHERE u.name='Pedro' RETURN n`;
    const request = session.run(query);

    request.then(result => { 
        
        let concerts = [];

        result.records.forEach((current) => {
            let concert = {
                name: current._fields[0].properties.name,
                city: current._fields[0].properties.city
            };
            concerts.push(concert);
        })
        //res.send(concerts);
        console.log(concerts);
    }).catch();
});

// Pasar parametros por la url
// Dar me gusta a un concierto
app.post('/api/likeConcert/:id', (req, res) => {
    let idUser = req.params.id;
    console.log(idUser);
});

// Pasar parametros por la url
// Quitar me gusta a un concierto
app.delete('/api/dislikeConcert/:id', (req, res) => {
    let idUser = req.params.id;
    console.log(idUser);
});

//Modificar
app.get('/api/valorarSala', (req, res) => {
    let query = `MATCH (u:User) 
    WHERE (u.name = 'Pedro')
    MATCH (r:Room) 
    WHERE (r.room = 'WiZink Center')
    MERGE (u)-[:VALORA {valoracion: 5}]->(r)
    RETURN u, r`
});

//Modificar
app.get('/api/modificarValoracionSala', (req, res) => {
    let query = `MATCH (u:User)-[v:VALORA {valoracion: 4}]->(r:Room)
    WHERE (u.name = 'Pedro') AND (r.room = 'WiZink Center')
    SET v.valoracion = 1
    RETURN u, r`
});

// Modificar
app.get('/api/eliminarValSala', (req, res) => {
    let query = `MATCH (u:User)-[v:VOTA]->(r:Room)
    WHERE (u.name = 'Pedro') AND (r.room = 'WiZink Center')
    DELETE v
    RETURN u, r`
});







app.get('/api/algoritmo1', (req, res) => {
    // Seguidores y reproducciones 

    // Valoraciones artistas y sala

    // Numero de me gustas


});





// Algoritmo basado en el contenido del usuario (actividad del usuario - me gustas)
app.get('/api/actividadUsuario', async (req, res) => {
    let user = "Pedro"
    // Devuelve conciertos que le gustan al usuario 
    let queryConcertsMG = `MATCH (u:User)-[:ME_GUSTA]->(c:Concierto)
        MATCH (c:Concierto)-[:REALIZA]->(r:Room)
        MATCH (r:Room)-[:PERTENECE]->(i:City)
        MATCH (a:Artist)-[:ACTUA]->(c:Concierto)
        MATCH (a:Artist)-[:EN_GENERO]->(g:Genre)
        WHERE u.name = '${user}' 
        RETURN c, r, i, a, g`;

    let resultsPearson = [];

    const request = session.run(queryConcertsMG);
    request.then(async (result) => { 
        let totalConcerts = result.records.length;
        
        // Si hay me gustas
        if(totalConcerts > 0) {
            // Extraer datos user de los conciertos con mg
            let genreFav = await getGenreFavUser(user);
            let vGenreFavUser = 0;
            let generos = [];
            let cityResidence = await getCityResidence(user);  
            let vCityResidenceUser = 0;
            let ciudades = [];
            let vHorarioM = 0;
            let vHorarioT = 0;
            let vHorarioN = 0;
            let vPrecioMedio = 0;
            let vValArtista = 0;
            let vValSala = 0;
            let precios = [];
            let vPrecioMedioUser = 0;

            let followArtists = await getFollowingArtists(user);
            let allValuation = await getAllValuation(user);

            result.records.forEach(async (current) => {
                const concert = {
                    id: current._fields[0].properties.concertID.low,
                    name: current._fields[0].properties.name,
                    hourStart: current._fields[0].properties.hourStart,
                    price: current._fields[0].properties.price,
                    date: current._fields[0].properties.date,
                    city: current._fields[2].properties.city,
                    genre: current._fields[4].properties.genre,
                    artist: current._fields[3].properties.name,
                    room: current._fields[1].properties.room
                };
                
                // Genero favorito
                if (genreFav === concert.genre) {
                    vGenreFavUser += 3; 
                }
                
                // Generos
                generos.push(concert.genre);
                
                // Ciudad de residencia
                if (cityResidence === concert.city) {
                    vCityResidenceUser += 2; 
                }
                // Otras ciudades
                ciudades.push(concert.city);

                // Horarios
                if (concert.hourStart >= "10:00" && concert.hourStart < "15:00") {
                    vHorarioM += 1;
                } else if (concert.hourStart >= "15:00" && concert.hourStart < "21:00") {
                    vHorarioT += 1;
                } else if (concert.hourStart >= "21:00" && concert.hourStart <= "4:00") {
                    vHorarioN += 1;
                }

                // Precio
                vPrecioMedio = parseFloat(vPrecioMedio) + parseFloat(concert.price);
                precios.push(concert.price);

                // Valoracion artista
                followArtists.forEach((c) => {
                    if(concert.artist === c) {
                        vValArtista += 2;
                    }
                });

                // Valoracion sala
                allValuation.forEach((c) => {
                    if(c.roomID === concert.room) {
                        vValSala += c.val * 0.4;
                    }
                });
                
            })
            vPrecioMedio = vPrecioMedio / totalConcerts;
            
            // Media arimetica
            vGenreFavUser = vGenreFavUser / totalConcerts;
            vCityResidenceUser = vCityResidenceUser / totalConcerts;
            vHorarioM = vHorarioM / totalConcerts;
            vHorarioT = vHorarioT / totalConcerts;
            vHorarioN = vHorarioN / totalConcerts;
            vValArtista = vValArtista / totalConcerts;
            vValSala = vValSala / totalConcerts;

            precios.forEach((p) => {
                vPrecioMedioUser = vPrecioMedioUser + (1 - ((0.5 / vPrecioMedio) * p));
            });

            vPrecioMedioUser = vPrecioMedioUser / totalConcerts;
             
            let vProfileUser = [vGenreFavUser, 1, vCityResidenceUser, 1, vHorarioM, vHorarioT, vHorarioN, vPrecioMedioUser, vValArtista, vValSala];
            console.log("Perfil user: " +vProfileUser)

            // Extraer datos del resto de conciertos
            let queryRestConcerts = `MATCH (u:User)
                MATCH (c:Concierto)
                MATCH (c:Concierto)-[:REALIZA]->(r:Room)
                MATCH (r:Room)-[:PERTENECE]->(i:City)
                MATCH (a:Artist)-[:ACTUA]->(c:Concierto)
                MATCH (a:Artist)-[:EN_GENERO]->(g:Genre)
                WHERE u.name = '${user}' AND NOT exists((u)-[:ME_GUSTA]->(c))
                RETURN c, r, i, a, g`;

            const request = session.run(queryRestConcerts);
            request.then(async result => { 
                let totalConcerts = result.records.length;
        
                if(totalConcerts > 0) {

                    result.records.forEach(async (current) => {

                        let vGenreFavConcert = 0;
                        let vOthersGenresConcert = 0;
                        let vCityResidenceConcert = 0;  
                        let vOthersCitiesConcert = 0;
                        let vScheduleMConcert = 0;
                        let vScheduleTConcert = 0;
                        let vScheduleNConcert = 0;
                        let vPrecioConcert = 0;
                        let vValArtistConcert = 0;
                        let vValSalaConcert = 0;

                        const concert = {
                            id: current._fields[0].properties.concertID.low,
                            name: current._fields[0].properties.name,
                            hourStart: current._fields[0].properties.hourStart,
                            price: current._fields[0].properties.price,
                            date: current._fields[0].properties.date,
                            city: current._fields[2].properties.city,
                            genre: current._fields[4].properties.genre,
                            artist: current._fields[3].properties.name,
                            sala: current._fields[1].properties.room
                        };

                        // Comprobar genero fav
                        if (vGenreFavUser === concert.genre) {
                            vGenreFavConcert = 3; 
                        }
                        // Comprobar genero
                        generos.forEach((g) => {
                            if(concert.genre === g) {
                                vOthersGenresConcert = 1;
                            }
                        });
                        // Comprobar ciudad residencia
                        if (cityResidence === concert.city) {
                            vCityResidenceConcert = 2; 
                        }
                        // Comprobar ciudades
                        ciudades.forEach((c) => {
                            if(concert.city === c) {
                                vOthersCitiesConcert = 1;
                            }
                        })
                        // Horarios
                        if (concert.hourStart >= "10:00" && concert.hourStart < "15:00") {
                            vScheduleMConcert = 1;
                        } else if (concert.hourStart >= "15:00" && concert.hourStart < "21:00") {
                            vScheduleTConcert = 1;
                        } else if (concert.hourStart >= "21:00" && concert.hourStart <= "4:00") {
                            vScheduleNConcert = 1;
                        }
                        // precio 
                        vPrecioConcert = 1 - ((0.5 / vPrecioMedio) * concert.price);

                        // val artista
                        
                        followArtists.forEach((c) => {
                            if(concert.artist === c) {
                                vValArtistConcert = 2;
                            }
                        });

                        // val sala
                        allValuation.forEach((c) => {
                            if(c.roomID === concert.room) {
                                vValSala += c.val * 0.4;
                            }
                        });

                        // Realizar vector de cada concierto
                        let vConcert = [vGenreFavConcert, vOthersGenresConcert, vCityResidenceConcert, vOthersCitiesConcert, vScheduleMConcert, vScheduleTConcert, vScheduleNConcert, vPrecioConcert, vValArtistConcert, vValSalaConcert];
                    
                        console.log("Vector conciertos: " + concert.name + ":  "+ vConcert)
                        // PEARSON
                        let pearson = covarianza(vProfileUser, vConcert)/Math.sqrt(varianza(vProfileUser)*varianza(vConcert));
                        console.log(pearson);
                        
                        resultsPearson.push({id: concert.id, p: pearson});
                    });
                    console.log(resultsPearson);
                    
                }
            }).then(() => {
                // Ordenarlos por similitud en base a pearson
                let ordenados = resultsPearson.sort((a, b) => b.p - a.p);
                console.log("ordenados: " + ordenados);
            })
        } else {
            // Si no hay me gustas

        }

        
        
    });
});

async function getFollowingArtists(user) {
    let query = `MATCH (u:User)-[:SIGUE]->(a:Artist) WHERE u.name = '${user}' RETURN a`
    const artists = await session.run(query);
    var a = [];
    artists.records.forEach((current) => {
        a.push(current._fields[0].properties.name);
    });
    return a;
}

async function getAllValuation(user) {
    let query = `MATCH (u:User)-[v:VALORA]->(r:Room) WHERE u.name = '${user}' RETURN r, v.valoracion`;
    const valuation = await session.run(query);
    var v = [];
    if(valuation.records.length > 0) {
        for(var i = 0; i < valuation.records.length; i++) {
            v.push({roomID: valuation.records[0]._fields[0].properties.room, val: valuation.records[0]._fields[1].low});
        }
    }
    return v;
}

async function getGenreFavUser(user) {
    let query = `MATCH (u:User)-[:FAVORITO]->(g:Genre) WHERE u.name = '${user}' RETURN g`;
    const genre = await session.run(query);
    let g = genre.records[0]._fields[0].properties.name;
    return g;
}

async function getCityResidence(user) {
    let query = `MATCH (u:User)-[:RESIDE] ->(c:City) WHERE u.name = '${user}' RETURN c`;
    const genre = await session.run(query);
    let c = genre.records[0]._fields[0].properties.id_city;
    return c;
}

async function verConciertosQueLeGustanUser(user){
    //let user = 'Pedro';
    let query = `MATCH (u:User)-[:ME_GUSTA]->(c:Concierto) WHERE u.name = '${user}' RETURN c`;
    const conciertos = await session.run(query);
    let concerts = [];
    conciertos.records.forEach((current) => {
        let concert = {
            name: current._fields[0].properties.name
        };
        
        concerts.push(concert);
    })
    return concerts;
}

function covarianza(x, y) {
    var cov = 0;
    var mediaX = mediaAritmetica(x);
    var mediaY = mediaAritmetica(y);
    for(var i = 0; i < x.length; i++) {
        cov += (x[i] - mediaX)*(y[i] - mediaY);
    }
    cov = cov / x.length;
    return cov;
}

function varianza(x) {
    var v = 0;
    var media = mediaAritmetica(x);
    for (var i = 0; i < x.length; i++) {
        v += Math.pow(x[i]-media, 2);
    }
    v = v / x.length;
    return v;
}

function mediaAritmetica(x) {
    var media = 0;
    for(var i = 0; i < x.length; i++) {
        media += x[i]; 
    }
    media = media/x.length;
    return media;
}

// Algoritmo basado en el contenido del usuario (busqueda de un concierto actual)

// Algoritmo de filtrado colaborativo

// Algoritmo hibrido

// Algoritmo extra (paquetes de conciertos)

app.get('/pruebas', async (req, res) => {
    let user = 'Pedro';
    // Devuelve conciertos que le gustan al usuario 
    let query = `MATCH (u:User)-[:ME_GUSTA]->(c:Concierto)
    MATCH (c:Concierto)-[:REALIZA]->(r:Room)
    MATCH (r:Room)-[:PERTENECE]->(i:City)
    MATCH (a:Artist)-[:ACTUA]->(c:Concierto)
    MATCH (a:Artist)-[:EN_GENERO]->(g:Genre)
    WHERE u.name = '${user}' 
    RETURN c, r, i, a, g`;
    const request = session.run(query);
    request.then(async result => { 
        let totalConcerts = result.records.length;

        console.log(result.records[0]._fields);
        console.log(totalConcerts);
    });
});

app.get('', (req, res) => {

});

app.post('', (req, res) => {

});




function getFromDB(query) {
    let r;
    const result = session.run(query).then(result => { 
        r = result.records;
    });
    return r;
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});