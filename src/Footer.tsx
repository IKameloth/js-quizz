import { Box, Button, Stack, Typography } from '@mui/material'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined'
import { useQuestionsData } from './hooks/useQuestions'
import { useQuestionsStore } from './store/questions'

export const Footer = () => {
  const { correct, inCorrect, unAnswered } = useQuestionsData()
  const resetGame = useQuestionsStore((state) => state.resetGame)

  return (
    <Box component="footer" marginTop={2} sx={{ bgcolor: '#222', p: 2, marginTop: 2 }}>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <CheckOutlinedIcon sx={{ color: 'green' }} />
        <Typography variant="body2" color="text.secondary">
          {correct}
        </Typography>{' '}
        |
        <ClearOutlinedIcon sx={{ color: 'red' }} />
        <Typography variant="body2" color="text.secondary">
          {inCorrect}
        </Typography>{' '}
        |
        <QuestionMarkOutlinedIcon sx={{ color: 'yellow' }} />
        <Typography variant="body2" color="text.secondary">
          {unAnswered}
        </Typography>
      </Stack>
      <Button sx={{ marginTop: 2 }} onClick={() => resetGame()}>
        Reset Game
      </Button>
    </Box>
  )
}
