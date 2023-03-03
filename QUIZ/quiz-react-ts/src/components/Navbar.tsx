import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {getAccessToken, setAccessToken} from '../utils/token';
import {useEffect} from "react";
import {contentProps, userInterface} from "../interfaces/interfaces";
import {getLogin, setLogin} from "../utils/user";
import {
  NavLink
} from "react-router-dom";

export default function Navbar(){

  const [user, setUser] = useState<userInterface | null>(null);

  let token:string = getAccessToken();

  console.log(user);
  console.log(user?.user_name);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/getUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getAccessToken()}`
      },
      redirect: 'follow',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        setUser(resJson.response.user);
      });
  }, [])

  const printToken = () => {
    token = getAccessToken();
    console.log('TOKEN:' + token );
  }

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="static" style={{backgroundColor: '#303035'}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <a
              href={'/'}
              style={{
                color: 'inherit',
                textDecoration: 'inherit'
              }}
            >
              QUIZ
            </a>
          </Typography>
          <div className={'actions'} style={{position: 'absolute', right: '1rem'}}>
            {/*<Button color="inherit" onClick={printToken}>Get Token</Button>*/}
            { getLogin() === '' ?
              <a href="/login"
                 style={{
                   color: 'inherit',
                   textDecoration: 'inherit'
                 }}
              ><Button color="inherit">Login</Button></a>
              :
              <p
                style={{
                  display: 'inline-flex',
                  color: "inherit",
                  alignItems: "center",
                }}
              >
                {user?.is_super_user ?
                  <a href={'/quiz/create'}
                     style={{
                       color: 'inherit',
                       textDecoration: 'inherit'
                     }}
                  >
                    <Button
                      style={{
                        color: 'inherit',
                        textDecoration: 'inherit'
                      }}
                      onClick = {
                        () => alert('DODAJE!') //TODO change to normal logout
                      }
                    >
                      DODAJ QUIZ
                    </Button>
                  </a>: ''}
                Hello {user?.user_name}
                <Button
                  style={{
                    color: 'inherit',
                    textDecoration: 'inherit'
                  }}
                  onClick = {
                    () => clearLocalStorage() //TODO change to normal logout
                  }
                >
                  (Logout)
                </Button>
              </p>
            }
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}