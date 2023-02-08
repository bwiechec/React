import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Box, Typography} from '@mui/material/';
import {Button, Skeleton} from "@mui/material";
import {categoryListInterface, quizListInterface} from "../../interfaces/interfaces";
import {getAccessToken} from "../../utils/token";
import {useParams} from "react-router";
import {NavLink} from "react-router-dom";

interface quizObject {
  title: string,
  description: string,
  img?: string | null
}

export default function QuizList(){
  let { categoryId } = useParams();

  const [quizList, setQuizList] = useState<Array<quizListInterface>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/getCategoryQuizzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getAccessToken()}`
      },
      redirect: 'follow',
      mode: 'cors',
      body: JSON.stringify({categoryId: categoryId})
    })
      .then(res => res.json())
      .then(resJson => {
        setIsLoading(false);
        setQuizList(resJson.response.quizList);
        console.log(resJson);
      });
  }, [])

  console.log('quizList')
  console.log(quizList)

  if(isLoading){
    return <CircularProgress />
  }
  else if(quizList === undefined || quizList.length === 0){
    return <div>
      No quizzes found in this category!
      <div>
        <NavLink to={'/'}><Button>Return</Button></NavLink>
      </div>
    </div>
  }

  return(
    <>
      <Grid item container
            alignItems="center"
            justifyContent="center"
            xs={12}
            direction={{xs: "row"}}
            style={{border: "2px solid red"}}>
        { quizList?.map((quiz: quizListInterface) => (
            <Box key={quiz.quizName}
                 onClick={() => console.log(quiz.quizName)}
                 alignItems="center"
                 justifyContent="center"
                 display="flex"
                 sx={{ width: {xs: "40rem", sm: "30rem", xl: "25rem"}, height: '10rem', margin: '2.5rem', my: 5, backgroundColor: '#9191e0'}}
                 border="1px solid #8e8ead"
                 borderRadius="1rem"
                 color="white"
            >
              {/*{quiz.img ?*/}
              {/*  (<img*/}
              {/*    style={{ width: "90%", height: "10%" }}*/}
              {/*    alt={quiz.title}*/}
              {/*    src={quiz.img}*/}
              {/*  />)*/}
              {/*  :*/}
              {/*  (<Skeleton variant="rectangular" style={{marginInline: "auto"}} sx={{width: {xs: "90%", md: "90%", xl: '65%'}}} height={"10vh"} />)*/}
              {/*}*/}
              {quiz ?
                (<Box sx={{pr: 2}}>
                    <Typography gutterBottom variant="body2">
                      {quiz.quizName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {quiz.quizDescription}<br />
                      Creator: {quiz.userName}
                    </Typography>
                  </Box>)
                :
                (<Skeleton/>)
              }
            </Box>)
        )
        }
      </Grid>
      <div>
        <NavLink to={'/'}><Button>Return</Button></NavLink>
      </div>
    </>
  )
}