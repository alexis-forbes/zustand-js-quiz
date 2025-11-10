import { create } from "zustand"
import type { Question } from "./types"
import  confetti  from "canvas-confetti"
import { persist, devtools } from "zustand/middleware"
// cada vez que algo cambia de la store, se actualiza el localStorage
// persist captura todos los cambios y lo sincroniza con el localStorage, session storage o cookies
// envolvemos nuestra store con persist para que capture todos los cambios
import { getAllQuestions } from "../services/questions"


interface State { 
    questions: Question[],
    currentQuestion: number,
    fetchQuestions: (limit: number) => Promise<void>,
    selectedAnswer: (questionId: number, answerIndex: number) => void,
    goNextQuestion: () => void,
    goBackQuestion: () => void,
    reset: () => void
}

// Podemos leer y actualizar el estado con "set" y "get"
export const useQuestionsStore = create<State>()(
    devtools(
        persist<State>(
            (set, get) => {
    // Create recibe un callback 
    // En el callback devolvemos el objeto que será el estado global (store)
    // En el store tenemos el estado y las formas de actualizar el estado (actions)
    return {
        questions: [], // estado global inicial
        currentQuestion: 0, // posición de la pregunta actual
        fetchQuestions: async (limit: number) => {
            // Recuperar de una API o de un archivo local
            const questionsFromApi = await getAllQuestions()
            // desordenar y limitar el numero de resultados que pasamos en parámetro
            const questions = questionsFromApi.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions }) // actualizamos
        },
        selectedAnswer: (questionId: number, answerIndex: number) => {
            // usaremos structuredClone para clonar objetos de forma profunda
            // desde este método accedemos a la propiedad del estado global a través de get o recuperar el estado completo
            // devuelve el estado
            const { questions } = get()
            // clonamos el objeto questions
            const newQuestions = structuredClone(questions)
            // actualizamos el estado cambiando aquella que haya sido seleccionada
            // buscamos el índice del id de la pregunta que seleccionado el usuario
            const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
            // recuperamos la información de la pregunta seleccionada
            const questionInfo = newQuestions[questionIndex]
            // actualizamos la pregunta seleccionada usando el índice 
            // mriamos si ha seleccionado la correcta
            const isCorrectAnswer = questionInfo.correctAnswer === answerIndex
            // actualizamos el estado, cambiando esa información en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo, //toda la info de la pregunta
                userSelectedAnswer: answerIndex, //la respuesta seleccionada
                isCorrectAnswer //si es correcta o no
            }
            // actualizamos el estado global
            set({ questions: newQuestions })
            if (isCorrectAnswer) {
                confetti()
            }
        },
        goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            if (currentQuestion < questions.length - 1) {
                set({ currentQuestion: currentQuestion + 1 })
            }
        },
        goBackQuestion: () => {
            const { currentQuestion } = get()
            if (currentQuestion > 0) {
                set({ currentQuestion: currentQuestion - 1 })
            }
        },
        reset: () => {
            set({ questions: [], currentQuestion: 0 })
        }
    }
            },
            {
                name: 'questions',
                // aquí podríamos indicar el storage donde queremos guardar
                // storage: createJSONStorage(() => localStorage)
                // storage: createJSONStorage(() => sessionStorage)
                // storage: createJSONStorage(() => cookies)
            }
        )
    )
)
