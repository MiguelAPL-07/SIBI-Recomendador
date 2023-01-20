import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from 'react';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';

const CardArtist = ({item}) => {

    const [buttonFollow, setButtonFollow] = useState(1);

    const count = 1;
    useEffect(() => {
        if(item.name != undefined) {
            comprobar();
        }
    }, [count]);

    const comprobar = () => {
        axios.get('/api/getArtistsFollowing').then(response => {
            let array = response.data;
            for (let i = 0; i < array.length; i++) {
                if(array[i].name === item.name) {
                    setButtonFollow(-1);
                }
            }
        }).catch();
    }

    const followArtist = () => {
        axios.post('/api/followArtist', {idArtists: item.name}).then(response => {
            if(response.data.r === 1) {
                console.log("Artista dado a seguir");
                setButtonFollow(-1);
            }
        }).catch();
    };

    const stopFollowArtist = () => {
        axios.post('/api/stopFollowArtist', { data: { idArtists: item.name} }).then(response => {
            if(response.data.r === 1) {
                console.log("Concierto quitado el me gusta");
                setButtonFollow(1);
            }
        }).catch();
    };

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 25 }}>
                        {item.name}
                    </Typography>
                    
                </CardContent>
                <CardActions>
                    {(buttonFollow===-1) ? (
                        <Button variant="contained" startIcon={<BookmarkOutlinedIcon />} onClick={stopFollowArtist}>DEJAR DE SEGUIR</Button>
                    ) :
                        <Button variant="contained" startIcon={<BookmarkTwoToneIcon />} onClick={followArtist}>SEGUIR</Button>
                    }
                </CardActions>
            </Card>   
        </div>
    );
};

export default CardArtist;