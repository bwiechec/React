import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {getAccessToken, setAccessToken} from '../utils/token';
import {useEffect} from "react";
import {contentProps} from "../interfaces/interfaces";
import {getLogin, setLogin} from "../utils/user";
import {
  NavLink
} from "react-router-dom";

export default function Navbar(props:contentProps){

  let token:string = getAccessToken();

  const printToken = () => {
    token = getAccessToken();
    console.log('TOKEN:' + token + ' action: '+props.currentAction);
  }

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: '#303035'}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <a href={'/'}
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
                Hello {getLogin()}
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