import { Button, Paper, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CardConcert from '../components/CardConcert';

const ExpansionConcert = () => {

    const location = useLocation();

    const [concertsSimilarities, setConcertsSimilarities] = useState([{}]);
    const [concertActual, setConcertActual] = useState([{}]);

    const count = 1;
    useEffect(() => {
        //if(item.name != undefined) {
            getConcert();
            getConcertsSimilarities();
        //}
    }, [count]);

    const getConcertsSimilarities = () => {
        console.log(location.state.artist)
        axios.post('/api/concertsSimilarities', {artist: location.state.artist}).then(response => {
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
                console.log(newC)
              }
              setConcertsSimilarities(newC);
        }).catch(); 
    };

    const getConcert = () => {
        axios.post('/api/getConcert', {idConcert: location.state.id}).then(response => {
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
            setConcertActual(newC);
        }).catch();
      };

    return (
        <Box sx={{ margin: 7 }}>
            <Link to='/inicio'><Button variant="contained">Volver atras</Button></Link>
            <Grid>
                
            <Paper elevation={10} sx={{ mt: 15, mb: 1, width:1000, margin:10, padding: 5 }}>
                {(concertActual.length===0) ? (
                    <p>No hay conciertos similares</p>
                ) :
                concertActual.map((concert) => (
                    <Box>
                        <Typography sx={{ fontSize: 50 }}>{concert.name}</Typography>
                        <Typography sx={{ fontSize: 25 }}>Hora de comienzo: {concert.hourStart}</Typography>
                        <Typography sx={{ fontSize: 25 }}>Fecha: {concert.date}</Typography>
                        <Typography sx={{ fontSize: 25 }}>Sala: {concert.room}</Typography>
                        <Typography sx={{ fontSize: 25 }}>Ciudad: {concert.city}</Typography>
                        <Typography sx={{ fontSize: 25 }}>Artista: {concert.artist}</Typography>
                        <Typography sx={{ fontSize: 25 }}>Genero: {concert.genre}</Typography>
                        <Typography sx={{ fontSize: 25 }}>Precio: {concert.price} e.</Typography>
                    </Box>
                ))}
            </Paper>
            </Grid>
            <Grid>
            <h2>Conciertos recomendados</h2>
            <Grid container spacing={4} >
            {(concertsSimilarities.length===0) ? (
                <p>No hay conciertos similares</p>
                ) :
                concertsSimilarities.map((concert) => (
                <Grid item md={3} sm={6} xs={6}>
                    <CardConcert item={concert} />
                </Grid>
            ))};
            </Grid>
            <br/><br/>
            
            </Grid>
        </Box>
    );
};

export default ExpansionConcert;