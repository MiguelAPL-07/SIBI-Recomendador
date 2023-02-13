import './../App.css';
import React, { useState } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Main from './Main';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const [details, setDetails] = useState({user:'', pass:''});
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios.post('/api/login', {
      user:details.user, pass:details.pass
    }).then(response => {
      navigate('/inicio')
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };


  return (
    <div className="App">
      <header className="App-header">
        <p>
          LoveLiveConcerts
        </p>
        <TextField id="outlined-basic" label="User" variant="outlined"
          onChange={e => setDetails({...details, user: e.target.value})} />
        <TextField id="outlined-basic" label="Pass" variant="outlined" 
          onChange={e => setDetails({...details, pass: e.target.value})} />
        <Button onClick={handleSubmit} variant="text">Iniciar sesion</Button>
      </header>
    </div>
  );
}

export default Login;