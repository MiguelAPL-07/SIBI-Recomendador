import { Button, Grid, Box, Container, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CardConcert from "../components/CardConcert";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import CardArtist from "../components/CardArtist";
import { styled, useTheme } from '@mui/material/styles';
import CardRoom from "../components/CardRoom";




function Main() {
  const theme = useTheme();

  const [cityUser, setCityUser] = useState("");

  const [moreLikesConcerts, setMoreLikesConcerts] = useState([{}]);
  const [moreConcertsRooms, setMoreConcertsRooms] = useState([{}]);
  const [moreConcertsInCity, setMoreConcertsInCity] = useState([{}]);
  const [artistWithMoreConcerts, setArtistWithMoreConcerts] = useState([{}]);
  const [artistWithMoreFollowers, setArtistWithMoreFollowers] = useState([{}]);
  const [moreValuationRooms, setMoreValuationRooms] = useState([{}]);

  const [concertsLike, setConcertsLike] = useState([{}]);
  const [actividadUsuario, setActividadUsuario] = useState([{}]);
  const [allConcerts, setAllConcerts] = useState([{}]);

  const [artistsFollowing, setArtistFollowing] = useState([{}]);
  const [recomendedArtists, setRecomendedArtists] = useState([{}]);
  const [allArtists, setAllArtists] = useState([{}]);

  
  const [valuationRooms, setValuationRooms] = useState([{}]);
  const [allRooms, setAllRooms] = useState([{}]);

  

  // Menu izquierdo (establecer predeterminado)
  const [page, setPage] = useState("Menu_1");

  const changePage = newPage => {
    setPage(newPage);
  }

  const count = 1;
  useEffect(() => {
    getMoreLikesConcerts();
    getMoreConcertsInCity();
    getMoreConcertsRooms();
    getArtistWithMoreConcerts();
    getArtistWithMoreFollowers();
    getMoreValuationRooms();
    getConcertsLike();
    getActividadUsuario();
    getAllConcerts();
    getArtistsFollowing();
    getRecomendedArtists();
    getAllArtists();
    getValuationRooms();
    getAllRooms();
  }, [count]);

  const getAllConcerts = () => {
    axios.get('/api/allConcerts').then(response => {
        let array = response.data;
        let newC = [];
        for (let i = 0; i < array.length; i++) {
          newC = newC.concat({
            id: array[i].id, 
            name: array[i].name,
            hourStart: array[i].hourStart,
            price: array[i].price,
            date: array[i].date,
            city: array[i].city,
            genre: array[i].genre,
            artist: array[i].artist,
            room: array[i].room
          });
        }
        setAllConcerts(newC);
    }).catch();
  };

  const getArtistsFollowing = () => {
    axios.get('/api/getArtistsFollowing').then(response => {
      
      let array = response.data;
      let newA = [];
        for (let i = 0; i < array.length; i++) {
            newA = newA.concat({name: array[i].name, genre: array[i].genre});
        }
        setArtistFollowing(newA);
    }).catch();
  };

  const getConcertsLike = () => {
    axios.get('/api/getConcertsLike').then(response => {
      let array = response.data;
      let newC = [];
        for (let i = 0; i < array.length; i++) {
          newC = newC.concat({
            id: array[i].id, 
            name: array[i].name,
            hourStart: array[i].hourStart,
            price: array[i].price,
            date: array[i].date,
            city: array[i].city,
            genre: array[i].genre,
            artist: array[i].artist,
            room: array[i].room
          });
        }
        setConcertsLike(newC);
    }).catch();
  };

  const getRecomendedArtists = () => {
    axios.get('/api/recomendedArtists').then(response => {
      let array = response.data;
      let newA = [];
        for (let i = 0; i < array.length; i++) {
            newA = newA.concat({name: array[i].name, genre: array[i].genre});
        }
        setRecomendedArtists(newA);
    }).catch();
  };

  const getActividadUsuario = () => {
    axios.get('/api/actividadUsuario').then(response => {
      let array = response.data;
      console.log(array);
      let newC = [];
        for (let i = 0; i < array.length; i++) {
          newC = newC.concat({
            id: array[i].concert.id, 
            name: array[i].concert.name,
            hourStart: array[i].concert.hourStart,
            price: array[i].concert.price,
            date: array[i].concert.date,
            city: array[i].concert.city,
            genre: array[i].concert.genre,
            artist: array[i].concert.artist,
            room: array[i].concert.room
          });
        }
        setActividadUsuario(newC);
    }).catch();
  };

  const getMoreLikesConcerts = () => {
    axios.get('/api/moreLikesConcerts').then(response => {
      let array = response.data;
      let newC = [];
        for (let i = 0; i < array.length; i++) {
          newC = newC.concat({
            id: array[i].id, 
            name: array[i].name,
            hourStart: array[i].hourStart,
            price: array[i].price,
            date: array[i].date,
            city: array[i].city,
            genre: array[i].genre,
            artist: array[i].artist,
            room: array[i].room
          });
        }
        setMoreLikesConcerts(newC);
    }).catch();
  };

  const getMoreConcertsInCity = () => {
    axios.get('/api/getConcertsCityUser').then(response => {
      let array = response.data;
      let newC = [];
      let city = '';
      for (let i = 0; i < array.length; i++) {
        newC = newC.concat({
          id: array[i].id, 
          name: array[i].name,
          hourStart: array[i].hourStart,
          price: array[i].price,
          date: array[i].date,
          city: array[i].city,
          genre: array[i].genre,
          artist: array[i].artist,
          room: array[i].room
        });
        city = array[i].city;
      }
      setMoreConcertsInCity(newC);
      setCityUser(city);
    }).catch();
  };

  const getMoreConcertsRooms = () => {
    axios.get('/api/moreConcertsRooms').then(response => {
      let array = response.data;
      let newC = [];
        for (let i = 0; i < array.length; i++) {
          newC = newC.concat({name: array[i].name, city: array[i].city});
        }
        setMoreConcertsRooms(newC);
    }).catch();
  };

  const getArtistWithMoreConcerts = () => {
    axios.get('/api/artistWithMoreConcerts').then(response => {
      let array = response.data;
      let newA = [];
        for (let i = 0; i < array.length; i++) {
            newA = newA.concat({name:array[i].name, genre: array[i].genre});
        }
        setArtistWithMoreConcerts(newA);
    }).catch();
  };

  const getArtistWithMoreFollowers = () => {
    axios.get('/api/artistWithMoreFollowers').then(response => {
      let array = response.data;
      let newA = [];
        for (let i = 0; i < array.length; i++) {
            newA = newA.concat({name:array[i].name, genre: array[i].genre});
        }
        setArtistWithMoreFollowers(newA);
    }).catch();
  };

  const getAllArtists = () => {
    axios.get('/api/allArtists').then(response => {
      let array = response.data;
      let newA = [];
        for (let i = 0; i < array.length; i++) {
            newA = newA.concat({name: array[i].name, genre: array[i].genre});
        }
        setAllArtists(newA);
    }).catch();
  };

  const getValuationRooms = () => {
    axios.get('/api/getValuationRooms').then(response => {
      let array = response.data;
      let newR = [];
        for (let i = 0; i < array.length; i++) {
          newR = newR.concat({name: array[i].name, val: array[i].val, city: array[i].city});
        }
        setValuationRooms(newR);
    }).catch();
  };

  const getMoreValuationRooms = () => {
    axios.get('/api/getMoreValuationRooms').then(response => {
      let array = response.data;
      let newR = [];
        for (let i = 0; i < array.length; i++) {
          newR = newR.concat({name: array[i].name, val: array[i].val, city: array[i].city});
        }
        setMoreValuationRooms(newR);
    }).catch();
  };

  const getAllRooms = () => {
    axios.get('/api/allRooms').then(response => {
      let array = response.data;
      let newR = [];
        for (let i = 0; i < array.length; i++) {
          newR = newR.concat({name: array[i].name, city: array[i].city});
        }
        setAllRooms(newR);
    }).catch();
  };  

  return (
    <div>
      <Box sx={{ display: 'flex' }} style={{ background: 'lightBlue' }}>
        
        <TopBar selectItem={changePage}/>
        
        <Container  sx={{ mt: 15, ml: 15 }}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {(page==="Menu_1") ? (
              <div>

                <div>
                  <h2>CONCIERTOS MÁS POPULARES</h2>
                  <Grid container spacing={2} >
                    {(moreLikesConcerts.length===0) ? (
                      <p>No le has dado me gusta a ningun concierto</p>
                    ) :
                    moreLikesConcerts.map((concert) => (
                      <Grid item md={4} xs={6}>
                        <CardConcert item={concert} />
                      </Grid>
                    ))}
                  </Grid>

                  

                  <h2>MEJORES CONCIERTOS EN {cityUser}</h2>

                  <Grid container spacing={4} >
                  {(moreConcertsInCity.length===0) ? (
                    <p>No sigues a ningun artista</p>
                  ) :
                  moreConcertsInCity.map((concert) => (
                    <Grid item md={4}  xs={6}>
                      <CardConcert item={concert} />
                    </Grid>
                  ))}
                  </Grid>
                  


                  <h2>ARTISTAS CON MÁS CONCIERTOS</h2>
                  <Grid container spacing={4} >
                  {(artistWithMoreConcerts.length===0) ? (
                    <p>No sigues a ningun artista</p>
                  ) :
                  artistWithMoreConcerts.map((artist) => (
                    <Grid item md={4} xs={6}>
                      <CardArtist item={artist} />
                    </Grid>
                  ))}
                  </Grid>

                  <h2>ARTISTAS CON MÁS SEGUIDORES</h2>
                  <Grid container spacing={4} >
                  {(artistWithMoreFollowers.length===0) ? (
                    <p>No sigues a ningun artista</p>
                  ) :
                  artistWithMoreFollowers.map((artist) => (
                    <Grid item md={4} xs={6}>
                      <CardArtist item={artist} />
                    </Grid>
                  ))}
                  </Grid>

                  <h2>SALAS CON MÁS CONCIERTOS</h2>
                  <Grid container spacing={4} >
                  {(moreConcertsRooms.length===0) ? (
                    <p>No sigues a ningun artista</p>
                  ) :
                  moreConcertsRooms.map((room) => (
                    <Grid item md={4} xs={6}>
                      <CardRoom item={room} />
                    </Grid>
                  ))}
                  </Grid>

                  <h2>SALAS MEJOR VALORADAS</h2>

                  <Grid container spacing={4} >
                    {(moreValuationRooms.length===0) ? (
                      <p>No sigues a ningun artista</p>
                    ) :
                    moreValuationRooms.map((room) => (
                      <Grid item md={4} xs={6}>
                        <CardRoom item={room} />
                      </Grid>
                    ))}
                  </Grid>
                
                </div>
              </div>
            ) : ""}
            {(page==="Menu_2") ? ( 
              <Grid container spacing={4} >
                {(concertsLike.length===0) ? (
                    <p>No le has dado me gusta a ningun concierto</p>
                ) :
                concertsLike.map((concert) => (
                  <Grid item md={4} xs={6}>
                    <CardConcert item={concert} />
                  </Grid>
                ))}
              </Grid>
            ) : ""}
            {(page==="Menu_3") ? ( 
              <Grid container spacing={4} >
                {(actividadUsuario.length===0) ? (
                    <p>No le has dado me gusta a ningun concierto</p>
                ) :
                actividadUsuario.map((concert) => (
                  <Grid item md={4} xs={6}>
                    <CardConcert item={concert} />
                  </Grid>
                ))}
              </Grid>
            ) : ""}
            {(page==="Menu_4") ? ( 
              <Grid container spacing={4}  >
                {(allConcerts.length===0) ? (
                    <p>No hay nigun concierto disponible</p>
                ) :
                allConcerts.map((concert) => (
                  <Grid item md={4} xs={3}>
                    <CardConcert item={concert} />
                  </Grid>
                ))};
              </Grid>
            ) : ""}
            {(page==="Menu_5") ? ( 
              <Grid container spacing={4} >
                {(artistsFollowing.length===0) ? (
                    <p>No sigues a ningun artista</p>
                ) :
                artistsFollowing.map((artist) => (
                  <Grid item md={4} xs={6}>
                    <CardArtist item={artist} />
                  </Grid>
                ))}
              </Grid>
            ) : ""}
            {(page==="Menu_6") ? ( 
              <Grid container spacing={4} >
                {(recomendedArtists.length===0) ? (
                    <p>No hay ningun artista recomendado para ti</p>
                ) :
                recomendedArtists.map((artist) => (
                  <Grid item md={4} xs={6}>
                    <CardArtist item={artist} />
                  </Grid>
                ))}
              </Grid>
            ) : ""}
            {(page==="Menu_7") ? ( 
              <Grid container spacing={4} >
                {(allArtists.length===0) ? (
                    <p>No sigues a ningun artista</p>
                ) :
                allArtists.map((artist) => (
                  <Grid item md={4} xs={6}>
                    <CardArtist item={artist} />
                  </Grid>
                ))}
              </Grid>
            ) : ""}
            {(page==="Menu_8") ? ( 
              <Grid container spacing={4} >
                {(valuationRooms.length===0) ? (
                    <p>No has valorado ninguna sala</p>
                ) :
                valuationRooms.map((room) => (
                  <Grid item md={4} xs={6}>
                    <CardRoom item={room} />
                  </Grid>
                ))}
              </Grid>
            ) : ""}
            {(page==="Menu_9") ? ( 
              <Grid container spacing={4} >
                {(allRooms.length===0) ? (
                    <p>No sigues a ningun artista</p>
                ) :
                allRooms.map((room) => (
                  <Grid item md={4} xs={6}>
                    <CardRoom item={room} />
                  </Grid>
                ))}
              </Grid>
            ) : ""}
          </Container>
          
        </Container>
      </Box>
     <Footer />
    </div>
  );
}

export default Main;
