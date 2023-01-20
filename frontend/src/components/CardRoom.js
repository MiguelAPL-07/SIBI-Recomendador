import { Card, CardContent, Typography, CardActions, Button, Rating, Box, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';


const CardRoom = ({item}) => {

    const [valueRatting, setValueRatting] = useState(0);

    const [buttonValuation, setButtonValuation] = useState(-1);

    const count = 1;
    useEffect(() => {
        comprobar();
    }, [count]);
    
    const comprobar = () => {
        axios.get('/api/getValuationRooms').then(response => {
            let array = response.data;
            for (let i = 0; i < array.length; i++) {
                if(array[i].name === item.name) {
                    setButtonValuation(1);
                    if(array[i].val != 0) {
                        setValueRatting(Math.trunc(array[i].val));
                    }
                }
            } 
        }).catch();
    }

    // PONER LA VALORACION
    const valorarSala = () => {
        axios.post('/api/valorarSala', {idRoom: item.name, val: valueRatting}).then(response => {
            if(response.data.r === 1) {
                console.log("Sala valorada");
                setButtonValuation(1);
            }
        }).catch();
    };

    const modificarValoracionSala = () => {
        axios.post('/api/modificarValoracionSala', {idRoom: item.name, val: valueRatting}).then(response => {
            if(response.data.r === 1) {
                console.log("Concierto quitado el me gusta");
            }
        }).catch();
    };

    const eliminarValSala = () => {
        axios.post('/api/eliminarValSala', { data: {idRoom: item.name} }).then(response => {
            if(response.data.r === 1) {
                console.log("Concierto quitado el me gusta");
                setButtonValuation(-1);
                setValueRatting(0);
            }
        }).catch();
    };

    return (
        <Box sx={{ width:300}} >
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 25 }}>
                        {item.name}
                    </Typography>
                    <Grid direction={"column"}>
                        <Rating
                                name="simple-controlled"
                                value={valueRatting}
                                onChange={(event, newValue) => {
                                    setValueRatting(newValue);
                                }}
                            />
                        </Grid>
                </CardContent>
                <CardActions>
                    
                    <Grid >
                        {(buttonValuation===-1) ? (
                            <Button variant="contained" onClick={valorarSala}>VALORAR SALA</Button>
                        ) :
                            
                            <Box flexDirection={'column'} sx={{ '& button': { m: 1 } }}>
                                <Box>
                                    <Button variant="contained" onClick={modificarValoracionSala}>MODIFICAR VALORACION</Button>
                                </Box>
                                <Box>
                                    <Button variant="contained" onClick={eliminarValSala}>ELIMINAR VALORACION</Button>
                                </Box>
                                
                            </Box>
                        }
                    </Grid>

                </CardActions>
            </Card>   
        </Box>
    );
};

export default CardRoom;