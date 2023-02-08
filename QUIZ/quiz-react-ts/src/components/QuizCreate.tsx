import {
  Button,
  FormGroup,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  CircularProgress,
  Fab
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect, useState} from "react";
import {categoryListInterface} from "../interfaces/interfaces";
import {getAccessToken} from "../utils/token";

export default function QuizCreate(){

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

  if(isLoading || categoryList === undefined){
    return <CircularProgress />
  }

  return(
    <div>
      <FormGroup sx={{maxWidth: "35rem", marginInline: "auto"}}>
        <TextField
          required
          // error={userNameError}
          id="login-input"
          label="Quiz name"
          variant="standard"
          margin="normal"
          // onChange={updateInsertedUserName}
        />
        <FormControl fullWidth variant="standard">
          <InputLabel id="quiz-category-select-label">Quiz category</InputLabel>
          <Select
            labelId="quiz-category-select-label"
            id="quiz-category-select"
            // value={age}
            label="Quiz category"
            //onChange={handleChange}
          >
            {categoryList?.map((category: categoryListInterface) =>
                (<MenuItem value={category.categoryId}>{category.categoryName}</MenuItem>)
              )
            }
          </Select>
        </FormControl>
        <TextField
          required
          // error={userNameError}
          id="description-input"
          label="Quiz description"
          variant="standard"
          margin="normal"
          // onChange={updateInsertedUserName}
        />

        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Fab color="primary" aria-label="add" style={{float: 'left'}} variant="extended">
            <AddIcon />
            Add answer
          </Fab>
        </div>

        <span style={{
          color: 'red'
        }}
        >
            {/*{loginMessage}*/}
          </span>
        <Button
          variant="contained"
          color="primary"
          sx={{ maxWidth: "50%"}}
          // onClick={validateInputData}
        >
          Add quiz
        </Button>
      </FormGroup >
    </div>
  )
}