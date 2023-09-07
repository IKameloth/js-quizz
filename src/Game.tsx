import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { Questions } from './types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

const getBackgroundColor = (info: Questions, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info

  if (userSelectedAnswer == null) return 'transparent'
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  if (index === correctAnswer) return 'green'
  if (index === userSelectedAnswer) return 'red'

  return 'transparent'
}

const Question = ({ info }: { info: Questions }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  // function return other function
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}>
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers?.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ bgcolor: getBackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h6">
          {currentQuestion + 1} / {questions.length}
        </Typography>
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}