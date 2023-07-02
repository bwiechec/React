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
import React, {ChangeEvent, FormEvent, FormEventHandler, useEffect, useState} from "react";
import {categoryListInterface, quizAnswerInterface, quizQuestionInterface} from "../../interfaces/interfaces";
import {getAccessToken} from "../../utils/token";
import QuizAnswer from "./QuizAnswer";
import QuizQuestion from "./QuizQuestion";

export default function QuizCreate(){

  const [questionList, setQuestionList] = useState<Array<quizQuestionInterface>>();
  const [categoryList, setCategoryList] = useState<Array<categoryListInterface>>([]);
  const [categorySelected, setCategorySelected] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getNewQuestion = () => {
    return {
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
  }

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
        if(!questionList)
          setQuestionList(questionList ? [...questionList, getNewQuestion()] : [getNewQuestion()]);
        console.log(resJson);
      });
  }, [])

  if(isLoading || categoryList === undefined){
    return <CircularProgress />
  }

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

  const saveQuiz = (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    console.log(questionList);
  }

  return(
    <div>
      <form
        style={{maxWidth: "35rem", marginInline: "auto"}}
        onSubmit={saveQuiz}
      >
        <TextField
          required
          // error={userNameError}
          id="login-input"
          label="Quiz name"
          variant="standard"
          margin="normal"
          // onChange={updateInsertedUserName}
        />
        <FormControl fullWidth variant="standard" required>
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

            setQuestionList(questionList ? [...questionList, getNewQuestion()] : [getNewQuestion()]);
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
          type="submit"
        >
          Add quiz
        </Button>
      </form>
    </div>
  )
}