import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Skeleton, Box, Button} from '@mui/material/';

const categories: string[] = //[];
[
  "Science",
  "Math",
  "Geography",
  "History"
]

export default function QuizCategories(){

  return(
    <Grid item
          container
          xs={4}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{border: "2px solid black"}}>
      {categories.length > 0 ?
          categories.map((category: string) =>
            category ?
              (<Button key={category} style={{width: "50%"}}>{category}</Button>)
              :
              (<Skeleton/>)
          )
        :
        (<CircularProgress />)
      }
    </Grid>
  )
}