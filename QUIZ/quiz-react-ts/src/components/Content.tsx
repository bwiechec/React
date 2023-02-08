import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Grid, Box, Typography, Skeleton} from '@mui/material/';
import * as Icons from '@mui/icons-material';
import {setAccessToken} from '../utils/token';
import QuizList from "./quizList/QuizList";
import QuizCategories from "./quizCategories/QuizCategories";
import {contentProps} from "../interfaces/interfaces";

export default function Content() {

  const loading:boolean = true;

  const getLoginData = async () => {
    // const data = await fetch('http://localhost:4000/login',{method: "POST"})
    // const dataJson = await data.json();
    // return(dataJson.response)
  }

  // useEffect(()=>{
  //   getLoginData().then(r => setLoginData(r));
  // }, [])

  return (
    // <Grid
    //   container
    //   className={"content"}
    //   style={{marginTop: "1%", alignItems: "center", justifyContent: "center", height: "100%"}}
    //   columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    // >
    //   <QuizList />
      <QuizCategories />
    // </Grid>
  );
}