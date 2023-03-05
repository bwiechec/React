import {
  Button,
  FormGroup,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  CircularProgress,
  Fab, SelectChangeEvent
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, {ChangeEvent, useEffect, useState} from "react";
import {categoryListInterface, quizAnswerInterface, quizQuestionInterface} from "../../interfaces/interfaces";
import {getAccessToken} from "../../utils/token";
import QuizAnswer from "./QuizAnswer";
import QuizQuestion from "./QuizQuestion";

export default function QuizCreate(){

  const [questionList, setQuestionList] = useState<Array<quizQuestionInterface>>();
  const [categoryList, setCategoryList] = useState<Array<categoryListInterface>>([]);
  const [categorySelected, setCategorySelected] = useState<number>();
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
        setCategoryList(resJson.response.quizCategoryList);
        setCategorySelected(resJson.response.quizCategoryList[0].categoryId);
        setIsLoading(false);
        console.log(resJson);
      });
  }, [])

  console.log('categoryList')
  console.log(categoryList)

  if(isLoading || categoryList === undefined){
    return <CircularProgress />
  }

  console.log(questionList);

  const handleChange = (event: SelectChangeEvent<number>) => {
    //setPassword(value);
    if(typeof event.target.value === "number")
      setCategorySelected(event.target.value)
  }

  const updateQuestion = (index: number, question: quizQuestionInterface) => {
    if(!questionList) return;

    questionList[index] = question;

    setQuestionList([...questionList]);
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
            defaultValue={categorySelected}
            value={categorySelected}
            label="Quiz category"
            onChange={handleChange}
          >
            {categoryList?.map((category: categoryListInterface) =>
                (<MenuItem value={category.categoryId} selected={categorySelected === category.categoryId}>{category.categoryName}</MenuItem>)
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

        <>
        {
          questionList ? questionList.map((question: quizQuestionInterface, index) => {
            return (<QuizQuestion
              quizQuestion={question}
              questionIndex={index}
              updateQuestion={updateQuestion}
            />)
          }) : ''
        }
        </>

        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Fab color="primary" aria-label="add" style={{float: 'left', marginBottom: "2rem"}} variant="extended" onClick={() => {

            let question = {
              quizId: null,
              text: '',
              quizAnswerList: [
                {
                  text: '',
                  questionId: questionList?.length ?? 0,
                  isCorrect: true
                } as quizAnswerInterface,
                {
                  text: '',
                  questionId: questionList?.length ?? 0,
                  isCorrect: false
                } as quizAnswerInterface,
                {
                  text: '',
                  questionId: questionList?.length ?? 0,
                  isCorrect: false
                } as quizAnswerInterface
              ]
            } as quizQuestionInterface;

            setQuestionList(questionList ? [...questionList, question] : [question]);
          }}>
            <AddIcon />
            Add question
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
          sx={{ maxWidth: "50%", marginBottom: "2rem"}}
          // onClick={validateInputData}
        >
          Add quiz
        </Button>
      </FormGroup >
    </div>
  )
}