import React, {useEffect, useState} from 'react';
import {contentProps} from "../interfaces/interfaces";
import {getAccessToken, setAccessToken} from '../utils/token';
import {FormControl, TextField, Button} from "@mui/material";


export default function Content(props:contentProps) {

  const loginUser = () => {
    console.log('submit')
    fetch('http://127.0.0.1:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      mode: 'cors',
      body: JSON.stringify({
        username: 'test1',
        password: 'test1'
      })
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if(resJson.status === 1){
          setAccessToken(resJson.token)
        }
      })
  }

  return (
    <div>
      <form>
        <TextField id="login-input" label="Login/Email" variant="standard" />

        <TextField id="password-input" label="Password" variant="standard" />

        <Button
          variant="contained"
          color="primary"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}