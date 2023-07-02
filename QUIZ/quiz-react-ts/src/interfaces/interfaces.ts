export interface contentProps {
  currentAction: string,
  setCurrentAction: (action: string) => void
}

export interface userInterface {
  user_id: number,
  user_name: string,
  is_super_user: boolean,
  email: string
}

export interface categoryListInterface {
  categoryId: number,
  categoryName: string
}

export interface quizListInterface {
  quizId: number,
  quizName: string,
  userName: string,
  quizDescription: string
}

export interface quizAnswerInterface {
  questionId: number | null,
  text: string,
  isCorrect: boolean
}

export interface quizQuestionInterface {
  quizId: number | null,
  text: string,
  quizAnswerList: quizAnswerInterface[]
}