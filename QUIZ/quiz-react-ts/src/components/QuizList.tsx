import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Box, Typography} from '@mui/material/';
import {Skeleton} from "@mui/material";

interface quizObject {
  title: string,
  description: string,
  img?: string | null
}

const list: quizObject[] = //new Array();
[
  {
    title: "test",
    description: "test desc",
    img: null
  },
  {
    title: "test2",
    description: "test desc2",
    img: null
  },
  {
    title: "test",
    description: "test desc",
    img: null
  },
  {
    title: "test2",
    description: "test desc2",
    img: null
  },
  {
    title: "test",
    description: "test desc",
    img: null
  },
  {
    title: "test2",
    description: "test desc2",
    img: null
  },
];

export default function QuizList(){

  return(
    <Grid item container
          alignItems="center"
          justifyContent="center"
          xs={8}
          direction={{xs: "row"}}
          style={{border: "2px solid red"}}>
      {list.length > 0 ?
        list.map((quiz: quizObject) => (
          <Box key={quiz.title}
               onClick={() => console.log(quiz.title)}
               alignItems="center"
               justifyContent="center"
               sx={{ width: "30%", marginRight: 0.5, my: 5 }}>
            {quiz.img ?
              (<img
                style={{ width: "90%", height: "10%" }}
                alt={quiz.title}
                src={quiz.img}
              />)
              :
              (<Skeleton variant="rectangular" style={{marginInline: "auto"}} sx={{width: {xs: "90%", md: "50%"}}} height={"10vh"} />)
            }
            {quiz ?
              (<Box sx={{pr: 2}}>
                  <Typography gutterBottom variant="body2">
                    {quiz.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {quiz.description}
                  </Typography>
                </Box>)
              :
              (<Skeleton/>)
            }
          </Box>))
        :
        (<CircularProgress/>)}
    </Grid>
  )
}