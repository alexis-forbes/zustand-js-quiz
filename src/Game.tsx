import { Button, Card, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import type { Question } from "./store/types"
import SyntaxHighlighter from "react-syntax-highlighter"
import { gradientDark } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { Footer } from "./Footer"

const Question = ({ info }: { info: Question }) => {
    const selectedAnswer = useQuestionsStore((state) => state.selectedAnswer)

    const createHandleClick = (answerIndex: number) => {
        // Creamos una función que recibe el índice de la respuesta seleccionada
        // y que llama a la función selectedAnswer
        // para actualizar el estado global
        selectedAnswer(info.id, answerIndex)
    }

    const getBgClolor = (answerIndex: number) => {
        const { userSelectedAnswer, correctAnswer } = info
        // usuario no ha seleccionado nada
        if (userSelectedAnswer == null) return 'transparent'
        // usuario ha seleccionado una respuesta incorrecta
        if (answerIndex !== correctAnswer && answerIndex !== userSelectedAnswer) return 'transparent'
        // usuario ha seleccionado una respuesta correcta o incorrecta
        return answerIndex === correctAnswer ? 'green' : 'red'
    }

    return (
        <Card variant='outlined' sx={{ textAlign: 'left', bgcolor: 'background.paper', p: 2, marginTop: 4 }}>
            <Typography variant='h5'>{info.question}</Typography>
            <SyntaxHighlighter language='javascript' style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{ bgcolor: '#333', fontWeight: 'bold' }} disablePadding >
                {info.answers.map((answer, index) => {
                    return (
                        <ListItem key={index} disablePadding divider>
                            <ListItemButton disabled={info.userSelectedAnswer != null} sx={{ bgcolor: getBgClolor(index) }} onClick={() => createHandleClick(index)}>
                                <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionsStore((state) => state.questions)
    const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
    const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
    const goBackQuestion = useQuestionsStore((state) => state.goBackQuestion)

    return (
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <Button onClick={goBackQuestion} variant='contained' color='primary' disabled={currentQuestion === 0}>
                    Back
                </Button>
                {currentQuestion + 1} / {questions.length}
                <Button onClick={goNextQuestion} variant='contained' color='primary' disabled={currentQuestion === questions.length - 1}>
                    Next
                </Button>
            </Stack>
            <Question info={questions[currentQuestion]} />
            <Footer />
        </>
    )
}