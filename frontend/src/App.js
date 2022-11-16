import './App.css';
import React, { useState } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {

  const [details, setDetails] = useState({user:'', pass:''});

  const handleSubmit = () => {
    console.log(details.user + " " + details.pass);
    axios.post('/registro', {
      user:details.user, pass:details.pass
    }).then(response => {
      console.log("Enviado");
    }).catch(error => {
      console.log(error);
    });
  };


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Creando el recomendador!
        </p>
        <TextField id="outlined-basic" label="User" variant="outlined"
          onChange={e => setDetails({...details, user: e.target.value})} />
        <TextField id="outlined-basic" label="Pass" variant="outlined" 
          onChange={e => setDetails({...details, pass: e.target.value})} />
        <Button onClick={handleSubmit} variant="text">Registrarse</Button>
      </header>
    </div>
  );
}

export default App;
