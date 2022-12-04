import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Skeleton, Box, Button} from '@mui/material/';
import {NavLink} from "react-router-dom";
import {getAccessToken} from '../utils/token';

const categories: string[] = //[];
[
  "Science",
  "Math",
  "Geography",
  "History"
]

export default function QuizCategories(){

  useEffect(() => {
    fetch('http://127.0.0.1:4000/categoryList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getAccessToken()}`
      },
      redirect: 'follow',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(resJson => console.log(resJson));
  }, [])

  return(
    <Grid item
          container
          xs={10}
          alignItems="center"
          justifyContent="center"
          direction={{xs: "row"}}
          style={{border: "2px solid black", marginInline: 'auto'}}
    >
      {categories.length > 0 ?
          categories.map((category: string) =>
            category ?
              (<NavLink to={`/category/${category}`}
                style={{width: '40%', textAlign: 'center', justifyContent: 'space-evenly'}}
              >
                <Box key={category}
                    alignItems="center"
                    justifyContent="center">
                  {category}
                </Box>
              </NavLink>)
              :
              (<Skeleton/>)
          )
        :
        (<CircularProgress />)
      }
    </Grid>
  )
}