import { useQuestionsStore } from '../store/questions'

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions)

  let correct = 0
  let inCorrect = 0
  let unAnswered = 0

  questions.forEach((item) => {
    const { userSelectedAnswer, correctAnswer } = item

    if (userSelectedAnswer == null) unAnswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else inCorrect++
  })

  return { correct, inCorrect, unAnswered }
}
