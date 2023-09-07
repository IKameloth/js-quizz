import { create } from 'zustand'
import { Questions } from '../types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

interface State {
  questions: Questions[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  resetGame: () => void
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
          const res = await fetch('http://localhost:5173/data.json')
          const json = await res.json()

          const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
          // update the new state
          set({ questions })
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
          // get state value
          const { questions } = get()
          // structureClone to clone obj
          const newQuestions = structuredClone(questions)
          // find index from question
          const questionIndex = newQuestions.findIndex((item) => item.id === questionId)
          // get info from question
          const questionInfo = newQuestions[questionIndex]
          // is user select the correct answer?
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
          if (isCorrectUserAnswer) confetti()
          // update the object cloned
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex
          }
          // update the new state
          set({ questions: newQuestions })
        },
        goNextQuestion: () => {
          const { currentQuestion, questions } = get()
          const nextQuestion = currentQuestion + 1

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion })
          }
        },
        goPrevQuestion: () => {
          const { currentQuestion } = get()
          const prevQuestion = currentQuestion - 1

          if (prevQuestion >= 0) {
            set({ currentQuestion: prevQuestion })
          }
        },
        resetGame: () => {
          set({ currentQuestion: 0, questions: [] })
        }
      }
    },
    {
      // default set in localstorage
      name: 'questions'
    }
  )
)
