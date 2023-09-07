import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'

const LIMIT_QUESTIONS = 5

export const Start = () => {
  const getQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    getQuestions(LIMIT_QUESTIONS)
  }

  return (
    <Button onClick={handleClick} variant="contained">
      START!
    </Button>
  )
}
