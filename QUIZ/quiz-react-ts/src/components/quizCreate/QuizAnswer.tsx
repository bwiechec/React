import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {categoryListInterface, quizAnswerInterface} from "../../interfaces/interfaces";

interface quizAnswerProps {
  answer: quizAnswerInterface
}

export default function QuizAnswer({
  answer
}:quizAnswerProps){

  console.warn('zz' + answer);

  return(
    <div>
      test{answer.toString()}
    </div>
  )
}