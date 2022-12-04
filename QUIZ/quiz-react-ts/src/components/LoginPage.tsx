import React, {ChangeEvent, useEffect, useState} from 'react';
import {contentProps} from "../interfaces/interfaces";
import {getAccessToken, setAccessToken} from '../utils/token';
import {FormGroup , TextField, Button} from "@mui/material";
import {getLogin, setLogin} from "../utils/user";


export default function Content() {

  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [loginMessage, setLoginMessage] = useState('');

  const loginUser = (login: string, pasword: string) => {
    console.log('submit')
    setLoginMessage('');
    fetch('http://127.0.0.1:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      mode: 'cors',
      body: JSON.stringify({
        username: login,
        password: pasword
      })
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if(resJson.status === 1){
          setAccessToken(resJson.token)
          setLogin(login)
          //props.setCurrentAction('main')
          window.location.replace('/');
        }
        else {
          resJson.errCode
            ?
              setLoginMessage('Internal server error occurred')
            :
              setLoginMessage(resJson.response);
        }
      })
  }

  const updateInsertedUserName = (event: ChangeEvent<HTMLInputElement>) => {
    //setUserName();
    setUserName(event.target.value)
  }

  const updateInsertedPassword = (event: ChangeEvent<HTMLInputElement>) => {
    //setPassword(value);
    setPassword(event.target.value)
  }

  const validateInputData = () => {
    console.log(userName + ' pswd ' + password);
    if(!userName) setUserNameError(true);
    else setUserNameError(false);
    if(!password) {
      setPasswordError(true);
      return;
    }
    else setPasswordError(false);

    loginUser(userName, password);

  }

  return (
    <div style={{
      marginTop: "10%"
    }}>
      <FormGroup sx={{maxWidth: "25%", marginInline: "auto"}}>
        <TextField
          required
          error={userNameError}
          id="login-input"
          label="Login/Email"
          variant="standard"
          margin="normal"
          onChange={updateInsertedUserName}
        />
        <TextField
          required
          error={passwordError}
          id="password-input"
          label="Password"
          variant="standard"
          margin="normal"
          onChange={updateInsertedPassword}
        />
          <span style={{
            color: 'red'
          }}
          >
            {loginMessage}
          </span>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginInline: "auto"}}
          onClick={validateInputData}
        >
          Sign in
        </Button>
      </FormGroup >
    </div>
  );
}