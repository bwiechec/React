import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {getAccessToken, setAccessToken} from '../utils/token';
import {useEffect} from "react";

export default function Navbar(){

  let token:string = getAccessToken();

  const printToken = () => {
    token = getAccessToken();
    console.log('TOKEN:' + token);
    if(token === 'habababa'){
      setAccessToken('huhuhuh')
    }
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
          <Button color="inherit" onClick={printToken}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}