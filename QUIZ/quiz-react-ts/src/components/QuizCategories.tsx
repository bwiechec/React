import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Skeleton, Box} from '@mui/material/';

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
          xs={4}
          alignItems="center"
          justifyContent="center"
          style={{border: "2px solid black"}}>
      {categories.length > 0 ?
        <div>
          {categories.map((category: string) =>
            category ?
              (<Box>
                <p key={category}>{category}</p>
              </Box>)
              :
              (<Skeleton/>)
          )}
        </div>
        :
        (<CircularProgress />)
      }
    </Grid>
  )
}