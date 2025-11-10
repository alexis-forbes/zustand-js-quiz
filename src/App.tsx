import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavascriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import type { Question } from './store/types'
import { Game } from './Game'

const renderQuestions = (questions: Question[]) => {
  if (questions.length === 0) {
    return <Start />
  }
  return <Game />
}

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  return (
    <main>
      <Container maxWidth="sm">

          <Stack direction='row' gap={2} alignItems='center' justifyContent='center' paddingBottom={4}>
            <JavascriptLogo />
            <Typography variant='h2' component='h1'>Javascript Quizz</Typography>
          </Stack>
          {renderQuestions(questions)}
      </Container>
    </main>
  )
}

export default App
