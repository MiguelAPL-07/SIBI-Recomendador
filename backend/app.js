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

var session = driver.session();

var userID = -1;


app.get('/', (req, res) => {
    res.send('Bienvenido al recomendador de conciertos!');
});

// Ejemplo de crear un nodo
app.post('/crearNodo', (req, res) => {
    const {user, pass} = req.params;
    session.run(`CREATE (u:User {name: "${user}", pass: "${pass}"})`)
        .then(resultado => {
            res.send('Usuario registrado ' + resultado);
    }).catch(error => {
        console.log(error);
    });
});

app.post('/api/login', (req, res) => {
    const {user, pass} = req.body;
    //let query = `MATCH (u:User) WHERE u.username = '${user}' and u.password = '${pass}' RETURN u.username`;
    let query = `MATCH (u:User) WHERE u.name = '${user}' RETURN u.name`;
    const request = session.run(query);
    request.then(result => { 
        if(result.records.length > 0) {
            userID = result.records[0]._fields[0];
            res.json({login: 1});
            console.log(userID);
        } else {
            res.json({login: 0})
        }
    }).then();
});

app.post('/api/register', (req, res) => {
    const {username, pass, name, surname, date, sex, cityResidence, genreFav} = req.body;
    let query = `CREATE (u:User {username: '${username}', password: '${pass}', name: '${name}', surname: '${surname}', date: '${date}, sex: '${sex}'})
        MERGE (u)-[:]->(c:City {city: '${cityResidence}'}) MERGE (u)-[:]->(g:Genre {genre: '${genreFav}'}) RETURN u.username`;
    const request = session.run(query);
    request.then(result => { 
        if(result.records.length > 0) {
            userID = result.records[0]._fields[0];
            res.json({login: 1});
        } else {
            res.json({login: 0})
        }
    }).then();
});

app.get('/api/getConcertsCityUser', (req, res) => {
    session = driver.session();
    let query = `MATCH (c:Concierto)-[:REALIZA]->(r:Room), (u:User)-[:RESIDE]->(ci:City), (r:Room)-[:PERTENECE]->(ci:City), (a:Artist)-[:ACTUA]->(c:Concierto), (a:Artist)-[:EN_GENERO]->(g:Genre)
        WHERE u.name = '${userID}'
        RETURN c.concertID, c.name, c.hourStart, c.price, c.date, ci.city, g.genre, a.name, r.room`;
    const request = session.run(query);

    request.then(result => { 
        
        let concerts = [];

        result.records.forEach((current) => {
            const concert = {
                id: current._fields[0].low,
                name: current._fields[1],
                hourStart: current._fields[2],
                price: current._fields[3],
                date: current._fields[4],
                city: current._fields[5],
                genre: current._fields[6],
                artist: current._fields[7],
                room: current._fields[8],
            };
            concerts.push(concert);
        })
        res.send(concerts);
    }).catch();
});

app.get('/api/allGenres', (req, res) => {
    
});

app.get('/api/allArtists', (req, res) => {
    session = driver.session();
    let query = `MATCH (a:Artist)-[:EN_GENERO]->(g:Genre) RETURN a.name, g.genre`;
    const request = session.run(query);
    request.then(result => { 
        let artists = [];
        result.records.forEach((current) => {
            let artist = {
                name: current._fields[0],
		        genre: current._fields[1]
            };
            artists.push(artist);
        })
        res.send(artists);
    }).catch();
});

app.get('/api/allRooms', (req, res) => {
    session = driver.session();
    let query = `MATCH (r:Room)-[:PERTENECE]->(c:City) RETURN  r.room, c.city`;
    const request = session.run(query);
    request.then(result => { 
        let rooms = [];
        result.records.forEach((current) => {
            let room = {
                name: current._fields[0], 
		        city: current._fields[1] 
            };
            rooms.push(room);
        })
        res.send(rooms);
    }).catch();
});

// MODIFICAR
app.get('/api/allConcerts', (req, res) => {
    session = driver.session();
    let query = `MATCH (c:Concierto)-[:REALIZA]->(r:Room), (r:Room)-[:PERTENECE]->(ci:City), (a:Artist)-[:ACTUA]->(c:Concierto), (a:Artist)-[:EN_GENERO]->(g:Genre)
    RETURN c.concertID, c.name, c.hourStart, c.price, c.date, ci.city, g.genre, a.name, r.room`;
    const request = session.run(query);

    request.then(result => { 
        
        let concerts = [];

        result.records.forEach((current) => {
            const concert = {
                id: current._fields[0].low,
                name: current._fields[1],
                hourStart: current._fields[2],
                price: current._fields[3],
                date: current._fields[4],
                city: current._fields[5],
                genre: current._fields[6],
                artist: current._fields[7],
                room: current._fields[8],
            };

            concerts.push(concert);
        })
        res.send(concerts);
    }).catch();
});

// CONCIERTOS CON MAS LIKES
// AJUSTAR LA DEVOLUCIÓN
app.get('/api/moreLikesConcerts', (req, res) => {
    session = driver.session();
    let query = `MATCH (u:User)-[m:ME_GUSTA]->(c:Concierto), (c:Concierto)-[:REALIZA]->(r:Room), (r:Room)-[:PERTENECE]->(ci:City), (a:Artist)-[:ACTUA]->(c:Concierto), (a:Artist)-[:EN_GENERO]->(g:Genre)
        RETURN c.concertID, c.name, c.hourStart, c.price, c.date, ci.city, g.genre, a.name, r.room, count(m) ORDER BY count(m) DESC`;
    const request = session.run(query);

    request.then(result => { 
        
        let concerts = [];

        result.records.forEach((current) => {
            const concert = {
                id: current._fields[0].low,
                name: current._fields[1],
                hourStart: current._fields[2],
                price: current._fields[3],
                date: current._fields[4],
                city: current._fields[5],
                genre: current._fields[6],
                artist: current._fields[7],
                room: current._fields[8],
            };
            concerts.push(concert);
        })
        res.send(concerts);
    }).catch();
});

// SALAS CON MAS CONCIERTOS
// AJUSTAR 
app.get('/api/moreConcertsRooms', (req, res) => {
    session = driver.session();
    let query = `MATCH (c:Concierto)-[:REALIZA]->(r:Room), (r:Room)-[:PERTENECE]->(ci:City)
    RETURN r.room, ci.city, count(c) ORDER BY count(c) DESC`;
    const request = session.run(query);

    request.then(result => { 
        
        let rooms = [];

        result.records.forEach((current) => {
            let room = {
                name: current._fields[0], 
		        city: current._fields[1] 
            };
            rooms.push(room);
        })
        res.send(rooms);
    }).catch();
});

// SALAS MEJOR VALORADAS


// ARTISTAS CON MAS CONCIERTOS
// Ajustar
app.get('/api/artistWithMoreConcerts', (req, res) => {
    session = driver.session();
    let query = `MATCH (a:Artist)-[:ACTUA]->(c:Concierto)
        RETURN a.name, count(c) ORDER BY count(c) DESC`;
    const request = session.run(query);

    request.then(result => { 
        
        let artists = [];

        result.records.forEach((current) => {
            let artist = {
                name: current._fields[0],
                genre: current._fields[1]
            };
            artists.push(artist);
        })
        res.send(artists);
    }).catch();
});

// ARTISTAS CON MAS SEGUIDORES
// JUSTAR
app.get('/api/artistWithMoreFollowers', (req, res) => {
    session = driver.session();
    let query = `MATCH (a:Artist)-[:ACTUA]->(c:Concierto), (a:Artist)-[:EN_GENERO]->(g:Genre)
    RETURN a.name,g.genre, count(c) ORDER BY count(c) DESC`;
    const request = session.run(query);

    request.then(result => { 
        
        let artists = [];

        result.records.forEach((current) => {
            let artist = {
                name: current._fields[0],
		        genre: current._fields[1]
            };
            artists.push(artist);
        })
        res.send(artists);
    }).catch();
});

app.get('/api/artistsOfMoment', (req, res) => {
});


app.get('/api/mostPopularArtists', (req, res) => {

});

// SALAS MEJOR VALORADAS
app.get('/api/getMoreValuationRooms', (req, res) => {
    session = driver.session();
    let query = `MATCH (u:User)-[v:VALORA]->(r:Room), (r:Room)-[:PERTENECE]->(c:City) RETURN  r.room, avg(v.valoracion), c.city ORDER BY avg(v.valoracion) DESC`;
    const request = session.run(query);

    request.then(result => { 
        
        let rooms = [];

        result.records.forEach((current) => {
            let room = {
                name: current._fields[0], 
                val: current._fields[1].low,
                city: current._fields[2] 
            };
            rooms.push(room);
        });
        res.send(rooms);
    }).catch();
});


// TODAS LAS VALORACIONES DE UN USUARIO
app.get('/api/getValuationRooms', (req, res) => {
    session = driver.session();
    let query = `MATCH (u:User)-[v:VALORA]->(r:Room), (r:Room)-[:PERTENECE]->(c:City) WHERE u.name='${userID}' RETURN  r.room, v.valoracion, c.city`;
    const request = session.run(query);

    request.then(result => { 
        
        let rooms = [];

        result.records.forEach((current) => {
            let room = {
                name: current._fields[0], 
                val: current._fields[1].low,
                city: current._fields[2]
            };
            rooms.push(room);
        });
        res.send(rooms);
    }).catch();
});

app.post('/api/getConcert', (req, res) => {
    const {idConcert} = req.body;
    session = driver.session();
    let query = `MATCH (c:Concierto)-[:REALIZA]->(r:Room), (r:Room)-[:PERTENECE]->(ci:City), (a:Artist)-[:ACTUA]->(c:Concierto), (a:Artist)-[:EN_GENERO]->(g:Genre)
        WHERE c.concertID=${idConcert} RETURN c.concertID, c.name, c.hourStart, c.price, c.date, ci.city, g.genre, a.name, r.room`;
    const request = session.run(query);

    request.then(result => { 
        
        let concerts = [];

        result.records.forEach((current) => {
            
            const concert = {
                id: current._fields[0].low,
                name: current._fields[1],
                hourStart: current._fields[2],
                price: current._fields[3],
                date: current._fields[4],
                city: current._fields[5],
                genre: current._fields[6],
                artist: current._fields[7],
                room: current._fields[8]
            };
            concerts.push(concert);
        });
        res.send(concerts);
    }).catch();
});

// MODIFICAR
app.get('/api/getConcertsLike', (req, res) => {
    session = driver.session();
    let query = `MATCH (u:User)-[m:ME_GUSTA]->(c:Concierto), (c:Concierto)-[:REALIZA]->(r:Room), (r:Room)-[:PERTENECE]->(ci:City), (a:Artist)-[:ACTUA]->(c:Concierto), (a:Artist)-[:EN_GENERO]->(g:Genre)
        WHERE u.name='${userID}' RETURN c.concertID, c.name, c.hourStart, c.price, c.date, ci.city, g.genre, a.name, r.room`;
    const request = session.run(query);

    request.then(result => { 
        
        let concerts = [];

        result.records.forEach((current) => {
            
            const concert = {
                id: current._fields[0].low,
                name: current._fields[1],
                hourStart: current._fields[2],
                price: current._fields[3],
                date: current._fields[4],
                city: current._fields[5],
                genre: current._fields[6],
                artist: current._fields[7],
                room: current._fields[8],
            };
            concerts.push(concert);
        });
        res.send(concerts);
    }).catch();
});

// MODIFICAR
app.get('/api/getArtistsFollowing', (req, res) => {
    session = driver.session();
    let query = `MATCH (u:User)-[:SIGUE]->(a:Artist), (a:Artist)-[:EN_GENERO]->(g:Genre)  WHERE u.name = '${userID}' RETURN a.name,  g.genre`;
    const request = session.run(query);
    request.then(result => { 
        
        let artists = [];

        result.records.forEach((current) => {
            
            let artist = {
                name: current._fields[0],
		        genre: current._fields[1]
            };
            artists.push(artist);
            
        })
        res.send(artists);
    }).catch();
});

// Seguir a un artista
app.post('/api/followArtist', (req, res) => {
    session = driver.session();
    const {idArtist} = req.body;
    let query = `MATCH(u:User) WHERE u.name = '${userID}' 
        MATCH (a:Artist) WHERE a.name = '${idArtist}'
        MERGE (u)-[:SIGUE]->(a)
        RETURN a, u`;
    const request = session.run(query);
    request.then(result => { 
        if(result.records.length > 0) {
            res.json({r: 1});
        } else {
            res.json({r: 0})
        }
    }).catch();
});

// Dejar de seguir a un artista
app.post('/api/stopFollowArtist', (req, res) => {
    session = driver.session();
    const {idArtist} = req.body;
    let query = `MATCH (u:User)-[s:SIGUE]->(a:Artist)
        WHERE u.name = '${userID}' AND a.name = '${idArtist}'
        DELETE s
        RETURN u, a`;
    const request = session.run(query);
    request.then(result => { 
        if(result.records.length > 0) {
            res.json({r: 1});
        } else {
            res.json({r: 0})
        }
    }).catch();
});

// Pasar parametros por la url
// Dar me gusta a un concierto
app.post('/api/likeConcert', (req, res) => {
    session = driver.session();
    const {idConcert} = req.body;
    let query = `MATCH (u:User) WHERE u.name = '${userID}' 
    MATCH (c:Concierto) WHERE c.concertID = ${idConcert}
    MERGE (u)-[:ME_GUSTA]->(c)
    RETURN u, c`;
    const request = session.run(query);
    request.then(result => { 
        if(result.records.length > 0) {
            res.json({r: 1});
        } else {
            res.json({r: 0})
        }
    }).catch();
});

// Pasar parametros por la url
// Quitar me gusta a un concierto
app.delete('/api/dislikeConcert', (req, res) => {
    session = driver.session();
    const {idConcert} = req.body;
    console.log("LLEGA petic" + idConcert + "  "+ userID);
    let query = `MATCH (u:User)-[m:ME_GUSTA]->(c:Concierto)
        WHERE u.name = '${userID}' AND c.concertID = ${idConcert}
        DELETE m
        RETURN u, c`;
    const request = session.run(query);
    request.then(result => { 
        if(result.records.length > 0) {
            res.json({r: 1});
        } else {
            res.json({r: 0})
        }
    }).catch();
});

//Modificar
app.post('/api/valorarSala', (req, res) => {
    session = driver.session();
    const {idRoom, val} = req.body;
    let query = `MATCH (u:User) 
        WHERE (u.name = '${userID}')
        MATCH (r:Room) 
        WHERE (r.room = '${idRoom}')
        MERGE (u)-[:VALORA {valoracion: ${val}}]->(r)
        RETURN u, r`;
    const request = session.run(query);
    request.then(result => { 
        if(result.records.length > 0) {
            res.json({r: 1});
        } else {
            res.json({r: 0})
        }
    }).catch();
});

//Modificar
app.post('/api/modificarValoracionSala', (req, res) => {
    session = driver.session();
    const {idRoom, val} = req.body;
    let query = `MATCH (u:User)-[v:VALORA]->(r:Room)
        WHERE (u.name = '${userID}') AND (r.room = '${idRoom}')
        SET v.valoracion = '${val}'
        RETURN u, r`;
    const request = session.run(query);
    request.then(result => { 
        if(result.records.length > 0) {
            res.json({r: 1});
        } else {
            res.json({r: 0})
        }
    }).catch();
});

// Modificar
app.delete('/api/eliminarValSala', (req, res) => {
    session = driver.session();
    const {idRoom} = req.body;
    let query = `MATCH (u:User)-[v:VALORA]->(r:Room)
        WHERE (u.name = '${userID}') AND (r.room = '${idRoom}')
        DELETE v
        RETURN u, r`;
    const request = session.run(query);
    request.then(result => { 
        if(result.records.length > 0) {
            res.json([1]);
        } else {
            res.json({r: 0})
        }
    }).catch();
});


app.get('/api/recomendedArtists', (req, res) => {
    session = driver.session();
    let query = `MATCH (u1:User {name: '${userID}'})-[:SIGUE]->(artist1:Artist)
        WITH u1, collect(id(artist1)) AS u1Artist 
        MATCH (u2:User)-[:SIGUE]->(artist2:Artist) WHERE u1 <> u2
        WITH u1, u1Artist, u2, collect(id(artist2)) AS u2Artist
        WITH u1, u2, u1Artist, gds.similarity.jaccard(u1Artist, u2Artist) AS Similarity ORDER BY Similarity DESC
        MATCH (u:User)-[:SIGUE]->(a:Artist) WHERE u.name = u2.name
        WITH a, u1
        MATCH (u:User)-[:SIGUE]->(aAux:Artist), (a)-[:EN_GENERO]-(g:Genre) WHERE u.name = u1.name AND NOT exists((u1)-[:SIGUE]->(a))
        RETURN DISTINCT(a.name), g.genre`;

    const request = session.run(query);
    request.then(result => { 
        var artists = [];
        result.records.forEach(current => {
            let artist = {
                name: current._fields[0],
                genre: current._fields[1]
            };
            artists.push(artist);
        });
        res.send(artists);
    }).catch().then();
});

// ADAPTAR LOS DATOS QUE DEVUELVE
app.post('/api/concertsSimilarities', (req, res) => {
    session = driver.session();
    const {artist} = req.body;
    let query = ` MATCH (c:Concierto)-[:REALIZA]->(r:Room), (r)-[:PERTENECE]->(i:City), (a:Artist)-[:ACTUA]->(c:Concierto), (a:Artist)-[:EN_GENERO]->(g:Genre) WHERE a.name = '${artist}'
        WITH  c, r, i, a, g
        MATCH (cAux:Concierto)-[:REALIZA]->(rAux:Room), (rAux)-[:PERTENECE]->(iAux:City), (aAux:Artist)-[:ACTUA]->(cAux:Concierto), (aAux:Artist)-[:EN_GENERO]->(gAux:Genre) WHERE aAux <> a
        WITH  c, r, i, a, g, cAux, rAux, iAux, aAux, gAux,
        collect(CASE gAux.genre WHEN g.genre THEN 2 ELSE 0 END) AS genre, 
        collect(CASE rAux.room WHEN r.room THEN 2 ELSE 0 END) AS room, 
        collect(CASE iAux.city WHEN i.city THEN 2 ELSE 0 END) AS city
        WITH genre, room, city, cAux,iAux, gAux, aAux, rAux,
        gds.similarity.cosine([2,2,2], genre+room+city) AS coseno WHERE coseno >0 
        RETURN  cAux.concertID, cAux.name,cAux.hourStart, cAux.price, cAux.date, iAux.city, gAux.genre, aAux.name, rAux.room , coseno ORDER BY coseno DESC;` 
    const request = session.run(query);
    request.then(result => { 
        var concerts = [];
        result.records.forEach(current => {
            const concert = {
                id: current._fields[0].low,
                name: current._fields[1],
                hourStart: current._fields[2],
                price: current._fields[3],
                date: current._fields[4],
                city: current._fields[5],
                genre: current._fields[6],
                artist: current._fields[7],
                room: current._fields[8],
            };
            concerts.push(concert);
        });
        res.send(concerts);
    }).catch().then(() => session.close());
});


// Algoritmo basado en el contenido del usuario (actividad del usuario - me gustas)
app.get('/api/actividadUsuario', async (req, res) => {
    session = driver.session();
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

            session = driver.session();

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
                        
                        resultsPearson.push({concert: concert, p: pearson});
                    });
                    console.log(resultsPearson);
                    
                }
            }).then(() => {
                // Ordenarlos por similitud en base a pearson
                let ordenados = resultsPearson.sort((a, b) => b.p - a.p);
                console.log("ordenados: " + ordenados);
                res.send(ordenados);
            })
        } else {
            // Si no hay me gustas
            //Mejores conciertos
        }

        
        
    });
});

// PEARSON PARA DOS USUARIOS
app.get('/api/algoritmoUsuarioAUsuario', (req, res) => {

});

app.get('/api/algoritmoHibrido', (req, res) => {
    // Seguidores y reproducciones 

    // Valoraciones artistas y sala

    // Numero de me gustas


});

async function getFollowingArtists(user) {
    session = driver.session();
    let query = `MATCH (u:User)-[:SIGUE]->(a:Artist) WHERE u.name = '${user}' RETURN a`
    const artists = await session.run(query);
    var a = [];
    artists.records.forEach((current) => {
        a.push(current._fields[0].properties.name);
    });
    return a;
}

async function getAllValuation(user) {
    session = driver.session();
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
    session = driver.session();
    let query = `MATCH (u:User)-[:FAVORITO]->(g:Genre) WHERE u.name = '${user}' RETURN g`;
    const genre = await session.run(query);
    let g = genre.records[0]._fields[0].properties.name;
    return g;
}

async function getCityResidence(user) {
    session = driver.session();
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