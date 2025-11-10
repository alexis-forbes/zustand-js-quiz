import { useQuestionsStore } from "../store/questions"

export const useQuestionsData = () => {
    // Importante no hacer const { questions } = useQuestionsStore((state) => state)
    // Aquí observas cambios de todo el estado global
    // Esto re-renderiza todo el componente cada vez que cambia el estado global
    // Lo de abajo solo observa cambios en la propiedad questions
    const questions = useQuestionsStore((state) => state.questions)
    let correct = 0
    let incorrect = 0
    let unanswered = 0

    for (const question of questions) {
        if (question.isCorrectAnswer) {
            correct++
        } else if (question.userSelectedAnswer != null) {
            incorrect++
        } else {
            unanswered++
        }
    }
    
    return { correct, incorrect, unanswered }
}