import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const CardConcert = ({item}) => {

    const [buttonLike, setButtonLike] = useState(1);

    const count = 1;
    
    useEffect(() => {
        if(item.id != undefined) {
            comprobar();
        }
    }, [count]);

    const comprobar = () => {
        axios.get('/api/getConcertsLike').then(response => {
            let array = response.data;
            for (let i = 0; i < array.length; i++) {
                if(array[i].id === item.id) {
                    setButtonLike(-1);
                } 
            }
        }).catch();
    }

    const likeConcert = () => {
        axios.post('/api/likeConcert', {idConcert: item.id}).then(response => {
            if(response.data.r === 1) {
                console.log("Concierto dado a me gusta");
                setButtonLike(-1);
            }
        }).catch();
    };

    const disLikeConcert = () => {
        axios.delete('/api/dislikeConcert', { data: { idConcert: item.id} }).then(response => {
            if(response.data.r === 1) {
                console.log("Concierto quitado el me gusta");
                setButtonLike(1);
            }
        }).catch();
    };

    return (
        <Box sx={{ width:350 }}>
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 30 }}>
                        {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: 15 }}>Hora de comienzo: {item.hourStart}</Typography>
                    <Typography sx={{ fontSize: 16 }}>Fecha: {item.date}</Typography>
                    <Typography sx={{ fontSize: 16 }}>Sala: {item.room}</Typography>
                    <Typography sx={{ fontSize: 18 }}>Precio: {item.price} e.</Typography>
                </CardContent>
                <CardActions>
                    {(buttonLike===-1) ? (
                        <Box sx={{ '& button': { m: 1 } }}>
                            <Button variant="contained" startIcon={<FavoriteOutlinedIcon />} onClick={disLikeConcert}>NO ME GUSTA</Button>
                        </Box>
                    ) :
                        <Box sx={{ '& button': { m: 1 } }}>
                            <Button  variant="contained" startIcon={<FavoriteBorderOutlinedIcon />} onClick={likeConcert}>ME GUSTA</Button>
                        </Box>
                        
                    }
                    <Link to='/concierto' state={{id: item.id, artist: item.artist}}><Button variant="contained">Ver Concierto</Button></Link>
                </CardActions>
            </Card>   
        </Box>
    );
};

export default CardConcert;