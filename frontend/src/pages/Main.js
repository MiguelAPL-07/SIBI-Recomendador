import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Main() {

  const [concerts, setConcerts] = useState([{}]);

  const allConcerts = () => {
    axios.get('/api/allConcerts').then(response => {
        let array = response.data;
        console.log(array);
        let newC = [];
        for (let i = 0; i < array.length; i++) {
            //newC = newC.concat({concertId:array[i]._concertId, date:array[i].date, artist:array[i].artist});
            newC = newC.concat({name:array[i].name});
        }
        console.log(newC);
        setConcerts(newC);
    }).catch();
  };

  return (
    <div>
      <p>Hola amigo</p>
      <Link to='/prueba'><Button>Pedro</Button></Link>
      <Button onClick={allConcerts}>Traer todos los conciertos</Button>
      <br></br>
      <div>
        {(concerts.length===0) ? (
            <p>No hay conciertos</p>
        ) :
        concerts.map((concert) => (
            <div>
                <p>{concert.name}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
