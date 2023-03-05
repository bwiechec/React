import {useParams} from "react-router";
import React, {ChangeEvent, useEffect, useState} from "react";
import {categoryListInterface, quizAnswerInterface} from "../../interfaces/interfaces";
import {Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";

interface quizAnswerProps {
  answer: quizAnswerInterface
  index: number
  updateAnswerText: (index: number, text: string) => void
  updateAnswerCorrect: (index: number, isCorrect: boolean) => void
}

export default function QuizAnswer({
  answer,
  index,
  updateAnswerText,
  updateAnswerCorrect,

}:quizAnswerProps){

  const callUpdateAnswerText = (event: ChangeEvent<HTMLInputElement>) => {
    //setUserName();
    updateAnswerText(index, event.target.value)
  }

  const callUpdateAnswerCorrect = (event: ChangeEvent<HTMLInputElement>) => {
    //setUserName();
    updateAnswerCorrect(index, event.target.checked)
  }

  return(
    <FormGroup
      style={{
        display: "flex",
        alignItems: "center"
      }}
    >
      {/*test{answer.toString()}*/}
      <TextField
        required
        // error={userNameError}
        id="description-input"
        label={`Answer ${index+1}`}
        variant="standard"
        margin="normal"
        onChange={callUpdateAnswerText}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={answer.isCorrect}
            onChange={callUpdateAnswerCorrect}
          />
        }
        label="Correct answer"
      />
    </FormGroup>
  )
}