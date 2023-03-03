import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Skeleton, Box, Button} from '@mui/material/';
import {NavLink} from "react-router-dom";
import {getAccessToken} from '../../utils/token';
import {categoryListInterface} from "../../interfaces/interfaces";

const categories: string[] = //[];
[
  "Science",
  "Math",
  "Geography",
  "History"
]

export default function QuizCategories(){

  const [categoryList, setCategoryList] = useState<Array<categoryListInterface>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      .then(resJson => {
        setIsLoading(false);
        setCategoryList(resJson.response.quizCategoryList);
        console.log(resJson);
      });
  }, [])

  console.log('categoryList')
  console.log(categoryList)

  if(isLoading || categoryList === undefined || categoryList?.length === 0){
    return <CircularProgress />
  }

  return(
    <Grid
      container
      xs={12}
      //columnSpacing={{ xs: 0, md: 2 }}
      rowSpacing={{ xs: 2, xl: 10}}
      columns={{ xs: 5, md: 10, xl: 15 }}
      alignItems="center"
      justifyContent={{xs: "center", xl: 'flex-start'}}
      direction={{xs: "row"}}
      style={{border: "2px solid black", marginInline: 'auto', marginTop: "1%"}}
    >
      {categoryList?.map((category: categoryListInterface) =>
        category ?
          (
            <Grid item spacing={2} xs={5}>
              <NavLink to={`/category/${category.categoryId}`}
                style={{
                  maxWidth: '25rem',
                  //width: '25rem',
                  height: '15rem',
                  textAlign: 'center',
                  justifyContent: 'space-evenly',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px rgb(100,102,255) solid',
                  // margin: '2.5rem',
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(100,102,245,0.74)',
                  textDecoration: 'none',
                  boxShadow: '0.3rem 0.3rem 0.7rem rgba(100,102,245,0.5)',
                  marginInline: 'auto'
                }}
              >
                <Box
                  key={category.categoryName}
                  alignItems="center"
                  justifyContent="center"
                  minWidth={{xs: '15rem', md: '20rem', xl: '25rem'}}
                >
                  <h4 style={{
                    color: 'white',
                    fontWeight: '300',
                    fontSize: '3rem'
                  }}>
                    {category.categoryName}
                  </h4>
                </Box>
              </NavLink>
            </Grid>
          )
          :
          (<Skeleton/>)
        )
      }
    </Grid>
  )
}